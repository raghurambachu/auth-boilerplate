const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

// Signup route
router.post("/", usersController.createUser);
// login
router.post("/login", authController.login);

module.exports = router;
