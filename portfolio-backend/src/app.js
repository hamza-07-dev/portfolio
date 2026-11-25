const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const projectsRoutes = require("./routes/projects.routes");
const skillsRoutes = require("./routes/skills.routes");
const contactRoutes = require("./routes/contact.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable." });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Erreur serveur interne.",
  });
});

module.exports = app;
