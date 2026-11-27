const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const existing = await User.findOne({ username }).lean();
    if (existing) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const created = await User.create({
      username,
      password: passwordHash,
      role: "student" // role-г клиентээс авахгүй
    });

    return res.status(201).json({
      id: String(created._id),
      username: created.username,
      role: created.role
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    const user = await User.findOne({ username }).lean();
    const ok = user && (await bcrypt.compare(password, user.password));
    if (!ok) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // student1 хэрэглэгчид code "1" оюутан харгалзана
    const studentCode =
      user.studentCode != null
        ? String(user.studentCode)
        : user.studentId != null
        ? String(user.studentId)
        : user.username === "student1"
        ? "1"
        : null;

    const token = jwt.sign(
      {
        sub: String(user._id),
        username: user.username,
        role: user.role,
        studentCode
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return res.json({
      token,
      user: {
        id: String(user._id),
        username: user.username,
        role: user.role,
        studentCode
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
