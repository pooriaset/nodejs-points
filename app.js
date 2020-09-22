//Express.js Framework configuation
const express = require("express");
const app = express();

//App Setting is here (e.g. port)
require("dotenv").config();

//Database connection
require("./config/db");

//Static files configuration
app.use(express.static(__dirname + "/public"));


app.use(express.urlencoded({extended : false}));

//All routes configuation
app.use("/", require("./routes/Index"));

//Create a server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});