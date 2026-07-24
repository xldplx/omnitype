import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Activity,
  Target,
  Zap,
  Heart,
  Compass,
  Briefcase,
  Brain,
  Layers,
  Quote,
  Sparkles,
  ShieldAlert,
  Award
} from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';

// Cognitive Function Stacks for all 16 MBTI Types
const COGNITIVE_STACKS = {
  INTJ: [
    { role: "Dominant", code: "Ni", title: "Introverted Intuition", desc: "Perceives long-term pattern shifts, macro vision trajectories, and subconscious synthesis." },
    { role: "Auxiliary", code: "Te", title: "Extraverted Thinking", desc: "Organizes external environments, optimizes systems, and executes strategic logic." },
    { role: "Tertiary", code: "Fi", title: "Introverted Feeling", desc: "Internal ethical compass, authentic personal values, and deep integrity." },
    { role: "Inferior", code: "Se", title: "Extraverted Sensing", desc: "Real-time physical observation and sensory engagement under acute stress." }
  ],
  INTP: [
    { role: "Dominant", code: "Ti", title: "Introverted Thinking", desc: "Deep analytical logic, internal framework building, and precision conceptual deconstruction." },
    { role: "Auxiliary", code: "Ne", title: "Extraverted Intuition", desc: "Generates novel ideas, explores speculative possibilities, and sees hidden links." },
    { role: "Tertiary", code: "Si", title: "Introverted Sensing", desc: "Memory storage, past experience comparison, and historical consistency." },
    { role: "Inferior", code: "Fe", title: "Extraverted Feeling", desc: "Reading group emotions and seeking social harmony under acute pressure." }
  ],
  ENTJ: [
    { role: "Dominant", code: "Te", title: "Extraverted Thinking", desc: "Strategic direction, decisive executive action, and objective system optimization." },
    { role: "Auxiliary", code: "Ni", title: "Introverted Intuition", desc: "Macro vision forecasting and identifying single core leverage points for growth." },
    { role: "Tertiary", code: "Se", title: "Extraverted Sensing", desc: "Real-time tactical adaptation, environmental presence, and swift execution." },
    { role: "Inferior", code: "Fi", title: "Introverted Feeling", desc: "Private personal values and vulnerable emotional processing." }
  ],
  ENTP: [
    { role: "Dominant", code: "Ne", title: "Extraverted Intuition", desc: "Limitless conceptual exploration, rapid pattern creation, and dialectic debate." },
    { role: "Auxiliary", code: "Ti", title: "Introverted Thinking", desc: "Rigorous internal logical validation and dismantling flawed assumptions." },
    { role: "Tertiary", code: "Fe", title: "Extraverted Feeling", desc: "Social charisma, reading audience moods, and persuasive influence." },
    { role: "Inferior", code: "Si", title: "Introverted Sensing", desc: "Routine detail maintenance and historical data tracking under pressure." }
  ],
  INFJ: [
    { role: "Dominant", code: "Ni", title: "Introverted Intuition", desc: "Deep symbolic insight, future envisioning, and subconscious pattern recognition." },
    { role: "Auxiliary", code: "Fe", title: "Extraverted Feeling", desc: "Empathetic emotional resonance, group alignment, and interpersonal caregiving." },
    { role: "Tertiary", code: "Ti", title: "Introverted Thinking", desc: "Analytical framework checking and internal logical consistency." },
    { role: "Inferior", code: "Se", title: "Extraverted Sensing", desc: "Sensory grounding and present-moment physical awareness under stress." }
  ],
  INFP: [
    { role: "Dominant", code: "Fi", title: "Introverted Feeling", desc: "Uncompromising personal authenticity, ethical depth, and core values." },
    { role: "Auxiliary", code: "Ne", title: "Extraverted Intuition", desc: "Creative imagination, poetic expression, and exploring alternative pathways." },
    { role: "Tertiary", code: "Si", title: "Introverted Sensing", desc: "Nostalgic memory retention, personal traditions, and comfortable routines." },
    { role: "Inferior", code: "Te", title: "Extraverted Thinking", desc: "Directing external structure and assertive logical confrontation under stress." }
  ],
  ENFJ: [
    { role: "Dominant", code: "Fe", title: "Extraverted Feeling", desc: "Catalyzing human potential, inspiring group unity, and emotional guidance." },
    { role: "Auxiliary", code: "Ni", title: "Introverted Intuition", desc: "Discerning long-term growth visions for people and communities." },
    { role: "Tertiary", code: "Se", title: "Extraverted Sensing", desc: "Charismatic physical presence and engaging real-time environments." },
    { role: "Inferior", code: "Ti", title: "Introverted Thinking", desc: "Detached critical analysis and cold objective logic validation." }
  ],
  ENFP: [
    { role: "Dominant", code: "Ne", title: "Extraverted Intuition", desc: "Infectious enthusiasm for new horizons, possibilities, and creative sparks." },
    { role: "Auxiliary", code: "Fi", title: "Introverted Feeling", desc: "Deep personal conviction, emotional empathy, and individual truth." },
    { role: "Tertiary", code: "Te", title: "Extraverted Thinking", desc: "Organizing steps to bring visionary creative ideas into real implementation." },
    { role: "Inferior", code: "Si", title: "Introverted Sensing", desc: "Attention to repetitive micro-details and historical record keeping." }
  ],
  ISTJ: [
    { role: "Dominant", code: "Si", title: "Introverted Sensing", desc: "Unrivaled memory accuracy, reliability, procedural duty, and factual precision." },
    { role: "Auxiliary", code: "Te", title: "Extraverted Thinking", desc: "Systematic organization, clear scheduling, and logical enforcement." },
    { role: "Tertiary", code: "Fi", title: "Introverted Feeling", desc: "Steadfast moral code, loyalty to principles, and quiet integrity." },
    { role: "Inferior", code: "Ne", title: "Extraverted Intuition", desc: "Anticipating unknown future contingencies and speculative risks under stress." }
  ],
  ISFJ: [
    { role: "Dominant", code: "Si", title: "Introverted Sensing", desc: "Preserving traditions, remembering personal details, and loyal support." },
    { role: "Auxiliary", code: "Fe", title: "Extraverted Feeling", desc: "Attending to others' emotional comfort, harmony, and warm hospitality." },
    { role: "Tertiary", code: "Ti", title: "Introverted Thinking", desc: "Quiet practical logic and structured troubleshooting." },
    { role: "Inferior", code: "Ne", title: "Extraverted Intuition", desc: "Navigating sudden unpredictable changes and unproven theories." }
  ],
  ESTJ: [
    { role: "Dominant", code: "Te", title: "Extraverted Thinking", desc: "Decisive leadership, operational efficiency, and clear rule structure." },
    { role: "Auxiliary", code: "Si", title: "Introverted Sensing", desc: "Respect for proven protocols, historical benchmarks, and orderly habits." },
    { role: "Tertiary", code: "Ne", title: "Extraverted Intuition", desc: "Exploring practical improvements and alternative business strategies." },
    { role: "Inferior", code: "Fi", title: "Introverted Feeling", desc: "Processing internal personal feelings and individual vulnerability." }
  ],
  ESFJ: [
    { role: "Dominant", code: "Fe", title: "Extraverted Feeling", desc: "Fostering community warmth, organizing social unity, and caregiving." },
    { role: "Auxiliary", code: "Si", title: "Introverted Sensing", desc: "Honoring group customs, reliable hospitality, and memory for needs." },
    { role: "Tertiary", code: "Ne", title: "Extraverted Intuition", desc: "Connecting people and sparking enjoyable group activities." },
    { role: "Inferior", code: "Ti", title: "Introverted Thinking", desc: "Objective analytical critique and detached logic scrutiny." }
  ],
  ISTP: [
    { role: "Dominant", code: "Ti", title: "Introverted Thinking", desc: "Precision troubleshooting, mechanical logic, and system dissection." },
    { role: "Auxiliary", code: "Se", title: "Extraverted Sensing", desc: "Tactile environmental mastery, quick reflexes, and practical action." },
    { role: "Tertiary", code: "Ni", title: "Introverted Intuition", desc: "Internal flashes of sudden insight and underlying cause detection." },
    { role: "Inferior", code: "Fe", title: "Extraverted Feeling", desc: "Navigating complex social nuances and group emotional expectations." }
  ],
  ISFP: [
    { role: "Dominant", code: "Fi", title: "Introverted Feeling", desc: "Quiet artistic sensibility, deep personal harmony, and true authenticity." },
    { role: "Auxiliary", code: "Se", title: "Extraverted Sensing", desc: "Keen aesthetic awareness, sensory immersion, and living in the now." },
    { role: "Tertiary", code: "Ni", title: "Introverted Intuition", desc: "Subtle symbolic vision and sensing deeper underlying currents." },
    { role: "Inferior", code: "Te", title: "Extraverted Thinking", desc: "Organizing structured plans and asserting objective demands." }
  ],
  ESTP: [
    { role: "Dominant", code: "Se", title: "Extraverted Sensing", desc: "Adrenaline-charged crisis action, environmental mastery, and charm." },
    { role: "Auxiliary", code: "Ti", title: "Introverted Thinking", desc: "Rapid pragmatic analysis and real-time tactical calculations." },
    { role: "Tertiary", code: "Fe", title: "Extraverted Feeling", desc: "Reading crowd dynamics and utilizing persuasive social influence." },
    { role: "Inferior", code: "Ni", title: "Introverted Intuition", desc: "Foreseeing far-off future consequences and long-term implications." }
  ],
  ESFP: [
    { role: "Dominant", code: "Se", title: "Extraverted Sensing", desc: "Vibrant sensory charisma, spontaneous energy, and captivating presence." },
    { role: "Auxiliary", code: "Fi", title: "Introverted Feeling", desc: "Genuinely empathetic warmth, personal ethics, and open heart." },
    { role: "Tertiary", code: "Te", title: "Extraverted Thinking", desc: "Mobilizing resources to turn fun creative ideas into live realities." },
    { role: "Inferior", code: "Ni", title: "Introverted Intuition", desc: "Reflecting on long-range vision and subconscious life patterns." }
  ]
};

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

