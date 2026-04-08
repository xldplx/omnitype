import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, Activity, Sparkles, Flame, Shield, Target, Moon, Briefcase, MessageSquare, Users, Zap, AlertTriangle, LifeBuoy } from 'lucide-react';
import { depressionStatuses } from '../utils/depressionLogic';

export default function DepressionResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  
  let resultData = location.state?.resultData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (!resultData && type) {
    const statusKey = type.toUpperCase();
    if (depressionStatuses[statusKey]) {
        resultData = {
           statusKey,
           fullTitle: type,
           info: depressionStatuses[statusKey],
           breakdown: { joyPercent: 50, energyPercent: 50, worthPercent: 50 }
        };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/depression" replace />;
  }

  const { info, breakdown } = resultData;
  const isHighRisk = resultData.statusKey === 'HIGH';

  // Parallax for the background aura
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-blue-100">
      
      {/* Immersive Fluid Background Blobs */}
      <motion.div 
        style={{ y: y1 }}
        className={`fixed top-[-20vh] left-[-10vw] w-[80vw] h-[80vw] ${info.bgLight} rounded-full blur-[150px] pointer-events-none opacity-40 z-0`} 
      />
      <motion.div 
        style={{ y: y2 }}
        className={`fixed bottom-[-20vh] right-[-10vw] w-[60vw] h-[60vw] ${info.bgLight} rounded-full blur-[150px] pointer-events-none opacity-40 z-0`} 
      />

      <div className="w-full max-w-4xl mx-auto px-6 pt-32 pb-32 relative z-10 flex flex-col items-center">
        
        {/* Superior Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex justify-start mb-24"
        >
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

        {/* Narrative Hero Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-32 flex flex-col items-center"
        >
          <div className="flex items-center gap-3 text-blue-500 font-bold text-xs uppercase tracking-[0.4em] mb-10">
            <Activity className="w-4 h-4" />
            <span>Emotional Narrative</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-tight mb-12">
            The <span className={`text-transparent bg-clip-text bg-linear-to-br ${info.color}`}>{info.name}</span> Profile
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-medium">
            "{info.description}"
          </p>
        </motion.header>

        {/* The Liquid Aura Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-square md:aspect-video flex flex-col items-center justify-center mb-48"
        >
          {/* Animated Glow Rings */}
          <div className={`absolute inset-0 bg-linear-to-br ${info.color} opacity-5 blur-[100px] animate-pulse rounded-full`} />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className={`text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${info.color} mb-4`}>
                {info.subName.split(' ')[1] || info.subName}
            </h2>
            <span className="text-xs font-bold tracking-[0.5em] uppercase text-slate-400">Current Aura</span>
          </div>
          
          {/* Metric "Satellites" */}
          <AuraMetric label="Joy" value={breakdown.joyPercent} color={info.color} position="top-0 left-0" icon={Sparkles} />
          <AuraMetric label="Energy" value={breakdown.energyPercent} color={info.color} position="top-0 right-0" icon={Flame} />
          <AuraMetric label="Security" value={breakdown.worthPercent} color={info.color} position="bottom-0 left-1/2 -translate-x-1/2 md:bottom-20" icon={Shield} />
        </motion.div>

        {/* The Vertical Deep Dive (Narrative Flow) */}
        <div className="w-full flex flex-col gap-32 mb-32">
            
            {/* Core Motivations Section */}
            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-2xl mx-auto text-center"
            >
                <div className="flex flex-col items-center gap-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-[0.65rem] font-bold tracking-[0.4em] uppercase text-slate-400">Deep Desire</span>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight">{info.coreDesire}</h3>
                    </div>
                    <div className="w-0.5 h-20 bg-linear-to-b from-blue-500/20 to-transparent" />
                    <div className="flex flex-col gap-6">
                        <span className="text-[0.65rem] font-bold tracking-[0.4em] uppercase text-slate-400">Core Weight</span>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight leading-tight">{info.coreFear}</h3>
                    </div>
                </div>
            </motion.section>

            {/* Strengths & Challenges (Vertical Layout) */}
            <section className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <VerticalList 
                        title="The Resonance (Strengths)" 
                        items={info.pros} 
                        icon={Zap} 
                        color="from-blue-500 to-indigo-600" 
                    />
                    <VerticalList 
                        title="The Resistance (Struggles)" 
                        items={info.cons} 
                        icon={AlertTriangle} 
                        color="from-slate-600 to-slate-900" 
                    />
                </div>
            </section>

            {/* Identity Banner */}
            <motion.section 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full p-16 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden group"
            >
                <div className={`absolute top-0 right-0 w-160 h-160 bg-linear-to-bl ${info.color} opacity-10 blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:scale-110`} />
                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-sky-400/70">Relatable MBTI Profiles</span>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {info.mbti?.map(mbti => (
                                <span key={mbti} className="text-4xl md:text-6xl font-black tracking-tighter hover:text-sky-400 transition-colors cursor-default">{mbti}</span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full pt-12 border-t border-white/10">
                        <div className="flex flex-col gap-4">
                            <h4 className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-emerald-400/70">
                                <Briefcase className="w-4 h-4" /> Professional Pace
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {info.careers?.map(career => (
                                    <span key={career} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-wide">{career}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-amber-400/70">
                                <MessageSquare className="w-4 h-4" /> Interaction Tone
                            </h4>
                            <p className="text-white/70 text-lg leading-relaxed">{info.socialStyle}</p>
                        </div>
                    </div>
                </div>
            </motion.section>

        </div>

        {/* Crisis Resource - The Fluid Tide Finish */}
        {isHighRisk && (
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full p-16 rounded-[4rem] bg-linear-to-b from-blue-900 to-indigo-950 text-white text-center flex flex-col items-center gap-10"
            >
                <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center shadow-inner">
                    <LifeBuoy className="w-8 h-8 text-blue-300 animate-[spin_10s_linear_infinite]" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">You aren't alone in this.</h2>
                <p className="text-blue-200/60 text-[1.1rem] max-w-2xl leading-relaxed">
                  Navigating high-intensity depression is exhausting. Reaching out to a professional or a safe person can help lighten the anchor you are carrying.
                </p>
                <button 
                    onClick={() => window.open('https://www.google.com/search?q=mental+health+helpline', '_blank')}
                    className={`px-12 py-5 bg-linear-to-r ${info.color} rounded-full text-white text-[0.9rem] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl scale-110 active:scale-95`}
                >
                    Find Support Now
                </button>
            </motion.div>
        )}

      </div>
    </div>
  );
}

function AuraMetric({ label, value, color, position, icon: Icon }) {
    return (
        <div className={`absolute ${position} flex flex-col items-center gap-4 transition-transform hover:scale-110 duration-500`}>
            <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/40 backdrop-blur-3xl border border-white/50 flex flex-col items-center justify-center shadow-2xl`}>
                <Icon className="w-6 h-6 text-slate-400 mb-2 opacity-50" />
                <span className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-b ${color}`}>{value}%</span>
            </div>
            <span className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-slate-400">{label}</span>
        </div>
    );
}

function VerticalList({ title, items, icon: Icon, color }) {
    return (
        <div className="bg-white/60 backdrop-blur-2xl border border-white/80 p-10 md:p-14 rounded-[3.5rem] shadow-sm hover:shadow-md transition-shadow">
            <h4 className="flex items-center gap-4 text-[0.7rem] font-bold tracking-[0.3em] uppercase text-slate-400 mb-12 border-b border-slate-100 pb-6">
                <Icon className={`w-5 h-5 text-indigo-400`} />
                {title}
            </h4>
            <ul className="flex flex-col gap-6">
                {items?.map((item, idx) => (
                    <li key={idx} className="group flex gap-5 items-start">
                        <div className={`mt-2 w-1.5 h-1.5 rounded-full bg-linear-to-br ${color} transition-transform group-hover:scale-150`} />
                        <p className="text-slate-600 font-medium text-lg leading-relaxed">{item}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
