const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
    courseId: { type: String, default: null },
    email: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);