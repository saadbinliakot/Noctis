// Purpose: Placeholder page for the dream location map.
// TODO: Implement with Mapbox or Leaflet for interactive dream mapping.

import { motion } from 'framer-motion';
import { MapPin, Globe } from 'lucide-react';

const mockHotspots = [
  { city: 'Prague', area: 'Old Town', count: 23, theme: 'Mechanical entities' },
  { city: 'Tokyo', area: 'Shibuya', count: 19, theme: 'Neon labyrinths' },
  { city: 'New Orleans', area: 'French Quarter', count: 17, theme: 'Spirit encounters' },
  { city: 'Edinburgh', area: 'Old Town', count: 14, theme: 'Stone whispers' },
  { city: 'Dhaka', area: 'Dhanmondi', count: 11, theme: 'Shadow figures' },
  { city: 'Cairo', area: 'Giza', count: 9, theme: 'Ancient corridors' },
];

const DreamMap = () => {
  return (
    <div className="fog-layer min-h-screen bg-starfield pt-20">
      <main className="container mx-auto max-w-4xl px-4 py-8 relative z-10 page-enter">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Globe className="mx-auto mb-3 h-8 w-8 text-primary/50" />
          <h1 className="text-3xl glow-text mb-2">Dream Map</h1>
          <p className="text-sm text-muted-foreground">Where do the visions converge?</p>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="noctis-card min-h-[300px] flex items-center justify-center mb-8 relative overflow-hidden"
        >
          {/* Simulated map grid */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(hsl(263 70% 58% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(263 70% 58% / 0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="text-center text-muted-foreground relative z-10 p-8">
            <MapPin className="mx-auto mb-3 h-12 w-12 text-primary/30 animate-float-gentle" />
            <p className="text-sm font-heading">Interactive dream map coming soon</p>
            <p className="mt-1 text-xs italic">TODO: Implement with Mapbox or Leaflet</p>
          </div>
        </motion.div>

        {/* Hotspot list */}
        <div className="grid gap-4 sm:grid-cols-2">
          {mockHotspots.map((spot, i) => (
            <motion.div
              key={`${spot.city}-${spot.area}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="noctis-card p-4 flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{spot.city}, {spot.area}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{spot.theme}</p>
                <p className="text-xs text-primary/80 mt-1 glow-text-subtle">{spot.count} visions reported</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DreamMap;
