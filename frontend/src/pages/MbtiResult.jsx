import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Activity,
  Target,
  Zap,
  Heart,
  Compass,
  Briefcase,
  Users,
  Smile,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';

// Clear explanation of each letter trait for pros, cons, and why
const DIMENSION_DETAILS = {
  E: {
    title: "Extraverted",
    why: "You feel charged up when interacting with other people and participating in external activities.",
    pros: ["Great at collaborative work", "Outspoken and active communicator", "Builds networks easily"],
    cons: ["Can find prolonged isolation difficult", "May act before fully thinking through consequences"]
  },
  I: {
    title: "Introverted",
    why: "You feel most energized when spending time in quiet reflection or focusing on your inner thoughts.",
    pros: ["Independent worker", "Thoughtful listener who processes deeply", "Strong self-reliance"],
    cons: ["May hold back ideas too much", "Can easily exhaust social energy"]
  },
  N: {
    title: "Intuitive",
    why: "You naturally look for patterns, abstract concepts, and future possibilities rather than just looking at concrete data.",
    pros: ["Excellent at big-picture planning", "Creative problem solver", "Enjoys exploring theoretical concepts"],
    cons: ["Can overlook practical details", "May struggle with repetitive execution tasks"]
  },
  S: {
    title: "Sensing",
    why: "You focus on concrete details, factual evidence, and immediate realities.",
    pros: ["Grounded, practical and highly realistic", "Great attention to detail", "Relies on proven methods"],
    cons: ["Can resist new, unproven changes", "May miss broader future trends"]
  },
  T: {
    title: "Thinking",
    why: "You prioritize objective logic, fairness, and rational reasoning when making choices.",
    pros: ["Makes objective, unbiased judgments", "Clairvoyant problem solver", "Stays calm under emotional pressure"],
    cons: ["Can seem detached or insensitive", "May overlook emotional elements of situations"]
  },
  F: {
    title: "Feeling",
    why: "You place high value on personal principles, emotional harmony, and how choices impact other people.",
    pros: ["Empathetic and supportive", "Builds cohesive, friendly environments", "Strong value system"],
    cons: ["May avoid necessary conflicts", "Can take objective feedback personally"]
  },
  J: {
    title: "Judging",
    why: "You prefer a structured, organized life with clear timelines and finalized plans.",
    pros: ["Highly organized and reliable", "Great at meeting milestones", "Brings order to chaos"],
    cons: ["Can struggle with sudden changes", "May rush decisions just to settle them"]
  },
  P: {
    title: "Prospecting",
    why: "You prefer to keep your schedule open and flexible to adapt to new choices.",
    pros: ["Adaptable and highly open-minded", "Thrives in spontaneous situations", "Finds creative workarounds"],
    cons: ["Can struggle with strict timelines", "May leave projects unfinished"]
  }
};

// Helper to dynamically calculate compatibility and incompatibility lists
// returns lists grouped by Introvert and Extrovert
function getCompatibilityLists(userType) {
  const allTypes = ["INTJ", "INTP", "INFJ", "INFP", "ISTJ", "ISTP", "ISFJ", "ISFP", "ENTJ", "ENTP", "ENFJ", "ENFP", "ESTJ", "ESTP", "ESFJ", "ESFP"];
  
  const userI = userType[0];
  const userN = userType[1];
  const userT = userType[2];
  const userP = userType[3];
  
  const compatible = [];
  const incompatible = [];
  
  allTypes.forEach(other => {
    if (other === userType) return;
    
    const otherI = other[0];
    const otherN = other[1];
    const otherT = other[2];
    const otherP = other[3];
    
    let score = 0;
    if (userN === otherN) score += 3; // N-N communication alignment
    if (userI !== otherI) score += 2; // E-I chemistry spark
    if (userT === otherT) score += 1; // logical/values agreement
    if (userP !== otherP) score += 1; // schedule balancing
    
    if (score >= 4) {
      compatible.push(other);
    } else if (score <= 2 || userN !== otherN) {
      incompatible.push(other);
    }
  });

  return {
    compatibleIntroverts: compatible.filter(t => t.startsWith('I')),
    compatibleExtroverts: compatible.filter(t => t.startsWith('E')),
    incompatibleIntroverts: incompatible.filter(t => t.startsWith('I')),
    incompatibleExtroverts: incompatible.filter(t => t.startsWith('E'))
  };
}

