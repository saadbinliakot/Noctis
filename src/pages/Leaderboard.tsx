import { motion } from 'framer-motion';
import { Trophy, Users, Zap, Badge, Heart, Star, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import type { User } from '@/types/noctis';

interface LeaderboardEntry extends User {
  rank: number;
  postCount?: number;
  badgeCount?: number;
  totalReactions?: number;
  totalFriends?: number;
  lucidCount?: number;
  avgReactionsPerPost?: number;
  score?: number;
}

type LeaderboardType = 'overall' | 'posts' | 'engagement' | 'badges' | 'friends' | 'lucid-dreams';

const leaderboardTabs = [
  { id: 'overall', label: 'Overall', icon: Trophy, color: 'text-yellow-400' },
  { id: 'posts', label: 'Dream Posters', icon: Sparkles, color: 'text-blue-400' },
  { id: 'engagement', label: 'Most Loved', icon: Heart, color: 'text-red-400' },
  { id: 'badges', label: 'Badge Collectors', icon: Badge, color: 'text-purple-400' },
  { id: 'friends', label: 'Social Butterflies', icon: Users, color: 'text-pink-400' },
  { id: 'lucid-dreams', label: 'Lucid Masters', icon: Star, color: 'text-cyan-400' },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('overall');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [activeTab]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/leaderboard/${activeTab}?limit=20`);
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      setLeaderboard([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRowColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500/10 to-yellow-500/5 border-yellow-500/20';
    if (rank === 2) return 'from-gray-400/10 to-gray-400/5 border-gray-400/20';
    if (rank === 3) return 'from-orange-600/10 to-orange-600/5 border-orange-600/20';
    return 'from-transparent to-transparent border-border/50';
  };

  const renderStatValue = (entry: LeaderboardEntry, tab: LeaderboardType) => {
    switch (tab) {
      case 'posts':
        return `${entry.postCount || 0} posts`;
      case 'engagement':
        return `${entry.totalReactions || 0} reactions`;
      case 'badges':
        return `${entry.badgeCount || 0} badges`;
      case 'friends':
        return `${entry.totalFriends || 0} friends`;
      case 'lucid-dreams':
        return `${entry.lucidCount || 0} lucid dreams`;
      case 'overall':
      default:
        return `${entry.score || 0} points`;
    }
  };

  const currentTab = leaderboardTabs.find((t) => t.id === activeTab);
  const TabIcon = currentTab?.icon || Trophy;

  return (
    <div className="min-h-screen bg-starfield pt-14">
      <main className="container mx-auto max-w-5xl px-4 py-8 page-enter">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <h1 className="text-3xl font-heading font-bold">Leaderboard</h1>
          </div>
          <p className="text-sm text-muted-foreground">Rise through the ranks of the nocturnal community</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {leaderboardTabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as LeaderboardType)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary/20 border border-primary/50 text-primary'
                  : 'bg-secondary/30 border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-xs font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="noctis-card overflow-hidden"
        >
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-3">Loading leaderboard...</p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No data available yet. Check back soon!
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {/* Headers */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/30 border-b border-border">
                <div className="col-span-1 text-xs font-semibold text-muted-foreground">Rank</div>
                <div className="col-span-5 text-xs font-semibold text-muted-foreground">Player</div>
                <div className="col-span-6 text-right text-xs font-semibold text-muted-foreground">Stats</div>
              </div>

              {/* Rows */}
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gradient-to-r ${getRowColor(
                    entry.rank,
                  )} hover:bg-primary/5 transition-colors`}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center justify-center">
                    <span className="text-lg font-bold">{getRankMedal(entry.rank)}</span>
                  </div>

                  {/* Player Info */}
                  <div className="col-span-5 flex items-center gap-3">
                    <img
                      src={entry.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.username}`}
                      alt={entry.username}
                      className="h-10 w-10 rounded-full border border-border"
                    />
                    <div>
                      <p className="font-medium text-foreground">{entry.username}</p>
                      {entry.bio && <p className="text-xs text-muted-foreground line-clamp-1">{entry.bio}</p>}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="col-span-6 flex items-center justify-end gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{renderStatValue(entry, activeTab)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-lg border border-border/50 bg-primary/5 p-4"
        >
          <div className="flex gap-3">
            <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">How Rankings Work</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Overall Score:</strong> Combines posts (10 pts), badges (25 pts), reactions, and friends (5 pts).
                <br />
                <strong>Other Categories:</strong> Ranked by specific metrics in each leaderboard.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Leaderboard;
