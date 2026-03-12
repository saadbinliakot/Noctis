// Purpose: Shared dream detection alert component with crimson styling.

import { motion } from 'framer-motion';
import { AlertTriangle, Users, MapPin, Clock } from 'lucide-react';

interface SharedDreamAlertProps {
  theme: string;
  location: string;
  userCount: number;
  timeWindow: string;
}

const SharedDreamAlert = ({ theme, location, userCount, timeWindow }: SharedDreamAlertProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="noctis-card overflow-hidden"
      style={{ borderColor: 'hsl(0 60% 30% / 0.2)' }}
    >
      {/* Crimson glow header */}
      <div className="px-5 py-3 border-b border-destructive/10" style={{
        background: 'linear-gradient(135deg, hsl(0 60% 30% / 0.1), transparent)',
      }}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <span className="text-sm font-heading font-semibold tracking-wider uppercase text-destructive glow-text-crimson">
            Shared Dream Detected
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Theme</span>
          <p className="text-foreground font-semibold mt-0.5">{theme}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary/60" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary/60" />
            {userCount} dreamers
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary/60" />
            {timeWindow}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SharedDreamAlert;
