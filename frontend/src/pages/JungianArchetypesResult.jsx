import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Diamond, PackageOpen, AlertTriangle, Users, 
  Link as LinkIcon, Sparkles, Brain, LayoutGrid, CheckCircle2
} from 'lucide-react';
import { jungianArchetypesMap } from '../utils/jungianArchetypesLogic';

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

function ResultBar({ label, value, color, isPrimary, isSecondary }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-bold text-slate-700">
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-indigo-600 ring-4 ring-indigo-100' : isSecondary ? 'bg-sky-500' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold border border-indigo-100">Primary</span>}
          {isSecondary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 font-extrabold border border-sky-100">Secondary</span>}
        </span>
        <span className="font-mono text-slate-900 font-bold">{value}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
        <Motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function JungianArchetypesResult() {
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
      let foundTypeNum = null;
      for (const [num, obj] of Object.entries(jungianArchetypesMap)) {
        if (obj.id === type) {
          foundTypeNum = parseInt(num);
          break;
        }
      }

      if (foundTypeNum) {
        const breakdown = {};
        const scores = {};
        for (let i = 1; i <= 12; i++) {
          if (i === foundTypeNum) {
            breakdown[i] = 100;
            scores[i] = 21;
          } else {
            breakdown[i] = Math.floor(((i * 17) % 55) + 15);
            scores[i] = Math.floor(breakdown[i] * 0.21);
          }
        }

        const secNum = foundTypeNum === 1 ? 10 : (foundTypeNum % 12) + 1;

        stateData = {
          primaryInfo: jungianArchetypesMap[foundTypeNum],
          secondaryInfo: jungianArchetypesMap[secNum],
          breakdown,
          scores
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_jungian_archetypes', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/jungian-archetypes" replace />;
  }

  const { primaryInfo, secondaryInfo, breakdown } = resultData;
  const primaryColor = primaryInfo.color || 'from-sky-400 to-blue-600';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'shadow', label: 'Growth & Shadow', icon: Brain },
    { id: 'matrix', label: 'All Archetypes', icon: LayoutGrid }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-sky-200">
      
      {/* Decorative Ambient Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${primaryInfo.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${primaryInfo.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
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
                
                {/* 1. Side-by-Side Hero Section (Primary & Secondary visible above the fold!) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Primary Archetype (Dominant 8 Cols) */}
                  <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${primaryColor} opacity-90`} />
                    
                    <div className="space-y-4">
                      <span className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 flex items-center gap-2 inline-flex">
                        <Diamond className="w-3.5 h-3.5 text-indigo-500" />
                        Primary Archetype
                      </span>

                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                        {primaryInfo.name}
                      </h1>
                      
                      <p className="text-slate-600 leading-relaxed font-medium text-base sm:text-lg">
                        {primaryInfo.description}
                      </p>
                    </div>

                    {/* Desire & Fear Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                      <div className="bg-emerald-50/60 border border-emerald-100/80 p-4 rounded-2xl space-y-1">
                        <span className="text-[0.68rem] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                          <PackageOpen className="w-3.5 h-3.5" /> What Drives You
                        </span>
                        <p className="text-slate-800 text-xs sm:text-sm font-bold leading-snug">{primaryInfo.coreDesire}</p>
                      </div>

                      <div className="bg-rose-50/60 border border-rose-100/80 p-4 rounded-2xl space-y-1">
                        <span className="text-[0.68rem] font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> What You Avoid
                        </span>
                        <p className="text-slate-800 text-xs sm:text-sm font-bold leading-snug">{primaryInfo.coreFear}</p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Archetype Layer (4 Cols - Visible Side-by-Side without scrolling!) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-4">
                      <span className="text-xs font-black tracking-[0.2em] uppercase text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block">
                        Secondary Layer
                      </span>

                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                        {secondaryInfo.name}
                      </h2>

                      <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                        {secondaryInfo.description}
                      </p>
                    </div>

                    <div className="bg-sky-50/60 border border-sky-100 p-4 rounded-2xl mt-4">
                      <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                        💡 <strong className="text-slate-900">Synergy:</strong> Balances your main <strong className="text-slate-900">{primaryInfo.shortName}</strong> personality in daily situations.
                      </p>
                    </div>
                  </div>

                </div>

                {/* 2. Your 12 Archetypes Breakdown (Positioned directly below Secondary Layer!) */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Your 12 Archetypes Breakdown</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Here is how your result compares across all 12 personality archetypes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
                      const archObj = jungianArchetypesMap[num];
                      const val = breakdown[num] || 0;
                      const isPrimary = archObj.id === primaryInfo.id;
                      const isSecondary = archObj.id === secondaryInfo.id;

                      return (
                        <ResultBar
                          key={num}
                          label={archObj.name}
                          value={val}
                          color={`bg-linear-to-r ${archObj.color}`}
                          isPrimary={isPrimary}
                          isSecondary={isSecondary}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 3. Strengths & Weaknesses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Strengths Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Key Strengths</h3>
                    </div>
                    <ul className="space-y-4">
                      {primaryInfo.strengths?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className={`mt-2 w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0`} />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Things to Watch Out For</h3>
                    </div>
                    <ul className="space-y-4">
                      {primaryInfo.weaknesses?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* 4. Relationships & Workplace Application */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                        <LinkIcon className="w-5 h-5 text-rose-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">In Relationships</h3>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {primaryInfo.relationshipDynamics}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">At Work</h3>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {primaryInfo.workplaceBehavior}
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: GROWTH & SHADOW */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'shadow' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Growth & Shadow Side</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Every personality type has blind spots or a shadow side that shows up under stress.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full inline-block">
                      Under Stress
                    </span>
                    <h4 className="text-2xl font-black text-slate-900">What Triggers Your Shadow</h4>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      When your desire for <strong className="text-slate-900">{primaryInfo.coreDesire.toLowerCase()}</strong> is blocked, stress can bring out your fear of <strong className="text-rose-600">{primaryInfo.coreFear.toLowerCase()}</strong>.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                      Self Growth
                    </span>
                    <h4 className="text-2xl font-black text-slate-900">How to Stay Balanced</h4>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      Growth comes from accepting your strengths while staying mindful of how your primary <strong className="text-slate-900">{primaryInfo.shortName}</strong> traits work together with your <strong className="text-slate-900">{secondaryInfo.shortName}</strong> side.
                    </p>
                  </div>
                </div>

                {/* Practical Growth Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-sky-400" />
                    <h4 className="text-2xl font-black">Growth Tip</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    Pay attention when you start reacting out of stress. Taking a pause and acknowledging your needs helps you make conscious choices rather than reacting on autopilot.
                  </p>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: ALL ARCHETYPES */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'matrix' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">All 12 Archetypes</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    See how your scores rank across all 12 personality archetypes in the system.
                  </p>
                </div>

                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
                      const archObj = jungianArchetypesMap[num];
                      const val = breakdown[num] || 0;
                      const isPrimary = archObj.id === primaryInfo.id;
                      const isSecondary = archObj.id === secondaryInfo.id;

                      return (
                        <ResultBar
                          key={num}
                          label={archObj.name}
                          value={val}
                          color={`bg-linear-to-r ${archObj.color}`}
                          isPrimary={isPrimary}
                          isSecondary={isSecondary}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </Motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
