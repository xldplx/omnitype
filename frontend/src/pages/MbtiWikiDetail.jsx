import { useEffect } from 'react';
import { useParams, Navigate, Link, useSearchParams } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Brain, Heart, Target, AlertTriangle, Zap, Sparkles, CheckCircle2, Briefcase,
  Users, Star, MessageSquare, Smile, HelpCircle, Check, X, Layers, Shield,
} from 'lucide-react';
import { typeDescriptions } from '../utils/mbtiResultLogic';
import { mbtiCognitiveStacks, mbtiTypeGuides, getTypeTemperament } from '../utils/mbtiWikiData';

function formatMarkdown(text) {
  if (!text) return '';
  return text.split(/\*\*([^*]+)\*\*/g).map((part, idx) =>
    idx % 2 === 1 ? <strong key={idx} className="text-slate-900 font-extrabold">{part}</strong> : part,
  );
}

const TABS = [
  { id: 'overview', label: 'Overview', icon: Brain },
  { id: 'stack', label: 'Cognitive Stack', icon: Layers },
  { id: 'daily', label: 'Daily Life', icon: Smile },
  { id: 'growth', label: 'Strengths & Growth', icon: Target },
  { id: 'relationships', label: 'Relationships', icon: Heart },
  { id: 'careers', label: 'Careers', icon: Briefcase },
];

const panel = 'bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_4px_24px_rgba(15,23,42,0.03)] rounded-[2.5rem]';

function IconBubble({ icon, tone = 'indigo' }) {
  const Icon = icon;
  const tones = {
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    rose: 'bg-rose-50 border-rose-100 text-rose-500',
    amber: 'bg-amber-50 border-amber-100 text-amber-500',
    purple: 'bg-purple-50 border-purple-100 text-purple-600',
  };
  return (
    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${tones[tone]}`}>
      <Icon className="w-5 h-5" />
    </div>
  );
}

function Card({ icon, tone, kicker, title, children, className = '' }) {
  return (
    <div className={`${panel} p-7 md:p-10 space-y-6 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100">
          {icon && <IconBubble icon={icon} tone={tone} />}
          <div>
            {kicker && <span className="text-[0.7rem] font-black uppercase tracking-widest text-slate-400 block">{kicker}</span>}
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

function PageIntro({ title, children }) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h2>
      <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">{children}</p>
    </div>
  );
}

function BulletList({ items, dot }) {
  return (
    <ul className="space-y-3">
      {items?.map((item, idx) => (
        <li key={idx} className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
          <span className={`mt-2 w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} />
          <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">{formatMarkdown(item)}</p>
        </li>
      ))}
    </ul>
  );
}

function TypeLinks({ codes, tone }) {
  const styles = {
    best: 'bg-emerald-50 border-emerald-200/80 hover:border-emerald-300 hover:bg-emerald-100/60',
    good: 'bg-indigo-50 border-indigo-200/80 hover:border-indigo-300 hover:bg-indigo-100/60',
  };
  const text = tone === 'best' ? 'text-emerald-800' : 'text-indigo-800';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {codes?.map((code) => (
        <Link
          key={code}
          to={`/wiki/mbti/${code.toLowerCase()}`}
          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border transition ${styles[tone]}`}
        >
          <span className={`font-mono font-black text-sm ${text}`}>{code}</span>
          <span className="text-xs font-bold text-slate-500 truncate">{typeDescriptions[code]?.title}</span>
        </Link>
      ))}
    </div>
  );
}

