const mongoose = require('mongoose');

// Schema for Job Database
const jobModel = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'company', 
    },
    appliedUser: [],
    jobRole: {
        type: String,
        required: [true, "Job role is required"]
    },
    requiredSkills: {
        type: String,
        required: [true, "Enter the required skills for the job."]
    },
    jobdescription: {
        type: String,
        required: [true, "Enter Job description."],
        minLength: [15, "Job description should be more than 15 characters."],
        maxLength: [100, "Job description should not be more than 100 characters."],
        trim: []
    },
    salary: {
        type: String,
        required: [true, "Salary field can't be empty."]
    },
    // applicationDate: new Date("<YYYY-mm-dd>")
    // applicationdeadline: {
    //     type: String,
    //     required: [true, "Job deadline date is required."]
    // }

}, { timestamps: true });


const Job = mongoose.model("job", jobModel);

module.exports = Job;