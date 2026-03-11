import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, PackageOpen, LayoutGrid, Users, Link as LinkIcon, AlertTriangle, EyeOff } from 'lucide-react';
import { instinctualVariantsTypes } from '../utils/instinctualVariantsLogic';

export default function InstinctualVariantsResult() {
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
    for (const [num, obj] of Object.entries(instinctualVariantsTypes)) {
        if (obj.id === type) {
            foundTypeNum = parseInt(num);
            break;
        }
    }

    if (foundTypeNum) {
        // Build a simulated breakdown
        const breakdown = {};
        for(let i=1; i<=3; i++) {
            if (i === foundTypeNum) breakdown[i] = 100;
            else breakdown[i] = Math.floor(Math.random() * 50) + 10;
        }

        // Dummy stacking simulation
        let secondary = foundTypeNum === 1 ? 2 : 1;
        let blind = 6 - foundTypeNum - secondary;

        resultData = {
           type: foundTypeNum,
           fullTitle: instinctualVariantsTypes[foundTypeNum].shortName,
           info: instinctualVariantsTypes[foundTypeNum],
           stacking: `${instinctualVariantsTypes[foundTypeNum].shortName.substring(0,2)}/${instinctualVariantsTypes[secondary].shortName.substring(0,2)}`,
           blindspot: instinctualVariantsTypes[blind],
           breakdown
        };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/instinctual-variants" replace />;
  }

  const { info, breakdown, stacking, blindspot } = resultData;

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
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-emerald-200">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[12vw] tracking-tighter leading-none text-slate-800 text-center uppercase whitespace-pre-wrap">
          {info.name}
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
            className={`flex items-center gap-2 text-slate-400 font-semibold text-sm uppercase tracking-widest hover:text-slate-900 transition-colors group`}
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
              <Zap className="w-4 h-4 text-emerald-400" />
              Primary Instinct
            </h3>
            
            <h1 className={`text-5xl md:text-6xl lg:text-[5.5rem] font-bold mb-6 text-slate-900 tracking-tight leading-none bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2`}>
              {info.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-normal mt-2">
              {info.description}
            </p>
          </div>

          {/* Stacking Badge Card */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${info.bgLight} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h2 className={`text-[clamp(3rem,6vw,6rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${info.color} z-10 relative drop-shadow-sm pb-1 uppercase`}>
               {stacking}
             </h2>
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-slate-600 mt-4 z-10 whitespace-nowrap">Your Stacking</span>
          </div>
        </motion.div>

        {/* Blindspot Feature Layer */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-slate-200/50 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8 mb-8 overflow-hidden relative group">
             <div className="absolute inset-0 bg-slate-900 opacity-5 pointer-events-none" />
             <div className="md:w-1/3 flex flex-col border-r border-slate-200/60 pr-8">
                 <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-3 mb-2">
                    <EyeOff className="w-4 h-4 text-slate-600" />
                    Instinctual Blindspot
                 </h4>
                 <h2 className="text-3xl font-black text-slate-800">{blindspot.shortName}</h2>
             </div>
             <div className="md:w-2/3">
                 <p className="text-slate-600 text-[1.1rem] leading-relaxed">
                     Because {blindspot.name} is your lowest variant, you naturally ignore this entire sphere of human experience until it becomes completely necessary. You may actively resent or mock people who prioritize {blindspot.coreDesire.toLowerCase()} because you subconsciously do not want to be burdened by it. Focus on bringing this out of the shadow to balance out your intense primary drive.
                 </p>
             </div>
        </motion.div>

        {/* Core Motivations Layer */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <PackageOpen className={`w-4 h-4 text-emerald-400`} />
                Absolute Need
                </h4>
                <p className="text-slate-700 font-bold leading-relaxed text-2xl md:text-3xl">{info.coreDesire}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <AlertTriangle className={`w-4 h-4 text-rose-400`} />
                Absolute Panic
                </h4>
                <p className="text-slate-700 font-bold leading-relaxed text-2xl md:text-3xl">{info.coreFear}</p>
            </div>
        </motion.div>

        {/* Traits Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Zap className="w-5 h-5 text-indigo-400" />
              Empowered State
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
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Unhealthy State
            </h4>
            <ul className="space-y-6">
              {info.weaknesses?.map((item, idx) => (
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
              Interpersonal Filtering
            </h4>
            <p className="text-slate-600 leading-loose text-[1.1rem]">
              {info.relationshipDynamics}
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-1 transition-transform duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <Users className="w-5 h-5 text-emerald-400" />
              Societal Role
            </h4>
            <p className="text-slate-600 leading-loose text-[1.1rem]">
              {info.workplaceBehavior}
            </p>
          </div>
        </motion.div>

        {/* Global Score Breakdown */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16">
          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-slate-400" />
                <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">Instinctual Distribution</h4>
            </div>
          </div>

          <div className="space-y-6">
              {[1, 2, 3].map((t) => {
                  const scoreLine = breakdown[t] || 0;
                  const isPrimary = t === resultData.type;
                  const styleInfo = instinctualVariantsTypes[t];
                  
                  let barColor = "bg-slate-200";
                  let textColor = "text-slate-400";
                  
                  if (isPrimary) {
                      barColor = `bg-linear-to-r ${info.color}`;
                      textColor = "text-slate-800";
                  }

                  return (
                      <div key={t} className="flex items-center gap-4 md:gap-6 group">
                          <span className={`w-32 md:w-40 font-bold text-sm tracking-wide ${textColor}`}>{styleInfo.shortName}</span>
                          <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner flex md:block">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${scoreLine}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${barColor}`}
                              />
                          </div>
                           <div className={`w-12 md:w-16 text-right font-bold ${textColor}`}>
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
