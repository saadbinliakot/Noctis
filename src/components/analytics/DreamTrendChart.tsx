// Purpose: Dream symbol trending chart with bar visualization.
// TODO: Implement with Recharts using real data from analytics API.

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const mockTrends = [
  { symbol: 'shadow figure', count: 142, delta: '+23%' },
  { symbol: 'water', count: 118, delta: '+12%' },
  { symbol: 'falling', count: 98, delta: '-5%' },
  { symbol: 'teeth', count: 87, delta: '+8%' },
  { symbol: 'flying', count: 76, delta: '+2%' },
  { symbol: 'labyrinth', count: 64, delta: '+31%' },
  { symbol: 'clockwork', count: 52, delta: '+45%' },
];

const DreamTrendChart = () => {
  const maxCount = Math.max(...mockTrends.map(t => t.count));

  return (
    <div className="noctis-card p-5 h-full">
      <div className="mb-5 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary/60" />
        <h3 className="text-base font-heading glow-text-subtle">Trending Symbols</h3>
      </div>
      <div className="space-y-3">
        {mockTrends.map((trend, i) => (
          <motion.div
            key={trend.symbol}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{trend.symbol}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{trend.count}</span>
                <span className={`text-[10px] ${trend.delta.startsWith('+') ? 'text-primary/70' : 'text-destructive/70'}`}>
                  {trend.delta}
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(trend.count / maxCount) * 100}%` }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, hsl(263 70% 58% / 0.4), hsl(263 70% 58% / 0.7))',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DreamTrendChart;
