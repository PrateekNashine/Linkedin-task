const express = require('express');
const {
    homepage,
    usersignup, usersignin, usersignout,
    currentuser, 
    usersendmail, uploadResume} = require('../controllers/userControllers');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// GET /
router.get("/", homepage);

// GET /student
router.get("/currentuser", isAuthenticated, currentuser)

// POST /USER/SIGNUP
router.post("/user/signup", usersignup);

// POST  /USER/SIGNIN
router.post("/user/signin", usersignin);

// GET /USER/SIGNOUT
router.get("/user/signout", isAuthenticated, usersignout);

// POST /USER/SENDMAIL
// router.post("/user/sendmail", isAuthenticated, usersendmail); 

// POST /USER/UPLOADRESUME
// router.post("/user/uploadresume", isAuthenticated, uploadResume);


// -------------------------------------------View All Jobs-------------------------------------------
// POST /user/view-jobs
// router.post("/user/view-jobs", isAuthenticated, viewuserjobs);

// ---------------------------------------------Apply Job---------------------------------------------
// POST /student/applyjob/:jobId
// router.post("/student/applyjob/:jobid", isAuthenticated, studentApplyJob);

module.exports = router;