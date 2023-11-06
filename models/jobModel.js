const mongoose = require('mongoose');

// Schema for Job Database
const jobModel = mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'company'
    },
    appliedUser: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'users'
    }],
    jobRole: String,
    jobType: {
        type: String,
        enum: ["In Office/Hybrid", "Remote"],
    },
    requiredSkills: String,
    jobopenings: Number,
    jobdescription: String,
    preferences: String,
    salary: Number,
    perks: String,
    assesments: String,

}, { timestamps: true });


const Job = mongoose.model("job", jobModel);

module.exports = Job;