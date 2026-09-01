import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Heart, Zap, Sparkles, Target, Users, ShieldAlert,
  Flame, RefreshCw, Compass, ArrowRight, Download, Check, HelpCircle,
  CheckCircle2, AlertTriangle, MessageCircle, Shield, Brain, Quote, Activity
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { dereTypes } from '../utils/dereLogic';

export default function DereResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const resultData = useMemo(() => {
    let stateData = location.state?.resultData;
    if (!stateData && type) {
      const matched = dereTypes[type.toLowerCase()];
      if (matched) {
        const secondary = matched.id === 'kuudere' ? dereTypes.tsundere : dereTypes.kuudere;
        stateData = {
          primaryType: matched,
          secondaryType: secondary,
          hybridTitle: `${matched.name} with ${secondary.name} undertones`,
          percentages: { [matched.id]: 88, [secondary.id]: 65, deredere: 52, dandere: 45, sadodere: 38 },
          breakdown: Object.values(dereTypes).map(t => ({
            id: t.id,
            name: t.name,
            title: t.title,
            percentage: t.id === matched.id ? 88 : t.id === secondary.id ? 65 : Math.floor(Math.random() * 40) + 20,
            color: t.color,
            textClass: t.textClass
          })).sort((a, b) => b.percentage - a.percentage)
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_dere', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData || !resultData.primaryType) {
    return <Navigate to="/test/dere" replace />;
  }

  const { primaryType, secondaryType, hybridTitle, breakdown } = resultData;
  const primaryPercentage = breakdown.find(b => b.id === primaryType.id)?.percentage || 88;

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, { 
        quality: 0.95,
        backgroundColor: '#ffffff',
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = `omnitype-dere-${primaryType.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card image', err);
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Psychology', icon: Sparkles },
    { id: 'spectrum', label: '10-Type Spectrum', icon: Activity },
    { id: 'behavior', label: 'Public vs. Private', icon: Heart },
    { id: 'compatibility', label: 'Synergy & Dynamics', icon: Users }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 pt-28 md:pt-36 px-4 sm:px-8 md:px-12 relative text-slate-800 font-sans selection:bg-rose-100">
      
      {/* Subtle Ambient Background */}
      <div className="fixed top-[-15vh] left-[-10vw] w-[60vw] h-[60vw] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">

        {/* Top Header & Navigation */}
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
              <Download className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isExporting ? 'Exporting...' : 'Export Card'}</span>
            </button>
            <Link
              to="/test/dere"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-black uppercase tracking-wider text-white shadow-xs transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
              <span>Retake Test</span>
            </Link>
          </div>
        </div>

        {/* Hero Card for Result Display & Export */}
        <div 
          ref={cardRef}
          className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden space-y-8"
        >
          {/* Accent Border Strip */}
          <div className={`absolute top-0 left-0 w-3 h-full bg-linear-to-b ${primaryType.color}`} />

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {primaryType.japaneseName}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Primary Dere Archetype
                </span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {primaryPercentage}% Dominance
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
                  {primaryType.name}
                  <span className="text-rose-500 font-serif italic text-2xl sm:text-4xl ml-3 font-normal">
                    — {primaryType.title}
                  </span>
                </h1>
                <p className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-wider">
                  Hybrid Blend: {hybridTitle}
                </p>
              </div>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                {primaryType.description}
              </p>
            </div>

            {/* Signature Quote Callout */}
            <div className="w-full lg:w-96 p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 space-y-3 shrink-0 relative">
              <Quote className="w-6 h-6 text-slate-300 absolute top-4 right-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                Signature Phrase
              </span>
              <blockquote className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed pr-6">
                {primaryType.signatureQuote}
              </blockquote>
            </div>
          </div>

          {/* Key Trait Matrix Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Love Language</span>
              <p className="text-xs sm:text-sm font-black text-slate-900">{primaryType.loveLanguage}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Defense Pattern</span>
              <p className="text-xs sm:text-sm font-black text-slate-900">{primaryType.defenseMechanism}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Core Relational Driver</span>
              <p className="text-xs sm:text-sm font-black text-slate-900">{primaryType.relationalDriver}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pb-2 pt-1 border-b border-slate-200/80">
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
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Contents */}
        <AnimatePresence mode="wait">

          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW & PSYCHOLOGY */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <Motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Strengths & Vulnerabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Core Strengths */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Relational Superpowers</h3>
                      <span className="text-xs font-bold text-slate-400">Natural strengths and loyalty assets</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {primaryType.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vulnerabilities & Growth */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Blindspots & Defense Triggers</h3>
                      <span className="text-xs font-bold text-slate-400">Vulnerabilities to be conscious of</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {primaryType.vulnerabilities.map((vuln, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2" />
                        <span>{vuln}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Partner Connection Guide (Do's & Don'ts) */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block">Communication Playbook</span>
                  <h3 className="text-2xl font-black text-slate-900">How to Connect with a {primaryType.name}</h3>
                  <p className="text-slate-500 text-sm font-medium">Practical guidance for partners and friends building a deeper bond.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Recommended Approach (Do's)</span>
                    </div>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                      {primaryType.partnerGuide.do}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200/70 space-y-3">
                    <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>Pitfalls to Avoid (Don'ts)</span>
                    </div>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                      {primaryType.partnerGuide.dont}
                    </p>
                  </div>
                </div>
              </div>

              {/* Famous Character Archetypes */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">Famous Archetype Examples in Pop Culture</span>
                <div className="flex flex-wrap gap-2.5">
                  {primaryType.famousExamples.map((name, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200/80">
                      ★ {name}
                    </span>
                  ))}
                </div>
              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: 10-TYPE SPECTRUM BREAKDOWN */}
          {/* ========================================================= */}
          {activeTab === 'spectrum' && (
            <Motion.div
              key="spectrum-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Your Full -dere Spectrum Distribution</h3>
                  <p className="text-slate-500 text-sm font-medium">Ranked score distribution across all 10 relational dimensions.</p>
                </div>

                <div className="space-y-5">
                  {breakdown.map((item) => {
                    const isTop = item.id === primaryType.id;
                    const isSecond = item.id === secondaryType?.id;
                    return (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-black">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 text-sm font-extrabold">{item.name}</span>
                            <span className="text-slate-400 font-bold hidden sm:inline">({item.title})</span>
                            {isTop && (
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-wider border border-rose-200">
                                Primary Match
                              </span>
                            )}
                            {isSecond && (
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-wider border border-indigo-200">
                                Secondary Undertone
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-slate-900 text-sm font-bold">{item.percentage}%</span>
                        </div>

                        <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
                          <Motion.div
                            className={`h-full rounded-full bg-linear-to-r ${item.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hybrid Blend Insight */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 mt-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 block">Hybrid Spectrum Insight</span>
                  <h4 className="text-base font-black text-slate-900">{hybridTitle}</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    Your core behavioral reflex is anchored in <strong className="text-slate-900">{primaryType.name}</strong> ({primaryType.tagline.toLowerCase()}), 
                    subtly shaded by <strong className="text-slate-900">{secondaryType.name}</strong> habits. This blend creates a nuanced interpersonal balance between your primary protective instincts and secondary emotional expressions.
                  </p>
                </div>
              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PUBLIC VS. PRIVATE BEHAVIOR */}
          {/* ========================================================= */}
          {activeTab === 'behavior' && (
            <Motion.div
              key="behavior-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Public Persona */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block">Social Settings</span>
                  <h3 className="text-2xl font-black text-slate-900">In Public Settings</h3>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    {primaryType.publicVsPrivate.inPublic}
                  </p>
                </div>

                {/* Private Intimacy */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <span className="text-xs font-black uppercase tracking-widest text-rose-500 block">One-on-One Intimacy</span>
                  <h3 className="text-2xl font-black text-slate-900">In Private Intimacy</h3>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    {primaryType.publicVsPrivate.inPrivate}
                  </p>
                </div>

              </div>

              {/* Caught Off Guard / When Flustered */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-amber-600 block">Reflex Reaction</span>
                <h3 className="text-2xl font-black text-slate-900">When Flustered or Caught Off Guard</h3>
                <p className="text-slate-700 text-base font-medium leading-relaxed">
                  {primaryType.flusteredReaction}
                </p>
              </div>

              {/* Emotional Safety Blueprint */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block">De-escalation & Safety</span>
                <h3 className="text-2xl font-black text-slate-900">Creating Emotional Safety</h3>
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  To help a {primaryType.name} feel completely comfortable, consistency and psychological safety are paramount. 
                  When they exhibit their characteristic defense mechanism ({primaryType.defenseMechanism.toLowerCase()}), avoid escalating or demanding immediate vulnerability. 
                  Gentle presence and reliable actions create the calm harbor required for their true affection to surface.
                </p>
              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: COMPATIBILITY & SYNERGY */}
          {/* ========================================================= */}
          {activeTab === 'compatibility' && (
            <Motion.div
              key="compatibility-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* High Synergy Pairings */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block">Natural Harmony</span>
                    <h3 className="text-2xl font-black text-slate-900">High Synergy Pairings</h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Complementary archetypes that bring out their best relational side.</p>
                  </div>

                  <div className="space-y-4">
                    {primaryType.compatibilityDetails?.highSynergy?.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900">{item.name}</span>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            High Synergy
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Growth Challenge Pairings */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-600 block">Growth Friction</span>
                    <h3 className="text-2xl font-black text-slate-900">Challenging Pairings</h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">Pairings with potential friction points that require conscious communication.</p>
                  </div>

                  <div className="space-y-4">
                    {primaryType.compatibilityDetails?.growthChallenge?.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900">{item.name}</span>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            Growth Friction
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          {item.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Relational Dynamics Takeaway */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block">Relational Philosophy</span>
                <h3 className="text-2xl font-black text-slate-900">Navigating Compatibility</h3>
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  No archetype pairing is inherently doomed or guaranteed to succeed. 
                  Compatibility is built on understanding each other's defense reflexes, acknowledging differing love languages ({primaryType.loveLanguage}), 
                  and maintaining active curiosity rather than reacting defensively when triggers arise.
                </p>
              </div>
            </Motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
