//Express.js configuration
const express = require("express");
const router = express.Router();

//swagger configuration
const swagger = require("swagger-ui-express");
const swaggerDoc = require('../swagger.json');

//All routes configuration
router.use("/auth" , require("./auth"));
router.use("/user", require("./user"));
router.use("/map", require("./map"));

//intilize swagger document route
router.use("/docs", swagger.serve, swagger.setup(swaggerDoc));

module.exports = router;