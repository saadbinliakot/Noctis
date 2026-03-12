// Purpose: User profile page with stats, badges, and friend list.
// TODO: Connect to backend user API.

import FriendList from '@/components/FriendList';
import BadgePanel from '@/components/BadgePanel';
import { User, Moon, Flame } from 'lucide-react';

const Profile = () => {
  return (
    <div className="fog-overlay min-h-screen pt-20">
      <main className="container mx-auto max-w-3xl px-4 py-8 relative z-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-secondary">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl glow-text">NightWalker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Joined the void 47 days ago</p>

          <div className="mt-6 flex gap-8">
            {[
              { icon: Moon, label: 'Visions', value: '23' },
              { icon: Flame, label: 'Streak', value: '12' },
              { icon: User, label: 'Friends', value: '8' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto mb-1 h-4 w-4 text-primary" />
                <div className="text-lg font-semibold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <BadgePanel />
          <FriendList />
        </div>
      </main>
    </div>
  );
};

export default Profile;
