const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "users.json");

const loadUsers = () => JSON.parse(fs.readFileSync(FILE, "utf8").replace(/^\uFEFF/, ""));
const saveUsers = (users) => fs.writeFileSync(FILE, JSON.stringify(users, null, 2));

module.exports = { loadUsers, saveUsers };
