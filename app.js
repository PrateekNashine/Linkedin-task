require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();

// Database Connection
require('./models/database').connectDatabase();

// Logger
const logger = require('morgan');
app.use(logger("tiny"));

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sessions and Cookies
const session = require('express-session');
const cookieparser = require('cookie-parser');

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSOION_SECRET
}));
app.use(cookieparser());

// Express file-upload
const fileupload = require('express-fileupload');
app.use(fileupload());

// Routes
app.use("/", require('./routes/userRoutes'));
app.use("/company", require('./routes/companyRoutes'));

// Error Handling
const { generatedErrors } = require('./middlewares/error');
const ErrorHandler = require('./utils/errorHandler');
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested URL ${req.url} not found`, 404));
});
app.use(generatedErrors);

// PORT
app.listen(
    process.env.PORT,
    console.log(`Server running on ${process.env.PORT}`)
);