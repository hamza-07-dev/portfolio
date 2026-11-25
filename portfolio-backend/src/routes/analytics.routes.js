const express = require("express");
const { track, summary } = require("../controllers/analytics.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/track", track);
router.get("/summary", protect, summary);

module.exports = router;
