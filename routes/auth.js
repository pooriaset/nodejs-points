const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authValidator = require("../validations/authValidators");

router.post("/login", authValidator.loginValidation(), authController.login);

router.post("/register", authValidator.registerValidation(), authController.register);

module.exports = router;