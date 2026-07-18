import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isWikiDropdownOpen, setIsWikiDropdownOpen] = useState(false);

  // Load avatar on mount and location changes (to sync updates)
  useEffect(() => {
    const saved = localStorage.getItem('omnitype_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.avatarUrl) {
          setAvatarUrl(parsed.avatarUrl);
        } else {
          setAvatarUrl("");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [location.pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setScrolled(latest > 50);
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const wikiLinks = [
    { label: "Personality Types", to: "/wiki#personality" },
    { label: "Moral Alignments", to: "/wiki#alignment" },
    { label: "Enneagram Centers", to: "/wiki#enneagram" },
    { label: "Relational Psychology", to: "/wiki#relational" },
    { label: "Stress & Neurodiversity", to: "/wiki#stress" },
    { label: "Shadow Self", to: "/wiki#shadow" }
  ];

  return (
    <div className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none">
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -120, opacity: 0 }
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className={`pointer-events-auto flex items-center justify-center transition-all duration-700 ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full px-5 py-2' 
            : 'bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] px-5 py-2 rounded-full'
        }`}
      >
        {/* Navigation Links */}
        <div className="flex gap-1 sm:gap-4 items-center">
          <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
          
          {/* Wiki Dropdown Link */}
          <div 
            className="relative"
            onMouseEnter={() => setIsWikiDropdownOpen(true)}
            onMouseLeave={() => setIsWikiDropdownOpen(false)}
          >
            <NavLink to="/wiki" current={location.pathname === "/wiki"}>
              <span className="flex items-center gap-1">
                Wiki
                <ChevronDown className="w-3.5 h-3.5 opacity-60 animate-none" />
              </span>
            </NavLink>
            <AnimatePresence>
              {isWikiDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-2 flex flex-col pointer-events-auto z-50"
                >
                  {wikiLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.to}
                      className="px-4 py-2 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

function NavLink({ to, children, current }) {
  return (
    <Link 
      to={to} 
      className={`relative inline-flex items-center px-4 py-2 text-[0.9rem] tracking-wide transition-colors duration-300 font-medium ${
        current 
          ? 'text-indigo-600' 
          : 'text-slate-500 hover:text-slate-900'
      }`}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {current && (
          <motion.div
            layoutId="nav-pill"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
            className="absolute inset-0 bg-indigo-50 rounded-full z-0 border border-indigo-100/50"
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
