const express = require("express");
const rateLimit = require("express-rate-limit");
const { create, getAll, updateStatus } = require("../controllers/contact.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Prevent contact-form spam/abuse
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: { error: "Trop de messages envoyés. Réessayez plus tard." },
});

// Public
router.post("/", contactLimiter, create);

// Protected (admin inbox)
router.get("/", protect, getAll);
router.patch("/:id/status", protect, updateStatus);

module.exports = router;
