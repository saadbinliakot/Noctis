// Purpose: Landing page for NOCTIS with atmospheric hero section.

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Eye, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="fog-overlay flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        <Moon className="mx-auto mb-6 h-16 w-16 text-primary animate-float" style={{ filter: 'drop-shadow(0 0 20px hsl(275 90% 70% / 0.4))' }} />

        <h1 className="mb-4 font-display text-6xl tracking-wider glow-text md:text-8xl">
          NOCTIS
        </h1>

        <p className="mx-auto mb-8 max-w-md text-lg leading-relaxed text-muted-foreground">
          A sanctuary for the nocturnal mind. Share your dreams, myths, and encounters with the unknown.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
            <Link to="/feed">
              <Eye className="mr-2 h-4 w-4" />
              Enter the Void
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary/20 text-foreground hover:bg-primary/10 px-6">
            <Link to="/submit">
              <PenTool className="mr-2 h-4 w-4" />
              Submit a Vision
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {[
            { label: 'Visions Shared', value: '2,847' },
            { label: 'Active Dreamers', value: '412' },
            { label: 'Shared Dreams', value: '23' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.15 }}
            >
              <div className="text-2xl font-semibold text-primary glow-text">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
