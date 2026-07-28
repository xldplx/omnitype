import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Shield, Heart, Zap, AlertTriangle, Users, Briefcase, 
  Target, TrendingUp, MessageCircle, Sparkles, CheckCircle2, Activity, Brain, Layers, Flame, Compass, Eye, ShieldAlert, Award
} from 'lucide-react';
import { tritypeArchetypes } from '../utils/tritypeResultLogic';

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
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-extrabold border border-indigo-100">Primary Center</span>}
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

export default function TritypeResult() {
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
      if (tritypeArchetypes[type]) {
        stateData = {
          tritypeFull: type,
          archetypeKey: type,
          dominantType: parseInt(type[0]),
          archetypeInfo: tritypeArchetypes[type],
          breakdown: {
            gut: 85,
            heart: 60,
            head: 75
          }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_tritype', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/tritype" replace />;
  }

  const { tritypeFull, archetypeInfo, breakdown } = resultData;
  const info = archetypeInfo;
  const primaryColor = info.color || 'from-indigo-500 to-purple-600';

  const gutNum = tritypeFull.split('').find(n => ['8','9','1'].includes(n)) || '1';
  const heartNum = tritypeFull.split('').find(n => ['2','3','4'].includes(n)) || '3';
  const headNum = tritypeFull.split('').find(n => ['5','6','7'].includes(n)) || '5';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'triad', label: 'Triad Statistics', icon: Activity },
    { id: 'centers', label: 'Centers Analysis', icon: Brain },
    { id: 'dynamics', label: 'Archetype Dynamics', icon: Layers }
  ];

  const centers = [
    { id: 'gut', label: `Gut / Body Center (Type ${gutNum})`, value: breakdown.gut, color: 'from-amber-500 to-orange-500', dominantNum: gutNum },
    { id: 'heart', label: `Heart / Image Center (Type ${heartNum})`, value: breakdown.heart, color: 'from-rose-400 to-pink-500', dominantNum: heartNum },
    { id: 'head', label: `Head / Fear Center (Type ${headNum})`, value: breakdown.head, color: 'from-indigo-400 to-purple-500', dominantNum: headNum }
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
                  
                  {/* Primary Archetype (Dominant 8 Cols) */}
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
                     <h2 className={`text-5xl sm:text-6xl md:text-7xl leading-none font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b ${primaryColor} z-10 drop-shadow-sm pb-1 whitespace-nowrap`}>
                       {tritypeFull}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Tritype Combination</span>
                  </div>

                </div>

                {/* 2. Dedicated Core Motivations Section (What Drives You & What You Avoid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Shield className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What Drives You (Core Purpose)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      Harmonizing instinctual power (Type {gutNum}), emotional identity (Type {heartNum}), and analytical strategy (Type {headNum}) into an integrated life vision.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Blind Spot)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">
                      Allowing one center to completely suppress another—such as over-analyzing decisions with Head energy while ignoring true Heart desires or Gut intuition.
                    </p>
                  </div>
                </div>

                {/* 3. Three-Number Stacking Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Primary Stacking */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                      1st / Primary Type {tritypeFull[0]}
                    </span>
                    <h4 className="text-xl font-black text-slate-900">Driver Center</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Your dominant Enneagram type. This is your initial go-to filter when reacting to daily events, stress, and goals.
                    </p>
                  </div>

                  {/* Secondary Stacking */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                      2nd / Co-Pilot Type {tritypeFull[1]}
                    </span>
                    <h4 className="text-xl font-black text-slate-900">Co-Pilot Center</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Your secondary intelligence center. Steers your focus when your primary type needs support or extra perspective.
                    </p>
                  </div>

                  {/* Tertiary Stacking */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-block">
                      3rd / Stabilizer Type {tritypeFull[2]}
                    </span>
                    <h4 className="text-xl font-black text-slate-900">Stabilizer Center</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Your tertiary center. Provides specialized backup skills during complex challenges or long-term growth.
                    </p>
                  </div>
                </div>

                {/* 4. Tritype Centers Breakdown Statistics */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Tritype Centers Breakdown Statistics</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated energy distribution across the three core intelligence centers (Gut, Heart, Head).
                    </p>
                  </div>

                  <div className="space-y-6">
                    {centers.map((c) => (
                      <ResultBar
                        key={c.id}
                        label={`${c.label} (Dominant Type ${c.dominantNum})`}
                        value={c.value}
                        color={`bg-linear-to-r ${c.color}`}
                        isPrimary={tritypeFull[0] === c.dominantNum}
                      />
                    ))}
                  </div>
                </div>

                {/* 5. Synergistic Strengths Grid */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Synergistic Strengths</h3>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {info.strengths?.map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div className="mt-2 w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                        <p className="text-slate-800 font-bold text-sm sm:text-base leading-snug">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: TRIAD STATISTICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'triad' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Triad Center Allocation Statistics</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Detailed distribution score across your Gut (Instinct), Heart (Emotion), and Head (Intellect) centers.
                  </p>
                </div>

                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-6">
                    {centers.map((c) => (
                      <ResultBar
                        key={c.id}
                        label={`${c.label} — Dominant Type ${c.dominantNum}`}
                        value={c.value}
                        color={`bg-linear-to-r ${c.color}`}
                        isPrimary={tritypeFull[0] === c.dominantNum}
                      />
                    ))}
                  </div>
                </div>

                {/* Primary Triad Focus Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Leading Center Dynamics</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                      Your primary archetype (<strong className="text-slate-900">Type {tritypeFull[0]}</strong>) takes the driver's seat during initial decision making. Types <strong className="text-slate-900">{tritypeFull[1]}</strong> and <strong className="text-slate-900">{tritypeFull[2]}</strong> act as co-pilots, providing emotional warmth and tactical strategy.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-rose-500" />
                      <h4 className="text-xl font-black text-slate-900">Stress & Security Shift</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                      Under extreme pressure, your secondary center (<strong className="text-slate-900">Type {tritypeFull[1]}</strong>) fires to protect your primary vulnerability. Under high security, your tertiary center (<strong className="text-slate-900">Type {tritypeFull[2]}</strong>) expands your creative range.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: CENTERS ANALYSIS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'centers' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Three Centers of Intelligence Mechanics</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Detailed analysis of how Gut (Instinct), Heart (Emotion), and Head (Intellect) interact within your unique Tritype profile.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Gut Center */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Flame className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">Gut / Body Center</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">Type {gutNum} Instinct</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      {gutNum === '8' ? 'Driven by autonomy, strength, and direct resistance against control.' : gutNum === '9' ? 'Driven by internal peace, harmony, and diplomatic mediation.' : 'Driven by moral perfection, integrity, and ethical standards.'}
                    </p>
                  </div>

                  {/* Heart Center */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4">
                    <div className="flex items-center gap-2 text-rose-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">Heart / Image Center</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">Type {heartNum} Emotion</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      {heartNum === '2' ? 'Focused on helpfulness, nurturing bonds, and emotional connection.' : heartNum === '3' ? 'Focused on outstanding achievement, efficiency, and public success.' : 'Focused on deep authenticity, unique creative expression, and depth.'}
                    </p>
                  </div>

                  {/* Head Center */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Brain className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">Head / Mental Center</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">Type {headNum} Intellect</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      {headNum === '5' ? 'Focused on specialized knowledge, objective analysis, and self-reliance.' : headNum === '6' ? 'Focused on risk assessment, tribe loyalty, and strategic planning.' : 'Focused on rapid ideation, novelty exploration, and future vision.'}
                    </p>
                  </div>
                </div>

                {/* Center Tension & Blind Spot Warning */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                    <h4 className="text-xl font-black text-slate-900">Center Integration & Tension</h4>
                  </div>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    Notice when friction occurs between your <strong className="text-slate-900">Gut (Type {gutNum})</strong> action impulses, <strong className="text-slate-900">Heart (Type {heartNum})</strong> emotional needs, and <strong className="text-slate-900">Head (Type {headNum})</strong> intellectual doubts. Pausing to align all three centers yields invincible clarity.
                  </p>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: ARCHETYPE DYNAMICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'dynamics' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Archetype Growth & Interpersonal Synergy</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Optimizing your Tritype's combined psychological horsepower for career execution, leadership, and personal relationships.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Workplace Leadership Style */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Workplace & Execution Style</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                      As <strong className="text-slate-900">{info.name}</strong>, you excel in roles that demand both strategic foresight and decisive execution. You bridge the gap between creative ideation and reliable delivery.
                    </p>
                  </div>

                  {/* Interpersonal & Romantic Synergy */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xl font-black text-slate-900">Interpersonal & Social Synergy</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                      In relationships, you offer a rich blend of emotional attunement, clear boundaries, and intellectual stimulation. Partners value your loyalty and multidimensional perspective.
                    </p>
                  </div>
                </div>

                {/* Self-Mastery Protocol Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                    <h4 className="text-2xl font-black">Tritype Self-Mastery Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    Your Tritype {tritypeFull} ({info.name}) gives you a rare 3-center cognitive toolkit. Cultivate self-awareness by honoring your gut instinct, acknowledging your emotional needs, and applying your mental strategy in complete harmony.
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
