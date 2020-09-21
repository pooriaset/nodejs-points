const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const mapSchema = mongoose.Schema({
    latitude : {type : Number , require : true},
    longitude: { type: Number , require : true},
    address : {type : String , rquire : true},
    phone: { type: String},
    userid: { type: ObjectId , require : true},
    date : {type : Date , require : true , default : new Date()}
});

module.exports = mongoose.model("map" , mapSchema);
