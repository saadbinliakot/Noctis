// Purpose: Page for submitting a new dream/myth/paranormal experience.

import DreamForm from '@/components/DreamForm';

const SubmitDream = () => {
  return (
    <div className="fog-overlay min-h-screen pt-20">
      <main className="container mx-auto max-w-xl px-4 py-8 relative z-10">
        <h1 className="mb-2 text-center text-3xl glow-text">Submit a Vision</h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Cast your experience into the void. Others may find it echoes their own.
        </p>
        <div className="rounded-lg border border-primary/10 bg-card p-6 surface-depth">
          <DreamForm />
        </div>
      </main>
    </div>
  );
};

export default SubmitDream;
