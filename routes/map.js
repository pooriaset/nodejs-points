const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const map = require("../models/map");

router.get("/", async (req, res) => {

    let showmap = await map.find({ userid: "5f68b4ee7de3df29acf932e7"});
    res.send(showmap);
});


module.exports = router;