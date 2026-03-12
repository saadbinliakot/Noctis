// Purpose: Reaction buttons for posts (emoji-style reactions).
// TODO: Connect to backend reaction API.

import { useState } from 'react';
import { motion } from 'framer-motion';

const reactions = [
  { type: 'haunt', emoji: '👁️', label: 'Haunting' },
  { type: 'relate', emoji: '🌙', label: 'I relate' },
  { type: 'fear', emoji: '💀', label: 'Terrifying' },
  { type: 'lucid', emoji: '✨', label: 'Lucid' },
];

interface ReactionButtonsProps {
  postId: string;
}

const ReactionButtons = ({ postId: _postId }: ReactionButtonsProps) => {
  const [counts, setCounts] = useState<Record<string, number>>({
    haunt: 3, relate: 7, fear: 1, lucid: 5,
  });

  const handleReact = (type: string) => {
    // TODO: Call API to toggle reaction
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  return (
    <div className="flex gap-2">
      {reactions.map(({ type, emoji, label }) => (
        <motion.button
          key={type}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleReact(type)}
          className="flex items-center gap-1 rounded-sm border border-primary/10 bg-secondary px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
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
