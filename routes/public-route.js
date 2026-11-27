const express = require("express");
const { courses, departments } = require("../data/data");

// Нийтэд нээлттэй, зөвхөн унших. Хувийн мэдээлэл (багш, өрөөний id) орохгүй.
const router = express.Router();

/**
 * @openapi
 * /courses:
 *   get:
 *     summary: Public  /courses
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/courses", (req, res) => {
  res.json(courses.map(({ id, code, name, credits }) => ({ id, code, name, credits })));
});

/**
 * @openapi
 * /departments:
 *   get:
 *     summary: Public  /departments
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/departments", (req, res) => {
  res.json(departments.map(({ id, code, name }) => ({ id, code, name })));
});

module.exports = router;
