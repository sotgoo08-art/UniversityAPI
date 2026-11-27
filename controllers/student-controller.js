const Student = require("../models/Student");

function formatStudent(doc) {
  const nameParts = (doc.name || "").trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    id: doc.code || String(doc._id),
    _id: doc._id,
    name: doc.name,
    firstName,
    lastName,
    code: doc.code,
    email: doc.email || "",
    courseId: doc.courseId || null
  };
}

function buildIdQuery(id) {
  const clauses = [{ code: String(id) }];
  if (/^[0-9a-fA-F]{24}$/.test(String(id))) {
    clauses.push({ _id: id });
  }
  return { $or: clauses };
}

function getStudentFilterForUser(user) {
  if (!user || user.role !== "student") return null;
  const code = user.studentCode || (user.username === "student1" ? "1" : null);
  if (!code) return { _id: null };
  return {
    $or: [{ code: String(code) }, { email: user.username }]
  };
}

async function getAll(req, res, next) {
  try {
    const { search } = req.query;
    const filter = {};

    const roleFilter = getStudentFilterForUser(req.user);
    if (roleFilter) {
      filter.$and = filter.$and || [];
      filter.$and.push(roleFilter);
    }

    if (search) {
      const regex = new RegExp(String(search), "i");
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [{ name: regex }, { code: regex }, { email: regex }]
      });
    }

    const docs = await Student.find(filter).lean();
    return res.json(docs.map(formatStudent));
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const doc = await Student.findOne(buildIdQuery(req.params.id)).lean();
    if (!doc) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (req.user?.role === "student") {
      const myCode =
        req.user.studentCode || (req.user.username === "student1" ? "1" : null);
      if (String(doc.code) !== String(myCode) && doc.email !== req.user.username) {
        return res
          .status(403)
          .json({ message: "Forbidden: you can only view your own student record" });
      }
    }

    return res.json(formatStudent(doc));
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { name, firstName, lastName, code, email, courseId } = req.body;
    const fullName = (name || `${firstName || ""} ${lastName || ""}`).trim();
    if (!fullName || !code) {
      return res
        .status(400)
        .json({ message: "name (or firstName/lastName) and code are required" });
    }

    const created = await Student.create({
      name: fullName,
      code: String(code),
      email: email || "",
      courseId: courseId || null
    });

    return res.status(201).json(formatStudent(created.toObject()));
  } catch (err) {
    next(err);
  }
}

async function replace(req, res, next) {
  try {
    const { name, firstName, lastName, code, email, courseId } = req.body;
    const fullName = (name || `${firstName || ""} ${lastName || ""}`).trim();
    if (!fullName || !code) {
      return res
        .status(400)
        .json({ message: "name (or firstName/lastName) and code are required" });
    }

    const replaced = await Student.findOneAndUpdate(
      buildIdQuery(req.params.id),
      {
        $set: {
          name: fullName,
          code: String(code),
          email: email || "",
          courseId: courseId || null
        }
      },
      { new: true }
    ).lean();

    if (!replaced) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json(formatStudent(replaced));
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name, firstName, lastName, code, email, courseId } = req.body;
    const updateDoc = {};

    if (name || firstName || lastName) {
      updateDoc.name = (name || `${firstName || ""} ${lastName || ""}`).trim();
    }
    if (code !== undefined) updateDoc.code = String(code);
    if (email !== undefined) updateDoc.email = email;
    if (courseId !== undefined) updateDoc.courseId = courseId;

    const updated = await Student.findOneAndUpdate(
      buildIdQuery(req.params.id),
      { $set: updateDoc },
      { new: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json(formatStudent(updated));
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await Student.findOneAndDelete(buildIdQuery(req.params.id)).lean();
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json({ message: "Student deleted", id: deleted.code || String(deleted._id) });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getOne, create, replace, update, remove };
