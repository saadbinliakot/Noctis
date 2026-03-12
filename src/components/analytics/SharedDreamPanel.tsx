// Purpose: Shared dream detection panel with crimson-themed alerts.
// TODO: Implement shared dream detection algorithm and real-time alerts.

import { motion } from 'framer-motion';
import { Eye, AlertTriangle, Users, MapPin, Clock } from 'lucide-react';
import type { SharedDream } from '@/types/noctis';

const mockSharedDreams: (SharedDream & { theme: string })[] = [
  { _id: '1', theme: 'Shadow Figures on rooftops', city: 'Dhaka', area: 'Dhanmondi', userCount: 4, detectedTime: new Date('2026-03-12T02:30:00') },
  { _id: '2', theme: 'Underwater cathedral with faceless choir', city: 'Lisbon', area: 'Alfama', userCount: 3, detectedTime: new Date('2026-03-11T03:15:00') },
  { _id: '3', theme: 'Red door in endless corridor', city: 'London', area: 'Whitechapel', userCount: 5, detectedTime: new Date('2026-03-10T01:45:00') },
];

const SharedDreamPanel = () => {
  return (
    <div className="noctis-card p-5" style={{ borderColor: 'hsl(0 60% 30% / 0.12)' }}>
      <div className="mb-5 flex items-center gap-2">
        <Eye className="h-4 w-4 text-destructive" />
        <h3 className="text-base font-heading glow-text-crimson">Shared Dream Detections</h3>
      </div>

      <div className="space-y-4">
        {mockSharedDreams.map((dream, i) => (
          <motion.div
            key={dream._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-md border border-destructive/8 p-4 transition-colors hover:border-destructive/15"
            style={{ background: 'linear-gradient(135deg, hsl(0 60% 30% / 0.04), transparent)' }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-destructive/70 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{dream.theme}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {dream.city}, {dream.area}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {dream.userCount} dreamers
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {dream.detectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-[10px] text-muted-foreground italic text-center">
        TODO: Dream pattern clustering and shared dream detection algorithm
      </p>
    </div>
  );
};

export default SharedDreamPanel;
