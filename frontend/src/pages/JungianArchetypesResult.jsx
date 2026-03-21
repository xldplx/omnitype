import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Diamond, PackageOpen, LayoutGrid, Users, Link as LinkIcon, AlertTriangle, EyeOff } from 'lucide-react';
import { jungianArchetypesMap } from '../utils/jungianArchetypesLogic';

export default function JungianArchetypesResult() {
  const { type } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  // We passed the full result object through router state
  let resultData = location.state?.resultData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // If accessed directly via URL (no state), reconstruct resultData from the URL param
  if (!resultData && type) {
    let foundTypeNum = null;
    for (const [num, obj] of Object.entries(jungianArchetypesMap)) {
        if (obj.id === type) {
            foundTypeNum = parseInt(num);
            break;
        }
    }

    if (foundTypeNum) {
        // Build a simulated breakdown
        const breakdown = {};
        const scores = {};
        for(let i=1; i<=12; i++) {
            if (i === foundTypeNum) {
                breakdown[i] = 100;
                scores[i] = 21;
            } else {
                breakdown[i] = Math.floor(Math.random() * 50) + 10;
                scores[i] = Math.floor(breakdown[i] * 0.21);
            }
        }

        // Dummy stacking simulation finding second highest
        let secNum = foundTypeNum === 1 ? 2 : 1;

        resultData = {
           primaryInfo: jungianArchetypesMap[foundTypeNum],
           secondaryInfo: jungianArchetypesMap[secNum],
           breakdown,
           scores
        };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/jungian-archetypes" replace />;
  }

  const { primaryInfo, secondaryInfo, breakdown } = resultData;

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
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-sky-200">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[12vw] tracking-tighter leading-none text-slate-800 text-center uppercase whitespace-pre-wrap">
          {primaryInfo.name}
        </span>
      </motion.div>

      {/* Decorative Modern Background Gradients */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${primaryInfo.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${primaryInfo.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
            className={`flex items-center gap-2 text-slate-400 font-semibold text-sm uppercase tracking-widest hover:text-slate-900 transition-colors group`}
          >
            <div className={`w-8 h-8 rounded-full ${primaryInfo.bgLight} border ${primaryInfo.borderLight} flex items-center justify-center group-hover:bg-white transition-colors`}>
              <ChevronLeft className={`w-4 h-4 text-slate-600`} />
            </div>
            <span>Home</span>
          </button>
        </motion.div>

        {/* Hero Dashboard Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Title Card */}
          <div className="lg:col-span-8 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${primaryInfo.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h3 className={`text-xs font-bold tracking-[0.4em] uppercase mb-6 text-slate-500 flex items-center gap-3`}>
              <Diamond className="w-4 h-4 text-sky-400" />
              Primary Archetype
            </h3>
            
            <h1 className={`text-5xl md:text-6xl lg:text-[5.5rem] font-bold mb-6 text-slate-900 tracking-tight leading-none bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2`}>
              {primaryInfo.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-normal mt-2">
              {primaryInfo.description}
            </p>
          </div>

          {/* Secondary Archetype Match */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${primaryInfo.bgLight} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h2 className={`text-[clamp(2.5rem,4vw,4rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${primaryInfo.color} z-10 relative drop-shadow-sm pb-1 uppercase text-center`}>
               {secondaryInfo.shortName}
             </h2>
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-slate-600 mt-4 z-10 whitespace-nowrap text-center">Secondary Layer</span>
          </div>
        </motion.div>

        {/* Core Motivations Layer */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <PackageOpen className={`w-4 h-4 text-emerald-400`} />
                Unconscious Desire
                </h4>
                <p className="text-slate-700 font-bold leading-relaxed text-2xl md:text-3xl">{primaryInfo.coreDesire}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <AlertTriangle className={`w-4 h-4 text-rose-400`} />
                Unconscious Fear
                </h4>
                <p className="text-slate-700 font-bold leading-relaxed text-2xl md:text-3xl">{primaryInfo.coreFear}</p>
            </div>
        </motion.div>

        {/* Traits Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Diamond className="w-5 h-5 text-indigo-400" />
              Manifest Strengths
            </h4>
            <ul className="space-y-6">
              {primaryInfo.strengths?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start">
                  <div className={`mt-2 w-2 h-2 rounded-full bg-linear-to-r ${primaryInfo.color} shrink-0`} />
                  <p className="text-slate-600 leading-relaxed text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Shadow Elements
            </h4>
            <ul className="space-y-6">
              {primaryInfo.weaknesses?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start">
                  <div className={`mt-2 w-2 h-2 rounded-full bg-slate-300 shrink-0`} />
                  <p className="text-slate-600 leading-relaxed text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Application Details */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-1 transition-transform duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <LinkIcon className="w-5 h-5 text-rose-400" />
              Interpersonal Dynamics
            </h4>
            <p className="text-slate-600 leading-loose text-[1.1rem]">
              {primaryInfo.relationshipDynamics}
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-1 transition-transform duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <Users className="w-5 h-5 text-emerald-400" />
              Societal Role
            </h4>
            <p className="text-slate-600 leading-loose text-[1.1rem]">
              {primaryInfo.workplaceBehavior}
            </p>
          </div>
        </motion.div>

        {/* Global Score Breakdown */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 mb-8">
          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-slate-400" />
                <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">Unconscious Footprint</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((t) => {
                  const scoreLine = breakdown[t] || 0;
                  const isPrimary = t === resultData.primaryInfo.id ? true : false; 
                  // correction: wait, t is int 1-12, resultData.primaryInfo is the object. Let's find numerical id.
                  let numericalId = t;
                  let isMatch = false;
                  for (let key in jungianArchetypesMap) {
                      if (jungianArchetypesMap[key].id === resultData.primaryInfo.id && parseInt(key) === t) {
                          isMatch = true;
                      }
                  }

                  const styleInfo = jungianArchetypesMap[t];
                  
                  let barColor = "bg-slate-200";
                  let textColor = "text-slate-400";
                  
                  if (isMatch) {
                      barColor = `bg-linear-to-r ${primaryInfo.color}`;
                      textColor = "text-slate-800";
                  }

                  return (
                      <div key={t} className="flex items-center gap-4 group">
                          <span className={`w-28 md:w-32 font-bold text-sm tracking-wide ${textColor}`}>
                              {styleInfo.shortName}
                          </span>
                          <div className="flex-1 h-3 md:h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${scoreLine}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${barColor}`}
                              />
                          </div>
                           <div className={`w-8 md:w-12 text-right font-bold text-sm ${textColor}`}>
                              {scoreLine}%
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
