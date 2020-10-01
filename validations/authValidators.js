const { body } = require("express-validator");
class AuthValidators {
    loginValidation = () => {
        return [
            body("username", "نام کاربری وارد نشده است").notEmpty().escape(),
            body("password", "رمز عبور وارد نشده است").notEmpty().escape()
        ];
    }

    registerValidation = () => {
        return [
            body("username", "نام کاربری وارد نشده است").notEmpty().escape(),
            body("password", "رمز عبور وارد نشده است").notEmpty().escape(),
            body("email", "ایمیل وارد نشده است").notEmpty().escape(),
            body("email" , "ایمیل به درستی وارد نشده است").normalizeEmail().isEmail().escape(),
            body("fullname", "نام و نام خانوادگی وارد نشده است").notEmpty().escape()
        ];
    }
}

module.exports = new AuthValidators;