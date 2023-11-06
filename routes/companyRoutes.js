const express = require('express');
const {
    homepage,
    accountsignup, accountsignin, accountsignout,
    currentaccount, 
    companysendmail} = require('../controllers/companyControllers');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// GET /
router.get("/", homepage);

// GET /student
router.get("/currentaccount", isAuthenticated, currentaccount)

// POST /COMPANY/SIGNUP
router.post("/signup", accountsignup);

// POST  /COMPANY/SIGNIN
router.post("/signin", accountsignin);

// GET /COMPANY/SIGNOUT
router.get("/signout", isAuthenticated, accountsignout);

// POST /COMPANY/SENDMAIL
// router.post("/company/sendmail", isAuthenticated, companysendmail); 

// -----------------------------------------------Jobs-----------------------------------------------

// // POST /employer/job/create 
// router.post("/job/create", isAuthenticated, createJob);

// // POST /employer/job/read (READ ALL INTERNSHIPS)
// router.post("/job/read", isAuthenticated, readAllJob);

// // POST /employer/job/read/:id (READ A SINGLE INTERNSHIP)
// router.post("/job/read/:id", isAuthenticated, readJob);

module.exports = router;