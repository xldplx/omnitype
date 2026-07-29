import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Activity, Target, Flame, AlertTriangle, 
  Zap, Speech, Scale, UserMinus, Search, CheckCircle2, RefreshCw, Sparkles
} from 'lucide-react';
import { imposterStatuses } from '../utils/imposterLogic';

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
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-fuchsia-500 ring-4 ring-fuchsia-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-fuchsia-50 text-fuchsia-600 font-extrabold border border-fuchsia-100">Dominant</span>}
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

export default function ImposterResult() {
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
      const saved = localStorage.getItem('omnitype_imposter');
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
      if (imposterStatuses[statusKey]) {
        stateData = {
          statusKey,
          fullTitle: type,
          info: imposterStatuses[statusKey],
          breakdown: { perfectionistPercent: 85, expertPercent: 40, soloistPercent: 30 }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_imposter', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/imposter" replace />;
  }

  const dominantKey = (resultData.statusKey || type || 'PERFECTIONIST').toUpperCase();
  const baseInfo = imposterStatuses[dominantKey] || imposterStatuses['PERFECTIONIST'];

  const info = {
    ...baseInfo,
    ...(resultData.info || {}),
    coreDesire: resultData.info?.coreDesire || baseInfo.coreDesire,
    coreFear: resultData.info?.coreFear || baseInfo.coreFear,
    pros: (resultData.info?.pros && resultData.info.pros.length > 0) ? resultData.info.pros : baseInfo.pros,
    cons: (resultData.info?.cons && resultData.info.cons.length > 0) ? resultData.info.cons : baseInfo.cons,
    specificLie: resultData.info?.specificLie || baseInfo.specificLie,
    triggerCondition: resultData.info?.triggerCondition || baseInfo.triggerCondition,
    objectiveEvidence: resultData.info?.objectiveEvidence || baseInfo.objectiveEvidence,
    cognitiveOverhead: resultData.info?.cognitiveOverhead || baseInfo.cognitiveOverhead,
    reframingMantra: resultData.info?.reframingMantra || baseInfo.reframingMantra,
    somaticProtocol: resultData.info?.somaticProtocol || baseInfo.somaticProtocol
  };

  const breakdown = resultData.breakdown || { perfectionistPercent: 85, expertPercent: 40, soloistPercent: 30 };
  const primaryColor = info.color || 'from-fuchsia-500 to-purple-600';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'archetypes', label: 'Competence Archetypes' },
    { id: 'critic', label: 'Internal Critic & Triggers' },
    { id: 'reality', label: 'Reality Check & Protocol' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-fuchsia-200">
      
      {/* Decorative Ambient Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${info.bgLight || 'bg-fuchsia-50'} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${info.bgLight || 'bg-fuchsia-50'} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
                        <span className="px-3.5 py-1.5 rounded-full bg-fuchsia-50 text-fuchsia-700 font-extrabold text-xs uppercase tracking-wider border border-fuchsia-100">
                          Competence Archetype
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Standardized 2nd Box (4 Cols - Prominent & Centered - Icon-Free) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 z-10 drop-shadow-sm pb-1 leading-tight">
                       {info.subName}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Primary Imposter Archetype</span>
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

                {/* 3. Self-Doubt Vectors Summary (Standardized Progress Bars) */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Self-Doubt Vectors</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Relative distribution across key imposter triggers and competence standards.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <ResultBar 
                      label="Perfectionism" 
                      value={breakdown.perfectionistPercent} 
                      color={`bg-linear-to-r ${primaryColor}`} 
                      isPrimary={dominantKey === 'PERFECTIONIST'} 
                    />
                    <ResultBar 
                      label="Knowledge Focus (Perpetual Student)" 
                      value={breakdown.expertPercent} 
                      color={`bg-linear-to-r ${primaryColor}`} 
                      isPrimary={dominantKey === 'EXPERT'} 
                    />
                    <ResultBar 
                      label="Independence Need (Soloist)" 
                      value={breakdown.soloistPercent} 
                      color={`bg-linear-to-r ${primaryColor}`} 
                      isPrimary={dominantKey === 'SOLOIST'} 
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
            {/* TAB 2: COMPETENCE ARCHETYPES */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'archetypes' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Competence Archetypes Spectrum</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Detailed comparison across all 4 imposter competence styles and inner standards of success.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.keys(imposterStatuses).map((key) => {
                    const status = imposterStatuses[key];
                    const isPrimary = key === dominantKey;
                    return (
                      <div 
                        key={key}
                        className={`bg-white border shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4 relative overflow-hidden transition-all ${
                          isPrimary ? 'border-fuchsia-300 ring-2 ring-fuchsia-100' : 'border-slate-100'
                        }`}
                      >
                        <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${status.color}`} />
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                          <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{status.subName}</span>
                            <h4 className="text-2xl font-black text-slate-900">{status.name}</h4>
                          </div>
                          {isPrimary && (
                            <span className="text-[0.65rem] font-black uppercase tracking-wider px-3 py-1 bg-fuchsia-50 text-fuchsia-700 rounded-full border border-fuchsia-200">
                              Your Primary
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          {status.description}
                        </p>
                        <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                          <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">Lie: {status.specificLie}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: INTERNAL CRITIC & TRIGGERS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'critic' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Deconstructing The Internal Critic</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Subconscious scripts, specific cognitive lies, activation triggers, and cognitive overhead.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* The Specific Lie */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Speech className="w-5 h-5 text-fuchsia-600" />
                      <h4 className="text-xl font-black text-slate-900">The Subconscious Script</h4>
                    </div>
                    <p className="text-fuchsia-900 text-lg font-bold italic leading-relaxed">{info.specificLie}</p>
                  </div>

                  {/* Trigger Condition */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <h4 className="text-xl font-black text-slate-900">Activation Trigger</h4>
                    </div>
                    <p className="text-slate-700 text-base font-medium leading-relaxed">{info.triggerCondition}</p>
                  </div>

                  {/* Cognitive Overhead */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Activity className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Systemic Cognitive Overhead</h4>
                    </div>
                    <p className="text-slate-700 text-base font-medium leading-relaxed">{info.cognitiveOverhead}</p>
                  </div>

                  {/* Reframing Mantra */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <RefreshCw className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xl font-black text-slate-900">Cognitive Re-framing Mantra</h4>
                    </div>
                    <p className="text-emerald-900 text-base font-bold leading-relaxed">{info.reframingMantra}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: REALITY CHECK & PROTOCOL */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'reality' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Objective Reality Check & Somatic Protocol</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Grounding your self-worth in objective reality, evidence logging, and somatic safety practices.
                  </p>
                </div>

                {/* Objective Evidence Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Scale className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-xl font-black text-slate-900">The Objective Reality Check</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-relaxed">
                    {info.objectiveEvidence}
                  </p>
                </div>

                {/* Somatic Protocol Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Sparkles className="w-5 h-5 text-fuchsia-500" />
                    <h4 className="text-xl font-black text-slate-900">Somatic Action Protocol</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-relaxed italic">
                    {info.somaticProtocol}
                  </p>
                </div>

                {/* Mastery Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-fuchsia-400" />
                    <h4 className="text-2xl font-black">Competence Integration Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    Imposter phenomenon thrives in the dark spaces of unexamined standards. Real competence is not the absence of doubt, but the courage to take action despite it. You do not need to prove your worth to earn your place in the room—you already belong here.
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
