import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";
import Badge from "../models/BadgeModel.js";
import Reaction from "../models/ReactionModel.js";

// Get overall leaderboard (top users by multiple metrics)
export const getOverallLeaderboard = async (req, res) => {
  try {
    const limit = req.query.limit || 20;

    // Aggregate user stats
    const leaderboard = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "userPosts",
        },
      },
      {
        $lookup: {
          from: "badges",
          localField: "_id",
          foreignField: "userId",
          as: "userBadges",
        },
      },
      {
        $addFields: {
          postCount: { $size: "$userPosts" },
          badgeCount: { $size: "$userBadges" },
          totalReactions: { $sum: "$userPosts.reactionCount" },
          score: {
            $add: [
              { $multiply: [{ $size: "$userPosts" }, 10] }, // 10 points per post
              { $multiply: [{ $size: "$userBadges" }, 25] }, // 25 points per badge
              { $multiply: [{ $sum: "$userPosts.reactionCount" }, 1] }, // 1 point per reaction
              { $multiply: ["$totalFriends", 5] }, // 5 points per friend
            ],
          },
        },
      },
      {
        $sort: { score: -1 },
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          _id: 1,
          username: 1,
          avatar: 1,
          bio: 1,
          postCount: 1,
          badgeCount: 1,
          totalReactions: 1,
          totalFriends: 1,
          score: { $round: ["$score", 0] },
        },
      },
    ]);

    // Add ranking
    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    res.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard by posts
export const getPostLeaderboard = async (req, res) => {
  try {
    const limit = req.query.limit || 20;

    const leaderboard = await Post.aggregate([
      {
        $group: {
          _id: "$userId",
          postCount: { $sum: 1 },
          totalReactions: { $sum: "$reactionCount" },
          avgReactions: { $avg: "$reactionCount" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { postCount: -1 },
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          _id: 1,
          username: "$user.username",
          avatar: "$user.avatar",
          postCount: 1,
          totalReactions: 1,
          avgReactions: { $round: ["$avgReactions", 1] },
        },
      },
    ]);

    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    res.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard by reactions/engagement
export const getEngagementLeaderboard = async (req, res) => {
  try {
    const limit = req.query.limit || 20;

    const leaderboard = await Post.aggregate([
      {
        $group: {
          _id: "$userId",
          totalReactions: { $sum: "$reactionCount" },
          postCount: { $sum: 1 },
        },
      },
      {
        $match: { totalReactions: { $gt: 0 } },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { totalReactions: -1 },
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          _id: 1,
          username: "$user.username",
          avatar: "$user.avatar",
          totalReactions: 1,
          postCount: 1,
          avgReactionsPerPost: {
            $round: [{ $divide: ["$totalReactions", "$postCount"] }, 1],
          },
        },
      },
    ]);

    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    res.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard by badges
export const getBadgeLeaderboard = async (req, res) => {
  try {
    const limit = req.query.limit || 20;

    const leaderboard = await Badge.aggregate([
      {
        $group: {
          _id: "$userId",
          badgeCount: { $sum: 1 },
        },
      },
      {
        $match: { badgeCount: { $gt: 0 } },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "badges",
          localField: "_id",
          foreignField: "userId",
          as: "badges",
        },
      },
      {
        $sort: { badgeCount: -1 },
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          _id: 1,
          username: "$user.username",
          avatar: "$user.avatar",
          badgeCount: 1,
          badges: {
            $map: {
              input: "$badges",
              as: "badge",
              in: {
                type: "$$badge.badgeType",
                title: "$$badge.title",
                icon: "$$badge.icon",
              },
            },
          },
        },
      },
    ]);

    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    res.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard by friends
export const getFriendsLeaderboard = async (req, res) => {
  try {
    const limit = req.query.limit || 20;

    const leaderboard = await User.aggregate([
      {
        $match: { totalFriends: { $gt: 0 } },
      },
      {
        $sort: { totalFriends: -1 },
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          _id: 1,
          username: 1,
          avatar: 1,
          totalFriends: 1,
        },
      },
    ]);

    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    res.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leaderboard by lucid dreams
export const getLucidDreamLeaderboard = async (req, res) => {
  try {
    const limit = req.query.limit || 20;

    const leaderboard = await Post.aggregate([
      {
        $match: { isLucid: true },
      },
      {
        $group: {
          _id: "$userId",
          lucidCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { lucidCount: -1 },
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          _id: 1,
          username: "$user.username",
          avatar: "$user.avatar",
          lucidCount: 1,
        },
      },
    ]);

    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    res.json({ leaderboard: rankedLeaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user rank in a specific category
export const getUserRank = async (req, res) => {
  try {
    const { userId } = req.params;
    const { category = "overall" } = req.query;

    let userRank = null;
    let totalUsers = 0;

    if (category === "overall") {
      const users = await User.aggregate([
        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "userId",
            as: "userPosts",
          },
        },
        {
          $lookup: {
            from: "badges",
            localField: "_id",
            foreignField: "userId",
            as: "userBadges",
          },
        },
        {
          $addFields: {
            score: {
              $add: [
                { $multiply: [{ $size: "$userPosts" }, 10] },
                { $multiply: [{ $size: "$userBadges" }, 25] },
                { $multiply: [{ $sum: "$userPosts.reactionCount" }, 1] },
                { $multiply: ["$totalFriends", 5] },
              ],
            },
          },
        },
        {
          $sort: { score: -1 },
        },
      ]);

      totalUsers = users.length;
      userRank = users.findIndex((u) => u._id.toString() === userId) + 1;
    } else if (category === "posts") {
      const users = await Post.aggregate([
        {
          $group: {
            _id: "$userId",
            postCount: { $sum: 1 },
          },
        },
        {
          $sort: { postCount: -1 },
        },
      ]);

      totalUsers = users.length;
      userRank = users.findIndex((u) => u._id.toString() === userId) + 1;
    } else if (category === "engagement") {
      const users = await Post.aggregate([
        {
          $group: {
            _id: "$userId",
            totalReactions: { $sum: "$reactionCount" },
          },
        },
        {
          $sort: { totalReactions: -1 },
        },
      ]);

      totalUsers = users.length;
      userRank = users.findIndex((u) => u._id.toString() === userId) + 1;
    } else if (category === "badges") {
      const users = await Badge.aggregate([
        {
          $group: {
            _id: "$userId",
            badgeCount: { $sum: 1 },
          },
        },
        {
          $sort: { badgeCount: -1 },
        },
      ]);

      totalUsers = users.length;
      userRank = users.findIndex((u) => u._id.toString() === userId) + 1;
    }

    res.json({
      userId,
      category,
      rank: userRank || 0,
      totalUsers,
      percentile: totalUsers > 0 ? ((totalUsers - userRank + 1) / totalUsers * 100).toFixed(1) : 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
