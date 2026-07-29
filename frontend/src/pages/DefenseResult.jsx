import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Activity, Target, Flame, AlertTriangle, 
  Zap, ShieldAlert, EyeOff, BrainCircuit, CheckCircle2, RefreshCw, Scale, Sparkles, Compass
} from 'lucide-react';
import { defenseStatuses } from '../utils/defenseLogic';

function formatMarkdown(text) {
  if (!text) return "";
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return <strong key={idx} className="text-slate-900 font-extrabold">{part}</strong>;
    }
    return part;
  });
}

function ResultBar({ label, value, color, isPrimary }) {
  const displayVal = Math.min(Math.max(value || 0, 0), 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-bold text-slate-700">
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 font-extrabold border border-sky-100">Dominant</span>}
        </span>
        <span className="font-mono text-slate-900 font-bold bg-slate-100 px-2.5 py-0.5 rounded-md text-xs">{displayVal}%</span>
      </div>
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
        <Motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${displayVal}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function DefenseResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const resultData = useMemo(() => {
    let stateData = location.state?.resultData;

    if (!stateData) {
      const saved = localStorage.getItem('omnitype_defense');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && (parsed.info || parsed.statusKey)) {
            stateData = parsed;
          }
        } catch (e) {}
      }
    }

    if (!stateData && type) {
      const statusKey = type.toUpperCase();
      if (defenseStatuses[statusKey]) {
        stateData = {
          statusKey,
          fullTitle: type,
          info: defenseStatuses[statusKey],
          breakdown: { logicPercent: 85, projectionPercent: 40, avoidancePercent: 30 }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_defense', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/defense" replace />;
  }

  const dominantKey = (resultData.statusKey || type || 'LOGIC').toUpperCase();
  const baseInfo = defenseStatuses[dominantKey] || defenseStatuses['LOGIC'];

  const info = {
    ...baseInfo,
    ...(resultData.info || {}),
    coreDesire: resultData.info?.coreDesire || baseInfo.coreDesire,
    coreFear: resultData.info?.coreFear || baseInfo.coreFear,
    pros: (resultData.info?.pros && resultData.info.pros.length > 0) ? resultData.info.pros : baseInfo.pros,
    cons: (resultData.info?.cons && resultData.info.cons.length > 0) ? resultData.info.cons : baseInfo.cons,
    coreTrigger: resultData.info?.coreTrigger || baseInfo.coreTrigger,
    subconsciousGoal: resultData.info?.subconsciousGoal || baseInfo.subconsciousGoal,
    backfireEffect: resultData.info?.backfireEffect || baseInfo.backfireEffect,
    cognitiveLoad: resultData.info?.cognitiveLoad || baseInfo.cognitiveLoad,
    nervousSystemStatus: resultData.info?.nervousSystemStatus || baseInfo.nervousSystemStatus,
    growthPathway: resultData.info?.growthPathway || baseInfo.growthPathway
  };

  const breakdown = resultData.breakdown || { logicPercent: 85, projectionPercent: 40, avoidancePercent: 30 };
  const primaryColor = info.color || 'from-sky-500 to-blue-600';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'spectrum', label: 'Defense Spectrum' },
    { id: 'neural', label: 'Neural & Nervous System' },
    { id: 'pathway', label: 'Growth & Somatic Protocol' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-sky-200">
      
      {/* Decorative Ambient Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${info.bgLight || 'bg-sky-50'} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${info.bgLight || 'bg-sky-50'} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-32 pb-32 relative z-10">
        
        {/* Top Navigation - Return to Home */}
        <div className="flex justify-between items-center mb-10">
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </div>
            <span>Home</span>
          </button>
        </div>

        {/* Tab Selector Buttons (Text-Only) */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 border-b border-slate-200/60 pb-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Panel */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* ---------------------------------------------------- */}
            {/* TAB 1: OVERVIEW */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                
                {/* 1. Side-by-Side Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Primary Archetype (Dominant 8 Cols) */}
                  <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${primaryColor} opacity-90`} />
                    
                    <div>
                      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 text-slate-900 tracking-tight leading-none">
                        {info.name}
                      </h1>
                      
                      <p className="text-slate-600 max-w-4xl leading-relaxed font-medium text-base sm:text-lg md:text-xl mb-6">
                        {info.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider border border-slate-200/60">
                          {info.subName}
                        </span>
                        <span className="px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 font-extrabold text-xs uppercase tracking-wider border border-sky-100">
                          Psychological Shield
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Standardized 2nd Box (4 Cols - Prominent & Centered - Icon-Free) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 z-10 drop-shadow-sm pb-1 leading-tight">
                       {info.subName}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Primary Defense Mechanism</span>
                  </div>

                </div>

                {/* 2. Dedicated Core Motivations Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Shield className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What Drives You (Underlying Desire)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{info.coreDesire}</p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Underlying Fear)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{info.coreFear}</p>
                  </div>
                </div>

                {/* 3. Defense Matrix Summary (Standardized Progress Bars) */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Defense System Load</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Dominant coping mechanisms deployed under psychological pressure.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <ResultBar 
                      label="Intellectualization" 
                      value={breakdown.logicPercent} 
                      color={`bg-linear-to-r ${primaryColor}`} 
                      isPrimary={dominantKey === 'LOGIC'} 
                    />
                    <ResultBar 
                      label="Projection" 
                      value={breakdown.projectionPercent} 
                      color={`bg-linear-to-r ${primaryColor}`} 
                      isPrimary={dominantKey === 'DEFLECTOR'} 
                    />
                    <ResultBar 
                      label="Avoidance" 
                      value={breakdown.avoidancePercent} 
                      color={`bg-linear-to-r ${primaryColor}`} 
                      isPrimary={dominantKey === 'GHOST'} 
                    />
                    <ResultBar 
                      label="Sublimation" 
                      value={breakdown.sublimationPercent || (dominantKey === 'SUBLIMATOR' ? 85 : 15)} 
                      color={`bg-linear-to-r ${primaryColor}`} 
                      isPrimary={dominantKey === 'SUBLIMATOR'} 
                    />
                  </div>
                </div>

                {/* 4. Strategic Assets & System Vulnerabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Functional Strengths */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Functional Strengths (Pros)</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.pros?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Friction Points */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">The Friction Points (Cons)</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.cons?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: DEFENSE SPECTRUM */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'spectrum' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Full Defense Spectrum & Mechanisms</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Detailed breakdown across all 4 psychological defense archetypes, ranging from primitive projection to mature sublimation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.keys(defenseStatuses).map((key) => {
                    const status = defenseStatuses[key];
                    const isPrimary = key === dominantKey;
                    return (
                      <div 
                        key={key}
                        className={`bg-white border shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4 relative overflow-hidden transition-all ${
                          isPrimary ? 'border-sky-300 ring-2 ring-sky-100' : 'border-slate-100'
                        }`}
                      >
                        <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${status.color}`} />
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                          <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{status.subName}</span>
                            <h4 className="text-2xl font-black text-slate-900">{status.name}</h4>
                          </div>
                          {isPrimary && (
                            <span className="text-[0.65rem] font-black uppercase tracking-wider px-3 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-200">
                              Your Primary
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          {status.description}
                        </p>
                        <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                          <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">Trigger: {status.coreTrigger}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: NEURAL & NERVOUS SYSTEM */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'neural' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Neural & Nervous System Dynamics</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Physiological baselines, background cognitive processing costs, and subconscious protective goals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Core Trigger */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <h4 className="text-xl font-black text-slate-900">The Core Trigger</h4>
                    </div>
                    <p className="text-slate-700 text-base font-medium leading-relaxed">{info.coreTrigger}</p>
                  </div>

                  {/* Subconscious Goal */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Target className="w-5 h-5 text-sky-500" />
                      <h4 className="text-xl font-black text-slate-900">Subconscious Protection Goal</h4>
                    </div>
                    <p className="text-slate-700 text-base font-medium leading-relaxed">{info.subconsciousGoal}</p>
                  </div>

                  {/* Cognitive Load */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <BrainCircuit className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Systemic Cognitive Load</h4>
                    </div>
                    <p className="text-slate-700 text-base font-medium leading-relaxed">{info.cognitiveLoad}</p>
                  </div>

                  {/* Nervous System Status */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xl font-black text-slate-900">Nervous System State</h4>
                    </div>
                    <p className="text-slate-700 text-base font-medium leading-relaxed">{info.nervousSystemStatus}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: GROWTH & SOMATIC PROTOCOL */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'pathway' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Growth Pathway & Somatic Integration</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    De-escalating defense mechanisms, addressing the backfire effect, and shifting toward mature sublimation.
                  </p>
                </div>

                {/* Backfire Effect Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                    <h4 className="text-xl font-black text-slate-900">The Backfire Effect</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-relaxed">
                    {info.backfireEffect}
                  </p>
                </div>

                {/* Growth Pathway Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Zap className="w-5 h-5 text-emerald-500" />
                    <h4 className="text-xl font-black text-slate-900">Targeted Growth Pathway</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-relaxed italic">
                    {info.growthPathway}
                  </p>
                </div>

                {/* Somatic Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-sky-400" />
                    <h4 className="text-2xl font-black">Somatic De-escalation Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    Defense mechanisms are not moral failings; they are intelligent survival subroutines created by your nervous system to protect you from overwhelming emotional threat. Real growth comes not from forcefully destroying your defenses, but from cultivating enough somatic safety that your brain no longer needs to hide.
                  </p>
                </div>
              </div>
            )}
          </Motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