// Explains why two types match or clash
function getSynergyExplanation(userType, partnerType, isCompatible) {
  const userI = userType[0];
  const userN = userType[1];
  const userT = userType[2];
  const userP = userType[3];

  const partI = partnerType[0];
  const partN = partnerType[1];
  const partT = partnerType[2];
  const partP = partnerType[3];

  if (isCompatible) {
    if (userN === partN && userI !== partI) {
      return `Both share the **Intuitive (${userN})** vision, while the opposite **Extravert/Introvert** traits bring a **natural balance** of outgoing energy and calm reflection.`;
    }
    if (userN === partN) {
      return `Shared **Intuitive (${userN})** perspective allows you to connect instantly through **deep conversations** and future-focused concepts.`;
    }
    return `Shared decision-making priorities bring **harmonious alignment** and mutual support.`;
  } else {
    if (userN !== partN) {
      return `Opposite **Intuitive/Sensing** values can cause friction, as one focuses on **abstract theories** while the other values **practical facts**.`;
    }
    if (userT !== partT) {
      return `Friction may arise between **objective logic** and **personal feelings** when resolving issues together.`;
    }
    return `Opposing lifestyles and scheduling styles might cause coordination challenges.`;
  }
}

function formatMarkdown(text) {
  if (!text) return "";
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return <strong key={idx} className="font-extrabold text-slate-900">{part}</strong>;
    }
    return part;
  });
}

