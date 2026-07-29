import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Eye, Sparkles, Zap, Activity, 
  CheckCircle2, AlertTriangle, RefreshCw, Lock, Scale, Sun, Moon, Flame, Palette, Compass, Layers, Home, UserCheck
} from 'lucide-react';
import { colorArchetypes } from '../utils/colorPsychologyLogic';

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
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-cyan-500 ring-4 ring-cyan-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-600 font-extrabold border border-cyan-100">Dominant Aura</span>}
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

export default function ColorPsychologyResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const resultData = useMemo(() => {
    let stateData = location.state?.resultData;

    // Check localStorage if location state is missing
    if (!stateData) {
      const saved = localStorage.getItem('omnitype_color_psychology');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && (parsed.info || parsed.dominantArchetype)) {
            stateData = parsed;
          }
        } catch (e) {}
      }
    }

    // Reconstruct from URL parameter if direct access
    if (!stateData && type) {
      if (colorArchetypes[type]) {
        const simulatedBreakdown = {};
        Object.keys(colorArchetypes).forEach(key => {
          simulatedBreakdown[key] = key === type ? 85 : Math.floor(Math.random() * 30) + 10;
        });

        stateData = {
          dominantArchetype: type,
          info: colorArchetypes[type],
          breakdown: simulatedBreakdown,
          rawScores: {}
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_color_psychology', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/color-psychology" replace />;
  }

  const dominantKey = resultData.dominantArchetype || (resultData.info && resultData.info.id) || type || 'indigo';
  const baseInfo = colorArchetypes[dominantKey] || colorArchetypes['indigo'];

  const info = {
    ...baseInfo,
    ...(resultData.info || {}),
    coreDesire: resultData.info?.coreDesire || baseInfo.coreDesire || "Boundless creative alignment and authentic expression.",
    coreFear: resultData.info?.coreFear || baseInfo.coreFear || "Stagnation, loss of harmony, and environmental noise.",
    pros: (resultData.info?.pros && resultData.info.pros.length > 0) ? resultData.info.pros : baseInfo.pros,
    cons: (resultData.info?.cons && resultData.info.cons.length > 0) ? resultData.info.cons : baseInfo.cons,
    traits: (resultData.info?.traits && resultData.info.traits.length > 0) ? resultData.info.traits : baseInfo.traits,
    keywords: (resultData.info?.keywords && resultData.info.keywords.length > 0) ? resultData.info.keywords : baseInfo.keywords,
    decorTherapy: resultData.info?.decorTherapy || baseInfo.decorTherapy,
    communicationStyle: resultData.info?.communicationStyle || baseInfo.communicationStyle,
    chakra: resultData.info?.chakra || baseInfo.chakra,
    temperature: resultData.info?.temperature || baseInfo.temperature,
    complementaryColor: resultData.info?.complementaryColor || baseInfo.complementaryColor,
    shadowColor: resultData.info?.shadowColor || baseInfo.shadowColor,
  };

  const breakdown = resultData.breakdown || { [dominantKey]: 85 };
  const primaryColor = info.color || 'from-cyan-400 to-blue-500';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'spectrum', label: 'Color Spectrum' },
    { id: 'energy', label: 'Chakra & Energy Dynamics' },
    { id: 'palette', label: 'Psychological Palette & Hacks' }
  ];

  const compInfo = colorArchetypes[info.complementaryColor] || colorArchetypes['gold'];
  const shadowInfo = colorArchetypes[info.shadowColor] || colorArchetypes['obsidian'];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-cyan-200">
      
      {/* Decorative Ambient Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${info.bgLight || 'bg-cyan-50'} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${info.bgLight || 'bg-cyan-50'} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
                        {info.keywords?.map((kw, i) => (
                          <span key={i} className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider border border-slate-200/60">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Standardized 2nd Box (4 Cols - Prominent & Centered) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl mb-4 flex items-center justify-center overflow-hidden" style={{ backgroundColor: info.hex }}>
                       <div className="w-full h-full rounded-full bg-linear-to-br from-white/20 to-transparent" />
                     </div>
                     <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 z-10 drop-shadow-sm pb-1 font-mono uppercase">
                       {info.hex}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-2 z-10 whitespace-nowrap">Core Hex Frequency</span>
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

                {/* 3. Core Character Traits */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <UserCheck className="w-5 h-5 text-cyan-600" />
                    <h3 className="text-xl font-black text-slate-900">Core Psychological Profile & Traits</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {info.traits?.map((trait, idx) => (
                      <div key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="mt-2 w-2.5 h-2.5 rounded-full bg-cyan-600 shrink-0" />
                        <p className="text-slate-700 font-bold text-base leading-relaxed">{trait}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Top Resonant Color Distribution */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Dominant Aura Resonance</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Relative power breakdown across your highest matching color frequencies.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {Object.keys(colorArchetypes).slice(0, 4).map((cKey) => {
                      const arch = colorArchetypes[cKey];
                      const val = breakdown[cKey] || (cKey === resultData.dominantArchetype ? 85 : 25);
                      return (
                        <ResultBar
                          key={cKey}
                          label={arch.name}
                          value={val}
                          color={`bg-linear-to-r ${arch.gradient}`}
                          isPrimary={cKey === resultData.dominantArchetype}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 5. Strategic Assets & System Vulnerabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Manifest Strengths */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Manifest Strengths</h3>
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

                  {/* Shadow Elements */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Shadow Elements</h3>
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
            {/* TAB 2: COLOR SPECTRUM (16 COLORS) */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'spectrum' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Full 16-Color Resonance Spectrum</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Comprehensive distribution across all 16 psychological color archetypes, complementary pairings, and stress shift colors.
                  </p>
                </div>

                {/* Complementary & Shadow Shift Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h4 className="text-xl font-black text-slate-900">Complementary Synergy Pair</h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-md shrink-0" style={{ backgroundColor: compInfo.hex }} />
                      <div>
                        <h5 className="text-lg font-bold text-slate-900">{compInfo.name}</h5>
                        <p className="text-slate-500 text-xs font-medium">Brings ideal energetic balance to your core frequency.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Moon className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-xl font-black text-slate-900">Stress Shadow Shift</h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-md shrink-0" style={{ backgroundColor: shadowInfo.hex }} />
                      <div>
                        <h5 className="text-lg font-bold text-slate-900">{shadowInfo.name}</h5>
                        <p className="text-slate-500 text-xs font-medium">Your aura shifts toward this archetype during severe burnout or pressure.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 16-Color Progress Grid */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <h4 className="text-xl font-black text-slate-900">All 16 Color Archetype Resonance Rates</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(colorArchetypes).map((cKey) => {
                      const arch = colorArchetypes[cKey];
                      const val = breakdown[cKey] || (cKey === dominantKey ? 85 : 15);
                      const isPrimary = cKey === dominantKey;
                      return (
                        <div key={cKey} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                          <div className="w-8 h-8 rounded-full border-2 border-white shadow-md shrink-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: arch.hex }}>
                            <div className="w-full h-full rounded-full bg-linear-to-br from-white/20 to-transparent" />
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <div className="flex justify-between items-center text-xs font-extrabold text-slate-800">
                              <span className={isPrimary ? 'text-slate-900 font-black flex items-center gap-1.5' : 'text-slate-700'}>
                                {arch.name}
                                {isPrimary && <span className="text-[0.6rem] uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 font-extrabold">Primary</span>}
                              </span>
                              <span className="font-mono text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-xs shadow-2xs">{val}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
                              <Motion.div 
                                className="h-full rounded-full" 
                                style={{ backgroundColor: arch.hex }} 
                                initial={{ width: 0 }}
                                animate={{ width: `${val}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: CHAKRA & ENERGY DYNAMICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'energy' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Chakra Alignment & Energy Dynamics</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Subconscious frequency vibrations, emotional temperature, and relational communication channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Chakra Center */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Chakra Frequency</span>
                    <h4 className="text-xl font-black text-slate-900">{info.chakra || "Third Eye - 852 Hz"}</h4>
                  </div>

                  {/* Temperature */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
                      <Flame className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Emotional Temperature</span>
                    <h4 className="text-xl font-black text-slate-900">{info.temperature || "Cool Intuitive"}</h4>
                  </div>

                  {/* Communication Style */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <Palette className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Communication Channel</span>
                    <h4 className="text-xl font-black text-slate-900">{info.communicationStyle || "Direct & Insightful"}</h4>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                  <h4 className="text-xl font-black text-slate-900">Subconscious Trait Profile</h4>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    Your primary aura frequency operates as an energetic filter through which you process environmental data. It dictates your instinctual reactions to conflict, creative inspiration, and intimacy.
                  </p>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: PSYCHOLOGICAL PALETTE & HACKS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'palette' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Interior Decor & Energy Hacks</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Tailored spatial therapy, ambient workspace lighting recommendations, and aura stabilization protocols.
                  </p>
                </div>

                {/* Decor Therapy Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Home className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xl font-black text-slate-900">Spatial Decor Therapy</h4>
                  </div>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    {info.decorTherapy || "Minimalist textures, soft lighting, and calming ambient accents."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hack 1 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Color Decompression</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Surround your evening workspace with your complementary color to restore energy equilibrium.
                    </p>
                  </div>

                  {/* Hack 2 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-2">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Aura Cleansing</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Spend 10 minutes in natural sunlight or near green foliage after intense digital screen sessions.
                    </p>
                  </div>

                  {/* Hack 3 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Spectral Wardrobe</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Wear your core hex frequency clothing when heading into high-stakes negotiations or creative pitches.
                    </p>
                  </div>
                </div>

                {/* Mastery Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    <h4 className="text-2xl font-black">Aura Mastery Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    Color is the silent language of the subconscious. Understanding your primary aura frequency allows you to curate your environment, protect your energy, and express your true self with absolute brilliance.
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
