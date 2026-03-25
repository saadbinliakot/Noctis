
import { useState, useEffect } from 'react';
import FriendCard from './FriendCard';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';

interface Friend {
  _id: string;
  username: string;
  streakCount: number;
  visionsCount: number;
}

const FriendList = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get(`/friends/user/${user.id}`);
        setFriends(response);
      } catch (error) {
        console.error('Failed to fetch friends:', error);
        setFriends([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, [user]);

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        Loading friends...
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        No friends yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {friends.map((friend, i) => (
        <FriendCard
          key={friend._id}
          username={friend.username}
          streakCount={friend.streakCount}
          visionsCount={friend.visionsCount}
          index={i}
          onRemove={() => console.log('TODO: Remove friend', friend.username)}
        />
      ))}
    </div>
  );
};

export default FriendList;
