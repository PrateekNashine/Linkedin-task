const { asyncErrors } = require("../middlewares/asyncErrors");
const User = require("../models/userModel");
// const Internship = require("../models/internshipModel");
// const Job = require("../models/jobModel");
const ErrorHandler = require('../utils/errorHandler');
// const { sendmail } = require('../utils/nodemailer');
const { setToken } = require('../utils/setToken');
// const path = require('path');


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

// Route: /user/uploadresume (POST)
exports.uploadResume = asyncErrors(async (req, res, next) => {
    
})

// // Route: /user/sendmail (POST)
// exports.usersendmail = asyncErrors(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email }).exec();

//     if (!user) {
//         return next(
//             new ErrorHandler('User associated with this email address not found', 404)
//         )
//     };

//     // const url = Math.floor(Math.random() * 9000 + 1000);

//     // sendmail(req, res, next, url);

//     // user.resetPasswordToken = `${url}`;
//     // await user.save();

//     res.json({ message: "Email sent!" });
// });

// // -------------------------------------------View All Jobs-------------------------------------------

// // Route: /user/viewj-obs (POST)
// exports.viewuserjobs = asyncErrors(async (req, res, next) => {
//     const jobs = await Job.find().exec();

//     res.status(200).json({ jobs })
// });


// // ---------------------------------------------Apply Job---------------------------------------------

// exports.userApplyJob = asyncErrors(async (req, res, next) => {
//     const user = await User.findById(req.id).exec();
//     const job = await Job.findById(req.params.jobid).exec();

//     user.appliedJobs.push(job._id);
//     job.users.push(user._id);

//     await user.save();
//     await job.save();

//     res.json({ message: "You have successfully applied to this Job. Please check the dashboard section to view your applied jobs." });
// });