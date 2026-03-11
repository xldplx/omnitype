import { useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Activity, Target, Zap, Heart, Compass, Layout, Users, Briefcase, Sparkles, Gamepad2, AlertTriangle, XCircle, CloudLightning, EyeOff, Crown } from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';

export default function MbtiResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const upperType = type?.toUpperCase();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const typeInfo = typeDescriptions[upperType];

  if (!typeInfo) {
    return <Navigate to="/test/mbti" replace />;
  }

  // Simulated accurate percentages for the visually striking cognitive bars
  const getSimulatedScores = (typeStr) => {
    return {
      EI: typeStr.includes('E') ? 78 : 22,
      SN: typeStr.includes('N') ? 85 : 15,
      TF: typeStr.includes('T') ? 61 : 39,
      JP: typeStr.includes('J') ? 90 : 10,
    };
  };

  const percentages = getSimulatedScores(upperType);

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
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-indigo-200">
      
      {/* Massive Editorial Background Typography */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[35vw] tracking-tighter leading-none text-slate-800">
          {upperType}
        </span>
      </motion.div>

      {/* Decorative Modern Background Gradients */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-${typeInfo.colors[0]}-100 rounded-full blur-[120px] pointer-events-none opacity-50 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] bg-${typeInfo.colors[1]}-100 rounded-full blur-[120px] pointer-events-none opacity-50 z-0`} />

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
            className="flex items-center gap-2 text-slate-400 font-semibold text-sm uppercase tracking-widest hover:text-slate-900 transition-colors group"
          >
            <div className={`w-8 h-8 rounded-full bg-${typeInfo.colors[0]}-50 border border-${typeInfo.colors[0]}-100 flex items-center justify-center group-hover:bg-${typeInfo.colors[0]}-100 transition-colors`}>
              <ChevronLeft className={`w-4 h-4 text-${typeInfo.colors[0]}-600`} />
            </div>
            <span>Home</span>
          </button>
        </motion.div>

        {/* Hero Dashboard Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Title Card */}
          <div className="lg:col-span-8 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b from-${typeInfo.colors[0]}-400 to-${typeInfo.colors[1]}-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h3 className={`text-xs font-bold tracking-[0.4em] uppercase mb-6 text-${typeInfo.colors[0]}-500 flex items-center gap-3`}>
              <Activity className="w-4 h-4" />
              Primary Archetype
            </h3>
            
            <h1 className={`text-5xl md:text-7xl lg:text-[6rem] font-bold mb-6 text-slate-900 tracking-tight leading-none text-transparent bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2`}>
              {typeInfo.title}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-normal mt-2">
              {typeInfo.desc}
            </p>
          </div>

          {/* Type Badge Card */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-${typeInfo.colors[1]}-200/40 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h2 className={`text-[clamp(4.5rem,10vw,8rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-${typeInfo.colors[0]}-500 to-${typeInfo.colors[1]}-600 z-10 relative drop-shadow-sm pb-1 whitespace-nowrap`}>
               {upperType}
             </h2>
             <span className="text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-slate-600 mt-4 z-10 whitespace-nowrap">Classification</span>
          </div>
        </motion.div>

        {/* Cognitive Architecture Layer */}
        <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 mb-8 relative">
          <div className="flex items-center gap-3 mb-16">
            <Layout className="w-5 h-5 text-slate-400" />
            <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">Cognitive Architecture</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12">
            <ResultBar left="Extraverted" right="Introverted" leftCode="E" rightCode="I" leftValue={percentages.EI} rightValue={100 - percentages.EI} color={`bg-${typeInfo.colors[0]}-500`} />
            <ResultBar left="Intuitive" right="Observant" leftCode="N" rightCode="S" leftValue={100 - percentages.SN} rightValue={percentages.SN} color={`bg-${typeInfo.colors[1]}-500`} />
            <ResultBar left="Thinking" right="Feeling" leftCode="T" rightCode="F" leftValue={percentages.TF} rightValue={100 - percentages.TF} color={`bg-${typeInfo.colors[0]}-400`} />
            <ResultBar left="Judging" right="Prospecting" leftCode="J" rightCode="P" leftValue={percentages.JP} rightValue={100 - percentages.JP} color={`bg-${typeInfo.colors[1]}-400`} />
          </div>
        </motion.div>

        {/* Dynamic Dual Grid for Strengths/Weaknesses */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 md:p-14 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
            <div className="flex items-center gap-5 mb-10">
              <div className={`w-14 h-14 rounded-2xl bg-${typeInfo.colors[0]}-50 flex items-center justify-center border border-${typeInfo.colors[0]}-100`}>
                <Target className={`w-6 h-6 text-${typeInfo.colors[0]}-500`} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Core Strengths</h3>
            </div>
            <ul className="space-y-6">
              {typeInfo.strengths.map((item, i) => (
                <li key={i} className="flex gap-5 text-slate-500 font-medium text-lg leading-relaxed items-start">
                  <div className={`w-2 h-2 rounded-full bg-${typeInfo.colors[0]}-400 mt-2.5 shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.2)]`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 md:p-14 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
             <div className="flex items-center gap-5 mb-10">
              <div className={`w-14 h-14 rounded-2xl bg-${typeInfo.colors[1]}-50 flex items-center justify-center border border-${typeInfo.colors[1]}-100`}>
                <Zap className={`w-6 h-6 text-${typeInfo.colors[1]}-500`} />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Development Areas</h3>
            </div>
            <ul className="space-y-6">
              {typeInfo.weaknesses.map((item, i) => (
                <li key={i} className="flex gap-5 text-slate-500 font-medium text-lg leading-relaxed items-start">
                  <div className={`w-2 h-2 rounded-full bg-${typeInfo.colors[1]}-400 mt-2.5 shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.2)]`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Tricolumn Deep Dive Dashboard */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
            <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
              <Compass className={`w-4 h-4 text-${typeInfo.colors[0]}-400`} />
              Habits & Quirks
            </h4>
            <p className="text-slate-600 font-medium leading-relaxed text-lg">{typeInfo.habits}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
            <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
              <Target className={`w-4 h-4 text-${typeInfo.colors[1]}-400`} />
              Ideal Careers
            </h4>
            <div className="flex flex-col gap-3 mt-auto">
              {typeInfo.careers.map((career, i) => (
                <div key={i} className={`font-semibold bg-${typeInfo.colors[i % 2]}-50/50 text-${typeInfo.colors[i % 2]}-700 px-5 py-4 rounded-2xl border border-${typeInfo.colors[i % 2]}-100/50 text-[0.9rem] flex items-center justify-between`}>
                  {career}
                  <div className={`w-1.5 h-1.5 rounded-full bg-${typeInfo.colors[i % 2]}-400`} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 flex flex-col h-full hover:-translate-y-1 transition-transform duration-500">
            <h4 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-8 flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="flex items-center gap-3"><Heart className="w-4 h-4 text-emerald-400" /> Synergy</span>
              <span className="flex items-center gap-3"><XCircle className="w-4 h-4 text-rose-400" /> Clash</span>
            </h4>
            
            <div className="flex flex-col gap-6 mt-auto">
              <div>
                <span className="text-xs font-bold tracking-widest text-emerald-500 uppercase mb-3 block">Optimal Match</span>
                <div className="flex items-center gap-3">
                  {typeInfo.compatibility.map((partner, i) => (
                    <div key={i} className={`flex-1 flex flex-col items-center justify-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm`}>
                      <div className={`w-12 h-12 rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm tracking-widest border border-white shadow-inner mb-2`}>
                        {partner}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold tracking-widest text-rose-400 uppercase mb-3 block">Not Optimal Match</span>
                <div className="flex items-center gap-3">
                  {typeInfo.incompatible?.map((partner, i) => (
                    <div key={i} className={`flex-1 flex flex-col items-center justify-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm`}>
                      <div className={`w-12 h-12 rounded-full bg-linear-to-br from-rose-100 to-rose-50 flex items-center justify-center text-rose-600 font-bold text-sm tracking-widest border border-white shadow-inner mb-2`}>
                        {partner}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Comprehensive Deep Dive Series */}
        <motion.div variants={itemVariants} className="mt-16 flex flex-col gap-8 w-full">
          <div className="flex items-center gap-6 mb-4">
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight whitespace-nowrap">In-Depth Analysis</h3>
            <div className="h-0.5 flex-1 bg-slate-200/60 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
            {/* Core Values & Genres */}
            <div className={`p-10 rounded-[2.5rem] bg-linear-to-b from-${typeInfo.colors[0]}-50/50 to-white/50 border border-${typeInfo.colors[0]}-100 backdrop-blur-2xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300`}>
                <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-2xl bg-${typeInfo.colors[0]}-100 flex items-center justify-center`}>
                      <Heart className={`w-5 h-5 text-${typeInfo.colors[0]}-600`} />
                    </div>
                    <h3 className={`text-2xl font-bold text-slate-800 tracking-tight`}>Core Values</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    {typeInfo.coreValues?.map((value, idx) => (
                        <span key={idx} className={`px-5 py-2.5 rounded-full text-sm font-bold bg-white text-${typeInfo.colors[0]}-700 border border-${typeInfo.colors[0]}-200/60 shadow-xs tracking-wide`}>
                            {value}
                        </span>
                    ))}
                </div>
                
                <div className="mt-10 flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-${typeInfo.colors[1]}-100 flex items-center justify-center`}>
                      <Gamepad2 className={`w-5 h-5 text-${typeInfo.colors[1]}-600`} />
                    </div>
                    <h3 className={`text-2xl font-bold text-slate-800 tracking-tight`}>Favorite Genres</h3>
                </div>
                <p className="text-slate-600 font-medium text-lg leading-relaxed bg-white/60 p-5 rounded-2xl border border-white">
                    {typeInfo.favoriteGenres}
                </p>
            </div>

            {/* Fun Facts */}
            <div className={`p-10 rounded-[2.5rem] bg-linear-to-b from-${typeInfo.colors[1]}-50/50 to-white/50 border border-${typeInfo.colors[1]}-100 backdrop-blur-2xl shadow-[0_4px_25px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300`}>
                <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-2xl bg-${typeInfo.colors[1]}-100 flex items-center justify-center`}>
                      <Sparkles className={`w-5 h-5 text-${typeInfo.colors[1]}-600`} />
                    </div>
                    <h3 className={`text-2xl font-bold text-slate-800 tracking-tight`}>Fun Facts</h3>
                </div>
                <ul className="space-y-6">
                    {typeInfo.funFacts?.map((fact, idx) => (
                        <li key={idx} className="flex gap-4 text-slate-600 font-medium text-lg leading-relaxed items-start bg-white/60 p-5 rounded-2xl border border-white">
                            <span className={`text-${typeInfo.colors[1]}-400 mt-1 shrink-0`}>✦</span>
                            <span>{fact}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          <DeepDiveSection title="Romantic Relationships" icon={<Heart className="w-6 h-6 text-rose-500" />} content={typeInfo.romantic} color="rose" />
          <DeepDiveSection title="Friendships & Social Dynamics" icon={<Users className="w-6 h-6 text-indigo-500" />} content={typeInfo.friendships} color="indigo" />
          <DeepDiveSection title="Workplace Habits" icon={<Briefcase className="w-6 h-6 text-emerald-500" />} content={typeInfo.workplace} color="emerald" />
          <DeepDiveSection title="Under Severe Stress" icon={<AlertTriangle className="w-6 h-6 text-amber-500" />} content={typeInfo.stressResponse} color="amber" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 mb-4">
            <div className="bg-white/60 p-8 rounded-[2.5rem] border border-white shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
              <div className={`w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <CloudLightning className="w-8 h-8 text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 tracking-tight mb-3">Secret Dreams</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{typeInfo.secretDreams}</p>
            </div>
            
            <div className="bg-white/60 p-8 rounded-[2.5rem] border border-white shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
              <div className={`w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <EyeOff className="w-8 h-8 text-rose-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 tracking-tight mb-3">Hidden Fears</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{typeInfo.hiddenFears}</p>
            </div>
            
            <div className="bg-white/60 p-8 rounded-[2.5rem] border border-white shadow-[0_4px_25px_rgb(0,0,0,0.03)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
              <div className={`w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Crown className="w-8 h-8 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 tracking-tight mb-3">Mythic Archetype</h4>
              <h5 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-br from-amber-400 to-amber-600 mb-3 text-balance">{typeInfo.mythologicalArchetype}</h5>
            </div>
          </div>
        </motion.div>
          
      </motion.div>
    </div>
  );
}

