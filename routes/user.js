const express = require("express");
const router = express.Router();
const user = require("../models/user");

router.get("/", async (req, res) => {
    try {
        let countofUsers = await user.find({}).countDocuments(); 
        res.json({ count: countofUsers});

    } catch (err) {
        console.log(err);
    }

});


module.exports = router;