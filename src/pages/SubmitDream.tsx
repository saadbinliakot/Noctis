// Purpose: Page for submitting a new dream/myth/paranormal experience.

import { motion } from 'framer-motion';
import DreamForm from '@/components/DreamForm';
import { Moon } from 'lucide-react';

const SubmitDream = () => {
  return (
    <div className="fog-layer min-h-screen bg-starfield pt-20">
      <main className="container mx-auto max-w-xl px-4 py-8 relative z-10 page-enter">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Moon className="mx-auto mb-4 h-8 w-8 text-primary/50" />
          <h1 className="text-3xl glow-text mb-2">Submit a Vision</h1>
          <p className="text-sm text-muted-foreground">
            Cast your experience into the void. Others may find it echoes their own.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="noctis-card p-6 md:p-8"
        >
          <DreamForm />
        </motion.div>

        {/* Posting restriction notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-6 italic"
        >
          🌙 Submissions are open between 12:00 AM – 4:00 AM
          {/* TODO: Enforce this restriction */}
        </motion.p>
      </main>
    </div>
  );
};

export default SubmitDream;
