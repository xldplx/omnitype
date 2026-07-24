import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Heart, Zap, AlertTriangle, Users, Target, 
  MessageSquare, Shield, Activity, Gift, Clock, Flame
} from 'lucide-react';
import { loveLanguagesTypes } from '../utils/loveLanguagesLogic';

const LANGUAGE_ICONS = {
  1: MessageSquare,
  2: Zap,
  3: Gift,
  4: Clock,
  5: Flame
};

const PAIRING_DYNAMIC_RULES = {
  1: { // Words of Affirmation
    1: { title: "Words + Words", desc: "You both love verbal compliments and encouragement. Say what you appreciate often, but be extra careful during arguments — harsh words stick deeply for both of you." },
    2: { title: "Words + Acts of Service", desc: "You feel loved through spoken compliments, while your partner feels loved when you help out around the house. Say thank you out loud when they do chores for you!" },
    3: { title: "Words + Receiving Gifts", desc: "Handwritten notes, sweet texts, or thoughtful messages left on sticky notes work like magic for this pairing." },
    4: { title: "Words + Quality Time", desc: "Having long, deep conversations without phones or distractions is your sweet spot for staying connected." },
    5: { title: "Words + Physical Touch", desc: "Saying 'I love you' while giving a warm hug or holding hands gives both of you complete emotional comfort." }
  },
  2: { // Acts of Service
    1: { title: "Acts of Service + Words", desc: "Show your love by helping out with daily tasks, and make sure to explicitly thank them out loud so they feel noticed." },
    2: { title: "Acts of Service + Acts of Service", desc: "You are a total dream team at managing a household together. Just make sure to share the workload fairly so neither person feels overworked." },
    3: { title: "Acts of Service + Receiving Gifts", desc: "Surprising them with practical items that solve a daily hassle (like fixing something or buying a tool they need) satisfies both languages." },
    4: { title: "Acts of Service + Quality Time", desc: "Doing chores, cooking, or grocery shopping together turns daily errands into quality bonding time." },
    5: { title: "Acts of Service + Physical Touch", desc: "Helping out around the house followed by a back rub or sitting close afterwards grounds both of you." }
  },
  3: { // Receiving Gifts
    1: { title: "Receiving Gifts + Words", desc: "A thoughtful gift accompanied by a sweet handwritten card means the world to both of you." },
    2: { title: "Receiving Gifts + Acts of Service", desc: "Getting them something practical that makes their daily routine easier (or solving a chore for them) feels deeply caring." },
    3: { title: "Receiving Gifts + Receiving Gifts", desc: "You both love the thought and effort behind presents. Birthdays, holidays, and spontaneous small treats are major highlights." },
    4: { title: "Receiving Gifts + Quality Time", desc: "Framed photos, souvenirs from trips, or keepsakes from date nights turn quality time into physical memories." },
    5: { title: "Receiving Gifts + Physical Touch", desc: "Handing over a small treat while giving a warm embrace feels incredibly intimate and loving." }
  },
  4: { // Quality Time
    1: { title: "Quality Time + Words", desc: "Having uninterrupted one-on-one time where you talk openly and compliment each other keeps your relationship thriving." },
    2: { title: "Quality Time + Acts of Service", desc: "Cooking dinner together or running errands side-by-side satisfies both the desire for togetherness and helpful action." },
    3: { title: "Quality Time + Receiving Gifts", desc: "Plan memorable date experiences together and keep small mementos like concert tickets or photos." },
    4: { title: "Quality Time + Quality Time", desc: "You both prioritize one-on-one time above everything else. Put phones away during dinner and enjoy distraction-free connection." },
    5: { title: "Quality Time + Physical Touch", desc: "Cuddling on the couch while watching a movie or holding hands while walking gives you both maximum closeness." }
  },
  5: { // Physical Touch
    1: { title: "Physical Touch + Words", desc: "Whispering reassuring words while holding hands or cuddling gives both of you deep emotional comfort." },
    2: { title: "Physical Touch + Acts of Service", desc: "Giving a neck rub after a hard work day or holding hands while walking to do errands bridges touch with helpful action." },
    3: { title: "Physical Touch + Receiving Gifts", desc: "Giving a gentle hug while handing over a surprise coffee or small gift makes your partner feel truly seen." },
    4: { title: "Physical Touch + Quality Time", desc: "Sitting close together with your legs touching while talking or watching TV fulfills both of your emotional needs." },
    5: { title: "Physical Touch + Physical Touch", desc: "Hugs, holding hands, and physical closeness come naturally to both of you. Long distance is your only real challenge." }
  }
};

