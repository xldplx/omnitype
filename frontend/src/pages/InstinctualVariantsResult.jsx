import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Zap, AlertTriangle, Users, Briefcase, 
  Target, TrendingUp, Sparkles, CheckCircle2, Activity, Brain, EyeOff, Layers, Compass, Flame
} from 'lucide-react';
import { instinctualVariantsTypes } from '../utils/instinctualVariantsLogic';

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
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold border border-indigo-100">Dominant</span>}
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

export default function InstinctualVariantsResult() {
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
      for (const [num, obj] of Object.entries(instinctualVariantsTypes)) {
        if (obj.id === type) {
          foundTypeNum = parseInt(num);
          break;
        }
      }

      if (foundTypeNum) {
        const breakdown = {};
        for (let i = 1; i <= 3; i++) {
          if (i === foundTypeNum) breakdown[i] = 100;
          else breakdown[i] = Math.floor(Math.random() * 40) + 20;
        }

        let secondary = foundTypeNum === 1 ? 2 : 1;
        let blind = 6 - foundTypeNum - secondary;

        stateData = {
          type: foundTypeNum,
          fullTitle: instinctualVariantsTypes[foundTypeNum].shortName,
          info: instinctualVariantsTypes[foundTypeNum],
          stacking: `${instinctualVariantsTypes[foundTypeNum].abbreviation}/${instinctualVariantsTypes[secondary].abbreviation}`,
          blindspot: instinctualVariantsTypes[blind],
          breakdown
        };
      }
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

  const { info, breakdown, stacking, blindspot, type: primaryTypeNum } = resultData;
  const primaryColor = info.color || 'from-emerald-500 to-teal-600';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'stacking', label: 'Instinctual Stacking', icon: Activity },
    { id: 'relationships', label: 'Relationships & Work', icon: Users },
    { id: 'blindspot', label: 'Blindspot & Shadow', icon: EyeOff }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-emerald-200">
      
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
                  
                  {/* Primary Variant (Dominant 8 Cols) */}
                  <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${primaryColor} opacity-90`} />
                    
                    <div>
                      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 text-slate-900 tracking-tight leading-none">
                        {info.name}
                      </h1>
                      
                      <p className="text-slate-600 max-w-4xl leading-relaxed font-medium text-base sm:text-lg md:text-xl">
                        {info.description}
                      </p>
                    </div>
                  </div>

                  {/* Standardized 2nd Box (4 Cols - Prominent & Centered) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <h2 className={`text-5xl sm:text-6xl md:text-7xl leading-none font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b ${primaryColor} z-10 drop-shadow-sm pb-1 uppercase whitespace-nowrap`}>
                       {stacking}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Instinctual Stacking</span>
                  </div>

                </div>

                {/* 2. Dedicated Core Motivations Section (What Drives You & What You Avoid) */}
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

                {/* 3. Instinctual Distribution Statistics */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Instinctual Distribution Statistics</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated energy distribution across all three survival instincts.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[1, 2, 3].map((num) => {
                      const styleObj = instinctualVariantsTypes[num];
                      const val = breakdown[num] || 0;
                      const isPrimary = num === primaryTypeNum;

                      return (
                        <ResultBar
                          key={num}
                          label={styleObj.name}
                          value={val}
                          color={`bg-linear-to-r ${styleObj.color}`}
                          isPrimary={isPrimary}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 4. Empowered vs Unhealthy Traits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Empowered Strengths */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Empowered Strengths</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.strengths?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Unhealthy Pitfalls */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Unhealthy Pitfalls</h3>
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
            {/* TAB 2: INSTINCTUAL STACKING */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'stacking' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Instinctual Stacking Sequence</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Your instincts stack in order of priority: Dominant (Primary), Secondary (Support), and Blindspot (Shadow).
                  </p>
                </div>

                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    {[1, 2, 3].map((num) => {
                      const styleObj = instinctualVariantsTypes[num];
                      const val = breakdown[num] || 0;
                      const isPrimary = num === primaryTypeNum;

                      return (
                        <ResultBar
                          key={num}
                          label={styleObj.name}
                          value={val}
                          color={`bg-linear-to-r ${styleObj.color}`}
                          isPrimary={isPrimary}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Stacking Breakdown Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-xl font-black text-slate-900">Stacking Code: {stacking}</h4>
                  </div>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    Your instinctual sequence dictates where your psychological energy flows first. Your dominant instinct (<strong className="text-slate-900">{info.shortName}</strong>) consumes the vast majority of your focus, backed up by your secondary instinct, while your blindspot (<strong className="text-slate-900">{blindspot.shortName}</strong>) remains in the background until consciously integrated.
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
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Interpersonal & Workplace Dynamics</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    How {info.shortName} shapes romantic expectations, communication filters, and professional collaboration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Relationship Dynamics */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <h4 className="text-xl font-black text-slate-900">Interpersonal Filtering</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.relationshipDynamics}
                    </p>
                  </div>

                  {/* Workplace Behavior */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xl font-black text-slate-900">Workplace & Societal Role</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.workplaceBehavior}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: BLINDSPOT & SHADOW */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'blindspot' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Instinctual Blindspot & Shadow Integration</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Bringing your repressed variant out of the shadow to achieve psychological balance and rounded maturity.
                  </p>
                </div>

                {/* Blindspot Feature Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <EyeOff className="w-5 h-5 text-rose-500" />
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-rose-500">Your Lowest Variant</span>
                      <h4 className="text-2xl font-black text-slate-900">{blindspot.name} Blindspot</h4>
                    </div>
                  </div>
                  <p className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed">
                    Because <strong className="text-slate-900">{blindspot.name}</strong> is your lowest variant, you naturally ignore this entire sphere of human experience until crisis forces your hand. You may subconsciously dismiss people who prioritize <strong className="text-slate-900">{blindspot.coreDesire.toLowerCase()}</strong> because you do not want to be burdened by it.
                  </p>
                </div>

                {/* Integration Protocol */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Compass className="w-6 h-6 text-emerald-400" />
                    <h4 className="text-2xl font-black">Shadow Integration Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    To integrate your <strong className="text-white">{blindspot.shortName}</strong> blindspot, dedicate conscious effort toward practicing small daily habits in this domain. Balancing all three instincts frees you from obsessive over-reliance on your primary drive.
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
