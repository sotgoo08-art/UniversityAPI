const makeController = require("./base-controller");
const { teachers, courses } = require("../data/data");

const controller = makeController({
  list: teachers,
  fields: ["firstName", "lastName", "email", "departmentId"],
  label: "Teacher"
});

controller.getCourses = (req, res) =>
  res.json(courses.filter(c => c.teacherId === Number(req.params.id)));

module.exports = controller;
