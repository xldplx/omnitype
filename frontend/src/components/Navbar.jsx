import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion as Motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Brain, Compass, Shield, Heart, Activity, Ghost } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isWikiOpen, setIsWikiOpen] = useState(false);
  const [isMbtiSubmenuOpen, setIsMbtiSubmenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = latest - previous;
    setScrolled(latest > 30);
    
    // Smooth threshold check for fluid scroll behavior
    if (latest > 120 && diff > 8) {
      setHidden(true);
      setIsWikiOpen(false);
      setIsMbtiSubmenuOpen(false);
    } else if (diff < -8 || latest <= 60) {
      setHidden(false);
    }
  });

  if (location.pathname === '/error' || location.pathname === '/coming-soon') return null;

  const mbtiTypes = [
    { code: "INTJ", name: "Architect" },
    { code: "INTP", name: "Logician" },
    { code: "ENTJ", name: "Commander" },
    { code: "ENTP", name: "Debater" },
    { code: "INFJ", name: "Advocate" },
    { code: "INFP", name: "Mediator" },
    { code: "ENFJ", name: "Protagonist" },
    { code: "ENFP", name: "Campaigner" },
    { code: "ISTJ", name: "Logistician" },
    { code: "ISFJ", name: "Defender" },
    { code: "ESTJ", name: "Executive" },
    { code: "ESFJ", name: "Consul" },
    { code: "ISTP", name: "Virtuoso" },
    { code: "ISFP", name: "Adventurer" },
    { code: "ESTP", name: "Entrepreneur" },
    { code: "ESFP", name: "Entertainer" }
  ];

  const topicItems = [
    { label: "The Enneagram", icon: Compass, to: "/coming-soon" },
    { label: "Moral Alignment", icon: Shield, to: "/coming-soon" },
    { label: "Love Languages", icon: Heart, to: "/coming-soon" },
    { label: "Neurodiversity", icon: Activity, to: "/coming-soon" },
    { label: "The Shadow Self", icon: Ghost, to: "/coming-soon" }
  ];

  return (
    <div className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none">
      <Motion.nav 
        variants={{
          visible: { y: 0, opacity: 1, scale: 1 },
          hidden: { y: -100, opacity: 0, scale: 0.95 }
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.5 }}
        className={`pointer-events-auto flex items-center justify-center transition-all duration-500 rounded-full px-6 py-2.5 border ${
          scrolled 
            ? 'bg-white/45 backdrop-blur-2xl border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_10px_35px_rgba(0,0,0,0.07)]' 
            : 'bg-white/35 backdrop-blur-xl border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_8px_25px_rgba(0,0,0,0.05)]'
        }`}
        style={{ WebkitBackdropFilter: 'blur(20px) saturate(180%)', backdropFilter: 'blur(20px) saturate(180%)' }}
      >
        {/* Navigation Links */}
        <div className="flex gap-2 sm:gap-6 items-center">
          <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
          
          {/* Wiki Multi-Level Nested Dropdown Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setIsWikiOpen(true)}
            onMouseLeave={() => {
              setIsWikiOpen(false);
              setIsMbtiSubmenuOpen(false);
            }}
          >
            <NavLink to="/wiki" current={location.pathname.startsWith("/wiki")}>
              <span className="flex items-center gap-1.5 font-semibold">
                Wiki
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${isWikiOpen ? 'rotate-180' : ''}`} />
              </span>
            </NavLink>

            {/* Level 1 Dropdown */}
            <AnimatePresence>
              {isWikiOpen && (
                <Motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ WebkitBackdropFilter: 'blur(24px) saturate(180%)', backdropFilter: 'blur(24px) saturate(180%)' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2.5 w-[calc(100vw-2.5rem)] sm:w-64 max-w-xs bg-white/65 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_20px_50px_rgba(0,0,0,0.12)] p-2 pointer-events-auto z-50 flex flex-col gap-1"
                >
                  {/* Nested Submenu Trigger Item */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsMbtiSubmenuOpen(true)}
                    onMouseLeave={() => setIsMbtiSubmenuOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsMbtiSubmenuOpen(!isMbtiSubmenuOpen)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-white/60 text-xs font-bold text-slate-800 transition group cursor-pointer border border-transparent hover:border-white/50"
                    >
                      <div className="flex items-center gap-2.5">
                        <Brain className="w-4 h-4 text-indigo-500" />
                        <span>16 Personality Types</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform duration-300 ${isMbtiSubmenuOpen ? 'rotate-90 sm:rotate-0' : ''}`} />
                    </button>

                    {/* Level 2 Sub-Dropdown */}
                    <AnimatePresence>
                      {isMbtiSubmenuOpen && (
                        <Motion.div
                          initial={{ opacity: 0, y: -5, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          style={{ WebkitBackdropFilter: 'blur(24px) saturate(180%)', backdropFilter: 'blur(24px) saturate(180%)' }}
                          className="relative sm:absolute left-0 sm:left-full top-0 mt-2 sm:mt-0 sm:ml-2 w-full sm:w-64 bg-white/65 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_20px_50px_rgba(0,0,0,0.12)] p-3 grid grid-cols-2 gap-1.5 pointer-events-auto z-50 max-h-[60vh] overflow-y-auto"
                        >
                          {mbtiTypes.map((t) => (
                            <Link
                              key={t.code}
                              to="/coming-soon"
                              onClick={() => {
                                setIsWikiOpen(false);
                                setIsMbtiSubmenuOpen(false);
                              }}
                              className="px-2.5 py-2 rounded-xl bg-white/40 hover:bg-indigo-600 hover:text-white border border-white/60 shadow-2xs backdrop-blur-md transition-all duration-200 text-center flex flex-col group cursor-pointer"
                            >
                              <span className="text-xs font-black text-slate-800 group-hover:text-white">{t.code}</span>
                              <span className="text-[0.6rem] text-slate-400 group-hover:text-indigo-100 font-medium truncate">{t.name}</span>
                            </Link>
                          ))}
                        </Motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="h-px bg-slate-200/60 my-1" />

                  {/* Standard Category Topic Links */}
                  {topicItems.map((topic, idx) => {
                    const IconComp = topic.icon;
                    return (
                      <Link
                        key={idx}
                        to={topic.to}
                        onClick={() => setIsWikiOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-white/60 text-xs font-bold text-slate-700 transition group border border-transparent hover:border-white/50"
                      >
                        <IconComp className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        <span className="group-hover:text-slate-900">{topic.label}</span>
                      </Link>
                    );
                  })}
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Motion.nav>
    </div>
  );
}

function NavLink({ to, children, current }) {
  return (
    <Link 
      to={to} 
      className={`relative inline-flex items-center px-4 py-2 text-[0.95rem] tracking-wide transition-colors duration-300 font-medium ${
        current 
          ? 'text-indigo-600 font-bold' 
          : 'text-slate-500 hover:text-slate-900'
      }`}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {current && (
          <Motion.div
            layoutId="nav-pill"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="absolute inset-0 bg-indigo-50/70 backdrop-blur-md rounded-full z-0 border border-indigo-100/50"
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
