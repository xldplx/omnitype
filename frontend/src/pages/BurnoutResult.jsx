import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Activity, Target, Flame, AlertTriangle, 
  Zap, ShieldAlert, Moon, Battery, Stethoscope, CheckCircle2, RefreshCw, Sparkles, Scale, Lock, Cpu, BrainCircuit, Fingerprint, Eye, Gauge
} from 'lucide-react';
import { burnoutStatuses } from '../utils/burnoutLogic';

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
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-amber-500 ring-4 ring-amber-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-extrabold border border-amber-100">Primary Stressor</span>}
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

export default function BurnoutResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const resultData = useMemo(() => {
    let stateData = location.state?.resultData;
    if (!stateData && type) {
      const statusKey = type.toUpperCase();
      if (burnoutStatuses[statusKey]) {
        stateData = {
          statusKey,
          fullTitle: type,
          info: burnoutStatuses[statusKey],
          breakdown: { physicalPercent: 85, cognitivePercent: 90, nervousPercent: 95 }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_burnout', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/burnout" replace />;
  }

  const { info, breakdown } = resultData;
  const primaryColor = info.color || 'from-amber-400 to-orange-500';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'metrics', label: 'Exhaustion Metrics' },
    { id: 'recovery', label: 'Recovery Blueprint' },
    { id: 'hacks', label: 'Prevention & Hacks' }
  ];

  const maxVal = Math.max(breakdown.physicalPercent || 0, breakdown.cognitivePercent || 0, breakdown.nervousPercent || 0);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-amber-200">
      
      {/* Decorative Ambient Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${info.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${info.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
                      
                      <p className="text-slate-600 max-w-4xl leading-relaxed font-medium text-base sm:text-lg md:text-xl">
                        {info.description}
                      </p>
                    </div>
                  </div>

                  {/* Standardized 2nd Box (4 Cols - Prominent & Centered) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <h2 className={`text-3xl sm:text-4xl md:text-5xl leading-tight font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b ${primaryColor} z-10 drop-shadow-sm pb-1`}>
                       {info.subName}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Nervous System Profile</span>
                  </div>

                </div>

                {/* 2. Dedicated Core Motivations Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Shield className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What Drives You (Core Desire)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{info.coreDesire}</p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Core Fear)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{info.coreFear}</p>
                  </div>
                </div>

                {/* 3. System Load & Exhaustion Allocation */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">System Exhaustion Statistics</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated fatigue across physical, cognitive, and nervous system reserves.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <ResultBar
                      label="Physical Exhaustion"
                      value={breakdown.physicalPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.physicalPercent === maxVal}
                    />
                    <ResultBar
                      label="Cognitive Fatigue"
                      value={breakdown.cognitivePercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.cognitivePercent === maxVal}
                    />
                    <ResultBar
                      label="Nervous System Stress"
                      value={breakdown.nervousPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.nervousPercent === maxVal}
                    />
                  </div>
                </div>

                {/* 4. Strategic Assets & System Vulnerabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Strategic Assets */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Functional Assets</h3>
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

                  {/* Strategic Vulnerabilities */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">System Warning Signs</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.cons?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: EXHAUSTION METRICS (TECHNICAL DEEP DIVE) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'metrics' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Neuro-Physiological Exhaustion Analysis</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Clinical sub-factor decomposition across Autonomic Nervous System (ANS) drive, HPA-Axis response, and cognitive reserves.
                  </p>
                </div>

                {/* Main Progress Bars */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    <ResultBar
                      label="Physical Somatic Burden"
                      value={breakdown.physicalPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.physicalPercent === maxVal}
                    />
                    <ResultBar
                      label="Cognitive Bandwidth Depletion"
                      value={breakdown.cognitivePercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.cognitivePercent === maxVal}
                    />
                    <ResultBar
                      label="Autonomic Nervous Arousal"
                      value={breakdown.nervousPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.nervousPercent === maxVal}
                    />
                  </div>
                </div>



                {/* Technical Sub-Factor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Physical Sub-Factor Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-amber-500 font-black text-lg">
                          <Battery className="w-5 h-5" />
                          <span>Somatic Burden</span>
                        </div>
                        <span className="font-mono text-xs font-bold bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md">{breakdown.physicalPercent}%</span>
                      </div>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        {info.traits?.physical || "Chronic heaviness, altered sleep architecture, and elevated physical fatigue."}
                      </p>

                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Biomarker Metrics:</span>
                        <div className="space-y-2 text-xs font-bold text-slate-700">
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Sleep Architecture Disruption</span>
                            <span className="text-amber-600">{Math.min(breakdown.physicalPercent + 4, 100)}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Cellular Recovery Latency</span>
                            <span className="text-amber-600">{breakdown.physicalPercent}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cognitive Sub-Factor Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-orange-500 font-black text-lg">
                          <BrainCircuit className="w-5 h-5" />
                          <span>Prefrontal Capacity</span>
                        </div>
                        <span className="font-mono text-xs font-bold bg-orange-50 text-orange-600 px-2.5 py-1 rounded-md">{breakdown.cognitivePercent}%</span>
                      </div>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        {info.traits?.cognitive || "Working memory overload, decision fatigue, and reduced problem-solving bandwidth."}
                      </p>

                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Biomarker Metrics:</span>
                        <div className="space-y-2 text-xs font-bold text-slate-700">
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Working Memory Degradation</span>
                            <span className="text-orange-600">{breakdown.cognitivePercent}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Task-Switching Friction</span>
                            <span className="text-orange-600">{Math.min(breakdown.cognitivePercent + 6, 100)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nervous System Sub-Factor Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-rose-500 font-black text-lg">
                          <Zap className="w-5 h-5" />
                          <span>Allostatic Load</span>
                        </div>
                        <span className="font-mono text-xs font-bold bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md">{breakdown.nervousPercent}%</span>
                      </div>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        {info.traits?.nervous || "Autonomic arousal imbalance, reduced vagal tone, and heightened startle response."}
                      </p>

                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Biomarker Metrics:</span>
                        <div className="space-y-2 text-xs font-bold text-slate-700">
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>HRV Suppression Index</span>
                            <span className="text-rose-600">{breakdown.nervousPercent}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Sensory Threshold Saturation</span>
                            <span className="text-rose-600">{Math.max(breakdown.nervousPercent - 4, 15)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Energy Drain Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h4 className="text-xl font-black text-slate-900">Primary System Energy Drain</h4>
                  </div>
                  <p className="text-slate-700 font-bold text-base md:text-lg leading-relaxed">
                    {info.energyDrain}
                  </p>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: RECOVERY BLUEPRINT */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'recovery' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">System Recovery Protocol</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Clinically aligned recovery paths, rest requirements, and early intervention triggers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Actionable Recovery Path */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Stethoscope className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xl font-black text-slate-900">Prescribed Recovery Path</h4>
                    </div>
                    <h5 className="text-lg font-bold text-slate-900">{info.recoveryPath}</h5>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.recoveryDesc}
                    </p>
                  </div>

                  {/* Required Rest Type & Warning Signs */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Moon className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Required Rest Priority</h4>
                    </div>
                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">Primary Rest Requirement</span>
                      <p className="text-slate-900 text-lg font-bold">{info.restType}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-rose-500 block">Watch Out For</span>
                      <p className="text-slate-600 text-sm font-medium">{info.warningSigns}</p>
                    </div>
                  </div>
                </div>

                {/* 7 Types of Rest Framework Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <h4 className="text-xl font-black text-slate-900">The 7 Rest Pillar Check-In</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-medium text-slate-600">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-extrabold text-slate-900 block">1. Physical Rest</span>
                      <p>Sleep, naps, gentle stretching, and muscle relaxation.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-extrabold text-slate-900 block">2. Mental Rest</span>
                      <p>Short brain breaks, brain dumps, and reducing information intake.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-extrabold text-slate-900 block">3. Sensory Rest</span>
                      <p>Screen-free hours, quiet spaces, and dimming bright lights.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: PREVENTION & HACKS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'hacks' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Prevention Hacks & Down-Regulation Protocols</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Practical tools to reset your nervous system and prevent future system crashes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hack 1 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Calendar Audit Protocol</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Enforce a 20% calendar buffer. Block out non-negotiable recovery windows before adding new obligations.
                    </p>
                  </div>

                  {/* Hack 2 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Micro-Reset Breathing</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Use 5-minute physiological sighing (double inhale, long exhale) to rapidly engage your parasympathetic brake.
                    </p>
                  </div>

                  {/* Hack 3 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Digital Sunset Boundary</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Turn off all work notifications at 7:00 PM. Protect your evening hours to allow cortisol levels to drop naturally.
                    </p>
                  </div>
                </div>

                {/* System Recovery Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-6 h-6 text-emerald-400" />
                    <h4 className="text-2xl font-black">Nervous System Recovery Mandate</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    Burnout is not a badge of honor; it is a physiological signal that your current pace is borrowing energy from tomorrow's health. Rest is an essential operational requirement, not a reward.
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
