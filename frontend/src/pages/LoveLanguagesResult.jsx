import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Heart, Zap, AlertTriangle, Users, Target, 
  MessageSquare, Shield, Activity, Gift, Clock, Flame, Sparkles, CheckCircle2, Lightbulb, RefreshCw, Compass, Lock, Scale
} from 'lucide-react';
import { loveLanguagesTypes } from '../utils/loveLanguagesLogic';

const PAIRING_DYNAMIC_RULES = {
  1: { // Words of Affirmation
    1: { title: "Words + Words", rating: "95% Synergy", desc: "You both love verbal compliments and encouragement. Say what you appreciate often, but be extra careful during arguments — harsh words stick deeply for both of you." },
    2: { title: "Words + Acts of Service", rating: "88% Synergy", desc: "You feel loved through spoken compliments, while your partner feels loved when you help out around the house. Say thank you out loud when they do chores for you!" },
    3: { title: "Words + Receiving Gifts", rating: "90% Synergy", desc: "Handwritten notes, sweet texts, or thoughtful messages left on sticky notes work like magic for this pairing." },
    4: { title: "Words + Quality Time", rating: "92% Synergy", desc: "Having long, deep conversations without phones or distractions is your sweet spot for staying connected." },
    5: { title: "Words + Physical Touch", rating: "94% Synergy", desc: "Saying 'I love you' while giving a warm hug or holding hands gives both of you complete emotional comfort." }
  },
  2: { // Acts of Service
    1: { title: "Acts of Service + Words", rating: "88% Synergy", desc: "Show love by helping with tasks, and make sure to verbally appreciate when your partner does things for you." },
    2: { title: "Acts of Service + Acts of Service", rating: "96% Synergy", desc: "You both love practical help. Divide household chores fairly and surprise each other by taking over a task." },
    3: { title: "Acts of Service + Receiving Gifts", rating: "85% Synergy", desc: "Running a helpful errand or picking up a thoughtful treat on the way home makes both of you feel special." },
    4: { title: "Acts of Service + Quality Time", rating: "91% Synergy", desc: "Doing projects or cooking meals together allows both of you to connect deeply." },
    5: { title: "Acts of Service + Physical Touch", rating: "89% Synergy", desc: "Giving a back rub or making a warm coffee while giving a kiss on the cheek combines both your languages." }
  },
  3: { // Receiving Gifts
    1: { title: "Receiving Gifts + Words", rating: "90% Synergy", desc: "Attach a sweet, thoughtful note whenever you give a gift to hit both of your emotional sweet spots." },
    2: { title: "Receiving Gifts + Acts of Service", rating: "85% Synergy", desc: "Bringing home a favorite coffee or snack doubles as a gift and a thoughtful service!" },
    3: { title: "Receiving Gifts + Receiving Gifts", rating: "94% Synergy", desc: "You both treasure tangible tokens of affection. Keep small surprises or souvenirs coming regularly." },
    4: { title: "Receiving Gifts + Quality Time", rating: "87% Synergy", desc: "Surprise your partner with tickets to an event or experience you can enjoy together." },
    5: { title: "Receiving Gifts + Physical Touch", rating: "88% Synergy", desc: "Give small physical tokens of love alongside hugs and closeness." }
  },
  4: { // Quality Time
    1: { title: "Quality Time + Words", rating: "92% Synergy", desc: "Put phones away during dinner and enjoy meaningful, uninterrupted conversation." },
    2: { title: "Quality Time + Acts of Service", rating: "91% Synergy", desc: "Plan fun dates where you work on a project or cook a meal together." },
    3: { title: "Quality Time + Receiving Gifts", rating: "87% Synergy", desc: "Gift your partner experiences or trips you can take together to create lasting memories." },
    4: { title: "Quality Time + Quality Time", rating: "98% Synergy", desc: "You both thrive on undivided attention. Plan regular date nights without any digital distractions." },
    5: { title: "Quality Time + Physical Touch", rating: "95% Synergy", desc: "Cuddle while watching a movie or hold hands while walking together outdoors." }
  },
  5: { // Physical Touch
    1: { title: "Physical Touch + Words", rating: "94% Synergy", desc: "Combine physical closeness with gentle, loving words of encouragement." },
    2: { title: "Physical Touch + Acts of Service", rating: "89% Synergy", desc: "Offer shoulder rubs after a long workday to show practical care through touch." },
    3: { title: "Physical Touch + Receiving Gifts", rating: "88% Synergy", desc: "Gift cozy items like soft blankets or warm hoodies that provide comfortable physical touch." },
    4: { title: "Physical Touch + Quality Time", rating: "95% Synergy", desc: "Sit close together while relaxing, talking, or spending quiet time at home." },
    5: { title: "Physical Touch + Physical Touch", rating: "99% Synergy", desc: "You both crave physical affection. Hugs, holding hands, and physical proximity keep your bond strong." }
  }
};

