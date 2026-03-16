// Purpose: Badge display panel — clean grid.

import { motion } from 'framer-motion';
import type { Badge } from '@/types/noctis';

const mockBadges: Badge[] = [
  { _id: '1', badgeName: 'First Vision', description: 'Submit your first dream', criteria: 'first_post' },
  { _id: '2', badgeName: 'Night Owl', description: '7-day posting streak', criteria: 'streak_7' },
  { _id: '3', badgeName: 'Lucid Master', description: '10 lucid dreams', criteria: 'lucid_10' },
  { _id: '4', badgeName: 'Shared Dreamer', description: 'Part of a shared dream', criteria: 'shared_dream' },
  { _id: '5', badgeName: 'Void Walker', description: '30-day streak', criteria: 'streak_30' },
  { _id: '6', badgeName: 'Myth Keeper', description: '5 myths submitted', criteria: 'myth_5' },
];

const badgeEmojis: Record<string, string> = {
  first_post: '🔮', streak_7: '🦉', lucid_10: '✨',
  shared_dream: '🌀', streak_30: '🕳️', myth_5: '📜',
};

const BadgePanel = () => {
  return (
    <div className="noctis-card p-5">
      <h3 className="mb-4 text-sm font-heading font-medium">Badges</h3>
      <div className="grid grid-cols-2 gap-2">
        {mockBadges.map((badge, i) => (
          <motion.div
            key={badge._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center rounded-lg border border-border bg-secondary/50 p-3 text-center hover:border-primary/15 transition-colors"
          >
            <span className="mb-1 text-xl">{badgeEmojis[badge.criteria] || '🏆'}</span>
            <span className="text-xs font-medium text-foreground">{badge.badgeName}</span>
            <span className="mt-0.5 text-[10px] text-muted-foreground">{badge.description}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BadgePanel;
