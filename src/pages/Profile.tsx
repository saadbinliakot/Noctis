
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FriendList from '@/components/FriendList';
import BadgePanel from '@/components/BadgePanel';
import { User, Moon, Flame, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';

interface UserStats {
  dreamsCount: number;
  friendsCount: number;
  viewsCount: number;
}

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      // Fetch user statistics from backend
      const response = await api.get(`/users/${user.id}/stats`);
      setStats(response);
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
      // Fallback to basic stats if API fails
      setStats({
        dreamsCount: 0,
        friendsCount: 0,
        viewsCount: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStats();

    // Listen for dream submission events
    const handleDreamSubmitted = () => {
      fetchUserStats();
    };

    window.addEventListener('dreamSubmitted', handleDreamSubmitted);

    return () => {
      window.removeEventListener('dreamSubmitted', handleDreamSubmitted);
    };
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-starfield pt-14 flex items-center justify-center">
        <div className="text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  const joinDate = new Date(user.joinDate);
  const daysSinceJoin = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

  const displayStats = stats || {
    dreamsCount: 0,
    friendsCount: 0,
    viewsCount: 0
  };

  const statItems = [
    { icon: Moon, label: 'Dreams', value: displayStats.dreamsCount.toString() },
    { icon: Flame, label: 'Streak', value: user.streakCount?.toString() || '0' },
    { icon: User, label: 'Friends', value: displayStats.friendsCount.toString() },
    { icon: Eye, label: 'Views', value: displayStats.viewsCount.toString() },
  ];

  return (
    <div className="min-h-screen bg-starfield pt-14">
      <main className="container mx-auto max-w-3xl px-4 py-8 page-enter">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10 flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card mb-4">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-heading font-semibold">{user.username}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Dreamer since {daysSinceJoin} {daysSinceJoin === 1 ? 'day' : 'days'} ago
          </p>

          <div className="mt-6 flex gap-8">
            {statItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
                <div className="text-lg font-heading font-semibold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <BadgePanel />
          <div className="noctis-card p-5">
            <h3 className="mb-4 text-sm font-heading font-medium">Your Friends</h3>
            <FriendList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
