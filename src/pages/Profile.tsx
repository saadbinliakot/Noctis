// Purpose: Clean user profile page.

import { motion } from 'framer-motion';
import FriendList from '@/components/FriendList';
import BadgePanel from '@/components/BadgePanel';
import { User, Moon, Flame, Eye } from 'lucide-react';

const stats = [
  { icon: Moon, label: 'Dreams', value: '23' },
  { icon: Flame, label: 'Streak', value: '12' },
  { icon: User, label: 'Friends', value: '8' },
  { icon: Eye, label: 'Views', value: '1.2k' },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-starfield pt-14">
      <main className="container mx-auto max-w-3xl px-4 py-8 page-enter">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10 flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card mb-4">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-heading font-semibold">NightWalker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Dreamer since 47 nights ago</p>

          <div className="mt-6 flex gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
                <div className="text-lg font-heading font-semibold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <BadgePanel />
          <div className="noctis-card p-5">
            <h3 className="mb-4 text-sm font-heading font-medium">Your Friends</h3>
            <FriendList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
