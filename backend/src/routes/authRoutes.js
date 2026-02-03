const express = require("express");
const rateLimit = require("express-rate-limit");
const { googleAuth, me, logout } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20
});

router.post("/google", authLimiter, googleAuth);
router.get("/me", authMiddleware, me);
router.post("/logout", authMiddleware, logout);

module.exports = router;
