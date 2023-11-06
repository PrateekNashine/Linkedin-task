const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Schema for student database
const userModel = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"],
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
        minLength: [10, 'Invalid mobile number'],
        maxLength: [10, 'Invalid mobile number']
    },
    city: {
        type: String,
        required: [true, "PLease enter your city"],
    },
    country:{
        type: String,
        required:[true, "Please select your country"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: [true, "Gender is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email address is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, 'Password should not exceed more than 15 Characters'],
        minLength: [6, 'Password should have atleast 6 Characters'],
        // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, "Your password must contain: Special Character, Number, Capital letter"]
    },
    uploadedresume: {
        type: Object,
        default: {
            fileId: "",
            url: ""
        }
    },
    appliedJobs: [
        { type: mongoose.Schema.Types.ObjectID, ref: 'job' }
    ]

}, { timestamps: true });

// Salt and Hash for Passwords
userModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

// Password validation
userModel.methods.passwordValidation = function (password) {
    return bcrypt.compareSync(password, this.password);
};


// Token Generation
userModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Users = mongoose.model("users", userModel);

module.exports = Users;