const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Schema for Employer Database
const companyModel = mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Company name is required"],
    },
    companycontact: {
        type: String,
        required: [true, "Contact is required"],
        minLength: [10, 'Contact should be atleast 3 character long'],
        maxLength: [10, 'Contact should not be more than 10 characters']
    },
    companyemail: {
        type: String,
        unique: true,
        required: [true, "Email address is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password is required"],
        maxLength: [15, 'Password should not exceed more than 15 Characters'],
        minLength: [6, 'Password should have atleast 6 Characters'],
        // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, "Your password must contain: Special Character, Number, Capital letter."]
    },
    jobs: [
        { type: mongoose.Schema.Types.ObjectID, ref: 'job' }
    ]

}, { timestamps: true });

// Salt and Hash for Passwords
companyModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

// Password validation
companyModel.methods.passwordValidation = function (password) {
    return bcrypt.compareSync(password, this.password);
};


// Token Generation
companyModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

const Company = mongoose.model("company", companyModel);

module.exports = Company;