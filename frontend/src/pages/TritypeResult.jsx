import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Brain, Shield, Heart, Activity, Zap, Layers } from 'lucide-react';
import { tritypeArchetypes } from '../utils/tritypeResultLogic';

export default function TritypeResult() {
  const { type } = useParams(); // type should match the archetypeKey
  const navigate = useNavigate();
  const location = useLocation();
  
  let resultData = location.state?.resultData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // If accessed directly via URL, reconstruct minimal simulated data
  if (!resultData && type) {
    if (tritypeArchetypes[type]) {
        resultData = {
           tritypeFull: type,
           archetypeKey: type,
           dominantType: parseInt(type[0]),
           archetypeInfo: tritypeArchetypes[type],
           breakdown: {
             gut: 85,
             heart: 60,
             head: 75
           }
        };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/tritype" replace />;
  }

  const { tritypeFull, archetypeInfo, breakdown } = resultData;
  const info = archetypeInfo;

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
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-rose-200">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[40vw] tracking-tighter leading-none text-slate-800">
          {tritypeFull}
        </span>
      </motion.div>

      {/* Decorative Modern Background Gradients */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${info.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${info.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${info.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h3 className={`text-xs font-bold tracking-[0.4em] uppercase mb-6 text-slate-500 flex items-center gap-3`}>
              <Layers className="w-4 h-4" />
              Tritype Composition
            </h3>
            
            <h1 className={`text-5xl md:text-7xl lg:text-[6rem] font-bold mb-6 text-slate-900 tracking-tight leading-none bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2`}>
              {info.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-normal mt-2">
              {info.description}
            </p>
          </div>

          {/* Type Badge Card */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${info.bgLight} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h2 className={`text-[clamp(4.5rem,10vw,8rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${info.color} z-10 relative drop-shadow-sm pb-1 whitespace-nowrap`}>
               {tritypeFull}
             </h2>
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-slate-600 mt-4 z-10 whitespace-nowrap">Core Alignment</span>
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Zap className="w-5 h-5 text-amber-400" />
              Synergistic Strengths
            </h4>
            <ul className="space-y-6">
              {info.strengths?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start">
                  <div className={`mt-2 w-2 h-2 rounded-full bg-linear-to-r ${info.color} shrink-0`} />
                  <p className="text-slate-600 leading-relaxed text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Global Score Breakdown (3 Centers) */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16">
          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-slate-400" />
                <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">Tritype Centers Breakdown</h4>
            </div>
            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-4 py-2 rounded-full uppercase tracking-widest">Alignment Scale</span>
          </div>

          <div className="space-y-10">
              {[
                { label: 'Gut Center (8, 9, 1)', score: breakdown.gut, dominant: tritypeFull.split('').find(n => ['8','9','1'].includes(n)), color: 'from-amber-500 to-orange-500' },
                { label: 'Heart Center (2, 3, 4)', score: breakdown.heart, dominant: tritypeFull.split('').find(n => ['2','3','4'].includes(n)), color: 'from-rose-400 to-pink-500' },
                { label: 'Head Center (5, 6, 7)', score: breakdown.head, dominant: tritypeFull.split('').find(n => ['5','6','7'].includes(n)), color: 'from-indigo-400 to-purple-500' },
              ].map((center, idx) => {
                  return (
                      <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 group">
                          {/* Label and Dominant num */}
                          <div className="flex justify-between w-full md:w-64 shrink-0">
                             <span className="font-bold tracking-widest uppercase text-slate-600 text-sm">{center.label}</span>
                             <span className="font-black text-xl tracking-tighter text-slate-800 hidden md:block">{center.dominant}</span>
                          </div>
                          
                          {/* Bar */}
                          <div className="w-full flex-1 h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${center.score}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full bg-linear-to-r ${center.color}`}
                              />
                          </div>
                          
                          <div className="hidden md:flex flex-row gap-4 items-center">
                              <div className="w-16 text-right font-bold text-slate-800">
                                  {center.score}%
                              </div>
                              <span className={`text-xs font-bold tracking-widest uppercase w-24 text-right text-transparent`}>
                                  Score
                              </span>
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
