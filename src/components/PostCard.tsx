
import { motion } from 'framer-motion';
import type { Post } from '@/types/noctis';
import ReactionButtons from './ReactionButtons';
import { Clock, MapPin, Sparkles, RotateCw } from 'lucide-react';

interface PostCardProps {
  post: Post;
  index?: number;
}

const categoryConfig: Record<string, { label: string }> = {
  dream: { label: '🌙 Dream' },
  myth: { label: '📜 Myth' },
  paranormal: { label: '👁️ Paranormal' },
};

const PostCard = ({ post, index = 0 }: PostCardProps) => {
  const cat = categoryConfig[post.category] || categoryConfig.dream;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className="noctis-card mb-4 p-5"
    >
      {/* Meta */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-primary text-xs font-medium">
          {cat.label}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {post.location && post.location !== 'undefined' ? post.location : `${post.city || 'Unknown'}, ${post.area || 'Unknown'}`}
        </span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          By <strong className="text-foreground">{(post as any).authorName || (post.userId as any)?.username || 'Unknown'}</strong>
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {new Date(post.timestamp || (post as any).createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {post.isLucid && (
          <span className="flex items-center gap-1 text-accent">
            <Sparkles className="h-3 w-3" /> Lucid
          </span>
        )}
        {post.isRecurring && (
          <span className="flex items-center gap-1 text-muted-foreground">
            <RotateCw className="h-3 w-3" /> Recurring
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="mb-2 text-lg font-heading font-medium text-foreground">{post.title}</h2>

      {/* Description */}
      {post.description && (
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.description}
        </p>
      )}

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-primary/20"
          >
            #{tag}
          </span>
        ))}
      </div>

      <ReactionButtons postId={post._id} />
    </motion.article>
  );
};

export default PostCard;
