// Апп-ын /courses endpoint-ийн validation (name, credits, departmentId, teacherId, roomId).
// String тоо ("3") ирвэл эерэг бүхэл тоо болгон хөрвүүлж шалгана.
const isText = (v) => typeof v === "string" && v.trim() !== "";

function parsePositiveInt(v) {
  if (typeof v === "number") {
    return Number.isInteger(v) && v > 0 ? v : null;
  }
  if (typeof v === "string" && /^\d+$/.test(v.trim())) {
    const n = Number(v.trim());
    return Number.isInteger(n) && n > 0 ? n : null;
  }
  return null;
}

const INT_FIELDS = ["credits", "departmentId", "teacherId", "roomId"];

const TEXT_RULES = [
  ["code", isText, "code талбар шаардлагатай"],
  ["name", isText, "name талбар шаардлагатай"]
];

function check(body, partial) {
  const errors = [];
  const normalized = { ...body };

  if (partial && Object.keys(body).length === 0) {
    errors.push("Өөрчлөх талбар оруулаагүй байна");
    return { errors, normalized };
  }

  for (const [field, test, message] of TEXT_RULES) {
    if (partial && body[field] === undefined) continue;
    if (!test(body[field])) errors.push(message);
  }

  for (const field of INT_FIELDS) {
    if (partial && body[field] === undefined) continue;
    const parsed = parsePositiveInt(body[field]);
    if (parsed === null) {
      errors.push(`${field} эерэг бүхэл тоо байх ёстой`);
    } else {
      normalized[field] = parsed;
    }
  }

  return { errors, normalized };
}

function respond(result, req, res, next) {
  if (result.errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors: result.errors });
  }
  req.body = result.normalized;
  next();
}

function validateAppCourse(req, res, next) {
  respond(check(req.body || {}, false), req, res, next);
}

function validateAppCoursePartial(req, res, next) {
  respond(check(req.body || {}, true), req, res, next);
}

module.exports = { validateAppCourse, validateAppCoursePartial };