//Express.js Framework configuation
const express = require("express");
const router = express.Router();

//import controller
const MapController = require("../controllers/MapController");

//Validation config
const authorization = require("../validations/authorization");
const checkMapOwnership = require("../validations/checkMapOwnership");
const { body } = require("express-validator/check");

//GET (get single map by id)
router.get("/:id", MapController.getById);

//GET (get map by page)
router.get("/page/:page", MapController.getByPage);

//POST (create new map)
router.post("/create",
    authorization,
    [
        body('latitude' , "لتیتود باید از جنس عدد باشد").isNumeric(),
        body('longitude', "لانگیتود باید از جنس عدد باشد").isNumeric(),
        body('address', "آدرس باید حداقل ۵ کاراکتر باشد").trim().isString().isLength({ min: 5 }),
        body('phone', "تلفن نباید خالی باشد").trim().notEmpty(),
        body('phone', "تلفن باید حداکثر ۱۱ کاراکتر باشد").trim().isLength({ max: 11 })
    ],
    MapController.createMap);

//PUT (update a map data)
router.put("/update/:id", authorization, checkMapOwnership, MapController.updateOne);

//Delete (delete a map)
router.delete("/delete/:id", authorization, checkMapOwnership, MapController.deleteOne);


module.exports = router;