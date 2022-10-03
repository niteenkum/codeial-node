const User = require("../models/user");
const Performance = require("../models/performance");

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
  User.find({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user in sign in");
      return;
    }
    if (user) {
      if (user[0].role === "admin") {
        return res.redirect("/users/admin_dashboard");
      } else {
        return res.redirect("/users/user_dashboard");
      }
    }
  });
};

// sign out the user

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  return res.redirect("/");
};

// Normal User DashBoard

module.exports.userDashboard = function (req, res) {
  // if (res?.locals?.user?.role === "user") {
  //   return res.render("user_dashboard", {
  //     title: "User Dashboard",
  //   });
  // } else {
  //   return res.redirect("/users/admin_dashboard");
  // }

  if (res?.locals?.user?.role === "user") {
    Performance.find(
      { reviewer: res.locals.user._id, status: "pending" },
      function (err, performances) {
        if (err) {
          console.log("Error in finding the performance");
          return;
        }
        console.log("Performance", performances);
        return res.render("user_dashboard", {
          title: "User Dashboard",
          performances: performances,
        });
      }
    );
  } else {
    return res.redirect("/users/admin_dashboard");
  }
};

// Admin Dashboard
module.exports.adminDashboard = function (req, res) {
  if (res?.locals?.user?.role === "admin") {
    User.find({ role: "user" }, function (err, users) {
      if (err) {
        console.log("Error in finding the users in admin dashboard");
      }
      console.log("User Dashboard", users);
      return res.render("admin_dashboard", {
        title: "Admin Dashboard",
        users: users,
      });
    });
    // return res.render("admin_dashboard", {
    //   title: "Admin Dashboard"
    // });
  } else {
    return res.redirect("/users/user_dashboard");
  }
};

module.exports.addFeedback = function (req, res) {
  const performanceId = req.params.id;
  const comment = req.body.comment;
  const rating = req.body.rating;

  Performance.findByIdAndUpdate(
    performanceId,
    { comment: comment, rating: rating, status: "completed" },
    function (err, performance) {
      if (err) {
        console.log("Error in updating the performance");
        return;
      }
      return res.redirect("/users/user_dashboard");
    }
  );
};
