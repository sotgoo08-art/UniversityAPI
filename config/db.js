const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/university_api";
  try {
    await mongoose.connect(uri);
    console.log("MongoDB холбогдлоо:", uri);
  } catch (err) {
    console.error("MongoDB холболтын алдаа:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;