const Map = require("../models/map");
const User = require("../models/user");

const checkMapOwnership = async (req, res, next) => {

    //ID of the user who is logged in to the website!
    let userId = req.user.id;
    let user = await User.findById(userId);

    if (!userId) {
        res.status(500).json({
            message: "خطای احراز هویت",
            status: 500
        });
    }

    let mapid = req.params.id;

    try {
        let map = await Map.findById(mapid);

        //admin can update or delete any map!
        if (!user.isAdmin && map.userid.toString() !== userId) {
            res.status(500).json({ message: "خطا در احراز هویت", status: 500 });
        }

        next();
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "خطای ناشناخته رخ داده است",
            status: 500
        });
    }
}

module.exports = checkMapOwnership;