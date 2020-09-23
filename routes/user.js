const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authorization = require("../validations/authorization");


router.get("/", authorization, async (req, res , next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            data: user,
            tokenExpireTime: req.tokenExpireTime
        });
    }
    catch (err) {
        next(error);
    }

});


module.exports = router;