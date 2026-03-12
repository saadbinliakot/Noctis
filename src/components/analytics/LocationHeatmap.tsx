// Purpose: Dream activity hotspots by location.
// TODO: Implement with a map library and real location data.

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const mockLocations = [
  { city: 'Prague', area: 'Old Town', count: 23, intensity: 'high' },
  { city: 'Dhaka', area: 'Dhanmondi', count: 19, intensity: 'high' },
  { city: 'Tokyo', area: 'Shibuya', count: 17, intensity: 'medium' },
  { city: 'New Orleans', area: 'French Quarter', count: 14, intensity: 'medium' },
  { city: 'Edinburgh', area: 'Old Town', count: 11, intensity: 'low' },
  { city: 'Cairo', area: 'Giza', count: 9, intensity: 'low' },
];

const intensityColors: Record<string, string> = {
  high: 'text-primary glow-text',
  medium: 'text-primary/70',
  low: 'text-primary/50',
};

const LocationHeatmap = () => {
  return (
    <div className="noctis-card p-5 h-full">
      <div className="mb-5 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary/60" />
        <h3 className="text-base font-heading glow-text-subtle">Dream Hotspots</h3>
      </div>
      <div className="space-y-2">
        {mockLocations.map((loc, i) => (
          <motion.div
            key={`${loc.city}-${loc.area}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between rounded-md bg-secondary/50 px-3 py-2.5 text-sm transition-colors hover:bg-secondary group"
          >
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${loc.intensity === 'high' ? 'bg-primary animate-pulse' : loc.intensity === 'medium' ? 'bg-primary/60' : 'bg-primary/30'}`} />
              <span className="text-foreground group-hover:text-primary transition-colors">
                {loc.city}, {loc.area}
              </span>
            </div>
            <span className={`text-xs font-heading ${intensityColors[loc.intensity]}`}>
              {loc.count} visions
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LocationHeatmap;
