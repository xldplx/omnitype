import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';

export default function ComingSoon() {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center relative z-10 px-6 pt-24 pb-32 text-slate-800 selection:bg-purple-200">
      
      <Motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-xl flex flex-col items-center bg-white/80 backdrop-blur-2xl p-10 sm:p-14 rounded-[2.5rem] border border-white/90 shadow-[0_10px_40px_rgb(0,0,0,0.04)]"
      >
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-8 shadow-inner">
          <Clock className="w-8 h-8 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Knowledge Base Entry</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
          Under Construction
        </h1>
        
        <p className="text-slate-500 text-base sm:text-lg font-medium leading-relaxed mb-10 text-balance">
          We are currently drafting this detailed encyclopedia chapter. Full psychological breakdowns, history, and analytical metrics will be available soon.
        </p>

        <Link 
          to="/wiki"
          className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Wiki Directory</span>
        </Link>
      </Motion.div>
    </div>
  );
}
