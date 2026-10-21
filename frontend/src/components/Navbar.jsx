import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion as Motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Brain, Compass, Shield, Heart, Activity, Ghost, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isWikiOpen, setIsWikiOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const wikiTriggerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [wikiPos, setWikiPos] = useState({ left: 0, top: 0 });

  // The panel sits outside the trigger, so the pointer has to cross a gap to
  // reach it — delay the close and cancel it if the panel is entered.
  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setIsWikiOpen(false), 160);
  };

  const openWiki = () => {
    cancelClose();
    // Measure before opening so the panel never flashes at the wrong spot
    const el = wikiTriggerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setWikiPos({ left: rect.left + rect.width / 2, top: rect.bottom + 14 });
    }
    setIsWikiOpen(true);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = latest - previous;
    setScrolled(latest > 30);

    // Smooth threshold check for fluid scroll behavior
    if (latest > 120 && diff > 8) {
      setHidden(true);
      setIsWikiOpen(false);
    } else if (diff < -8 || latest <= 60) {
      setHidden(false);
    }
  });

  // Close every transient menu whenever the route changes
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setIsMobileOpen(false);
    setIsWikiOpen(false);
  }

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // Track the Wiki trigger so the glass panel can be anchored to it.
  // The panel lives OUTSIDE the navbar on purpose: the navbar uses backdrop-filter,
  // which turns it into a "backdrop root" — a panel nested inside it would have
  // nothing behind it to blur.
  useEffect(() => {
    if (!isWikiOpen) return;

    const update = () => {
      const el = wikiTriggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setWikiPos({ left: rect.left + rect.width / 2, top: rect.bottom + 14 });
    };

    const frame = requestAnimationFrame(update);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [isWikiOpen]);

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
    { label: "The Enneagram", desc: "Nine personality patterns", icon: Compass, to: "/coming-soon" },
    { label: "Moral Alignment", desc: "Five ethical frameworks", icon: Shield, to: "/coming-soon" },
    { label: "Love Languages", desc: "How you give and receive love", icon: Heart, to: "/coming-soon" },
    { label: "Neurodiversity", desc: "How unique brains work", icon: Activity, to: "/coming-soon" },
    { label: "The Shadow Self", desc: "The darker traits we hide", icon: Ghost, to: "/coming-soon" }
  ];

  // Classic MBTI temperament groups — each group owns its own hover colour
  const MBTI_GROUP_STYLES = {
    NT: {
      label: 'Analysts',
      chip: 'bg-white/50 border-white/70 hover:border-transparent hover:from-indigo-600 hover:to-violet-600 hover:shadow-[0_10px_24px_rgba(79,70,229,0.35)]',
      legend: 'bg-indigo-500'
    },
    NF: {
      label: 'Diplomats',
      chip: 'bg-white/50 border-white/70 hover:border-transparent hover:from-emerald-600 hover:to-teal-600 hover:shadow-[0_10px_24px_rgba(5,150,105,0.35)]',
      legend: 'bg-emerald-500'
    },
    SJ: {
      label: 'Sentinels',
      chip: 'bg-white/50 border-white/70 hover:border-transparent hover:from-sky-600 hover:to-blue-600 hover:shadow-[0_10px_24px_rgba(2,132,199,0.35)]',
      legend: 'bg-sky-500'
    },
    SP: {
      label: 'Explorers',
      chip: 'bg-white/50 border-white/70 hover:border-transparent hover:from-amber-500 hover:to-yellow-500 hover:shadow-[0_10px_24px_rgba(245,158,11,0.35)]',
      legend: 'bg-amber-500'
    }
  };

  // MBTI temperament group: N + (T/F) for intuitive types, S + (J/P) for sensing types
  const getMbtiGroup = (code) => {
    if (code[1] === 'N') return code[2] === 'T' ? 'NT' : 'NF';
    return code[3] === 'J' ? 'SJ' : 'SP';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <Motion.header
        variants={{
          visible: { y: 0, opacity: 1, scale: 1 },
          hidden: { y: -100, opacity: 0, scale: 0.95 }
        }}
        initial="visible"
        animate={hidden && !isMobileOpen ? "hidden" : "visible"}
        transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.5 }}
        className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between gap-2 md:gap-6 transition-all duration-500 rounded-full px-3 md:px-4 py-3 md:py-3.5 backdrop-blur-2xl border ${
          scrolled || isMobileOpen
            ? 'border-slate-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_12px_40px_rgba(15,23,42,0.08)]'
            : 'border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_28px_rgba(15,23,42,0.05)]'
        }`}
        style={{
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          backdropFilter: 'blur(24px) saturate(200%)',
          backgroundColor: scrolled || isMobileOpen ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.38)',
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.42) 50%, rgba(224,231,255,0.34) 100%)'
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center px-1 md:px-2 shrink-0"
          aria-label="OmniType home"
        >
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-slate-900 leading-none">
            OmniType<span className="text-indigo-600">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" current={isActive("/")}>Home</NavLink>

          {/* Wiki trigger (panel is rendered outside the navbar, see above) */}
          <div
            ref={wikiTriggerRef}
            className="relative"
            onMouseEnter={openWiki}
            onMouseLeave={scheduleClose}
          >
            <NavLink to="/wiki" current={location.pathname.startsWith("/wiki")}>
              <span className="flex items-center gap-1.5">
                Wiki
                <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${isWikiOpen ? 'rotate-180' : ''}`} />
              </span>
            </NavLink>
          </div>

          <NavLink to="/about" current={isActive("/about")}>About</NavLink>
        </nav>

        {/* Desktop Account (placeholder) */}
        <button
          type="button"
          disabled
          title="Account system coming soon"
          className="hidden md:inline-flex items-center gap-2 shrink-0 pl-3.5 pr-2 py-2 rounded-full bg-white/50 border border-white/70 text-[0.7rem] font-extrabold uppercase tracking-widest text-slate-400 cursor-not-allowed"
        >
          Account
          <span className="w-7 h-7 rounded-full bg-white/60 border border-slate-200/60 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-slate-400" />
          </span>
        </button>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          className="md:hidden shrink-0 w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm"
        >
          {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </Motion.header>

      {/* Wiki mega panel — rendered OUTSIDE the filtered navbar so the page behind it actually blurs */}
      <AnimatePresence>
        {isWikiOpen && (
          <Motion.div
            key="wiki-panel"
            initial={{ opacity: 0, x: '-50%', y: -8, scale: 0.97 }}
            animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
            exit={{ opacity: 0, x: '-50%', y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed w-[740px] max-w-[calc(100vw-2.5rem)] rounded-[1.75rem] backdrop-blur-2xl border border-white/60 ring-1 ring-indigo-100/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-24px_48px_rgba(99,102,241,0.06),0_30px_80px_rgba(15,23,42,0.18)] overflow-hidden pointer-events-auto z-50"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            style={{
              left: wikiPos.left,
              top: wikiPos.top,
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              backdropFilter: 'blur(28px) saturate(200%)',
              backgroundColor: 'rgba(255,255,255,0.42)',
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.34) 48%, rgba(199,210,254,0.38) 100%)'
            }}
          >
            <div className="grid grid-cols-[1fr_260px] gap-5 p-5">
              {/* Left: 16 Personality Types grid */}
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between px-1">
                  <span className="font-display flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500">
                    <Brain className="w-3.5 h-3.5 text-indigo-500" />
                    16 Personality Types
                  </span>
                  <span className="font-display text-[0.6rem] font-medium text-slate-400">Jungian archetypes</span>
                </div>

                {/* Group legend */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-1">
                  {Object.entries(MBTI_GROUP_STYLES).map(([key, g]) => (
                    <span key={key} className="font-display flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-widest text-slate-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${g.legend}`} />
                      {g.label}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {mbtiTypes.map((t) => {
                    const group = MBTI_GROUP_STYLES[getMbtiGroup(t.code)] || MBTI_GROUP_STYLES.NT;
                    return (
                      <Link
                        key={t.code}
                        to={`/wiki/mbti/${t.code.toLowerCase()}`}
                        onClick={() => setIsWikiOpen(false)}
                        className={`group px-2 py-3 rounded-2xl bg-linear-to-br border ${group.chip} transition-all duration-300 text-center cursor-pointer`}
                      >
                        <span className="font-display block text-sm font-bold text-slate-800 group-hover:text-white">{t.code}</span>
                        <span className="block text-[0.6rem] text-slate-400 group-hover:text-white/75 font-medium truncate">{t.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right: Topic list */}
              <div className="flex flex-col gap-1 border-l border-slate-200/70 pl-5">
                <span className="font-display px-1 pb-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500">Topics</span>

                {topicItems.map((topic, idx) => {
                  const IconComp = topic.icon;
                  return (
                    <Link
                      key={idx}
                      to={topic.to}
                      onClick={() => setIsWikiOpen(false)}
                      className="group flex items-start gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-white/70 transition-colors duration-200"
                    >
                      <span className="w-7 h-7 shrink-0 rounded-lg bg-white/70 border border-slate-200/70 flex items-center justify-center group-hover:border-indigo-200 group-hover:bg-white">
                        <IconComp className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold text-slate-700 group-hover:text-slate-900 leading-tight">{topic.label}</span>
                        <span className="block text-[0.62rem] text-slate-400 leading-tight truncate">{topic.desc}</span>
                      </span>
                    </Link>
                  );
                })}

                <Link
                  to="/wiki"
                  onClick={() => setIsWikiOpen(false)}
                  className="font-display mt-auto flex items-center justify-between px-3 py-3 rounded-2xl bg-slate-900 text-white text-[0.62rem] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors duration-300"
                >
                  Browse the wiki
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {isMobileOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden pointer-events-auto fixed top-[5.25rem] left-3 right-3 z-50 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-3xl backdrop-blur-2xl border border-white/60 ring-1 ring-indigo-100/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-24px_48px_rgba(99,102,241,0.06),0_24px_60px_rgba(15,23,42,0.18)]"
            style={{
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              backdropFilter: 'blur(28px) saturate(200%)',
              backgroundColor: 'rgba(255,255,255,0.42)',
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.34) 48%, rgba(199,210,254,0.38) 100%)'
            }}
          >
            <div className="p-3">
              <MobileLink to="/" current={isActive("/")} onNavigate={() => setIsMobileOpen(false)}>Home</MobileLink>
              <MobileLink to="/wiki" current={location.pathname.startsWith("/wiki")} onNavigate={() => setIsMobileOpen(false)}>Wiki</MobileLink>
              <MobileLink to="/about" current={isActive("/about")} onNavigate={() => setIsMobileOpen(false)}>About</MobileLink>

              <div className="h-px bg-slate-100 my-2" />

              <p className="font-display px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">Topics</p>
              {topicItems.map((topic, idx) => {
                const IconComp = topic.icon;
                return (
                  <Link
                    key={idx}
                    to={topic.to}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-white/70 transition"
                  >
                    <IconComp className="w-4 h-4 text-slate-400" />
                    {topic.label}
                  </Link>
                );
              })}

              <div className="h-px bg-slate-100 my-2" />

              <p className="font-display px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">16 Personality Types</p>
              <div className="grid grid-cols-3 gap-1.5 p-1">
                {mbtiTypes.map((t) => {
                  const group = MBTI_GROUP_STYLES[getMbtiGroup(t.code)] || MBTI_GROUP_STYLES.NT;
                  return (
                    <Link
                      key={t.code}
                      to={`/wiki/mbti/${t.code.toLowerCase()}`}
                      onClick={() => setIsMobileOpen(false)}
                      className={`group px-2 py-2.5 rounded-xl bg-linear-to-br border ${group.chip} transition-all duration-300 text-center`}
                    >
                      <span className="font-display block text-xs font-bold text-slate-800 group-hover:text-white">{t.code}</span>
                      <span className="block text-[0.55rem] text-slate-400 group-hover:text-white/75 font-medium truncate">{t.name}</span>
                    </Link>
                  );
                })}
              </div>

              <button
                type="button"
                disabled
                title="Account system coming soon"
                className="font-display mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/50 border border-white/70 text-slate-400 text-xs font-bold uppercase tracking-widest cursor-not-allowed"
              >
                Account
                <User className="w-3.5 h-3.5" />
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ to, children, current }) {
  return (
    <Link
      to={to}
      className={`font-display relative inline-flex items-center px-4 py-2.5 text-[0.75rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 rounded-full ${
        current
          ? 'text-white'
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
            className="absolute inset-0 bg-slate-900 rounded-full z-0 shadow-[0_6px_18px_rgba(15,23,42,0.18)]"
          />
        )}
      </AnimatePresence>
    </Link>
  );
}

function MobileLink({ to, children, current, onNavigate }) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`font-display block px-3 py-3 rounded-2xl text-sm font-bold transition ${
        current
          ? 'bg-slate-900 text-white'
          : 'text-slate-700 hover:bg-white/70'
      }`}
    >
      {children}
    </Link>
  );
}
