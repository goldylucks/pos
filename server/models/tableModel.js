const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    people: { type: Number, default: 1 },
    totalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tip: { type: Number, default: 0 },
    pay: { type: Number, default: 0 },
    close: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = Tables = mongoose.model("tables", tableSchema);
