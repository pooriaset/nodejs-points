const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const mapSchema = mongoose.Schema({
    latitude: { type: Number, required : true},
    longitude: { type: Number, required : true},
    address: { type: String, required : true},
    phone: { type: String},
    userid: { type: ObjectId, required : true},
    date: { type: Date, required : true , default : new Date()}
});

module.exports = mongoose.model("map" , mapSchema);
