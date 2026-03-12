// Purpose: Landing page for NOCTIS with atmospheric hero section.

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Eye, PenTool, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Eye, title: 'Night Feed', desc: 'A timeline of visions from dreamers worldwide' },
  { icon: PenTool, title: 'Submit Visions', desc: 'Cast your dreams into the collective void' },
  { icon: Users, title: 'Fellow Dreamers', desc: 'Connect with others who see what you see' },
  { icon: BarChart3, title: 'Dream Analytics', desc: 'Detect patterns in the collective unconscious' },
];

const Home = () => {
  return (
    <div className="fog-layer min-h-screen bg-starfield">
      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

          <Moon
            className="mx-auto mb-8 h-16 w-16 text-primary animate-float-gentle"
            style={{ filter: 'drop-shadow(0 0 30px hsl(263 70% 58% / 0.4))' }}
          />

          <h1 className="mb-4 font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] glow-text relative">
            NOCTIS
          </h1>

          <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground font-body">
            A sanctuary for the nocturnal mind. Share your dreams, myths, and encounters with the unknown.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="btn-horror h-12 px-8 font-heading text-sm tracking-wider uppercase">
              <Link to="/feed">
                <Eye className="mr-2 h-4 w-4" />
                Enter the Void
              </Link>
            </Button>
            <Button asChild className="btn-crimson h-12 px-8 font-heading text-sm tracking-wider uppercase">
              <Link to="/submit">
                <PenTool className="mr-2 h-4 w-4" />
                Submit a Vision
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 mt-20 grid grid-cols-3 gap-10 text-center"
        >
          {[
            { label: 'Visions Shared', value: '2,847' },
            { label: 'Active Dreamers', value: '412' },
            { label: 'Shared Dreams', value: '23' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <div className="text-3xl font-heading font-semibold text-primary glow-text">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="noctis-card p-6"
              >
                <feat.icon className="h-6 w-6 text-primary/60 mb-3" />
                <h3 className="text-base font-heading mb-1">{feat.title}</h3>
                <p className="text-sm text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
