import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

export const createPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      userId: req.user?.id || req.body.userId,
      authorName:
        req.user?.username ||
        req.body.authorName ||
        (req.body.userId ? await User.findById(req.body.userId).then(u => u?.username).catch(() => null) : null) ||
        'Unknown',
      location: req.body.location || `${req.body.city || ''}${req.body.city && req.body.area ? ', ' : ''}${req.body.area || ''}`,
      city: req.body.city || req.body.division || null,
      area: req.body.area || req.body.location || null,
    };

    const post = await Post.create(postData);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'username')
      .lean();

    const enriched = posts.map(post => ({
      ...post,
      authorName: post.authorName || post.userId?.username || 'Anonymous',
      city: post.city || post.division || 'Unknown',
      area: post.area || post.location || 'Unknown',
    }));

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};