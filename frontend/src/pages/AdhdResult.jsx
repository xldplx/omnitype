import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Heart, Target, Flame, AlertTriangle, Briefcase, 
  MessageSquare, Users, Zap, BrainCircuit, BatteryCharging, ShieldAlert, Sparkles, CheckCircle2, Clock, Activity, Lightbulb, Compass, Headphones, Shield, Wrench
} from 'lucide-react';
import { adhdStatuses } from '../utils/adhdLogic';

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

function MetricBar({ label, value, color, icon: IconComp }) {
  const displayVal = Math.min(Math.max(value || 0, 0), 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-bold text-slate-700">
        <span className="flex items-center gap-2">
          {IconComp && <IconComp className="w-4 h-4 text-slate-400" />}
          <span className="text-slate-900 font-bold">{label}</span>
        </span>
        <span className="font-mono text-slate-900 font-bold bg-slate-100 px-2.5 py-0.5 rounded-md text-xs">{displayVal}%</span>
      </div>
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
        <Motion.div
          className={`h-full rounded-full bg-linear-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${displayVal}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function AdhdResult() {
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
      const statusKey = type.toUpperCase();
      if (adhdStatuses[statusKey]) {
        stateData = {
          statusKey,
          fullTitle: type,
          info: adhdStatuses[statusKey],
          breakdown: { 
            inPercent: 80, 
            hyperPercent: 65, 
            impulsePercent: 40,
            taskInitiation: 45,
            workingMemory: 38,
            emotionalRegulation: 55,
            flexibility: 70
          }
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_adhd', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/adhd" replace />;
  }

  const { info, breakdown } = resultData;
  const primaryColor = info.color || 'from-indigo-500 to-purple-600';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'metrics', label: 'Neural Metrics', icon: BrainCircuit },
    { id: 'fuel', label: 'Cognitive Fuel & Flow', icon: BatteryCharging },
    { id: 'work', label: 'Work & Communication', icon: Briefcase },
    { id: 'hacks', label: 'Strategies & Hacks', icon: Lightbulb }
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
                  
                  {/* Main Result Card (Dominant 8 Cols) */}
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

                  {/* Persona Card (4 Cols - Prominent & Centered) */}
                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <h2 className={`text-3xl sm:text-4xl md:text-5xl leading-none font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b ${primaryColor} z-10 drop-shadow-sm pb-1 text-center`}>
                       {info.subName}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Cognitive Profile</span>
                  </div>

                </div>

                {/* 2. Dedicated Core Motivations Section (What Drives You & What You Avoid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Target className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What Drives You (Core Desire)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{info.coreDesire}</p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Core Fear)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{info.coreFear}</p>
                  </div>
                </div>

                {/* 3. Neural Activity Metrics Gauges */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Neural Activity Metrics</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated score distribution across attention, movement, and impulse control indicators.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MetricBar label="Inattention" value={breakdown.inPercent} color={primaryColor} icon={Target} />
                    <MetricBar label="Hyperactivity" value={breakdown.hyperPercent} color={primaryColor} icon={Flame} />
                    <MetricBar label="Impulse Control" value={breakdown.impulsePercent} color={primaryColor} icon={Zap} />
                  </div>
                </div>

                {/* 4. Strengths & Challenges Grid */}
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
                      {info.pros?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Things to Watch Out For</h3>
                    </div>
                    <ul className="space-y-4">
                      {info.cons?.map((item, idx) => (
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
            {/* TAB 2: NEURAL METRICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'metrics' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Neural & Executive Spectrum Breakdown</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Detailed analysis of attention regulation, impulse control, working memory, and cognitive activation energy.
                  </p>
                </div>

                {/* Core ASRS Screening Metrics */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <h4 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">Symptom Cluster Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MetricBar label="Inattention Spectrum" value={breakdown.inPercent} color={primaryColor} icon={Target} />
                    <MetricBar label="Hyperactivity Index" value={breakdown.hyperPercent} color={primaryColor} icon={Flame} />
                    <MetricBar label="Impulse Control Score" value={breakdown.impulsePercent} color={primaryColor} icon={Zap} />
                  </div>
                </div>

                {/* Executive Function Capacity Metrics */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <h4 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">Executive Function Capacity</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <MetricBar label="Task Initiation Energy" value={breakdown.taskInitiation || 50} color="from-amber-500 to-emerald-500" icon={Activity} />
                    <MetricBar label="Working Memory Retention" value={breakdown.workingMemory || 45} color="from-sky-500 to-indigo-500" icon={BrainCircuit} />
                    <MetricBar label="Emotional Regulation (RSD Threshold)" value={breakdown.emotionalRegulation || 55} color="from-rose-400 to-purple-600" icon={ShieldAlert} />
                    <MetricBar label="Cognitive Flexibility & Pivoting" value={breakdown.flexibility || 70} color="from-emerald-400 to-teal-600" icon={Compass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Time Perception Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Time Perception Mechanics</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.timePerception}
                    </p>
                  </div>

                  {/* Rejection Sensitivity Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldAlert className="w-5 h-5 text-rose-500" />
                      <h4 className="text-xl font-black text-slate-900">Rejection Sensitivity (RSD)</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.rsdDesc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: COGNITIVE FUEL & FLOW */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'fuel' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Cognitive Fuel & Environment Optimization</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Understanding dopamine triggers, hyperfocus entry conditions, and sensory environment design.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Dopamine Style Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full inline-block">
                      Dopamine Style
                    </span>
                    <h4 className="text-2xl font-black text-slate-900">{info.dopamineStyle}</h4>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.dopamineDesc}
                    </p>
                  </div>

                  {/* Hyperfocus Mode Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full inline-block">
                      Hyperfocus Mode
                    </span>
                    <h4 className="text-2xl font-black text-slate-900">{info.hyperfocus}</h4>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.hyperfocusDesc}
                    </p>
                  </div>
                </div>

                {/* Sensory & Soundscape Optimization Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <Headphones className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xl font-black text-slate-900">Sensory Environment Blueprint</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">🎧 Soundscape</span>
                      <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">Brown noise, lo-fi beats, or video game soundtracks without lyrics.</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">💡 Lighting & Visuals</span>
                      <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">Warm ambient lamps, dark mode UI, and clean desk surfaces to prevent visual clutter.</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600">🖐 Tactile Anchors</span>
                      <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">Silent fidget tools, weighted lap blankets, or standing desk transitions.</p>
                    </div>
                  </div>
                </div>

                {/* Practical Energy Management Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <BatteryCharging className="w-6 h-6 text-orange-400" />
                    <h4 className="text-2xl font-black">Energy Management Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    Structure your day around your cognitive peak hours rather than fighting against rigid clock time. Protect your hyperfocus blocks and allow yourself guilt-free recovery time after intense mental output.
                  </p>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: WORK & COMMUNICATION */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'work' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Workplace & Social Communication</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Ideal career paths, workplace boundary scripts, and communication patterns.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Career Roles Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-xl font-black text-slate-900">Aligned Career Paths</h4>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {info.careers?.map((career) => (
                        <span key={career} className="bg-slate-50 border border-slate-200/80 text-slate-800 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Communication Style Card */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <MessageSquare className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xl font-black text-slate-900">Social Communication Style</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-base leading-relaxed">
                      {info.socialStyle}
                    </p>
                  </div>
                </div>

                {/* Communication Scripts & Boundary Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xl font-black text-slate-900">Neurodivergent Boundary & Accommodation Scripts</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">💼 To Managers</span>
                      <p className="text-slate-800 text-sm font-bold">"I execute fastest when tasks are summarized in bullet points with clear priority order."</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-500">❤️ To Partners & Friends</span>
                      <p className="text-slate-800 text-sm font-bold">"If I miss a text or look distracted, it's not lack of care—my attention span gets hijacked by task transitions."</p>
                    </div>
                  </div>
                </div>

                {/* Compatible MBTI Types Card */}
                {info.mbti && info.mbti.length > 0 && (
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <Users className="w-5 h-5 text-purple-600" />
                      <h4 className="text-xl font-black text-slate-900">Compatible MBTI Cognitive Alignments</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {info.mbti.map((code) => (
                        <span key={code} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-5 py-2.5 rounded-2xl font-black text-sm tracking-wider">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: STRATEGIES & HACKS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'hacks' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Neurodivergent Life Hacks & Toolkits</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Proven, low-friction strategies designed to work with your brain's natural neurochemistry rather than fighting against it.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Hack 1: Body Doubling */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">Body Doubling</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Working alongside another person (in-person, on video calls, or via co-working streams) creates ambient social accountability that unlocks executive function and prevents task drift.
                    </p>
                  </div>

                  {/* Hack 2: The 5-Minute Micro-Start */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">The 5-Minute Micro-Start</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Lower the friction threshold to zero. Tell yourself you only have to work on a daunting task for exactly 5 minutes, after which you have permission to stop. 85% of the time, overcoming activation friction keeps momentum going.
                    </p>
                  </div>

                  {/* Hack 3: Dopamine Menu */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-amber-500" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">The Dopamine Menu</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Build a written menu of healthy dopamine sources categorized into <strong className="text-slate-900">Starters</strong> (quick 2-min stretches, tea), <strong className="text-slate-900">Mains</strong> (hobbies, workouts), and <strong className="text-slate-900">Sides</strong> (background music while working) so you don't default to doom-scrolling.
                    </p>
                  </div>

                  {/* Hack 4: Externalize Working Memory */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-rose-500" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">Externalize Working Memory</h4>
                    </div>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Never rely on internal memory for tasks or appointments. Use immediate voice memos, sticky notes, or digital kanban boards. If an idea isn't written down in an external system immediately, it disappears.
                    </p>
                  </div>
                </div>

                {/* Practical Mindset Card */}
                <div className="bg-indigo-950 border border-indigo-900 shadow-[0_20px_50px_rgb(0,0,0,0.3)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                    <h4 className="text-2xl font-black">The Neurodivergent Advantage</h4>
                  </div>
                  <p className="text-indigo-200 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    ADHD is not a deficit of intelligence or willpower—it is a difference in interest-based nervous system regulation. When you align your life, work environment, and routine with your natural cognitive rhythm, your speed, creativity, and hyperfocus become an unmatched superpower.
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
