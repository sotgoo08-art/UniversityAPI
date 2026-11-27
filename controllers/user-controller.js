const { loadUsers, saveUsers } = require("../data/users");

const safe = (u) => ({ id: u.id, username: u.username, role: u.role });
const ROLES = ["admin", "teacher", "student"];

function getAll(req, res) {
  res.json(loadUsers().map(safe));
}

function getOne(req, res) {
  const user = loadUsers().find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(safe(user));
}

function setRole(req, res) {
  const users = loadUsers();
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!ROLES.includes(req.body.role)) {
    return res.status(400).json({ message: "role must be one of: " + ROLES.join(", ") });
  }
  user.role = req.body.role;
  saveUsers(users);
  res.json(safe(user));
}

function remove(req, res) {
  const users = loadUsers();
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users.splice(index, 1);
  saveUsers(users);
  res.status(204).send();
}

module.exports = { getAll, getOne, setRole, remove };
