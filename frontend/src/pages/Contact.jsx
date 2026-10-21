import { motion as Motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-slate-50 pt-32 md:pt-48 pb-32 relative overflow-hidden">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="surface-card w-full max-w-3xl mx-auto px-6 md:px-10 py-16 relative z-10"
      >
        <h1 className="heading-display text-4xl md:text-5xl tracking-tight">nanti saja</h1>
      </Motion.div>
    </div>
  );
}
