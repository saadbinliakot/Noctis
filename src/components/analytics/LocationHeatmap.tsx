// Purpose: Dream activity by location — clean list.

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

const LocationHeatmap = () => {
  return (
    <div className="noctis-card p-5 h-full">
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary/50" />
        <h3 className="text-sm font-heading font-medium">Dream Hotspots</h3>
      </div>
      <div className="space-y-1.5">
        {mockLocations.map((loc, i) => (
          <motion.div
            key={`${loc.city}-${loc.area}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${loc.intensity === 'high' ? 'bg-primary' : loc.intensity === 'medium' ? 'bg-primary/50' : 'bg-primary/25'}`} />
              <span className="text-foreground">{loc.city}, {loc.area}</span>
            </div>
            <span className="text-xs text-muted-foreground">{loc.count}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LocationHeatmap;
