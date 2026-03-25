import express from "express";
import { getUserFriends } from "../controllers/friendController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user's friends
router.get("/user/:userId", protect, getUserFriends);

export default router;