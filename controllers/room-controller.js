const makeController = require("./base-controller");
const { rooms, courses } = require("../data/data");

const controller = makeController({
  list: rooms,
  fields: ["code", "building", "capacity"],
  label: "Room",
  filter: (r, q) =>
    (!q.building || r.building === q.building) &&
    (!q.minCapacity || r.capacity >= Number(q.minCapacity))
});

controller.getCourses = (req, res) =>
  res.json(courses.filter(c => c.roomId === Number(req.params.id)));

module.exports = controller;
