import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Activity,
  Target,
  Zap,
  Heart,
  Compass,
  Briefcase,
  Layers,
  Quote,
  Sparkles,
  ShieldAlert,
  Download,
  RefreshCw,
  ArrowRight,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { typeDescriptions } from '../utils/mbtiResultLogic';
import { 
  mbtiCognitiveStacks, 
  getTypeTemperament, 
  mbtiTypeGuides 
} from '../utils/mbtiWikiData';

// Famous Archetypal Figures & Inspirational Quotes
const ARCHETYPE_FIGURES = {
  INTJ: [
    { name: "Nikola Tesla", role: "Inventor & Futurist", quote: "The present is theirs; the future, for which I really worked, is mine." },
    { name: "Friedrich Nietzsche", role: "Philosopher", quote: "He who has a why to live can bear almost any how." }
  ],
  INTP: [
    { name: "Albert Einstein", role: "Theoretical Physicist", quote: "The important thing is not to stop questioning. Curiosity has its own reason for existing." },
    { name: "Marie Curie", role: "Nobel Laureate Physicist", quote: "Nothing in life is to be feared, it is only to be understood." }
  ],
  ENTJ: [
    { name: "Steve Jobs", role: "Tech Pioneer & Visionary", quote: "The people who are crazy enough to think they can change the world are the ones who do." },
    { name: "Margaret Thatcher", role: "Stateswoman", quote: "You may have to fight a battle more than once to win it." }
  ],
  ENTP: [
    { name: "Leonardo da Vinci", role: "Polymath & Artist", quote: "Iron rusts from disuse; water loses its purity; even so does inaction sap the vigor of the mind." },
    { name: "Mark Twain", role: "Author & Humorist", quote: "Twenty years from now you will be more disappointed by the things you didn't do." }
  ],
  INFJ: [
    { name: "Carl Jung", role: "Psychiatrist & Typology Founder", quote: "Who looks outside, dreams; who looks inside, awakes." },
    { name: "Plato", role: "Classical Philosopher", quote: "The first and greatest victory is to conquer yourself." }
  ],
  INFP: [
    { name: "William Shakespeare", role: "Playwright & Poet", quote: "This above all: to thine own self be true." },
    { name: "J.R.R. Tolkien", role: "Author & Philologist", quote: "Not all those who wander are lost." }
  ],
  ENFJ: [
    { name: "Barack Obama", role: "Leader & Orator", quote: "Change will not come if we wait for some other person or some other time." },
    { name: "Maya Angelou", role: "Poet & Activist", quote: "People will forget what you said, but people will never forget how you made them feel." }
  ],
  ENFP: [
    { name: "Robin Williams", role: "Actor & Comedian", quote: "You're only given a little spark of madness. You mustn't lose it." },
    { name: "Walt Disney", role: "Creative Producer", quote: "If you can dream it, you can do it." }
  ],
  ISTJ: [
    { name: "George Washington", role: "Founding Father & Leader", quote: "It is better to offer no excuse than a bad one." },
    { name: "Warren Buffett", role: "Investor & Industrialist", quote: "Risk comes from not knowing what you're doing." }
  ],
  ISFJ: [
    { name: "Mother Teresa", role: "Humanitarian", quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier." },
    { name: "Rosa Parks", role: "Civil Rights Icon", quote: "Each person must live their life as a model for others." }
  ],
  ESTJ: [
    { name: "Henry Ford", role: "Industrialist", quote: "Coming together is a beginning; keeping together is progress; working together is success." },
    { name: "Sonia Sotomayor", role: "Supreme Court Justice", quote: "Success is its own reward, but failure is a great teacher." }
  ],
  ESFJ: [
    { name: "Taylor Swift", role: "Singer & Cultural Icon", quote: "No matter what happens in life, be good to people." },
    { name: "Jennifer Garner", role: "Actress & Philanthropist", quote: "Beauty comes from a life well-lived." }
  ],
  ISTP: [
    { name: "Bruce Lee", role: "Martial Artist & Philosopher", quote: "Be water, my friend. Empty your mind, be formless, shapeless, like water." },
    { name: "Clint Eastwood", role: "Actor & Director", quote: "Improvise, adapt, overcome." }
  ],
  ISFP: [
    { name: "Frida Kahlo", role: "Artist", quote: "I paint my own reality. The only thing I know is that I paint because I need to." },
    { name: "Michael Jackson", role: "Musician & Performer", quote: "In a world filled with hate, we must still dare to hope." }
  ],
  ESTP: [
    { name: "Ernest Hemingway", role: "Author & Adventurer", quote: "Live the full life of the mind, exhilarated by new ideas, intoxicated by the Romance of the unusual." },
    { name: "Madonna", role: "Pop Culture Icon", quote: "Better to live one year as a tiger than a hundred as a sheep." }
  ],
  ESFP: [
    { name: "Elvis Presley", role: "Musician & Entertainer", quote: "Do what's right for you, as long as it don't hurt nobody." },
    { name: "Elton John", role: "Composer & Performer", quote: "Live for each second without hesitation." }
  ]
};

// Explanations for the 4 MBTI dichotomy pairs
const DIMENSION_DETAILS = {
  E: {
    title: "Extraverted",
    why: "You feel energized by engaging with the external world, participating in lively discussions, and collaborating with others.",
    pros: ["Natural collaborative communicator", "Easily initiates social interactions", "Energized by dynamic environments"],
    cons: ["Can feel restless during prolonged isolation", "May speak before fully internalizing conclusions"]
  },
  I: {
    title: "Introverted",
    why: "You recharge your mental battery through quiet solitary reflection and deep one-on-one interactions.",
    pros: ["Deeply thoughtful and self-reliant", "Processes complex ideas internally with high focus", "Excellent active listener"],
    cons: ["Can experience rapid social burnout", "May hesitate to share brilliant insights in large groups"]
  },
  N: {
    title: "Intuitive",
    why: "You naturally spot overarching patterns, imagine future possibilities, and enjoy conceptual exploration.",
    pros: ["Visionary strategic thinking", "Effortlessly connects novel abstract concepts", "Enjoys creative innovation"],
    cons: ["Can overlook tedious administrative details", "May lose patience with repetitive routine execution"]
  },
  S: {
    title: "Sensing",
    why: "You ground yourself in concrete reality, factual evidence, and tangible, practical experience.",
    pros: ["High realism and situational awareness", "Mastery of procedural and factual details", "Trusts proven, reliable methodologies"],
    cons: ["May resist unproven theoretical changes", "Can dismiss speculative possibilities too early"]
  },
  T: {
    title: "Thinking",
    why: "You prioritize objective logic, rational fairness, and systemic consistency when making decisions.",
    pros: ["Unbiased, objective problem-solving", "Stays calm and level-headed under pressure", "Detects systemic flaws and fallacies"],
    cons: ["Can come across as blunt or detached", "May underestimate the importance of emotional validation"]
  },
  F: {
    title: "Feeling",
    why: "You make decisions guided by core personal values, empathy, and the emotional well-being of others.",
    pros: ["Deep empathy and emotional intelligence", "Fosters group harmony and mutual trust", "Strong loyalty to human values"],
    cons: ["May take objective critique personally", "Prone to avoiding necessary, healthy conflict"]
  },
  J: {
    title: "Judging",
    why: "You prefer structure, organized timelines, and having decisions clearly settled in advance.",
    pros: ["Disciplined, organized, and highly reliable", "Thrives at meeting deadlines and milestones", "Brings clarity and order to chaos"],
    cons: ["Can feel unsettled by sudden disruptions", "May rush decisions just to achieve closure"]
  },
  P: {
    title: "Prospecting",
    why: "You thrive on spontaneity, keeping your options open, and adapting flexibly to real-time changes.",
    pros: ["Highly adaptable and agile", "Embraces creative improvisations and pivots", "Thrives in fast-changing circumstances"],
    cons: ["Can struggle with strict rigid schedules", "May postpone final choices until the last minute"]
  }
};

// Calculate compatibility lists
function getCompatibilityLists(userType) {
  if (!userType || userType.length < 4) return { compatibleIntroverts: [], compatibleExtroverts: [], incompatibleIntroverts: [], incompatibleExtroverts: [] };
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
    if (userN === otherN) score += 3;
    if (userI !== otherI) score += 2;
    if (userT === otherT) score += 1;
    if (userP !== otherP) score += 1;
    
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

function getSynergyExplanation(userType, partnerType, isCompatible) {
  if (!userType || !partnerType) return "";
  const userI = userType[0];
  const userN = userType[1];
  const partI = partnerType[0];
  const partN = partnerType[1];

  if (isCompatible) {
    if (userN === partN && userI !== partI) {
      return `Both share the intuitive vision, while the opposite Extravert/Introvert traits bring natural balance.`;
    }
    if (userN === partN) {
      return `Shared conceptual perspective allows you to connect instantly through deep conversations.`;
    }
    return `Shared decision-making priorities bring harmonious alignment and mutual support.`;
  } else {
    if (userN !== partN) {
      return `Opposite Intuitive/Sensing perspectives can cause friction between abstract concepts and concrete facts.`;
    }
    return `Different cognitive styles require conscious patience and communication when resolving disputes.`;
  }
}

function ResultBar({ left, right, leftCode, rightCode, leftValue, rightValue, color }) {
  const isLeftDominant = leftValue >= rightValue;

  return (
    <div className="space-y-3">
      {/* Top Labels with Circular Letter Badges */}
      <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
        <div className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-black transition-all ${
            isLeftDominant ? `${color} text-white shadow-xs` : 'bg-slate-200 text-slate-500'
          }`}>
            {leftCode}
          </span>
          <span className={`transition-colors ${isLeftDominant ? 'text-slate-900 font-extrabold' : 'text-slate-400 font-medium'}`}>
            {left}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`transition-colors ${!isLeftDominant ? 'text-slate-900 font-extrabold' : 'text-slate-400 font-medium'}`}>
            {right}
          </span>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-black transition-all ${
            !isLeftDominant ? `${color} text-white shadow-xs` : 'bg-slate-200 text-slate-500'
          }`}>
            {rightCode}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200/60 shadow-inner">
        <Motion.div
          className={`h-full rounded-full transition-all duration-700 ${isLeftDominant ? color : 'bg-transparent'}`}
          initial={{ width: 0 }}
          animate={{ width: `${leftValue}%` }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />
        <Motion.div
          className={`h-full rounded-full transition-all duration-700 ${!isLeftDominant ? color : 'bg-transparent'}`}
          initial={{ width: 0 }}
          animate={{ width: `${rightValue}%` }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />
      </div>

      {/* Bottom Percentages */}
      <div className="flex justify-between items-center text-xs font-bold px-1">
        <span className={isLeftDominant ? 'text-slate-900 font-extrabold' : 'text-slate-400'}>{leftValue}%</span>
        <span className={!isLeftDominant ? 'text-slate-900 font-extrabold' : 'text-slate-400'}>{rightValue}%</span>
      </div>
    </div>
  );
}

export default function MbtiResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const upperType = type ? type.toUpperCase() : 'INTP';
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const typeInfo = typeDescriptions[upperType];
  const temperament = getTypeTemperament(upperType);
  const cogStack = mbtiCognitiveStacks[upperType] || [];
  const guide = mbtiTypeGuides[upperType] || {};
  const famousFigures = ARCHETYPE_FIGURES[upperType] || [];

  useEffect(() => {
    if (upperType) {
      localStorage.setItem('omnitype_mbti', upperType);
    }
  }, [upperType]);

  if (!typeInfo) {
    return <Navigate to="/test/mbti" replace />;
  }

  // Calculate real percentages from location state or simulated fallback
  const percentages = useMemo(() => {
    if (location.state?.percentages) {
      return location.state.percentages;
    }
    return {
      EI: upperType.includes('E') ? 78 : 22,
      SN: upperType.includes('S') ? 75 : 25,
      TF: upperType.includes('T') ? 72 : 28,
      JP: upperType.includes('J') ? 68 : 32
    };
  }, [location.state, upperType]);

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `omnitype-mbti-${upperType.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card image', err);
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Habits', icon: Target },
    { id: 'cognitive', label: 'Cognitive Architecture', icon: Layers },
    { id: 'traits', label: 'Superpowers & Careers', icon: Briefcase },
    { id: 'synergy', label: 'Compatibility & Stress', icon: Heart }
  ];

  const letterExplainer = upperType.split('').map(char => {
    const details = DIMENSION_DETAILS[char] || { title: char, why: '' };
    return { letter: char, title: details.title, why: details.why };
  });

  const activeDimensions = upperType.split('').map(char => {
    const details = DIMENSION_DETAILS[char] || { title: char, why: '', pros: [], cons: [] };
    const opposing = char === 'E' ? 'I' : char === 'I' ? 'E' : char === 'N' ? 'S' : char === 'S' ? 'N' : char === 'T' ? 'F' : char === 'F' ? 'T' : char === 'J' ? 'P' : 'J';
    const opposingDetails = DIMENSION_DETAILS[opposing] || { title: opposing, why: '', pros: [], cons: [] };
    return {
      activeChar: char,
      opposingChar: opposing,
      activeTitle: details.title,
      opposingTitle: opposingDetails.title,
      why: details.why,
      pros: details.pros || [],
      cons: details.cons || []
    };
  });

  const {
    compatibleIntroverts,
    compatibleExtroverts,
    incompatibleIntroverts,
    incompatibleExtroverts
  } = getCompatibilityLists(upperType);

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 pt-28 md:pt-36 px-4 sm:px-8 md:px-12 relative text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* Background ambient lighting */}
      <div className="fixed top-[-15vh] left-[-10vw] w-[60vw] h-[60vw] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Navigation Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-slate-900 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Test Directory</span>
          </button>

          <div className="flex items-center gap-2.5">
            <Link
              to={`/wiki/mbti/${upperType.toLowerCase()}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 text-xs font-black uppercase tracking-wider text-indigo-600 shadow-2xs transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Wiki Chapter</span>
            </Link>

            <button
              type="button"
              onClick={handleDownloadCard}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 hover:bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-700 shadow-2xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isExporting ? 'Exporting...' : 'Export Card'}</span>
            </button>

            <Link
              to="/test/mbti"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-black uppercase tracking-wider text-white shadow-xs transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
              <span>Retake Test</span>
            </Link>
          </div>
        </div>

        {/* Hero Result Card (Captured for Export) */}
        <div 
          ref={cardRef}
          className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group space-y-8"
        >
          {/* Left Gradient Strip */}
          <div className={`absolute top-0 left-0 w-3 h-full bg-linear-to-b ${temperament.color}`} />

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border ${temperament.themeBg} ${temperament.themeBorder} ${temperament.themeText}`}>
                  {temperament.badge}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {typeInfo.mythologicalArchetype || "The Master Archetype"}
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono">
                  {upperType}
                  <span className="text-indigo-600 font-sans italic text-3xl sm:text-4xl ml-3 font-normal">
                    — {typeInfo.title}
                  </span>
                </h1>
                <p className="text-sm sm:text-base font-bold text-indigo-600 uppercase tracking-wide">
                  {temperament.tagline}
                </p>
              </div>

              <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
                {guide.simpleSummary || typeInfo.desc}
              </p>
            </div>

            {/* Quick Stats Pill Matrix */}
            <div className="w-full lg:w-96 p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 space-y-3 shrink-0">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                Cognitive Function Architecture
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {cogStack.map((s, idx) => (
                  <span key={idx} className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-2xs">
                    {s.function}
                  </span>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-600 pt-1">
                Dominant: <strong className="text-indigo-600">{cogStack[0]?.name}</strong> ({cogStack[0]?.role})
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation Grid (Full width on Desktop, responsive wrap on Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pb-2 pt-1 border-b border-slate-200/80">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md scale-[1.01]' 
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Contents */}
        <AnimatePresence mode="wait">

          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW & HABITS */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <Motion.div
              key="overview-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Cognitive Balance Spectrum Sliders */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Your Cognitive Polarity Spectrum</h3>
                  <p className="text-slate-500 text-sm font-medium">Visual balance across the four Jungian psychological polarities.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <ResultBar left="Extraverted" right="Introverted" leftCode="E" rightCode="I" leftValue={percentages.EI} rightValue={100 - percentages.EI} color="bg-linear-to-r from-indigo-500 to-indigo-600" />
                  <ResultBar left="Sensing" right="Intuitive" leftCode="S" rightCode="N" leftValue={percentages.SN} rightValue={100 - percentages.SN} color="bg-linear-to-r from-amber-500 to-amber-600" />
                  <ResultBar left="Thinking" right="Feeling" leftCode="T" rightCode="F" leftValue={percentages.TF} rightValue={100 - percentages.TF} color="bg-linear-to-r from-sky-500 to-sky-600" />
                  <ResultBar left="Judging" right="Prospecting" leftCode="J" rightCode="P" leftValue={percentages.JP} rightValue={100 - percentages.JP} color="bg-linear-to-r from-purple-500 to-purple-600" />
                </div>
              </div>

              {/* Core Motives & Daily Habits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">Core Motive & Driving Force</span>
                  <h4 className="text-2xl font-black text-slate-900">What Drives Your Mind</h4>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    You are naturally driven to make sense of the world, analyze underlying systems, and build frameworks that work. You value competency, intellectual autonomy, and integrity in execution.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {typeInfo.coreValues?.map((val, idx) => (
                      <span key={idx} className="text-xs font-bold px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 block">Daily Interactions & Rhythms</span>
                  <h4 className="text-2xl font-black text-slate-900">How You Interact Daily</h4>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    {typeInfo.habits || "You navigate daily life by processing information internally, solving complex problems, and optimizing workflows for maximum personal efficiency."}
                  </p>
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-xs text-amber-950 font-semibold">
                    💡 <strong>Pro Tip:</strong> Balance your deep internal focus by scheduling regular breaks to engage physically with your environment.
                  </div>
                </div>
              </div>

              {/* Letter Explanations */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">Dichotomy Letters Breakdown</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {letterExplainer.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-3xl font-black text-slate-900 font-mono">{item.letter}</span>
                        <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white text-indigo-600 border border-slate-200">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secret Dreams & Hidden Fears */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-purple-600 block">Core Aspirations</span>
                  <h4 className="text-xl font-black text-slate-900">Secret Dreams</h4>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    {typeInfo.secretDreams}
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-600 block">Vulnerabilities</span>
                  <h4 className="text-xl font-black text-slate-900">Hidden Fears</h4>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    {typeInfo.hiddenFears}
                  </p>
                </div>
              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: COGNITIVE ARCHITECTURE */}
          {/* ========================================================= */}
          {activeTab === 'cognitive' && (
            <Motion.div
              key="cognitive-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* 4 Cognitive Functions */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">4-Tier Cognitive Function Stack</h3>
                  <p className="text-slate-500 text-sm font-medium">Carl Jung's cognitive hierarchy explaining how your brain prioritizes perception and judgment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cogStack.map((fn, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-slate-200/80 rounded-[2rem] p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                            idx === 0 ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                            idx === 1 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            idx === 2 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {fn.rank}
                          </span>

                          <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white font-mono font-black text-lg flex items-center justify-center shadow-xs">
                            {fn.function}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-black text-slate-900">{fn.name}</h4>
                          <span className="text-xs font-bold text-slate-400">Role: {fn.role}</span>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          {fn.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                        <span>Hierarchy Position #{idx + 1}</span>
                        <span>{idx === 0 ? '100% Dominant Flow' : idx === 1 ? '75% Auxiliary Support' : idx === 2 ? '50% Tertiary Balance' : 'Inferior Stress Trigger'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preference Deep Dive Grid */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Understanding Your Trait Preferences</h3>
                  <p className="text-slate-500 text-sm font-medium">Detailed advantages and blind spots for each of your 4 active preferences.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeDimensions.map((dim, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/80 rounded-[2rem] p-7 shadow-[0_4px_20px_rgb(0,0,0,0.02)] space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                        <h4 className="text-base font-black text-slate-900">{dim.activeTitle} ({dim.activeChar})</h4>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">vs {dim.opposingTitle} ({dim.opposingChar})</span>
                      </div>

                      <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <strong>Why:</strong> {dim.why}
                      </p>

                      <div className="grid grid-cols-2 gap-4 pt-1 text-xs">
                        <div>
                          <span className="font-black text-emerald-600 uppercase tracking-wider block mb-2">Advantages</span>
                          <ul className="space-y-1.5 font-medium text-slate-700">
                            {dim.pros.map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-black text-rose-600 uppercase tracking-wider block mb-2">Blind Spots</span>
                          <ul className="space-y-1.5 font-medium text-slate-700">
                            {dim.cons.map((c, i) => (
                              <li key={i} className="flex items-start gap-1.5">
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
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: SUPERPOWERS & CAREERS */}
          {/* ========================================================= */}
          {activeTab === 'traits' && (
            <Motion.div
              key="traits-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Strengths & Blind Spots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <Target className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-xl font-black text-slate-900">Core Superpowers</h3>
                  </div>
                  <ul className="space-y-3">
                    {typeInfo.strengths?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <h3 className="text-xl font-black text-slate-900">Blind Spots & Challenges</h3>
                  </div>
                  <ul className="space-y-3">
                    {typeInfo.weaknesses?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Famous Figures */}
              {famousFigures.length > 0 && (
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900">Famous {upperType} Figures</h3>
                    <p className="text-slate-500 text-sm font-medium">Historical visionaries and creators who share your cognitive archetype.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {famousFigures.map((fig, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative overflow-hidden">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-black text-slate-900">{fig.name}</h4>
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{fig.role}</span>
                          </div>
                          <Quote className="w-6 h-6 text-slate-300" />
                        </div>
                        <blockquote className="text-slate-600 text-sm italic font-medium leading-relaxed">
                          "{fig.quote}"
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suitable Careers & Workplace */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-xl font-black text-slate-900">Ideal Career Horizons</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(typeInfo.careers || []).map((career, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 font-bold text-xs text-slate-800 flex items-center justify-between">
                        <span>{career}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <Compass className="w-5 h-5 text-amber-500" />
                    <h3 className="text-xl font-black text-slate-900">Workplace Behavior</h3>
                  </div>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    {typeInfo.workplace}
                  </p>
                </div>
              </div>
            </Motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: COMPATIBILITY & STRESS DYNAMICS */}
          {/* ========================================================= */}
          {activeTab === 'synergy' && (
            <Motion.div
              key="synergy-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Flow State vs Acute Stress Response */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-3">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-600">Peak Flow State</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900">When You Are Thriving</h4>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    Operating at peak clarity, leveraging your dominant cognitive function effortlessly. You feel aligned, creative, and confident in execution.
                  </p>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-3">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                    <span className="text-xs font-black uppercase tracking-wider text-rose-600">Under Acute Stress</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Inferior Function Trigger</h4>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    {typeInfo.stressResponse}
                  </p>
                </div>
              </div>

              {/* Chemistry Matrix */}
              <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_25px_rgb(0,0,0,0.02)] space-y-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Relational Chemistry Matrix</h3>
                  <p className="text-slate-500 text-sm font-medium">Synergies across compatible and growth-challenge archetype pairings.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Compatible Types */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-l-2 border-emerald-500 pl-3">
                      <Heart className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-black tracking-wider text-emerald-600 uppercase">Natural Synergy Partners</span>
                    </div>

                    <div className="space-y-3">
                      {compatibleIntroverts.slice(0, 2).concat(compatibleExtroverts.slice(0, 2)).map((partner) => (
                        <Link 
                          key={partner} 
                          to={`/wiki/mbti/${partner.toLowerCase()}`}
                          className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 flex items-center justify-between hover:bg-emerald-50 hover:border-emerald-200 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white text-slate-900 font-mono font-black text-xs flex items-center justify-center border border-slate-200 shadow-2xs">
                              {partner}
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-xs font-black text-slate-900 block group-hover:text-emerald-800">{partner} — {typeDescriptions[partner]?.title}</span>
                              <p className="text-xs text-slate-500 font-medium">{getSynergyExplanation(upperType, partner, true)}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Growth Challenge Types */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-l-2 border-amber-500 pl-3">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-black tracking-wider text-amber-600 uppercase">Growth Challenge Partners</span>
                    </div>

                    <div className="space-y-3">
                      {incompatibleIntroverts.slice(0, 2).concat(incompatibleExtroverts.slice(0, 2)).map((partner) => (
                        <Link 
                          key={partner} 
                          to={`/wiki/mbti/${partner.toLowerCase()}`}
                          className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 flex items-center justify-between hover:bg-amber-50 hover:border-amber-200 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white text-slate-900 font-mono font-black text-xs flex items-center justify-center border border-slate-200 shadow-2xs">
                              {partner}
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-xs font-black text-slate-900 block group-hover:text-amber-800">{partner} — {typeDescriptions[partner]?.title}</span>
                              <p className="text-xs text-slate-500 font-medium">{getSynergyExplanation(upperType, partner, false)}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </Motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
