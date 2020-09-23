const mongoose = require("mongoose");
const Map = require("../models/map");
const ObjectId = mongoose.Types.ObjectId;
const {validationResult} = require("express-validator/check");

class MapController {
    async getById(req, res) {
        try {
            let map = await Map.findById(req.params.id);
            res.status(200).json(map);
        }
        catch (error) {
            res.status(500).json({ message: "خطای ناشناخته رخ داده است!"});
        }
    }

    async getByPage(req, res) {
        const pagesize = 2;
        const page = req.params.page;
        try {
            let maps = await Map.find().skip(pagesize * (page - 1)).limit(pagesize);
            if (!maps.length) {
                res.status(404).json({
                    message: "موردی یافت نشد"
                });
            }
            res.status(200).json(maps);
        }
        catch (error) {
            res.status(500).json({
                message: "خطای ناشناخته رخ داده است!"
            });
        }
    }

    async createMap(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(422).json({
                message : "اعتبارسنجی با شکست مواجه شد. اطلاعات وارد شده صحیح نیست!",
                errors : errors.array()
            });
        }

        try {
            let newMap = new Map({
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                address: req.body.address,
                phone: req.body.phone,
                userid: ObjectId(req.user.id)
            });

            await newMap.save();
            res.status(201).json({ message: "با موفقیت ثبت شد!"});
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "خطای ناشناخته رخ داده است!" });
        }

    }

    async updateOne(req, res) {
        try {

            await Map.updateOne({ _id: req.params.id }, { $set: req.body });

            res.status(200).json({
                message: "با موفقیت ویرایش شد!"
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "خطای ناشناخته رخ داده است!"
            });
        }
    }

    async deleteOne(req, res) {
        try {
            await Map.deleteOne({ _id: req.params.id });
            res.status(200).json({
                message: "با موفقیت حذف شد!"
            });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: "خطای ناشناخته رخ داده است!"
            });
        }
    }
}


module.exports = new MapController;