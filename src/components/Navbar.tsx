// Purpose: Main navigation bar with gothic NOCTIS branding.

import { Link, useLocation } from 'react-router-dom';
import { Moon, Eye, BarChart3, User, MapPin, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home', icon: Moon },
  { path: '/feed', label: 'Feed', icon: Eye },
  { path: '/submit', label: 'Submit', icon: PenTool },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/dreammap', label: 'Map', icon: MapPin },
  { path: '/profile', label: 'Profile', icon: User },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-2xl tracking-wider text-foreground glow-text">
          NOCTIS
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="relative px-3 py-2 text-sm transition-colors"
              >
                <span className={isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
                  <Icon className="inline-block h-4 w-4 md:mr-1.5" />
                  <span className="hidden md:inline">{label}</span>
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-x-1 -bottom-px h-px bg-primary"
                    style={{ boxShadow: '0 0 8px hsl(275 90% 70% / 0.6)' }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
