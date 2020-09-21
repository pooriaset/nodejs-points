const express = require("express");
const router = express.Router();

router.post("/login" , (req,res)=>{
    res.statusCode = 200;
    res.json({name : "login"});
});


router.post("/register", (req, res) => {
    res.statusCode = 200;
    res.json({ name: "register" });
});

module.exports = router;