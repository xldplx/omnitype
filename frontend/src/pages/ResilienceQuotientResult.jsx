import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Target, AlertTriangle, 
  CheckCircle2, Sparkles, Compass, Lightbulb, Scale, RefreshCw, Lock, Zap, Activity, Flame
} from 'lucide-react';
import { rqMap } from '../utils/resilienceQuotientLogic';

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
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 font-extrabold border border-sky-100">Dominant Trait</span>}
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

export default function ResilienceQuotientResult() {
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
      if (rqMap[type]) {
        stateData = {
          rqInfo: rqMap[type],
          confScore: 0,
          stressScore: 0,
          scores: { confidence: 75, stressTolerance: 85 }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_resilience', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/resilience" replace />;
  }

  const { rqInfo, scores } = resultData;
  const primaryColor = rqInfo.color || 'from-sky-500 to-indigo-600';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'metrics', label: 'Resilience Metrics' },
    { id: 'capacity', label: 'Adversity Capacity' },
    { id: 'protocol', label: 'Toughness Protocol' }
  ];

  const maxVal = Math.max(scores.confidence || 0, scores.stressTolerance || 0);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-sky-200">
      
      {/* Decorative Ambient Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${rqInfo.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${rqInfo.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
                        {rqInfo.name}
                      </h1>
                      
                      <p className="text-slate-600 max-w-4xl leading-relaxed font-medium text-base sm:text-lg md:text-xl mb-6">
                        {rqInfo.description}
                      </p>

                      <div className="pl-4 border-l-2 border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>"{rqInfo.quote}"</span>
                      </div>
                    </div>
                  </div>

                  {/* Standardized 2nd Box (4 Cols - Prominent & Centered) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <h2 className={`text-4xl sm:text-5xl md:text-6xl leading-tight font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b ${primaryColor} z-10 drop-shadow-sm pb-1`}>
                       {rqInfo.code}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Resilience Profile</span>
                  </div>

                </div>

                {/* 2. Dedicated Core Motivations Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Shield className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What Drives You (Core Strength)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      {rqInfo.archetype} mindset driving steady endurance under crisis.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Stress Trigger)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      Surrendering autonomy or allowing unexpected pressure to derail your core objectives.
                    </p>
                  </div>
                </div>

                {/* 3. System Resilience Allocation */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Resilience Axis Allocation</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated breakdown across Confidence and Stress Tolerance spectrums.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <ResultBar
                      label="Confidence Axis (Assured vs Doubtful)"
                      value={scores.confidence}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={scores.confidence === maxVal}
                    />
                    <ResultBar
                      label="Stress Tolerance Axis (Grounded vs Volatile)"
                      value={scores.stressTolerance}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={scores.stressTolerance === maxVal}
                    />
                  </div>
                </div>

                {/* 4. Strategic Assets & System Vulnerabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Strategic Assets */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Manifest Strengths</h3>
                    </div>
                    <ul className="space-y-4">
                      {rqInfo.strengths?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategic Vulnerabilities */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Shadow Elements</h3>
                    </div>
                    <ul className="space-y-4">
                      {rqInfo.weaknesses?.map((item, idx) => (
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
            {/* TAB 2: RESILIENCE METRICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'metrics' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Resilience Spectrum Analysis</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Detailed analysis of your Confidence Axis (Doubtful vs Assured) and Stress Tolerance Axis (Volatile vs Grounded).
                  </p>
                </div>

                {/* Main Progress Bars */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    <ResultBar
                      label="Confidence Axis (Assured vs Doubtful)"
                      value={scores.confidence}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={scores.confidence === maxVal}
                    />
                    <ResultBar
                      label="Stress Tolerance Axis (Grounded vs Volatile)"
                      value={scores.stressTolerance}
                      color={`bg-linear-to-r ${primaryColor}`}
                      isPrimary={scores.stressTolerance === maxVal}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Confidence Axis Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Target className="w-5 h-5 text-sky-500" />
                      <h4 className="text-xl font-black text-slate-900">Confidence Axis Dynamics</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      Measures your baseline self-esteem, resistance to imposter syndrome, and inherent trust in your own competence when making high-stakes decisions.
                    </p>
                  </div>

                  {/* Stress Tolerance Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Shield className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-xl font-black text-slate-900">Stress Tolerance Dynamics</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      Measures your emotional reactivity to unexpected challenges, chaotic environments, and severe pressure or criticism.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: ADVERSITY CAPACITY */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'capacity' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Adversity Capacity & Crisis Performance</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    How your resilience profile operates during sudden unexpected setbacks and high-pressure situations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Crisis Composure</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Maintains psychological stability and clear decision-making when plans collapse around you.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
                      <Flame className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Recovery Velocity</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Rebounds rapidly from failure without letting negative outcomes damage your long-term momentum.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Imposter Resistance</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Maintains internal self-worth and competence trust regardless of external criticism.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: TOUGHNESS PROTOCOL */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'protocol' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Mental Toughness Protocols & Growth Hacks</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Practical down-regulation exercises and mental reframing protocols.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hack 1 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Cognitive Reframing</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Reframe unexpected setbacks as neutral data points rather than personal failures.
                    </p>
                  </div>

                  {/* Hack 2 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-2">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Stress Down-Regulation</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Use physical grounding exercises to release physiological tension before making critical choices.
                    </p>
                  </div>

                  {/* Hack 3 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Anchored Autonomy</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Protect your mental battery by maintaining firm boundaries around personal rest and focus time.
                    </p>
                  </div>
                </div>

                {/* Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-sky-400" />
                    <h4 className="text-2xl font-black">Resilience Mastery Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    True resilience is not about hardening yourself until you become unfeeling; it is the flexible strength to bend under severe storms and rise again unbowed.
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
