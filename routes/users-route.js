const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { authorizeRoles } = require("../middlewares/authorize");
const c = require("../controllers/user-controller");

const router = express.Router();
router.use(authenticateToken, authorizeRoles("admin"));
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Users  /users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", c.getAll);
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Users  /users/{id}
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:id", c.getOne);
/**
 * @openapi
 * /users/{id}/role:
 *   patch:
 *     summary: Users  /users/{id}/role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
router.patch("/:id/role", c.setRole);
/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Users  /users/{id}
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete("/:id", c.remove);

module.exports = router;