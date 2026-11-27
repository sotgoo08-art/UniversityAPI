const makeController = require("./base-controller");
const { departments, teachers, courses } = require("../data/data");

const controller = makeController({
  list: departments,
  fields: ["code", "name"],
  label: "Department"
});

controller.getTeachers = (req, res) =>
  res.json(teachers.filter(t => t.departmentId === Number(req.params.id)));

controller.getCourses = (req, res) =>
  res.json(courses.filter(c => c.departmentId === Number(req.params.id)));

module.exports = controller;
