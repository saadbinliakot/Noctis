// Purpose: Analytics dashboard with dream trends, hotspots, and shared dream alerts.

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import DreamTrendChart from '@/components/analytics/DreamTrendChart';
import LocationHeatmap from '@/components/analytics/LocationHeatmap';
import SharedDreamPanel from '@/components/analytics/SharedDreamPanel';
import SharedDreamAlert from '@/components/SharedDreamAlert';

const Analytics = () => {
  return (
    <div className="fog-layer min-h-screen bg-starfield pt-20">
      <main className="container mx-auto max-w-5xl px-4 py-8 relative z-10 page-enter">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <BarChart3 className="mx-auto mb-3 h-8 w-8 text-primary/50" />
          <h1 className="text-3xl glow-text mb-2">The Collective Unconscious</h1>
          <p className="text-sm text-muted-foreground">Patterns emerge from the dreams of many</p>
        </motion.div>

        {/* Alert */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <SharedDreamAlert
            theme="Shadow Figures"
            location="Dhaka – Dhanmondi"
            userCount={4}
            timeWindow="Last 24 hours"
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <DreamTrendChart />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <LocationHeatmap />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="md:col-span-2">
            <SharedDreamPanel />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
