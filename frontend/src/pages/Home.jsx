import { useState, useRef, useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ChevronLeft, ChevronRight, Hexagon, Circle, Triangle, Square, Diamond, Pentagon, Layers, 
  ShieldAlert, Palette, Star, Zap, ClipboardCheck, Workflow, RefreshCw, 
  Compass, Binary, Skull, Brain, Fingerprint, Eye, Battery, Shield, UserMinus, 
  Swords, HeartHandshake, Waves, Sprout, LayoutGrid, Ghost, Flame, Flag, Coffee, 
  Wand2, Navigation2, Mountain, Microscope, Activity, Gem, Puzzle, HeartCrack, 
  Settings, Siren, Timer, Lock, Sparkles, Search, X, CheckCircle2, RotateCcw
} from 'lucide-react';

const categories = [
  { id: 'all', title: 'All Categories' },
  { id: 'cognition', title: "Personality & Thinking", desc: "Understand who you are and how your mind works." },
  { id: 'motivation', title: "Motivations & Instincts", desc: "Find out what drives your choices every day." },
  { id: 'relational', title: "Relationships & Connection", desc: "Learn how you communicate and bond with others." },
  { id: 'philosophy', title: "Style & Values", desc: "Discover your true colors and what you stand for." },
  { id: 'behavioral', title: "Science & Behavior", desc: "Tested methods to measure your mind and strength." },
  { id: 'neurodiversity', title: "Neurodiversity & Mental Health", desc: "Discover how your unique brain processes information." },
  { id: 'shadow', title: "The Hidden Self", desc: "Explore the darker, hidden parts of your personality." }
];

