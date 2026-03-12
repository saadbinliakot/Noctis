// Purpose: Reaction buttons for posts with glow hover effects.
// TODO: Connect to backend reaction API.

import { useState } from 'react';
import { motion } from 'framer-motion';

const reactions = [
  { type: 'haunt', emoji: '👁️', label: 'Haunting' },
  { type: 'relate', emoji: '🌙', label: 'I relate' },
  { type: 'fear', emoji: '💀', label: 'Terrifying' },
  { type: 'lucid', emoji: '✨', label: 'Lucid' },
  { type: 'myth', emoji: '🔮', label: 'Mythical' },
];

interface ReactionButtonsProps {
  postId: string;
}

const ReactionButtons = ({ postId: _postId }: ReactionButtonsProps) => {
  const [counts, setCounts] = useState<Record<string, number>>({
    haunt: 3, relate: 7, fear: 1, lucid: 5, myth: 2,
  });
  const [active, setActive] = useState<Set<string>>(new Set());

  const handleReact = (type: string) => {
    // TODO: Call API to toggle reaction
    const next = new Set(active);
    if (next.has(type)) {
      next.delete(type);
      setCounts((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    } else {
      next.add(type);
      setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    }
    setActive(next);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {reactions.map(({ type, emoji, label }) => (
        <motion.button
          key={type}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleReact(type)}
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-all duration-300 ${
            active.has(type)
              ? 'border-primary/30 bg-primary/15 text-primary'
              : 'border-primary/8 bg-secondary text-muted-foreground hover:border-primary/20 hover:text-foreground'
          }`}
          title={label}
        >
          <span>{emoji}</span>
          <span>{counts[type]}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ReactionButtons;