const TANK_FILLERS = {
  1: ["Unexpected sweet text messages during the day", "Public compliments in front of friends or family", "Hearing 'I'm proud of you' or 'I believe in you'"],
  2: ["Cooking dinner when they had a exhausting day", "Fixing something broken around the house unprompted", "Taking over a chore they dislike doing"],
  3: ["Surprise coffee or treat brought home 'just because'", "Thoughtful presents picked out for anniversaries", "Keepsakes brought back from travels"],
  4: ["30 minutes of uninterrupted eye contact & conversation", "Dates where both people put their phones away", "Doing a activity together like taking an evening walk"],
  5: ["Holding hands while walking or driving", "A long, tight hug when coming home", "Sitting close together on the couch"]
};

const TANK_DRAINERS = {
  1: ["Harsh, sarcastic, or unconstructive criticism", "Feeling ignored when sharing good news", "Lack of verbal reassurance when feeling down"],
  2: ["Broken promises to do chores or favors", "Laziness or creating more mess for them to clean", "Empty promises without real action"],
  3: ["Forgotten birthdays or major milestones", "Thoughtless, last-minute generic presents", "Dismissing physical mementos"],
  4: ["Checking social media while they are speaking", "Repeatedly canceling or postponing date plans", "Feeling like an afterthought"],
  5: ["Flinching away or cold physical distance", "Prolonged physical absence", "Ignoring physical affection"]
};

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

