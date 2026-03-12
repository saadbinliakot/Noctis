// Purpose: User profile page with stats, badges, and friend list.
// TODO: Connect to backend user API.

import { motion } from 'framer-motion';
import FriendList from '@/components/FriendList';
import BadgePanel from '@/components/BadgePanel';
import { User, Moon, Flame, Eye } from 'lucide-react';

const stats = [
  { icon: Moon, label: 'Visions', value: '23' },
  { icon: Flame, label: 'Streak', value: '12' },
  { icon: User, label: 'Friends', value: '8' },
  { icon: Eye, label: 'Views', value: '1.2k' },
];

const Profile = () => {
  return (
    <div className="fog-layer min-h-screen bg-starfield pt-20">
      <main className="container mx-auto max-w-3xl px-4 py-8 relative z-10 page-enter">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <div className="relative mb-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/15 bg-secondary">
              <User className="h-12 w-12 text-primary/50" />
            </div>
            <div className="absolute -inset-2 rounded-full border border-primary/5 animate-pulse-glow pointer-events-none" />
          </div>

          <h1 className="text-3xl glow-text font-display">NightWalker</h1>
          <p className="mt-1 text-sm text-muted-foreground italic">Dreamer since 47 nights ago</p>

          <div className="mt-8 flex gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <Icon className="mx-auto mb-1.5 h-4 w-4 text-primary/60" />
                <div className="text-xl font-heading font-semibold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BadgePanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="noctis-card p-5">
              <h3 className="mb-4 text-lg font-heading glow-text-subtle">Your Circle</h3>
              <FriendList />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
