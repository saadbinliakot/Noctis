import express from "express";
import { getUserStats } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user statistics
router.get("/:userId/stats", protect, getUserStats);

export default router;