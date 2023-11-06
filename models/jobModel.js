const mongoose = require('mongoose');

// Schema for Job Database
const jobModel = mongoose.Schema({
    companyName: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'company',
        required: [true, "Company name is required"]
    },
    appliedUser: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'users'
    }],
    jobRole: {
        type: String,
        required: [true, "Job role is required"]
    },
    jobType: {
        type: String,
        enum: ["In Office/Hybrid", "Work from Home"],
        required: [true, "Select job type"]
    },
    requiredSkills: {
        type: String,
        required: [true, "Enter the required skills for the job."]
    },
    jobopenings: {
        type: Number,
        required: [true, "Enter the job opening quantity."]
    },
    jobdescription: {
        type: String,
        required: [true, "Enter Job description."],
        minLength: [15, "Job description should be more than 15 characters."],
        maxLength: [100, "Job description should not be more than 100 characters."],
        trim: []
    },
    preferences: String,
    salary: {
        type: String,
        required: [true, "Salary field can't be empty."]
    },
    perks: String,
    assesments: String,

}, { timestamps: true });


const Job = mongoose.model("job", jobModel);

module.exports = Job;