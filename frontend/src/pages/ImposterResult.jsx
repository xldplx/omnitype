import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield, Heart, Activity, Target, Flame, AlertTriangle, MessageSquare, Zap, Speech, Scale, UserMinus, Search } from 'lucide-react';
import { imposterStatuses } from '../utils/imposterLogic';

export default function ImposterResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // We passed the full result object through router state
  let resultData = location.state?.resultData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // If accessed directly via URL, reconstruct resultData
  if (!resultData && type) {
    const statusKey = type.toUpperCase();
    if (imposterStatuses[statusKey]) {
        resultData = {
           statusKey,
           fullTitle: type,
           info: imposterStatuses[statusKey],
           breakdown: { perfectionistPercent: 85, expertPercent: 40, soloistPercent: 30 } // Simulated
        };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/imposter" replace />;
  }

  const { info, breakdown } = resultData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-fuchsia-200 uppercase-none">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[20vw] tracking-tighter leading-none text-slate-800">
          IMPOSTER
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
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </div>
            <span>Home</span>
          </button>
        </motion.div>

        {/* The Big Reveal Hero Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Title Card */}
          <div className="lg:col-span-8 bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_40px_rgb(0,0,0,0.06)] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${info.color} opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <h3 className="text-xs font-bold tracking-[0.4em] uppercase mb-6 text-slate-500 flex items-center gap-3">
              <Speech className="w-4 h-4 text-fuchsia-500" />
              Competency Assessment
            </h3>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-6 text-slate-900 tracking-tighter leading-none bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2">
              {info.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-medium mt-2 lowercase-none">
              {info.description}
            </p>
          </div>

          {/* Persona Card */}
          <div className="lg:col-span-4 bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_40px_rgb(0,0,0,0.06)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group text-center hover:-translate-y-2 transition-transform duration-500">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${info.bgLight} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h2 className={`text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${info.color} z-10 relative leading-tight drop-shadow-sm`}>
               {info.subName}
             </h2>
             <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-slate-600 mt-6 z-10 whitespace-nowrap bg-white/50 px-4 py-2 rounded-full border border-white/80">Imposter Archetype</span>
          </div>
        </motion.div>

        {/* Neural Metrics Breakdown (High-Tech Bar Gauges) */}
        <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_40px_rgb(0,0,0,0.06)] rounded-[2.5rem] p-10 md:p-16 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-slate-100 pb-8 gap-4">
            <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-fuchsia-500" />
                <h4 className="text-sm font-bold tracking-[0.3em] text-slate-500 uppercase">Self-Doubt Vectors</h4>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Syndrome Profile</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
              <MetricGauge label="Perfectionism" value={breakdown.perfectionistPercent} color={info.color} icon={Target} delay={0.2} />
              <MetricGauge label="Knowledge Focus" value={breakdown.expertPercent} color={info.color} icon={Flame} delay={0.4} />
              <MetricGauge label="Independence Need" value={breakdown.soloistPercent} color={info.color} icon={UserMinus} delay={0.6} />
          </div>
        </motion.div>

        {/* NEW: The Internal Critic (Dark Mode Section) */}
        <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.3)] rounded-[2.5rem] p-10 md:p-16 mb-8 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-[40rem] h-[40rem] bg-linear-to-bl ${info.color} rounded-full blur-[120px] opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110`} />
            
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-12 border-b border-white/10 pb-6 relative z-10">
              <Speech className="w-5 h-5 text-fuchsia-400" />
              Deconstructing The Internal Critic
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* Specific Lie */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${info.color} flex items-center justify-center shadow-lg`}>
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-[0.65rem] font-bold tracking-widest text-white/50 uppercase block mb-1">The Subconscious Script</span>
                            <h5 className="text-2xl font-bold text-white tracking-tight leading-none">The Specific Lie</h5>
                        </div>
                    </div>
                    <p className="text-fuchsia-200 text-xl italic leading-relaxed font-semibold pl-16">
                        {info.specificLie}
                    </p>
                </div>

                {/* Trigger Condition */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${info.color} flex items-center justify-center shadow-lg`}>
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-[0.65rem] font-bold tracking-widest text-white/50 uppercase block mb-1">Activation Trigger</span>
                            <h5 className="text-2xl font-bold text-white tracking-tight leading-none">When The Lie Strikes</h5>
                        </div>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium pl-16">
                        {info.triggerCondition}
                    </p>
                </div>

                {/* Objective Evidence */}
                <div className="flex flex-col md:col-span-2 mt-4 bg-white/5 p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                        <Scale className="w-6 h-6 text-emerald-400" />
                        <h5 className="text-xl font-bold text-white tracking-tight">The Objective Reality Check</h5>
                    </div>
                    <div className="pl-10">
                        <p className="text-slate-300 text-[1.05rem] leading-relaxed font-medium">{info.objectiveEvidence}</p>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Core Traits Layer */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14 flex flex-col h-full hover:-translate-y-2 transition-transform duration-500 group">
                <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <Shield className="w-5 h-5 text-emerald-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                Underlying Desire
                </h4>
                <p className="text-slate-800 font-bold leading-relaxed text-2xl md:text-[2rem] tracking-tight">{info.coreDesire}</p>
            </div>

            <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14 flex flex-col h-full hover:-translate-y-2 transition-transform duration-500 group">
                <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <AlertTriangle className="w-5 h-5 text-rose-500 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                Underlying Fear
                </h4>
                <p className="text-slate-800 font-bold leading-relaxed text-2xl md:text-[2rem] tracking-tight">{info.coreFear}</p>
            </div>
        </motion.div>

        {/* Expanded Pros & Cons */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Zap className="w-5 h-5 text-indigo-500" />
              Functional Strengths (Pros)
            </h4>
            <ul className="grid grid-cols-1 gap-5">
              {info.pros?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/50 hover:bg-indigo-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full bg-indigo-400 shrink-0 mt-1.5 shadow-sm`} />
                  <p className="text-slate-700 font-semibold text-[1.1rem] leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              The Friction Points (Cons)
            </h4>
            <ul className="grid grid-cols-1 gap-5">
              {info.cons?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start bg-rose-50/50 p-5 rounded-2xl border border-rose-100/50 hover:bg-rose-50 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-rose-400 shrink-0 mt-1.5 shadow-sm" />
                  <p className="text-slate-700 font-semibold text-[1.1rem] leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

function MetricGauge({ label, value, color, icon: Icon, delay }) {
    return (
        <div className="flex flex-col gap-6 group">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="font-bold text-slate-800 tracking-tight text-lg">{label}</span>
                </div>
                <span className={`font-black text-3xl tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${color}`}>{value}%</span>
            </div>
            
            <div className="relative h-6 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50 p-1">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: delay }}
                    className={`h-full bg-linear-to-r ${color} rounded-full relative overflow-hidden`}
                >
                    {/* Glossy inner shine */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-full" />
                </motion.div>
            </div>
        </div>
    );
}
