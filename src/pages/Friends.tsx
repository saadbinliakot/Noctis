// Purpose: Friends page with search, requests, and friend list.

import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-starfield pt-14">
      <main className="container mx-auto max-w-5xl px-4 py-8 page-enter">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="text-2xl font-heading font-semibold mb-1">Friends</h1>
          <p className="text-sm text-muted-foreground">Connect with fellow dreamers</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Search */}
          <div className="noctis-card p-5">
            <h3 className="text-sm font-heading font-medium mb-4">Search</h3>
            <FriendSearch />
          </div>

          {/* Pending */}
          <div className="noctis-card p-5">
            <h3 className="text-sm font-heading font-medium mb-4">
              Pending Requests
              <span className="ml-2 text-xs text-primary bg-primary/8 px-2 py-0.5 rounded-full">
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

          {/* Friends */}
          <div className="noctis-card p-5">
            <h3 className="text-sm font-heading font-medium mb-4">Your Friends</h3>
            <FriendList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Friends;
