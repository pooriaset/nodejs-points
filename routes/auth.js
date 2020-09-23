const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/login", async (req, res, next) => {

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username: username });
        if (!user) {
            let json = {
                message: "کاربری با این نام کاربری یافت نشد!",
                status: 500
            };
            res.status(500).json(json);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            let json = {
                message: "اطلاعات ورودی اشتباه وارد شده است!",
                status: 500
            };
            res.status(500).json(json);
        }
        const paylaod = {
            user: {
                id: user.id
            }
        };

        jwt.sign(paylaod, "string", { algorithm: "HS256", expiresIn: "2 days" }, (error, token) => {
            if (error)
                throw error;

            res.status(200).json({
                authorization: token
            });
        });

    }
    catch (error) {
        next(error);
    }

});

router.post("/register", async (req, res, next) => {

    const { username, password, email, fullname } = req.body;

    try {
        let user = await User.findOne({ username: username });
        if (user) {
            let json = {
                message: "این نام کاربری قبلا انتخاب شده است.",
                status: 500
            };
            res.status(500).json(json);
        }

        user = new User({
            fullname,
            username,
            password,
            email
        });
        user.password = bcrypt.hashSync(password, 10);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, "string", { algorithm: "HS256", expiresIn: "2 days" }, (error, token) => {
            if (error) {
                throw error;
            }
            res.status(200).json({ authorization: token });
        })

    }
    catch (error) {
        next(error);
    }
});

module.exports = router;