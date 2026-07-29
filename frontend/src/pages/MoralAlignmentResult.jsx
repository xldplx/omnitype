import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Scale, Square, Crosshair, AlertTriangle, 
  CheckCircle2, Sparkles, Compass, Lightbulb, Users, Lock, RefreshCw, Eye
} from 'lucide-react';
import { alignmentMap } from '../utils/moralAlignmentLogic';

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
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-extrabold border border-emerald-100">Primary Axis</span>}
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

export default function MoralAlignmentResult() {
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
      if (alignmentMap[type]) {
        stateData = {
          alignment: alignmentMap[type],
          lcScore: 50,
          geScore: 50,
          scores: { lawChaos: 75, goodEvil: 85 }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_alignment', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/alignment" replace />;
  }

  const { alignment, scores } = resultData;
  const primaryColor = alignment.color || 'from-emerald-400 to-teal-500';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'metrics', label: 'Axis Metrics' },
    { id: 'grid', label: 'Ethical Grid' },
    { id: 'dynamics', label: 'Philosophical Dynamics' }
  ];

  // 3x3 Grid Definition
  const gridCells = [
    { row: 'Good', col: 'Lawful', id: 'lawful-good', label: 'LG' },
    { row: 'Good', col: 'Neutral', id: 'neutral-good', label: 'NG' },
    { row: 'Good', col: 'Chaotic', id: 'chaotic-good', label: 'CG' },
    
    { row: 'Neutral', col: 'Lawful', id: 'lawful-neutral', label: 'LN' },
    { row: 'Neutral', col: 'Neutral', id: 'true-neutral', label: 'TN' },
    { row: 'Neutral', col: 'Chaotic', id: 'chaotic-neutral', label: 'CN' },
    
    { row: 'Evil', col: 'Lawful', id: 'lawful-evil', label: 'LE' },
    { row: 'Evil', col: 'Neutral', id: 'neutral-evil', label: 'NE' },
    { row: 'Evil', col: 'Chaotic', id: 'chaotic-evil', label: 'CE' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-emerald-200">
      
      {/* Decorative Ambient Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${alignment.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${alignment.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
                        {alignment.name}
                      </h1>
                      
                      <p className="text-slate-600 max-w-4xl leading-relaxed font-medium text-base sm:text-lg md:text-xl mb-6">
                        {alignment.description}
                      </p>

                      <div className="pl-4 border-l-2 border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>"{alignment.quote}"</span>
                      </div>
                    </div>
                  </div>

                  {/* Standardized 2nd Box (4 Cols - Prominent & Centered) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <h2 className={`text-3xl sm:text-4xl md:text-5xl leading-tight font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b ${primaryColor} z-10 drop-shadow-sm pb-1`}>
                       {alignment.shortName}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Moral Archetype</span>
                  </div>

                </div>

                {/* 2. Dedicated Core Motivations Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Shield className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What Drives You (Ethical Imperative)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      {alignment.axis} alignment guiding principled action and societal impact.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Moral Violation)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      Compromising your internal moral compass or succumbing to tyranny and moral decay.
                    </p>
                  </div>
                </div>

                {/* 3. Axis Allocation Summary */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Moral & Ethical Axis Allocation</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Visual position across the Law-vs-Chaos and Good-vs-Evil spectrums.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <ResultBar
                      label="Law vs Chaos Axis"
                      value={scores.lawChaos}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={true}
                    />
                    <ResultBar
                      label="Good vs Evil Axis"
                      value={scores.goodEvil}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={false}
                    />
                  </div>
                </div>

                {/* 4. Strategic Strengths & Shadow Elements */}
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
                      {alignment.strengths?.map((item, idx) => (
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
                      {alignment.weaknesses?.map((item, idx) => (
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
            {/* TAB 2: AXIS METRICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'metrics' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Axis Spectrum Breakdown</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Detailed analysis of your Ethics Axis (Law & Order vs Chaos & Freedom) and Morals Axis (Altruism vs Selfishness).
                  </p>
                </div>

                {/* Main Progress Bars */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    <ResultBar
                      label="Ethics Axis (Law vs Chaos)"
                      value={scores.lawChaos}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={true}
                    />
                    <ResultBar
                      label="Morals Axis (Good vs Evil)"
                      value={scores.goodEvil}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={false}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Law vs Chaos Deep Dive */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Scale className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Ethics Axis (Law vs Chaos)</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      This axis measures your stance toward social structure, rules, and authority versus absolute individual freedom, adaptability, and rebellion.
                    </p>
                  </div>

                  {/* Good vs Evil Deep Dive */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xl font-black text-slate-900">Morals Axis (Good vs Evil)</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      This axis measures your altruism, empathy, and commitment to serving others versus personal gain, self-preservation, and pragmatic dominance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: ETHICAL GRID */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'grid' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">The 3x3 Moral Matrix Grid</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Visual positioning across all 9 classic alignment archetypes.
                  </p>
                </div>

                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                   <div className="w-full max-w-md aspect-square grid grid-cols-3 grid-rows-3 gap-3 relative z-10">
                      {gridCells.map((cell) => {
                        const isMatch = cell.id === alignment.id;
                        return (
                          <Motion.div 
                            key={cell.id}
                            initial={false}
                            animate={isMatch ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 0.5 }}
                            className={`
                              flex flex-col items-center justify-center rounded-2xl transition-all duration-300 font-black text-lg md:text-2xl tracking-tight p-4 shadow-sm text-center
                              ${isMatch 
                                ? `bg-linear-to-br ${primaryColor} text-white shadow-lg ring-4 ring-emerald-100` 
                                : 'bg-slate-50 text-slate-400 border border-slate-100'}
                            `}
                          >
                            <span>{cell.label}</span>
                            <span className="text-[0.65rem] font-bold uppercase tracking-wider mt-1 opacity-90">{cell.col} {cell.row}</span>
                          </Motion.div>
                        );
                      })}
                   </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: PHILOSOPHICAL DYNAMICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'dynamics' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Philosophical Dynamics & Ethical Growth</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    How your alignment manifests in team leadership, crisis management, and long-term ethical evolution.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hack 1 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Decision Framework</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      You evaluate choices through your internal compass first, weighing rules against consequences.
                    </p>
                  </div>

                  {/* Hack 2 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-2">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Crisis Conduct</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Under extreme pressure, you stick to your core convictions, rejecting short-term moral shortcuts.
                    </p>
                  </div>

                  {/* Hack 3 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Team Collaboration</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      You bring clarity, principled boundaries, and moral accountability to group endeavors.
                    </p>
                  </div>
                </div>

                {/* Philosophical Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-emerald-400" />
                    <h4 className="text-2xl font-black">Ethical Mastery Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    True moral maturity is not about rigid adherence to dogma nor total disregard for rules; it is the wisdom to wield principles with compassion and courage.
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
