const fs = require("fs");
const path = require("path");

const STUDENTS_FILE = path.join(__dirname, "..", "students.json");

let students = [];
try {
  students = JSON.parse(fs.readFileSync(STUDENTS_FILE, "utf8").replace(/^\uFEFF/, ""));
} catch (err) {
  console.log("students.json уншигдсангүй, хоосон жагсаалтаар эхэллээ");
}
const saveStudents = () => fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));

const departments = [
  { id: 1, code: "IT", name: "Informatics" },
  { id: 2, code: "MA", name: "Mathematics" }
];

const teachers = [
  { id: 1, firstName: "Ulambayar", lastName: "Turtogtokh", email: "ulambayar@msue.edu.mn", departmentId: 1 },
  { id: 2, firstName: "Urtnasan", lastName: "Gantogtokh", email: "urtnasan@msue.edu.mn", departmentId: 1 }
];

const rooms = [
  { id: 1, code: "2201", building: "2", capacity: 35 },
  { id: 2, code: "2202", building: "2", capacity: 35 },
  { id: 3, code: "12601", building: "12", capacity: 50 }
];

const courses = [
  { id: 1, code: "M.SW322", name: "Web system and technology", credits: 3, departmentId: 1, teacherId: 1, roomId: 1 },
  { id: 2, code: "M.SW317", name: "Computer modelling and simulations", credits: 3, departmentId: 1, teacherId: 2, roomId: 3 }
];

module.exports = { students, saveStudents, departments, teachers, rooms, courses };
