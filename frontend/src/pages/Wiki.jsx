import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Compass, Info, ArrowRight, Brain, Shield, Heart } from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';

export default function Wiki() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const mbtiTypes = Object.entries(typeDescriptions).map(([key, value]) => ({
    code: key,
    ...value
  }));

  const filteredTypes = mbtiTypes.filter(t => 
    t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    {
      title: "16 Personality Archetypes",
      icon: <Brain className="w-5 h-5 text-indigo-500" />,
      desc: "Detailed cognitive classifications explaining how you gather details and make decisions."
    },
    {
      title: "Moral Alignments",
      icon: <Shield className="w-5 h-5 text-emerald-500" />,
      desc: "Explains your moral framework and rules of conduct: lawful, chaotic, good, or evil."
    },
    {
      title: "Enneagram Centers",
      icon: <Compass className="w-5 h-5 text-amber-500" />,
      desc: "Explores the 9 core motivations, splits into Gut (Instinct), Heart (Feeling), and Head (Thinking) centers."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 pt-32 px-6 relative text-slate-800 font-sans selection:bg-indigo-100">
      
      {/* Background gradients */}
      <div className="fixed top-[-10vh] right-[-10vw] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] left-[-10vw] w-[40vw] h-[40vw] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-650 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full w-max">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Encyclopedia</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">OmniType Wiki</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">Explore definitions, core structures, and metrics for all psychological profiles.</p>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-2xs hover:shadow-xs transition">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 mb-4">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-1.5">{cat.title}</h3>
              <p className="text-slate-450 text-[11px] leading-relaxed font-medium">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* MBTI Section Index */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-slate-200/60 pt-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Archetypes Directory</h2>
              <p className="text-slate-450 text-xs">Browse details for the 16 core personality styles.</p>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search type (e.g. INTP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-xl text-xs font-bold text-slate-800 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTypes.map((typeObj) => (
              <div 
                key={typeObj.code} 
                className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-2xs hover:border-slate-200 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-slate-850 tracking-tighter">{typeObj.code}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest bg-${typeObj.colors[0]}-50 text-${typeObj.colors[0]}-600 px-3 py-1 rounded-full border border-slate-100`}>
                      {typeObj.title}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3">
                    {typeObj.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center">
                  <span className="text-[10px] font-bold text-slate-400 hover:text-indigo-650 uppercase tracking-widest inline-flex items-center gap-1.5 transition">
                    <span>{typeObj.mythologicalArchetype || "The Archetype"}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
