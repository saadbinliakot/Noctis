// Purpose: Friends page with search, pending requests, and friend list panels.

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import FriendSearch from '@/components/FriendSearch';
import FriendRequestCard from '@/components/FriendRequestCard';
import FriendList from '@/components/FriendList';

const mockRequests = [
  { _id: 'r1', username: 'AbyssGazer', requestDate: '2 hours ago' },
  { _id: 'r2', username: 'NocturnalScribe', requestDate: '1 day ago' },
  { _id: 'r3', username: 'EtherealWatcher', requestDate: '3 days ago' },
];

const Friends = () => {
  return (
    <div className="fog-layer min-h-screen bg-starfield pt-20">
      <main className="container mx-auto max-w-6xl px-4 py-8 relative z-10 page-enter">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Users className="mx-auto mb-3 h-8 w-8 text-primary/50" />
          <h1 className="text-3xl glow-text mb-2">Fellow Dreamers</h1>
          <p className="text-sm text-muted-foreground">Connect with those who walk the same night</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Panel — Search */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="noctis-card p-5">
              <h3 className="text-base font-heading mb-4 glow-text-subtle">Search Dreamers</h3>
              <FriendSearch />
            </div>
          </motion.div>

          {/* Middle Panel — Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="noctis-card p-5">
              <h3 className="text-base font-heading mb-4 glow-text-subtle">
                Pending Requests
                <span className="ml-2 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {mockRequests.length}
                </span>
              </h3>
              <div className="space-y-3">
                {mockRequests.map((req, i) => (
                  <FriendRequestCard
                    key={req._id}
                    username={req.username}
                    requestDate={req.requestDate}
                    index={i}
                    onAccept={() => console.log('TODO: Accept', req.username)}
                    onReject={() => console.log('TODO: Reject', req.username)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel — Friend List */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="noctis-card p-5">
              <h3 className="text-base font-heading mb-4 glow-text-subtle">Your Circle</h3>
              <FriendList />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Friends;