const tests = [
  {
    id: 'mbti',
    category: 'cognition',
    title: '16 Archetypes',
    description: 'Cognitive functions and personality mapping based on Jungian psychology. A comprehensive deep-dive into your psyche.',
    time: '4 min',
    active: true,
    color: 'from-indigo-500 to-purple-500',
    bgLight: 'bg-indigo-50',
    borderLight: 'border-indigo-100',
    icon: Hexagon
  },
  {
    id: 'mindset-architecture',
    category: 'cognition',
    title: 'Mindset Architecture',
    description: 'Are you anchored by a Fixed mindset or propelled by Growth? Map your core beliefs about intelligence and talent.',
    time: '8 min',
    active: false,
    color: 'from-emerald-400 to-cyan-500',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-100',
    icon: Sprout
  },
  {
    id: 'mental-models',
    category: 'cognition',
    title: 'Mental Models',
    description: 'Discover the logical frameworks you use to solve complex problems, from First Principles to Systems Thinking.',
    time: '12 min',
    active: false,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-100',
    icon: LayoutGrid
  },
  {
    id: 'enneagram',
    category: 'motivation',
    title: 'The Enneagram',
    description: 'Uncover your core fears, desires, and underlying motivations that subconsciously drive your daily decisions.',
    time: '12 min',
    active: true,
    color: 'from-orange-400 to-rose-500',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    icon: Circle
  },
  {
    id: 'tritype',
    category: 'motivation',
    title: 'The Tritype',
    description: 'Go beyond your core type. Discover the three Enneagram types that form your unique inner-workings.',
    time: '15 min',
    active: true,
    color: 'from-violet-500 to-fuchsia-600',
    bgLight: 'bg-violet-50',
    borderLight: 'border-violet-100',
    icon: Layers
  },
  {
    id: 'instinctual-variants',
    category: 'motivation',
    title: 'Instinctual Variants',
    description: 'The "missing half" of Enneagram. Are you Self-Preservation, Social, or Sexual (Sx)?',
    time: '10 min',
    active: true,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-100',
    icon: Zap
  },
  {
    id: 'core-needs',
    category: 'motivation',
    title: 'The 6 Core Needs',
    description: 'What is your primary driver? Discover if you are motivated by Certainty, Variety, Significance, or Growth.',
    time: '10 min',
    active: false,
    color: 'from-orange-500 to-amber-600',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-100',
    icon: Activity
  },
  {
    id: 'core-values',
    category: 'motivation',
    title: 'Values Architecture',
    description: 'Map your non-negotiable priorities. Discover the top 5 values that form the foundation of your choices.',
    time: '10 min',
    active: false,
    color: 'from-amber-400 to-yellow-500',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-100',
    icon: Gem
  },
  {
    id: 'love-languages',
    category: 'relational',
    title: 'Love Languages',
    description: 'How do you naturally give and receive affection? Find out your primary language of interpersonal connection.',
    time: '12 min',
    active: true,
    color: 'from-rose-400 to-pink-500',
    bgLight: 'bg-pink-50',
    borderLight: 'border-pink-100',
    icon: Triangle
  },
  {
    id: 'attachment-styles',
    category: 'relational',
    title: 'Attachment Styles',
    description: 'Discover your subconscious relationship reflexes. Are you Secure, Anxious, Avoidant, or Fearful?',
    time: '10 min',
    active: true,
    color: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-100',
    icon: Pentagon
  },
  {
    id: 'dere',
    category: 'relational',
    title: 'The -dere Spectrum',
    description: 'Discover your affectionate persona. Are you a Tsundere, Kuudere, Yandere, Dandere, or Deredere?',
    time: '8 min',
    active: true,
    color: 'from-rose-500 via-purple-500 to-indigo-600',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    icon: Sparkles
  },
  {
    id: 'conflict-styles',
    category: 'relational',
    title: 'Conflict Styles',
    description: 'How do you navigate disagreements? Discover if you are a Competitor, Collaborator, or Avoider.',
    time: '10 min',
    active: false,
    color: 'from-orange-500 to-red-600',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-100',
    icon: Swords
  },
  {
    id: 'apology-languages',
    category: 'relational',
    title: 'Apology Languages',
    description: 'The secret to restorative repair. Find out how you naturally express regret and forgive.',
    time: '8 min',
    active: false,
    color: 'from-teal-400 to-emerald-500',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-100',
    icon: HeartHandshake
  },
  {
    id: 'social-battery',
    category: 'relational',
    title: 'Social Battery',
    description: 'Map your social endurance. Are you a 1-on-1 Deep-Diver, a Group Connector, or a Selective Observer?',
    time: '5 min',
    active: false,
    color: 'from-cyan-400 to-blue-500',
    bgLight: 'bg-cyan-50',
    borderLight: 'border-cyan-100',
    icon: Waves
  },
  {
    id: 'red-green-flags',
    category: 'relational',
    title: 'Red & Green Flags',
    description: 'A deep-dive into your interpersonal hygiene. Identify your healthy green traits and warning signs.',
    time: '8 min',
    active: false,
    color: 'from-emerald-500 to-red-500',
    bgLight: 'bg-slate-50',
    borderLight: 'border-slate-200',
    icon: Flag
  },
  {
    id: 'beige-flags',
    category: 'relational',
    title: 'Beige Flags',
    description: 'The third category of flags. Discover the odd, quirky traits that make your personality unique.',
    time: '5 min',
    active: false,
    color: 'from-amber-200 to-yellow-400',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-100',
    icon: Coffee
  },
  {
    id: 'jungian-archetypes',
    category: 'cognition',
    title: 'Jungian Archetypes',
    description: 'Map the mythic character templates resting in your unconscious mind. Are you the Creator, Sage, or Hero?',
    time: '15 min',
    active: true,
    color: 'from-sky-400 to-blue-600',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-100',
    icon: Diamond
  },
  {
    id: 'aesthetic-core',
    category: 'philosophy',
    title: 'Aesthetic Core',
    description: 'Are you Dark Academia, Cyberpunk, or Cottagecore? Map the visual language of your soul.',
    time: '5 min',
    active: false,
    color: 'from-pink-400 to-rose-400',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    icon: Star
  },
  {
    id: 'main-character',
    category: 'philosophy',
    title: 'Main Character Energy',
    description: 'Measure your Protagonist Syndrome. Are you centering your own narrative or playing a supporting role?',
    time: '5 min',
    active: false,
    color: 'from-fuchsia-400 to-purple-600',
    bgLight: 'bg-fuchsia-50',
    borderLight: 'border-fuchsia-100',
    icon: Wand2
  },
  {
    id: 'color-psychology',
    category: 'philosophy',
    title: 'Color Psychology',
    description: 'What exact hex codes and gradients represent your current emotional state and aura?',
    time: '5 min',
    active: true,
    color: 'from-cyan-400 via-blue-500 to-purple-600',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-100',
    icon: Palette
  },
  {
    id: 'hexaco-model',
    category: 'behavioral',
    title: 'HEXACO Model',
    description: 'The scientific standard for personality mapping, including the critical Honesty-Humility trait.',
    time: '15 min',
    active: false,
    color: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-100',
    icon: ClipboardCheck
  },
  {
    id: 'locus-of-control',
    category: 'behavioral',
    title: 'Locus of Control',
    description: 'Do you control your destiny or does it control you? Map your orientation between Internal and External control.',
    time: '8 min',
    active: false,
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50',
    borderLight: 'border-cyan-100',
    icon: Navigation2
  },
  {
    id: 'grit-scale',
    category: 'behavioral',
    title: 'The Grit Scale',
    description: 'Measure your passion and persistence for long-term goals. Built for the sprint or the marathon?',
    time: '5 min',
    active: false,
    color: 'from-slate-500 to-slate-700',
    bgLight: 'bg-slate-50',
    borderLight: 'border-slate-100',
    icon: Mountain
  },
  {
    id: 'cognitive-reflection',
    category: 'behavioral',
    title: 'Cognitive Reflection',
    description: 'Test your ability to override intuition with logical reflection. Analytical thinking fast and slow.',
    time: '5 min',
    active: false,
    color: 'from-rose-500 to-orange-600',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    icon: Microscope
  },
  {
    id: 'socionics',
    category: 'relational',
    title: 'Socionics',
    description: 'Complex systemic typology predicting inter-type dynamics and psychological Information Metabolism.',
    time: '20 min',
    active: false,
    color: 'from-purple-600 to-indigo-800',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-100',
    icon: Workflow
  },
  {
    id: 'cognitive-loop',
    category: 'cognition',
    title: 'Cognitive Loop Test',
    description: 'Detect if your psyche is in a Jumper state, skipping auxiliary functions and looping on stress.',
    time: '10 min',
    active: false,
    color: 'from-rose-500 to-orange-600',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    icon: RefreshCw
  },
  {
    id: 'attitudinal-psyche',
    category: 'cognition',
    title: 'Attitudinal Psyche',
    description: 'Identify your stance on Logic, Emotion, Volition, and Physics. The 3rd piece of your stack.',
    time: '12 min',
    active: false,
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50',
    borderLight: 'border-cyan-100',
    icon: Compass
  },
  {
    id: 'objective-personality',
    category: 'cognition',
    title: 'Objective Personality',
    description: 'The scientific evolution of MBTI. Map your psyche across 512 unique behavioral subtypes.',
    time: '25 min',
    active: false,
    color: 'from-orange-500 via-red-500 to-rose-600',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-100',
    icon: Binary
  },
  {
    id: 'alignment',
    category: 'philosophy',
    title: 'Moral Alignment',
    description: 'Are you Lawful Good or Chaotic Evil? Discover where exactly you stand on the classic alignment chart.',
    time: '8 min',
    active: true,
    color: 'from-teal-400 to-emerald-500',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-100',
    icon: Square
  },
  {
    id: 'resilience',
    category: 'behavioral',
    title: 'Resilience Quotient',
    description: 'Measure your psychological fortitude. Are you an Anchor or a Reactor when faced with stress?',
    time: '5 min',
    active: true,
    color: 'from-sky-500 to-indigo-600',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-100',
    icon: ShieldAlert
  },
  {
    id: 'dark-triad',
    category: 'shadow',
    title: 'The Dark Triad',
    description: 'Explore the shadows of your psyche. Understand your levels of Machiavellianism, Narcissism, and Psychopathy.',
    time: '10 min',
    active: true,
    color: 'from-zinc-600 to-slate-800',
    bgLight: 'bg-zinc-100',
    borderLight: 'border-zinc-200',
    icon: Skull
  },
  {
    id: 'defense',
    category: 'shadow',
    title: 'Defense Mechanisms',
    description: 'Discover how your brain unconsciously protects you from anxiety and emotional pain.',
    time: '8 min',
    active: true,
    color: 'from-sky-500 to-indigo-600',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-100',
    icon: Shield
  },
  {
    id: 'imposter',
    category: 'shadow',
    title: 'Imposter Syndrome',
    description: 'Deconstruct your internal critic. Are you the Perfectionist, the Student, or the Rugged Individualist?',
    time: '8 min',
    active: true,
    color: 'from-fuchsia-500 to-purple-600',
    bgLight: 'bg-fuchsia-50',
    borderLight: 'border-fuchsia-100',
    icon: UserMinus
  },
  {
    id: 'shadow-archetype',
    category: 'shadow',
    title: 'The Shadow Archetype',
    description: 'What parts of yourself have you repressed? Map the traits you deny in yourself.',
    time: '15 min',
    active: false,
    color: 'from-slate-600 to-slate-900',
    bgLight: 'bg-slate-100',
    borderLight: 'border-slate-200',
    icon: Ghost
  },
  {
    id: 'primal-fears',
    category: 'shadow',
    title: 'Primal Fears',
    description: 'Peel back the layers of your anxiety. Are you driven by fear of rejection, abandonment, or insignificance?',
    time: '10 min',
    active: false,
    color: 'from-red-900 to-black',
    bgLight: 'bg-red-50',
    borderLight: 'border-red-100',
    icon: Flame
  },
  {
    id: 'adhd',
    category: 'neurodiversity',
    title: 'ADHD Test',
    description: 'A deep-dive into your cognitive architecture. Map focus stability, executive rhythm, and impulse control.',
    time: '8 min',
    active: true,
    color: 'from-orange-500 to-rose-500',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-100',
    icon: Brain
  },
  {
    id: 'autism-spectrum',
    category: 'neurodiversity',
    title: 'Autism Spectrum',
    description: 'A clinical-grade screening tool to map your neuro-signature across the autism spectrum.',
    time: '12 min',
    active: false,
    color: 'from-blue-400 to-indigo-500',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-100',
    icon: Puzzle
  },
  {
    id: 'rsd-test',
    category: 'neurodiversity',
    title: 'RSD Profile',
    description: 'Measure your Rejection Sensitive Dysphoria. Understand emotional resonance to perceived rejection.',
    time: '8 min',
    active: false,
    color: 'from-rose-400 to-red-500',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    icon: HeartCrack
  },
  {
    id: 'executive-function',
    category: 'neurodiversity',
    title: 'Executive Function',
    description: 'Map the Admin of your brain. Deep-dive into working memory, inhibition, and task-switching.',
    time: '10 min',
    active: false,
    color: 'from-slate-600 to-slate-800',
    bgLight: 'bg-slate-100',
    borderLight: 'border-slate-200',
    icon: Settings
  },
  {
    id: 'cptsd-responses',
    category: 'neurodiversity',
    title: 'CPTSD Responses',
    description: 'Identify your primary survival reflex. Are you driven by Fight, Flight, Freeze, or Fawn responses?',
    time: '12 min',
    active: false,
    color: 'from-purple-500 to-indigo-700',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-100',
    icon: Siren
  },
  {
    id: 'ocd-tendencies',
    category: 'neurodiversity',
    title: 'OCD Tendencies',
    description: 'Measure the drive for order, symmetry, and intrusive thought patterns in your psychological landscape.',
    time: '10 min',
    active: false,
    color: 'from-cyan-600 to-blue-700',
    bgLight: 'bg-cyan-50',
    borderLight: 'border-cyan-100',
    icon: Timer
  },
  {
    id: 'hsp',
    category: 'neurodiversity',
    title: 'Highly Sensitive Person',
    description: 'Measure your sensory sensitivity, emotional empathy, and depth of processing in chaotic environments.',
    time: '8 min',
    active: true,
    color: 'from-pink-400 to-rose-400',
    bgLight: 'bg-pink-50',
    borderLight: 'border-pink-100',
    icon: Eye
  },
  {
    id: 'burnout',
    category: 'neurodiversity',
    title: 'Nervous System & Burnout',
    description: 'Map your physical exhaustion, cognitive fatigue, and whether you are stuck in Fight, Flight, or Freeze.',
    time: '8 min',
    active: true,
    color: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-100',
    icon: Battery
  },
  {
    id: 'big-five',
    category: 'behavioral',
    title: 'The Big Five',
    description: 'The scientific standard for personality assessment. Measure Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    time: '12 min',
    active: false,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-100',
    icon: Fingerprint
  }
];

