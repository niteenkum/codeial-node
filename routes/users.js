const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");
const passport = require("passport");

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get(
  "/user_dashboard",
  passport.checkAuthentication,
  userController.userDashboard
);
router.get(
  "/admin_dashboard",
  passport.checkAuthentication,
  userController.adminDashboard
);
router.get("/sign-up", userController.SignUp);
router.get("/sign-in", userController.SignIn);

router.post("/create", userController.create);
router.post("/add-feedback/:id", userController.addFeedback);



// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

// SIgn Out

router.get("/sign-out", userController.destroySession);

module.exports = router;
