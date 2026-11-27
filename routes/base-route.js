const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { authorizeRoles } = require("../middlewares/authorize");

// Дараалал: authenticateToken -> authorizeRoles -> validate -> controller
// GET: нэвтэрсэн бүх хэрэглэгч. Бичих: writeRoles. Устгах: deleteRoles.
function makeRoutes(c, { writeRoles, deleteRoles, validate, validatePartial }) {
  const router = express.Router();
  const full = validate ? [validate] : [];
  const partial = validatePartial ? [validatePartial] : [];

  router.use(authenticateToken);
  /**
   * @openapi
   * /:
   *   get:
   *     summary: Base  /
   *     tags: [Base]
   *     responses:
   *       200:
   *         description: OK
   */
  router.get("/", c.getAll);
  /**
   * @openapi
   * /{id}:
   *   get:
   *     summary: Base  /{id}
   *     tags: [Base]
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
   * /:
   *   post:
   *     summary: Base  /
   *     tags: [Base]
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
  router.post("/", authorizeRoles(...writeRoles), ...full, c.create);
  /**
   * @openapi
   * /{id}:
   *   put:
   *     summary: Base  /{id}
   *     tags: [Base]
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
  router.put("/:id", authorizeRoles(...writeRoles), ...full, c.replace);
  /**
   * @openapi
   * /{id}:
   *   patch:
   *     summary: Base  /{id}
   *     tags: [Base]
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
  router.patch("/:id", authorizeRoles(...writeRoles), ...partial, c.update);
  /**
   * @openapi
   * /{id}:
   *   delete:
   *     summary: Base  /{id}
   *     tags: [Base]
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
  router.delete("/:id", authorizeRoles(...deleteRoles), c.remove);
  return router;
}

module.exports = makeRoutes;