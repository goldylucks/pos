const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cid: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = product = mongoose.model("product", productSchema);
