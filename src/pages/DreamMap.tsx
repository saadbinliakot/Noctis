// Purpose: Placeholder page for the dream location map.
// TODO: Implement with Mapbox or Leaflet for interactive dream mapping.

import { MapPin } from 'lucide-react';

const DreamMap = () => {
  return (
    <div className="fog-overlay min-h-screen pt-20">
      <main className="container mx-auto max-w-4xl px-4 py-8 relative z-10">
        <h1 className="mb-2 text-center text-3xl glow-text">Dream Map</h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Where do the visions converge?
        </p>
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-primary/10 bg-card surface-depth">
          <div className="text-center text-muted-foreground">
            <MapPin className="mx-auto mb-3 h-12 w-12 text-primary/40" />
            <p className="text-sm">Interactive dream map coming soon.</p>
            <p className="mt-1 text-xs">TODO: Implement with Mapbox or Leaflet</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DreamMap;
