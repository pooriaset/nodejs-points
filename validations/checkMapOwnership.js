const Map = require("../models/map");
const User = require("../models/user");

const checkMapOwnership = async (req, res, next) => {

    //ID of the user who is logged in to the website!
    let userId = req.user.id;
    let user = await User.findById(userId);

    if (!userId) {
        res.status(401).json({
            message: "خطای احراز هویت",
            status: 401
        });
    }

    let mapid = req.params.id;

    try {
        let map = await Map.findById(mapid);

        //admin can update or delete any map!
        if (!user.isAdmin && map.userid.toString() !== userId) {
            res.status(401).json({ message: "خطا در احراز هویت", status: 401 });
        }

        next();
    }
    catch (error) {
        next(error);
    }
}

module.exports = checkMapOwnership;