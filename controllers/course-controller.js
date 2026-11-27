const makeController = require("./base-controller");
const { courses, teachers, rooms, departments } = require("../data/data");

const controller = makeController({
  list: courses,
  fields: ["code", "name", "credits", "departmentId", "teacherId", "roomId"],
  label: "Course",
  filter: (c, q) =>
    (!q.credits || c.credits === Number(q.credits)) &&
    (!q.code || c.code === q.code)
});

function relation(list, key, label) {
  return (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));
    if (!course) return res.status(404).json({ message: "Course not found" });
    const related = list.find(x => x.id === course[key]);
    if (!related) return res.status(404).json({ message: label + " not found" });
    res.json(related);
  };
}

controller.getTeacher = relation(teachers, "teacherId", "Teacher");
controller.getRoom = relation(rooms, "roomId", "Room");
controller.getDepartment = relation(departments, "departmentId", "Department");

module.exports = controller;
