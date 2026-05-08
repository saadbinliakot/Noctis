import express from "express";

import {
  createPost,
  getPosts,
  getTrendingTags,
} from "../controllers/postController.js";

const router = express.Router();

router.get(
  "/trending-tags",
  getTrendingTags
);

router.post("/", createPost);

router.get("/", getPosts);

export default router;