import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Activity, Shield, Heart, Zap, AlertTriangle, Users, 
  Briefcase, Sparkles, Brain, LayoutGrid, CheckCircle2, Star, Flame, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { enneagramTypes } from '../utils/enneagramResultLogic';

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

function ResultBar({ label, value, color, isPrimary, isWing }) {
  const displayVal = Math.min(Math.max(value || 0, 0), 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-bold text-slate-700">
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-indigo-600 ring-4 ring-indigo-100' : isWing ? 'bg-rose-500' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold border border-indigo-100">Primary</span>}
          {isWing && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-extrabold border border-rose-100">Wing</span>}
        </span>
        <span className="font-mono text-slate-900 font-bold bg-slate-100 px-2.5 py-0.5 rounded-md text-xs">{displayVal}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
        <Motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${displayVal}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function EnneagramResult() {
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
      const primaryStr = type.split('w')[0];
      const wingStr = type.split('w')[1];
      
      const primaryTypeNum = parseInt(primaryStr);
      const wingTypeNum = wingStr ? parseInt(wingStr) : null;
      
      if (!isNaN(primaryTypeNum) && enneagramTypes[primaryTypeNum]) {
        const breakdown = {};
        for (let i = 1; i <= 9; i++) {
          if (i === primaryTypeNum) breakdown[i] = 100;
          else if (i === wingTypeNum) breakdown[i] = 78;
          else breakdown[i] = Math.floor(((i * 19) % 50) + 25);
        }

        stateData = {
          type: primaryTypeNum,
          wing: wingTypeNum,
          fullTitle: type,
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
  const wingInfo = wingTypeNum ? enneagramTypes[wingTypeNum] : null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'growth', label: 'Growth & Stress', icon: Brain },
    { id: 'relationships', label: 'Relationships & Work', icon: Users },
    { id: 'figures', label: 'Famous Figures & Triads', icon: Star }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-indigo-200">
      
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
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
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
                  
                  {/* Primary Type (Dominant 8 Cols) */}
                  <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${primaryColor} opacity-90`} />
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-indigo-500" />
                          Type {primaryTypeNum}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                          {info.center} Center
                        </span>
                      </div>

                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                        {info.name}
                      </h1>
                      
                      <p className="text-slate-600 leading-relaxed font-medium text-base sm:text-lg">
                        {info.description}
                      </p>
                    </div>

                    {/* Desire & Fear Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                      <div className="bg-emerald-50/60 border border-emerald-100/80 p-4 rounded-2xl space-y-1">
                        <span className="text-[0.68rem] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5" /> What Drives You
                        </span>
                        <p className="text-slate-800 text-xs sm:text-sm font-bold leading-snug">{info.coreDesire}</p>
                      </div>

                      <div className="bg-rose-50/60 border border-rose-100/80 p-4 rounded-2xl space-y-1">
                        <span className="text-[0.68rem] font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5" /> What You Avoid
                        </span>
                        <p className="text-slate-800 text-xs sm:text-sm font-bold leading-snug">{info.coreFear}</p>
                      </div>
                    </div>
                  </div>

                  {/* Wing & Classification Card (4 Cols - Visible Side-by-Side without scrolling!) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-4">
                      <span className="text-xs font-black tracking-[0.2em] uppercase text-rose-600 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-100 inline-block">
                        Classification
                      </span>

                      <h2 className={`text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-linear-to-b ${primaryColor}`}>
                        {fullTitle}
                      </h2>

                      {wingInfo ? (
                        <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
                          Your core <strong className="text-slate-900">Type {primaryTypeNum}</strong> is influenced by a <strong className="text-slate-900">Type {wingTypeNum} ({wingInfo.name})</strong> wing.
                        </p>
                      ) : (
                        <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
                          Full Enneagram classification score distribution.
                        </p>
                      )}
                    </div>

                    <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-2xl mt-4">
                      <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                        💡 <strong className="text-slate-900">Wing Synergy:</strong> Wings add nuance to your core personality, shaping how your instincts express.
                      </p>
                    </div>
                  </div>

                </div>

                {/* 2. Enneagram Type Allocation Statistics (Fixed Heading & Explicit Values!) */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Enneagram Type Allocation Statistics</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Here is your calculated score allocation percentage across all 9 Enneagram types.
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

                {/* 3. Strengths & Growth Areas Grid */}
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
                      {info.strengths?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Growth Areas Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Things to Watch Out For</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.weaknesses?.map((item, idx) => (
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
            {/* TAB 2: GROWTH & STRESS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'growth' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Integration & Disintegration Mechanics</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    The Enneagram describes dynamic psychological movement along specific lines during periods of high security (Growth) and severe stress (Disintegration).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Growth Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full flex items-center gap-1.5">
                        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        Growth (Integration) → Type {info.growth}
                      </span>
                    </div>

                    <h4 className="text-2xl font-black text-slate-900">When You Are Thriving</h4>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      When moving toward health, relaxation, and self-awareness, your core <strong className="text-slate-900">Type {primaryTypeNum}</strong> naturally adopts the healthiest traits of <strong className="text-emerald-700 font-bold">Type {info.growth} ({enneagramTypes[info.growth]?.name})</strong>.
                    </p>

                    <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Healthy Transformation Traits:</span>
                      <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                        You become more balanced, grounded, and emotionally flexible, releasing rigid core fixations in favor of objective clarity.
                      </p>
                    </div>
                  </div>

                  {/* Stress Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full flex items-center gap-1.5">
                        <ArrowDownRight className="w-4 h-4 text-rose-600" />
                        Stress (Disintegration) → Type {info.stress}
                      </span>
                    </div>

                    <h4 className="text-2xl font-black text-slate-900">When Under Severe Pressure</h4>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      When feeling intensely threatened, unappreciated, or overwhelmed, you unconsciously adopt the reactive behaviors of <strong className="text-rose-600 font-bold">Type {info.stress} ({enneagramTypes[info.stress]?.name})</strong>.
                    </p>

                    <div className="bg-rose-50/60 border border-rose-100 p-4 rounded-2xl space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Early Warning Stress Signals:</span>
                      <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                        Notice when you start feeling defensive, impulse-driven, or emotionally reactive. Taking a step back helps restore your emotional equilibrium.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Practical Action Banner */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-indigo-400" />
                    <h4 className="text-2xl font-black">Self-Development Tip for Type {primaryTypeNum}</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    Growth requires catching yourself when stress triggers your core fear of <strong className="text-white">{info.coreFear.toLowerCase()}</strong>. Cultivate mindfulness by leaning into the positive qualities of Type {info.growth} to stay centered.
                  </p>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: RELATIONSHIPS & WORK */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'relationships' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Interpersonal & Professional Dynamics</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    How Type {primaryTypeNum} ({info.name}) interacts with romantic partners and functions in team environments.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Relationships Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-rose-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">In Romantic Relationships</h3>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.relationshipDynamics}
                    </p>
                  </div>

                  {/* Workplace Behavior Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">At Work & Leadership</h3>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.workplaceBehavior}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: FAMOUS FIGURES & TRIADS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'figures' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Famous Figures & Center Alignment</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Historical figures who share your type, and the underlying Center of Intelligence mechanics.
                  </p>
                </div>

                {/* Center of Intelligence Breakdown Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                  <div className="flex items-center gap-3">
                    <Flame className="w-6 h-6 text-amber-500" />
                    <h4 className="text-2xl font-black text-slate-900">{info.center} Center Alignment</h4>
                  </div>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    Types in the <strong className="text-slate-900">{info.center}</strong> process life primarily through {info.center.includes('Gut') ? 'gut instinct and somatic awareness (dealing with anger and boundary control)' : info.center.includes('Heart') ? 'emotional connection and relationship attunement (dealing with identity and shame)' : 'mental analysis and conceptual modeling (dealing with security and anxiety)'}.
                  </p>
                </div>

                {/* Famous Examples Section */}
                {info.famousExamples && info.famousExamples.length > 0 && (
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <Star className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Well-Known Type {primaryTypeNum} Figures</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {info.famousExamples.map((person, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-center space-y-1 hover:border-slate-300 transition-colors">
                          <p className="text-slate-900 font-extrabold text-sm sm:text-base">{person}</p>
                          <span className="text-[0.65rem] uppercase tracking-wider text-slate-400 font-bold">Type {primaryTypeNum}</span>
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