export default function MbtiResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const upperType = type?.toUpperCase();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const typeInfo = typeDescriptions[upperType];

  useEffect(() => {
    if (upperType) {
      localStorage.setItem('omnitype_mbti', upperType);
    }
  }, [upperType]);

  if (!typeInfo) {
    return <Navigate to="/test/mbti" replace />;
  }

  const getSimulatedScores = (typeStr) => {
    return {
      EI: typeStr.includes('E') ? 78 : 22,
      SN: typeStr.includes('N') ? 15 : 85, 
      TF: typeStr.includes('T') ? 71 : 29, 
      JP: typeStr.includes('J') ? 65 : 35, 
    };
  };

  const percentages = location.state?.percentages || getSimulatedScores(upperType);

  const mbtiBreakdown = {
    E: { title: "Extraversion", desc: "Gets energy from social activity." },
    I: { title: "Introversion", desc: "Refuels in quiet solitude." },
    N: { title: "Intuition", desc: "Focuses on concepts and future ideas." },
    S: { title: "Sensing", desc: "Relies on concrete details and facts." },
    T: { title: "Thinking", desc: "Prioritizes logic and reasoning." },
    F: { title: "Feeling", desc: "Weighs values and group harmony." },
    J: { title: "Judging", desc: "Prefers plans and structure." },
    P: { title: "Prospecting", desc: "Thrives in open schedules." }
  };

  const letterExplainer = upperType.split('').map(char => {
    return {
      letter: char,
      ...mbtiBreakdown[char]
    };
  });

  const activeDimensions = upperType.split('').map(char => {
    const details = DIMENSION_DETAILS[char];
    const opposing = char === 'E' ? 'I' : char === 'I' ? 'E' : char === 'N' ? 'S' : char === 'S' ? 'N' : char === 'T' ? 'F' : char === 'F' ? 'T' : char === 'J' ? 'P' : 'J';
    const opposingDetails = DIMENSION_DETAILS[opposing];
    return {
      activeChar: char,
      opposingChar: opposing,
      activeTitle: details.title,
      opposingTitle: opposingDetails.title,
      why: details.why,
      pros: details.pros,
      cons: details.cons
    };
  });

  const {
    compatibleIntroverts,
    compatibleExtroverts,
    incompatibleIntroverts,
    incompatibleExtroverts
  } = getCompatibilityLists(upperType);

  const highlightSentence = (text) => {
    const fillers = /^(they\s+possess\s+an\s+|they\s+can\s+easily\s+|they\s+frequently\s+|their\s+|they\s+exhibit\s+|once\s+they\s+|they\s+|despite\s+their\s+)/i;
    let cleanText = text.replace(fillers, '');
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    
    const words = cleanText.split(' ');
    // Find a good length to bold. If sentence starts with "Unswayed by popular opinion", bold that chunk.
    const boldCount = Math.min(words.length, 4);
    const boldPart = words.slice(0, boldCount).join(' ');
    const regularPart = words.slice(boldCount).join(' ');
    
    return (
      <span>
        <strong className="text-slate-900 font-extrabold">{boldPart}</strong> {regularPart}
      </span>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cognitive', label: 'Cognitive Details' },
    { id: 'traits', label: 'Traits & Careers' },
    { id: 'synergy', label: 'Compatibility' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-indigo-200">
      
      {/* Decorative Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-${typeInfo.colors[0]}-100/45 rounded-full blur-[120px] pointer-events-none z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] bg-${typeInfo.colors[1]}-100/45 rounded-full blur-[120px] pointer-events-none z-0`} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-32 pb-32 relative z-10">
        
        {/* Navigation */}
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 font-semibold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full bg-${typeInfo.colors[0]}-50 border border-${typeInfo.colors[0]}-100 flex items-center justify-center group-hover:bg-${typeInfo.colors[0]}-100 transition-colors`}>
              <ChevronLeft className={`w-4 h-4 text-${typeInfo.colors[0]}-600`} />
            </div>
            <span>Dashboard</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-slate-200/60 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
                activeTab === tab.id
                  ? `bg-slate-900 text-white shadow-sm`
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Hero Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b from-${typeInfo.colors[0]}-400 to-${typeInfo.colors[1]}-400 opacity-80`} />
                    <h3 className={`text-xs font-bold tracking-[0.4em] uppercase mb-4 text-${typeInfo.colors[0]}-500 flex items-center gap-2`}>
                      <Activity className="w-4 h-4" />
                      Personality Profile
                    </h3>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 text-slate-900 tracking-tight leading-none">
                      {typeInfo.title}
                    </h1>
                    <p className="text-slate-550 max-w-4xl leading-relaxed font-normal text-sm md:text-base">
                      {typeInfo.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden">
                     <h2 className={`text-[clamp(4rem,8vw,6.5rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-${typeInfo.colors[0]}-500 to-${typeInfo.colors[1]}-600 z-10 drop-shadow-sm pb-1 whitespace-nowrap`}>
                       {upperType}
                     </h2>
                     <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mt-2 z-10 whitespace-nowrap">Personality Axis</span>
                  </div>
                </div>

                {/* Core focus block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full inline-block mb-3">Core Motive</span>
                    <h4 className="text-base font-black text-slate-805 mb-2">What drives you most</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      You are naturally driven to make sense of the world, solve complex concepts, and build systems that work. You value competency, clear logic, and independence in execution.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-full inline-block mb-3">Daily Habits</span>
                    <h4 className="text-base font-black text-slate-805 mb-2">How you interact daily</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {typeInfo.habits}
                    </p>
                  </div>
                </div>

                {/* Letter breakdowns */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-l-2 border-slate-300 pl-2">Letter Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {letterExplainer.map((item, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs hover:shadow-xs transition">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-3xl font-black text-slate-800 leading-none">{item.letter}</span>
                          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full">{item.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-450 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs relative overflow-hidden">
                    <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-full inline-block mb-3">Social Persona</span>
                    <h4 className="text-lg font-black text-slate-800 mb-2">{typeInfo.mythologicalArchetype || "The Cosmic Observer"}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">Your underlying persona acts as a vital pillar in team architectures and relationships.</p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs relative overflow-hidden">
                    <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded-full inline-block mb-3">Core Dreams</span>
                    <h4 className="text-lg font-black text-slate-800 mb-2">{typeInfo.secretDreams || "To find alignment in values"}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{typeInfo.hiddenFears || "You thrive when given autonomy and space to think."}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cognitive' && (
              <div className="space-y-8">
                {/* Sliders */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-12">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Cognitive Balance Layer</h3>
                    <p className="text-slate-500 text-xs">Visual spectrum allocation across four major cognitive polarities.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <ResultBar left="Extraverted" right="Introverted" leftCode="E" rightCode="I" leftValue={percentages.EI} rightValue={100 - percentages.EI} color={`bg-${typeInfo.colors[0]}-500`} />
                    <ResultBar left="Intuitive" right="Observant" leftCode="N" rightCode="S" leftValue={100 - percentages.SN} rightValue={percentages.SN} color={`bg-${typeInfo.colors[1]}-500`} />
                    <ResultBar left="Thinking" right="Feeling" leftCode="T" rightCode="F" leftValue={percentages.TF} rightValue={100 - percentages.TF} color={`bg-${typeInfo.colors[0]}-400`} />
                    <ResultBar left="Judging" right="Prospecting" leftCode="J" rightCode="P" leftValue={percentages.JP} rightValue={100 - percentages.JP} color={`bg-${typeInfo.colors[1]}-400`} />
                  </div>
                </div>

                {/* Explanations Grid */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-l-2 border-slate-350 pl-2">Understanding Your Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeDimensions.map((dim, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-2xs space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h4 className="text-base font-black text-slate-800">{dim.activeTitle} <span className="text-xs text-slate-400 font-bold">({dim.activeChar})</span></h4>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">vs {dim.opposingTitle} ({dim.opposingChar})</span>
                        </div>
                        
                        <p className="text-xs text-slate-500 leading-relaxed font-medium bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                          <strong>Why:</strong> {dim.why}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-2">Advantages</span>
                            <ul className="space-y-1.5">
                              {dim.pros.map((p, i) => (
                                <li key={i} className="text-[11px] text-slate-500 font-medium leading-tight flex items-start gap-1">
                                  <span className="text-emerald-500 font-bold">•</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-2">Blind Spots</span>
                            <ul className="space-y-1.5">
                              {dim.cons.map((c, i) => (
                                <li key={i} className="text-[11px] text-slate-500 font-medium leading-tight flex items-start gap-1">
                                  <span className="text-rose-400 font-bold">•</span>
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'traits' && (
              <div className="space-y-8">
                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl bg-${typeInfo.colors[0]}-50 flex items-center justify-center`}>
                        <Target className={`w-5 h-5 text-${typeInfo.colors[0]}-500`} />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">Strengths</h3>
                    </div>
                    <ul className="space-y-4">
                      {typeInfo.strengths.map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-500 font-medium text-xs leading-relaxed items-start">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${typeInfo.colors[0]}-400 mt-1.5 shrink-0`} />
                          <span>{highlightSentence(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl bg-${typeInfo.colors[1]}-50 flex items-center justify-center`}>
                        <Zap className={`w-5 h-5 text-${typeInfo.colors[1]}-500`} />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">Blind Spots</h3>
                    </div>
                    <ul className="space-y-4">
                      {typeInfo.weaknesses.map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-500 font-medium text-xs leading-relaxed items-start">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${typeInfo.colors[1]}-400 mt-1.5 shrink-0`} />
                          <span>{highlightSentence(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Careers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-xs font-bold tracking-wider text-slate-450 uppercase">Suitable Career Paths</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {typeInfo.careers.map((career, i) => (
                        <div key={i} className={`font-semibold bg-slate-50 text-slate-700 px-4 py-3.5 rounded-2xl border border-slate-100 text-[11px] flex items-center justify-between`}>
                          <span>{career}</span>
                          <div className={`w-1.5 h-1.5 rounded-full bg-${typeInfo.colors[i % 2]}-400`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                      <Compass className="w-5 h-5 text-amber-500" />
                      <h4 className="text-xs font-bold tracking-wider text-slate-450 uppercase">Workplace Behavior</h4>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed text-xs">
                      {typeInfo.workplace || "Thrives in settings with clear boundaries, logic-driven expectations, and plenty of autonomous focus."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'synergy' && (
              <div className="space-y-8">
                {/* Chemistry Grid: Detailed compatible & incompatible types split by E/I */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs space-y-8">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-black text-slate-800">Chemistry Profile</h3>
                    <p className="text-slate-400 text-xs mt-1">Detailed compatibility matrix split across Introvert and Extrovert groups.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* COMPATIBLE SECTION */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-l-2 border-emerald-500 pl-2.5">
                        <Heart className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">Compatible With</span>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Introvert Types */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Introvert Types</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {compatibleIntroverts.map((partner) => (
                              <div key={partner} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:border-slate-200 transition">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-white shadow-xs shrink-0">
                                  {partner}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-slate-800 uppercase block">{partner}</span>
                                  <p className="text-[11px] text-slate-500 leading-normal">{formatMarkdown(getSynergyExplanation(upperType, partner, true))}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Extrovert Types */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Extrovert Types</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {compatibleExtroverts.map((partner) => (
                              <div key={partner} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:border-slate-200 transition">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-white shadow-xs shrink-0">
                                  {partner}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-slate-800 uppercase block">{partner}</span>
                                  <p className="text-[11px] text-slate-500 leading-normal">{formatMarkdown(getSynergyExplanation(upperType, partner, true))}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* INCOMPATIBLE SECTION */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-l-2 border-rose-500 pl-2.5">
                        <Zap className="w-4 h-4 text-rose-500" />
                        <span className="text-xs font-bold tracking-wider text-rose-600 uppercase">Incompatible With</span>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Introvert Types */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Introvert Types</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {incompatibleIntroverts.map((partner) => (
                              <div key={partner} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:border-slate-200 transition">
                                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 font-black text-xs flex items-center justify-center border border-white shadow-xs shrink-0">
                                  {partner}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-slate-800 uppercase block">{partner}</span>
                                  <p className="text-[11px] text-slate-500 leading-normal">{formatMarkdown(getSynergyExplanation(upperType, partner, false))}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Extrovert Types */}
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Extrovert Types</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {incompatibleExtroverts.map((partner) => (
                              <div key={partner} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:border-slate-205 transition">
                                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 font-black text-xs flex items-center justify-center border border-white shadow-xs shrink-0">
                                  {partner}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-slate-800 uppercase block">{partner}</span>
                                  <p className="text-[11px] text-slate-500 leading-normal">{formatMarkdown(getSynergyExplanation(upperType, partner, false))}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                {/* Checklist Rules details */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs space-y-4">
                  <h4 className="text-base font-black text-slate-800">Chemistry Dynamic Summary</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-550 leading-relaxed font-medium">
                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <p>
                        <strong>Social Environment:</strong> As an {upperType.includes('I') ? 'Introvert' : 'Extravert'}, you thrive best with those who appreciate your social stamina. {upperType.includes('I') ? 'You naturally connect with partners who respect your need for downtime.' : 'You vibe with partners who enjoy active gatherings and shared outings.'}
                      </p>
                      <p>
                        <strong>Ideas & Reality:</strong> As an {upperType.includes('N') ? 'Intuitive' : 'Sensing'} thinker, communication is easiest with matching processors. {upperType.includes('N') ? 'You look for deep conceptual relationships rather than superficial small talk.' : 'You appreciate practical, concrete facts and immediate experiences.'}
                      </p>
                    </div>

                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <p>
                        <strong>Logic vs Feeling:</strong> Decision making preferences dictate how you handle conflicts. {upperType.includes('T') ? 'You prefer logical, objective reasoning and want direct feedback.' : 'You value empathy, harmony, and feeling validated when discussing issues.'}
                      </p>
                      <p>
                        <strong>Scheduling styles:</strong> Organization preferences dictate your planning layout. {upperType.includes('J') ? 'You love structural plans, finalized commitments, and reliability.' : 'You prefer spontaneous plans, keep your calendar open, and adapt quickly.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* General Dynamics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Romance Styles</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{typeInfo.romantic || "Appreciates honest, authentic, and deep connections."}</p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Social Circles</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{typeInfo.friendships || "Prefers a few close, high-trust friendships over wide social circles."}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

function ResultBar({ left, right, leftCode, rightCode, leftValue, rightValue, color }) {
  const isLeftDominant = leftValue >= rightValue;
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end text-sm tracking-wide mb-1">
        <span className={`font-bold ${isLeftDominant ? 'text-slate-800' : 'text-slate-400 opacity-60'}`}>{left} <span className="text-xs opacity-50 ml-1">{leftCode}</span></span>
        <span className={`font-bold ${!isLeftDominant ? 'text-slate-800' : 'text-slate-400 opacity-60'}`}><span className="text-xs opacity-50 mr-1">{rightCode}</span> {right}</span>
      </div>
      
      <div className="h-4 w-full bg-slate-100 rounded-full flex shadow-inner relative">
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-200 z-20 -translate-x-1/2 rounded-full" />
        
        {/* Left Half Container */}
        <div className="w-1/2 h-full relative rounded-l-full overflow-hidden flex justify-end">
          {isLeftDominant && (
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${(leftValue - 50) * 2}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full ${color} relative`}
            />
          )}
        </div>

        {/* Right Half Container */}
        <div className="w-1/2 h-full relative rounded-r-full overflow-hidden flex justify-start">
          {!isLeftDominant && (
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${(rightValue - 50) * 2}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full ${color} relative`}
            />
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center text-[10px] font-black">
        <span className={`${isLeftDominant ? color.replace('bg-', 'text-') : 'text-slate-300'}`}>
          {leftValue}%
        </span>
        <span className={`${!isLeftDominant ? color.replace('bg-', 'text-') : 'text-slate-300'}`}>
          {rightValue}%
        </span>
      </div>
    </div>
  );
}
