const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
class AuthController {

    async login(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(422).json({
                message: "اعتبارسنجی با شکست مواجه شد. اطلاعات وارد شده صحیح نیست!",
                errors: errors.array()
            });
        }

        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username: username });
            if (!user) {
                let error = new Error("کاربری با این نام کاربری یافت نشد!");
                error.statusCode = 401;
                next(error);
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                let error = new Error("اطلاعات ورودی اشتباه است!");
                error.statusCode = 401;
                next(error);
            }
            const paylaod = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(paylaod, "string", { algorithm: "HS256", expiresIn: "2 days" }, (err, token) => {
                if (err)
                    throw err;

                res.status(200).json({
                    authorization: token
                });
            });

        }
        catch (err) {
            next(err);
        }

    }

    async register(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: "اعتبارسنجی با شکست مواجه شد. اطلاعات وارد شده صحیح نیست!",
                errors: errors.array()
            });
        }

        const { username, password, email, fullname } = req.body;

        try {
            let user = await User.findOne({ username: username });
            if (user) {
                let error = new Error("این نام کاربری قبلا انتخاب شده است.");
                error.statusCode = 401;
                next(error);
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
    }

}

module.exports = new AuthController;