const { asyncErrors } = require("../middlewares/asyncErrors");
const User = require("../models/userModel");
const Job = require("../models/jobModel");
const ErrorHandler = require('../utils/errorHandler');
const { setToken } = require('../utils/setToken');
const imagekit = require('../utils/imagekit').initImagekit();
const path = require('path');
const { sendmail } = require("../utils/nodemailer");


// Route: /
exports.homepage = asyncErrors(async (req, res, next) => {
    res.json({ message: "Homepage" });
});

// Route: /user (POST)
exports.currentuser = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.id).exec();

    res.json({ user });
});

// Route: /user/signup (POST)
exports.usersignup = asyncErrors(async (req, res, next) => {
    const user = await new User(req.body).save();
    setToken(user, 201, res);
});

// Route: /user/signin (POST)
exports.usersignin = asyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select("+password").exec();
    if (!user) {
        return next(
            new ErrorHandler('User associated with this email address not found', 404)
        )
    };

    const validation = user.passwordValidation(req.body.password);

    if (!validation) {
        return next(
            new ErrorHandler('Sorry, your password was incorrect. Please double-check your password.', 401)
        )
    }
    setToken(user, 200, res);
});

// Route: /user/signout
exports.usersignout = asyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: 'Successfully signed out!' })
});

// Route: /user/uploadresume/:studentid (POST)
exports.uploadResume = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.studentid).exec();
    const file = req.files.uploadedresume;
    const updatedFilename = `${user.firstname}-resume-${Date.now()}-${path.extname(file.name)}`

    if (user.uploadedresume.fileId !== "") {
        await imagekit.deleteFile(user.uploadedresume.fileId);
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: updatedFilename
    });

    user.uploadedresume = { fileId, url };
    await user.save();
    res.status(200).json({
        success: true,
        message: "Resume uploaded succesfully"
    })
})


// -------------------------------------------View All Jobs-------------------------------------------

// Route: /user/view-jobs (POST)
exports.viewjobs = asyncErrors(async (req, res, next) => {
    const jobs = await Job.find().exec();

    res.status(200).json({ jobs })
});


// // ---------------------------------------------Apply Job---------------------------------------------

// Route: /user/applyjob/:jobid (POST)
exports.userApplyJob = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();

    if (user.uploadedresume.fileId === "") {
        return next(
            new ErrorHandler('Please upload your resume to sumit your application', 401)
        )
    }

    user.appliedJobs.push(job._id);
    job.appliedUser.push({ name: req.body.name, email: req.body.email, contact: req.body.contact, resume: user.uploadedresume.url, applicationDate: Date() });

    await user.save();
    await job.save();

    sendmail(req, res, next);

    res.json({ message: "You have successfully applied to this Job. Please check the dashboard section to view your applied jobs. An email has been sent to your email address.", job });
});