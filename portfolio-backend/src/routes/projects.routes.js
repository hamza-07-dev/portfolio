const express = require("express");
const {
  getAll,
  getBySlug,
  create,
  update,
  remove,
} = require("../controllers/projects.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Public
router.get("/", getAll);
router.get("/:slug", getBySlug);

// Protected (admin CMS)
router.post("/", protect, create);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;
