const User = require("../models/user");

module.exports.profile = function (req, res) {
  res.render("user_profile", {
    title: "User Profile Page",
  });
};

// render the sign up page
module.exports.SignUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.SignIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// adding the sign up data

module.exports.create = function (req, res) {
  console.log(req.body);
  if (req.body.password !== req.body.confirm_password) {
    console.log("password and confirm password didn't matched");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user in sign up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating the user in sign up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/users/profile");
};


// sign out the user

module.exports.destroySession = function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
  });
  return res.redirect("/");
}