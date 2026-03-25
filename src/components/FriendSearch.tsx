
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
      setResults(mockSearchResults.filter(u => u.username.toLowerCase().includes(query.toLowerCase())));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => { setQuery(e.target.value); handleSearch(); }}
          placeholder="Search by username..."
          className="pl-9 border-border bg-secondary"
        />
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((user, i) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
            >
              <span className="text-sm text-foreground">{user.username}</span>
              <Button
                size="sm"
                className="h-7 rounded-full bg-primary/10 text-primary text-xs hover:bg-primary/20 border-0"
                onClick={() => console.log('TODO: Send friend request to', user.username)}
              >
                <UserPlus className="h-3 w-3 mr-1" /> Add
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-3">No users found</p>
      )}
    </div>
  );
};

export default FriendSearch;
