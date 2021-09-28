const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    tid: { type: String, required: true },
    pid: { type: String, required: true },
    cansel: { type: Number },
  },
  { timestamps: true }
);

module.exports = order = mongoose.model("order", orderSchema);
