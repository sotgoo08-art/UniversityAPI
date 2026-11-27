const makeRoutes = require("./base-route");
const c = require("../controllers/teacher-controller");

const router = makeRoutes(c, { writeRoles: ["admin"], deleteRoles: ["admin"] });
/**
 * @openapi
 * /teachers/{id}/courses:
 *   get:
 *     summary: Teacher  /teachers/{id}/courses
 *     tags: [Teacher]
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
