// Purpose: Trending dream symbols — clean bar chart.

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
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary/50" />
        <h3 className="text-sm font-heading font-medium">Trending Symbols</h3>
      </div>
      <div className="space-y-3">
        {mockTrends.map((trend, i) => (
          <div key={trend.symbol}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-foreground">{trend.symbol}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{trend.count}</span>
                <span className={`text-[10px] ${trend.delta.startsWith('+') ? 'text-primary/60' : 'text-destructive/60'}`}>
                  {trend.delta}
                </span>
              </div>
            </div>
            <div className="h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(trend.count / maxCount) * 100}%` }}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.5 }}
                className="h-full rounded-full bg-primary/40"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamTrendChart;
