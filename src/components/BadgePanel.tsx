// Purpose: Displays earned badges and achievements with glow effects.
// TODO: Connect to backend badge API.

import { motion } from 'framer-motion';
import type { Badge } from '@/types/noctis';

const mockBadges: Badge[] = [
  { _id: '1', badgeName: 'First Vision', description: 'Submit your first dream', criteria: 'first_post' },
  { _id: '2', badgeName: 'Night Owl', description: '7-day posting streak', criteria: 'streak_7' },
  { _id: '3', badgeName: 'Lucid Master', description: 'Submit 10 lucid dreams', criteria: 'lucid_10' },
  { _id: '4', badgeName: 'Shared Dreamer', description: 'Part of a shared dream detection', criteria: 'shared_dream' },
  { _id: '5', badgeName: 'Void Walker', description: 'Post every night for 30 days', criteria: 'streak_30' },
  { _id: '6', badgeName: 'Myth Keeper', description: 'Submit 5 myths', criteria: 'myth_5' },
];

const badgeEmojis: Record<string, string> = {
  first_post: '🔮',
  streak_7: '🦉',
  lucid_10: '✨',
  shared_dream: '🌀',
  streak_30: '🕳️',
  myth_5: '📜',
};

const BadgePanel = () => {
  return (
    <div className="noctis-card p-5">
      <h3 className="mb-4 text-lg font-heading glow-text-subtle">Badges</h3>
      <div className="grid grid-cols-2 gap-3">
        {mockBadges.map((badge, i) => (
          <motion.div
            key={badge._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="flex flex-col items-center rounded-md border border-primary/8 bg-secondary p-3 text-center cursor-default transition-colors hover:border-primary/20"
          >
            <span className="mb-1.5 text-2xl">{badgeEmojis[badge.criteria] || '🏆'}</span>
            <span className="text-xs font-heading font-semibold text-foreground">{badge.badgeName}</span>
            <span className="mt-0.5 text-[10px] text-muted-foreground leading-tight">{badge.description}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BadgePanel;
