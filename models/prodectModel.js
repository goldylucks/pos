const mongoose = require("mongoose");

const prodectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    cid: {type: String, required: true},
    price: {type: String, required: true}},
    {timestamps: true }
);

module.exports = prodect = mongoose.model("prodect", prodectSchema);