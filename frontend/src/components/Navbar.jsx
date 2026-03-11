import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Hexagon } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setScrolled(latest > 50);
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div className="fixed top-6 md:top-8 left-0 right-0 z-50 flex justify-center w-full px-4 md:px-8 pointer-events-none">
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
            ? 'bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full px-6 py-3' 
            : 'bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] px-6 py-3 rounded-full'
        }`}
      >
        {/* Navigation Links */}
        <div className="flex gap-2 sm:gap-6 items-center">
          <NavLink to="/" current={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/about" current={location.pathname === "/about"}>About</NavLink>
          <NavLink to="/contact" current={location.pathname === "/contact"}>Contact</NavLink>
        </div>
      </motion.nav>
    </div>
  );
}

function NavLink({ to, children, current }) {
  return (
    <Link 
      to={to} 
      className={`relative px-4 py-2 text-[0.95rem] tracking-wide transition-colors duration-300 font-medium ${
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
