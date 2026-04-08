import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield, Heart, Activity, Zap, AlertTriangle, Target, LifeBuoy, Coffee, ShieldAlert, Anchor, Compass, Milestone, Wind } from 'lucide-react';
import { suicideStatuses } from '../utils/suicideLogic';

export default function SuicideResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  let resultData = location.state?.resultData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (!resultData && type) {
    const statusKey = type.includes('urgent') ? 'URGENT' : type.includes('concern') ? 'CONCERN' : type.includes('weary') ? 'WEARY' : 'SECURE';
    if (suicideStatuses[statusKey]) {
        resultData = {
           statusKey,
           fullTitle: type,
           info: suicideStatuses[statusKey],
           breakdown: { hopePersistence: 50, mentalFatigue: 50, safetyReflex: 50 }
        };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/suicide" replace />;
  }

  const { info, breakdown } = resultData;
  const isUrgent = resultData.statusKey === 'URGENT' || resultData.statusKey === 'CONCERN';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden flex flex-col items-center selection:bg-slate-100">
      
      {/* Absolute Minimalist Architecture Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-240 h-240 bg-slate-100/50 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-160 h-160 bg-slate-50/50 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-4xl mx-auto px-6 pt-32 pb-48 relative z-10 flex flex-col items-center"
      >
        
        {/* Absolute Minimal Navigation */}
        <motion.div variants={itemVariants} className="w-full flex justify-start mb-40">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-slate-300 font-bold text-xs uppercase tracking-[0.3em] hover:text-slate-900 transition-all group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Core</span>
          </button>
        </motion.div>

        {/* Minimal Hero Header */}
        <motion.header variants={itemVariants} className="text-center mb-48 flex flex-col items-center">
            <div className="w-12 h-1 bg-slate-100 mb-12 rounded-full" />
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-tight mb-8">
                {info.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-medium tracking-wide leading-relaxed">
                {info.description}
            </p>
        </motion.header>

        {/* The Resilience Pillar (Vertical Metric Component) */}
        <motion.section variants={itemVariants} className="w-full max-w-lg mx-auto flex flex-col items-center mb-64 relative">
            <div className="absolute -top-20 text-[0.65rem] font-bold tracking-[0.5em] uppercase text-slate-300">The Resilience Pillar</div>
            
            <div className="w-2 md:w-3 h-160 bg-slate-50 rounded-full relative overflow-hidden flex flex-col justify-end shadow-inner">
                {/* 3 Pillar Layers */}
                <PillarSegment 
                    label="Safety" 
                    value={breakdown.safetyReflex} 
                    color="bg-slate-800" 
                    icon={Shield} 
                    delay={0.6}
                    index={0}
                />
                <PillarSegment 
                    label="Hope" 
                    value={breakdown.hopePersistence} 
                    color="bg-slate-500" 
                    icon={Heart} 
                    delay={0.8}
                    index={1}
                />
                <PillarSegment 
                    label="Endurance" 
                    value={breakdown.mentalFatigue} 
                    color="bg-slate-300" 
                    icon={Anchor} 
                    delay={1.0}
                    index={2}
                />
            </div>
            
            {/* Visual Markers */}
            <div className="mt-12 flex flex-col gap-8 w-full">
                <PillarLabel icon={Shield} label="External Safety Reflex" value={breakdown.safetyReflex} />
                <PillarLabel icon={Heart} label="Internal Hope Persistence" value={breakdown.hopePersistence} />
                <PillarLabel icon={Anchor} label="Metabolic Mental Fatigue" value={breakdown.mentalFatigue} />
            </div>
        </motion.section>

        {/* Solidarity Panels (Clean, Architectural Cards) */}
        <div className="w-full space-y-8 mb-48">
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Panel 
                    title="Deep Desire" 
                    content={info.coreDesire} 
                    icon={Target} 
                />
                <Panel 
                    title="Current Weight" 
                    content={info.coreFear} 
                    icon={Activity} 
                />
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-100 p-12 md:p-20 rounded-[3rem] group hover:bg-white transition-colors duration-700">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    <div className="flex-1">
                        <h4 className="flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-slate-300 mb-8 pb-4 border-b border-slate-200 w-fit">
                            <Compass className="w-4 h-4" /> Stability Factors
                        </h4>
                        <ul className="space-y-4">
                            {info.pros?.map((item, i) => (
                                <li key={i} className="flex gap-4 items-center">
                                    <div className="w-1 h-1 bg-slate-400 rotate-45" />
                                    <p className="text-slate-600 font-medium text-[1.1rem] tracking-wide">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h4 className="flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-slate-300 mb-8 pb-4 border-b border-slate-200 w-fit">
                            <Wind className="w-4 h-4" /> Complexity Points
                        </h4>
                        <ul className="space-y-4">
                            {info.cons?.map((item, i) => (
                                <li key={i} className="flex gap-4 items-center opacity-60">
                                    <div className="w-1 h-1 bg-slate-200 rotate-45" />
                                    <p className="text-slate-400 font-medium text-[1.1rem] tracking-wide">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* The Solid Anchor (Crisis Support Section) */}
        {isUrgent && (
            <motion.section variants={itemVariants} className="w-full">
                <div className="w-full p-16 md:p-24 bg-slate-900 rounded-[4rem] text-white flex flex-col items-center text-center gap-12 relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 bg-linear-to-b from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="flex flex-col items-center gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 mb-2">
                            <LifeBuoy className="w-8 h-8 animate-[pulse_4s_infinite]" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight max-w-2xl">
                            Existence is a shared labor.
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed mb-6">
                            You are carrying more than any one person should ever be expected to hold. This state is a signal to share the weight with a safe, professional anchor.
                        </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
                        <button 
                            onClick={() => window.open('https://www.google.com/search?q=crisis+helpline', '_blank')}
                            className="px-12 py-5 bg-white text-slate-900 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl hover:bg-slate-50"
                        >
                            Connect to Safety Now
                        </button>
                        <button 
                             onClick={() => navigate('/')}
                             className="px-12 py-5 bg-white/5 border border-white/10 text-white/70 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </motion.section>
        )}

      </motion.div>
    </div>
  );
}

function PillarSegment({ value, color, delay }) {
    return (
        <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${value / 3}%` }}
            transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full ${color} relative flex items-center justify-center`}
        >
            <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        </motion.div>
    );
}

function PillarLabel({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-[0.7rem] font-bold tracking-widest uppercase text-slate-400">{label}</span>
            </div>
            <span className="text-2xl font-black text-slate-900 tabular-nums">{value}%</span>
        </div>
    );
}

function Panel({ title, content, icon: Icon }) {
    return (
        <div className="flex-1 bg-white border border-slate-100 p-12 rounded-[3.1rem] hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-700">
            <h4 className="flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-slate-300 mb-8 border-b border-slate-50 pb-4 w-fit">
                <Icon className="w-4 h-4" /> {title}
            </h4>
            <p className="text-slate-800 font-bold leading-tight text-3xl tracking-tight">{content}</p>
        </div>
    );
}
