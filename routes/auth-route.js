const express = require("express");
const { register, login } = require("../controllers/auth-controller");
const { authenticateToken } = require("../middlewares/auth");
const { loadUsers } = require("../data/users");
const { teachers, students, departments } = require("../data/data");

const router = express.Router();
/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Auth  /auth/register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/register", register);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Auth  /auth/login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/login", login);

// Нэвтэрсэн хэрэглэгчийн мэдээлэл + өөрийн профайл (багш/оюутан)
/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Auth  /auth/me
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/me", authenticateToken, async (req, res, next) => {
  try {
    const user = await require("../models/User").findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      id: String(user._id),
      username: user.username,
      role: user.role,
      studentCode: req.user.studentCode || null,
      profile: null
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