const TEST_TAGS = {
  mbti: 'Jungian Typology',
  'mindset-architecture': 'Mindset Theory',
  'mental-models': 'Problem Solving',
  enneagram: 'Ego Dynamics',
  tritype: '3 Centers of Mind',
  'instinctual-variants': 'Subtype Drives',
  'core-needs': 'Core Motivation',
  'core-values': 'Value Systems',
  'love-languages': 'Affection Dynamics',
  'attachment-styles': 'Attachment Theory',
  dere: 'Relational Trope',
  'conflict-styles': 'Conflict Strategy',
  'apology-languages': 'Restorative Repair',
  'social-battery': 'Social Endurance',
  'red-green-flags': 'Interpersonal Hygiene',
  'beige-flags': 'Quirk Spectrum',
  'jungian-archetypes': 'Depth Psychology',
  'aesthetic-core': 'Visual Identity',
  'main-character': 'Narrative Role',
  'color-psychology': 'Chromatic Profile',
  'hexaco-model': 'Trait Psychology',
  'locus-of-control': 'Agency & Attribution',
  'grit-scale': 'Persistence Metric',
  'cognitive-reflection': 'Analytical Thinking',
  socionics: 'Information Metabolism',
  'cognitive-loop': 'Function Jumper',
  'attitudinal-psyche': 'Volition & Logic',
  'objective-personality': '512 Subtypes',
  alignment: 'Moral Dimensions',
  resilience: 'Fortitude Index',
  'dark-triad': 'Shadow Self',
  defense: 'Psychoanalysis',
  imposter: 'Self-Efficacy',
  'shadow-archetype': 'Repressed Traits',
  'primal-fears': 'Anxiety Reflexes',
  adhd: 'Executive Function',
  'autism-spectrum': 'Neuro-Signature',
  'rsd-test': 'Rejection Sensitivity',
  'executive-function': 'Cognitive Admin',
  'cptsd-responses': 'Survival Reflexes',
  'ocd-tendencies': 'Cognitive Loops',
  hsp: 'Sensory Processing',
  burnout: 'Nervous Fatigue',
  'big-five': 'OCEAN Standard'
};

