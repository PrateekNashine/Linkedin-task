const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const { asyncErrors } = require('../middlewares/asyncErrors');

exports.isAuthenticated = asyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(
        new ErrorHandler("Please log in to access the resource.", 401)
    )

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.id = id;
    next();
});