const TANK_FILLERS = {
  1: ["Unexpected sweet text messages during the day", "Public compliments in front of friends or family", "Hearing 'I'm proud of you' or 'I believe in you'", "Written sticky notes left on the bathroom mirror"],
  2: ["Cooking dinner when they had an exhausting day", "Fixing something broken around the house unprompted", "Taking over a tedious chore without asking", "Running errands to save them time"],
  3: ["Surprise coffee or treat brought home 'just because'", "Thoughtful presents picked out for milestones", "Keepsakes brought back from travels", "Customized items tailored to their niche interests"],
  4: ["30 minutes of uninterrupted eye contact & conversation", "Dates where both people put their phones away", "Taking an evening walk together without agenda", "Planning weekend getaways focused entirely on connection"],
  5: ["Holding hands while walking or driving", "A long, tight 20-second hug when coming home", "Sitting close together on the couch", "Gentle back rubs or hair stroking while relaxing"]
};

const TANK_DRAINERS = {
  1: ["Harsh, sarcastic, or unconstructive criticism", "Feeling ignored when sharing good news", "Lack of verbal reassurance when feeling down", "Cold silence or passive-aggressive comments"],
  2: ["Broken promises to do chores or favors", "Laziness or creating more mess for them to clean", "Empty verbal promises without practical follow-through", "Dismissing their effort around the house"],
  3: ["Forgotten birthdays or major milestones", "Thoughtless, last-minute generic gifts", "Dismissing physical mementos or gifts they gave you", "Never acknowledging thoughtful presents"],
  4: ["Checking social media while they are speaking", "Repeatedly canceling or postponing date plans", "Feeling like an afterthought during conversations", "Multitasking while having important discussions"],
  5: ["Flinching away or cold physical distance during arguments", "Prolonged physical absence without touch", "Ignoring physical affection when offered", "Treating physical closeness as purely transactional"]
};

const STRESS_DIAL_EFFECTS = {
  1: "Under high stress, your need for reassuring words doubles. Unclear communication or blunt tone feels magnified as personal rejection.",
  2: "Under high stress, chaos and unfinished chores amplify your anxiety. Practical help immediately lowers your stress response.",
  3: "Under high stress, receiving a small, thoughtful gesture grounds you, signaling that someone is keeping you in their thoughts.",
  4: "Under high stress, quality time becomes your ultimate reset. Being rushed or dismissed causes immediate emotional fatigue.",
  5: "Under high stress, physical touch acts as a direct somatic regulator. A long hug lowers cortisol faster than spoken words."
};

