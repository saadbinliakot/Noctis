// Purpose: Shared dream detections panel.

import { motion } from 'framer-motion';
import { Eye, Users, MapPin, Clock } from 'lucide-react';
import type { SharedDream } from '@/types/noctis';

const mockSharedDreams: (SharedDream & { theme: string })[] = [
  { _id: '1', theme: 'Shadow Figures on rooftops', city: 'Dhaka', area: 'Dhanmondi', userCount: 4, detectedTime: new Date('2026-03-12T02:30:00') },
  { _id: '2', theme: 'Underwater cathedral with faceless choir', city: 'Lisbon', area: 'Alfama', userCount: 3, detectedTime: new Date('2026-03-11T03:15:00') },
  { _id: '3', theme: 'Red door in endless corridor', city: 'London', area: 'Whitechapel', userCount: 5, detectedTime: new Date('2026-03-10T01:45:00') },
];

const SharedDreamPanel = () => {
  return (
    <div className="noctis-card p-5">
      <div className="mb-4 flex items-center gap-2">
        <Eye className="h-4 w-4 text-destructive/60" />
        <h3 className="text-sm font-heading font-medium">Shared Dream Detections</h3>
      </div>

      <div className="space-y-3">
        {mockSharedDreams.map((dream, i) => (
          <motion.div
            key={dream._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-lg border border-border p-4 hover:border-destructive/15 transition-colors"
          >
            <p className="text-sm font-medium text-foreground mb-2">{dream.theme}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{dream.city}, {dream.area}</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{dream.userCount} dreamers</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{dream.detectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SharedDreamPanel;
