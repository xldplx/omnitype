import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Compass, Brain, Shield, Heart, Activity, ArrowRight, Ghost } from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';

export default function Wiki() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const mbtiTypes = Object.entries(typeDescriptions).map(([key, value]) => ({
    code: key,
    ...value
  }));

  const filteredTypes = mbtiTypes.filter(t => 
    t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.desc && t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = [
    {
      id: 'personality',
      title: "16 Personality Archetypes",
      icon: <Brain className="w-6 h-6 text-indigo-500" />,
      desc: "Detailed cognitive classifications explaining how you gather details, process logic, and make life choices.",
      link: "/coming-soon"
    },
    {
      id: 'enneagram',
      title: "Enneagram Motivations",
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      desc: "Explores the 9 core subconscious motivations, split into Gut (Instinct), Heart (Feeling), and Head (Thinking) centers.",
      link: "/coming-soon"
    },
    {
      id: 'alignment',
      title: "Moral Alignments",
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      desc: "Explains your moral framework and rules of conduct: Lawful, Chaotic, Good, Neutral, or Evil.",
      link: "/coming-soon"
    },
    {
      id: 'relational',
      title: "Relational Psychology",
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      desc: "Deep-dives into Love Languages, Attachment Styles, and interpersonal communication dynamics.",
      link: "/coming-soon"
    },
    {
      id: 'neurodiversity',
      title: "Neurodiversity & Health",
      icon: <Activity className="w-6 h-6 text-cyan-500" />,
      desc: "Mapping ADHD rhythms, Sensory Sensitivity (HSP), Executive Function, and Nervous System Burnout.",
      link: "/coming-soon"
    },
    {
      id: 'shadow',
      title: "The Shadow Self",
      icon: <Ghost className="w-6 h-6 text-purple-500" />,
      desc: "Exploring the Dark Triad, Defense Mechanisms, and repressed subconscious archetypes.",
      link: "/coming-soon"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 pt-28 md:pt-36 px-4 sm:px-8 md:px-12 relative text-slate-800 font-sans selection:bg-indigo-100">
      
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Wiki Header */}
        <div className="space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-none">
            OmniType Wiki<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-xl md:text-2xl font-medium max-w-3xl leading-relaxed text-balance">
            The centralized knowledge base for psychological frameworks, cognitive archetypes, and relational models.
          </p>
        </div>

        {/* Bridge Categories Section (Fully Clickable Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={cat.link}
              className="bg-white/80 backdrop-blur-xl border border-white/90 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-indigo-200/80 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 mb-6 shadow-xs group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">{cat.title}</h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-6">{cat.desc}</p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-indigo-600 group-hover:text-indigo-700 transition-colors mt-auto">
                <span>Explore Chapter</span>
                <ArrowRight className="w-4 h-4 text-indigo-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* MBTI Section Index Bridge (Fully Clickable Archetype Cards) */}
        <div id="mbti-directory" className="space-y-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-slate-200/80 pt-12">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">16 Archetypes Directory</h2>
              <p className="text-slate-500 text-base md:text-lg font-medium">Browse comprehensive profiles for all 16 cognitive personality styles.</p>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search type (e.g. INTP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-full text-sm font-bold text-slate-800 shadow-xs transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredTypes.map((typeObj) => (
              <Motion.div
                key={typeObj.code} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  to="/coming-soon"
                  className="block h-full bg-white/80 backdrop-blur-xl border border-white/90 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-indigo-200/80 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{typeObj.code}</span>
                      <span className="text-xs font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full border border-indigo-100">
                        {typeObj.title}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium line-clamp-3">
                      {typeObj.desc}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {typeObj.mythologicalArchetype || "The Archetype"}
                    </span>

                    <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-indigo-600 group-hover:text-indigo-700 transition-colors">
                      <span>View Chapter</span>
                      <ArrowRight className="w-4 h-4 text-indigo-500" />
                    </div>
                  </div>
                </Link>
              </Motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
