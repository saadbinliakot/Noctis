// Purpose: Horror-themed loading screen with pulsing NOCTIS logo and fog.

import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Listening to the dreams of the night..." }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background bg-starfield">
      {/* Fog layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, hsl(263 70% 58% / 0.06), transparent 70%)',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        {/* Glowing orb behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />

        <h1 className="font-display text-5xl md:text-7xl tracking-widest animate-logo-pulse mb-6 relative">
          NOCTIS
        </h1>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/60"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-muted-foreground text-sm font-body italic tracking-wide"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
