const express = require("express");
const { getAll, create, update, remove } = require("../controllers/skills.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAll);
router.post("/", protect, create);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

module.exports = router;
