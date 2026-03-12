// Purpose: Displays a list of friends with the updated card component.
// TODO: Connect to backend friend API.

import FriendCard from './FriendCard';

const mockFriends = [
  { _id: '1', username: 'NightWalker', streakCount: 12, visionsCount: 34 },
  { _id: '2', username: 'VoidDreamer', streakCount: 7, visionsCount: 18 },
  { _id: '3', username: 'ShadowSeer', streakCount: 23, visionsCount: 67 },
  { _id: '4', username: 'LunarEcho', streakCount: 5, visionsCount: 12 },
];

const FriendList = () => {
  return (
    <div className="space-y-3">
      {mockFriends.map((friend, i) => (
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
