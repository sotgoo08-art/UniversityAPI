const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    credits: { type: Number, default: 3 },
    departmentId: { type: String, default: null },
    teacherId: { type: String, default: null },
    roomId: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);