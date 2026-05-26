import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  const activeTests = useMemo(() => [
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
  ], [
    mbtiData, enneagramData, alignmentData, loveLanguagesData, attachmentStylesData,
    darkTriadData, defenseData, instinctualData, tritypeData, colorData,
    jungianData, resilienceData, adhdData, hspData, burnoutData, imposterData
  ]);

  const completedCount = useMemo(() => activeTests.filter(t => t.loaded).length, [activeTests]);

  const results = useMemo(() => [
    { label: "Mind & Thinking", value: mbtiData ? 95 : 30, icon: Brain, color: "from-indigo-500 to-purple-500", desc: "How your mind processes information, solves problems, and creates new thoughts." },
    { label: "Inner Strength", value: defenseData ? 90 : 40, icon: Shield, color: "from-purple-500 to-pink-500", desc: "Your natural strength in handling stressful moments and bouncing back from setbacks." },
    { label: "Heart & Connection", value: alignmentData ? 85 : 35, icon: Heart, color: "from-rose-400 to-pink-500", desc: "How open, warm, and trusting you are in your relationships with others." },
    { label: "Drive & Ambition", value: darkTriadData ? 82 : 25, icon: Zap, color: "from-amber-400 to-orange-500", desc: "Your self-confidence, goal focus, and ability to advocate for yourself." },
    { label: "Social Vibe", value: loveLanguagesData ? 88 : 30, icon: Users, color: "from-emerald-400 to-teal-500", desc: "How deeply you understand and tune into other people's feelings and needs." },
    { label: "Adaptability", value: completedCount >= 4 ? 85 : 35, icon: Compass, color: "from-sky-400 to-blue-500", desc: "How easily you adapt to new situations, embrace change, and flow with life's currents." }
  ], [mbtiData, defenseData, alignmentData, darkTriadData, loveLanguagesData, completedCount]);

  const insights = useMemo(() => {
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
  }, [mbtiData, defenseData, darkTriadData]);

  // Load the major types for the shareable ID Card (MBTI, Enneagram, Alignment, Love Language, Attachment Style)
  const majorTypes = useMemo(() => ({
    mbti: mbtiData ? (mbtiData.type || mbtiData).toUpperCase() : "LOCKED",
    enneagram: enneagramData ? (enneagramData.type || enneagramData) : "LOCKED",
    alignment: alignmentData ? (alignmentData.type || alignmentData) : "LOCKED",
    loveLanguage: loveLanguagesData ? (loveLanguagesData.fullTitle || loveLanguagesData.info?.name || loveLanguagesData) : "LOCKED",
    attachmentStyle: attachmentStylesData ? (attachmentStylesData.fullTitle || attachmentStylesData.info?.name || attachmentStylesData) : "LOCKED"
  }), [mbtiData, enneagramData, alignmentData, loveLanguagesData, attachmentStylesData]);

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
    if (mbtiData) parts.push(`someone who processes the world as an **${mbtiData.type || mbtiData}**`);
    if (alignmentData) parts.push(`guided by a **${alignmentData.type || alignmentData}** heart`);
    if (loveLanguagesData) parts.push(`sharing care and affection through **${loveLanguagesData.fullTitle || loveLanguagesData}**`);
    if (attachmentStylesData) parts.push(`and connecting with others in a **${attachmentStylesData.fullTitle || attachmentStylesData}** way`);

    if (parts.length === 0) {
      return "Start your self-discovery journey by taking assessments below! Your personal story will assemble automatically once you unlock your first personality badge.";
    }
    return `You have a highly unique and beautiful way of being: you are ${parts.join(', ')}. This wonderful mix allows you to stay true to your thoughts while keeping stable, warm relationships and acting with real kindness.`;
  };

  const getSynergyProfile = () => {
    if (completedCount === 0) {
      return {
        title: "A New Beginning",
        badge: "Level 0",
        desc: "Take your first test to unlock your synergy score and start your story!",
        synergyPercent: 0
      };
    }
    if (completedCount <= 2) {
      return {
        title: "Curious Explorer",
        badge: "Level 1",
        desc: "You are starting to connect the pieces of your personality. Unlock at least 3 traits to see unique combination profiles!",
        synergyPercent: 40
      };
    }

    if (mbtiData && enneagramData) {
      return {
        title: `${mbtiData.type || mbtiData} + Enneagram ${enneagramData.type || enneagramData}`,
        badge: "Perfect Duo",
        desc: `Being a ${mbtiData.type || mbtiData} combined with Enneagram Type ${enneagramData.type || enneagramData} means your natural gift for clear thinking blends beautifully with your inner motivations. You're great at turning big dreams into real, thoughtful action while staying deeply in touch with yourself.`,
        synergyPercent: 75
      };
    }

    return {
      title: "Thoughtful Learner",
      badge: "Level 2",
      desc: "You show a beautiful and stable balance across your unlocked traits. Keep exploring the rest of the assessments to complete your entire harmony circle!",
      synergyPercent: 85
    };
  };

  const synergy = useMemo(() => getSynergyProfile(), [completedCount, mbtiData, enneagramData]);
  const narrativeHtml = useMemo(() => generateNarrative(), [mbtiData, alignmentData, loveLanguagesData, attachmentStylesData]);

  const vibeCheck = useMemo(() => {
    let introvertedExtroverted = 50;
    let ideasFacts = 50;
    let logicHeart = 50;
    let structuredSpontaneous = 50;

    if (mbtiData) {
      const type = (mbtiData.type || mbtiData).toUpperCase();
      if (type.includes('I')) introvertedExtroverted = 25;
      if (type.includes('E')) introvertedExtroverted = 75;
      
      if (type.includes('N')) ideasFacts = 25;
      if (type.includes('S')) ideasFacts = 75;
      
      if (type.includes('T')) logicHeart = 25;
      if (type.includes('F')) logicHeart = 75;
      
      if (type.includes('J')) structuredSpontaneous = 25;
      if (type.includes('P')) structuredSpontaneous = 75;
    }

    return {
      ie: introvertedExtroverted,
      ns: ideasFacts,
      tf: logicHeart,
      jp: structuredSpontaneous
    };
  }, [mbtiData]);

  const getBioText = () => {
    const list = [];
    if (mbtiData) list.push(mbtiData.type || mbtiData);
    if (enneagramData) list.push(enneagramData.type || enneagramData);
    if (alignmentData) list.push(alignmentData.type || alignmentData);
    if (loveLanguagesData) list.push(loveLanguagesData.fullTitle || loveLanguagesData);
    if (attachmentStylesData) list.push(attachmentStylesData.fullTitle || attachmentStylesData);
    return `My OmniType Stack: ${list.join(' | ') || 'Unmapped'}. Discover your psychological blueprint at omnitype.co`;
  };  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 selection:bg-indigo-100 uppercase-none relative">

      {/* Background Decorative Blobs matching main site theme */}
      <div className="fixed top-[-20vh] right-[-10vw] w-[60vw] h-[60vw] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] left-[-10vw] w-[50vw] h-[50vw] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header padding and small subtitle block */}
      <div className="w-full pt-32 pb-6 px-6 md:px-12 flex flex-col items-center relative z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* ROW 1: Cinematic Welcome Hero (8 cols) & Basic Info Quick Editor (4 cols) */}
        
        {/* Cinematic Welcome Hero Card */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-2.5 py-1 rounded-full">
                Active Session
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-3">
              Welcome back, <span className="text-indigo-600">{profile.name.split(' ')[0] || "Explorer"}</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base max-w-xl leading-relaxed mb-6">
              Your psychological map is compiled and updated in real-time. Here is your unified brand profile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100/80">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Stack Completion</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-800">{Math.round((completedCount / 16) * 100)}%</span>
                <span className="text-xs font-bold text-slate-400">({completedCount}/16)</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(completedCount / 16) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Identity Tier</span>
              <span className="text-2xl font-black text-indigo-600">
                {completedCount === 0 ? "Observer" : completedCount < 4 ? "Seeker" : completedCount < 8 ? "Architect" : "Apex Sage"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Member Since</span>
              <span className="text-2xl font-black text-slate-800">{profile.memberSince || "May 2026"}</span>
            </div>
          </div>
        </div>

        {/* Basic Profile Quick Editor Card */}
        <div className="lg:col-span-4 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-6 right-6">
            {isEditing ? (
              <div className="flex gap-1.5">
                <button
                  onClick={handleSaveProfile}
                  className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="p-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200/50 hover:border-indigo-100 text-slate-400 hover:text-indigo-600 rounded-full transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Profile Metadata</h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Name</label>
                  <input
                    type="text"
                    value={editName}
                    placeholder="Your Name"
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-xl px-3.5 py-2 font-bold text-sm text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Age</label>
                    <input
                      type="number"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-xl px-3.5 py-2 font-bold text-sm text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Gender</label>
                    <select
                      value={editGender}
                      onChange={(e) => setEditGender(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-indigo-500 outline-none rounded-xl px-2 py-2 font-bold text-sm text-slate-800"
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
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Name</span>
                  <span className="text-xl font-black text-slate-800 tracking-tight block">{profile.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Age</span>
                    <span className="text-xl font-black text-slate-800 block">{profile.age}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Gender</span>
                    <span className="text-xl font-black text-slate-800 block">{profile.gender}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
            <User className="w-3.5 h-3.5 text-indigo-500" />
            <span>Profile Synced with LocalStorage</span>
          </div>
        </div>

        {/* ROW 2: Core Personality Pillars (7 cols) & My Vibe Check (5 cols) */}
        
        {/* Core Personality Pillars Card */}
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-3xl border border-white/85 shadow-[0_20px_50px_rgba(0,0,0,0.02)] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/5 via-purple-500/3 to-transparent rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-500 animate-pulse" />
                Core Personality Pillars
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* MBTI Pillar */}
                <div className={`p-5 rounded-3xl border text-center flex flex-col justify-between min-h-[140px] transition-all duration-300 ${
                  mbtiData 
                    ? 'bg-gradient-to-br from-indigo-50/45 to-white border-indigo-100/50 shadow-2xs' 
                    : 'bg-slate-50/40 border-slate-100/80 text-slate-300'
                }`}>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Cognition</span>
                  {mbtiData ? (
                    <div>
                      <span className="text-2xl font-black text-indigo-600 block leading-tight tracking-tight">{mbtiData.type || mbtiData}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1 block">16 Archetypes</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-lg font-bold text-slate-300 block">LOCKED</span>
                      <Link to="/test/mbti" className="text-[9px] font-bold text-indigo-500 underline mt-2 block uppercase tracking-wider">Unlock</Link>
                    </div>
                  )}
                </div>

                {/* Enneagram Pillar */}
                <div className={`p-5 rounded-3xl border text-center flex flex-col justify-between min-h-[140px] transition-all duration-300 ${
                  enneagramData 
                    ? 'bg-gradient-to-br from-purple-50/45 to-white border-purple-100/50 shadow-2xs' 
                    : 'bg-slate-50/40 border-slate-100/80 text-slate-300'
                }`}>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Motivation</span>
                  {enneagramData ? (
                    <div>
                      <span className="text-2xl font-black text-purple-600 block leading-tight tracking-tight">Type {enneagramData.type || enneagramData}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1 block">Enneagram</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-lg font-bold text-slate-300 block">LOCKED</span>
                      <Link to="/test/enneagram" className="text-[9px] font-bold text-purple-500 underline mt-2 block uppercase tracking-wider">Unlock</Link>
                    </div>
                  )}
                </div>

                {/* Moral Alignment Pillar */}
                <div className={`p-5 rounded-3xl border text-center flex flex-col justify-between min-h-[140px] transition-all duration-300 ${
                  alignmentData 
                    ? 'bg-gradient-to-br from-rose-50/45 to-white border-rose-100/50 shadow-2xs' 
                    : 'bg-slate-50/40 border-slate-100/80 text-slate-300'
                }`}>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Heart</span>
                  {alignmentData ? (
                    <div>
                      <span className="text-xl font-black text-rose-600 block leading-tight tracking-tight truncate">{alignmentData.type || alignmentData}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase mt-1 block">Moral Alignment</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-lg font-bold text-slate-300 block">LOCKED</span>
                      <Link to="/test/alignment" className="text-[9px] font-bold text-rose-500 underline mt-2 block uppercase tracking-wider">Unlock</Link>
                    </div>
                  )}
                </div>

              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
              <Fingerprint className="w-4 h-4 text-indigo-500" />
              <span>Your primary psychological blueprints</span>
            </div>
          </div>
        </div>

        {/* My Vibe Check Card */}
        <div className="lg:col-span-5 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden group">
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
              My Vibe Check
            </h3>
            
            <div className="space-y-5">
              
              {/* Energy balance */}
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 tracking-wider">
                  <span className={vibeCheck.ie <= 50 ? 'text-indigo-600' : 'text-slate-450'}>Introverted</span>
                  <span className={vibeCheck.ie > 50 ? 'text-indigo-600' : 'text-slate-450'}>Extroverted</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 bottom-0 left-[48%] right-[48%] bg-slate-300 rounded-full" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${vibeCheck.ie}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>
              </div>

              {/* Focus balance */}
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 tracking-wider">
                  <span className={vibeCheck.ns <= 50 ? 'text-purple-600' : 'text-slate-450'}>Ideas & Concepts</span>
                  <span className={vibeCheck.ns > 50 ? 'text-purple-600' : 'text-slate-450'}>Facts & Details</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 bottom-0 left-[48%] right-[48%] bg-slate-300 rounded-full" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${vibeCheck.ns}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
              </div>

              {/* Decisions balance */}
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 tracking-wider">
                  <span className={vibeCheck.tf <= 50 ? 'text-rose-500' : 'text-slate-450'}>Logic & Reason</span>
                  <span className={vibeCheck.tf > 50 ? 'text-rose-500' : 'text-slate-450'}>Heart & Feelings</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 bottom-0 left-[48%] right-[48%] bg-slate-300 rounded-full" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${vibeCheck.tf}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-rose-450 rounded-full"
                  />
                </div>
              </div>

              {/* Lifestyle balance */}
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 tracking-wider">
                  <span className={vibeCheck.jp <= 50 ? 'text-amber-500' : 'text-slate-450'}>Structured Plans</span>
                  <span className={vibeCheck.jp > 50 ? 'text-amber-500' : 'text-slate-450'}>Spontaneous Flow</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 bottom-0 left-[48%] right-[48%] bg-slate-300 rounded-full" />
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${vibeCheck.jp}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="mt-4 text-[9px] font-medium text-slate-400">
            {!mbtiData && "Unlock 16 Archetypes (MBTI) to customize your vibe balance sliders."}
          </div>
        </div>

        {/* ROW 3: ID Card Terminal (4 cols) & Neural Map Visualizer (8 cols) */}
        
        {/* ID Card Terminal Cell */}
        <div className="lg:col-span-4 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden group">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Your Verified Pass</h3>
            
            {/* Pristine ID Card Wrapper */}
            <div className="w-full flex justify-center py-2 overflow-hidden rounded-3xl">
              <ShareableIDCard user={{ ...profile, majorTypes, completedCount }} ref={cardRef} />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <p className="text-xs font-medium text-slate-400 leading-relaxed">
              Export your psychological blueprint to showcase on social bios or team spaces.
            </p>
            
            <button
              onClick={downloadCard}
              disabled={isDownloading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5 text-indigo-200" />
              )}
              <span>{isDownloading ? '...' : 'Download ID Card'}</span>
            </button>
          </div>
        </div>

        {/* Neural Map & Visualizer Cell */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between overflow-hidden relative">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              Personality Trait Map
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            </h3>
            
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 max-w-xl">
              Select any quadrant to discover detailed insights. Unlock more elements by completing assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-2">
            {/* Trait Matrix Grid */}
            <div className="md:col-span-6 grid grid-cols-2 gap-3 relative">
              {results.map((res, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTrait(res)}
                  className={`flex flex-col items-start p-4 rounded-3xl border transition-all duration-300 ${
                    selectedTrait?.label === res.label
                      ? 'bg-white border-indigo-200 shadow-md ring-2 ring-indigo-50'
                      : 'bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-xs'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${res.color} flex items-center justify-center text-white shadow-2xs mb-2.5`}>
                    <res.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{res.label}</span>
                  <span className="text-base font-black text-slate-800">{res.value}%</span>
                </motion.button>
              ))}
            </div>

            {/* Trait Bars Module */}
            <div className="md:col-span-6 bg-slate-50/50 border border-slate-100/50 rounded-3xl p-6 relative flex flex-col items-center justify-center min-h-[220px]">
              <TraitBars data={results} />
              
              <AnimatePresence mode="wait">
                {selectedTrait && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-3xl p-6 flex flex-col items-center text-center justify-center border border-indigo-100 shadow-xl z-20"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedTrait.color} flex items-center justify-center text-white mb-3 shadow-md`}>
                      <selectedTrait.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-md font-black text-slate-800 uppercase tracking-tighter mb-1.5">{selectedTrait.label}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                      {selectedTrait.desc}
                    </p>
                    <button
                      onClick={() => setSelectedTrait(null)}
                      className="px-5 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors"
                    >
                      Close Insight
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ROW 4: Personality Stack Unlocks (12 cols) */}
        <div className="lg:col-span-12 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <Layers className="w-5.5 h-5.5 text-indigo-500" />
                Assessment Ecosystem
              </h3>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Unlock all 16 core paradigms to maximize your identity map completeness.
              </p>
            </div>
            <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl px-4 py-2.5 text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">MAP DENSITY</span>
              <span className="text-xl font-black text-indigo-600">{completedCount} <span className="text-slate-300">/</span> 16 UNLOCKED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {activeTests.map((t) => (
              <div
                key={t.id}
                className={`relative p-5 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between min-h-[140px] group ${
                  t.loaded
                    ? 'bg-gradient-to-br from-indigo-50/30 to-white border-indigo-100/40 shadow-[0_4px_12px_rgba(99,102,241,0.02)] hover:shadow-xs'
                    : 'bg-slate-50/30 border-slate-100/80 backdrop-blur-xs'
                }`}
              >
                {!t.loaded && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                )}

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">{t.title}</span>
                  
                  {t.loaded ? (
                    <span className="text-lg font-black text-indigo-600 tracking-tight truncate block pr-2">
                      {t.value}
                    </span>
                  ) : (
                    <span className="text-lg font-bold text-slate-300 tracking-tight block">
                      UNKNOWN
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100/50">
                  {t.loaded ? (
                    <Link
                      to={t.path}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                    >
                      <span>Retake Paradigm</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <Link
                      to={t.path}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-102 shadow-2xs"
                    >
                      <PlusCircle className="w-3 h-3 text-indigo-400" />
                      <span>Take Assessment</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 5: Actionable Growth Guide (12 cols) */}
        <div className="lg:col-span-12 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/80 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <Compass className="w-6 h-6 text-indigo-500 animate-spin-slow" />
                Actionable Growth Tips
              </h3>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Personalized advice unlocked dynamically as you complete your self-discovery surveys.
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-200/50 px-3 py-1.5 rounded-full block self-start">
              Updated Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Superpower Card */}
            <div className="bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-100/40 p-6 rounded-[2rem] transition-all duration-300 shadow-2xs flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-105 transition-transform">
                  <Star className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-850 tracking-tight mb-2">My Superpower</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {mbtiData ? (
                    `Your unique way of processing the world as an ${mbtiData.type || mbtiData} gives you a remarkable gift for long-term vision, recognizing hidden patterns, and building creative solutions.`
                  ) : (
                    "Complete the 16 Archetypes assessment to discover your dynamic mental superpower and how to leverage it daily."
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mind & Focus</span>
                {!mbtiData && (
                  <Link to="/test/mbti" className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-0.5">
                    Unlock <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>

            {/* Relationship Vibe Card */}
            <div className="bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-pink-100/40 p-6 rounded-[2rem] transition-all duration-300 shadow-2xs flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-rose-50/55 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-850 tracking-tight mb-2">My Relationship Vibe</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {loveLanguagesData || attachmentStylesData ? (
                    `You thrive best when relationships are built on honest trust and clear feelings. Communicating through ${loveLanguagesData?.fullTitle || "your love language"} makes you highly receptive and supportive.`
                  ) : (
                    "Complete your Love Languages or Attachment Styles surveys to map how you connect with others and foster deep relationships."
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Connection Vibe</span>
                {(!loveLanguagesData || !attachmentStylesData) && (
                  <Link to="/test/love-languages" className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:underline flex items-center gap-0.5">
                    Unlock <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>

            {/* Growth Challenge Card */}
            <div className="bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-amber-100/40 p-6 rounded-[2rem] transition-all duration-300 shadow-2xs flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50/55 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-850 tracking-tight mb-2">My Growth Area</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {alignmentData || defenseData ? (
                    "When under pressure, your instincts naturally step in to keep you safe. Practice pausing in tense moments, taking a breath, and expressing yourself honestly from a place of warm heart."
                  ) : (
                    "Unlock Moral Alignment and Defense Mechanisms to discover how you handle challenges and get actionable exercises to level up your resilience."
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Growth & Peace</span>
                {(!alignmentData || !defenseData) && (
                  <Link to="/test/alignment" className="text-[9px] font-black text-amber-600 uppercase tracking-widest hover:underline flex items-center gap-0.5">
                    Unlock <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
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
