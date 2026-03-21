import { useEffect } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldAlert, Target, Shield, AlertTriangle } from 'lucide-react';
import { rqMap } from '../utils/resilienceQuotientLogic';

export default function ResilienceQuotientResult() {
  const { type } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  let resultData = location.state?.resultData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Failsafe for direct URL access without state
  if (!resultData && type) {
    if (rqMap[type]) {
      resultData = {
        rqInfo: rqMap[type],
        confScore: 0,
        stressScore: 0,
        scores: { confidence: 50, stressTolerance: 50 }
      };
    }
  }

  if (!resultData) {
    return <Navigate to="/test/resilience" replace />;
  }

  const { rqInfo, scores } = resultData;

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

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-sky-200">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[12vw] tracking-tighter leading-none text-slate-800 text-center uppercase whitespace-pre-wrap">
          {rqInfo.name}
        </span>
      </motion.div>

      {/* Decorative Modern Background Gradients */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${rqInfo.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${rqInfo.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

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
            <div className={`w-8 h-8 rounded-full ${rqInfo.bgLight} border ${rqInfo.borderLight} flex items-center justify-center group-hover:bg-white transition-colors`}>
              <ChevronLeft className={`w-4 h-4 text-slate-600`} />
            </div>
            <span>Home</span>
          </button>
        </motion.div>

        {/* Hero Dashboard Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Title Card */}
          <div className="lg:col-span-8 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${rqInfo.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h3 className={`text-xs font-bold tracking-[0.4em] uppercase mb-6 text-slate-500 flex items-center gap-3`}>
              <ShieldAlert className={`w-4 h-4 ${rqInfo.color.includes('sky') ? 'text-sky-500' : 'text-slate-500'}`} />
              Resilience Quotient (RQ)
            </h3>
            
            <h1 className={`text-5xl md:text-6xl lg:text-[5.5rem] font-bold mb-6 text-slate-900 tracking-tight leading-none bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2`}>
              {rqInfo.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-normal mt-2 mb-8">
              {rqInfo.description}
            </p>

            <div className="pl-6 border-l-2 border-slate-200 uppercase tracking-widest text-xs font-bold text-slate-400">
              <span className={`block mb-2 ${rqInfo.color.split(' ')[0].replace('from-', 'text-')}`}>"{rqInfo.quote}"</span>
            </div>
          </div>

          {/* Archetype Matrix */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${rqInfo.bgLight} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h2 className={`text-[clamp(3.5rem,5vw,5rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${rqInfo.color} z-10 relative drop-shadow-sm pb-1 uppercase text-center`}>
               {rqInfo.code}
             </h2>
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-slate-600 mt-4 z-10 whitespace-nowrap text-center">
                {rqInfo.archetype}
             </span>
          </div>
        </motion.div>

        {/* Axis Breakdowns */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col justify-center h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Target className={`w-4 h-4 text-sky-400`} />
                  Confidence Axis
                </h4>
                
                <div className="w-full flex justify-between text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  <span>Doubtful</span>
                  <span>Assured</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full bg-linear-to-r from-violet-400 to-sky-500`}
                    />
                </div>
                <p className="text-slate-500 mt-6 text-sm leading-relaxed">
                  This axis measures your baseline self-esteem, resistance to imposter syndrome, and inherent trust in your own competence when making decisions.
                </p>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col justify-center h-full hover:-translate-y-1 transition-transform duration-500">
                <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Shield className={`w-4 h-4 text-emerald-400`} />
                  Stress Tolerance Axis
                </h4>
                
                <div className="w-full flex justify-between text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
                  <span>Volatile</span>
                  <span>Grounded</span>
                </div>
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${scores.stressTolerance}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className={`h-full bg-linear-to-r from-rose-400 to-emerald-500`}
                    />
                </div>
                <p className="text-slate-500 mt-6 text-sm leading-relaxed">
                  This axis measures your emotional reactivity to unexpected challenges, chaotic environments, and severe pressure or criticism.
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
              {rqInfo.strengths?.map((item, idx) => (
                <li key={idx} className="flex gap-5 items-start">
                  <div className={`mt-2 w-2 h-2 rounded-full bg-linear-to-r ${rqInfo.color} shrink-0`} />
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
              {rqInfo.weaknesses?.map((item, idx) => (
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
