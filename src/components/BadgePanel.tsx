// Purpose: Displays earned badges and achievements.
// TODO: Connect to backend badge API.

import { motion } from 'framer-motion';
import type { Badge } from '@/types/noctis';

const mockBadges: Badge[] = [
  { _id: '1', badgeName: 'First Vision', description: 'Submit your first dream', criteria: 'first_post' },
  { _id: '2', badgeName: 'Night Owl', description: '7-day posting streak', criteria: 'streak_7' },
  { _id: '3', badgeName: 'Lucid Master', description: 'Submit 10 lucid dreams', criteria: 'lucid_10' },
  { _id: '4', badgeName: 'Shared Dreamer', description: 'Be part of a shared dream detection', criteria: 'shared_dream' },
];

const BadgePanel = () => {
  return (
    <div className="rounded-lg border border-primary/10 bg-card p-5 surface-depth">
      <h3 className="mb-4 text-lg">Badges</h3>
      <div className="grid grid-cols-2 gap-3">
        {mockBadges.map((badge, i) => (
          <motion.div
            key={badge._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center rounded-md border border-primary/10 bg-secondary p-3 text-center"
          >
            <span className="mb-1 text-2xl">🏆</span>
            <span className="text-xs font-semibold text-foreground">{badge.badgeName}</span>
            <span className="mt-0.5 text-[10px] text-muted-foreground">{badge.description}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BadgePanel;
