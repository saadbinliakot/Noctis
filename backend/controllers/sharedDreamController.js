import SharedDream from "../models/SharedDreamModel.js";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

// Detect shared dreams by analyzing post keywords and themes
export const detectSharedDreams = async (req, res) => {
  try {
    const { timeWindow = 7 } = req.query; // days

    // Get posts from the time window
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeWindow));

    const recentPosts = await Post.find({
      createdAt: { $gte: startDate },
    })
      .populate("userId", "username")
      .lean();

    if (recentPosts.length === 0) {
      return res.json({ sharedDreams: [], message: "No posts found in time window" });
    }

    // Extract common themes and keywords
    const themeMap = new Map();
    const locationMap = new Map();

    recentPosts.forEach((post) => {
      // Group by themes
      if (post.theme) {
        const themeKey = post.theme.toLowerCase();
        if (!themeMap.has(themeKey)) {
          themeMap.set(themeKey, {
            theme: post.theme,
            posts: [],
            keywords: new Set(),
            locations: new Map(),
          });
        }
        themeMap.get(themeKey).posts.push(post);
        if (post.keywords) {
          post.keywords.forEach((kw) => themeMap.get(themeKey).keywords.add(kw));
        }
        if (post.location?.city) {
          const cityKey = post.location.city.toLowerCase();
          const cityData = themeMap.get(themeKey).locations;
          if (!cityData.has(cityKey)) {
            cityData.set(cityKey, { city: post.location.city, area: post.location.area || null, count: 0 });
          }
          cityData.get(cityKey).count++;
        }
      }
    });

    // Filter for shared dreams (2+ users with same theme in same location)
    const detectedDreams = [];

    for (const [themeKey, themeData] of themeMap.entries()) {
      for (const [cityKey, cityData] of themeData.locations.entries()) {
        if (cityData.count >= 2) {
          // Found shared dream pattern
          const sharedDreamPostIds = themeData.posts
            .filter((p) => p.location?.city?.toLowerCase() === cityKey)
            .map((p) => p._id);

          const userIds = [...new Set(themeData.posts.filter((p) => p.location?.city?.toLowerCase() === cityKey).map((p) => p.userId._id))];

          detectedDreams.push({
            theme: themeData.theme,
            userCount: userIds.length,
            postCount: sharedDreamPostIds.length,
            location: cityData,
            userIds,
            postIds: sharedDreamPostIds,
            keywords: Array.from(themeData.keywords),
          });
        }
      }
    }

    res.json({
      sharedDreams: detectedDreams,
      count: detectedDreams.length,
      timeWindow: `${timeWindow} days`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new shared dream
export const createSharedDream = async (req, res) => {
  try {
    const { theme, description, location, userIds, postIds, keywords, emotionalTone } = req.body;

    if (!theme || !description || !location?.city) {
      return res.status(400).json({ error: "Theme, description, and location required" });
    }

    // Check if shared dream already exists for this theme and location
    const existing = await SharedDream.findOne({
      theme: theme,
      "location.city": location.city,
      status: "active",
    });

    if (existing) {
      // Update existing shared dream instead
      existing.userIds = [...new Set([...existing.userIds, ...(userIds || [])])];
      existing.postIds = [...new Set([...existing.postIds, ...(postIds || [])])];
      existing.userCount = existing.userIds.length;
      if (keywords) {
        existing.keywords = [...new Set([...existing.keywords, ...keywords])];
      }
      await existing.save();
      return res.json({ sharedDream: existing, action: "updated" });
    }

    // Create new shared dream
    const sharedDream = new SharedDream({
      theme,
      description,
      location,
      userIds: userIds || [],
      postIds: postIds || [],
      keywords: keywords || [],
      userCount: userIds?.length || 1,
      emotionalTone: emotionalTone || "neutral",
      detectedTime: new Date(),
      confidence: Math.min(50 + (userIds?.length || 1) * 10, 95),
    });

    await sharedDream.save();
    res.status(201).json({ sharedDream, action: "created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all shared dreams with optional filters
export const getSharedDreams = async (req, res) => {
  try {
    const { limit = 20, city, theme, status = "active", sortBy = "userCount" } = req.query;

    const filter = { status };
    if (city) filter["location.city"] = new RegExp(city, "i");
    if (theme) filter.theme = new RegExp(theme, "i");

    const sortOption = {};
    if (sortBy === "userCount") sortOption.userCount = -1;
    else if (sortBy === "recent") sortOption.detectedTime = -1;
    else if (sortBy === "confidence") sortOption.confidence = -1;

    const sharedDreams = await SharedDream.find(filter)
      .sort(sortOption)
      .limit(parseInt(limit))
      .lean();

    res.json({ sharedDreams, count: sharedDreams.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get shared dreams for a specific location
export const getSharedDreamsByLocation = async (req, res) => {
  try {
    const { city, limit = 10 } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City parameter required" });
    }

    const sharedDreams = await SharedDream.find({
      "location.city": new RegExp(city, "i"),
      status: "active",
    })
      .sort({ userCount: -1, detectedTime: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({ sharedDreams, city, count: sharedDreams.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get trending shared dreams
export const getTrendingSharedDreams = async (req, res) => {
  try {
    const { limit = 10, timeWindow = 7 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeWindow));

    const trendingDreams = await SharedDream.find({
      status: "active",
      detectedTime: { $gte: startDate },
    })
      .sort({ userCount: -1, confidence: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({ sharedDreams: trendingDreams, timeWindow: `${timeWindow} days`, count: trendingDreams.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add user to a shared dream
export const addUserToSharedDream = async (req, res) => {
  try {
    const { sharedDreamId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "UserId required" });
    }

    const sharedDream = await SharedDream.findById(sharedDreamId);
    if (!sharedDream) {
      return res.status(404).json({ error: "Shared dream not found" });
    }

    if (!sharedDream.userIds.includes(userId)) {
      sharedDream.userIds.push(userId);
      sharedDream.userCount = sharedDream.userIds.length;
      // Increase confidence as more users report it
      sharedDream.confidence = Math.min(sharedDream.confidence + 5, 95);
    }

    await sharedDream.save();
    res.json({ sharedDream, message: "User added to shared dream" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add post to a shared dream
export const addPostToSharedDream = async (req, res) => {
  try {
    const { sharedDreamId } = req.params;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ error: "PostId required" });
    }

    const sharedDream = await SharedDream.findById(sharedDreamId);
    if (!sharedDream) {
      return res.status(404).json({ error: "Shared dream not found" });
    }

    if (!sharedDream.postIds.includes(postId)) {
      sharedDream.postIds.push(postId);
      // Increase confidence with more posts
      sharedDream.confidence = Math.min(sharedDream.confidence + 3, 95);
    }

    await sharedDream.save();
    res.json({ sharedDream, message: "Post added to shared dream" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get shared dream details with populated data
export const getSharedDreamDetails = async (req, res) => {
  try {
    const { sharedDreamId } = req.params;

    const sharedDream = await SharedDream.findById(sharedDreamId)
      .populate("userIds", "username avatar bio")
      .populate("postIds", "title theme content location reactionCount");

    if (!sharedDream) {
      return res.status(404).json({ error: "Shared dream not found" });
    }

    res.json({ sharedDream });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update shared dream status
export const updateSharedDreamStatus = async (req, res) => {
  try {
    const { sharedDreamId } = req.params;
    const { status, notes } = req.body;

    if (!["active", "archived", "disputed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const sharedDream = await SharedDream.findByIdAndUpdate(
      sharedDreamId,
      { status, notes },
      { new: true }
    );

    if (!sharedDream) {
      return res.status(404).json({ error: "Shared dream not found" });
    }

    res.json({ sharedDream, message: `Status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get shared dreams by theme
export const getSharedDreamsByTheme = async (req, res) => {
  try {
    const { theme, limit = 10 } = req.query;

    if (!theme) {
      return res.status(400).json({ error: "Theme parameter required" });
    }

    const sharedDreams = await SharedDream.find({
      theme: new RegExp(theme, "i"),
      status: "active",
    })
      .sort({ userCount: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json({ sharedDreams, theme, count: sharedDreams.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get statistics about shared dreams
export const getSharedDreamStats = async (req, res) => {
  try {
    const stats = await SharedDream.aggregate([
      {
        $match: { status: "active" },
      },
      {
        $group: {
          _id: null,
          totalSharedDreams: { $sum: 1 },
          totalUsers: { $sum: "$userCount" },
          averageUsers: { $avg: "$userCount" },
          averageConfidence: { $avg: "$confidence" },
          totalPosts: { $sum: { $size: "$postIds" } },
        },
      },
    ]);

    // Top themes
    const topThemes = await SharedDream.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: "$theme", count: { $sum: 1 }, totalUsers: { $sum: "$userCount" } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Top locations
    const topLocations = await SharedDream.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: "$location.city", count: { $sum: 1 }, totalUsers: { $sum: "$userCount" } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({
      stats: stats[0] || {},
      topThemes,
      topLocations,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
