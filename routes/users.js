const express = require('express');
const router = express.Router();
const userController = require("../controllers/users_controller");
const passport = require('passport');


router.get('/profile',passport.checkAuthentication ,userController.profile);
router.get('/sign-up', userController.SignUp);
router.get('/sign-in', userController.SignIn);
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
  { failureRedirect: '/users/sign-in'}
),userController.createSession);


// SIgn Out

router.get('/sign-out', userController.destroySession);

module.exports = router;