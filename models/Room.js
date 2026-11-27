const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    capacity: { type: Number, default: 30 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);