//Express.js Framework configuation
const express = require("express");
const app = express();

//App Setting is here (e.g. port)
require("dotenv").config();

//Database Connection!
require("./config/db");

//All routes configuation
app.use("/", require("./routes/Index"));


//Create a server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});