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
  Brain,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Quote,
  Users,
  Compass,
  Zap
} from 'lucide-react';
import { toPng } from 'html-to-image';
import {
  enneagramTypes,
  ARCHETYPE_FIGURES,
  CENTER_DETAILS
} from '../utils/enneagramResultLogic';

function formatMarkdown(text) {
  if (!text) return "";
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return <strong key={idx} className="text-slate-900 font-bold">{part}</strong>;
    }
    return part;
  });
}

function ResultBar({ label, value, color, isPrimary, isWing }) {
  const displayVal = Math.min(Math.max(value || 0, 0), 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-700">
        <span className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isPrimary
                ? 'bg-indigo-600 ring-4 ring-indigo-100'
                : isWing
                ? 'bg-rose-500 ring-2 ring-rose-100'
                : 'bg-slate-300'
            }`}
          />
          <span className={isPrimary ? 'text-slate-900 font-bold' : 'text-slate-700'}>{label}</span>
          {isPrimary && (
            <span className="label-micro px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
              <span className="text-indigo-600">Primary</span>
            </span>
          )}
          {isWing && (
            <span className="label-micro px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100">
              <span className="text-rose-600">Wing</span>
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

export default function EnneagramResult() {
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
      const parts = type.toLowerCase().split('w');
      const primaryStr = parts[0];
      const wingStr = parts[1];

      const primaryTypeNum = parseInt(primaryStr);
      const wingTypeNum = wingStr ? parseInt(wingStr) : null;

      if (!isNaN(primaryTypeNum) && enneagramTypes[primaryTypeNum]) {
        // Fallback synthetic breakdown for direct link or refresh
        const breakdown = {};
        for (let i = 1; i <= 9; i++) {
          if (i === primaryTypeNum) breakdown[i] = 95;
          else if (i === wingTypeNum) breakdown[i] = 78;
          else breakdown[i] = Math.floor(((i * 17) % 45) + 30);
        }

        const validWing = wingTypeNum || enneagramTypes[primaryTypeNum].wings[0];

        stateData = {
          type: primaryTypeNum,
          wing: validWing,
          fullTitle: `${primaryTypeNum}w${validWing}`,
          info: enneagramTypes[primaryTypeNum],
          breakdown
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_enneagram', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/enneagram" replace />;
  }

  const { info, fullTitle, breakdown, type: primaryTypeNum, wing: wingTypeNum } = resultData;
  const primaryColor = info.color || 'from-indigo-500 to-purple-600';
  const _wingInfo = wingTypeNum ? enneagramTypes[wingTypeNum] : null;
  const wingSubtype = info.wingSubtypes?.[wingTypeNum] || {
    title: `${primaryTypeNum}w${wingTypeNum}: The Hybrid`,
    subtitle: `Blends Type ${primaryTypeNum}'s core motivation with Type ${wingTypeNum}'s complementary qualities.`
  };

  const centerKey = info.centerShort || (info.center.includes('Gut') ? 'Gut' : info.center.includes('Heart') ? 'Heart' : 'Head');
  const centerDetail = CENTER_DETAILS[centerKey] || CENTER_DETAILS['Gut'];
  const figures = ARCHETYPE_FIGURES[primaryTypeNum] || [];

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `omnitype-enneagram-${fullTitle.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export Enneagram card image', err);
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Motivations', icon: Target },
    { id: 'wing', label: 'Wing Dynamics & Centers', icon: Layers },
    { id: 'traits', label: 'Superpowers & Careers', icon: Briefcase },
    { id: 'growth', label: 'Growth, Stress & Figures', icon: Sparkles }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-32 pt-28 md:pt-36 px-4 sm:px-8 md:px-12 relative text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* Background ambient lighting */}
      <div className={`fixed top-[-15vh] left-[-10vw] w-[60vw] h-[60vw] ${info.bgLight} rounded-full blur-[140px] pointer-events-none opacity-70 z-0`} />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[60vw] h-[60vw] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Navigation Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 label-micro transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hover:text-slate-900">Test Directory</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadCard}
              disabled={isExporting}
              className="pill pill-muted cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isExporting ? 'Exporting...' : 'Export Card'}</span>
            </button>

            <Link
              to="/test/enneagram"
              className="btn-dark px-4 py-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
              <span>Retake Test</span>
            </Link>
          </div>
        </div>

        {/* Hero Result Card (Captured for Export) */}
        <div
          ref={cardRef}
          className="surface-card p-8 md:p-12 relative overflow-hidden group space-y-8"
        >
          {/* Left Gradient Strip */}
          <div className={`absolute top-0 left-0 w-3 h-full bg-linear-to-b ${primaryColor}`} />

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className={`label-micro px-3.5 py-1 rounded-full border ${info.themeBg} ${info.themeBorder}`}>
                  <span className={info.themeText}>{centerDetail.badge}</span>
                </span>
                <span className="label-micro px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60">
                  Core Type {primaryTypeNum} • Wing {wingTypeNum}
                </span>
                <span className="label-micro-muted">
                  {info.harmonic} Triad
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="heading-display text-4xl sm:text-6xl">
                  {fullTitle}
                  <span className="text-indigo-600 font-sans italic text-2xl sm:text-4xl ml-3 font-normal">
                    — {info.name}
                  </span>
                </h1>
                <p className="font-display text-sm sm:text-base font-bold text-indigo-600 uppercase tracking-wide">
                  {info.tagline}
                </p>
              </div>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                {info.description}
              </p>
            </div>

            {/* Quick Stats Pill Matrix */}
            <div className="w-full lg:w-96 surface-glass rounded-3xl p-6 space-y-3 shrink-0">
              <span className="label-micro-muted block">
                Enneagram Architecture
              </span>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-500 font-bold">Center of Intelligence</span>
                  <span className="text-slate-900 font-bold">{info.center}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-500 font-bold">Dominant Subtype</span>
                  <span className="text-indigo-600 font-bold">{wingSubtype.title.split(':')[1]?.trim() || `Wing ${wingTypeNum}`}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-500 font-bold">Growth Line (Security)</span>
                  <span className="text-emerald-700 font-bold">→ Type {info.growth}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                  <span className="text-slate-500 font-bold">Stress Line (Pressure)</span>
                  <span className="text-rose-600 font-bold">→ Type {info.stress}</span>
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
                className={`pill transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'pill-active'
                    : 'pill-muted'
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
            {/* TAB 1: OVERVIEW & MOTIVATIONS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                
                {/* 1. Core Motivation Cards (What Drives You vs What You Avoid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="surface-card p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-2.5 text-emerald-600">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="label-micro"><span className="text-emerald-600">What Drives You (Core Desire)</span></span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      {info.coreDesire}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                      This represents your unconscious compass—the primary psychological fuel guiding what you build, pursue, and protect in your everyday choices.
                    </p>
                  </div>

                  <div className="surface-card p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-2.5 text-rose-500">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-rose-500" />
                      </div>
                      <span className="label-micro"><span className="text-rose-500">What You Avoid (Core Fear)</span></span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      {info.coreFear}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                      This is the subconscious trigger that activates your anxiety and defense mechanisms when you feel depleted, threatened, or out of control.
                    </p>
                  </div>
                </div>

                {/* 2. Center of Intelligence Feature Box */}
                <div className="surface-card p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="heading-display text-xl">{centerDetail.name} Alignment</h3>
                      <span className="label-micro-muted">{centerDetail.theme}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    {centerDetail.description}
                  </p>
                  <div className="pt-2">
                    <p className="text-slate-700 text-sm font-semibold bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <strong className="text-slate-900">How Type {primaryTypeNum} processes this:</strong> {info.centerExplanation}
                    </p>
                  </div>
                </div>

                {/* 3. Enneagram Type Allocation Statistics */}
                <div className="surface-card p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="heading-display text-2xl">Enneagram Score Allocation</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated affinity across all 9 Enneagram archetypes based on your assessment answers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                      const archObj = enneagramTypes[num];
                      const val = breakdown[num] || 0;
                      const isPrimary = num === primaryTypeNum;
                      const isWing = num === wingTypeNum;

                      return (
                        <ResultBar
                          key={num}
                          label={`Type ${num}: ${archObj.name}`}
                          value={val}
                          color={`bg-linear-to-r ${archObj.color}`}
                          isPrimary={isPrimary}
                          isWing={isWing}
                        />
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: WING DYNAMICS & CENTERS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'wing' && (
              <div className="space-y-8">
                
                {/* 1. Dominant Wing Spotlight */}
                <div className="surface-card p-8 md:p-12 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-mono font-bold text-xl text-indigo-600">
                        w{wingTypeNum}
                      </div>
                      <div>
                        <h3 className="heading-display text-2xl">{wingSubtype.title}</h3>
                        <span className="label-micro-muted">Your Dominant Wing Subtype</span>
                      </div>
                    </div>
                    <span className="label-micro px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/60">
                      Wing Influence
                    </span>
                  </div>

                  <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed">
                    {wingSubtype.subtitle}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {info.wings?.map((candWing) => {
                      const isDominant = candWing === wingTypeNum;
                      const sub = info.wingSubtypes?.[candWing];
                      return (
                        <div
                          key={candWing}
                          className={`p-6 rounded-2xl border transition-all ${
                            isDominant
                              ? 'bg-indigo-50/50 border-indigo-200 shadow-2xs'
                              : 'bg-slate-50 border-slate-100 opacity-80'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-slate-900">{sub?.title}</span>
                            {isDominant && (
                              <span className="label-micro px-2 py-0.5 rounded-full bg-indigo-600">
                                <span className="text-white">Active Wing</span>
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                            {sub?.subtitle}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Harmonic & Hornevian Triads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Harmonic Triad */}
                  <div className="surface-card p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                        <Compass className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <h4 className="heading-display text-xl">{info.harmonic} Triad</h4>
                        <span className="label-micro-muted">Harmonic Coping Style</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                      {info.harmonicExplanation}
                    </p>
                  </div>

                  {/* Hornevian Stance */}
                  <div className="surface-card p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="heading-display text-xl">{info.hornevian} Stance</h4>
                        <span className="label-micro-muted">Social Interpersonal Reflex</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                      {info.hornevianExplanation}
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: SUPERPOWERS & CAREERS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'traits' && (
              <div className="space-y-8">
                
                {/* Strengths & Weaknesses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strengths Card */}
                  <div className="surface-card p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="heading-display text-xl">Key Superpowers</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.strengths?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Growth Areas Card */}
                  <div className="surface-card p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="heading-display text-xl">Blindspots & Pitfalls</h3>
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

                {/* Career & Work Environment */}
                <div className="surface-card p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="heading-display text-xl">Professional Flow & Career Environments</h3>
                      <span className="label-micro-muted">Where Type {primaryTypeNum} naturally thrives</span>
                    </div>
                  </div>

                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    {info.workplaceBehavior}
                  </p>

                  {info.idealCareers && (
                    <div className="pt-2 space-y-3">
                      <span className="label-micro-muted block">
                        Recommended Career Pathways:
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {info.idealCareers.map((career, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 transition"
                          >
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: GROWTH, STRESS & FIGURES */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'growth' && (
              <div className="space-y-8">
                
                {/* Integration & Disintegration Mechanics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Growth (Integration) */}
                  <div className="surface-card p-8 md:p-12 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="label-micro bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 rounded-full flex items-center gap-1.5">
                        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Growth (Integration) → Type {info.growth}</span>
                      </span>
                    </div>

                    <h4 className="heading-display text-2xl">When Thriving & Centered</h4>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.growthDetails || `In relaxation and self-awareness, you naturally take on the healthiest attributes of Type ${info.growth} (${enneagramTypes[info.growth]?.name}).`}
                    </p>

                    <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl space-y-1.5">
                      <span className="label-micro"><span className="text-emerald-800">Growth Direction Breakthrough:</span></span>
                      <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                        Leaning toward Type {info.growth} brings balance, emotional freedom, and resilience beyond your routine fixations.
                      </p>
                    </div>
                  </div>

                  {/* Stress (Disintegration) */}
                  <div className="surface-card p-8 md:p-12 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="label-micro bg-rose-50 border border-rose-200/60 px-3.5 py-1 rounded-full flex items-center gap-1.5">
                        <ArrowDownRight className="w-4 h-4 text-rose-600" />
                        <span className="text-rose-700">Stress (Disintegration) → Type {info.stress}</span>
                      </span>
                    </div>

                    <h4 className="heading-display text-2xl">Under Chronic Pressure</h4>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.stressDetails || `When overwhelmed or feeling unsupported, you unconsciously slide into the defense strategies of Type ${info.stress} (${enneagramTypes[info.stress]?.name}).`}
                    </p>

                    <div className="bg-rose-50/60 border border-rose-100 p-4 rounded-2xl space-y-1.5">
                      <span className="label-micro"><span className="text-rose-800">Early Warning Trigger:</span></span>
                      <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                        Notice when reactive habits start showing up; it is an immediate somatic signal that your boundaries need gentle reset.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Practical Development Advice Banner */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.15)] rounded-[2.5rem] p-8 md:p-12 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-indigo-400" />
                    <h4 className="text-2xl font-bold">Self-Development Tip for Type {primaryTypeNum}</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    Growth begins with noticing when your core fear of <span className="text-white font-bold">"{info.coreFear.toLowerCase()}"</span> takes the steering wheel. Intentionally cultivate the grounded presence of <strong className="text-indigo-300">Type {info.growth}</strong> to stay centered and clear.
                  </p>
                </div>

                {/* Relationship Dynamics Card */}
                <div className="surface-card p-8 md:p-12 space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="heading-display text-xl">In Romantic Relationships</h3>
                      <span className="label-micro-muted">Connection, intimacy, and communication style</span>
                    </div>
                  </div>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    {info.relationshipDynamics}
                  </p>
                </div>

                {/* Archetypal Figures with Quotes (Matching MBTI result layout) */}
                {figures.length > 0 && (
                  <div className="surface-card p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                        <Quote className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="heading-display text-xl">Iconic Type {primaryTypeNum} Archetypes</h3>
                        <span className="label-micro-muted">Historical leaders and cultural icons sharing your essence</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {figures.map((fig, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-200/70 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                        >
                          <div className="space-y-3">
                            <Quote className="w-6 h-6 text-indigo-400 opacity-60" />
                            <p className="text-slate-700 italic text-sm leading-relaxed font-medium">
                              "{fig.quote}"
                            </p>
                          </div>
                          <div className="pt-3 border-t border-slate-200/60">
                            <h5 className="heading-display text-sm">{fig.name}</h5>
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
