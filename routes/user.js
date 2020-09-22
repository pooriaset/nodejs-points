const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authorization = require("../validations/authorization");


router.get("/", authorization, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            data: user,
            tokenExpireTime: req.tokenExpireTime,
            message: "اطلاعات دریافت شد",
            status: 200
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "خطای ناشناخته رخ داده است!",
            status: 500
        });
    }

});


module.exports = router;