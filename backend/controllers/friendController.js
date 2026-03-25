import FriendRequestModel from '../models/FriendRequestModel.js';
import UserModel from '../models/UserModel.js';
import PostModel from '../models/PostModel.js';

// Get user's friends list
export const getUserFriends = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all accepted friend requests where user is sender or receiver
    const friendRequests = await FriendRequestModel.find({
      $or: [
        { senderId: userId, status: 'accepted' },
        { receiverId: userId, status: 'accepted' }
      ]
    });

    // Extract friend IDs
    const friendIds = friendRequests.map(request => 
      request.senderId === userId ? request.receiverId : request.senderId
    );

    // Get friend details
    const friends = await UserModel.find({ _id: { $in: friendIds } })
      .select('username streakCount')
      .lean();

    // Add visionsCount (posts count) for each friend
    const friendsWithStats = await Promise.all(
      friends.map(async (friend) => {
        const visionsCount = await PostModel.countDocuments({ userId: friend._id });
        return {
          _id: friend._id,
          username: friend.username,
          streakCount: friend.streakCount || 0,
          visionsCount: visionsCount
        };
      })
    );

    res.json(friendsWithStats);
  } catch (error) {
    console.error('Error fetching user friends:', error);
    res.status(500).json({ message: 'Failed to fetch friends' });
  }
};