// Explains why two types match or clash
function getSynergyExplanation(userType, partnerType, isCompatible) {
  if (!userType || !partnerType || userType.length < 2 || partnerType.length < 2) return "";
  const userI = userType[0];
  const userN = userType[1];
  const partI = partnerType[0];
  const partN = partnerType[1];

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
    return `Friction may arise between **objective logic** and **personal feelings** when resolving issues together.`;
  }
}

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

export default function MbtiResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const upperType = type ? type.toUpperCase() : '';
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const primaryColor = typeInfo.colors?.[0] || 'indigo';
  const secondaryColor = typeInfo.colors?.[1] || 'purple';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'cognitive', label: 'Cognitive Architecture', icon: Layers },
    { id: 'traits', label: 'Traits & Figures', icon: Activity },
    { id: 'synergy', label: 'Compatibility & Stress', icon: Heart }
  ];

  const getSimulatedScores = (typeStr) => {
    return {
      EI: typeStr.includes('E') ? 78 : 22,
      SN: typeStr.includes('N') ? 15 : 85, 
      TF: typeStr.includes('T') ? 71 : 29, 
      JP: typeStr.includes('J') ? 65 : 35, 
    };
  };

  const percentages = getSimulatedScores(upperType);
  const cogStack = COGNITIVE_STACKS[upperType] || [];
  const famousFigures = ARCHETYPE_FIGURES[upperType] || [];

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

  const letterExplainer = upperType.split('').map(char => ({
    letter: char,
    ...(mbtiBreakdown[char] || { title: char, desc: "" })
  }));

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

  const highlightSentence = (text) => {
    if (!text) return "";
    const fillers = /^(they\s+possess\s+an\s+|they\s+can\s+easily\s+|they\s+frequently\s+|their\s+|they\s+exhibit\s+|once\s+they\s+|they\s+|despite\s+their\s+)/i;
    let cleanText = text.replace(fillers, '');
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    
    const words = cleanText.split(' ');
    const boldCount = Math.min(words.length, 4);
    const boldPart = words.slice(0, boldCount).join(' ');
    const regularPart = words.slice(boldCount).join(' ');
    
    return (
      <span>
        <strong className="text-slate-900 font-extrabold">{boldPart}</strong> {regularPart}
      </span>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-indigo-200">
      
      {/* Decorative Background Auras */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-${primaryColor}-100/45 rounded-full blur-[120px] pointer-events-none z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] bg-${secondaryColor}-100/45 rounded-full blur-[120px] pointer-events-none z-0`} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-32 pb-32 relative z-10">
        
        {/* Navigation - Return to Home */}
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
                {/* Hero Profile Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b from-${primaryColor}-400 to-${secondaryColor}-400 opacity-80`} />
                    <h1 className="text-4xl md:text-6xl font-black mb-4 text-slate-900 tracking-tight leading-none">
                      {typeInfo.title}
                    </h1>
                    <p className="text-slate-600 max-w-4xl leading-relaxed font-medium text-base sm:text-lg md:text-xl">
                      {typeInfo.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-4 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden">
                     <h2 className={`text-[clamp(4.5rem,9vw,7rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-${primaryColor}-500 to-${secondaryColor}-600 z-10 drop-shadow-sm pb-1 whitespace-nowrap`}>
                       {upperType}
                     </h2>
                     <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-slate-400 mt-3 z-10 whitespace-nowrap">Personality Axis</span>
                  </div>
                </div>

                {/* Cognitive Balance Layer (User Statistics) */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-10">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Cognitive Balance Statistics</h3>
                    <p className="text-slate-500 text-sm md:text-base font-medium">Visual spectrum allocation across four major cognitive polarities.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <ResultBar left="Extraverted" right="Introverted" leftCode="E" rightCode="I" leftValue={percentages.EI} rightValue={100 - percentages.EI} color={`bg-${primaryColor}-500`} />
                    <ResultBar left="Intuitive" right="Observant" leftCode="N" rightCode="S" leftValue={100 - percentages.SN} rightValue={percentages.SN} color={`bg-${secondaryColor}-500`} />
                    <ResultBar left="Thinking" right="Feeling" leftCode="T" rightCode="F" leftValue={percentages.TF} rightValue={100 - percentages.TF} color={`bg-${primaryColor}-400`} />
                    <ResultBar left="Judging" right="Prospecting" leftCode="J" rightCode="P" leftValue={percentages.JP} rightValue={100 - percentages.JP} color={`bg-${secondaryColor}-400`} />
                  </div>
                </div>

                {/* Core Motive & Daily Habits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-block mb-4">Core Motive</span>
                    <h4 className="text-xl font-black text-slate-900 mb-3">What drives you most</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                      You are naturally driven to make sense of the world, solve complex concepts, and build systems that work. You value competency, clear logic, and independence in execution.
                    </p>
                  </div>
                  
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full inline-block mb-4">Daily Habits</span>
                    <h4 className="text-xl font-black text-slate-900 mb-3">How you interact daily</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                      {typeInfo.habits}
                    </p>
                  </div>
                </div>

                {/* Letter Breakdowns */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-l-2 border-slate-300 pl-3">Letter Breakdown</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {letterExplainer.map((item, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs hover:shadow-xs transition">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-3xl font-black text-slate-900 leading-none">{item.letter}</span>
                          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full">{item.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roles & Dreams */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs relative overflow-hidden">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full inline-block mb-4">Social Persona</span>
                    <h4 className="text-xl font-black text-slate-900 mb-3">{typeInfo.mythologicalArchetype || "The Cosmic Observer"}</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">Your underlying persona acts as a vital pillar in team architectures and relationships.</p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs relative overflow-hidden">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full inline-block mb-4">Core Dreams</span>
                    <h4 className="text-xl font-black text-slate-900 mb-3">{typeInfo.secretDreams || "To find alignment in values"}</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">{typeInfo.hiddenFears || "You thrive when given autonomy and space to think."}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 2: COGNITIVE ARCHITECTURE & FUNCTION STACK */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'cognitive' && (
              <div className="space-y-12">
                
                {/* 4-Tier Cognitive Function Stack Cards */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Cognitive Function Stack</h3>
                    <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                      Jungian analytical breakdown showing how your mind prioritizes processing information and making decisions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cogStack.map((fn, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-indigo-100 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-6">
                            <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                              idx === 0 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                              idx === 1 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              idx === 2 ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-rose-50 text-rose-600 border-rose-100'
                            }`}>
                              {fn.role} Function
                            </span>

                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                              {fn.code}
                            </div>
                          </div>

                          <h4 className="text-xl font-black text-slate-900 mb-2">{fn.title}</h4>
                          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-4">{fn.desc}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                          <span>Hierarchy Position #{idx + 1}</span>
                          <span>{idx === 0 ? '100% Core Focus' : idx === 1 ? '75% Support' : idx === 2 ? '50% Balance' : 'Stress Trigger'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Polarities Sliders */}
                <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-12 space-y-10">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Cognitive Balance Layer</h3>
                    <p className="text-slate-500 text-sm">Visual spectrum allocation across four major cognitive polarities.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <ResultBar left="Extraverted" right="Introverted" leftCode="E" rightCode="I" leftValue={percentages.EI} rightValue={100 - percentages.EI} color={`bg-${primaryColor}-500`} />
                    <ResultBar left="Intuitive" right="Observant" leftCode="N" rightCode="S" leftValue={100 - percentages.SN} rightValue={percentages.SN} color={`bg-${secondaryColor}-500`} />
                    <ResultBar left="Thinking" right="Feeling" leftCode="T" rightCode="F" leftValue={percentages.TF} rightValue={100 - percentages.TF} color={`bg-${primaryColor}-400`} />
                    <ResultBar left="Judging" right="Prospecting" leftCode="J" rightCode="P" leftValue={percentages.JP} rightValue={100 - percentages.JP} color={`bg-${secondaryColor}-400`} />
                  </div>
                </div>

                {/* Explanations Grid */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-l-2 border-slate-300 pl-3">Understanding Your Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeDimensions.map((dim, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-2xs space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h4 className="text-base font-black text-slate-800">{dim.activeTitle} <span className="text-xs text-slate-400 font-bold">({dim.activeChar})</span></h4>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">vs {dim.opposingTitle} ({dim.opposingChar})</span>
                        </div>
                        
                        <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                          <strong>Why:</strong> {dim.why}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2">Advantages</span>
                            <ul className="space-y-2">
                              {(dim.pros || []).map((p, i) => (
                                <li key={i} className="text-xs text-slate-600 font-medium leading-relaxed flex items-start gap-1.5">
                                  <span className="text-emerald-500 font-bold">•</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block mb-2">Blind Spots</span>
                            <ul className="space-y-2">
                              {(dim.cons || []).map((c, i) => (
                                <li key={i} className="text-xs text-slate-600 font-medium leading-relaxed flex items-start gap-1.5">
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

            {/* ---------------------------------------------------- */}
            {/* TAB 3: TRAITS, FAMOUS FIGURES & CAREERS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'traits' && (
              <div className="space-y-12">
                
                {/* Strengths & Blind Spots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl bg-${primaryColor}-50 flex items-center justify-center`}>
                        <Target className={`w-5 h-5 text-${primaryColor}-500`} />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">Strengths</h3>
                    </div>
                    <ul className="space-y-4">
                      {(typeInfo.strengths || []).map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm leading-relaxed items-start">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${primaryColor}-400 mt-2 shrink-0`} />
                          <span>{highlightSentence(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl bg-${secondaryColor}-50 flex items-center justify-center`}>
                        <Zap className={`w-5 h-5 text-${secondaryColor}-500`} />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">Blind Spots</h3>
                    </div>
                    <ul className="space-y-4">
                      {(typeInfo.weaknesses || []).map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm leading-relaxed items-start">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${secondaryColor}-400 mt-2 shrink-0`} />
                          <span>{highlightSentence(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Famous Figures */}
                {famousFigures.length > 0 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">Famous {upperType} Figures</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {famousFigures.map((fig, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-4 relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xl font-black text-slate-900">{fig.name}</h4>
                              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{fig.role}</span>
                            </div>
                            <Quote className="w-8 h-8 text-slate-200" />
                          </div>

                          <blockquote className="text-slate-600 text-sm md:text-base italic leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                            "{fig.quote}"
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Careers & Workplace Behavior */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Suitable Career Paths</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(typeInfo.careers || []).map((career, i) => (
                        <div key={i} className="font-semibold bg-slate-50 text-slate-800 px-4 py-3.5 rounded-2xl border border-slate-100 text-xs flex items-center justify-between">
                          <span>{career}</span>
                          <div className={`w-1.5 h-1.5 rounded-full bg-${primaryColor}-400`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 shadow-2xs rounded-[2.5rem] p-8 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                      <Compass className="w-5 h-5 text-amber-500" />
                      <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Workplace Behavior</h4>
                    </div>
                    <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">
                      {typeInfo.workplace || "Thrives in settings with clear boundaries, logic-driven expectations, and plenty of autonomous focus."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* TAB 4: COMPATIBILITY & STRESS DYNAMICS */}
            {/* ---------------------------------------------------- */}
            {activeTab === 'synergy' && (
              <div className="space-y-12">
                
                {/* Flow State vs Acute Stress Response */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                      <span className="text-xs font-bold tracking-widest uppercase text-emerald-600">Peak Flow State</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-3">When You Are Thriving</h4>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                      Operating at peak clarity, leveraging your dominant cognitive function effortlessly. You feel aligned, creative, and confident in execution.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                      <ShieldAlert className="w-5 h-5 text-rose-500" />
                      <span className="text-xs font-bold tracking-widest uppercase text-rose-600">Under High Stress</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-3">Inferior Function Trigger</h4>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                      {typeInfo.stressResponse || "Under extreme fatigue or prolonged conflict, your inferior function can take over, leading to uncharacteristic reactions or emotional burnout."}
                    </p>
                  </div>
                </div>

                {/* Chemistry Grid: Detailed compatible & incompatible types */}
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-2xs space-y-8">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-black text-slate-900">Relational Chemistry Matrix</h3>
                    <p className="text-slate-500 text-sm mt-1">Detailed compatibility matrix split across Introvert and Extrovert groups.</p>
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
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Introvert Types</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {compatibleIntroverts.map((partner) => (
                              <div key={partner} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:border-slate-200 transition">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-white shadow-xs shrink-0">
                                  {partner}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-slate-800 uppercase block">{partner}</span>
                                  <p className="text-xs text-slate-500 leading-normal">{formatMarkdown(getSynergyExplanation(upperType, partner, true))}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Extrovert Types */}
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Extrovert Types</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {compatibleExtroverts.map((partner) => (
                              <div key={partner} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:border-slate-200 transition">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-white shadow-xs shrink-0">
                                  {partner}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-slate-800 uppercase block">{partner}</span>
                                  <p className="text-xs text-slate-500 leading-normal">{formatMarkdown(getSynergyExplanation(upperType, partner, true))}</p>
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
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Introvert Types</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {incompatibleIntroverts.map((partner) => (
                              <div key={partner} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:border-slate-200 transition">
                                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 font-black text-xs flex items-center justify-center border border-white shadow-xs shrink-0">
                                  {partner}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-slate-800 uppercase block">{partner}</span>
                                  <p className="text-xs text-slate-500 leading-normal">{formatMarkdown(getSynergyExplanation(upperType, partner, false))}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Extrovert Types */}
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Extrovert Types</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {incompatibleExtroverts.map((partner) => (
                              <div key={partner} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 hover:border-slate-200 transition">
                                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 font-black text-xs flex items-center justify-center border border-white shadow-xs shrink-0">
                                  {partner}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-xs font-bold text-slate-800 uppercase block">{partner}</span>
                                  <p className="text-xs text-slate-500 leading-normal">{formatMarkdown(getSynergyExplanation(upperType, partner, false))}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                {/* General Dynamics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Romance Styles</h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{typeInfo.romantic || "Appreciates honest, authentic, and deep connections."}</p>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Social Circles</h4>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{typeInfo.friendships || "Prefers a few close, high-trust friendships over wide social circles."}</p>
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

function ResultBar({ left, right, leftCode, rightCode, leftValue, rightValue, color }) {
  const isLeftDominant = leftValue >= rightValue;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs md:text-sm font-bold">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${isLeftDominant ? color : 'bg-slate-300'}`}>
            {leftCode}
          </span>
          <span className={isLeftDominant ? 'text-slate-900 font-extrabold' : 'text-slate-400'}>
            {left}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={!isLeftDominant ? 'text-slate-900 font-extrabold' : 'text-slate-400'}>
            {right}
          </span>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${!isLeftDominant ? color : 'bg-slate-300'}`}>
            {rightCode}
          </span>
        </div>
      </div>

      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200/50">
        <div 
          className={`h-full rounded-full transition-all duration-700 ${isLeftDominant ? color : 'bg-transparent'}`}
          style={{ width: `${leftValue}%` }}
        />
        <div 
          className={`h-full rounded-full transition-all duration-700 ${!isLeftDominant ? color : 'bg-transparent'}`}
          style={{ width: `${rightValue}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center text-xs font-bold text-slate-400">
        <span>{leftValue}%</span>
        <span>{rightValue}%</span>
      </div>
    </div>
  );
}
