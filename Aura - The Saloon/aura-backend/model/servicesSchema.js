const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
    name:String,
    description:String,
    category:String,
    price:Number,
});

module.exports = mongoose.model('services',servicesSchema);
