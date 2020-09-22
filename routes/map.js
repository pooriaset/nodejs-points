const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Map = require("../models/map");
const ObjectId = mongoose.Types.ObjectId;
const authorization = require("../validations/authorization");

router.post("/", authorization, async (req, res) => {
    try {
        let newMap = new Map({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            address: req.body.address,
            phone: req.body.phone,
            userid: ObjectId(req.user.id)
        });

        await newMap.save();
        res.status(200).json({ message: "با موفقیت ثبت شد!", status: 200 });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "خطای ناشناخته رخ داده است!", status: 500 });
    }

});

router.get("/page/:page", async (req, res) => {
    const pagesize = 2;
    const page = req.params.page;
    try {
        let maps = await Map.find().skip(pagesize * (page - 1)).limit(pagesize);
        if(!maps.length)
        {
            res.status(500).json({
                message: "موردی یافت نشد",
                status: 500
            });
        }
        res.status(200).json({
            data: maps,
            status: 200,
            message: "با موفقیت به روز شد"
        });
    }
    catch (error) {
        res.json({
            message : "خطای ناشناخته رخ داده است!",
            status : 500
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let map = await Map.findById(req.params.id);
        res.status(200).json(map);
    }
    catch (error) {
        res.status(500).json({ message: "خطای ناشناخته رخ داده است!", status: 500 });
    }
});

router.put("/:id", async (req,res)=>{
    
});

module.exports = router;