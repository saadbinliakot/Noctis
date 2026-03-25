

import { useState } from 'react';
import { motion } from 'framer-motion';

const reactions = [
  { type: 'haunt', emoji: '👁️', label: 'Haunting' },
  { type: 'relate', emoji: '🌙', label: 'I relate' },
  { type: 'fear', emoji: '💀', label: 'Terrifying' },
  { type: 'lucid', emoji: '✨', label: 'Lucid' },
  { type: 'myth', emoji: '🔮', label: 'Mythical' },
];

interface ReactionButtonsProps { postId: string; }

const ReactionButtons = ({ postId: _postId }: ReactionButtonsProps) => {
  const [counts, setCounts] = useState<Record<string, number>>({ haunt: 3, relate: 7, fear: 1, lucid: 5, myth: 2 });
  const [active, setActive] = useState<Set<string>>(new Set());

  const handleReact = (type: string) => {
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
    <div className="flex flex-wrap gap-1.5">
      {reactions.map(({ type, emoji, label }) => (
        <motion.button
          key={type}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleReact(type)}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all ${
            active.has(type)
              ? 'border-primary/25 bg-primary/8 text-primary'
              : 'border-border text-muted-foreground hover:border-primary/15 hover:text-foreground'
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
