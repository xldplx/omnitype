import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  Palette,
  Edit2,
  Check,
  X,
  PlusCircle,
  Copy,
  Calendar,
  Compass,
  Award
} from 'lucide-react';

const DEFAULT_PROFILE = {
  name: "Your Name",
  age: 25,
  gender: "Non-Binary",
  memberSince: "May 2026",
};

export default function IdentityDashboard() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState(25);
  const [editGender, setEditGender] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Real test data states loaded from localStorage
  const [mbtiData, setMbtiData] = useState(null);
  const [enneagramData, setEnneagramData] = useState(null);
  const [alignmentData, setAlignmentData] = useState(null);
  const [darkTriadData, setDarkTriadData] = useState(null);
  const [defenseData, setDefenseData] = useState(null);
  const [loveLanguagesData, setLoveLanguagesData] = useState(null);
  const [attachmentStylesData, setAttachmentStylesData] = useState(null);
  const [instinctualData, setInstinctualData] = useState(null);
  const [tritypeData, setTritypeData] = useState(null);
  const [colorData, setColorData] = useState(null);
  const [jungianData, setJungianData] = useState(null);
  const [resilienceData, setResilienceData] = useState(null);
  const [adhdData, setAdhdData] = useState(null);
  const [hspData, setHspData] = useState(null);
  const [burnoutData, setBurnoutData] = useState(null);
  const [imposterData, setImposterData] = useState(null);

  const [selectedTrait, setSelectedTrait] = useState(null);
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    // 1. Profile
    const savedProfile = localStorage.getItem('omnitype_user_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Error parsing user profile", e);
      }
    }

    // 2. Tests
    const mbti = localStorage.getItem('omnitype_mbti');
    if (mbti) {
      try {
        setMbtiData(JSON.parse(mbti));
      } catch (e) {
        setMbtiData({ type: mbti });
      }
    }

    const enneagram = localStorage.getItem('omnitype_enneagram');
    if (enneagram) {
      try { setEnneagramData(JSON.parse(enneagram)); } catch (e) { setEnneagramData({ type: enneagram }); }
    }

    const alignment = localStorage.getItem('omnitype_alignment');
    if (alignment) {
      try { setAlignmentData(JSON.parse(alignment)); } catch (e) { setAlignmentData({ type: alignment }); }
    }

    const darkTriad = localStorage.getItem('omnitype_dark_triad');
    if (darkTriad) {
      try { setDarkTriadData(JSON.parse(darkTriad)); } catch (e) { console.error(e); }
    }

    const defense = localStorage.getItem('omnitype_defense');
    if (defense) {
      try { setDefenseData(JSON.parse(defense)); } catch (e) { console.error(e); }
    }

    const loveLanguages = localStorage.getItem('omnitype_love_languages');
    if (loveLanguages) {
      try { setLoveLanguagesData(JSON.parse(loveLanguages)); } catch (e) { setLoveLanguagesData({ fullTitle: loveLanguages }); }
    }

    const attachmentStyles = localStorage.getItem('omnitype_attachment_styles');
    if (attachmentStyles) {
      try { setAttachmentStylesData(JSON.parse(attachmentStyles)); } catch (e) { setAttachmentStylesData({ fullTitle: attachmentStyles }); }
    }

    const instinctual = localStorage.getItem('omnitype_instinctual_variants');
    if (instinctual) {
      try { setInstinctualData(JSON.parse(instinctual)); } catch (e) { setInstinctualData({ type: instinctual }); }
    }

    const tritype = localStorage.getItem('omnitype_tritype');
    if (tritype) {
      try { setTritypeData(JSON.parse(tritype)); } catch (e) { setTritypeData({ type: tritype }); }
    }

    const color = localStorage.getItem('omnitype_color_psychology');
    if (color) {
      try { setColorData(JSON.parse(color)); } catch (e) { setColorData({ type: color }); }
    }

    const jungian = localStorage.getItem('omnitype_jungian_archetypes');
    if (jungian) {
      try { setJungianData(JSON.parse(jungian)); } catch (e) { setJungianData({ type: jungian }); }
    }

    const resilience = localStorage.getItem('omnitype_resilience');
    if (resilience) {
      try { setResilienceData(JSON.parse(resilience)); } catch (e) { setResilienceData({ type: resilience }); }
    }

    const adhd = localStorage.getItem('omnitype_adhd');
    if (adhd) {
      try { setAdhdData(JSON.parse(adhd)); } catch (e) { setAdhdData({ type: adhd }); }
    }

    const hsp = localStorage.getItem('omnitype_hsp');
    if (hsp) {
      try { setHspData(JSON.parse(hsp)); } catch (e) { setHspData({ type: hsp }); }
    }

    const burnout = localStorage.getItem('omnitype_burnout');
    if (burnout) {
      try { setBurnoutData(JSON.parse(burnout)); } catch (e) { setBurnoutData({ type: burnout }); }
    }

    const imposter = localStorage.getItem('omnitype_imposter');
    if (imposter) {
      try { setImposterData(JSON.parse(imposter)); } catch (e) { setImposterData({ type: imposter }); }
    }
  }, []);

  const handleEditClick = () => {
    setEditName(profile.name);
    setEditAge(profile.age);
    setEditGender(profile.gender);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    const updated = {
      ...profile,
      name: editName || profile.name,
      age: parseInt(editAge) || profile.age,
      gender: editGender || profile.gender
    };
    setProfile(updated);
    localStorage.setItem('omnitype_user_profile', JSON.stringify(updated));
    setIsEditing(false);
  };

  // Compile assessment progress (Show all 16 assessments dynamically!)
  const activeTests = [
    { id: 'mbti', title: '16 Archetypes', value: mbtiData?.type || mbtiData?.info?.name || (typeof mbtiData === 'string' ? mbtiData : null), path: '/test/mbti', loaded: !!mbtiData },
    { id: 'enneagram', title: 'The Enneagram', value: enneagramData?.type || enneagramData?.info?.name || (typeof enneagramData === 'string' ? enneagramData : null), path: '/test/enneagram', loaded: !!enneagramData },
    { id: 'alignment', title: 'Moral Alignment', value: alignmentData?.type || alignmentData?.info?.name || (typeof alignmentData === 'string' ? alignmentData : null), path: '/test/alignment', loaded: !!alignmentData },
    { id: 'love-languages', title: 'Love Languages', value: loveLanguagesData?.fullTitle || loveLanguagesData?.info?.name || (typeof loveLanguagesData === 'string' ? loveLanguagesData : null), path: '/test/love-languages', loaded: !!loveLanguagesData },
    { id: 'attachment-styles', title: 'Attachment Styles', value: attachmentStylesData?.fullTitle || attachmentStylesData?.info?.name || (typeof attachmentStylesData === 'string' ? attachmentStylesData : null), path: '/test/attachment-styles', loaded: !!attachmentStylesData },
    { id: 'dark-triad', title: 'The Dark Triad', value: darkTriadData?.info?.name || (typeof darkTriadData === 'string' ? darkTriadData : null), path: '/test/dark-triad', loaded: !!darkTriadData },
    { id: 'defense', title: 'Defense Mechanisms', value: defenseData?.info?.name || (typeof defenseData === 'string' ? defenseData : null), path: '/test/defense', loaded: !!defenseData },
    { id: 'instinctual-variants', title: 'Instinctual Variants', value: instinctualData?.type || instinctualData?.info?.name || (typeof instinctualData === 'string' ? instinctualData : null), path: '/test/instinctual-variants', loaded: !!instinctualData },
    { id: 'tritype', title: 'Tritype', value: tritypeData?.type || tritypeData?.info?.name || (typeof tritypeData === 'string' ? tritypeData : null), path: '/test/tritype', loaded: !!tritypeData },
    { id: 'color-psychology', title: 'Color Psychology', value: colorData?.type || colorData?.info?.name || (typeof colorData === 'string' ? colorData : null), path: '/test/color-psychology', loaded: !!colorData },
    { id: 'jungian-archetypes', title: 'Jungian Archetypes', value: jungianData?.type || jungianData?.info?.name || (typeof jungianData === 'string' ? jungianData : null), path: '/test/jungian-archetypes', loaded: !!jungianData },
    { id: 'resilience', title: 'Resilience Quotient', value: resilienceData?.type || resilienceData?.info?.name || (typeof resilienceData === 'string' ? resilienceData : null), path: '/test/resilience', loaded: !!resilienceData },
    { id: 'adhd', title: 'ADHD Assessment', value: adhdData?.type || adhdData?.info?.name || (typeof adhdData === 'string' ? adhdData : null), path: '/test/adhd', loaded: !!adhdData },
    { id: 'hsp', title: 'High Sensitive Person', value: hspData?.type || hspData?.info?.name || (typeof hspData === 'string' ? hspData : null), path: '/test/hsp', loaded: !!hspData },
    { id: 'burnout', title: 'Burnout Index', value: burnoutData?.type || burnoutData?.info?.name || (typeof burnoutData === 'string' ? burnoutData : null), path: '/test/burnout', loaded: !!burnoutData },
    { id: 'imposter', title: 'Imposter Syndrome', value: imposterData?.type || imposterData?.info?.name || (typeof imposterData === 'string' ? imposterData : null), path: '/test/imposter', loaded: !!imposterData }
  ];

  const completedCount = activeTests.filter(t => t.loaded).length;

  const calculateCognitiveDensity = () => {
    const defaultTraits = [
      { label: "Cognition", value: mbtiData ? 95 : 30, icon: Brain, color: "from-indigo-500 to-purple-500", desc: "Your abstract logic processing and architectural mental modeling capabilities." },
      { label: "Resilience", value: defenseData ? 90 : 40, icon: Shield, color: "from-purple-500 to-pink-500", desc: "Your nervous system's capacity to absorb chaotic high-friction triggers." },
      { label: "Vulnerability", value: alignmentData ? 85 : 35, icon: Heart, color: "from-rose-400 to-pink-500", desc: "Your level of relational safety, openness, and reciprocal moral alignment." },
      { label: "Shadow Strategy", value: darkTriadData ? 82 : 25, icon: Zap, color: "from-amber-400 to-orange-500", desc: "Calculated pragmatism, self-assertion, and capacity for strategic control." }
    ];
    return defaultTraits;
  };

  const results = calculateCognitiveDensity();

  const getDynamicInsights = () => {
    const list = [];
    if (mbtiData) {
      list.push({ title: `${mbtiData.type || mbtiData} Visionary`, desc: "Advanced conceptual processing with a strong preference for structural logic.", icon: Hexagon });
    } else {
      list.push({ title: "Unmapped Vision", desc: "Complete the 16 Archetypes test to map your long-term cognitive framework.", icon: Hexagon });
    }

    if (defenseData) {
      list.push({ title: defenseData.info?.subName || "Adaptability", desc: `Utilizes ${defenseData.info?.name || "defenses"} as primary nervous system protection.`, icon: Shield });
    } else {
      list.push({ title: "Shield Locked", desc: "Complete the Defense Mechanisms test to discover your anxiety triggers.", icon: Shield });
    }

    if (darkTriadData) {
      list.push({ title: darkTriadData.info?.subName || "Tactical Flow", desc: `High density strategy: operational leverage styled as ${darkTriadData.info?.name}.`, icon: Zap });
    } else {
      list.push({ title: "Shadow Locked", desc: "Map your shadow traits to unlock unique risk-taking profiles.", icon: Zap });
    }

    return list;
  };

  const insights = getDynamicInsights();

  // Load the major types for the shareable ID Card (MBTI, Enneagram, Alignment, Love Language, Attachment Style)
  const majorTypes = {
    mbti: mbtiData ? (mbtiData.type || mbtiData).toUpperCase() : "LOCKED",
    enneagram: enneagramData ? (enneagramData.type || enneagramData) : "LOCKED",
    alignment: alignmentData ? (alignmentData.type || alignmentData) : "LOCKED",
    loveLanguage: loveLanguagesData ? (loveLanguagesData.fullTitle || loveLanguagesData.info?.name || loveLanguagesData) : "LOCKED",
    attachmentStyle: attachmentStylesData ? (attachmentStylesData.fullTitle || attachmentStylesData.info?.name || attachmentStylesData) : "LOCKED"
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      // Wait briefly to ensure fonts and assets are resolved
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 1, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `${profile.name.toLowerCase().replace(/\s+/g, '-')}-omnitype-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download card:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const generateNarrative = () => {
    let parts = [];
    if (mbtiData) parts.push(`guided by the high-level cognitive framework of an **${mbtiData.type || mbtiData}**`);
    if (alignmentData) parts.push(`harmonized through the moral priorities of a **${alignmentData.type || alignmentData}** stance`);
    if (loveLanguagesData) parts.push(`communicating affection via **${loveLanguagesData.fullTitle || loveLanguagesData}**`);
    if (attachmentStylesData) parts.push(`and operating in relationship models with a **${attachmentStylesData.fullTitle || attachmentStylesData}** style`);

    if (parts.length === 0) {
      return "Start your self-discovery path by taking assessments below. Your personal brand blueprint narrative will assemble automatically once you unlock your first archetype.";
    }
    return `You represent a highly unique psychological composition: ${parts.join(', ')}. This precise architectural arrangement allows you to balance deep abstract reasoning with stable emotional boundaries and targeted moral integrity.`;
  };

  const getSynergyProfile = () => {
    if (completedCount === 0) {
      return {
        title: "Dormant Potential",
        badge: "Level 0",
        desc: "Complete your first personality test to activate your cognitive synergy blueprint.",
        synergyPercent: 0
      };
    }
    if (completedCount <= 2) {
      return {
        title: "Emergent Architect",
        badge: "Level 1",
        desc: "You are beginning to link your core cognitive traits together. Map at least 3 archetypes to unlock compound insights.",
        synergyPercent: 40
      };
    }

    if (mbtiData && enneagramData) {
      return {
        title: `${mbtiData.type || mbtiData} • Type ${enneagramData.type || enneagramData}`,
        badge: "Dynamic Catalyst",
        desc: `Your rational structure as a ${mbtiData.type || mbtiData} coordinates uniquely with the instinctual drives of Enneagram ${enneagramData.type || enneagramData}, creating a highly targeted focus on long-term execution and emotional self-awareness.`,
        synergyPercent: 75
      };
    }

    return {
      title: "Coherent Searcher",
      badge: "Level 2",
      desc: "Your psychological profile shows stable balance across your completed assessments. Map the remaining assessments to fully align your stack.",
      synergyPercent: 85
    };
  };

  const synergy = getSynergyProfile();

  const getBioText = () => {
    const list = [];
    if (mbtiData) list.push(mbtiData.type || mbtiData);
    if (enneagramData) list.push(enneagramData.type || enneagramData);
    if (alignmentData) list.push(alignmentData.type || alignmentData);
    if (loveLanguagesData) list.push(loveLanguagesData.fullTitle || loveLanguagesData);
    if (attachmentStylesData) list.push(attachmentStylesData.fullTitle || attachmentStylesData);
    return `My OmniType Stack: ${list.join(' | ') || 'Unmapped'}. Discover your psychological blueprint at omnitype.co`;
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 selection:bg-indigo-100 uppercase-none relative">

      {/* Background Decorative Blobs matching main site theme */}
      <div className="fixed top-[-20vh] right-[-10vw] w-[60vw] h-[60vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Hero Section */}
      <div className="w-full pt-32 pb-12 px-6 md:px-12 flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight mb-6">
            Identity Map<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Your unique psychological fingerprint, dynamically aggregated from your completed assessments.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">

        {/* Left Column: Stats & Map */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          {/* Basic Info Section */}
          <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col relative overflow-hidden group">
            <div className="absolute top-8 right-8 z-20">
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-md flex items-center justify-center"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-md flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 text-slate-600 hover:text-indigo-600 font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mb-8 tracking-tight flex items-center gap-3">
              Basic Information
            </h2>

            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    value={editName}
                    placeholder="Your Name"
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-xl px-4 py-3 font-bold text-slate-800 shadow-inner"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Age</label>
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-xl px-4 py-3 font-bold text-slate-800 shadow-inner"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gender</label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-xl px-4 py-3 font-bold text-slate-800 shadow-inner appearance-none cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Agender">Agender</option>
                    <option value="Genderfluid">Genderfluid</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Name</span>
                  <span className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{profile.name || "Your Name"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Age</span>
                  <span className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{profile.age}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Gender</span>
                  <span className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{profile.gender}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Omnitype Tier</span>
                  <span className="text-2xl font-black text-indigo-600 tracking-tight leading-tight">
                    {completedCount === 0 ? "Observer" : completedCount < 4 ? "Seeker" : completedCount < 6 ? "Architect" : "Apex Sage"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Cognitive Brand Blueprint */}
          <div className="bg-white/90 backdrop-blur-3xl border border-indigo-50 shadow-[0_20px_50px_rgba(99,102,241,0.03)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-indigo-500/5 via-purple-500/3 to-transparent rounded-full blur-[80px] pointer-events-none" />
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Cognitive Brand Blueprint
            </h2>
            <p className="text-slate-600 text-lg md:text-[1.2rem] leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: generateNarrative() }} />
          </div>

          {/* Synergy Analyzer */}
          <div className="bg-linear-to-br from-indigo-500/5 via-purple-500/5 to-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-indigo-100/50 p-8 md:p-12 shadow-[0_20px_50px_rgba(99,102,241,0.03)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-50 border border-indigo-100/50 text-indigo-600 px-3 py-1.5 rounded-full mb-4 inline-block">{synergy.badge}</span>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-4">{synergy.title}</h2>
              <p className="text-slate-500 leading-relaxed font-medium">{synergy.desc}</p>
            </div>

            <div className="flex flex-col items-center bg-white/80 border border-indigo-100/30 rounded-3xl p-6 shadow-sm shrink-0 min-w-[200px]">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Synergy Index</span>
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-95" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                  <motion.circle
                    cx="50" cy="50" r="40" stroke="url(#synergy-gradient)" strokeWidth="8" fill="transparent"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * synergy.synergyPercent) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="synergy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-800">{synergy.synergyPercent}%</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Alignment</span>
                </div>
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
                Aggregated psychological metrics based on completed assessments. Unlock maximum density by answering all surveys.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {results.map((res, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTrait(res)}
                    className={`flex flex-col items-start p-4 rounded-3xl border transition-all duration-300 ${selectedTrait?.label === res.label
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
              <TraitBars data={results} />

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
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Cognitive Baseline</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gamified Locked vs. Unlocked Test Aggregates */}
          <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col relative">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-8 tracking-tight flex items-center gap-3">
              <Layers className="w-6 h-6 text-indigo-500" />
              Personality Stack Unlocks ({completedCount}/{activeTests.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activeTests.map((t) => (
                <div
                  key={t.id}
                  className={`relative p-6 rounded-[2rem] border transition-all duration-500 ${t.loaded
                    ? 'bg-linear-to-br from-indigo-50/50 to-white border-indigo-100/50 shadow-sm'
                    : 'bg-slate-50/40 border-slate-100 backdrop-blur-sm'
                    }`}
                >
                  {!t.loaded && (
                    <div className="absolute top-6 right-6">
                      <Lock className="w-4 h-4 text-slate-300" />
                    </div>
                  )}

                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.title}</h3>

                  {t.loaded ? (
                    <div>
                      <p className="text-xl font-black text-indigo-600 tracking-tight mb-4 truncate">{t.value}</p>
                      <Link
                        to={t.path}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                      >
                        <span>Retake Test</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-bold text-slate-300 tracking-tight mb-4">UNKNOWN</p>
                      <Link
                        to={t.path}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-sm"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>Take Test</span>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col relative">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-8 tracking-tight flex items-center gap-3">
              <Calendar className="w-6 h-6 text-indigo-500" />
              Completion Timeline
            </h2>

            <div className="relative border-l border-indigo-100 ml-4 pl-8 space-y-8 py-2">
              <div className="relative">
                <span className="absolute -left-12 top-0.5 bg-indigo-500 text-white rounded-full p-1.5 border-4 border-white shadow-sm flex items-center justify-center">
                  <Fingerprint className="w-3.5 h-3.5" />
                </span>
                <h3 className="text-sm font-black text-slate-800">OmniType Account Initialized</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Step 1 • Completed</p>
              </div>

              <div className="relative">
                <span className={`absolute -left-12 top-0.5 rounded-full p-1.5 border-4 border-white shadow-sm flex items-center justify-center ${mbtiData ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                  <Brain className="w-3.5 h-3.5" />
                </span>
                <h3 className={`text-sm font-black ${mbtiData ? 'text-slate-800' : 'text-slate-400'}`}>16 Archetypes (MBTI)</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
                  {mbtiData ? 'Step 2 • Fully Mapped' : 'Step 2 • Locked'}
                </p>
              </div>

              <div className="relative">
                <span className={`absolute -left-12 top-0.5 rounded-full p-1.5 border-4 border-white shadow-sm flex items-center justify-center ${loveLanguagesData ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                  <Heart className="w-3.5 h-3.5" />
                </span>
                <h3 className={`text-sm font-black ${loveLanguagesData ? 'text-slate-800' : 'text-slate-400'}`}>Love Languages</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
                  {loveLanguagesData ? 'Step 3 • Fully Mapped' : 'Step 3 • Locked'}
                </p>
              </div>

              <div className="relative">
                <span className={`absolute -left-12 top-0.5 rounded-full p-1.5 border-4 border-white shadow-sm flex items-center justify-center ${completedCount === 7 ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                  <Award className="w-3.5 h-3.5" />
                </span>
                <h3 className={`text-sm font-black ${completedCount === 7 ? 'text-slate-800' : 'text-slate-400'}`}>Apex Integration Status</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">
                  {completedCount === 7 ? 'All Assessments Complete' : 'Awaiting Remaining Tests'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: ID Card & Sharing */}
        <div className="lg:col-span-4 flex flex-col gap-8">

          <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] lg:sticky lg:top-36 relative">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Identity ID Card</h2>
              <div className="flex gap-2">
                <button
                  onClick={downloadCard}
                  className="p-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Perfect sizing container for ID Card */}
            <div className="w-full flex justify-center overflow-hidden py-4 rounded-3xl">
              <ShareableIDCard user={{ ...profile, majorTypes, completedCount }} ref={cardRef} />
            </div>

            <div className="mt-6 space-y-6">
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                Export your psychological stack as a verified digital asset.
                Perfect for social bios, portfolios, or team-building sessions.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowShareModal(true)}
                  className="w-full py-4 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Share2 className="w-4 h-4 text-slate-400" />
                  <span>Share Bio</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadCard}
                  disabled={isDownloading}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed animate-pulse"
                >
                  {isDownloading ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-indigo-200" />
                  )}
                  <span>{isDownloading ? '...' : 'Download'}</span>
                </motion.button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Sharing Overlay Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-md w-full border border-indigo-50 shadow-2xl relative"
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-indigo-50 rounded-full border border-slate-200/50 hover:border-indigo-100 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-500" />
                Share Your Stack
              </h3>
              <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                Copy this pre-formatted text card to show your psychological stack on your Instagram bio, Twitter profile, or LinkedIn bio!
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 font-mono text-xs text-slate-600 mb-6 select-all relative group">
                {getBioText()}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-4 border border-slate-200 bg-white hover:bg-slate-50 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors text-slate-700 shadow-sm"
                >
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getBioText());
                    setShowShareModal(false);
                  }}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Check className="w-4 h-4 text-indigo-200" />
                  <span>Copy Bio Text</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

// HIGH-AESTHETIC LIGHT GLASSMORPHIC ID CARD (WHITE & PURPLE GRADIENT THEME)
const ShareableIDCard = React.forwardRef(({ user }, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full max-w-[340px] aspect-[10/16] bg-white rounded-[2.5rem] overflow-hidden flex flex-col justify-between text-slate-800 border border-slate-100 shadow-[0_25px_60px_rgba(99,102,241,0.08)] shrink-0"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Top 33% Gradient Header */}
      <div className="relative h-[33%] bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-5 flex flex-col justify-between overflow-hidden">
        {/* Subtle mesh background shapes */}
        <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-black/10 rounded-full blur-lg pointer-events-none" />

        {/* Header Info */}
        <div className="flex justify-between items-center relative z-10 w-full">
          <div className="flex items-center gap-1.5 text-white">
            <Fingerprint className="w-4.5 h-4.5 text-indigo-200" />
            <span className="text-[11.5px] font-black tracking-[0.25em] uppercase text-white">OMNITYPE</span>
          </div>
          {/* <span className="text-[7.5px] font-black tracking-widest text-indigo-100 bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full uppercase">
            MY PROFILE
          </span> */}
        </div>

        {/* Floating title inside gradient area */}
        {/* <div className="mb-2 relative z-10 opacity-70">
          <span className="text-[8px] font-bold text-indigo-100 uppercase tracking-widest">MY PERSONALITY BLUEPRINT</span>
        </div> */}
      </div>

      {/* Avatar Container sitting on the boundary */}
      <div className="absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white p-[3px] shadow-[0_8px_20px_rgba(99,102,241,0.12)]">
          <div className="w-full h-full rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
        </div>
        <span className="absolute bottom-1 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
      </div>

      {/* Bottom 67% white content card */}
      <div className="relative h-[67%] pt-10 px-5 pb-5 flex flex-col justify-between bg-white z-10">

        {/* User identification */}
        <div className="text-center mb-3">
          <h2 className="text-[16px] font-black tracking-tight text-slate-800 leading-tight truncate">{user.name || "Your Name"}</h2>
          <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            {user.gender} • AGE {user.age}
          </p>
        </div>

        {/* Archetype Badges Area (Standard Clear Terminology - MBTI, Enneagram, Moral Alignment, Love Language, Attachment Style) */}
        <div className="flex flex-col gap-1.5 relative z-10 w-full my-auto">

          {/* MBTI & Enneagram Row */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-indigo-50/20 border border-indigo-100/30 p-2 rounded-xl flex flex-col items-center text-center hover:bg-indigo-50/40 transition-colors shadow-2xs">
              <span className="text-[7px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">MBTI</span>
              <span className="text-[12.5px] font-black text-indigo-600 leading-none tracking-tight truncate w-full">{user.majorTypes.mbti}</span>
            </div>
            <div className="bg-purple-50/20 border border-purple-100/30 p-2 rounded-xl flex flex-col items-center text-center hover:bg-purple-50/40 transition-colors shadow-2xs">
              <span className="text-[7px] font-bold text-purple-400 uppercase tracking-widest mb-0.5">Enneagram</span>
              <span className="text-[12.5px] font-black text-purple-600 leading-none tracking-tight truncate w-full">{user.majorTypes.enneagram}</span>
            </div>
          </div>

          {/* Moral Alignment */}
          <div className="bg-rose-50/20 border border-rose-100/30 p-2 rounded-xl flex flex-col items-center text-center hover:bg-rose-50/30 transition-colors shadow-2xs">
            <span className="text-[7px] font-bold text-rose-400 uppercase tracking-widest mb-0.5">Moral Alignment</span>
            <span className="text-[12.5px] font-black text-rose-600 leading-none tracking-tight truncate w-full">{user.majorTypes.alignment}</span>
          </div>

          {/* Love Language */}
          <div className="bg-amber-50/15 border border-amber-100/30 p-2 rounded-xl flex flex-col items-center text-center hover:bg-amber-50/25 transition-colors shadow-2xs">
            <span className="text-[7px] font-bold text-amber-500 uppercase tracking-widest mb-0.5">Love Language</span>
            <span className="text-[12.5px] font-black text-slate-700 leading-none tracking-tight truncate w-full">{user.majorTypes.loveLanguage}</span>
          </div>

          {/* Attachment Style */}
          <div className="bg-sky-50/15 border border-sky-100/30 p-2 rounded-xl flex flex-col items-center text-center hover:bg-sky-50/25 transition-colors shadow-2xs">
            <span className="text-[7px] font-bold text-sky-500 uppercase tracking-widest mb-0.5">Attachment Style</span>
            <span className="text-[12.5px] font-black text-slate-700 leading-none tracking-tight truncate w-full">{user.majorTypes.attachmentStyle}</span>
          </div>

        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-center border-t border-slate-100 pt-3.5 relative z-10 mt-1">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[8.5px] font-black text-slate-500 uppercase tracking-wider">OMNITYPE.VERCEL.APP</span>
          </div>

          {/* Authentic Mini Barcode */}
          <div className="flex gap-[1px] items-center opacity-30 select-none">
            <div className="w-[1px] h-3 bg-slate-800" />
            <div className="w-[2.5px] h-3 bg-slate-800" />
            <div className="w-[1px] h-3 bg-slate-800" />
            <div className="w-[1px] h-3 bg-slate-800" />
            <div className="w-[3px] h-3 bg-slate-800" />
            <div className="w-[1.5px] h-3 bg-slate-800" />
            <div className="w-[0.5px] h-3 bg-slate-800" />
          </div>
        </div>

      </div>
    </div>
  );
});
