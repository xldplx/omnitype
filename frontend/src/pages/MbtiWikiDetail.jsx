import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate, Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Brain, Shield, Heart, Activity, Target, Flame, AlertTriangle, 
  Zap, Sparkles, Compass, CheckCircle2, BookOpen, Briefcase, Users, Star, 
  Lightbulb, Layers, MessageSquare, Smile, HelpCircle, Check, X, ArrowRight,
  ChevronRight, Cpu, Eye, Award
} from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';
import { 
  mbtiCognitiveStacks, 
  mbtiTypeGuides, 
  getTypeTemperament, 
  temperamentGroups 
} from '../utils/mbtiWikiData';

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

export default function MbtiWikiDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, type]);

  const uppercaseType = (type || 'INTP').toUpperCase();
  const typeInfo = typeDescriptions[uppercaseType];

  if (!typeInfo) {
    return <Navigate to="/wiki" replace />;
  }

  const temperament = getTypeTemperament(uppercaseType);
  const stack = mbtiCognitiveStacks[uppercaseType] || [];
  const guide = mbtiTypeGuides[uppercaseType] || {
    simpleSummary: typeInfo.desc,
    scenarios: [],
    myths: [],
    howToTalk: [],
    growthHacks: []
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Cognitive Stack', icon: Brain },
    { id: 'dailylife', label: 'Daily Life & Mythbusters', icon: Smile },
    { id: 'strengths', label: 'Strengths & Growth Hacks', icon: Target },
    { id: 'relationships', label: 'Relationships & Communication', icon: Heart },
    { id: 'careers', label: 'Careers & Workplace', icon: Briefcase }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-indigo-200">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10vh] left-[-10vw] w-[55vw] h-[55vw] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[55vw] h-[55vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-28 md:pt-36 pb-32 relative z-10 space-y-10">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-200/60">
          <button 
            type="button"
            onClick={() => navigate('/wiki')}
            className="inline-flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-100 group-hover:border-slate-300 transition-all shadow-xs">
              <ChevronLeft className="w-4 h-4 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Back to Wiki Directory</span>
          </button>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${temperament.themeBg} ${temperament.themeBorder} ${temperament.themeText}`}>
              {temperament.badge}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              Archetype Encyclopedia
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Title Box (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2.5 h-full bg-linear-to-b ${temperament.color} opacity-90`} />
            
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight font-mono">
                  {uppercaseType}
                </span>
                <span className="text-base sm:text-2xl font-black text-slate-900 bg-slate-100 px-5 py-2 rounded-2xl border border-slate-200">
                  {typeInfo.title}
                </span>
              </div>
              
              <p className="text-slate-600 max-w-3xl leading-relaxed font-medium text-base sm:text-lg md:text-xl">
                {guide.simpleSummary || typeInfo.desc}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider border border-slate-200">
                  {typeInfo.mythologicalArchetype || "Archetype"}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs uppercase tracking-wider border border-indigo-100">
                  {temperament.tagline}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-400">
                Cognitive Stack: <strong className="font-mono text-slate-700">{stack.map(s => s.function).join(' · ')}</strong>
              </span>
              <Link 
                to="/test/mbti"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition group/cta"
              >
                <span>Take 16 Archetypes Test</span>
                <ArrowRight className="w-4 h-4 text-indigo-500 group-hover/cta:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Archetype Matrix & Quick Insights Box (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Cognitive Profile</span>
                <span className="text-xs font-mono font-black px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                  {stack[0]?.function || 'Dom'} Lead
                </span>
              </div>

              {/* Function Preview Chips */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-indigo-600 uppercase tracking-wider">Dominant Function</span>
                    <span className="font-mono text-indigo-800 bg-white px-2 py-0.5 rounded border border-indigo-200">{stack[0]?.function}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{stack[0]?.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{stack[0]?.role}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-slate-500 uppercase tracking-wider">Auxiliary Function</span>
                    <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">{stack[1]?.function}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{stack[1]?.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{stack[1]?.role}</p>
                </div>
              </div>

              {/* Temperament summary */}
              <div className="pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-1">Temperament Group</span>
                <p className="text-sm font-bold text-slate-800">{temperament.title}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{temperament.desc}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <Link
                to="/test/mbti"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Assess Your Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
              </Link>
            </div>
          </div>

        </div>

        {/* Tab Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 pb-3 pt-1 border-b border-slate-200/80">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md scale-[1.01]' 
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* ---------------------------------------------------- */}
            {/* TAB 1: OVERVIEW & COGNITIVE STACK */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                
                {/* 4 Cognitive Functions */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Cognitive Architecture</h3>
                      </div>
                      <p className="text-slate-500 text-sm md:text-base font-medium">
                        The 4 primary psychological filters {uppercaseType}s use to perceive the world and make decisions.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 shrink-0">
                      Jungian Model
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stack.map((fn, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-50/80 p-7 rounded-3xl border border-slate-200/60 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-200 space-y-3 relative overflow-hidden"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-400">{fn.rank}</span>
                          <span className="text-sm font-mono font-black px-3.5 py-1 bg-white text-indigo-600 rounded-lg border border-slate-200 shadow-2xs">
                            {fn.function}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-slate-900">{fn.name}</h4>
                          <span className="text-xs font-extrabold text-indigo-600 block mt-0.5">{fn.role}</span>
                        </div>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed pt-1">{fn.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secret Dreams & Hidden Fears */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-4 relative overflow-hidden">
                    <div className="flex items-center gap-3 text-emerald-600">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block">Core Motivator</span>
                        <h4 className="text-lg font-black text-slate-900">Secret Dreams</h4>
                      </div>
                    </div>
                    <p className="text-slate-700 text-base sm:text-lg font-bold leading-relaxed pt-2">{typeInfo.secretDreams}</p>
                  </div>

                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-4 relative overflow-hidden">
                    <div className="flex items-center gap-3 text-rose-500">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-rose-500 block">Subconscious Friction</span>
                        <h4 className="text-lg font-black text-slate-900">Hidden Fears</h4>
                      </div>
                    </div>
                    <p className="text-slate-700 text-base sm:text-lg font-bold leading-relaxed pt-2">{typeInfo.hiddenFears}</p>
                  </div>
                </div>

                {/* Core Values & Fun Quirks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Core Values */}
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                        <Star className="w-5 h-5 text-amber-500" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">Guiding Core Values</h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {typeInfo.coreValues?.map((val, idx) => (
                        <span key={idx} className="px-4 py-2 rounded-xl bg-amber-50/80 text-amber-900 font-extrabold text-sm border border-amber-200/70 shadow-2xs">
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fun Quirks */}
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">Fun Quirks & Habits</h4>
                    </div>
                    <ul className="space-y-3 pt-2">
                      {typeInfo.funFacts?.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: DAILY LIFE & MYTHBUSTERS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'dailylife' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Daily Life Scenarios & Mythbusters</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Real-world situations you will instantly recognize, and busting common misconceptions about how {uppercaseType}s operate.
                  </p>
                </div>

                {/* Real World Scenarios */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <Smile className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block">Behavioral Patterns</span>
                      <h4 className="text-xl font-black text-slate-900">Real-World Daily Scenarios</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guide.scenarios?.map((scen, idx) => (
                      <div key={idx} className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/70 space-y-2.5">
                        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">{scen.title}</span>
                        <p className="text-slate-700 text-sm font-medium leading-relaxed">{scen.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Misconceptions (Myths vs Facts) */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-purple-600 block">Clarifying Misconceptions</span>
                      <h4 className="text-xl font-black text-slate-900">Mythbusters (Common Myths vs The Truth)</h4>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {guide.myths?.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/80 p-6 rounded-3xl border border-slate-200/70">
                        <div className="flex items-start gap-3.5 text-rose-700">
                          <div className="w-7 h-7 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-4 h-4 text-rose-600" />
                          </div>
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-rose-600 block mb-1">Common Myth</span>
                            <p className="text-slate-800 text-sm font-semibold leading-relaxed">{item.myth}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3.5 text-emerald-700 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-4">
                          <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block mb-1">The Reality</span>
                            <p className="text-slate-800 text-sm font-semibold leading-relaxed">{item.fact}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: STRENGTHS & GROWTH HACKS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'strengths' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Strengths, Blindspots & Growth Hacks</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Authentic breakdown of your greatest innate powers, vulnerabilities to guard against, and practical self-mastery tips.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strengths */}
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block">Core Powers</span>
                        <h4 className="text-xl font-black text-slate-900">Greatest Superpowers</h4>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {typeInfo.strengths?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-rose-500 block">Vulnerabilities</span>
                        <h4 className="text-xl font-black text-slate-900">Blindspots to Watch</h4>
                      </div>
                    </div>
                    <ul className="space-y-4">
                      {typeInfo.weaknesses?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Simple Personal Growth Hacks */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-amber-600 block">Self-Mastery</span>
                      <h4 className="text-xl font-black text-slate-900">Actionable Growth Hacks</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guide.growthHacks?.map((hack, idx) => (
                      <div key={idx} className="bg-amber-50/60 p-6 rounded-3xl border border-amber-200/70 space-y-2.5">
                        <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">Growth Hack #{idx + 1}</span>
                        <p className="text-slate-800 text-sm font-semibold leading-relaxed">{hack}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: RELATIONSHIPS & COMMUNICATION */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'relationships' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Relationships & Communication Guide</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    How {uppercaseType}s navigate romance, friendships, and clear communication guidelines for partners and colleagues.
                  </p>
                </div>

                {/* How to Talk to Them Card */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block">Interpersonal Protocol</span>
                      <h4 className="text-xl font-black text-slate-900">How to Best Communicate With an {uppercaseType}</h4>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {guide.howToTalk?.map((rule, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60">
                        <div className="flex items-start gap-3 text-emerald-800 font-semibold text-sm">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black uppercase shrink-0">DO</span>
                          <span className="pt-0.5">{rule.do}</span>
                        </div>
                        <div className="flex items-start gap-3 text-rose-800 font-semibold text-sm border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-3">
                          <span className="px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-black uppercase shrink-0">DON'T</span>
                          <span className="pt-0.5">{rule.dont}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Romantic Dynamics */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Love & Romantic Relationships</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed pt-1">
                    {typeInfo.romantic}
                  </p>
                </div>

                {/* Friendships */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Friendships & Social Dynamics</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed pt-1">
                    {typeInfo.friendships}
                  </p>
                </div>

                {/* Compatibility Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Compatible Pairs */}
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 space-y-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-600">High Synergy</span>
                      <h4 className="text-lg font-black text-slate-900">Natural Synergy Matches</h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {typeInfo.compatibility?.map((code, idx) => (
                        <Link 
                          key={idx}
                          to={`/wiki/mbti/${code.toLowerCase()}`}
                          className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-black text-sm border border-emerald-200/80 hover:bg-emerald-100 hover:scale-105 transition-all shadow-2xs"
                        >
                          {code}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Growth Challenge Pairs */}
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 space-y-4">
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-rose-500">Growth Catalysts</span>
                      <h4 className="text-lg font-black text-slate-900">Growth Challenge Matches</h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {typeInfo.incompatible?.map((code, idx) => (
                        <Link 
                          key={idx}
                          to={`/wiki/mbti/${code.toLowerCase()}`}
                          className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-800 font-mono font-black text-sm border border-rose-200/80 hover:bg-rose-100 hover:scale-105 transition-all shadow-2xs"
                        >
                          {code}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: CAREERS & WORKPLACE */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'careers' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Careers & Workplace Style</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Ideal working environments, team styles, and top career domains where {uppercaseType}s naturally excel.
                  </p>
                </div>

                {/* Workplace Style */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Your Ideal Work Environment</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed pt-1">
                    {typeInfo.workplace}
                  </p>
                </div>

                {/* Recommended Careers Grid */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-10 space-y-6">
                  <h4 className="text-xl font-black text-slate-900">Top Recommended Career Paths</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {typeInfo.careers?.map((career, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 font-extrabold text-slate-800 text-center text-sm shadow-2xs hover:border-indigo-200 hover:bg-indigo-50/40 transition">
                        {career}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mastery Protocol */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h4 className="text-2xl font-black">Personal Growth Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    Your personality archetype is a diagnostic map for self-discovery, not a permanent limitation. Embrace your natural strengths, stay open to continuous learning, and remember that real growth comes from stretching into your auxiliary and tertiary functions.
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
