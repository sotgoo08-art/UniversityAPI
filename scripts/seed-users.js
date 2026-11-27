const bcrypt = require("bcryptjs");
const fs = require("fs");
const users = [
  { id: 1, username: "admin",    passwordHash: bcrypt.hashSync("Admin123!", 10),   role: "admin" },
  { id: 2, username: "teacher1", passwordHash: bcrypt.hashSync("Teacher123!", 10), role: "teacher" },
  { id: 3, username: "student1", passwordHash: bcrypt.hashSync("Student123!", 10), role: "student" }
];
fs.writeFileSync("data/users.json", JSON.stringify(users, null, 2));
console.log("data/users.json үүслээ");