function getSavedResult(testId) {
  if (typeof window === 'undefined') return null;
  try {
    const keyMap = {
      mbti: 'omnitype_mbti',
      enneagram: 'omnitype_enneagram',
      'love-languages': 'omnitype_love_languages',
      'attachment-styles': 'omnitype_attachment_styles',
      'instinctual-variants': 'omnitype_instinctual_variants',
      tritype: 'omnitype_tritype',
      'color-psychology': 'omnitype_color_psychology',
      'jungian-archetypes': 'omnitype_jungian_archetypes',
      alignment: 'omnitype_alignment',
      resilience: 'omnitype_resilience',
      adhd: 'omnitype_adhd',
      hsp: 'omnitype_hsp',
      burnout: 'omnitype_burnout',
      'dark-triad': 'omnitype_dark_triad',
      defense: 'omnitype_defense',
      imposter: 'omnitype_imposter',
      dere: 'omnitype_dere',
    };
    const storageKey = keyMap[testId];
    if (!storageKey) return null;
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'string') return { type: parsed };
      if (parsed && typeof parsed === 'object') {
        const typeVal = parsed.type || parsed.dominantType || parsed.primary || parsed.style || parsed.archetype;
        return { type: typeVal || 'Completed' };
      }
    } catch {
      return { type: raw };
    }
    return { type: raw };
  } catch {
    return null;
  }
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedResults] = useState(() => {
    const map = {};
    tests.forEach(t => {
      if (t.active) {
        const saved = getSavedResult(t.id);
        if (saved) map[t.id] = saved;
      }
    });
    return map;
  });
  const navigate = useNavigate();
  const categoryScrollRef = useRef(null);

  const activeCount = useMemo(() => tests.filter(t => t.active).length, []);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchingTests = useMemo(() => {
    return tests.filter(test => {
      // 1. Status Filter
      if (statusFilter === 'available' && !test.active) return false;
      if (statusFilter === 'coming-soon' && test.active) return false;

      // 2. Category Filter (if not 'all')
      if (selectedCategory !== 'all' && test.category !== selectedCategory) return false;

      // 3. Search Query Filter
      if (!normalizedQuery) return true;

      const tag = (TEST_TAGS[test.id] || '').toLowerCase();
      const cat = categories.find(c => c.id === test.category);
      const catTitle = cat ? cat.title.toLowerCase() : '';

      return (
        test.title.toLowerCase().includes(normalizedQuery) ||
        test.description.toLowerCase().includes(normalizedQuery) ||
        test.id.toLowerCase().includes(normalizedQuery) ||
        tag.includes(normalizedQuery) ||
        catTitle.includes(normalizedQuery)
      );
    });
  }, [statusFilter, selectedCategory, normalizedQuery]);

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      if (cat.id === 'all') return false;
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
      return matchingTests.some(t => t.category === cat.id);
    });
  }, [selectedCategory, matchingTests]);

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center pb-32 relative selection:bg-indigo-100">
      
      {/* Full Height Hero Section */}
      <div className="w-full min-h-[100dvh] flex flex-col items-center justify-center relative z-10 px-6 pt-20 md:pt-28">
        <Motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-4xl flex flex-col items-center"
        >
          <h1 className="text-[15vw] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 leading-none mb-6">
            OmniType<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 font-medium max-w-2xl text-balance mb-12">
            The ultimate dashboard for your personality. Understand how you think, find out what drives you, and learn how you connect with others.
          </p>
          
          <button 
            onClick={() => {
              const el = document.getElementById('tests-directory');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="group inline-flex items-center gap-4 px-6 py-3 bg-white text-slate-800 rounded-full font-bold text-base md:text-lg transition-all duration-300 border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer"
          >
            <span className="pl-2 group-hover:text-indigo-600 transition-colors">Begin the Assessment</span>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        </Motion.div>
      </div>

      {/* Directory Section */}
      <div id="tests-directory" className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-12 relative z-10">
        
        {/* Sleek Live Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-full shadow-[0_4px_25px_rgb(0,0,0,0.03)] focus-within:shadow-[0_8px_30px_rgb(99,102,241,0.12)] focus-within:border-indigo-400/80 transition-all duration-300 px-5 py-3.5 group">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 35+ psychological tests, traits, or models (e.g. MBTI, ADHD, Enneagram)..."
              className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 font-medium text-sm sm:text-base outline-none pr-8 selection:bg-indigo-100"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Status Meta Line */}
          {normalizedQuery && (
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-4 mt-2.5">
              <span>
                Found <strong className="text-slate-900 font-bold">{matchingTests.length}</strong> assessment{matchingTests.length === 1 ? '' : 's'} matching &ldquo;<span className="text-indigo-600 font-semibold">{searchQuery}</span>&rdquo;
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Status & Category Filters */}
        <div className="flex flex-col gap-6 mb-16">
          
          {/* Status Filter Buttons */}
          <div className="w-full overflow-x-auto no-scrollbar scrollbar-none py-1">
            <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max mx-auto px-4">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-4 sm:px-5 py-2 rounded-full text-[0.7rem] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  statusFilter === 'all' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white/80 text-slate-500 hover:bg-white hover:text-slate-800 border border-slate-200/60'
                }`}
              >
                All Assessments ({tests.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('available')}
                className={`px-4 sm:px-5 py-2 rounded-full text-[0.7rem] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  statusFilter === 'available' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white/80 text-slate-500 hover:bg-white hover:text-slate-800 border border-slate-200/60'
                }`}
              >
                Available ({activeCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('coming-soon')}
                className={`px-4 sm:px-5 py-2 rounded-full text-[0.7rem] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                  statusFilter === 'coming-soon' 
                    ? 'bg-slate-700 text-white shadow-md' 
                    : 'bg-white/80 text-slate-500 hover:bg-white hover:text-slate-800 border border-slate-200/60'
                }`}
              >
                In Development ({tests.length - activeCount})
              </button>
            </div>
          </div>

          {/* Genre Category Scrollable Row with Navigation Controls */}
          <div className="relative w-full flex items-center group">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              aria-label="Scroll categories left"
              className="hidden sm:flex shrink-0 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 hover:scale-110 active:scale-95 transition-all duration-300 mr-2 cursor-pointer z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Category Buttons Scroll Container */}
            <div 
              ref={categoryScrollRef}
              className="w-full overflow-x-auto category-scroll py-2 scroll-smooth"
            >
              <div className="flex items-center justify-start md:justify-center gap-2 min-w-max mx-auto px-1">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 whitespace-nowrap transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 text-white font-bold shadow-sm' 
                          : 'bg-white/80 text-slate-500 hover:text-slate-800 hover:bg-white border border-slate-200/60'
                      }`}
                    >
                      {cat.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scroll Right Button */}
            <button
              type="button"
              onClick={() => scrollCategories('right')}
              aria-label="Scroll categories right"
              className="hidden sm:flex shrink-0 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300 hover:scale-110 active:scale-95 transition-all duration-300 ml-2 cursor-pointer z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty State if No Assessments Match Search / Filters */}
        {matchingTests.length === 0 ? (
          <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-slate-200/70 shadow-xs mb-20">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5 text-indigo-500">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">No assessments found</h3>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mb-6 leading-relaxed">
              No psychological assessments matched {normalizedQuery ? `"${searchQuery}"` : 'your active filters'}. Try searching for &ldquo;MBTI&rdquo;, &ldquo;ADHD&rdquo;, &ldquo;Shadow&rdquo;, or resetting your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setStatusFilter('all');
              }}
              className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          /* Categorized Test Sections */
          filteredCategories.map((cat) => {
            const catTests = matchingTests.filter(t => t.category === cat.id);
            if (catTests.length === 0) return null;

            return (
              <div key={cat.id} className="w-full mb-20 md:mb-28">
                <div className="flex flex-col items-center text-center mb-10 md:mb-14">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">{cat.title}</h2>
                  <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl text-balance">{cat.desc}</p>
                  <div className="w-16 h-1 bg-indigo-500/20 rounded-full mt-8" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
                  {catTests.map((test) => (
                    <div key={test.id} className="w-full h-full">
                      {test.active ? (
                        <div 
                          onClick={() => {
                            const saved = savedResults[test.id];
                            if (saved?.type) {
                              navigate(`/result/${test.id}/${encodeURIComponent(String(saved.type).toLowerCase())}`);
                            } else {
                              navigate(`/test/${test.id}`);
                            }
                          }}
                          className="block h-full group cursor-pointer"
                        >
                          <TestCard 
                            test={test} 
                            savedResult={savedResults[test.id]} 
                            onNavigate={navigate}
                          />
                        </div>
                      ) : (
                        <div className="h-full cursor-not-allowed">
                          <TestCard 
                            test={test} 
                            savedResult={null}
                            onNavigate={navigate}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function TestCard({ test, savedResult, onNavigate }) {
  const Icon = test.icon || Hexagon;
  const tag = TEST_TAGS[test.id] || 'Psychological Framework';
  const isCompleted = Boolean(savedResult);
  
  if (!test.active) {
    // Distinct Grayscale & Static Styling for In-Development Cards
    return (
      <div className="bg-slate-100/70 backdrop-blur-md p-6 sm:p-8 md:p-9 flex flex-col h-full relative overflow-hidden rounded-[2rem] md:rounded-3xl border border-slate-200/80 grayscale opacity-65 pointer-events-none transition-all duration-300">
        {/* Top Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-300" />

        <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10 gap-3">
          <div className="w-13 h-13 md:w-15 md:h-15 rounded-2xl flex items-center justify-center border border-slate-200 bg-slate-200/60 text-slate-400 shrink-0">
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-slate-400" />
          </div>
          
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <span className="hidden sm:inline-flex items-center text-[0.65rem] md:text-[0.68rem] font-bold text-slate-400 bg-slate-200/60 px-2.5 py-1 rounded-full border border-slate-300/40 uppercase tracking-wider">
              {tag}
            </span>
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[0.68rem] md:text-[0.72rem] uppercase tracking-wider bg-slate-200/60 px-3 py-1 rounded-full border border-slate-300/40">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              {test.time}
            </div>
          </div>
        </div>

        <div className="flex-1 relative z-10 flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-extrabold text-slate-400 mb-2.5 tracking-tight leading-tight">
            {test.title}
          </h3>
          <p className="text-slate-400 text-sm md:text-[0.98rem] font-medium leading-relaxed mb-6">
            {test.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-5 md:pt-6 border-t border-slate-200/80 relative z-10 opacity-70">
          <span className="text-[0.68rem] md:text-[0.75rem] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            Under Construction
          </span>
          
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 border border-slate-300/50">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // Active Live Assessment Card with Enhanced Micro-interactions
  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 md:p-9 flex flex-col h-full relative overflow-hidden transition-all duration-500 ease-out rounded-[2rem] md:rounded-3xl border border-white/90 group-hover:border-indigo-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgb(0,0,0,0.08)] hover:-translate-y-1.5">
      
      {/* Top Hairline Gradient Accent on Hover */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${test.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20`} />

      {/* Floating Animated Geometric Shape Accent on Hover */}
      <div className={`absolute -right-6 -bottom-6 w-36 h-36 md:w-44 md:h-44 rounded-3xl md:rounded-4xl bg-linear-to-br ${test.color} opacity-0 group-hover:opacity-[0.14] scale-75 group-hover:scale-100 group-hover:rotate-12 transition-all duration-500 ease-out pointer-events-none flex items-center justify-center z-0`}>
        <Icon className="w-20 h-20 md:w-24 md:h-24 text-slate-900 opacity-30" />
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div className={`absolute -right-8 -bottom-8 w-48 h-48 md:w-60 md:h-60 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${test.color} opacity-[0.05] rounded-full pointer-events-none group-hover:opacity-[0.15] transition-all duration-500 ease-out z-0`} />

      {/* Header: Icon Box + Metadata Badges */}
      <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10 gap-3">
        <div className={`w-13 h-13 md:w-15 md:h-15 rounded-2xl flex items-center justify-center border ${test.borderLight} ${test.bgLight} shadow-2xs transition-transform duration-500 ease-out group-hover:scale-105 shrink-0`}>
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-indigo-600" />
        </div>
        
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {isCompleted && (
            <div className="flex items-center gap-1.5 text-[0.68rem] md:text-[0.72rem] font-extrabold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{savedResult.type && savedResult.type !== 'Completed' ? savedResult.type : 'Completed'}</span>
            </div>
          )}

          <span className="hidden sm:inline-flex items-center text-[0.65rem] md:text-[0.68rem] font-bold text-slate-500 bg-slate-100/70 px-2.5 py-1 rounded-full border border-slate-200/50 uppercase tracking-wider">
            {tag}
          </span>

          <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[0.68rem] md:text-[0.72rem] uppercase tracking-wider bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100/80 shadow-2xs">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            {test.time}
          </div>
        </div>
      </div>

      {/* Title & Description with Hover Colors */}
      <div className="flex-1 relative z-10 flex flex-col justify-center">
        <h3 className={`text-2xl sm:text-3xl md:text-[2rem] font-black text-slate-800 mb-2.5 tracking-tight leading-tight group-hover:text-transparent bg-clip-text bg-linear-to-r ${test.color} transition-all duration-500`}>
          {test.title}
        </h3>
        <p className="text-slate-500 text-sm md:text-[0.98rem] font-medium leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          {test.description}
        </p>
      </div>
      
      {/* Footer Actions: Dual action when completed, or standard link when new */}
      {isCompleted ? (
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100/80 relative z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(`/test/${test.id}`);
            }}
            className="inline-flex items-center gap-1.5 text-[0.72rem] md:text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-800 transition-colors py-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake</span>
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(`/result/${test.id}/${encodeURIComponent(String(savedResult.type || 'profile').toLowerCase())}`);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[0.72rem] md:text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:shadow-xs group/btn cursor-pointer"
          >
            <span>View Result</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-600 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100/80 relative z-10">
          <span className="text-[0.7rem] md:text-xs font-bold uppercase tracking-wider text-slate-400">Standardized Scale</span>
          <div className="inline-flex items-center gap-2 text-[0.75rem] md:text-xs font-black uppercase tracking-wider text-indigo-600 group-hover:text-indigo-700 transition-colors">
            <span>Begin Assessment</span>
            <ArrowRight className="w-4 h-4 text-indigo-500 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      )}
    </div>
  );
}
