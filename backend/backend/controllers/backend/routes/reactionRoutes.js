import express from "express";

import {
  reactToPost,
  getReactionSummary,
} from "../controllers/reactionController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/:postId",
  protect,
  reactToPost
);

router.get(
  "/:postId",
  getReactionSummary
);

export default router;