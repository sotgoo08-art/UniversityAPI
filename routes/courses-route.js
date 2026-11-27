const makeRoutes = require("./base-route");
const c = require("../controllers/course-controller");
const { validateAppCourse, validateAppCoursePartial } = require("../middlewares/validateAppCourse");

const router = makeRoutes(c, {
  writeRoles: ["admin", "teacher"],
  deleteRoles: ["admin"],
  validate: validateAppCourse,
  validatePartial: validateAppCoursePartial
});
router.get("/:id/teacher", c.getTeacher);
router.get("/:id/room", c.getRoom);
router.get("/:id/department", c.getDepartment);

module.exports = router;