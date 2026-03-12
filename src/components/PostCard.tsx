// Purpose: Displays a single dream/myth/paranormal post in the feed.

import { motion } from 'framer-motion';
import type { Post } from '@/types/noctis';
import ReactionButtons from './ReactionButtons';
import { Clock, MapPin } from 'lucide-react';

interface PostCardProps {
  post: Post;
  index?: number;
}

const categoryColors: Record<string, string> = {
  dream: 'bg-primary/10 text-primary',
  myth: 'bg-destructive/10 text-destructive',
  paranormal: 'bg-muted text-muted-foreground',
};

const PostCard = ({ post, index = 0 }: PostCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', duration: 0.5, bounce: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="mb-6 rounded-lg border border-primary/10 bg-card p-6 surface-depth transition-shadow hover:glow-border"
    >
      <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
        <span className={`rounded-sm px-2 py-0.5 ${categoryColors[post.category] || ''}`}>
          {post.category}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {post.city}, {post.area}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <h2 className="mb-2 text-xl">{post.title}</h2>

      {post.description && (
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.description}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm bg-primary/10 px-2 py-0.5 text-xs text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <ReactionButtons postId={post._id} />
    </motion.article>
  );
};

export default PostCard;
