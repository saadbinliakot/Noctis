// Purpose: Dream location map placeholder.

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

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
    <div className="min-h-screen bg-starfield pt-14">
      <main className="container mx-auto max-w-4xl px-4 py-8 page-enter">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="text-2xl font-heading font-semibold mb-1">Dream Map</h1>
          <p className="text-sm text-muted-foreground">Where dreams converge</p>
        </motion.div>

        {/* Map placeholder */}
        <div className="noctis-card min-h-[280px] flex items-center justify-center mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="text-center text-muted-foreground p-8">
            <MapPin className="mx-auto mb-3 h-8 w-8 text-primary/30" />
            <p className="text-sm font-medium">Interactive map coming soon</p>
            <p className="mt-1 text-xs">TODO: Implement with Mapbox or Leaflet</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {mockHotspots.map((spot, i) => (
            <motion.div
              key={`${spot.city}-${spot.area}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              className="noctis-card p-4 flex items-center gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/8">
                <MapPin className="h-4 w-4 text-primary/60" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{spot.city}, {spot.area}</p>
                <p className="text-xs text-muted-foreground">{spot.theme}</p>
              </div>
              <span className="text-xs text-muted-foreground">{spot.count}</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DreamMap;
