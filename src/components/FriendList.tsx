// Purpose: Displays a list of friends and pending friend requests.
// TODO: Connect to backend friend API.

import { User } from 'lucide-react';

const mockFriends = [
  { _id: '1', username: 'NightWalker', streakCount: 12 },
  { _id: '2', username: 'VoidDreamer', streakCount: 7 },
  { _id: '3', username: 'ShadowSeer', streakCount: 23 },
];

const FriendList = () => {
  return (
    <div className="rounded-lg border border-primary/10 bg-card p-5 surface-depth">
      <h3 className="mb-4 text-lg">Fellow Dreamers</h3>
      <ul className="space-y-3">
        {mockFriends.map((friend) => (
          <li key={friend._id} className="flex items-center justify-between rounded-md bg-secondary px-3 py-2">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <User className="h-4 w-4 text-primary" />
              {friend.username}
            </div>
            <span className="text-xs text-muted-foreground">{friend.streakCount}🔥</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
