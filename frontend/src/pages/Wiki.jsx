import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Brain, Sparkles, Palette,
  Compass, Layers, Flame, Heart, HeartHandshake, Shield, Ghost, UserMinus, Waves, Battery, Scale,
  Mountain, Quote, Check, Minus, CornerDownRight,
} from 'lucide-react';
import {
  wikiCategories, wikiFrameworks, getFramework, getEntry, searchWiki, totalEntries,
} from '../utils/wikiRegistry';

const ICONS = {
  Brain, Sparkles, Palette, Compass, Layers, Flame, Heart, HeartHandshake, Shield, Ghost,
  UserMinus, Waves, Battery, Scale, Mountain,
};

// Full class strings so Tailwind can see them.
const ACCENTS = {
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600' },
  fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', text: 'text-fuchsia-600' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600' },
  sky: { bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-600' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-600' },
  pink: { bg: 'bg-pink-50', border: 'border-pink-100', text: 'text-pink-600' },
  slate: { bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-600' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-600' },
  cyan: { bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-100', text: 'text-teal-600' },
};

const TONES = {
  good: { dot: 'bg-emerald-500', label: 'text-emerald-600' },
  bad: { dot: 'bg-rose-500', label: 'text-rose-500' },
  neutral: { dot: 'bg-indigo-500', label: 'text-indigo-600' },
};

function renderBold(str) {
  if (typeof str !== 'string') return str;
  return str.split(/\*\*([^*]+)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-slate-900 font-extrabold">{part}</strong> : part,
  );
}

