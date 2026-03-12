// Purpose: Incoming friend request card with accept/reject actions.

import { motion } from 'framer-motion';
import { User, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FriendRequestCardProps {
  username: string;
  requestDate: string;
  index?: number;
  onAccept?: () => void;
  onReject?: () => void;
}

const FriendRequestCard = ({ username, requestDate, index = 0, onAccept, onReject }: FriendRequestCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="noctis-card p-4 flex items-center gap-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-secondary">
        <User className="h-5 w-5 text-primary/70" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{username}</p>
        <p className="text-xs text-muted-foreground">Requested {requestDate}</p>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={onAccept}
          className="h-8 bg-primary/15 text-primary border border-primary/20 hover:bg-primary/25 hover:border-primary/40 text-xs"
        >
          <Check className="h-3.5 w-3.5 mr-1" />
          Accept
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onReject}
          className="h-8 text-muted-foreground hover:text-destructive text-xs"
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Reject
        </Button>
      </div>
    </motion.div>
  );
};

export default FriendRequestCard;
