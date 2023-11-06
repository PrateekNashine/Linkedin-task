const express = require('express');
const {
    homepage,
    usersignup, usersignin, usersignout,
    currentuser, 
    usersendmail, uploadResume, viewjobs, userApplyJob} = require('../controllers/userControllers');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// GET /
router.get("/", homepage);

// GET /user
router.get("/currentuser", isAuthenticated, currentuser)

// POST /USER/SIGNUP
router.post("/user/signup", usersignup);

// POST  /USER/SIGNIN
router.post("/user/signin", usersignin);

// GET /USER/SIGNOUT
router.get("/user/signout", isAuthenticated, usersignout);

// POST /USER/SENDMAIL
// router.post("/user/sendmail", isAuthenticated, usersendmail); 

// POST /USER/UPLOADRESUME/:STUDENTID   
router.post("/user/uploadresume/:studentid", isAuthenticated, uploadResume);


// -------------------------------------------View All Jobs-------------------------------------------
// POST /user/view-jobs (GET)
router.get("/user/view-jobs", isAuthenticated, viewjobs );

// ---------------------------------------------Apply Job---------------------------------------------
// POST /user/applyjob/:jobId
router.get("/user/applyjob/:jobid", isAuthenticated, userApplyJob);

module.exports = router;