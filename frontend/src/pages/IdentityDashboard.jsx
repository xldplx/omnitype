import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import { 
  Download, 
  Share2, 
  Hexagon, 
  Zap, 
  Shield, 
  Brain, 
  Heart, 
  Star,
  ArrowRight,
  Fingerprint,
  Sparkles,
  User,
  ShieldCheck,
  TrendingUp,
  Users,
  Info,
  ChevronRight,
  Lock,
  Layers,
  Palette
} from 'lucide-react';

const mockUserData = {
  name: "Alex River",
  age: 28,
  gender: "Non-Binary",
  mbti: "INFJ",
  memberSince: "April 2026",
  completedTests: 12,
  topTraits: ["Intuitive", "Strategic", "Hyper-Focused"],
  results: [
    { label: "Cognition", value: 85, icon: Brain, color: "from-indigo-500 to-purple-500", desc: "Measures your ability to process complex abstract patterns and logical structures." },
    { label: "Resilience", value: 65, icon: Shield, color: "from-sky-500 to-blue-600", desc: "Your psychological fortitude when facing external stress and unexpected chaos." },
    { label: "Empathy", value: 92, icon: Heart, color: "from-rose-400 to-pink-500", desc: "Depth of emotional resonance and understanding of others' internal states." },
    { label: "Drive", value: 78, icon: Zap, color: "from-amber-400 to-orange-500", desc: "Internal motivation level and capacity for sustained high-intensity output." },
    { label: "Social", value: 45, icon: User, color: "from-emerald-500 to-teal-600", desc: "External energy expression and comfort in large-scale interpersonal environments." },
    { label: "Complexity", value: 88, icon: Sparkles, color: "from-fuchsia-500 to-purple-600", desc: "Nuance of thought and the number of simultaneous perspectives you maintain." }
  ],
  majorTypes: {
    mbti: "INFJ",
    enneagram: "4w5",
    alignment: "Neutral Good",
    adhd: "Inattentive"
  },
  insights: [
    { title: "Strategic Vision", desc: "You naturally see long-term implications and hidden patterns.", icon: Hexagon },
    { title: "Deep Empathy", desc: "High capacity to absorb and understand complex emotional states.", icon: Heart },
    { title: "Systematic Focus", desc: "You excel at building mental models and frameworks.", icon: Brain }
  ]
};

