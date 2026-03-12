// Purpose: Displays a single dream/myth/paranormal post in the feed with floating card effect.

import { motion } from 'framer-motion';
import type { Post } from '@/types/noctis';
import ReactionButtons from './ReactionButtons';
import { Clock, MapPin, Sparkles, RotateCw } from 'lucide-react';

interface PostCardProps {
  post: Post;
  index?: number;
}

const categoryConfig: Record<string, { bg: string; text: string; label: string }> = {
  dream: { bg: 'bg-primary/10', text: 'text-primary', label: '🌙 Dream' },
  myth: { bg: 'bg-destructive/10', text: 'text-destructive', label: '📜 Myth' },
  paranormal: { bg: 'bg-muted', text: 'text-muted-foreground', label: '👁️ Paranormal' },
};

const PostCard = ({ post, index = 0 }: PostCardProps) => {
  const cat = categoryConfig[post.category] || categoryConfig.dream;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', duration: 0.6, bounce: 0 }}
      whileHover={{ y: -4 }}
      className="noctis-card mb-6 p-6 animate-shadow-breathe"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      {/* Header metadata */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
        <span className={`rounded-sm px-2 py-0.5 font-heading ${cat.bg} ${cat.text}`}>
          {cat.label}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {post.city}, {post.area}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {post.isLucid && (
          <span className="flex items-center gap-1 text-primary">
            <Sparkles className="h-3 w-3" /> Lucid
          </span>
        )}
        {post.isRecurring && (
          <span className="flex items-center gap-1 text-destructive">
            <RotateCw className="h-3 w-3" /> Recurring
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="mb-2 text-xl font-heading glow-text-subtle">{post.title}</h2>

      {/* Description */}
      {post.description && (
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3 font-body">
          {post.description}
        </p>
      )}

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm border border-primary/10 bg-primary/5 px-2 py-0.5 text-xs text-primary/80 transition-colors hover:bg-primary/10"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Reactions */}
      <ReactionButtons postId={post._id} />
    </motion.article>
  );
};

export default PostCard;
