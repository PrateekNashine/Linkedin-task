const nodemailer = require('nodemailer');
const ErrorHandler = require('./errorHandler');

exports.sendmail = (req, res, next, url) => {

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.SENTMAIL_EMAIL,
            pass: process.env.SENTMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "LinkedIn",
        to: req.body.email,
        subject: "Reset Password Link",
        html: `<h5>Your application was sent to (Company Name)</h5>`,
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return next(
            new ErrorHandler(err, 500)
        )
        console.log(info);
        return res.status(200).json({
            message: "Mail sent Successfully",
            url
        });
    });
}