const TraitBars = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm md:min-w-[280px]">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-lg bg-linear-to-br ${d.color} flex items-center justify-center text-white shadow-sm`}>
                <d.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{d.label}</span>
            </div>
            <span className="text-sm font-black text-slate-900">{d.value}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${d.value}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              className={`h-full bg-linear-to-r ${d.color} rounded-full`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const ShareableIDCard = React.forwardRef(({ user }, ref) => {
  return (
    <div className="relative group w-full flex justify-center">
      {/* Glow Effect */}
      <div 
        className="absolute -inset-1 bg-linear-to-b from-indigo-500/30 via-purple-500/20 to-pink-500/30 rounded-[2.5rem] blur-xl opacity-50 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" 
      />
      
      <div 
        ref={ref}
        className="relative w-full max-w-[360px] aspect-[4/5] bg-white rounded-[2rem] overflow-hidden p-8 flex flex-col text-slate-800 border border-slate-200/60 shadow-2xl"
      >
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-indigo-100/80 to-purple-50/80 blur-3xl rounded-full -mr-24 -mt-24 opacity-80" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-rose-50/80 to-orange-50/80 blur-3xl rounded-full -ml-16 -mb-16 opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-black tracking-tighter uppercase leading-none bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">OmniType</h3>
          </div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-slate-100">ID-2026</span>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center text-center relative z-10 mb-8">
           <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 p-1 shadow-xl mb-4">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-2 border-white">
                 <User className="w-8 h-8 text-indigo-200" />
              </div>
           </div>
           <h2 className="text-3xl font-black tracking-tight text-slate-900 drop-shadow-sm mb-1">{user.name}</h2>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{user.age} • {user.gender}</p>
        </div>

        {/* Big Metrics */}
        <div className="grid grid-cols-2 gap-3 w-full relative z-10 mb-8">
           <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Archetype</span>
              <span className="text-3xl font-black text-indigo-600 tracking-tighter">{user.majorTypes.mbti}</span>
           </div>
           <div className="bg-purple-50/50 border border-purple-100/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Motivation</span>
              <span className="text-3xl font-black text-purple-600 tracking-tighter">{user.majorTypes.enneagram}</span>
           </div>
        </div>

        {/* Top Traits */}
        <div className="flex flex-wrap justify-center gap-2 mb-auto relative z-10">
          {user.topTraits.map((trait, i) => (
            <span key={i} className="text-[9px] font-bold px-3 py-1.5 bg-white/80 backdrop-blur-md border border-slate-200/50 text-slate-600 rounded-full uppercase tracking-widest shadow-sm">
              {trait}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200/50 flex justify-between items-center relative z-10 w-full">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Verified Result</span>
          </div>
          <Sparkles className="w-4 h-4 text-indigo-300" />
        </div>
      </div>
    </div>
  );
});

export default function IdentityDashboard() {
  const [selectedTrait, setSelectedTrait] = useState(null);
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 1, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = 'omnitype-identity-card.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download card:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 selection:bg-indigo-100">
      
      {/* Background Decorative Blobs */}
      <div className="fixed top-[-10vh] right-[-10vw] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10vh] left-[-10vw] w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <div className="w-full pt-32 pb-16 px-6 md:px-12 flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight mb-8">
            Identity Map<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Your unique psychological fingerprint, aggregated from every assessment. 
            Visualize the hidden architecture of your mind.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Left Column: Stats & Map */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Basic Info Section */}
          <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col relative">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-8 tracking-tight flex items-center gap-3">
              Basic Information
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Name</span>
                <span className="text-2xl font-black text-slate-800">{mockUserData.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Age</span>
                <span className="text-2xl font-black text-slate-800">{mockUserData.age}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Gender</span>
                <span className="text-2xl font-black text-slate-800">{mockUserData.gender}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">MBTI</span>
                <span className="text-2xl font-black text-indigo-600">{mockUserData.mbti}</span>
              </div>
            </div>
          </div>

          {/* Main Visualizer */}
          <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="flex-1 relative z-10">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight flex items-center gap-3">
                Your Neural Map
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              </h2>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Based on your last 12 tests, your highest cognitive orientation is <span className="text-indigo-600 font-bold">Inwardly Complexity & Empathy</span>. 
                You show a rare balance of high intellectual drive and emotional sensitivity.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mockUserData.results.map((res, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTrait(res)}
                    className={`flex flex-col items-start p-4 rounded-3xl border transition-all duration-300 ${
                      selectedTrait?.label === res.label 
                        ? 'bg-white border-indigo-200 shadow-md ring-2 ring-indigo-50' 
                        : 'bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${res.color} flex items-center justify-center text-white shadow-sm mb-3`}>
                      <res.icon className="w-5 h-5" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{res.label}</p>
                    <p className="text-lg font-black text-slate-800">{res.value}%</p>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-col items-center bg-slate-50/50 rounded-[3rem] p-8 border border-slate-100/50 relative">
              <TraitBars data={mockUserData.results} />
              
              <AnimatePresence mode="wait">
                {selectedTrait && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[3rem] p-8 flex flex-col items-center text-center justify-center border border-indigo-100 shadow-2xl z-20"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${selectedTrait.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                       <selectedTrait.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-2">{selectedTrait.label}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">
                      {selectedTrait.desc}
                    </p>
                    <button 
                      onClick={() => setSelectedTrait(null)}
                      className="px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors"
                    >
                      Close Insight
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Personal Baseline</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Cognitive Highlights Section */}
          <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col relative">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-8 tracking-tight flex items-center gap-3">
              <Zap className="w-6 h-6 text-amber-500" />
              Cognitive Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {mockUserData.insights.map((insight, i) => (
                <div key={i} className="flex flex-col p-6 rounded-3xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                    <insight.icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-2">{insight.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{insight.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: ID Card & Sharing */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] sticky top-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Identity ID Card</h2>
              <div className="flex gap-2">
                 <button className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-colors">
                    <Download className="w-4 h-4" />
                 </button>
                 <button className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-colors">
                    <Share2 className="w-4 h-4" />
                 </button>
              </div>
            </div>

            <ShareableIDCard user={mockUserData} ref={cardRef} />

            <div className="mt-10 space-y-6">
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                Export your psychological stack as a verified digital asset. 
                Perfect for social bios, portfolios, or team-building sessions.
              </p>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadCard}
                disabled={isDownloading}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                )}
                {isDownloading ? 'Generating...' : 'Generate 4K Download'}
              </motion.button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
