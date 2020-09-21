//Express.js configuration
const express = require("express");
const router = express.Router();

//All routes configuration
router.use("/auth" , require("./auth"));
router.use("/user", require("./user"));
router.use("/map", require("./map"));

module.exports = router;