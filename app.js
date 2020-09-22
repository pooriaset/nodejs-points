//Express.js Framework configuation
const express = require("express");
const app = express();

//App Setting is here (e.g. port)
require("dotenv").config({path : "./config/dev.env"})

//Database connection
require("./config/db");

//Static files configuration
app.use(express.static(__dirname + "/public"));


app.use(express.urlencoded({extended : false}));

//All routes configuation (Version: 1.0.0)
app.use("/api/v1", require("./routes/Index"));

//Create a server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});