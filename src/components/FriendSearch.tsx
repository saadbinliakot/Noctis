// Purpose: Friend search component with username search and send request button.

import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const mockSearchResults = [
  { _id: '10', username: 'MidnightOracle' },
  { _id: '11', username: 'PhantomWhisperer' },
  { _id: '12', username: 'DreamWeaver99' },
];

const FriendSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof mockSearchResults>([]);

  const handleSearch = () => {
    if (query.trim()) {
      // TODO: Call API to search users
      setResults(mockSearchResults.filter(u =>
        u.username.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => { setQuery(e.target.value); handleSearch(); }}
            placeholder="Search dreamers by username..."
            className="pl-10 border-primary/10 bg-secondary"
          />
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((user, i) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="noctis-card p-3 flex items-center justify-between"
            >
              <span className="text-sm text-foreground">{user.username}</span>
              <Button
                size="sm"
                className="h-7 text-xs bg-primary/15 text-primary border border-primary/20 hover:bg-primary/25"
                onClick={() => {
                  // TODO: Send friend request via API
                  console.log('TODO: Send friend request to', user.username);
                }}
              >
                <UserPlus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-4 italic">No dreamers found in the void...</p>
      )}
    </div>
  );
};

export default FriendSearch;
