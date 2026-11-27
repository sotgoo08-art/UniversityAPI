const makeRoutes = require("./base-route");
const c = require("../controllers/room-controller");

const router = makeRoutes(c, { writeRoles: ["admin"], deleteRoles: ["admin"] });
/**
 * @openapi
 * /rooms/{id}/courses:
 *   get:
 *     summary: Room  /rooms/{id}/courses
 *     tags: [Room]
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
router.get("/:id/courses", c.getCourses);

module.exports = router;
