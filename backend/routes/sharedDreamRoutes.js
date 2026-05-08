import express from "express";
import {
  detectSharedDreams,
  createSharedDream,
  getSharedDreams,
  getSharedDreamsByLocation,
  getTrendingSharedDreams,
  addUserToSharedDream,
  addPostToSharedDream,
  getSharedDreamDetails,
  updateSharedDreamStatus,
  getSharedDreamsByTheme,
  getSharedDreamStats,
} from "../controllers/sharedDreamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Detection endpoint
router.get("/detect", detectSharedDreams);

// Get all shared dreams
router.get("/", getSharedDreams);

// Get trending shared dreams
router.get("/trending", getTrendingSharedDreams);

// Get by location
router.get("/location/:city", getSharedDreamsByLocation);

// Get by theme
router.get("/theme/:theme", getSharedDreamsByTheme);

// Get statistics
router.get("/stats/all", getSharedDreamStats);

// Create new shared dream (protected)
router.post("/", protect, createSharedDream);

// Get specific shared dream details
router.get("/:sharedDreamId", getSharedDreamDetails);

// Add user to shared dream (protected)
router.post("/:sharedDreamId/users", protect, addUserToSharedDream);

// Add post to shared dream (protected)
router.post("/:sharedDreamId/posts", protect, addPostToSharedDream);

// Update shared dream status (protected)
router.put("/:sharedDreamId/status", protect, updateSharedDreamStatus);

export default router;
