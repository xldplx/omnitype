import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-6 relative text-slate-800 font-sans selection:bg-indigo-100 overflow-hidden">
      
      {/* Translucent Big Watermark in Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[clamp(8rem,30vw,22rem)] font-black text-indigo-500/[0.03] tracking-tighter leading-none font-mono uppercase">
          SOON
        </span>
      </div>

      {/* Soft background glow accents */}
      <div className="fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <Motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm text-center relative z-10 flex flex-col items-center space-y-6"
      >
        {/* Simple COMING SOON Header & Description */}
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-indigo-600 tracking-tight uppercase">COMING SOON!</h2>
          <p className="text-slate-500 text-sm leading-relaxed font-semibold max-w-xs mx-auto">
            This encyclopedia chapter is currently being drafted. Full detailed breakdowns will be live soon!
          </p>
        </div>

        {/* Premium Pill Action Button */}
        <button
          type="button"
          onClick={() => navigate('/wiki')}
          className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer mt-4 border border-slate-950"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Wiki</span>
        </button>

      </Motion.div>
    </div>
  );
}
