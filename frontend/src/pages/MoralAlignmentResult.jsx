import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Square, Crosshair, Scale, Shield, AlertTriangle, HelpCircle } from 'lucide-react';
import { alignmentMap } from '../utils/moralAlignmentLogic';

export default function MoralAlignmentResult() {
  const { type } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  let resultData = location.state?.resultData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Failsafe for direct URL access without state
  if (!resultData && type) {
    if (alignmentMap[type]) {
      resultData = {
        alignment: alignmentMap[type],
        lcScore: 0,
        geScore: 0,
        scores: { lawChaos: 50, goodEvil: 50 }
      };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/alignment" replace />;
  }

  const { alignment, scores } = resultData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };

  // 3x3 Grid Definition
  const gridCells = [
    { row: 'Good', col: 'Lawful', id: 'lawful-good', label: 'LG' },
    { row: 'Good', col: 'Neutral', id: 'neutral-good', label: 'NG' },
    { row: 'Good', col: 'Chaotic', id: 'chaotic-good', label: 'CG' },
    
    { row: 'Neutral', col: 'Lawful', id: 'lawful-neutral', label: 'LN' },
    { row: 'Neutral', col: 'Neutral', id: 'true-neutral', label: 'TN' },
    { row: 'Neutral', col: 'Chaotic', id: 'chaotic-neutral', label: 'CN' },
    
    { row: 'Evil', col: 'Lawful', id: 'lawful-evil', label: 'LE' },
    { row: 'Evil', col: 'Neutral', id: 'neutral-evil', label: 'NE' },
    { row: 'Evil', col: 'Chaotic', id: 'chaotic-evil', label: 'CE' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-emerald-200">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[12vw] tracking-tighter leading-none text-slate-800 text-center uppercase whitespace-pre-wrap">
          {alignment.name}
        </span>
      </motion.div>

      {/* Decorative Modern Background Gradients */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${alignment.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${alignment.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-32 pb-32 relative z-10"
      >
        
        {/* Superior Navigation */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-16 md:mb-24">
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 text-slate-400 font-semibold text-sm uppercase tracking-widest hover:text-slate-900 transition-colors group`}
          >
            <div className={`w-8 h-8 rounded-full ${alignment.bgLight} border ${alignment.borderLight} flex items-center justify-center group-hover:bg-white transition-colors`}>
              <ChevronLeft className={`w-4 h-4 text-slate-600`} />
            </div>
            <span>Home</span>
          </button>
        </motion.div>

        {/* Hero Dashboard Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Title Card */}
          <div className="lg:col-span-8 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${alignment.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h3 className={`text-xs font-bold tracking-[0.4em] uppercase mb-6 text-slate-500 flex items-center gap-3`}>
              <Square className={`w-4 h-4 ${alignment.color.includes('emerald') ? 'text-emerald-500' : 'text-slate-500'}`} />
              Core Alignment
            </h3>
            
            <h1 className={`text-5xl md:text-6xl lg:text-[5.5rem] font-bold mb-6 text-slate-900 tracking-tight leading-none bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2`}>
              {alignment.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-normal mt-2 mb-8">
              {alignment.description}
            </p>

            <div className="pl-6 border-l-2 border-slate-200 uppercase tracking-widest text-xs font-bold text-slate-400">
              <span className="block mb-2 text-emerald-600">"{alignment.quote}"</span>
            </div>
          </div>

          {/* Alignment Grid Matrix */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${alignment.bgLight} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4 w-full">
               <Crosshair className="w-4 h-4 text-emerald-500" />
               Alignment Matrix
             </h4>

             <div className="w-full aspect-square grid grid-cols-3 grid-rows-3 gap-2 relative z-10">
                {gridCells.map((cell) => {
                  const isMatch = cell.id === alignment.id;
                  return (
                    <motion.div 
                      key={cell.id}
                      initial={false}
                      animate={
                        isMatch 
                          ? { scale: [1, 1.05, 1], rotate: [0, 2, 0] } 
                          : {}
                      }
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className={`
                        flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 font-black text-xl md:text-3xl tracking-tighter shadow-inner
                        ${isMatch 
                          ? `bg-linear-to-br ${alignment.color} text-white shadow-lg ring-4 ring-white` 
                          : 'bg-slate-100/50 text-slate-300 border border-slate-200/50'}
                      `}
                    >
                      {cell.label}
                    </motion.div>
                  )
                })}
             </div>
          </div>
        </motion.div>

        {/* Axis Breakdowns */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col justify-center h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Scale className={`w-4 h-4 text-indigo-400`} />
                  Ethics Axis (Law & Chaos)
                </h4>
                
                <div className="w-full flex justify-between text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  <span>Chaos</span>
                  <span>Law</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.lawChaos}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full bg-linear-to-r from-orange-400 to-indigo-500`}
                    />
                </div>
                <p className="text-slate-500 mt-6 text-sm leading-relaxed">
                  This axis measures your compliance with societal structures, rules, and authority vs. your desire for absolute independence, spontaneity, and rebellion.
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col justify-center h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Shield className={`w-4 h-4 text-emerald-400`} />
                  Morals Axis (Good & Evil)
                </h4>
                
                <div className="w-full flex justify-between text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  <span>Evil</span>
                  <span>Good</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.goodEvil}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className={`h-full bg-linear-to-r from-red-500 to-emerald-400`}
                    />
                </div>
                <p className="text-slate-500 mt-6 text-sm leading-relaxed">
                  This axis measures your altruism, empathy, and willingness to help others vs. your pragmatism, selfishness, and willingness to harm others for personal gain.
                </p>
            </div>
        </motion.div>

        {/* Traits Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Shield className="w-5 h-5 text-emerald-400" />
              Manifest Strengths
            </h4>
            <ul className="space-y-6">
              {alignment.strengths?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start">
                  <div className={`mt-2 w-2 h-2 rounded-full bg-linear-to-r ${alignment.color} shrink-0`} />
                  <p className="text-slate-600 leading-relaxed text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Shadow Elements
            </h4>
            <ul className="space-y-6">
              {alignment.weaknesses?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start">
                  <div className={`mt-2 w-2 h-2 rounded-full bg-slate-300 shrink-0`} />
                  <p className="text-slate-600 leading-relaxed text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        
      </motion.div>
    </div>
  );
}
