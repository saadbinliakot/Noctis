import { useEffect, useState } from 'react';
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

const defaultCounts = {
  haunt: 0,
  relate: 0,
  fear: 0,
  lucid: 0,
  myth: 0,
};

const getUserKey = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (user) return user;
  if (token) return token;
  return 'guest';
};

const ReactionButtons = ({ postId }: ReactionButtonsProps) => {
  const [counts, setCounts] = useState<Record<string, number>>(defaultCounts);
  const [myReaction, setMyReaction] = useState<string | null>(null);

  const countsKey = `reaction-counts-${postId}`;
  const userReactionKey = `reaction-user-${postId}-${getUserKey()}`;

  useEffect(() => {
    const savedCounts = localStorage.getItem(countsKey);
    const savedMyReaction = localStorage.getItem(userReactionKey);

    if (savedCounts) {
      setCounts(JSON.parse(savedCounts));
    }

    if (savedMyReaction) {
      setMyReaction(savedMyReaction);
    }
  }, [postId]);

  const handleReact = (type: string) => {
    const updatedCounts = { ...counts };

    if (myReaction === type) {
      updatedCounts[type] = Math.max(0, updatedCounts[type] - 1);
      localStorage.removeItem(userReactionKey);
      setMyReaction(null);
    } else {
      if (myReaction) {
        updatedCounts[myReaction] = Math.max(0, updatedCounts[myReaction] - 1);
      }

      updatedCounts[type] = (updatedCounts[type] || 0) + 1;
      localStorage.setItem(userReactionKey, type);
      setMyReaction(type);
    }

    setCounts(updatedCounts);
    localStorage.setItem(countsKey, JSON.stringify(updatedCounts));
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {reactions.map(({ type, emoji, label }) => (
        <motion.button
          key={type}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleReact(type)}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all ${
            myReaction === type
              ? 'border-primary/25 bg-primary/8 text-primary'
              : 'border-border text-muted-foreground hover:border-primary/15 hover:text-foreground'
          }`}
          title={label}
        >
          <span>{emoji}</span>
          <span>{counts[type] || 0}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ReactionButtons;