export default function MbtiWikiDetail() {
  const { type } = useParams();
  const [params, setParams] = useSearchParams();

  const code = (type || '').toUpperCase();
  const typeInfo = typeDescriptions[code];
  const activeTab = TABS.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'overview';

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [code]);

  if (!typeInfo) return <Navigate to="/wiki" replace />;

  const temperament = getTypeTemperament(code);
  const stack = mbtiCognitiveStacks[code] || [];
  const guide = mbtiTypeGuides[code] || { simpleSummary: typeInfo.desc, scenarios: [], myths: [], howToTalk: [], growthHacks: [] };

  const selectTab = (id) => {
    setParams(id === 'overview' ? {} : { tab: id }, { replace: true });
    document.getElementById('wiki-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] relative overflow-hidden flex flex-col items-center selection:bg-indigo-200">
      <div className="fixed top-[-10vh] left-[-10vw] w-[55vw] h-[55vw] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[55vw] h-[55vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-28 md:pt-36 pb-32 relative z-10 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4">
          <ol className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <li><Link to="/wiki" className="hover:text-slate-900 transition-colors">Wiki</Link></li>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <li><Link to="/wiki" className="hover:text-slate-900 transition-colors">16 Archetypes</Link></li>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <li aria-current="page" className="text-slate-900 font-mono">{code}</li>
          </ol>
          <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${temperament.themeBg} ${temperament.themeBorder} ${temperament.themeText}`}>
            {temperament.title}
          </span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={`lg:col-span-7 ${panel} p-8 md:p-12 relative overflow-hidden flex flex-col justify-center gap-7`}>
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-linear-to-r ${temperament.color} opacity-90`} />
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight font-mono leading-none">{code}</h1>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-400 tracking-tight">{typeInfo.title}</span>
            </div>
            <p className="text-slate-600 max-w-2xl leading-relaxed font-medium text-base sm:text-lg md:text-xl">
              {guide.simpleSummary || typeInfo.desc}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 font-extrabold text-xs uppercase tracking-wider border border-slate-200">
                {typeInfo.mythologicalArchetype || 'Archetype'}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs uppercase tracking-wider border border-indigo-100">
                {temperament.tagline}
              </span>
            </div>
          </div>

          {/* At a glance */}
          <aside className={`lg:col-span-5 ${panel} p-8 md:p-10 space-y-7`} aria-label="At a glance">
            <div className="space-y-3">
              <span className="text-[0.7rem] font-black uppercase tracking-widest text-slate-400">Function stack</span>
              <ol className="space-y-2">
                {stack.map((fn, i) => (
                  <li key={fn.function} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
                    <span className="w-7 text-center text-[0.65rem] font-black text-slate-300">{i + 1}</span>
                    <span className="font-mono font-black text-sm text-indigo-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1 shadow-2xs">{fn.function}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-extrabold text-slate-900 truncate">{fn.name}</span>
                      <span className="block text-xs font-bold text-slate-400 truncate">{fn.rank}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <span className="text-[0.7rem] font-black uppercase tracking-widest text-slate-400">Core values</span>
              <div className="flex flex-wrap gap-2">
                {typeInfo.coreValues?.map((val) => (
                  <span key={val} className="px-3 py-1.5 rounded-xl bg-amber-50/80 text-amber-900 font-bold text-xs border border-amber-200/70">{val}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Tabs */}
        <div id="wiki-tabs" role="tablist" aria-label="Sections" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 pb-3 pt-1 border-b border-slate-200/80 scroll-mt-28">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id} type="button" role="tab" id={`tab-${tab.id}`}
                aria-selected={isActive} aria-controls={`panel-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <Motion.div
            key={activeTab}
            role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card icon={Shield} tone="emerald" kicker="Core motivator" title="Secret dreams">
                    <p className="text-slate-700 text-base sm:text-lg font-bold leading-relaxed">{typeInfo.secretDreams}</p>
                  </Card>
                  <Card icon={Heart} tone="rose" kicker="Subconscious friction" title="Hidden fears">
                    <p className="text-slate-700 text-base sm:text-lg font-bold leading-relaxed">{typeInfo.hiddenFears}</p>
                  </Card>
                </div>
                <Card icon={Sparkles} tone="indigo" kicker="Recognizable patterns" title="Quirks & habits">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {typeInfo.funFacts?.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 text-slate-700 text-sm font-medium leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </>
            )}

            {/* COGNITIVE STACK */}
            {activeTab === 'stack' && (
              <>
                <PageIntro title="Cognitive stack">
                  The four primary mental functions {code}s rely on, from the most developed and conscious to the least.
                </PageIntro>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stack.map((fn, idx) => (
                    <div key={fn.function} className={`${panel} p-7 md:p-8 space-y-4 hover:border-indigo-200 transition-colors`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[0.7rem] font-black uppercase tracking-widest text-slate-400">{idx + 1}. {fn.rank}</span>
                        <span className="text-sm font-mono font-black px-3.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">{fn.function}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{fn.name}</h3>
                        <span className="text-xs font-extrabold text-indigo-600 block mt-0.5">{fn.role}</span>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-[0.95rem] font-medium leading-relaxed">{fn.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* DAILY LIFE */}
            {activeTab === 'daily' && (
              <>
                <PageIntro title="Daily life & myths">
                  Situations you will instantly recognize, and the misconceptions about how {code}s operate.
                </PageIntro>
                <Card icon={Smile} tone="indigo" kicker="Behavioral patterns" title="Real-world scenarios">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {guide.scenarios?.map((scen, idx) => (
                      <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/70 space-y-2.5">
                        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 block">{scen.title}</span>
                        <p className="text-slate-700 text-sm font-medium leading-relaxed">{scen.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card icon={HelpCircle} tone="purple" kicker="Clarifying misconceptions" title="Myths vs. reality">
                  <div className="space-y-4">
                    {guide.myths?.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-200/70">
                        <div className="flex items-start gap-3.5">
                          <div className="w-7 h-7 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 mt-0.5"><X className="w-4 h-4 text-rose-600" /></div>
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-rose-600 block mb-1">Myth</span>
                            <p className="text-slate-800 text-sm font-semibold leading-relaxed">{item.myth}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3.5 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-4">
                          <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4 text-emerald-600" /></div>
                          <div>
                            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 block mb-1">Reality</span>
                            <p className="text-slate-800 text-sm font-semibold leading-relaxed">{item.fact}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* STRENGTHS & GROWTH */}
            {activeTab === 'growth' && (
              <>
                <PageIntro title="Strengths, blindspots & growth">
                  An honest account of innate powers, vulnerabilities to guard against, and practical self-mastery.
                </PageIntro>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card icon={CheckCircle2} tone="indigo" kicker="Core powers" title="Greatest strengths">
                    <BulletList items={typeInfo.strengths} dot="bg-indigo-600" />
                  </Card>
                  <Card icon={AlertTriangle} tone="rose" kicker="Vulnerabilities" title="Blindspots to watch">
                    <BulletList items={typeInfo.weaknesses} dot="bg-rose-500" />
                  </Card>
                </div>
                <Card icon={Zap} tone="amber" kicker="Self-mastery" title="Practical growth habits">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {guide.growthHacks?.map((hack, idx) => (
                      <div key={idx} className="bg-amber-50/60 p-6 rounded-3xl border border-amber-200/70 space-y-2.5">
                        <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">Habit {idx + 1}</span>
                        <p className="text-slate-800 text-sm font-semibold leading-relaxed">{hack}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* RELATIONSHIPS */}
            {activeTab === 'relationships' && (
              <>
                <PageIntro title="Relationships & communication">
                  How {code}s navigate romance and friendship, and how to communicate with them well.
                </PageIntro>
                <Card icon={MessageSquare} tone="indigo" kicker="Interpersonal protocol" title={`Communicating with ${/^[AEIOU]/.test(code) ? 'an' : 'a'} ${code}`}>
                  <div className="space-y-3">
                    {guide.howToTalk?.map((rule, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
                        <div className="flex items-start gap-3 text-emerald-800 font-semibold text-sm">
                          <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-black uppercase shrink-0">Do</span>
                          <span className="pt-0.5">{rule.do}</span>
                        </div>
                        <div className="flex items-start gap-3 text-rose-800 font-semibold text-sm border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
                          <span className="px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-black uppercase shrink-0">Don&apos;t</span>
                          <span className="pt-0.5">{rule.dont}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card icon={Heart} tone="rose" title="Love & romance">
                    <p className="text-slate-700 font-medium text-base leading-relaxed">{typeInfo.romantic}</p>
                  </Card>
                  <Card icon={Users} tone="indigo" title="Friendships">
                    <p className="text-slate-700 font-medium text-base leading-relaxed">{typeInfo.friendships}</p>
                  </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card kicker="Highest synergy" title="Best matches">
                    <TypeLinks codes={typeInfo.compatibility?.best} tone="best" />
                  </Card>
                  <Card kicker="Strong rapport" title="Good matches">
                    <TypeLinks codes={typeInfo.compatibility?.good} tone="good" />
                  </Card>
                </div>
              </>
            )}

            {/* CAREERS */}
            {activeTab === 'careers' && (
              <>
                <PageIntro title="Careers & workplace">
                  Ideal working environments and the domains where {code}s tend to excel.
                </PageIntro>
                <Card icon={Briefcase} tone="indigo" title="Ideal work environment">
                  <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed">{typeInfo.workplace}</p>
                </Card>
                <Card icon={Star} tone="amber" title="Career paths">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {typeInfo.careers?.map((career) => (
                      <div key={career} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 font-extrabold text-slate-800 text-center text-sm hover:border-indigo-200 hover:bg-indigo-50/40 transition">
                        {career}
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </Motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
