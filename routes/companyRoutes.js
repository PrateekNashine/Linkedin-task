const express = require('express');
const {
    homepage,
    accountsignup, accountsignin, accountsignout,
    currentaccount,
    createJob, readAllJob, readJob,
    readJobApplicatons, downloadApplications } = require('../controllers/companyControllers');
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

// -----------------------------------------------Jobs-----------------------------------------------

// POST /employer/job/create 
router.post("/job/create", isAuthenticated, createJob);

// POST /employer/job/read (Read all JOBS by COMPANY)
router.get("/job/read", isAuthenticated, readAllJob);

// POST /employer/job/read/:jobid (Read a Specific JOB by COMPANY)
router.post("/job/read/:id", isAuthenticated, readJob);

// ------------------------------------------Read Applications------------------------------------------

// POST /employer/job/readapplications/:jobid (Read all applications)
router.get("/job/readapplications/:id", isAuthenticated, readJobApplicatons);

// GET /employer/job/downloadapplications/:jobid'
router.get("/job/downloadapplications/:id", isAuthenticated, downloadApplications);

module.exports = router;