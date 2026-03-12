// Purpose: Placeholder for shared dream detection alerts.
// TODO: Implement shared dream detection algorithm and real-time alerts.

import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SharedDream } from '@/types/noctis';

const mockSharedDreams: SharedDream[] = [
  { _id: '1', theme: 'Red door in an empty corridor', city: 'London', area: 'Whitechapel', userCount: 4, detectedTime: new Date() },
  { _id: '2', theme: 'Underwater cathedral', city: 'Lisbon', area: 'Alfama', userCount: 3, detectedTime: new Date() },
];

const SharedDreamPanel = () => {
  return (
    <div className="rounded-lg border border-destructive/20 bg-card p-5 surface-depth">
      <div className="mb-4 flex items-center gap-2 text-destructive">
        <Eye className="h-4 w-4" />
        <h3 className="text-lg text-destructive">Shared Dream Alerts</h3>
      </div>
      <div className="space-y-3">
        {mockSharedDreams.map((dream, i) => (
          <motion.div
            key={dream._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="rounded-md border border-destructive/10 bg-destructive/5 p-3"
          >
            <p className="text-sm font-semibold text-foreground">{dream.theme}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {dream.userCount} dreamers · {dream.city}, {dream.area}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SharedDreamPanel;
