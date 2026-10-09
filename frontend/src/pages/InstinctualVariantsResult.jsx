import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Target,
  Layers,
  Briefcase,
  Sparkles,
  Shield,
  Heart,
  EyeOff,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Quote,
  Activity,
  Compass
} from 'lucide-react';
import { toPng } from 'html-to-image';
import {
  instinctualVariantsTypes,
  STACKING_PROFILES,
  INSTINCTUAL_FIGURES
} from '../utils/instinctualVariantsLogic';

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

function ResultBar({ label, value, color, isPrimary, isSecondary, isBlindspot }) {
  const displayVal = Math.min(Math.max(value || 0, 0), 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-700">
        <span className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isPrimary
                ? 'bg-emerald-600 ring-4 ring-emerald-100'
                : isSecondary
                ? 'bg-indigo-500 ring-2 ring-indigo-100'
                : 'bg-slate-300'
            }`}
          />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && (
            <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold border border-emerald-200">
              Dominant
            </span>
          )}
          {isSecondary && (
            <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-extrabold border border-indigo-200">
              Support
            </span>
          )}
          {isBlindspot && (
            <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-extrabold border border-rose-200">
              Shadow
            </span>
          )}
        </span>
        <span className="font-mono text-slate-900 font-bold bg-slate-100 px-2.5 py-0.5 rounded-md text-xs">
          {displayVal}%
        </span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
        <Motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${displayVal}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function InstinctualVariantsResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);

  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const resultData = useMemo(() => {
    let stateData = location.state?.resultData;
    if (!stateData && type) {
      let foundTypeNum = 1;
      for (const [num, obj] of Object.entries(instinctualVariantsTypes)) {
        if (obj.id === type || obj.abbreviation === type.toLowerCase()) {
          foundTypeNum = parseInt(num);
          break;
        }
      }

      const secondaryNum = foundTypeNum === 1 ? 2 : foundTypeNum === 2 ? 3 : 1;
      const blindspotNum = 6 - foundTypeNum - secondaryNum;

      const primaryInfo = instinctualVariantsTypes[foundTypeNum];
      const secondaryInfo = instinctualVariantsTypes[secondaryNum];
      const blindspotInfo = instinctualVariantsTypes[blindspotNum];
      const stackingKey = `${primaryInfo.abbreviation}/${secondaryInfo.abbreviation}`;

      const breakdown = {};
      breakdown[foundTypeNum] = 92;
      breakdown[secondaryNum] = 74;
      breakdown[blindspotNum] = 38;

      stateData = {
        type: foundTypeNum,
        fullTitle: primaryInfo.shortName,
        info: primaryInfo,
        secondaryInfo,
        blindspot: blindspotInfo,
        stacking: stackingKey,
        stackingInfo: STACKING_PROFILES[stackingKey] || {
          title: `${primaryInfo.shortName} Dominant`,
          essence: `Prioritizes ${primaryInfo.primaryFocus.toLowerCase()} with secondary support from ${secondaryInfo.shortName.toLowerCase()}.`,
          dynamics: `Your dominant drive is ${primaryInfo.shortName}, followed by ${secondaryInfo.shortName}, with ${blindspotInfo.shortName} in the shadow.`
        },
        breakdown
      };
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_instinctual_variants', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/instinctual-variants" replace />;
  }

  const { info, secondaryInfo, blindspot, stacking, stackingInfo, breakdown, type: primaryTypeNum } = resultData;
  const primaryColor = info.color || 'from-emerald-500 to-teal-600';
  const figures = INSTINCTUAL_FIGURES[primaryTypeNum] || [];

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `omnitype-instinctual-${stacking.replace('/', '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export Instinctual Variants card image', err);
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Drivers', icon: Target },
    { id: 'stacking', label: 'Stacking & Blindspot', icon: Layers },
    { id: 'traits', label: 'Superpowers & Pitfalls', icon: Briefcase },
    { id: 'relationships', label: 'Relationships & Figures', icon: Sparkles }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 pt-28 md:pt-36 px-4 sm:px-8 md:px-12 relative text-slate-800 font-sans selection:bg-emerald-100">
      
      {/* Background ambient lighting */}
      <div className={`fixed top-[-15vh] left-[-10vw] w-[60vw] h-[60vw] ${info.bgLight} rounded-full blur-[140px] pointer-events-none opacity-70 z-0`} />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[60vw] h-[60vw] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Navigation Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-slate-900 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Test Directory</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadCard}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-700 shadow-2xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isExporting ? 'Exporting...' : 'Export Card'}</span>
            </button>

            <Link
              to="/test/instinctual-variants"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-black uppercase tracking-wider text-white shadow-xs transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
              <span>Retake Test</span>
            </Link>
          </div>
        </div>

        {/* Hero Result Card (Captured for Export) */}
        <div
          ref={cardRef}
          className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group space-y-8"
        >
          {/* Left Gradient Strip */}
          <div className={`absolute top-0 left-0 w-3 h-full bg-linear-to-b ${primaryColor}`} />

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border ${info.themeBg} ${info.themeBorder} ${info.themeText}`}>
                  Dominant: {info.name}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 font-mono">
                  Stacking: {stacking}
                </span>
                <span className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Shadow: {blindspot?.abbreviation}
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono uppercase">
                  {stacking}
                  <span className="text-emerald-600 font-sans italic text-2xl sm:text-4xl ml-3 font-normal">
                    — {stackingInfo?.title || info.shortName}
                  </span>
                </h1>
                <p className="text-sm sm:text-base font-bold text-emerald-600 uppercase tracking-wide">
                  {info.tagline}
                </p>
              </div>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                {info.description}
              </p>
            </div>

            {/* Quick Stats Pill Matrix */}
            <div className="w-full lg:w-96 p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 space-y-3 shrink-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                Instinctual Blueprint
              </span>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-500 font-bold">Dominant Drive</span>
                  <span className="text-emerald-700 font-extrabold">{info.shortName}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-500 font-bold">Secondary Support</span>
                  <span className="text-indigo-600 font-extrabold">{secondaryInfo?.shortName}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-500 font-bold">Repressed Blindspot</span>
                  <span className="text-rose-600 font-extrabold">{blindspot?.shortName}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-500 font-bold">Primary Focus</span>
                  <span className="text-slate-800 font-extrabold text-right max-w-[170px] truncate">{info.primaryFocus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Selector */}
        <div className="flex flex-wrap gap-2 md:gap-3 border-b border-slate-200/60 pb-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
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
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* ---------------------------------------------------- */}
            {/* TAB 1: OVERVIEW & DRIVERS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                
                {/* 1. Core Motivation Cards (What Drives You vs What You Avoid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-2.5 text-emerald-600">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">What Drives You (Core Desire)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      {info.coreDesire}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                      Your dominant instinct directs where your subconscious attention and life energy flow automatically each day.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-2.5 text-rose-500">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-rose-500" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Core Fear)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      {info.coreFear}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                      When your primary instinct feels threatened, your nervous system responds with stress or defensive behaviors.
                    </p>
                  </div>
                </div>

                {/* 2. Instinctual Domain & Zone Box */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{info.name} Domain</h3>
                      <span className="text-xs font-bold text-slate-400">Core Focus: {info.primaryFocus}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    The three instinctual variants represent biological survival drives translated into psychological habits. Your dominant variant acts as your primary operating system, absorbing 60-70% of your everyday focus.
                  </p>
                  <div className="pt-2">
                    <p className="text-slate-700 text-sm font-semibold bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <strong className="text-slate-900">Your Primary Psychological Zone:</strong> {info.coreZone}. You continually monitor, optimize, and protect this sphere before directing energy elsewhere.
                    </p>
                  </div>
                </div>

                {/* 3. Instinctual Energy Distribution */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Instinctual Energy Distribution</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated energy allocation across all three biological survival instincts.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[1, 2, 3].map((num) => {
                      const styleObj = instinctualVariantsTypes[num];
                      const val = breakdown[num] || 0;
                      const isPrimary = num === primaryTypeNum;
                      const isSecondary = num === secondaryInfo?.id ? true : false;
                      const isBlindspot = num === blindspot?.id ? true : false;

                      return (
                        <ResultBar
                          key={num}
                          label={styleObj.name}
                          value={val}
                          color={`bg-linear-to-r ${styleObj.color}`}
                          isPrimary={isPrimary}
                          isSecondary={isSecondary}
                          isBlindspot={isBlindspot}
                        />
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: STACKING & BLINDSPOT */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'stacking' && (
              <div className="space-y-8">
                
                {/* 1. Stacking Profile Breakdown */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center font-mono font-black text-xl text-emerald-700 uppercase">
                        {stacking}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">{stackingInfo?.title}</h3>
                        <span className="text-xs font-bold text-slate-400">Instinctual Stacking Profile</span>
                      </div>
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 font-mono">
                      {stacking}
                    </span>
                  </div>

                  <p className="text-slate-800 text-base sm:text-lg font-bold leading-relaxed">
                    {stackingInfo?.essence}
                  </p>

                  <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                    {stackingInfo?.dynamics}
                  </p>

                  {/* 3-Tier Stacking Sequence Visual */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800">1st (Dominant)</span>
                        <span className="text-xs font-mono font-black text-emerald-700 uppercase">{info.abbreviation}</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base">{info.shortName}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">Consumes the vast majority of your daily focus and instinctive reflexes.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800">2nd (Support)</span>
                        <span className="text-xs font-mono font-black text-indigo-700 uppercase">{secondaryInfo?.abbreviation}</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base">{secondaryInfo?.shortName}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">Acts as your flexible secondary resource, supporting your dominant drive without obsession.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-800">3rd (Shadow)</span>
                        <span className="text-xs font-mono font-black text-rose-700 uppercase">{blindspot?.abbreviation}</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base">{blindspot?.shortName}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed font-medium">Your neglected sphere; easily dismissed until unexpected friction demands attention.</p>
                    </div>
                  </div>
                </div>

                {/* 2. Blindspot & Shadow Integration Card */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                      <EyeOff className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-rose-500">Your Repressed Instinct</span>
                      <h4 className="text-2xl font-black text-slate-900">{blindspot?.name} Blindspot</h4>
                    </div>
                  </div>

                  <p className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed">
                    Because <strong className="text-slate-900">{blindspot?.name}</strong> is your lowest instinct, you naturally overlook this sphere of life until problems arise. You may perceive people who prioritize <strong className="text-slate-900">{blindspot?.coreDesire.toLowerCase()}</strong> as overly demanding or unnecessary because you prefer not to expend energy there.
                  </p>

                  <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.15)] rounded-2xl p-8 text-white space-y-3">
                    <div className="flex items-center gap-2.5 text-emerald-400">
                      <Compass className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">Shadow Integration Practice</span>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                      Consciously bringing small doses of <strong className="text-white">{blindspot?.shortName}</strong> awareness into your weekly routine restores psychological equilibrium. It prevents your dominant instinct (<strong className="text-emerald-400">{info.shortName}</strong>) from becoming an unbalanced, exhausting obsession.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: SUPERPOWERS & PITFALLS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'traits' && (
              <div className="space-y-8">
                
                {/* Strengths & Weaknesses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strengths Card */}
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Empowered Strengths</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.strengths?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses Card */}
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Unhealthy Pitfalls</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.weaknesses?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Workplace & Professional Role Card */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Workplace Collaboration & Professional Role</h3>
                      <span className="text-xs font-bold text-slate-400">How {info.shortName} approaches productivity and teams</span>
                    </div>
                  </div>

                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    {info.workplaceBehavior}
                  </p>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: RELATIONSHIPS & FIGURES */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'relationships' && (
              <div className="space-y-8">
                
                {/* Interpersonal & Romantic Filtering Card */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Interpersonal & Romantic Filtering</h3>
                      <span className="text-xs font-bold text-slate-400">Intimacy, expectations, and connection style</span>
                    </div>
                  </div>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    {info.relationshipDynamics}
                  </p>
                </div>

                {/* Instinctual Chemistry Guide */}
                <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-2.5 text-indigo-600">
                    <Activity className="w-5 h-5" />
                    <h4 className="text-lg font-black text-slate-900">Instinctual Compatibility Insights</h4>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                    Partners who share the same dominant instinct (e.g. SP with SP, or SX with SX) often experience effortless intuitive harmony regarding daily priorities. When partners have different dominant instincts, they bring valuable complementary balance, but must consciously respect why their partner prioritizes different life spheres.
                  </p>
                </div>

                {/* Archetypal Figures with Quotes (Matching MBTI & Enneagram result layout) */}
                {figures.length > 0 && (
                  <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                        <Quote className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">Iconic {info.shortName} Archetypes</h3>
                        <span className="text-xs font-bold text-slate-400">Historical leaders and cultural icons embodying this drive</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {figures.map((fig, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-200/70 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                        >
                          <div className="space-y-3">
                            <Quote className="w-6 h-6 text-emerald-500 opacity-60" />
                            <p className="text-slate-700 italic text-sm leading-relaxed font-medium">
                              "{fig.quote}"
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-200/60">
                            <h5 className="font-black text-slate-900 text-sm">{fig.name}</h5>
                            <span className="text-[11px] text-slate-400 font-bold">{fig.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </Motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
