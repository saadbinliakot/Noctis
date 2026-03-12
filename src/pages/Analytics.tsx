// Purpose: Analytics dashboard showing dream trends, hotspots, and shared dream alerts.

import DreamTrendChart from '@/components/analytics/DreamTrendChart';
import LocationHeatmap from '@/components/analytics/LocationHeatmap';
import SharedDreamPanel from '@/components/analytics/SharedDreamPanel';

const Analytics = () => {
  return (
    <div className="fog-overlay min-h-screen pt-20">
      <main className="container mx-auto max-w-4xl px-4 py-8 relative z-10">
        <h1 className="mb-2 text-center text-3xl glow-text">The Collective Unconscious</h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Patterns emerge from the dreams of many.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <DreamTrendChart />
          <LocationHeatmap />
          <div className="md:col-span-2">
            <SharedDreamPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
