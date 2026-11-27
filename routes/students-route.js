const makeRoutes = require("./base-route");
const c = require("../controllers/student-controller");

module.exports = makeRoutes(c, { writeRoles: ["admin", "teacher"], deleteRoles: ["admin"] });
