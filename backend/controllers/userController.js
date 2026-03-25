import UserModel from '../models/UserModel.js';
import PostModel from '../models/PostModel.js';
import FriendRequestModel from '../models/FriendRequestModel.js';

// Get user statistics
export const getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get user's posts count
    const dreamsCount = await PostModel.countDocuments({ userId });

    // Get user's friends count (accepted friend requests)
    const friendsCount = await FriendRequestModel.countDocuments({
      $or: [
        { senderId: userId, status: 'accepted' },
        { receiverId: userId, status: 'accepted' }
      ]
    });

    // For now, views count is 0 since we don't have view tracking yet
    const viewsCount = 0;

    res.json({
      dreamsCount,
      friendsCount,
      viewsCount
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ message: 'Failed to fetch user statistics' });
  }
};