const cardShell =
  'bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_4px_24px_rgba(15,23,42,0.03)]';

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function EntryCard({ entry, onOpen }) {
  const body = (
    <>
      <div className={`absolute top-0 left-0 w-full h-1.5 bg-linear-to-r ${entry.color} opacity-80`} />

      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          {entry.swatch && (
            <span
              className="w-9 h-9 rounded-xl border border-slate-200 shadow-inner shrink-0"
              style={{ backgroundColor: entry.swatch }}
              aria-hidden="true"
            />
          )}
          {entry.kicker && !entry.swatch && (
            <span className="text-[0.7rem] font-black uppercase tracking-widest text-slate-500 bg-slate-100 border border-slate-200/70 px-3 py-1.5 rounded-full truncate">
              {entry.kicker}
            </span>
          )}
        </div>
        {entry.group && (
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 text-right leading-tight shrink-0">
            {entry.group}
          </span>
        )}
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 tracking-tight leading-tight text-balance transition-colors duration-300">
        {entry.name}
      </h3>
      {entry.tagline && (
        <p className="text-xs font-bold text-slate-400 mt-1.5 leading-snug line-clamp-2">{entry.tagline}</p>
      )}

      <p className="text-slate-500 group-hover:text-slate-700 text-sm leading-relaxed font-medium mt-4 line-clamp-3 transition-colors duration-300">
        {entry.summary}
      </p>

      {entry.chips?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {entry.chips.slice(0, 4).map((c) => (
            <span key={c} className="font-mono text-[0.7rem] font-bold px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-600">
              {c}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-5 flex items-center justify-between">
        <span className="text-[0.7rem] font-extrabold uppercase tracking-widest text-slate-800 group-hover:text-indigo-600 transition-colors">
          {entry.href ? 'Open chapter' : 'Read entry'}
        </span>
        <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-50 border border-slate-200/60 group-hover:border-indigo-100 flex items-center justify-center transition-colors">
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all duration-200" />
        </span>
      </div>
    </>
  );

  const cls = `${cardShell} group relative overflow-hidden flex flex-col text-left p-6 sm:p-7 pt-8 rounded-[2rem] hover:border-indigo-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.07)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full w-full focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2`;

  if (entry.href) {
    return <Link to={entry.href} className={cls}>{body}</Link>;
  }
  return (
    <button type="button" onClick={() => onOpen(entry.framework, entry.id)} className={cls}>
      {body}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Entry drawer (reader)
// ---------------------------------------------------------------------------

function SectionBlock({ section, onNavigate }) {
  const label = section.title && (
    <h4 className="text-[0.7rem] font-black uppercase tracking-widest text-slate-400 mb-3">{section.title}</h4>
  );

  switch (section.kind) {
    case 'text':
      return (
        <section>
          {label}
          <p className="text-slate-700 text-base leading-relaxed font-medium">{renderBold(section.body)}</p>
        </section>
      );

    case 'quote':
      return (
        <blockquote className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200/70">
          <Quote className="w-5 h-5 text-indigo-300 mb-2" />
          <p className="text-slate-700 italic text-lg font-medium leading-relaxed">{section.body}</p>
        </blockquote>
      );

    case 'facts':
      return (
        <section>
          {label}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.items.map((f) => (
              <div key={f.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <dt className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400">{f.label}</dt>
                <dd className="text-sm text-slate-700 font-semibold leading-relaxed mt-1">{f.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case 'list': {
      const tone = TONES[section.tone] || TONES.neutral;
      return (
        <section>
          <h4 className={`text-[0.7rem] font-black uppercase tracking-widest mb-3 ${tone.label}`}>{section.title}</h4>
          <ul className="space-y-2.5">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-3.5 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${tone.dot}`} />
                <span className="text-slate-700 text-sm sm:text-[0.95rem] font-medium leading-relaxed">{renderBold(item)}</span>
              </li>
            ))}
          </ul>
        </section>
      );
    }

    case 'chips':
      return (
        <section>
          {label}
          <div className="flex flex-wrap gap-2">
            {section.items.map((c) => (
              <span key={c} className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-bold shadow-2xs">
                {c}
              </span>
            ))}
          </div>
        </section>
      );

    case 'people':
      return (
        <section>
          {label}
          <div className="space-y-3">
            {section.items.map((p) => (
              <div key={p.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <p className="text-sm font-extrabold text-slate-900">{p.name}</p>
                <p className="text-xs font-bold text-slate-400">{p.role}</p>
                {p.quote && <p className="text-sm text-slate-600 italic font-medium mt-2 leading-relaxed">“{p.quote}”</p>}
              </div>
            ))}
          </div>
        </section>
      );

    case 'dos':
      return (
        <section>
          {label}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-emerald-700"><Check className="w-3 h-3" /> Do</span>
              <p className="text-sm text-emerald-950 font-semibold leading-relaxed mt-1.5">{section.doText}</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-black uppercase tracking-widest text-rose-700"><Minus className="w-3 h-3" /> Don&apos;t</span>
              <p className="text-sm text-rose-950 font-semibold leading-relaxed mt-1.5">{section.dontText}</p>
            </div>
          </div>
        </section>
      );

    case 'links':
      return (
        <section>
          {label}
          <div className="space-y-2.5">
            {section.items.map((l) => {
              const target = getEntry(l.framework, l.id);
              if (!target) return null;
              return (
                <button
                  key={`${l.framework}-${l.id}`}
                  type="button"
                  onClick={() => onNavigate(l.framework, l.id)}
                  className="w-full text-left flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/40 transition-colors cursor-pointer group"
                >
                  <CornerDownRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 mt-0.5 shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{l.label}</span>
                    {l.reason && <span className="block text-xs text-slate-500 font-medium leading-relaxed mt-0.5">{l.reason}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      );

    default:
      return null;
  }
}

function EntryDrawer({ entry, framework, siblings, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const scrollRef = useRef(null);
  const index = siblings.findIndex((e) => e.id === entry.id);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [entry.id, entry.framework]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && prev) onNavigate(framework.id, prev.id);
      else if (e.key === 'ArrowRight' && next) onNavigate(framework.id, next.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNavigate, framework.id, prev, next]);

  const accent = ACCENTS[framework.accent] || ACCENTS.indigo;

  return (
    <Motion.div
      className="fixed inset-0 z-[60] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <Motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="wiki-entry-title"
        className="relative w-full max-w-2xl h-full bg-[#fafafa] shadow-[-20px_0_60px_rgba(15,23,42,0.12)] flex flex-col"
        initial={{ x: 48, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 48, opacity: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        <div className={`h-1.5 w-full bg-linear-to-r ${entry.color} shrink-0`} />

        {/* Header bar */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-8 py-4 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 min-w-0">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{framework.label}</span>
            {index >= 0 && <span className="text-slate-300 shrink-0">· {index + 1}/{siblings.length}</span>}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button" disabled={!prev} onClick={() => prev && onNavigate(framework.id, prev.id)}
              aria-label="Previous entry"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
            ><ChevronLeft className="w-4 h-4" /></button>
            <button
              type="button" disabled={!next} onClick={() => next && onNavigate(framework.id, next.id)}
              aria-label="Next entry"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
            ><ChevronRight className="w-4 h-4" /></button>
            <button
              ref={closeRef} type="button" onClick={onClose} aria-label="Close entry"
              className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-700 cursor-pointer transition ml-1"
            ><X className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Scrollable body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 py-8 sm:py-10">
          <header className="space-y-4 pb-8 border-b border-slate-200/70">
            <div className="flex flex-wrap items-center gap-2">
              {entry.swatch && (
                <span className="w-8 h-8 rounded-xl border border-slate-200 shadow-inner" style={{ backgroundColor: entry.swatch }} aria-hidden="true" />
              )}
              {entry.kicker && (
                <span className={`text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full border ${accent.bg} ${accent.border} ${accent.text}`}>
                  {entry.kicker}
                </span>
              )}
              {entry.group && (
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                  {entry.group}
                </span>
              )}
            </div>
            <h2 id="wiki-entry-title" className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight text-balance">
              {entry.name}
            </h2>
            {entry.tagline && <p className="text-sm font-bold text-slate-400 leading-snug">{entry.tagline}</p>}
            <p className="text-slate-600 text-lg leading-relaxed font-medium">{entry.summary}</p>
          </header>

          <div className="space-y-9 pt-8">
            {entry.sections.map((section, i) => (
              <SectionBlock key={`${section.kind}-${section.title || i}`} section={section} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </Motion.aside>
    </Motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Wiki() {
  const [params, setParams] = useSearchParams();
  const searchRef = useRef(null);

  const frameworkId = getFramework(params.get('f')) ? params.get('f') : 'mbti';
  const framework = getFramework(frameworkId);
  const groupParam = params.get('g');
  const activeGroup = framework.groups.includes(groupParam) ? groupParam : 'all';
  const entryParam = params.get('e');
  const openFrameworkId = getFramework(params.get('ef')) ? params.get('ef') : frameworkId;

  // Search box keeps local text for responsiveness; URL is updated alongside it.
  const [query, setQuery] = useState(params.get('q') || '');

  const update = useCallback((changes, { replace = true } = {}) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(changes).forEach(([k, v]) => {
        if (v == null || v === '' || v === 'all') next.delete(k);
        else next.set(k, v);
      });
      return next;
    }, { replace });
  }, [setParams]);

  // Keep the active framework chip visible in the mobile picker (e.g. after a deep link).
  const activeChipRef = useRef(null);
  useEffect(() => {
    activeChipRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [frameworkId]);

  // "/" focuses the search box.
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleQuery = (value) => {
    setQuery(value);
    update({ q: value.trim() ? value : null, e: null, ef: null });
  };

  const selectFramework = (id) => {
    setQuery('');
    update({ f: id === 'mbti' ? null : id, g: null, e: null, ef: null, q: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visibleEntries = activeGroup === 'all'
    ? framework.entries
    : framework.entries.filter((e) => e.group === activeGroup);

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const byFramework = new Map();
    searchWiki(query).forEach((row) => {
      if (!byFramework.has(row.framework)) byFramework.set(row.framework, []);
      byFramework.get(row.framework).push(row.entry);
    });
    return wikiFrameworks
      .filter((f) => byFramework.has(f.id))
      .map((f) => ({ framework: f, entries: byFramework.get(f.id) }));
  }, [query]);
  const resultCount = results ? results.reduce((n, r) => n + r.entries.length, 0) : 0;

  // Entry drawer state
  const openEntry = entryParam ? getEntry(openFrameworkId, entryParam) : null;
  const openFramework = openEntry ? getFramework(openFrameworkId) : null;
  const drawerSiblings = useMemo(() => {
    if (!openFramework) return [];
    const base = results ? results.find((r) => r.framework.id === openFramework.id)?.entries : null;
    const list = base || (openFramework.id === framework.id ? visibleEntries : openFramework.entries);
    return list.filter((e) => !e.href);
  }, [openFramework, results, framework.id, visibleEntries]);

  const openEntryHandler = useCallback((fid, eid) => {
    update({ e: eid, ef: fid === frameworkId ? null : fid }, { replace: false });
  }, [update, frameworkId]);
  const navigateWithinDrawer = useCallback((fid, eid) => {
    update({ e: eid, ef: fid === frameworkId ? null : fid });
  }, [update, frameworkId]);
  const closeEntry = useCallback(() => update({ e: null, ef: null }), [update]);

  const accent = ACCENTS[framework.accent] || ACCENTS.indigo;
  const FrameworkIcon = ICONS[framework.icon] || Brain;
  const showMatrixHeader = framework.matrix && activeGroup === 'all';

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 pt-28 md:pt-36 px-4 sm:px-8 md:px-12 relative text-slate-800 font-sans selection:bg-indigo-100">
      <div className="fixed top-[-15vh] left-[-10vw] w-[60vw] h-[60vw] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[60vw] h-[60vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 text-center sm:text-left">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-none">
              Psychology Wiki<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium max-w-2xl leading-relaxed text-balance">
              An encyclopedia of {totalEntries} entries across {wikiFrameworks.length} frameworks: cognitive profiles, motivations, relational patterns and the shadow side of the mind.
            </p>
          </div>

          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder="Search every framework…"
              aria-label="Search the wiki"
              className="w-full pl-12 pr-14 py-4 bg-white border border-slate-200/80 focus:border-indigo-500 outline-none rounded-full text-sm font-bold text-slate-800 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition"
            />
            {query ? (
              <button
                type="button" onClick={() => handleQuery('')} aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition"
              ><X className="w-3.5 h-3.5" /></button>
            ) : (
              <kbd className="hidden sm:block absolute right-5 top-1/2 -translate-y-1/2 text-[0.7rem] font-mono font-bold text-slate-400 border border-slate-200 rounded-md px-1.5 py-0.5 bg-slate-50">/</kbd>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[17rem_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
          {/* Mobile framework picker */}
          <nav aria-label="Frameworks" className="lg:hidden -mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 w-max pb-1">
              {wikiFrameworks.map((f) => {
                const active = !results && f.id === frameworkId;
                return (
                  <button
                    key={f.id} type="button" onClick={() => selectFramework(f.id)}
                    ref={active ? activeChipRef : null}
                    aria-current={active ? 'page' : undefined}
                    className={`px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                      active ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200/80 hover:text-slate-900'
                    }`}
                  >
                    {f.label} <span className={active ? 'text-indigo-300' : 'text-slate-300'}>{f.count}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Desktop sidebar */}
          <nav aria-label="Frameworks" className="hidden lg:block sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-y-7">
            {wikiCategories.map((cat) => {
              const items = wikiFrameworks.filter((f) => f.category === cat.id);
              if (!items.length) return null;
              return (
                <div key={cat.id} className="space-y-1.5">
                  <h2 className="px-3 text-[0.68rem] font-black uppercase tracking-widest text-slate-400">{cat.label}</h2>
                  {items.map((f) => {
                    const active = !results && f.id === frameworkId;
                    const Icon = ICONS[f.icon] || Brain;
                    return (
                      <button
                        key={f.id} type="button" onClick={() => selectFramework(f.id)}
                        aria-current={active ? 'page' : undefined}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left text-sm font-bold transition cursor-pointer ${
                          active
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-2xs'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-indigo-400' : 'text-slate-400'}`} />
                        <span className="flex-1 truncate">{f.label}</span>
                        <span className={`text-xs font-mono ${active ? 'text-slate-400' : 'text-slate-300'}`}>{f.count}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          {/* Main column */}
          <main className="min-w-0 space-y-8">
            <AnimatePresence mode="wait">
              {results ? (
                <Motion.div
                  key="results"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }} className="space-y-10"
                >
                  <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-slate-200/80">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      {resultCount} {resultCount === 1 ? 'result' : 'results'} for “{query.trim()}”
                    </h2>
                  </div>

                  {resultCount === 0 && (
                    <div className={`${cardShell} rounded-[2rem] p-10 text-center space-y-3`}>
                      <p className="text-lg font-extrabold text-slate-900">Nothing matches that search.</p>
                      <p className="text-sm text-slate-500 font-medium">Try a type name, a function like “Ni”, a motivation such as “belonging”, or a keyword like “anxious”.</p>
                    </div>
                  )}

                  {results.map(({ framework: f, entries }) => {
                    const Icon = ICONS[f.icon] || Brain;
                    const a = ACCENTS[f.accent] || ACCENTS.indigo;
                    return (
                      <section key={f.id} className="space-y-4">
                        <button
                          type="button" onClick={() => selectFramework(f.id)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <span className={`w-9 h-9 rounded-xl flex items-center justify-center border ${a.bg} ${a.border}`}>
                            <Icon className={`w-4 h-4 ${a.text}`} />
                          </span>
                          <span className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{f.label}</span>
                          <span className="text-xs font-mono font-bold text-slate-400">{entries.length}</span>
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                          {entries.map((e) => <EntryCard key={`${e.framework}-${e.id}`} entry={e} onOpen={openEntryHandler} />)}
                        </div>
                      </section>
                    );
                  })}
                </Motion.div>
              ) : (
                <Motion.div
                  key={framework.id}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }} className="space-y-8"
                >
                  {/* Framework header */}
                  <div className={`${cardShell} rounded-[2.5rem] p-7 md:p-10 flex flex-col sm:flex-row gap-6 sm:items-center`}>
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border shrink-0 ${accent.bg} ${accent.border}`}>
                      <FrameworkIcon className={`w-7 h-7 ${accent.text}`} />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">{framework.label}</h2>
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200/70 px-3 py-1 rounded-full">
                          {framework.count} entries
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-3xl">{framework.intro}</p>
                    </div>
                  </div>

                  {/* Group filter */}
                  {framework.groups.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter entries">
                      {['all', ...framework.groups].map((g) => {
                        const active = activeGroup === g;
                        const n = g === 'all' ? framework.count : framework.entries.filter((e) => e.group === g).length;
                        return (
                          <button
                            key={g} type="button" onClick={() => update({ g, e: null, ef: null })}
                            aria-pressed={active}
                            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                              active ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                            }`}
                          >
                            {g === 'all' ? 'All' : g} <span className={active ? 'text-slate-400' : 'text-slate-300'}>{n}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {showMatrixHeader && (
                    <div className="hidden md:grid grid-cols-3 gap-5 px-2 -mb-3 text-center text-[0.7rem] font-black uppercase tracking-widest text-slate-400">
                      <span>Lawful</span><span>Neutral</span><span>Chaotic</span>
                    </div>
                  )}

                  <div className={`grid grid-cols-1 gap-5 sm:gap-6 ${
                    framework.matrix ? 'sm:grid-cols-2 md:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3'
                  }`}>
                    {visibleEntries.map((e) => (
                      <EntryCard key={e.id} entry={e} onOpen={openEntryHandler} />
                    ))}
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {openEntry && openFramework && (
          <EntryDrawer
            key="drawer"
            entry={openEntry}
            framework={openFramework}
            siblings={drawerSiblings}
            onClose={closeEntry}
            onNavigate={navigateWithinDrawer}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
