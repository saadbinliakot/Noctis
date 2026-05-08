import express from "express";
import {
  getOverallLeaderboard,
  getPostLeaderboard,
  getEngagementLeaderboard,
  getBadgeLeaderboard,
  getFriendsLeaderboard,
  getLucidDreamLeaderboard,
  getUserRank,
} from "../controllers/leaderboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public leaderboard routes
router.get("/overall", getOverallLeaderboard);
router.get("/posts", getPostLeaderboard);
router.get("/engagement", getEngagementLeaderboard);
router.get("/badges", getBadgeLeaderboard);
router.get("/friends", getFriendsLeaderboard);
router.get("/lucid-dreams", getLucidDreamLeaderboard);

// Get user rank in specific category (protected)
router.get("/rank/:userId", protect, getUserRank);

export default router;
