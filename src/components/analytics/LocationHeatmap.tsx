// Purpose: Placeholder for dream activity heatmap by location.
// TODO: Implement with a map library (e.g., Mapbox) and real location data.

import { MapPin } from 'lucide-react';

const mockLocations = [
  { city: 'Prague', area: 'Old Town', count: 23 },
  { city: 'Tokyo', area: 'Shibuya', count: 19 },
  { city: 'New Orleans', area: 'French Quarter', count: 17 },
  { city: 'Edinburgh', area: 'Old Town', count: 14 },
  { city: 'Cairo', area: 'Giza', count: 11 },
];

const LocationHeatmap = () => {
  return (
    <div className="rounded-lg border border-primary/10 bg-card p-5 surface-depth">
      <div className="mb-4 flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="text-lg">Dream Hotspots</h3>
      </div>
      <div className="space-y-2">
        {mockLocations.map((loc) => (
          <div key={`${loc.city}-${loc.area}`} className="flex items-center justify-between rounded-md bg-secondary px-3 py-2 text-sm">
            <span className="text-foreground">{loc.city}, {loc.area}</span>
            <span className="text-xs text-primary glow-text">{loc.count} visions</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationHeatmap;
