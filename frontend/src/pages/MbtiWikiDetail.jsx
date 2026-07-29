import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate, Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Brain, Shield, Heart, Activity, Target, Flame, AlertTriangle, 
  Zap, Sparkles, Compass, CheckCircle2, BookOpen, Briefcase, Users, Star, 
  Lightbulb, Layers, MessageSquare, Smile, HelpCircle, Check, X
} from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';

// Rich, plain-English cognitive function explanations
const cognitiveStacksSimple = {
  INTP: [
    { rank: "1st (Dominant)", function: "Ti", name: "The Truth Detector", desc: "Your mind acts like a logical filter. You automatically catch contradictions and notice when something doesn't make total sense." },
    { rank: "2nd (Auxiliary)", function: "Ne", name: "The Idea Connector", desc: "You love asking 'What if?'. Your brain naturally connects random concepts and imagines endless interesting possibilities." },
    { rank: "3rd (Tertiary)", function: "Si", name: "The Memory Vault", desc: "You store specific facts about topics you love, though you might forget everyday chores or where you left your phone." },
    { rank: "4th (Inferior)", function: "Fe", name: "The Secret Heart", desc: "Deep down you want to get along with others, but heavy emotional drama feels confusing and drains your energy fast." }
  ],
  ISTP: [
    { rank: "1st (Dominant)", function: "Ti", name: "The System Mechanic", desc: "You love taking things apart—code, engines, or games—to figure out exactly how every moving piece works." },
    { rank: "2nd (Auxiliary)", function: "Se", name: "The Action Scanner", desc: "You live in the physical right-now. You notice tiny details around you and react instantly with calm physical agility." },
    { rank: "3rd (Tertiary)", function: "Ni", name: "The Quiet Hunch", desc: "You get occasional gut feelings about how a situation will turn out, even if you don't talk about it out loud." },
    { rank: "4th (Inferior)", function: "Fe", name: "The Feeling Hazard", desc: "Unfiltered emotional outbursts make you uncomfortable. You prefer showing care by physically fixing problems instead." }
  ]
};

