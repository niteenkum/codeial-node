const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get('/', userController.SignIn)

router.use('/users', require("./users"));
router.use('/admin', require("./admin"));



module.exports = router;