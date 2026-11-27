const makeRoutes = require("./base-route");
const c = require("../controllers/department-controller");

const router = makeRoutes(c, { writeRoles: ["admin"], deleteRoles: ["admin"] });
/**
 * @openapi
 * /departments/{id}/teachers:
 *   get:
 *     summary: Department  /departments/{id}/teachers
 *     tags: [Department]
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
router.get("/:id/teachers", c.getTeachers);
/**
 * @openapi
 * /departments/{id}/courses:
 *   get:
 *     summary: Department  /departments/{id}/courses
 *     tags: [Department]
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