function ResultBar({ left, right, leftCode, rightCode, leftValue, rightValue, color }) {
  const isLeftDominant = leftValue >= rightValue;
  
  // Calculate width from center (50%)
  // If left is dominant, fill from 50% to the left
  // If right is dominant, fill from 50% to the right
  const fillWidth = Math.abs(leftValue - 50) * 2; // e.g., 78% left means 28% from center, so width is 56% of half, or just 28% of total. Wait, if total is 100%, 78% means drawing a bar of width 28% starting from 22%. Faster: Just use left/right absolute positioning inside a 50% container.
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end text-lg tracking-wide mb-1">
        <span className={`font-bold ${isLeftDominant ? 'text-slate-800' : 'text-slate-400 opacity-60'}`}>{left} <span className="text-xs opacity-50 ml-1">{leftCode}</span></span>
        <span className={`font-bold ${!isLeftDominant ? 'text-slate-800' : 'text-slate-400 opacity-60'}`}><span className="text-xs opacity-50 mr-1">{rightCode}</span> {right}</span>
      </div>
      
      <div className="h-4 w-full bg-slate-100/80 rounded-full flex shadow-inner relative">
        {/* Center Divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 z-20 -translate-x-1/2 rounded-full" />
        
        {/* Left Half Container */}
        <div className="w-1/2 h-full relative rounded-l-full overflow-hidden flex justify-end">
          {isLeftDominant && (
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${(leftValue - 50) * 2}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full ${color} relative`}
            >
              <div className="absolute inset-0 bg-white/20 w-full" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)' , backgroundSize: '1rem 1rem'}} />
            </motion.div>
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
            >
              <div className="absolute inset-0 bg-white/20 w-full" style={{ backgroundImage: 'linear-gradient(-45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)' , backgroundSize: '1rem 1rem'}} />
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm font-black">
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

function DeepDiveSection({ title, icon, content, color }) {
  if (!content) return null;
  return (
    <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_4px_25px_rgb(0,0,0,0.03)] rounded-[2.5rem] p-10 md:p-14 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
      <div className={`absolute top-0 left-0 w-2 h-full bg-${color}-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="flex items-center gap-5 mb-8">
        <div className={`w-14 h-14 rounded-2xl bg-${color}-50 flex items-center justify-center border border-${color}-100`}>
          {icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">{title}</h3>
      </div>
      <p className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
