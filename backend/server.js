import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";



import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  await connectDB();

  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/friends", friendRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/auth", authRoutes);

  app.get("/", (req, res) => {
    res.send("NOCTIS API running...");
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});