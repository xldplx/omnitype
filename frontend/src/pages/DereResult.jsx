import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Heart, Zap, Sparkles, Target, Users, ShieldAlert,
  Flame, RefreshCw, Compass, ArrowRight, Download, Check, HelpCircle
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
        stateData = {
          primaryType: matched,
          secondaryType: dereTypes.kuudere,
          hybridTitle: `${matched.name} with Kuudere undertones`,
          percentages: { [matched.id]: 88, kuudere: 65, deredere: 52, dandere: 45, sadodere: 38 },
          breakdown: Object.values(dereTypes).map(t => ({
            id: t.id,
            name: t.name,
            title: t.title,
            percentage: t.id === matched.id ? 88 : Math.floor(Math.random() * 50) + 20,
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

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
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
    { id: 'overview', label: 'Overview & Strengths', icon: Sparkles },
    { id: 'spectrum', label: '10-Type Spectrum', icon: Compass },
    { id: 'behavior', label: 'Public vs. Private', icon: Heart },
    { id: 'compatibility', label: 'Synergy & Matching', icon: Users }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 pt-28 md:pt-36 px-4 sm:px-8 md:px-12 relative text-slate-800 font-sans selection:bg-rose-100">
      
      {/* Ambient background glow */}
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

        {/* Hero Card with Ref for Export */}
        <div 
          ref={cardRef}
          className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group space-y-8"
        >
          {/* Left Gradient Strip */}
          <div className={`absolute top-0 left-0 w-3 h-full bg-linear-to-b ${primaryType.color}`} />

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {primaryType.japaneseName}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Primary Archetype
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
                  {primaryType.name}
                  <span className="text-rose-500 font-serif italic text-3xl sm:text-4xl ml-3 font-normal">
                    — {primaryType.title}
                  </span>
                </h1>
                <p className="text-sm sm:text-base font-bold text-indigo-600 uppercase tracking-wide">
                  Hybrid Blend: {hybridTitle}
                </p>
              </div>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                {primaryType.description}
              </p>
            </div>

            {/* Signature Quote Glass Box */}
            <div className="w-full lg:w-96 p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 space-y-3 shrink-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                Signature Catchphrase
              </span>
              <blockquote className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
                {primaryType.signatureQuote}
              </blockquote>
            </div>
          </div>
        </div>

        {/* Tab Navigation Grid (Full width on Desktop, responsive wrap on Mobile) */}
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
          {/* TAB 1: OVERVIEW & STRENGTHS */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Core Strengths */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Core Superpowers</h3>
                      <span className="text-xs font-bold text-slate-400">Natural strengths & relational assets</span>
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

                {/* Vulnerabilities / Blindspots */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      !
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Vulnerabilities & Growth</h3>
                      <span className="text-xs font-bold text-slate-400">Emotional blindspots & defense triggers</span>
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

              {/* Famous Character Archetypes */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">Famous Archetype Examples</span>
                <div className="flex flex-wrap gap-2.5">
                  {primaryType.famousExamples.map((name, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-800 font-black text-xs uppercase tracking-wider border border-slate-200/80">
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
                  <p className="text-slate-500 text-sm font-medium">How your personality scored across all 10 archetype dimensions.</p>
                </div>

                <div className="space-y-5">
                  {breakdown.map((item) => {
                    const isTop = item.id === primaryType.id;
                    const isSecond = item.id === secondaryType?.id;
                    return (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-black">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 text-sm">{item.name}</span>
                            <span className="text-slate-400 font-bold">({item.title})</span>
                            {isTop && (
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-wider border border-rose-200">
                                Primary Match
                              </span>
                            )}
                            {isSecond && (
                              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-wider border border-indigo-200">
                                Secondary
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-slate-900 text-sm">{item.percentage}%</span>
                        </div>

                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
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
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-600 block">External Mask</span>
                  <h3 className="text-2xl font-black text-slate-900">In Public Settings</h3>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    {primaryType.publicVsPrivate.inPublic}
                  </p>
                </div>

                {/* Private Intimacy */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <span className="text-xs font-black uppercase tracking-widest text-rose-500 block">Unfiltered Heart</span>
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
                
                {/* High Synergy Matches */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-600 block">Natural Harmony</span>
                    <h3 className="text-2xl font-black text-slate-900">High Synergy Pairings</h3>
                  </div>

                  <div className="space-y-3">
                    {primaryType.compatibility.highSynergy.map((targetId) => {
                      const target = dereTypes[targetId];
                      if (!target) return null;
                      return (
                        <Link
                          key={targetId}
                          to={`/result/dere/${target.id}`}
                          className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50 hover:border-emerald-200 transition group"
                        >
                          <div>
                            <span className="text-sm font-black text-slate-900 block group-hover:text-emerald-800">{target.name}</span>
                            <span className="text-xs font-medium text-slate-400">{target.title}</span>
                          </div>
                          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                            Explore →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Growth Challenge Pairings */}
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-600 block">Growth Potential</span>
                    <h3 className="text-2xl font-black text-slate-900">Challenging Pairings</h3>
                  </div>

                  <div className="space-y-3">
                    {primaryType.compatibility.growthChallenge.map((targetId) => {
                      const target = dereTypes[targetId];
                      if (!target) return null;
                      return (
                        <Link
                          key={targetId}
                          to={`/result/dere/${target.id}`}
                          className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-amber-50 hover:border-amber-200 transition group"
                        >
                          <div>
                            <span className="text-sm font-black text-slate-900 block group-hover:text-amber-800">{target.name}</span>
                            <span className="text-xs font-medium text-slate-400">{target.title}</span>
                          </div>
                          <span className="text-xs font-black uppercase tracking-wider text-amber-600 group-hover:translate-x-0.5 transition-transform">
                            Explore →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </div>
            </Motion.div>
          )}

        </AnimatePresence>

        {/* Bottom Switcher: Explore All 10 Archetypes */}
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Explore All 10 Archetypes</h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">Jump directly to inspect any archetype profile.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
            {Object.values(dereTypes).map((arch) => (
              <Link
                key={arch.id}
                to={`/result/dere/${arch.id}`}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  arch.id === primaryType.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-50 text-slate-800 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-black">{arch.name}</span>
                <span className="text-[10px] font-bold text-slate-400 truncate w-full">{arch.japaneseName}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
