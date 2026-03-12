// Purpose: Main navigation bar with gothic NOCTIS branding and full nav links.

import { Link, useLocation } from 'react-router-dom';
import { Moon, Eye, PenTool, BarChart3, User, MapPin, Users, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Home', icon: Moon },
  { path: '/feed', label: 'Night Feed', icon: Eye },
  { path: '/submit', label: 'Submit Dream', icon: PenTool },
  { path: '/friends', label: 'Friends', icon: Users },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/dreammap', label: 'Dream Map', icon: MapPin },
  { path: '/profile', label: 'Profile', icon: User },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-primary/8 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="font-display text-xl tracking-[0.2em] text-foreground glow-text-subtle hover:glow-text transition-all duration-500">
          NOCTIS
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="relative px-3 py-2 text-xs uppercase tracking-widest transition-colors duration-300"
              >
                <span className={`flex items-center gap-1.5 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden lg:inline">{label}</span>
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute inset-x-1 -bottom-px h-px"
                    style={{
                      background: 'linear-gradient(90deg, transparent, hsl(263 70% 58%), transparent)',
                      boxShadow: '0 0 8px hsl(263 70% 58% / 0.5)',
                    }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary/8 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
