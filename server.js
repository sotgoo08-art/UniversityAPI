require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3001,http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Middleware дараалал: CORS -> express.json -> logger -> routes -> /api-docs -> 404 -> errorHandler
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const err = new Error("CORS policy: origin not allowed");
    err.statusCode = 403;
    return callback(err);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "University API is running", docs: "/api-docs" });
});

const openapiPath = path.join(__dirname, "swagger", "openapi.yaml");
const swaggerDocument = YAML.load(openapiPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/demo-error", (req, res, next) => {
  const err = new Error("Simulated internal server error");
  err.statusCode = 500;
  next(err);
});

app.use("/public", require("./routes/public-route"));
app.use("/auth", require("./routes/auth-route"));
app.use("/users", require("./routes/users-route"));
app.use("/students", require("./routes/students-route"));
app.use("/courses", require("./routes/courses-route"));
app.use("/departments", require("./routes/departments-route"));
app.use("/teachers", require("./routes/teachers-route"));
app.use("/rooms", require("./routes/rooms-route"));

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger UI at http://localhost:${PORT}/api-docs`);
  });
});