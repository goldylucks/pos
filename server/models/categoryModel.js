const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("Category", categorySchema);