// Rich plain-English daily life, myths, and communication guide
const simpleTypeGuides = {
  INTP: {
    simpleSummary: "INTPs are quiet, deeply curious thinkers who love exploring ideas and understanding how the world works. They live in their own heads, building logical frameworks, and value total mental freedom.",
    scenarios: [
      { title: "At 3:00 AM", desc: "Falling down a Wikipedia rabbit hole reading about quantum physics or ancient ruins just because a random question popped into your head." },
      { title: "In Conversations", desc: "Quietly listening until someone says something logically incorrect, then gently correcting them without meaning to be mean." },
      { title: "With Projects", desc: "Having 40 open browser tabs and 5 half-finished ideas because designing the idea is much more fun than doing boring paperwork." }
    ],
    myths: [
      { myth: "INTPs are cold and don't care about people.", fact: "They care deeply, but they express love by solving your problems logically rather than giving dramatic speeches." },
      { myth: "INTPs are lazy.", fact: "Their mind is working 24/7. They just hate repetitive, mindless chores that don't challenge their brain." },
      { myth: "INTPs are bad at social life.", fact: "They enjoy great conversations! They just prefer deep one-on-one chats about real topics over shallow small talk." }
    ],
    howToTalk: [
      { do: "Be direct, clear, and logical.", dont: "Don't play passive-aggressive emotional games." },
      { do: "Give them quiet time to think before expecting an answer.", dont: "Don't force them into sudden loud group pressure." },
      { do: "Talk about fascinating concepts or shared hobbies.", dont: "Don't overwhelm them with surface-level gossip." }
    ],
    growthHacks: [
      "Pick ONE project and finish it before jumping to the next shiny new idea.",
      "Remember that people process feelings before logic, so deliver feedback gently.",
      "Schedule small breaks to stretch and go outside so you don't get trapped in your head."
    ]
  },
  ISTP: {
    simpleSummary: "ISTPs are calm, hands-on problem solvers who love tools, gadgets, and real-world action. They learn by doing, stay relaxed during emergencies, and fiercely protect their personal freedom.",
    scenarios: [
      { title: "In an Emergency", desc: "While everyone else is panicking, you stay completely relaxed, pick up a tool, and calmly fix the physical breakdown." },
      { title: "With Rules", desc: "You view rules as polite suggestions. If a rule gets in the way of getting something done efficiently, you just bypass it." },
      { title: "With Hobbies", desc: "You love activities where you use your hands or body—fixing cars, coding, gaming, sports, or outdoor adventures." }
    ],
    myths: [
      { myth: "ISTPs are aggressive or mean.", fact: "They just have a relaxed, neutral face and don't waste words on fake politeness." },
      { myth: "ISTPs don't plan ahead.", fact: "They prefer solving actual problems in front of them right now instead of stressing over imaginary future drama." },
      { myth: "ISTPs don't build close bonds.", fact: "They are fiercely loyal friends who show up when you need real physical help." }
    ],
    howToTalk: [
      { do: "Keep text messages short, clear, and to the point.", dont: "Don't send giant walls of emotional text." },
      { do: "Do activities together (gaming, working on a project, sports).", dont: "Don't force them to sit in circles talking about feelings for hours." },
      { do: "Respect their personal space and need for freedom.", dont: "Don't try to micromanage their schedule." }
    ],
    growthHacks: [
      "Let your friends and loved ones know where you are so they don't feel ghosted.",
      "Pause for 5 seconds before jumping into high-risk physical fun.",
      "Remember to explain your thoughts aloud so others understand your brilliant solutions."
    ]
  }
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

export default function MbtiWikiDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, type]);

  const uppercaseType = (type || 'INTP').toUpperCase();
  const typeInfo = typeDescriptions[uppercaseType];

  if (!typeInfo) {
    return <Navigate to="/wiki" replace />;
  }

  // Fallbacks for cognitive stacks and simple guides
  const stack = cognitiveStacksSimple[uppercaseType] || [
    { rank: "1st (Dominant)", function: "Main", name: "Primary Mind Filter", desc: "How your brain naturally gathers information and makes instant judgments." },
    { rank: "2nd (Auxiliary)", function: "Support", name: "Creative Engine", desc: "Helps your main filter explore new ideas and balance your focus." },
    { rank: "3rd (Tertiary)", function: "Balance", name: "Backup Strength", desc: "Adds extra perspective when you are relaxed and growing." },
    { rank: "4th (Inferior)", function: "Growth", name: "Subconscious Spot", desc: "Where you feel vulnerable or stressed when energy runs low." }
  ];

  const guide = simpleTypeGuides[uppercaseType] || {
    simpleSummary: `${uppercaseType}s are unique thinkers with distinct strengths and habits that shape how they work, connect, and thrive.`,
    scenarios: [
      { title: "When Working", desc: "Operating in your natural rhythm when given the right space and clarity." },
      { title: "In Conversations", desc: "Bringing your unique perspective to debates and discussions." },
      { title: "Under Pressure", desc: "Relying on your core instincts when obstacles appear." }
    ],
    myths: [
      { myth: "People misunderstand your quiet focus.", fact: "You care deeply about doing things right and staying true to yourself." }
    ],
    howToTalk: [
      { do: "Be genuine and clear in your communication.", dont: "Avoid confusing or contradictory signals." }
    ],
    growthHacks: [
      "Balance your natural focus with regular rest and social connection.",
      "Celebrate small wins along the way."
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Brain Functions' },
    { id: 'dailylife', label: 'Daily Life & Myths' },
    { id: 'strengths', label: 'Strengths & Growth Hacks' },
    { id: 'relationships', label: 'Relationships & Communication' },
    { id: 'careers', label: 'Careers & Workplace' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-indigo-200">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-indigo-50 rounded-full blur-[120px] pointer-events-none opacity-70 z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] bg-purple-50 rounded-full blur-[120px] pointer-events-none opacity-70 z-0" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-32 pb-32 relative z-10">
        
        {/* Top Navigation - Return to Wiki */}
        <div className="flex justify-between items-center mb-10">
          <button 
            type="button"
            onClick={() => navigate('/wiki')}
            className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </div>
            <span>Back to Wiki Directory</span>
          </button>

          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
            MBTI Knowledge Base
          </span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Title Box (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-indigo-500 to-purple-600 opacity-90" />
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono">
                  {uppercaseType}
                </span>
                <span className="text-base sm:text-xl font-extrabold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                  {typeInfo.title}
                </span>
              </div>
              
              <p className="text-slate-700 max-w-4xl leading-relaxed font-medium text-base sm:text-lg md:text-xl mb-6">
                {guide.simpleSummary || typeInfo.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider border border-slate-200/60">
                  {typeInfo.mythologicalArchetype || "Archetype"}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 font-extrabold text-xs uppercase tracking-wider border border-purple-100">
                  Cognitive Profile
                </span>
              </div>
            </div>
          </div>

          {/* Standardized 2nd Box (4 Cols - Icon Free) */}
          <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 z-10 drop-shadow-sm pb-1 leading-none font-mono">
              {uppercaseType}
            </h2>
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">
              {typeInfo.title}
            </span>
          </div>

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

        {/* Dynamic Tab Content */}
        <AnimatePresence mode="wait">
          <Motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* ---------------------------------------------------- */}
            {/* TAB 1: OVERVIEW & BRAIN FUNCTIONS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                
                {/* How Their Brain Works (Plain English Cognitive Stack) */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Cognitive Architecture & Brain Functions</h3>
                    <p className="text-slate-500 text-sm font-medium">
                      The 4 main filters your brain uses to think, process information, and make decisions every day.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stack.map((fn, idx) => (
                      <div key={idx} className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 space-y-3 relative overflow-hidden">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">{fn.rank}</span>
                          <span className="text-sm font-mono font-black px-3 py-1 bg-white text-indigo-600 rounded-md border border-slate-200">
                            {fn.function}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-slate-900">{fn.name}</h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">{fn.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secret Dreams & Hidden Fears */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Shield className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What Drives You (Secret Dreams)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{typeInfo.secretDreams}</p>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-3">
                    <div className="flex items-center gap-2 text-rose-500">
                      <Heart className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-wider">What You Avoid (Hidden Fears)</span>
                    </div>
                    <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{typeInfo.hiddenFears}</p>
                  </div>
                </div>

                {/* Core Values & Fun Facts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Core Values */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Star className="w-5 h-5 text-amber-500" />
                      <h4 className="text-xl font-black text-slate-900">Core Values</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {typeInfo.coreValues?.map((val, idx) => (
                        <span key={idx} className="px-4 py-2 rounded-xl bg-amber-50 text-amber-800 font-extrabold text-sm border border-amber-100">
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fun Quirks */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <Sparkles className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-xl font-black text-slate-900">Fun Quirks & Habits</h4>
                    </div>
                    <ul className="space-y-3">
                      {typeInfo.funFacts?.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: DAILY LIFE & MYTHS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'dailylife' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Daily Life Scenarios & Misconceptions</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Real-world situations you will recognize, and busting common myths about how you operate.
                  </p>
                </div>

                {/* Real World Scenarios */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Smile className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xl font-black text-slate-900">Real-World Daily Scenarios</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guide.scenarios?.map((scen, idx) => (
                      <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">{scen.title}</span>
                        <p className="text-slate-700 text-sm font-medium leading-relaxed">{scen.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Misconceptions (Myths vs Facts) */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                    <h4 className="text-xl font-black text-slate-900">Common Misconceptions (Myths vs Facts)</h4>
                  </div>

                  <div className="space-y-4">
                    {guide.myths?.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex items-start gap-3 text-rose-700">
                          <X className="w-5 h-5 mt-0.5 shrink-0 text-rose-500" />
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-rose-500 block mb-1">Myth</span>
                            <p className="text-slate-800 text-sm font-semibold">{item.myth}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-emerald-700">
                          <Check className="w-5 h-5 mt-0.5 shrink-0 text-emerald-500" />
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block mb-1">The Reality</span>
                            <p className="text-slate-800 text-sm font-semibold">{item.fact}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 3: STRENGTHS & GROWTH HACKS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'strengths' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Strengths & Simple Growth Hacks</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    Easy-to-understand breakdown of what you excel at, blindspots to watch out for, and simple growth tips.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strengths */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">Your Greatest Superpowers</h4>
                    </div>
                    <ul className="space-y-4">
                      {typeInfo.strengths?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">Things That Catch You Off Guard</h4>
                    </div>
                    <ul className="space-y-4">
                      {typeInfo.weaknesses?.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Simple Personal Growth Hacks */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <h4 className="text-xl font-black text-slate-900">Simple Personal Growth Hacks</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guide.growthHacks?.map((hack, idx) => (
                      <div key={idx} className="bg-amber-50/60 p-6 rounded-2xl border border-amber-100/80 space-y-2">
                        <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">Hack #{idx + 1}</span>
                        <p className="text-slate-800 text-sm font-semibold leading-relaxed">{hack}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: RELATIONSHIPS & COMMUNICATION */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'relationships' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Relationships & Communication Guide</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    How you handle love, friendships, and practical tips on how others can best communicate with you.
                  </p>
                </div>

                {/* How to Talk to Them Card */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xl font-black text-slate-900">How Others Should Communicate With You</h4>
                  </div>

                  <div className="space-y-4">
                    {guide.howToTalk?.map((rule, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 text-emerald-700 font-semibold text-sm">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black uppercase">DO</span>
                          <span>{rule.do}</span>
                        </div>
                        <div className="flex items-center gap-3 text-rose-700 font-semibold text-sm">
                          <span className="px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-black uppercase">DON'T</span>
                          <span>{rule.dont}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Romantic Dynamics */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Heart className="w-5 h-5 text-rose-500" />
                    <h4 className="text-xl font-black text-slate-900">Love & Romantic Relationships</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-relaxed">
                    {typeInfo.romantic}
                  </p>
                </div>

                {/* Friendships */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xl font-black text-slate-900">Friendships & Hanging Out</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-relaxed">
                    {typeInfo.friendships}
                  </p>
                </div>

                {/* Compatibility Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Compatible Pairs */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4">
                    <h4 className="text-lg font-black text-slate-900">Great Synergy Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {typeInfo.compatibility?.map((code, idx) => (
                        <Link 
                          key={idx}
                          to={`/wiki/mbti/${code.toLowerCase()}`}
                          className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-mono font-black text-sm border border-emerald-100 hover:bg-emerald-100 transition-colors"
                        >
                          {code}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Growth Challenge Pairs */}
                  <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 space-y-4">
                    <h4 className="text-lg font-black text-slate-900">Growth Challenge Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {typeInfo.incompatible?.map((code, idx) => (
                        <Link 
                          key={idx}
                          to={`/wiki/mbti/${code.toLowerCase()}`}
                          className="px-4 py-2 rounded-xl bg-rose-50 text-rose-800 font-mono font-black text-sm border border-rose-100 hover:bg-rose-100 transition-colors"
                        >
                          {code}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 5: CAREERS & WORKPLACE */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'careers' && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Careers & Workplace Style</h3>
                  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                    The best work environments for your personality and top career paths where you excel.
                  </p>
                </div>

                {/* Workplace Style */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-xl font-black text-slate-900">Your Ideal Work Environment</h4>
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-relaxed">
                    {typeInfo.workplace}
                  </p>
                </div>

                {/* Recommended Careers Grid */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 space-y-6">
                  <h4 className="text-xl font-black text-slate-900">Top Recommended Careers</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {typeInfo.careers?.map((career, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 font-extrabold text-slate-800 text-center text-sm shadow-2xs">
                        {career}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mastery Protocol */}
                <div className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-14 text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-indigo-400" />
                    <h4 className="text-2xl font-black">Personal Growth Protocol</h4>
                  </div>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-4xl italic">
                    Your personality type is a tool for self-understanding, not a box. Embrace your natural strengths, stay open to learning, and give yourself permission to grow at your own comfortable pace.
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