const RECONNECTION_RITUALS = {
  1: { quick: "Send a 2-line text explaining one specific thing you admire about them.", deep: "Write a short letter outlining how they have positively impacted your life this month." },
  2: { quick: "Take care of one item on their to-do list without making a fuss.", deep: "Block off a Sunday afternoon to completely handle household chores so they can rest." },
  3: { quick: "Pick up their favorite beverage or snack on your way home.", deep: "Create a surprise gift basket with small items linked to shared memories." },
  4: { quick: "Set a 15-minute timer after work for phone-free check-in.", deep: "Plan a full Saturday outing at a location neither of you has visited before." },
  5: { quick: "Give a firm 20-second hug before leaving or upon returning home.", deep: "Spend 30 minutes giving an unprompted shoulder or foot rub with calm music." }
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

function ResultBar({ label, value, color, isPrimary }) {
  const displayVal = Math.min(Math.max(value || 0, 0), 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-bold text-slate-700">
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isPrimary ? 'bg-rose-500 ring-4 ring-rose-100' : 'bg-slate-300'}`} />
          <span className={isPrimary ? 'text-slate-900 font-black' : 'text-slate-700'}>{label}</span>
          {isPrimary && <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-extrabold border border-rose-100">Primary</span>}
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
          else breakdown[i] = ((i * 20) % 60) + 10;
        }

        const secNum = foundTypeNum === 1 ? 2 : 1;

        stateData = {
          type: foundTypeNum,
          fullTitle: loveLanguagesTypes[foundTypeNum].shortName,
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
    { id: 'overview', label: 'Overview' },
    { id: 'expression', label: 'Giving & Receiving' },
    { id: 'compatibility', label: 'Compatibility Matrix' },
    { id: 'conflict', label: 'Conflict & Healing' },
    { id: 'hacks', label: 'Growth & Hacks' }
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
                
                {/* 1. Hero Profile Card */}
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

                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                     <h2 className={`text-4xl sm:text-5xl md:text-6xl leading-none font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b ${primaryColor} z-10 drop-shadow-sm pb-1 whitespace-nowrap`}>
                       {info.shortName}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Primary Love Language</span>
                  </div>
                </div>

                {/* 2. Dedicated Core Motivations Section */}
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

                {/* 3. Love Language Allocation Statistics */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Love Language Allocation Statistics</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      Calculated concentration across all five emotional expression channels.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(loveLanguagesTypes).map(([numStr, typeObj]) => {
                      const num = parseInt(numStr);
                      const score = breakdown[num] || 0;
                      return (
                        <ResultBar
                          key={num}
                          label={typeObj.name}
                          value={score}
                          color={`bg-linear-to-r ${typeObj.color}`}
                          isPrimary={num === primaryTypeNum}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* 4. Strategic Strengths & Vulnerabilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Strategic Strengths */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Relational Assets</h3>
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

                  {/* Strategic Pitfalls */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">Blindspots & Vulnerabilities</h3>
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
            {/* TAB 2: GIVING & RECEIVING */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'expression' && (
              <div className="space-y-8">
                
                {/* How You Show vs How You Prefer to Receive */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                        <Zap className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">How You Show Love (Giving)</h3>
                    </div>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                      {info.relationshipDynamics}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                        <Heart className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">How You Prefer to Receive Love</h3>
                    </div>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                      {info.description} You feel genuinely valued when a partner demonstrates love through this channel regularly without prompting.
                    </p>
                  </div>
                </div>

                {/* Emotional Tank Fillers vs Drainers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">What Fills Your Emotional Tank</h3>
                    </div>
                    <ul className="space-y-4">
                      {(TANK_FILLERS[primaryTypeNum] || []).map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">What Drains Your Emotional Tank</h3>
                    </div>
                    <ul className="space-y-4">
                      {(TANK_DRAINERS[primaryTypeNum] || []).map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* The Stress-Dial Effect */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-xl font-black text-slate-900">The Stress-Dial Effect</h3>
                  </div>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                    {STRESS_DIAL_EFFECTS[primaryTypeNum]}
                  </p>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: COMPATIBILITY MATRIX */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'compatibility' && (
              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Pairing Dynamics & Synergy Matrix</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Comprehensive synergy breakdown of how your primary love language (<strong className="text-slate-900">{info.name}</strong>) pairs with each of the 5 channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(loveLanguagesTypes).map(([numStr, typeObj]) => {
                    const partnerNum = parseInt(numStr);
                    const pairRule = PAIRING_DYNAMIC_RULES[primaryTypeNum]?.[partnerNum] || {
                      title: `${info.shortName} + ${typeObj.shortName}`,
                      rating: "90% Synergy",
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
                          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                            + {typeObj.shortName}
                          </span>
                          <span className="text-xs font-mono font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                            {pairRule.rating}
                          </span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900">{pairRule.title}</h4>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                          {pairRule.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: CONFLICT & HEALING */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'conflict' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Conflict Resolution & Reconnection Blueprint</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Effective apology guidelines and step-by-step de-escalation protocols tailored to your love language.
                  </p>
                </div>

                {/* Key Resolution Rule */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">How to Resolve Disagreements Effectively</h4>
                  </div>
                  
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium max-w-4xl">
                    When conflict arises with a partner who speaks a different love language, generic apologies often miss the mark. Here is the golden rule for resolving friction with someone whose primary language is <strong className="text-slate-900">{info.name}</strong>:
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-200/80 p-6 md:p-8 rounded-2xl text-slate-800 text-base md:text-lg font-bold leading-relaxed">
                    💡 Key Resolution Rule: {info.name === "Words of Affirmation" ? "Offer clear, non-defensive verbal apologies out loud. Written notes or explicit spoken reassurance work wonders." : info.name === "Acts of Service" ? "Take immediate, tangible action to resolve the issue — practical effort speaks far louder than spoken apologies." : info.name === "Receiving Gifts" ? "Hand over a thoughtful token or card demonstrating you spent genuine effort thinking about their feelings." : info.name === "Quality Time" ? "Put your phone completely away, sit down face-to-face, and give undivided attention until both sides feel heard." : "Offer a gentle, long hug and hold hands before diving into detailed discussion."}
                  </div>
                </div>

                {/* Reconnection Rituals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-600 font-extrabold uppercase text-xs tracking-wider">
                      <RefreshCw className="w-4 h-4" />
                      <span>5-Minute Quick Reset Ritual</span>
                    </div>
                    <p className="text-slate-800 text-base md:text-lg font-bold leading-relaxed">
                      {RECONNECTION_RITUALS[primaryTypeNum]?.quick}
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500 font-extrabold uppercase text-xs tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Deep Connection Ritual</span>
                    </div>
                    <p className="text-slate-800 text-base md:text-lg font-bold leading-relaxed">
                      {RECONNECTION_RITUALS[primaryTypeNum]?.deep}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: GROWTH & HACKS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'hacks' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Relationship Hacks & Emotional Tank Mastery</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Long-distance connection hacks, self-love practices, and daily maintenance routines.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hack 1 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2">
                      <Scale className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Remote Connection Hack</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      If in a long-distance setting, use digital voice notes or scheduled video dates to deliver your love language regularly.
                    </p>
                  </div>

                  {/* Hack 2 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-2">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Self-Love Tank Alignment</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Don't rely 100% on external partners to fill your tank. Practice self-affirmation, self-care routines, or personal treats daily.
                    </p>
                  </div>

                  {/* Hack 3 */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900">Weekly Tank Check-In</h4>
                    <p className="text-slate-600 font-medium text-sm leading-relaxed">
                      Ask your partner every Sunday: "On a scale of 1 to 10, how full is your emotional tank this week?"
                    </p>
                  </div>
                </div>

                {/* Emotional Tank Mastery Card */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-rose-400" />
                    <h4 className="text-2xl font-black">Emotional Tank Mastery Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    Great relationships are not built on finding someone who naturally speaks your language fluently; they are built on two partners willing to learn each other's native dialect over time.
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
