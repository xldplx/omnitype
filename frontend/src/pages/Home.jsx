import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon, Circle, Triangle, Square, Sparkles, Diamond, Pentagon, Layers, ShieldAlert, Palette, Star, Zap, ClipboardCheck, Workflow, RefreshCw, Compass, Binary } from 'lucide-react';

const tests = [
  {
    id: 'mbti',
    title: '16 Archetypes',
    description: 'Cognitive functions and personality mapping based on Jungian psychology. A comprehensive deep-dive into your psyche.',
    time: '12 min',
    active: true,
    color: 'from-indigo-500 to-purple-500',
    bgLight: 'bg-indigo-50',
    borderLight: 'border-indigo-100',
    icon: Hexagon
  },
  {
    id: 'enneagram',
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
    id: 'love-languages',
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
    id: 'jungian-archetypes',
    title: 'Jungian Archetypes',
    description: 'Map the mythic character templates resting in your unconscious mind. Are you the Creator, Sage, or Hero?',
    time: '15 min',
    active: false,
    color: 'from-sky-400 to-blue-600',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-100',
    icon: Diamond
  },
  {
    id: 'tritype',
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
    id: 'aesthetic-core',
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
    id: 'color-psychology',
    title: 'Colour Psychology',
    description: 'What exact hex codes and gradients represent your current emotional state and aura?',
    time: '5 min',
    active: true,
    color: 'from-cyan-400 via-blue-500 to-purple-600',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-100',
    icon: Palette
  },
  {
    id: 'instinctual-variants',
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
    id: 'hexaco-model',
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
    id: 'socionics',
    title: 'Socionics',
    description: 'Complex systemic typology predicting inter-type dynamics and psychological "Information Metabolism".',
    time: '20 min',
    active: false,
    color: 'from-purple-600 to-indigo-800',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-100',
    icon: Workflow
  },
  {
    id: 'cognitive-loop',
    title: 'Cognitive Loop Test',
    description: 'Detect if your psyche is in a "Jumper" state, skipping auxiliary functions and looping on stress.',
    time: '10 min',
    active: false,
    color: 'from-rose-500 to-orange-600',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-100',
    icon: RefreshCw
  },
  {
    id: 'attitudinal-psyche',
    title: 'Attitudinal Psyche',
    description: 'Identify your stance on Logic, Emotion, Volition, and Physics. The 3rd piece of your personality stack.',
    time: '12 min',
    active: false,
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50',
    borderLight: 'border-cyan-100',
    icon: Compass
  },
  {
    id: 'objective-personality',
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
    title: 'Moral Alignment',
    description: 'Are you Lawful Good or Chaotic Evil? Discover where exactly you stand on the classic D&D alignment chart.',
    time: '8 min',
    active: false,
    color: 'from-teal-400 to-emerald-500',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-100',
    icon: Square
  }
];

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#fafafa] flex flex-col items-center pt-20 md:pt-32 pb-32 relative overflow-hidden selection:bg-indigo-100">
      
      {/* Immersive Modern Background Architecture */}
      <div className="fixed top-[-20vh] left-[-10vw] w-[60vw] h-[60vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[10vh] right-[-10vw] w-[50vw] h-[50vw] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Simplified Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mb-12 md:mb-20 px-6 relative z-10 flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-none">
          OmniType<span className="text-indigo-600">.</span>
        </h1>
      </motion.div>

      {/* Symmetrical Grid Section */}
      <div className="w-full max-w-5xl px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
          {tests.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.1, ease: 'easeOut' }}
              className="w-full h-full"
            >
              {test.active ? (
                <Link to={`/test/${test.id}`} className="block h-full group">
                  <TestCard test={test} />
                </Link>
              ) : (
                <div className="h-full opacity-[0.8] cursor-not-allowed group">
                  <TestCard test={test} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestCard({ test }) {
  const Icon = test.icon;
  
  return (
    <div className="bg-white/70 backdrop-blur-2xl p-6 sm:p-8 md:p-10 flex flex-col h-full relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] md:rounded-4xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 group">
      
      {/* Decorative inner gradient flash */}
      <div className={`absolute inset-0 bg-linear-to-br ${test.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none`} />

      {/* Background decorative animated blob */}
      <div className={`absolute -right-8 -bottom-8 w-48 h-48 md:w-64 md:h-64 bg-linear-to-br ${test.color} opacity-[0.06] rounded-[4rem] rotate-12 blur-3xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-[0.15] group-hover:scale-[1.3] group-hover:rotate-[45deg] pointer-events-none origin-center`} />
      
      <div className="flex justify-between items-start mb-6 md:mb-10 relative z-10">
        <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center border ${test.borderLight} ${test.bgLight} shadow-inner transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-12 group-hover:scale-110`}>
          <Icon className={`w-6 h-6 md:w-7 md:h-7 bg-clip-text text-transparent`} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="0" height="0">
              <linearGradient id={`gradient-${test.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="currentColor" offset="0%" />
                <stop stopColor="currentColor" offset="100%" />
              </linearGradient>
            </svg>
            <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ stroke: `url(#gradient-${test.id})`, strokeWidth: 2 }} />
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2 md:gap-3">
            {!test.active && (
            <span className="text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-widest bg-slate-100/50 text-slate-500 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-slate-200/50 backdrop-blur-sm shadow-sm md:whitespace-nowrap hidden sm:block">
                Coming Soon
            </span>
            )}
            <div className="flex items-center gap-1.5 md:gap-2.5 text-slate-400 font-bold text-[0.6rem] md:text-[0.7rem] uppercase tracking-widest bg-white/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-slate-100 shadow-sm relative overflow-hidden group/time">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/time:bg-indigo-400 transition-colors duration-500" />
                {test.time}
            </div>
        </div>
      </div>

      <div className="flex-1 relative z-10 flex flex-col justify-center">
        <h2 className={`text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-slate-800 mb-3 md:mb-4 tracking-tight leading-none text-balance group-hover:text-transparent bg-clip-text bg-linear-to-r ${test.color} transition-colors duration-500`}>
          {test.title}
        </h2>
        <p className="text-slate-500 text-sm sm:text-base md:text-[1.05rem] font-medium leading-relaxed mb-6 md:mb-8 text-balance opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          {test.description}
        </p>
      </div>
      
      <div className={`flex items-center justify-between mt-auto pt-6 md:pt-8 border-t border-slate-100/80 relative z-10 ${!test.active ? 'opacity-50' : ''}`}>
        <span className={`text-[0.65rem] md:text-[0.8rem] font-bold tracking-widest uppercase ${test.active ? 'text-indigo-500' : 'text-slate-400'}`}>
            {test.active ? 'Begin Assessment' : 'Under Construction'}
        </span>
        
        {test.active ? (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 border border-transparent shadow-[0_8px_20px_rgb(0,0,0,0.12)] flex items-center justify-center text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-slate-800 group-hover:scale-110 group-hover:shadow-[0_12px_25px_rgb(0,0,0,0.2)]">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </div>
        ) : (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
