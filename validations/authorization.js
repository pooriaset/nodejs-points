const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, "string", { algorithm: "HS256" }, (error, decoded) => {
            
            if (error || !decoded.user) {
                res.status(500).json({ message: "خطا در احراز هویت", status: 500 });
            }

            req.user = decoded.user;
            req.tokenExpireTime = decoded.exp;
        
            next();
        })
    }
    else {
        res.status(500).json({ message: "خطا در احراز هویت", status: 500 });
    }
};


module.exports = authorization;