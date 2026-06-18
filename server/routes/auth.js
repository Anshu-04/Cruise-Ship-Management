import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// 🔒 Protected Route - any logged in user
router.get("/protected", protect, (req, res) => {
  res.json({
    message: "✅ You are authorized",
    user: req.user,
  });
});

// 🔒 Admin-only route
router.get("/admin-only", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "👑 Welcome Admin",
    user: req.user,
  });
});

export default router;
