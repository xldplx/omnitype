import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full min-h-screen bg-[#fafafa] pt-32 pb-32 relative overflow-hidden flex flex-col items-center selection:bg-indigo-100 px-6">
      
      {/* Background blobs */}
      <div className="fixed top-[-20vh] right-[-10vw] w-[60vw] h-[60vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[10vh] left-[-10vw] w-[50vw] h-[50vw] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 relative z-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 mb-8">
          <Layers className="w-8 h-8 text-indigo-600" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
          About OmniType.
        </h1>
        
        <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
          <p>
            OmniType is a simple tool designed to bring different personality tests and mental models into one easy-to-use dashboard.
          </p>
          <p>
            We believe that knowing yourself is the best way to grow. By understanding how you <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">Think</span>, discovering what <span className="text-rose-500 font-bold bg-rose-50 px-2 py-0.5 rounded-md">Drives You</span>, and learning your habits, you can make better choices in life.
          </p>
          <p>
            This platform brings together popular tests like the 16 Personalities and Enneagram with modern science, all in a beautiful and simple design.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100">
           <p className="text-sm text-slate-400 font-bold uppercase tracking-widest text-center">
             Built to help you grow
           </p>
        </div>
      </motion.div>
    </div>
  );
}
