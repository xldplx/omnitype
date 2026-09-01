import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Compass, Brain, Shield, Heart, Activity, ArrowRight, Ghost, 
  Sparkles, Layers, Cpu, Users, Star, Flame, Check, Zap, HelpCircle,
  Award, Eye, X
} from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';
import { 
  temperamentGroups, 
  mbtiCognitiveStacks, 
  getTypeTemperament 
} from '../utils/mbtiWikiData';
import { enneagramTypes } from '../utils/enneagramResultLogic';
import { alignmentMap } from '../utils/moralAlignmentLogic';
import { attachmentStylesTypes } from '../utils/attachmentStylesLogic';
import { loveLanguagesTypes } from '../utils/loveLanguagesLogic';
import { jungianArchetypesMap } from '../utils/jungianArchetypesLogic';

export default function Wiki() {
  const [activeFramework, setActiveFramework] = useState('mbti');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemperament, setSelectedTemperament] = useState('all');
  const [selectedAlignment, setSelectedAlignment] = useState('lawful-good');

  // MBTI list formatted with temperament and cognitive stacks
  const mbtiTypes = useMemo(() => {
    return Object.entries(typeDescriptions).map(([key, value]) => {
      const temp = getTypeTemperament(key);
      const stack = mbtiCognitiveStacks[key] || [];
      return {
        code: key,
        ...value,
        temperament: temp,
        stack
      };
    });
  }, []);

  // Filtered MBTI list based on search and temperament chip
  const filteredMbtiTypes = useMemo(() => {
    let list = mbtiTypes;

    if (selectedTemperament !== 'all') {
      list = list.filter(t => t.temperament.id === selectedTemperament);
    }

    const query = searchQuery.trim().toLowerCase();
    if (!query) return list;

    return list.filter(t => 
      t.code.toLowerCase().includes(query) ||
      t.title.toLowerCase().includes(query) ||
      (t.desc && t.desc.toLowerCase().includes(query)) ||
      (t.mythologicalArchetype && t.mythologicalArchetype.toLowerCase().includes(query)) ||
      (t.coreValues && t.coreValues.some(v => v.toLowerCase().includes(query))) ||
      (t.stack && t.stack.some(s => s.function.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)))
    );
  }, [mbtiTypes, searchQuery, selectedTemperament]);

  // Framework tabs - clean labels and icons, no cutoff
  const frameworkTabs = [
    { id: 'mbti', label: '16 Archetypes', icon: Brain },
    { id: 'enneagram', label: 'Enneagram', icon: Compass },
    { id: 'alignment', label: 'Moral Alignment', icon: Shield },
    { id: 'relational', label: 'Relational Dynamics', icon: Heart },
    { id: 'jungian', label: 'Jungian Archetypes', icon: Sparkles }
  ];

  const enneagramList = useMemo(() => Object.entries(enneagramTypes).map(([num, data]) => ({ num, ...data })), []);
  const alignmentList = useMemo(() => Object.values(alignmentMap), []);
  const attachmentList = useMemo(() => Object.values(attachmentStylesTypes), []);
  const loveLanguagesList = useMemo(() => Object.values(loveLanguagesTypes), []);
  const jungianList = useMemo(() => Object.values(jungianArchetypesMap), []);

  const activeAlignmentData = alignmentMap[selectedAlignment] || alignmentMap['lawful-good'];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 pt-28 md:pt-36 px-4 sm:px-8 md:px-12 relative text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* Background ambient lighting */}
      <div className="fixed top-[-15vh] left-[-10vw] w-[60vw] h-[60vw] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Wiki Header Hero */}
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-none">
            Psychology Wiki<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium max-w-3xl leading-relaxed text-balance">
            The centralized encyclopedia for cognitive profiles, subconscious motivations, relational models, and moral frameworks.
          </p>
        </div>

        {/* Framework Selector Segmented Bar (Fits clean across Desktop, wraps seamlessly on Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 pb-3 pt-1 border-b border-slate-200/80">
          {frameworkTabs.map((tab) => {
            const isActive = activeFramework === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveFramework(tab.id);
                  setSearchQuery('');
                }}
                className={`flex items-center justify-center gap-2 py-3 px-3.5 sm:px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
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

        {/* Dynamic Framework View Container */}
        <AnimatePresence mode="wait">
          
          {/* ========================================================= */}
          {/* FRAMEWORK 1: 16 ARCHETYPES (MBTI) */}
          {/* ========================================================= */}
          {activeFramework === 'mbti' && (
            <Motion.div
              key="mbti-framework"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Search & Temperament Filter Toolbar */}
              <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">16 Cognitive Archetypes Directory</h2>
                    <p className="text-slate-500 text-sm md:text-base font-medium">
                      Explore detailed cognitive stacks, daily scenarios, strengths, and communication guides for all 16 profiles.
                    </p>
                  </div>

                  {/* Search input */}
                  <div className="relative w-full md:w-80 shrink-0">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search code, title, or function..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200/80 focus:border-indigo-500 focus:bg-white outline-none rounded-full text-xs font-bold text-slate-800 shadow-2xs transition"
                    />
                    {searchQuery && (
                      <button 
                        type="button" 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Temperament Filter Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-1">Group:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedTemperament('all')}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      selectedTemperament === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Types (16)
                  </button>
                  {Object.values(temperamentGroups).map((temp) => (
                    <button
                      key={temp.id}
                      type="button"
                      onClick={() => setSelectedTemperament(temp.id)}
                      className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        selectedTemperament === temp.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : `${temp.themeBg} ${temp.themeText} border ${temp.themeBorder} hover:brightness-95`
                      }`}
                    >
                      {temp.badge}
                    </button>
                  ))}
                </div>
              </div>

              {/* MBTI Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {filteredMbtiTypes.map((typeObj) => {
                  const temp = typeObj.temperament;
                  return (
                    <div
                      key={typeObj.code}
                      className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-indigo-200/80 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Left Gradient Strip */}
                      <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${temp.color} opacity-80`} />

                      <div className="space-y-5">
                        {/* Top Code & Title Row */}
                        <div className="flex flex-wrap justify-between items-start gap-3">
                          <div>
                            <div className="flex items-center gap-3">
                              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono group-hover:text-indigo-600 transition-colors">
                                {typeObj.code}
                              </span>
                              <span className="text-xs font-extrabold uppercase tracking-widest bg-slate-100 text-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200">
                                {typeObj.title}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-slate-400 block mt-1">
                              {typeObj.mythologicalArchetype || "The Archetype"}
                            </span>
                          </div>

                          <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${temp.themeBg} ${temp.themeBorder} ${temp.themeText}`}>
                            {temp.badge}
                          </span>
                        </div>

                        {/* Cognitive Function Stack Preview */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1">Stack:</span>
                          {typeObj.stack.map((s, idx) => (
                            <span 
                              key={idx} 
                              className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700"
                              title={`${s.rank}: ${s.name} - ${s.role}`}
                            >
                              {s.function}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium line-clamp-3">
                          {typeObj.desc}
                        </p>

                        {/* Core Values */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {typeObj.coreValues?.slice(0, 4).map((val, idx) => (
                            <span key={idx} className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/60">
                              {val}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                        <Link
                          to={`/wiki/mbti/${typeObj.code.toLowerCase()}`}
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 group-hover:translate-x-0.5 transition-all"
                        >
                          <span>Explore Chapter</span>
                          <ArrowRight className="w-4 h-4 text-indigo-500" />
                        </Link>

                        <Link
                          to="/test/mbti"
                          className="text-xs font-bold text-slate-400 hover:text-slate-700 transition"
                        >
                          Assess Compatibility →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* FRAMEWORK 2: ENNEAGRAM (9 TYPES) */}
          {/* ========================================================= */}
          {activeFramework === 'enneagram' && (
            <Motion.div
              key="enneagram-framework"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="bg-white border border-slate-200/80 p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Compass className="w-6 h-6 text-amber-500" />
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">Enneagram 9 Core Motivations</h2>
                  </div>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    The Enneagram explores the subconscious instincts that drive our fears, desires, and decision patterns across 3 Centers (Gut, Heart, and Head).
                  </p>
                </div>

                <Link
                  to="/test/enneagram"
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-wider rounded-full transition shadow-xs flex items-center gap-2 shrink-0"
                >
                  <span>Take Enneagram Test</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 9 Enneagram Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {enneagramList.map((type) => (
                  <div 
                    key={type.num}
                    className="bg-white border border-slate-200/80 p-8 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_10px_35px_rgb(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center font-mono font-black text-xl text-amber-700 shadow-2xs group-hover:scale-105 transition-transform">
                          {type.num}
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                          {type.center}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-slate-900">{type.name}</h3>
                        <p className="text-xs font-bold text-slate-400 mt-0.5">Type {type.num}</p>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed font-medium line-clamp-3">
                        {type.description}
                      </p>

                      {/* Core Desire & Fear */}
                      <div className="space-y-2 pt-2 text-xs">
                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                          <span className="font-black text-emerald-800 block uppercase text-[10px]">Core Desire</span>
                          <span className="text-emerald-950 font-semibold">{type.coreDesire}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                          <span className="font-black text-rose-800 block uppercase text-[10px]">Core Fear</span>
                          <span className="text-rose-950 font-semibold">{type.coreFear}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                      <span>Wings: {type.wings?.join(', ')}</span>
                      <span>Growth: → {type.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* FRAMEWORK 3: MORAL ALIGNMENT (3x3 MATRIX) */}
          {/* ========================================================= */}
          {activeFramework === 'alignment' && (
            <Motion.div
              key="alignment-framework"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="bg-white border border-slate-200/80 p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-emerald-500" />
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">Moral Alignment Matrix (3x3)</h2>
                  </div>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Click any alignment in the grid below to inspect its philosophy, moral quote, strengths, and weaknesses.
                  </p>
                </div>

                <Link
                  to="/test/alignment"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-full transition shadow-xs flex items-center gap-2 shrink-0"
                >
                  <span>Take Alignment Test</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 3x3 Grid + Detail Inspector Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 3x3 Matrix (7 cols) */}
                <div className="lg:col-span-7 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">Interactive 3x3 Alignment Grid</span>
                  
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                    {alignmentList.map((align) => {
                      const isSelected = selectedAlignment === align.id;
                      return (
                        <button
                          key={align.id}
                          type="button"
                          onClick={() => setSelectedAlignment(align.id)}
                          className={`p-3 sm:p-6 rounded-2xl sm:rounded-3xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[76px] sm:min-h-[96px] space-y-1 ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.03] ring-2 ring-emerald-500'
                              : 'bg-slate-50/80 text-slate-800 border-slate-200 hover:bg-emerald-50 hover:border-emerald-200'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-black tracking-tight leading-tight">{align.name}</span>
                          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {align.shortName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Detail Inspector Box (5 cols) */}
                <div className="lg:col-span-5 bg-white border border-slate-200/80 p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-600">Alignment Details</span>
                      <span className="text-xs font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
                        {activeAlignmentData.axis}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{activeAlignmentData.name}</h3>
                      <span className="text-xs font-bold text-slate-400">The {activeAlignmentData.shortName}</span>
                    </div>

                    <blockquote className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-700 italic text-sm font-medium leading-relaxed">
                      {activeAlignmentData.quote}
                    </blockquote>

                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {activeAlignmentData.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">Core Strengths</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeAlignmentData.strengths?.map((s, idx) => (
                          <span key={idx} className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/test/alignment"
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition text-center shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Discover Your Moral Alignment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* FRAMEWORK 4: RELATIONAL MODELS (ATTACHMENT & LOVE LANGUAGES) */}
          {/* ========================================================= */}
          {activeFramework === 'relational' && (
            <Motion.div
              key="relational-framework"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
              {/* Unified Framework Header Box */}
              <div className="bg-white border border-slate-200/80 p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-rose-500" />
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">Relational Psychology & Dynamics</h2>
                  </div>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Explore how adult attachment styles and love languages shape interpersonal communication, emotional safety, and intimacy.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    to="/test/attachment-styles"
                    className="px-5 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase tracking-wider rounded-full transition shadow-xs flex items-center gap-2"
                  >
                    <span>Test Attachment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/test/love-languages"
                    className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-full transition shadow-xs flex items-center gap-2"
                  >
                    <span>Test Love Languages</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Attachment Styles Section */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-500">Core Emotional Blueprints</span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">4 Attachment Styles</h3>
                  <p className="text-slate-500 text-sm font-medium">How early emotional security determines relationship reactions and intimacy boundaries.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attachmentList.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200/80 p-8 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xl font-black text-slate-900">{item.name}</h4>
                          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                            {item.shortName}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.description}</p>
                      </div>
                      
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                        <span className="font-black text-slate-500 uppercase text-[10px]">Communication Rhythm</span>
                        <p className="text-slate-700 font-medium">{item.communicationStyle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Love Languages Section */}
              <div className="space-y-6 pt-4 border-t border-slate-200/80">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600">Affection Channels</span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">5 Love Languages</h3>
                  <p className="text-slate-500 text-sm font-medium">The 5 distinct channels through which individuals express and receive affection.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {loveLanguagesList.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200/80 p-7 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">{item.shortName}</span>
                        <h4 className="text-lg font-black text-slate-900">{item.name}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium line-clamp-3">{item.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 text-xs">
                        <span className="text-slate-400 font-semibold">Desire: {item.coreDesire}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* FRAMEWORK 5: JUNGIAN ARCHETYPES (12 CLASSIC) */}
          {/* ========================================================= */}
          {activeFramework === 'jungian' && (
            <Motion.div
              key="jungian-framework"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="bg-white border border-slate-200/80 p-8 rounded-[2.5rem] shadow-[0_4px_25px_rgb(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">12 Classic Jungian Archetypes</h2>
                  </div>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Carl Jung's universal symbols and unconscious motifs that govern human ambition, storytelling, and identity.
                  </p>
                </div>

                <Link
                  to="/test/jungian-archetypes"
                  className="px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider rounded-full transition shadow-xs flex items-center gap-2 shrink-0"
                >
                  <span>Test Jungian Archetype</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {jungianList.map((arch) => (
                  <div key={arch.id} className="bg-white border border-slate-200/80 p-7 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase tracking-wider text-purple-600">{arch.shortName}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900">{arch.name}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">{arch.description}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs space-y-1">
                      <span className="font-black text-purple-800 uppercase block text-[10px]">Core Ambition:</span>
                      <p className="text-purple-950 font-semibold">{arch.coreDesire}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
