import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Zap, AlertTriangle, Users, Briefcase, 
  Target, TrendingUp, Sparkles, CheckCircle2, Activity, Brain, EyeOff, Layers, Compass, Flame, Crosshair, BrainCircuit, Lightbulb, Lock, Scale, RefreshCw, Eye, Fingerprint, Cpu, Gauge
} from 'lucide-react';
import { darkTriadStatuses } from '../utils/darkTriadLogic';

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
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold border border-indigo-100">Dominant Trait</span>}
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

export default function DarkTriadResult() {
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
      if (darkTriadStatuses[statusKey]) {
        stateData = {
          statusKey,
          fullTitle: type,
          info: darkTriadStatuses[statusKey],
          breakdown: { machPercent: 75, narcPercent: 85, psychPercent: 40 }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_dark_triad', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/dark-triad" replace />;
  }

  const { info, breakdown } = resultData;
  const primaryColor = info.color || 'from-zinc-900 to-black';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'metrics', label: 'Triad Metrics', icon: Activity },
    { id: 'matrix', label: 'Manipulation Matrix', icon: Crosshair },
    { id: 'relational', label: 'Relational Dynamics', icon: Users },
    { id: 'hacks', label: 'Growth & Hacks', icon: Lightbulb }
  ];

  const triadMetrics = [
    { id: 'mach', label: 'Machiavellianism', value: breakdown.machPercent, color: 'from-indigo-600 to-zinc-800' },
    { id: 'narc', label: 'Narcissism', value: breakdown.narcPercent, color: 'from-amber-500 to-rose-500' },
    { id: 'psych', label: 'Psychopathy', value: breakdown.psychPercent, color: 'from-red-600 to-black' }
  ];

  const maxTraitVal = Math.max(breakdown.machPercent, breakdown.narcPercent, breakdown.psychPercent);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-zinc-300">
      
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

        {/* Tab Selector Buttons */}
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
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Shadow Archetype</span>
                  </div>

                </div>

                {/* 2. Dedicated Core Motivations Section (What Drives You & What You Avoid) */}
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

                {/* 3. Shadow Trait Density Statistics */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Shadow Trait Density Statistics</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated concentration across Machiavellianism, Narcissism, and Psychopathy.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {triadMetrics.map((m) => (
                      <ResultBar
                        key={m.id}
                        label={m.label}
                        value={m.value}
                        color={`bg-linear-to-r ${m.color}`}
                        isPrimary={m.value === maxTraitVal}
                      />
                    ))}
                  </div>
                </div>

                {/* 4. Strategic Assets & Vulnerabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Strategic Assets */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Strategic Assets</h3>
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
                      <h3 className="text-xl font-black text-slate-900">Strategic Vulnerabilities</h3>
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
            {/* TAB 2: TRIAD METRICS (REVAMPED & ENRICHED) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'metrics' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Shadow Trait Density & Clinical Sub-Scales</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    In-depth breakdown of Machiavellianism, Narcissism, and Psychopathy with behavioral sub-factors.
                  </p>
                </div>

                {/* Main Progress Bars */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    {triadMetrics.map((m) => (
                      <ResultBar
                        key={m.id}
                        label={m.label}
                        value={m.value}
                        color={`bg-linear-to-r ${m.color}`}
                        isPrimary={m.value === maxTraitVal}
                      />
                    ))}
                  </div>
                </div>

                {/* 3 Dedicated Sub-Scale Deep Dive Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Machiavellianism Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-indigo-600 font-black text-lg">
                          <Target className="w-5 h-5" />
                          <span>Machiavellianism</span>
                        </div>
                        <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md">{breakdown.machPercent}%</span>
                      </div>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        Tactical calculation, long-term strategic positioning, and information control.
                      </p>
                      
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Sub-Scale Indicators:</span>
                        <div className="space-y-2 text-xs font-bold text-slate-700">
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Information Asymmetry</span>
                            <span className="text-indigo-600">{Math.min(breakdown.machPercent + 5, 100)}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Strategic Patience</span>
                            <span className="text-indigo-600">{Math.max(breakdown.machPercent - 10, 15)}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Cynical Realism</span>
                            <span className="text-indigo-600">{breakdown.machPercent}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl space-y-1">
                      <span className="text-[0.65rem] font-black uppercase tracking-wider text-indigo-600 block">Behavioral Marker</span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">Calculates 3 steps ahead before revealing true intentions in group settings.</p>
                    </div>
                  </div>

                  {/* Narcissism Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-amber-500 font-black text-lg">
                          <Flame className="w-5 h-5" />
                          <span>Narcissism</span>
                        </div>
                        <span className="font-mono text-xs font-bold bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md">{breakdown.narcPercent}%</span>
                      </div>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        Grandiosity, elite self-image, public prestige demand, and charismatic magnetism.
                      </p>

                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Sub-Scale Indicators:</span>
                        <div className="space-y-2 text-xs font-bold text-slate-700">
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Grandiosity & Vision</span>
                            <span className="text-amber-600">{breakdown.narcPercent}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Public Admiration Demand</span>
                            <span className="text-amber-600">{Math.min(breakdown.narcPercent + 8, 100)}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Status Competition</span>
                            <span className="text-amber-600">{Math.max(breakdown.narcPercent - 5, 20)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50/70 border border-amber-100 p-4 rounded-2xl space-y-1">
                      <span className="text-[0.65rem] font-black uppercase tracking-wider text-amber-600 block">Behavioral Marker</span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">Uses magnetic charm and self-confidence to command the spotlight effortless.</p>
                    </div>
                  </div>

                  {/* Psychopathy Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-rose-600 font-black text-lg">
                          <Zap className="w-5 h-5" />
                          <span>Psychopathy</span>
                        </div>
                        <span className="font-mono text-xs font-bold bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md">{breakdown.psychPercent}%</span>
                      </div>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">
                        Low arousal threshold under stress, fearlessness, thrill-seeking, and icy detachment.
                      </p>

                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Sub-Scale Indicators:</span>
                        <div className="space-y-2 text-xs font-bold text-slate-700">
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Stress Immunity</span>
                            <span className="text-rose-600">{Math.min(breakdown.psychPercent + 12, 100)}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Thrill-Seeking</span>
                            <span className="text-rose-600">{breakdown.psychPercent}%</span>
                          </div>
                          <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl">
                            <span>Guilt Detachment</span>
                            <span className="text-rose-600">{Math.max(breakdown.psychPercent - 8, 10)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-100 p-4 rounded-2xl space-y-1">
                      <span className="text-[0.65rem] font-black uppercase tracking-wider text-rose-600 block">Behavioral Marker</span>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">Maintains icy composure and rapid decision-making in volatile crises.</p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: MANIPULATION MATRIX (REVAMPED & ENRICHED) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'matrix' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Manipulation & Tactical Control Room</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Comprehensive mapping of subconscious levers, cognitive processing engines, and triggers.
                  </p>
                </div>

                {/* 4 Levers of Influence Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Social Leverage */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Activity className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Lever 1: Social Leverage Strategy</h4>
                    </div>
                    <p className="text-slate-700 font-bold text-base sm:text-lg leading-relaxed">
                      {info.socialLeverage}
                    </p>
                  </div>

                  {/* Critical Blindspot */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <EyeOff className="w-5 h-5 text-rose-500" />
                      <h4 className="text-xl font-black text-slate-900">Lever 2: Critical Blindspot Vulnerability</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.blindspot}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Cognitive Modus */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <BrainCircuit className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xl font-black text-slate-900">Lever 3: Cognitive Modus Operandi</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.cognitiveModus}
                    </p>
                  </div>

                  {/* Exhaustion Index */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <h4 className="text-xl font-black text-slate-900">Lever 4: Interpersonal Exhaustion Index</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.exhaustionIndex}
                    </p>
                  </div>
                </div>

                {/* Cognitive Processing Engine Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Cpu className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xl font-black text-slate-900">Cognitive Processing Engine Mechanics</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-indigo-600">Calm State Processing</span>
                      <p className="text-slate-700 font-semibold text-sm leading-relaxed">
                        In quiet scenarios, your brain calculates long-term utility, scanning rooms for key influencers and positioning yourself for maximum autonomy.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-rose-500">High-Stress Processing</span>
                      <p className="text-slate-700 font-semibold text-sm leading-relaxed">
                        Under crisis or conflict, emotional noise shuts off completely. You execute rapid, objective tactical moves without lingering guilt or anxiety.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dark Core Card */}
                <div className="bg-zinc-900 border border-zinc-800 shadow-[0_20px_50px_rgb(0,0,0,0.4)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Flame className="w-6 h-6 text-amber-500" />
                    <h4 className="text-2xl font-black">The Dark Core Motivation</h4>
                  </div>
                  <p className="text-zinc-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    {info.darkCore}
                  </p>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: RELATIONAL DYNAMICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'relational' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Relational Dynamics & Power Play</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    How your shadow profile interacts in romantic relationships, conflict resolution, and workplace power dynamics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Relationship Style */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Users className="w-5 h-5 text-rose-500" />
                      <h4 className="text-xl font-black text-slate-900">Romantic Relationship Dynamics</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.relationshipStyle}
                    </p>
                  </div>

                  {/* Workplace Power Play */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Workplace Power Play Tactics</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      In professional settings, you naturally calculate political currents and leverage points. You excel in high-stakes negotiations, maintaining total composure while others falter under pressure.
                    </p>
                  </div>
                </div>

                {/* Boundary Warning Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                    <AlertTriangle className="w-5 h-5" />
                    <h4 className="text-xl font-black text-slate-900">Relational Boundary & Friction Warning</h4>
                  </div>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    Be cautious of burning bridges out of short-term tactical math or emotional detachment. Partners and colleagues value consistency; long-term trust equity yields far greater power than momentary manipulation.
                  </p>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: GROWTH & HACKS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'hacks' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Shadow Integration & Ethical Leverage Hacks</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Practical protocols to harness your shadow energy constructively without destroying long-term trust.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hack 1 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Ethical Leverage Calibration</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Channel your strategic calculation into positive-sum games. Win-win arrangements build far stronger alliances than zero-sum exploitation.
                    </p>
                  </div>

                  {/* Hack 2 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-2">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">The 24-Hour Impulse Pause</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Before acting on a high-risk or retaliatory impulse, enforce a mandatory 24-hour cooling window to evaluate long-term consequences.
                    </p>
                  </div>

                  {/* Hack 3 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Unconditional Trust Practice</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Experiment with delegating full control in low-stakes tasks to experience the psychological relief of putting down your strategic armor.
                    </p>
                  </div>
                </div>

                {/* Self-Correction Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-indigo-400" />
                    <h4 className="text-2xl font-black">Shadow Integration Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    {info.selfCorrection}
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
