import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield, Heart, Activity, Zap, AlertTriangle, Sparkles, Target, Flame, Briefcase, MessageSquare, Users } from 'lucide-react';
import { adhdStatuses } from '../utils/adhdLogic';

export default function AdhdResult() {
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
    if (adhdStatuses[statusKey]) {
        resultData = {
           statusKey,
           fullTitle: type,
           info: adhdStatuses[statusKey],
           breakdown: { inPercent: 50, hyperPercent: 50, impulsePercent: 50 } // Simulated
        };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/adhd" replace />;
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
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-orange-200 uppercase-none">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[40vw] tracking-tighter leading-none text-slate-800">
          ADHD
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
          <div className="lg:col-span-8 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${info.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h3 className="text-xs font-bold tracking-[0.4em] uppercase mb-6 text-slate-500 flex items-center gap-3">
              <Activity className="w-4 h-4 text-orange-400" />
              Cognitive Profile Reveal
            </h3>
            
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold mb-6 text-slate-900 tracking-tighter leading-none bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2">
              {info.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-normal mt-2 lowercase-none">
              {info.description}
            </p>
          </div>

          {/* Persona Card */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group text-center">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${info.bgLight} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h2 className={`text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${info.color} z-10 relative leading-tight`}>
               {info.subName}
             </h2>
             <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-slate-600 mt-6 z-10 whitespace-nowrap">Neural Archetype</span>
          </div>
        </motion.div>

        {/* Neural Metrics Breakdown (3 Bars) */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 mb-8">
          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-slate-400" />
                <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">Neural Activity Metrics</h4>
            </div>
            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-4 py-2 rounded-full uppercase tracking-widest">{info.energy}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
              <MetricItem label="Inattention" value={breakdown.inPercent} color={info.color} icon={Target} />
              <MetricItem label="Hyperactivity" value={breakdown.hyperPercent} color={info.color} icon={Flame} />
              <MetricItem label="Impulse Control" value={breakdown.impulsePercent} color={info.color} icon={Zap} />
          </div>
        </motion.div>

        {/* Core Traits Layer */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 md:p-14 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <Shield className="w-4 h-4 text-emerald-400" />
                Core Desire
                </h4>
                <p className="text-slate-700 font-bold leading-relaxed text-2xl md:text-3xl">{info.coreDesire}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 md:p-14 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                <Heart className="w-4 h-4 text-rose-400" />
                Hidden Fear
                </h4>
                <p className="text-slate-700 font-bold leading-relaxed text-2xl md:text-3xl">{info.coreFear}</p>
            </div>
        </motion.div>

        {/* Professional & Social Discovery */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-1 transition-shadow duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Professional Identity
            </h4>
            <div className="flex flex-wrap gap-3 mb-8">
                {info.careers?.map(career => (
                    <span key={career} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-bold tracking-wide">{career}</span>
                ))}
            </div>
            <p className="text-slate-600 leading-loose text-[1.1rem]">You excel in roles that prioritize dynamic problem-solving over rigid administrative repetition.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-1 transition-shadow duration-500">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              Social Communication Style
            </h4>
            <p className="text-slate-700 font-bold text-xl mb-4">{info.socialStyle}</p>
            <p className="text-slate-600 leading-loose text-[1.1rem]">Your conversational rhythm is distinctive—uncovering this pattern helps you navigate social energy more effectively.</p>
          </div>
        </motion.div>

        {/* MBTI Compatibility Section */}
        <motion.div variants={itemVariants} className="bg-slate-900 border border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-16 mb-8 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-120 h-120 bg-linear-to-bl ${info.color} rounded-full blur-[100px] opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110`} />
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-12 border-b border-white/10 pb-4 relative z-10">
              <Users className="w-5 h-5 text-sky-400" />
              MBTI Profiles Most Likely to share this ADHD Type
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
              {info.mbti?.map((mbti, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                  <span className="text-3xl font-black text-white tracking-tighter leading-none">{mbti}</span>
                </div>
              ))}
            </div>
        </motion.div>

        {/* Expanded Pros & Cons */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Zap className="w-5 h-5 text-amber-400" />
              The Superpowers (Pros)
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {info.pros?.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-center bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100/50">
                  <div className={`w-2 h-2 rounded-full bg-emerald-400 shrink-0`} />
                  <p className="text-slate-700 font-medium text-[1.1rem]">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              The Friction Points (Cons)
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {info.cons?.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-center bg-rose-50/30 p-4 rounded-2xl border border-rose-100/50">
                  <div className="w-2 h-2 rounded-full bg-rose-300 shrink-0" />
                  <p className="text-slate-700 font-medium text-[1.1rem]">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>


      </motion.div>
    </div>
  );
}

function MetricItem({ label, value, color, icon: Icon }) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                        <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="font-bold text-slate-700 tracking-tight">{label}</span>
                </div>
                <span className="font-black text-2xl text-slate-900">{value}%</span>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-linear-to-r ${color}`}
                />
            </div>
        </div>
    );
}
