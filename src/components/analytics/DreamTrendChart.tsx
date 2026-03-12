// Purpose: Placeholder for dream symbol trending chart.
// TODO: Implement with Recharts using real data from analytics API.

import { BarChart3 } from 'lucide-react';

const DreamTrendChart = () => {
  const mockTrends = [
    { symbol: 'water', count: 142 },
    { symbol: 'falling', count: 98 },
    { symbol: 'teeth', count: 87 },
    { symbol: 'flying', count: 76 },
    { symbol: 'shadow figure', count: 64 },
  ];

  return (
    <div className="rounded-lg border border-primary/10 bg-card p-5 surface-depth">
      <div className="mb-4 flex items-center gap-2 text-muted-foreground">
        <BarChart3 className="h-4 w-4 text-primary" />
        <h3 className="text-lg">Trending Symbols</h3>
      </div>
      <div className="space-y-3">
        {mockTrends.map((trend) => (
          <div key={trend.symbol} className="flex items-center gap-3">
            <span className="w-28 text-sm text-foreground">{trend.symbol}</span>
            <div className="flex-1 rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary/60"
                style={{ width: `${(trend.count / 142) * 100}%` }}
              />
            </div>
            <span className="w-8 text-right text-xs text-muted-foreground">{trend.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamTrendChart;
