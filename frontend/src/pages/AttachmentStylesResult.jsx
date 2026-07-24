import { useEffect, useMemo } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ChevronLeft, Shield, Heart, Zap, AlertTriangle, Users, Briefcase, Target, TrendingUp, MessageCircle, Swords } from 'lucide-react';
import { attachmentStylesTypes } from '../utils/attachmentStylesLogic';

export default function AttachmentStylesResult() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const resultData = useMemo(() => {
    let stateData = location.state?.resultData;
    if (!stateData && type) {
      let foundTypeNum = null;
      for (const [num, obj] of Object.entries(attachmentStylesTypes)) {
        if (obj.id === type) {
          foundTypeNum = parseInt(num);
          break;
        }
      }

      if (foundTypeNum) {
        const breakdown = {};
        for (let i = 1; i <= 4; i++) {
          if (i === foundTypeNum) breakdown[i] = 100;
          else breakdown[i] = ((i * 25) % 50) + 15;
        }

        stateData = {
          type: foundTypeNum,
          fullTitle: attachmentStylesTypes[foundTypeNum].shortName,
          info: attachmentStylesTypes[foundTypeNum],
          breakdown
        };
      }
    }
    return stateData;
  }, [location.state, type]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (resultData) {
      localStorage.setItem('omnitype_attachment_styles', JSON.stringify(resultData));
    }
  }, [resultData]);

  if (!resultData) {
    return <Navigate to="/test/attachment-styles" replace />;
  }

  const { info, breakdown } = resultData;

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
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-amber-200">
      
      {/* Massive Editorial Background Typography */}
      <Motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-20 left-0 right-0 h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-black text-[18vw] tracking-tighter leading-none text-slate-800 text-center uppercase whitespace-pre-wrap">
          {info.shortName.replace('-', '\n')}
        </span>
      </Motion.div>

      {/* Decorative Modern Background Gradients */}
      <div className={`fixed top-[-10vh] left-[-10vw] w-[50vw] h-[50vw] ${info.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />
      <div className={`fixed bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] ${info.bgLight} rounded-full blur-[120px] pointer-events-none opacity-60 z-0`} />

      <Motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-32 pb-32 relative z-10"
      >
        
        {/* Superior Navigation */}
        <Motion.div variants={itemVariants} className="flex justify-between items-center mb-16 md:mb-24">
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 font-semibold text-sm uppercase tracking-widest hover:text-slate-900 transition-colors group cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full ${info.bgLight} border ${info.borderLight} flex items-center justify-center group-hover:bg-white transition-colors`}>
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </div>
            <span>Home</span>
          </button>
        </Motion.div>

        {/* Hero Dashboard Section */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Main Title Card */}
          <div className="lg:col-span-8 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-linear-to-b ${info.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black mb-6 text-slate-900 tracking-tight leading-none bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 pb-2">
              {info.name}
            </h1>
            
            <p className="text-lg md:text-[1.35rem] text-slate-500 max-w-4xl leading-relaxed tracking-wide font-medium mt-2">
              {info.description}
            </p>
          </div>

          {/* Type Badge Card */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${info.bgLight} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700`} />
             
             <h2 className={`text-[clamp(2.5rem,6vw,5rem)] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b ${info.color} z-10 relative drop-shadow-sm pb-1 whitespace-nowrap`}>
               {info.shortName.length > 8 ? info.shortName.split('-')[0] : info.shortName}
             </h2>
          </div>
        </Motion.div>

        {/* Relational Spectrum Breakdown */}
        <Motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14 mb-8">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-100 pb-6">
              <TrendingUp className="w-5 h-5 text-slate-400" />
              <h4 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">Relational Spectrum Allocation</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(attachmentStylesTypes).map(([numStr, typeObj]) => {
                  const num = parseInt(numStr);
                  const score = breakdown[num] || 0;
                  const isPrimary = num === resultData.type;

                  return (
                      <div key={num} className={`flex flex-col justify-between p-6 rounded-3xl border transition-all duration-500 ${isPrimary ? 'bg-white border-slate-300 shadow-md scale-105' : 'bg-slate-50/50 border-slate-100 opacity-70'}`}>
                          <div>
                              <div className="flex justify-between items-start mb-4">
                                  <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Style {num}</span>
                                  {isPrimary && <span className={`text-[0.65rem] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-linear-to-r ${typeObj.color} text-white`}>Primary</span>}
                              </div>
                              <h5 className="font-bold text-slate-800 text-lg mb-1">{typeObj.name}</h5>
                          </div>

                          <div className="mt-8">
                              <div className="flex justify-between items-center mb-2">
                                  <span className="text-xs font-semibold text-slate-400">Match</span>
                                  <span className="text-lg font-black text-slate-800">{score}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <Motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${score}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                      className={`h-full bg-linear-to-r ${typeObj.color}`} 
                                  />
                              </div>
                          </div>
                      </div>
                  );
              })}
          </div>
        </Motion.div>

        {/* Core Motives & Fears Grid */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14 hover:-translate-y-1 transition-transform">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <Target className="w-4 h-4 text-emerald-500" />
              Core Relational Desire
            </h4>
            <p className="text-slate-800 font-bold leading-relaxed text-2xl tracking-tight">{info.coreDesire}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14 hover:-translate-y-1 transition-transform">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Hidden Attachment Fear
            </h4>
            <p className="text-slate-800 font-bold leading-relaxed text-2xl tracking-tight">{info.coreFear}</p>
          </div>
        </Motion.div>

        {/* Attachment Triggers & Dynamic Under Stress */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              Relational Triggers
            </h4>
            <p className="text-slate-700 leading-relaxed text-lg font-medium">{info.triggers}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <Swords className="w-4 h-4 text-purple-500" />
              Conflict Behavior
            </h4>
            <p className="text-slate-700 leading-relaxed text-lg font-medium">{info.conflictStyle}</p>
          </div>
        </Motion.div>

        {/* Growth & Healing Path */}
        <Motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 shadow-[0_20px_50px_rgb(0,0,0,0.2)] rounded-[2.5rem] p-10 md:p-16 mb-8 text-white relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-96 h-96 bg-linear-to-bl ${info.color} rounded-full blur-[100px] opacity-20 pointer-events-none`} />
            
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-8 border-b border-white/10 pb-6 relative z-10">
              <Shield className="w-5 h-5 text-indigo-400" />
              Path to Secure Attachment
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <div>
                <h5 className="text-2xl font-bold mb-4 tracking-tight">Healing Focus</h5>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">{info.growthStrategy}</p>
              </div>

              <div>
                <h5 className="text-2xl font-bold mb-4 tracking-tight">Ideal Partner Dynamic</h5>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">{info.idealPartner}</p>
              </div>
            </div>
        </Motion.div>

        {/* Professional & Social Communication Styles */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              Workplace Dynamic
            </h4>
            <p className="text-slate-700 leading-relaxed text-lg font-medium">{info.workplace}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              Communication Needs
            </h4>
            <p className="text-slate-700 leading-relaxed text-lg font-medium">{info.communication}</p>
          </div>
        </Motion.div>

        {/* High-Contrast Pros & Cons */}
        <Motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <Shield className="w-4 h-4 text-emerald-500" />
              Relational Strengths
            </h4>
            <ul className="space-y-4">
              {info.pros?.map((item) => (
                <li key={item} className="flex gap-4 items-start bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  <p className="text-slate-700 font-semibold text-base leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-12">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Relational Vulnerabilities
            </h4>
            <ul className="space-y-4">
              {info.cons?.map((item) => (
                <li key={item} className="flex gap-4 items-start bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                  <p className="text-slate-700 font-semibold text-base leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </Motion.div>

        {/* Compatible & Friction Attachment Styles */}
        <Motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-10 md:p-14">
            <h4 className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase text-slate-400 mb-8 border-b border-slate-100 pb-4">
              <Users className="w-5 h-5 text-indigo-500" />
              Relational Dynamics with Other Attachment Styles
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {info.compatibility?.map((comp) => (
                <div key={comp.style} className="bg-slate-50/80 border border-slate-100 rounded-3xl p-6 hover:bg-white hover:shadow-sm transition">
                  <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase block mb-2">{comp.style}</span>
                  <h6 className="font-bold text-slate-900 text-lg mb-2">{comp.dynamic}</h6>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{comp.note}</p>
                </div>
              ))}
            </div>
        </Motion.div>

      </Motion.div>
    </div>
  );
}
