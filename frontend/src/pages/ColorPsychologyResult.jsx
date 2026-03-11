import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Flame, Sparkles, Droplets, Zap, Eye, Activity } from 'lucide-react';
import { colorArchetypes } from '../utils/colorPsychologyLogic';

export default function ColorPsychologyResult() {
  const { type } = useParams(); // type should match the dominantColor key
  const navigate = useNavigate();
  const location = useLocation();
  
  let resultData = location.state?.resultData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // If accessed directly via URL, reconstruct minimal simulated data
  if (!resultData && type) {
    if (colorArchetypes[type]) {
        resultData = {
           dominantArchetype: type,
           info: colorArchetypes[type],
           breakdown: {
             [type]: 100,
           },
           rawScores: {} // Not needed for direct link view
        };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/color-psychology" replace />;
  }

  const { info, breakdown } = resultData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-cyan-200">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[25vw] tracking-tighter leading-none text-slate-800 uppercase text-center block" style={{ WebkitTextStroke: `2px ${info.hex}30` }}>
          AURA
        </span>
      </motion.div>

      {/* Decorative Modern Background Gradients based on exact Color */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-linear-to-br ${info.gradient} rounded-full blur-[140px] pointer-events-none opacity-40 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] bg-linear-to-tl ${info.gradient} rounded-full blur-[140px] pointer-events-none opacity-40 z-0`} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-32 pb-32 relative z-10"
      >
        
        {/* Superior Navigation */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-16 md:mb-24">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 font-semibold text-sm uppercase tracking-widest hover:text-slate-900 transition-colors group"
          >
            <div className={`w-8 h-8 rounded-full ${info.bgLight} border ${info.borderLight} flex items-center justify-center group-hover:bg-white transition-colors`}>
              <ChevronLeft className={`w-4 h-4 text-slate-600`} />
            </div>
            <span>Home</span>
          </button>
        </motion.div>

        {/* Hero Dashboard Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Title Card */}
          <div className="lg:col-span-8 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${info.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h3 className={`text-xs font-bold tracking-[0.4em] uppercase mb-6 text-slate-500 flex items-center gap-3`}>
              <Eye className="w-4 h-4" />
              Primary Aura Frequency
            </h3>
            
            <h1 className={`text-5xl md:text-7xl lg:text-[6rem] font-black mb-6 text-transparent tracking-tight leading-none bg-clip-text bg-linear-to-br ${info.gradient} pb-2`}>
              {info.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-600 max-w-4xl leading-relaxed tracking-wide font-normal mt-2">
              {info.description}
            </p>
          </div>

          {/* Hex Code Badge Card */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-linear-to-tr ${info.gradient} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700 opacity-60`} />
             
             {/* Exact Hex Display */}
             <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl mb-6 relative z-10 flex items-center justify-center overflow-hidden`} style={{ backgroundColor: info.hex }}>
                <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
             </div>

             <h2 className={`text-4xl md:text-5xl leading-none font-bold tracking-tighter text-slate-800 z-10 relative drop-shadow-sm pb-1`}>
               {info.hex}
             </h2>
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-slate-500 mt-4 z-10 text-center">Core Hex Frequency</span>
          </div>
        </motion.div>

        {/* Psychological Traits & Keywords */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-1 transition-transform duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Manifested Traits
            </h4>
            <ul className="space-y-6">
              {info.traits?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start">
                  <div className={`mt-2 w-2 h-2 rounded-full bg-linear-to-r ${info.color} shrink-0`} />
                  <p className="text-slate-600 leading-relaxed text-[1.1rem]">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-1 transition-transform duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Zap className={`w-5 h-5 text-slate-800`} />
              Energetic Keywords
            </h4>
            <div className="flex flex-wrap gap-4">
              {info.keywords?.map((item, idx) => (
                <span key={idx} className={`px-5 py-3 rounded-2xl bg-white border border-slate-100 text-slate-700 font-bold uppercase tracking-widest text-xs shadow-sm hover:scale-105 transition-transform cursor-default whitespace-nowrap`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Spectral Breakdown */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16">
          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-slate-400" />
                <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">Aura Spectrum Breakdown</h4>
            </div>
            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-4 py-2 rounded-full uppercase tracking-widest">Resonance Scale</span>
          </div>

          <div className="space-y-6">
              {Object.keys(colorArchetypes).map((colorKey) => {
                  const score = breakdown[colorKey] || 0;
                  const arch = colorArchetypes[colorKey];
                  const isPrimary = colorKey === resultData.dominantArchetype;
                  
                  let barColor = `bg-linear-to-r ${arch.gradient}`;
                  let textColor = isPrimary ? "text-slate-800" : "text-slate-400";
                  
                  // Only show colors with some resonance, or show all, let's show top 5
                  if (score <= 5 && !isPrimary) return null; // Filter out very low noise

                  return (
                      <div key={colorKey} className="flex items-center gap-6 group">
                          <span className={`w-20 md:w-32 font-bold text-sm md:text-base tracking-widest uppercase ${textColor}`}>{arch.name}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner hidden md:block">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${barColor}`}
                              />
                          </div>
                          <div className={`w-12 text-right font-bold ${textColor}`}>
                              {score}%
                          </div>
                      </div>
                  );
              })}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
