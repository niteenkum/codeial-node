const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const passport = require("passport");

router.get(
  "/add_new_emp",
  passport.checkAuthentication,
  adminController.AddNew
);
router.get(
  "/view_user/:id",
  passport.checkAuthentication,
  adminController.viewUser
);
router.post(
  "/update-user/:id",
  passport.checkAuthentication,
  adminController.updateUser
);
router.get(
  "/make-admin/:id",
  passport.checkAuthentication,
  adminController.makeAdmin
);
router.get(
  "/delete/:id",
  passport.checkAuthentication,
  adminController.deleteUser
);


router.post(
  "/reviewer/:id",
  passport.checkAuthentication,
  adminController.assignReviewer
)



module.exports = router;
