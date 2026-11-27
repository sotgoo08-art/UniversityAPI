const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    departmentId: { type: String, default: null },
    email: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);