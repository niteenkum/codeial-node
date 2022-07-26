const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);


console.log("rouer file is loaded");
module.exports = router;