function ResultBar({ label, value, color, icon: IconComp }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-bold text-slate-700">
        <span className="flex items-center gap-2">
          {IconComp && <IconComp className="w-4 h-4 text-slate-400" />}
          {label}
        </span>
        <span className="font-mono text-slate-900">{value}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
        <Motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function LoveLanguagesResult() {
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
      for (const [num, obj] of Object.entries(loveLanguagesTypes)) {
        if (obj.id === type) {
          foundTypeNum = parseInt(num);
          break;
        }
      }

      if (foundTypeNum) {
        const breakdown = {};
        for (let i = 1; i <= 5; i++) {
          if (i === foundTypeNum) breakdown[i] = 100;
          else breakdown[i] = ((i * 18) % 50) + 20;
        }

        const secNum = foundTypeNum === 1 ? 4 : 1;
        stateData = {
          type: foundTypeNum,
          secondary: secNum,
          fullTitle: `${loveLanguagesTypes[foundTypeNum].shortName} / ${loveLanguagesTypes[secNum].shortName}`,
          info: loveLanguagesTypes[foundTypeNum],
          secondaryInfo: loveLanguagesTypes[secNum],
          breakdown
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    if (resultData) {
      localStorage.setItem('omnitype_love_languages', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/love-languages" replace />;
  }

  const { info, secondaryInfo, breakdown, type: primaryTypeNum } = resultData;
  const primaryColor = info.color || 'from-rose-500 to-pink-600';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'expression', label: 'Giving & Receiving', icon: Heart },
    { id: 'synergy', label: 'Compatibility & Dynamics', icon: Users }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-rose-200">
      
      {/* Decorative Background Auras */}
      <div className="fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-rose-100/40 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] bg-pink-100/40 rounded-full blur-[120px] pointer-events-none z-0" />

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
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
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
                
                {/* Hero Profile Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${primaryColor} opacity-80`} />
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 text-slate-900 tracking-tight leading-none">
                      {info.name}
                    </h1>
                    <p className="text-slate-600 max-w-4xl leading-relaxed font-medium text-base sm:text-lg md:text-xl">
                      {info.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden">
                     <h2 className={`text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${primaryColor} z-10 drop-shadow-sm pb-1 whitespace-nowrap text-center`}>
                       {info.shortName}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Primary Love Language</span>
                  </div>
                </div>

                {/* 5-Language Allocation Statistics */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Love Language Allocation Statistics</h3>
                    <p className="text-slate-500 text-sm md:text-base font-medium">Visual distribution across all 5 emotional connection channels.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(loveLanguagesTypes).map(([numStr, typeObj]) => {
                      const num = parseInt(numStr);
                      const score = breakdown[num] || 0;
                      const IconComp = LANGUAGE_ICONS[num];
                      const isPrimary = num === primaryTypeNum;

                      return (
                        <div key={num} className={`p-6 rounded-3xl border transition-all ${isPrimary ? 'bg-rose-50/40 border-rose-200' : 'bg-slate-50/60 border-slate-100'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-slate-900 text-base flex items-center gap-2">
                              {IconComp && <IconComp className="w-4 h-4 text-rose-500" />}
                              {typeObj.name}
                            </span>
                            {isPrimary && <span className="text-[0.65rem] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-900 text-white">Primary</span>}
                          </div>
                          <ResultBar label="" value={score} color={`bg-linear-to-r ${typeObj.color}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Core Emotional Motive & Primary Vulnerability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full inline-block mb-4">Core Emotional Desire</span>
                    <h4 className="text-xl font-black text-slate-900 mb-3">What makes you feel cherished</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                      {info.coreDesire}
                    </p>
                  </div>
                  
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full inline-block mb-4">Primary Vulnerability</span>
                    <h4 className="text-xl font-black text-slate-900 mb-3">What drains your emotional tank</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                      {info.coreFear}
                    </p>
                  </div>
                </div>

                {/* Secondary Support Language */}
                {secondaryInfo && (
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-2xs relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Secondary Support Language</span>
                      <h4 className="text-xl font-black text-slate-900">{secondaryInfo.name}</h4>
                    </div>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                      While <strong className="text-slate-900">{info.name}</strong> is your primary emotional compass, <strong className="text-slate-900">{secondaryInfo.name}</strong> acts as your secondary support channel: {secondaryInfo.description}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: GIVING & RECEIVING DYNAMICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'expression' && (
              <div className="space-y-8">
                
                {/* How You Show vs How You Prefer to Receive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xs">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-rose-500" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">How You Show Love (Giving)</h3>
                    </div>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                      {info.relationshipDynamics}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xs">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-pink-500" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">How You Prefer to Receive Love</h3>
                    </div>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                      {info.description} You feel genuinely valued when a partner demonstrates love through this channel regularly without prompting.
                    </p>
                  </div>
                </div>

                {/* Emotional Tank Fillers vs Drainers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">What Fills Your Emotional Tank</h3>
                    </div>
                    <ul className="space-y-4">
                      {(TANK_FILLERS[primaryTypeNum] || []).map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-700 font-semibold text-sm md:text-base leading-relaxed items-start bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/60">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">What Drains Your Emotional Tank</h3>
                    </div>
                    <ul className="space-y-4">
                      {(TANK_DRAINERS[primaryTypeNum] || []).map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-700 font-semibold text-sm md:text-base leading-relaxed items-start bg-rose-50/40 p-4 rounded-2xl border border-rose-100/60">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Expressive Strengths & Communication Pitfalls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-xl font-black text-slate-900">Expressive Strengths</h3>
                    </div>
                    <ul className="space-y-4">
                      {(info.strengths || []).map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600 font-medium text-sm md:text-base leading-relaxed items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                          <span>{formatMarkdown(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <h3 className="text-xl font-black text-slate-900">Things to Keep in Mind</h3>
                    </div>
                    <ul className="space-y-4">
                      {(info.weaknesses || []).map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600 font-medium text-sm md:text-base leading-relaxed items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span>{formatMarkdown(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: COMPATIBILITY & DYNAMICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'synergy' && (
              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">How You Pair With Other Love Languages</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Simple guide on how your primary love language (<strong className="text-slate-900">{info.name}</strong>) connects with all 5 love languages.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(loveLanguagesTypes).map(([numStr, typeObj]) => {
                    const partnerNum = parseInt(numStr);
                    const pairRule = PAIRING_DYNAMIC_RULES[primaryTypeNum]?.[partnerNum] || {
                      title: `${info.shortName} + ${typeObj.shortName}`,
                      desc: "Understanding each other's style helps build a strong connection."
                    };
                    const isSelf = partnerNum === primaryTypeNum;

                    return (
                      <div 
                        key={partnerNum}
                        className={`bg-white border rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4 transition hover:-translate-y-1 ${
                          isSelf ? 'border-rose-300 ring-2 ring-rose-100' : 'border-slate-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                            + {typeObj.shortName}
                          </span>
                          {isSelf && <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-wider">Same Style</span>}
                        </div>
                        <h4 className="text-xl font-black text-slate-900">{pairRule.title}</h4>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                          {pairRule.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* How to Resolve Disagreements */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-6">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-rose-400" />
                    <h4 className="text-2xl font-black">How to Resolve Disagreements</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    When having a disagreement with someone who speaks a different love language, standard apologies might not feel enough. Here is what helps most when resolving conflict with a <strong className="text-white">{info.name}</strong> person:
                  </p>
                  <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl text-rose-200 text-base md:text-lg font-semibold">
                    💡 Simple Rule: {info.name === "Words of Affirmation" ? "Express clear, sincere verbal apologies out loud without making excuses." : info.name === "Acts of Service" ? "Take immediate action to fix the problem — actions speak louder than words." : info.name === "Receiving Gifts" ? "Give a thoughtful token or note showing you care about fixing things." : info.name === "Quality Time" ? "Put your phone completely away and give your full, focused attention to talk things through." : "Give a comforting hug and hold hands before talking through details."}
                  </div>
                </div>
              </div>
            )}
          </Motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
