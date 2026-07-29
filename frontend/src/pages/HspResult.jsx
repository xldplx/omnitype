import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Activity, Target, AlertTriangle, 
  Zap, Eye, BatteryCharging, Leaf, VolumeX, Home, CheckCircle2, RefreshCw, Lock, Sparkles, Scale
} from 'lucide-react';
import { hspStatuses } from '../utils/hspLogic';

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
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-pink-500 ring-4 ring-pink-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 font-extrabold border border-pink-100">Dominant Channel</span>}
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

export default function HspResult() {
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
      if (hspStatuses[statusKey]) {
        stateData = {
          statusKey,
          fullTitle: type,
          info: hspStatuses[statusKey],
          breakdown: { sensoryPercent: 85, empathyPercent: 90, processingPercent: 75 }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_hsp', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/hsp" replace />;
  }

  const { info, breakdown } = resultData;
  const primaryColor = info.color || 'from-rose-400 to-pink-500';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'metrics', label: 'Sensory Metrics' },
    { id: 'sanctuary', label: 'Sanctuary & Environment' },
    { id: 'recharge', label: 'Recharge Protocol' }
  ];

  const maxVal = Math.max(breakdown.sensoryPercent || 0, breakdown.empathyPercent || 0, breakdown.processingPercent || 0);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-pink-200">
      
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
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Sensitivity Profile</span>
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
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Hidden Fear)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{info.coreFear}</p>
                  </div>
                </div>

                {/* 3. Sensory Metrics Allocation */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Sensory Processing Statistics</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated sensitivity across environmental inputs, emotional empathy, and depth of processing.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <ResultBar
                      label="Sensory Input Sensitivity"
                      value={breakdown.sensoryPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.sensoryPercent === maxVal}
                    />
                    <ResultBar
                      label="Emotional Empathy & Resonant Attunement"
                      value={breakdown.empathyPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.empathyPercent === maxVal}
                    />
                    <ResultBar
                      label="Depth of Cognitive & Emotional Processing"
                      value={breakdown.processingPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.processingPercent === maxVal}
                    />
                  </div>
                </div>

                {/* 4. Strategic Assets & System Vulnerabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Superpowers */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Sensory Superpowers (Pros)</h3>
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
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Friction Points (Cons)</h3>
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
            {/* TAB 2: SENSORY METRICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'metrics' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Sensory Processing Breakdown</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Detailed breakdown across sensory input tolerance, emotional absorption, and internal processing depth.
                  </p>
                </div>

                {/* Main Progress Bars */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    <ResultBar
                      label="Sensory Input Sensitivity"
                      value={breakdown.sensoryPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.sensoryPercent === maxVal}
                    />
                    <ResultBar
                      label="Emotional Empathy & Resonant Attunement"
                      value={breakdown.empathyPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.empathyPercent === maxVal}
                    />
                    <ResultBar
                      label="Depth of Cognitive & Emotional Processing"
                      value={breakdown.processingPercent}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={breakdown.processingPercent === maxVal}
                    />
                  </div>
                </div>

                {/* 3 Pillar Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Sensory Input Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Target className="w-5 h-5 text-pink-500" />
                      <h4 className="text-lg font-black text-slate-900">Sensory Input</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      {info.traits?.sensory || "Attuned to environmental details, lights, sounds, and ambient stimulation."}
                    </p>
                  </div>

                  {/* Emotional Empathy Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <h4 className="text-lg font-black text-slate-900">Emotional Empathy</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      {info.traits?.empathy || "Deeply absorbs social atmosphere and non-verbal emotional cues from others."}
                    </p>
                  </div>

                  {/* Depth of Processing Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Activity className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-lg font-black text-slate-900">Depth of Processing</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      {info.traits?.processing || "Internalizes experiences deeply, reflecting thoroughly before acting."}
                    </p>
                  </div>

                </div>

                {/* Primary Sensory Triggers Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <VolumeX className="w-5 h-5 text-rose-500" />
                    <h4 className="text-xl font-black text-slate-900">Primary Sensory Triggers</h4>
                  </div>
                  <p className="text-slate-700 font-bold text-base md:text-lg leading-relaxed">
                    {info.sensoryTriggers}
                  </p>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: SANCTUARY & ENVIRONMENT */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'sanctuary' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Environmental Needs & Sanctuary</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Curating an optimal physical and psychological environment for your sensitive nervous system.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Space Requirements */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Home className="w-5 h-5 text-sky-500" />
                      <h4 className="text-xl font-black text-slate-900">Environmental Needs</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.environmentalNeeds}
                    </p>
                  </div>

                  {/* Ideal Workspace */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Leaf className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-xl font-black text-slate-900">Optimal Workspace Setup</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.idealWorkspace}
                    </p>
                  </div>
                </div>

                {/* Sensory Sanctuary Rules Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <h4 className="text-xl font-black text-slate-900">Sanctuary Design Checklist</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-medium text-slate-600">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-extrabold text-slate-900 block">1. Lighting & Optics</span>
                      <p>Warm ambient lighting, avoidance of fluorescent tubes, and dimmable lamps.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-extrabold text-slate-900 block">2. Acoustic Insulation</span>
                      <p>Noise-canceling headphones, soft textures, and quiet decompression zones.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                      <span className="font-extrabold text-slate-900 block">3. Tactile Comfort</span>
                      <p>Natural fabrics, ergonomic seating, and clutter-free surfaces.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: RECHARGE PROTOCOL */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'recharge' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Recharge Mode & Decompression Hacks</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Customized strategies to restore your energy reserves and protect your nervous system.
                  </p>
                </div>

                {/* Primary Recharge Mode Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <BatteryCharging className="w-5 h-5 text-pink-500" />
                    <h4 className="text-xl font-black text-slate-900">Prescribed Recharge Mode</h4>
                  </div>
                  <h5 className="text-lg font-bold text-slate-900">{info.rechargeMode}</h5>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    {info.rechargeDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hack 1 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Empathy Un-Merging</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Visualize an energetic boundary separating your internal emotional state from the feelings of others.
                    </p>
                  </div>

                  {/* Hack 2 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Sensory Buffer Zone</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Schedule 15 minutes of zero-input quiet solitude immediately following intense social or work events.
                    </p>
                  </div>

                  {/* Hack 3 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Overstimulation Brake</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Give yourself explicit permission to step away from crowded spaces when sensory static becomes overwhelming.
                    </p>
                  </div>
                </div>

                {/* Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-pink-400" />
                    <h4 className="text-2xl font-black">Sensory Gift Mandate</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    High sensitivity is not a vulnerability to be cured; it is a refined perceptual gift that allows you to feel the richness of life, art, and connection deeply. Protect your sanctuary so your gift can shine.
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
