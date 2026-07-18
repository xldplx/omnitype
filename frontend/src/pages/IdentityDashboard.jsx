import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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
  Users,
  ChevronRight,
  Lock,
  Layers,
  Edit2,
  Check,
  X,
  PlusCircle,
  Copy,
  Compass,
  Award,
  Upload,
  Calendar,
  Smile
} from 'lucide-react';

const DEFAULT_PROFILE = {
  name: "Your Name",
  age: 25,
  gender: "Non-Binary",
  memberSince: "May 2026",
  showAge: true,
  showGender: true,
  avatarUrl: ""
};

const CARD_THEMES = {
  minimal: {
    name: 'Minimal Slate',
    bg: 'bg-white',
    text: 'text-slate-800',
    border: 'border-slate-100',
    headerBg: 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200',
    headerText: 'text-slate-800',
    fingerprintColor: 'text-slate-400',
    badgeBg: 'bg-slate-50/50 border-slate-200/30 hover:bg-slate-55',
    badgeText: 'text-slate-800 font-extrabold',
    badgeLabel: 'text-slate-400',
    footerBorder: 'border-slate-100',
    barcodeColor: 'bg-slate-800'
  },
  midnight: {
    name: 'Midnight Eclipse',
    bg: 'bg-zinc-955',
    text: 'text-zinc-100',
    border: 'border-zinc-800',
    headerBg: 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-black',
    headerText: 'text-zinc-100',
    fingerprintColor: 'text-indigo-400/60',
    badgeBg: 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-900',
    badgeText: 'text-zinc-200 font-extrabold',
    badgeLabel: 'text-indigo-400',
    footerBorder: 'border-zinc-900',
    barcodeColor: 'bg-zinc-300'
  },
  sunset: {
    name: 'Sunset Aura',
    bg: 'bg-gradient-to-b from-[#fffaf7] to-[#fff5f0]',
    text: 'text-amber-900',
    border: 'border-amber-100/50',
    headerBg: 'bg-gradient-to-br from-amber-500 via-rose-500 to-pink-500',
    headerText: 'text-white',
    fingerprintColor: 'text-amber-200/50',
    badgeBg: 'bg-amber-50/40 border-amber-200/20 hover:bg-amber-50/60',
    badgeText: 'text-amber-900 font-extrabold',
    badgeLabel: 'text-rose-500',
    footerBorder: 'border-amber-100/30',
    barcodeColor: 'bg-amber-950'
  },
  emerald: {
    name: 'Emerald Forest',
    bg: 'bg-gradient-to-b from-[#fbfdfa] to-[#f4f9f2]',
    text: 'text-emerald-900',
    border: 'border-emerald-100/50',
    headerBg: 'bg-gradient-to-br from-emerald-600 to-teal-700',
    headerText: 'text-white',
    fingerprintColor: 'text-emerald-200/50',
    badgeBg: 'bg-emerald-50/40 border-emerald-200/20 hover:bg-emerald-50/60',
    badgeText: 'text-emerald-900 font-extrabold',
    badgeLabel: 'text-emerald-650',
    footerBorder: 'border-emerald-100/30',
    barcodeColor: 'bg-emerald-900'
  },
  midnightLavender: {
    name: 'Midnight Lavender',
    bg: 'bg-zinc-950',
    text: 'text-purple-100',
    border: 'border-purple-900/40',
    headerBg: 'bg-gradient-to-br from-purple-900 via-indigo-950 to-zinc-950',
    headerText: 'text-purple-100',
    fingerprintColor: 'text-purple-400/50',
    badgeBg: 'bg-purple-950/40 border-purple-900/30 hover:bg-purple-900/50',
    badgeText: 'text-purple-250 font-extrabold',
    badgeLabel: 'text-purple-400',
    footerBorder: 'border-purple-900',
    barcodeColor: 'bg-purple-400'
  },
  auroraHolo: {
    name: 'Aurora Holo',
    bg: 'bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-100',
    text: 'text-slate-900',
    border: 'border-white/50',
    headerBg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    headerText: 'text-white',
    fingerprintColor: 'text-white/40',
    badgeBg: 'bg-white/60 border-white/80 hover:bg-white/80',
    badgeText: 'text-slate-900 font-extrabold',
    badgeLabel: 'text-indigo-600',
    footerBorder: 'border-white/40',
    barcodeColor: 'bg-slate-800'
  },
  oceanAura: {
    name: 'Ocean Aura',
    bg: 'bg-gradient-to-b from-[#f5fbfd] to-[#ebf7fc]',
    text: 'text-sky-905',
    border: 'border-sky-100',
    headerBg: 'bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700',
    headerText: 'text-white',
    fingerprintColor: 'text-sky-200/50',
    badgeBg: 'bg-sky-50/40 border-sky-200/20 hover:bg-sky-50/60',
    badgeText: 'text-sky-900 font-extrabold',
    badgeLabel: 'text-sky-600',
    footerBorder: 'border-sky-100/30',
    barcodeColor: 'bg-sky-900'
  },
  cherryBlossom: {
    name: 'Cherry Blossom',
    bg: 'bg-gradient-to-b from-[#fffafb] to-[#fff0f3]',
    text: 'text-rose-900',
    border: 'border-rose-100',
    headerBg: 'bg-gradient-to-br from-rose-400 to-pink-500',
    headerText: 'text-white',
    fingerprintColor: 'text-rose-200/50',
    badgeBg: 'bg-rose-50/40 border-rose-200/20 hover:bg-rose-50/60',
    badgeText: 'text-rose-900 font-extrabold',
    badgeLabel: 'text-rose-500',
    footerBorder: 'border-rose-100/30',
    barcodeColor: 'bg-rose-900'
  },
  goldDust: {
    name: 'Gold Dust',
    bg: 'bg-zinc-950',
    text: 'text-amber-100',
    border: 'border-amber-900/30',
    headerBg: 'bg-gradient-to-br from-zinc-800 via-amber-600 to-zinc-950',
    headerText: 'text-amber-100',
    fingerprintColor: 'text-amber-500/40',
    badgeBg: 'bg-zinc-900/60 border-amber-950 hover:bg-zinc-900',
    badgeText: 'text-amber-200 font-extrabold',
    badgeLabel: 'text-amber-500',
    footerBorder: 'border-zinc-900',
    barcodeColor: 'bg-amber-500'
  },
  roseQuartz: {
    name: 'Rose Quartz',
    bg: 'bg-gradient-to-b from-[#fffafb] to-[#fff3f6]',
    text: 'text-rose-900',
    border: 'border-rose-150',
    headerBg: 'bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400',
    headerText: 'text-white',
    fingerprintColor: 'text-rose-200/50',
    badgeBg: 'bg-rose-50/30 border-rose-200/20 hover:bg-rose-50/50',
    badgeText: 'text-rose-900 font-extrabold',
    badgeLabel: 'text-purple-500',
    footerBorder: 'border-rose-150/40',
    barcodeColor: 'bg-rose-700'
  },
  cyberPunk: {
    name: 'Cyberpunk',
    bg: 'bg-zinc-950',
    text: 'text-cyan-400',
    border: 'border-fuchsia-900/50',
    headerBg: 'bg-gradient-to-br from-fuchsia-600 via-violet-800 to-cyan-500',
    headerText: 'text-white font-extrabold',
    fingerprintColor: 'text-fuchsia-400/40',
    badgeBg: 'bg-zinc-900/70 border-fuchsia-500/30 hover:bg-zinc-900',
    badgeText: 'text-fuchsia-300 font-extrabold',
    badgeLabel: 'text-cyan-400',
    footerBorder: 'border-fuchsia-900/30',
    barcodeColor: 'bg-cyan-400'
  },
  monochrome: {
    name: 'Monochrome',
    bg: 'bg-white',
    text: 'text-black',
    border: 'border-black',
    headerBg: 'bg-black',
    headerText: 'text-white font-black',
    fingerprintColor: 'text-white/20',
    badgeBg: 'bg-white border-black hover:bg-black/5',
    badgeText: 'text-black font-extrabold',
    badgeLabel: 'text-black/60',
    footerBorder: 'border-black',
    barcodeColor: 'bg-black'
  }
};

export default function IdentityDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState(25);
  const [editGender, setEditGender] = useState("");
  const [editShowAge, setEditShowAge] = useState(true);
  const [editShowGender, setEditShowGender] = useState(true);
  const [editAvatar, setEditAvatar] = useState("");
  
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [cardTheme, setCardTheme] = useState('minimal');

  const fileInputRef = useRef(null);

  // Test data states
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

  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('omnitype_user_profile');
    if (savedProfile) {
      try { 
        const parsed = JSON.parse(savedProfile);
        setProfile({
          ...DEFAULT_PROFILE,
          ...parsed
        });
      } catch (e) { console.error(e); }
    }

    const loadLocal = (key, setter) => {
      const val = localStorage.getItem(key);
      if (val) {
        try { setter(JSON.parse(val)); } catch (e) { setter({ type: val }); }
      }
    };

    loadLocal('omnitype_mbti', setMbtiData);
    loadLocal('omnitype_enneagram', setEnneagramData);
    loadLocal('omnitype_alignment', setAlignmentData);
    loadLocal('omnitype_dark_triad', setDarkTriadData);
    loadLocal('omnitype_defense', setDefenseData);
    loadLocal('omnitype_love_languages', setLoveLanguagesData);
    loadLocal('omnitype_attachment_styles', setAttachmentStylesData);
    loadLocal('omnitype_instinctual_variants', setInstinctualData);
    loadLocal('omnitype_tritype', setTritypeData);
    loadLocal('omnitype_color_psychology', setColorData);
    loadLocal('omnitype_jungian_archetypes', setJungianData);
    loadLocal('omnitype_resilience', setResilienceData);
    loadLocal('omnitype_adhd', setAdhdData);
    loadLocal('omnitype_hsp', setHspData);
    loadLocal('omnitype_burnout', setBurnoutData);
    loadLocal('omnitype_imposter', setImposterData);
  }, []);

  const handleEditClick = () => {
    setEditName(profile.name);
    setEditAge(profile.age);
    setEditGender(profile.gender);
    setEditShowAge(profile.showAge ?? true);
    setEditShowGender(profile.showGender ?? true);
    setEditAvatar(profile.avatarUrl || "");
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    const updated = {
      ...profile,
      name: editName || profile.name,
      age: parseInt(editAge) || profile.age,
      gender: editGender || profile.gender,
      showAge: editShowAge,
      showGender: editShowGender,
      avatarUrl: editAvatar
    };
    setProfile(updated);
    localStorage.setItem('omnitype_user_profile', JSON.stringify(updated));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('omnitype_user_profile');
    navigate('/login');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Categories organization matching the homepage
  const categories = useMemo(() => [
    {
      id: 'cognition',
      title: "Personality & Thinking",
      tests: [
        { id: 'mbti', title: '16 Archetypes', value: mbtiData?.type || (typeof mbtiData === 'string' ? mbtiData : null), path: '/test/mbti', loaded: !!mbtiData },
        { id: 'jungian-archetypes', title: 'Jungian Archetypes', value: jungianData?.type || (typeof jungianData === 'string' ? jungianData : null), path: '/test/jungian-archetypes', loaded: !!jungianData },
        { id: 'alignment', title: 'Moral Alignment', value: alignmentData?.type || (typeof alignmentData === 'string' ? alignmentData : null), path: '/test/alignment', loaded: !!alignmentData },
      ]
    },
    {
      id: 'motivation',
      title: "Motivations & Drive",
      tests: [
        { id: 'enneagram', title: 'The Enneagram', value: enneagramData?.type || (typeof enneagramData === 'string' ? enneagramData : null), path: '/test/enneagram', loaded: !!enneagramData },
        { id: 'tritype', title: 'Tritype', value: tritypeData?.type || (typeof tritypeData === 'string' ? tritypeData : null), path: '/test/tritype', loaded: !!tritypeData },
        { id: 'instinctual-variants', title: 'Instinctual Variants', value: instinctualData?.type || (typeof instinctualData === 'string' ? instinctualData : null), path: '/test/instinctual-variants', loaded: !!instinctualData },
      ]
    },
    {
      id: 'relational',
      title: "Relationships & Connection",
      tests: [
        { id: 'love-languages', title: 'Love Languages', value: loveLanguagesData?.fullTitle || (typeof loveLanguagesData === 'string' ? loveLanguagesData : null), path: '/test/love-languages', loaded: !!loveLanguagesData },
        { id: 'attachment-styles', title: 'Attachment Styles', value: attachmentStylesData?.fullTitle || (typeof attachmentStylesData === 'string' ? attachmentStylesData : null), path: '/test/attachment-styles', loaded: !!attachmentStylesData },
      ]
    },
    {
      id: 'stress',
      title: "Stress & Neurodiversity",
      tests: [
        { id: 'resilience', title: 'Resilience Quotient', value: resilienceData?.type || (typeof resilienceData === 'string' ? resilienceData : null), path: '/test/resilience', loaded: !!resilienceData },
        { id: 'adhd', title: 'ADHD Assessment', value: adhdData?.type || (typeof adhdData === 'string' ? adhdData : null), path: '/test/adhd', loaded: !!adhdData },
        { id: 'hsp', title: 'Highly Sensitive Person', value: hspData?.type || (typeof hspData === 'string' ? hspData : null), path: '/test/hsp', loaded: !!hspData },
        { id: 'burnout', title: 'Burnout Index', value: burnoutData?.type || (typeof burnoutData === 'string' ? burnoutData : null), path: '/test/burnout', loaded: !!burnoutData },
      ]
    },
    {
      id: 'shadow',
      title: "The Shadow Self",
      tests: [
        { id: 'dark-triad', title: 'The Dark Triad', value: darkTriadData?.info?.name || (typeof darkTriadData === 'string' ? darkTriadData : null), path: '/test/dark-triad', loaded: !!darkTriadData },
        { id: 'defense', title: 'Defense Mechanisms', value: defenseData?.info?.name || (typeof defenseData === 'string' ? defenseData : null), path: '/test/defense', loaded: !!defenseData },
        { id: 'imposter', title: 'Imposter Syndrome', value: imposterData?.type || (typeof imposterData === 'string' ? imposterData : null), path: '/test/imposter', loaded: !!imposterData }
      ]
    },
    {
      id: 'philosophy',
      title: "Style & Values",
      tests: [
        { id: 'color-psychology', title: 'Color Psychology', value: colorData?.type || (typeof colorData === 'string' ? colorData : null), path: '/test/color-psychology', loaded: !!colorData },
      ]
    }
  ], [
    mbtiData, enneagramData, alignmentData, loveLanguagesData, attachmentStylesData,
    darkTriadData, defenseData, instinctualData, tritypeData, colorData,
    jungianData, resilienceData, adhdData, hspData, burnoutData, imposterData
  ]);

  const allTests = useMemo(() => categories.flatMap(c => c.tests), [categories]);
  const completedCount = useMemo(() => allTests.filter(t => t.loaded).length, [allTests]);

  // Dynamic Aura Glow based on Color Psychology result
  const dynamicColorGlow = useMemo(() => {
    const colorKey = (colorData?.dominantArchetype || colorData?.type || (typeof colorData === 'string' ? colorData : '')).toLowerCase();
    const glows = {
      red: 'bg-rose-500/10',
      blue: 'bg-sky-500/10',
      green: 'bg-emerald-500/10',
      yellow: 'bg-amber-400/10',
      purple: 'bg-purple-500/10',
      orange: 'bg-orange-500/10',
      indigo: 'bg-indigo-500/10',
      violet: 'bg-fuchsia-500/10',
      teal: 'bg-teal-500/10',
    };
    return glows[colorKey] || 'bg-indigo-500/5';
  }, [colorData]);

  // Radar chart calculations for Cognitive Fingerprint
  const radarMetrics = useMemo(() => {
    return categories.map((cat) => {
      const loadedCount = cat.tests.filter(t => t.loaded).length;
      const totalCount = cat.tests.length;
      return {
        label: cat.title.split(' & ')[0],
        score: totalCount > 0 ? (loadedCount / totalCount) : 0,
      };
    });
  }, [categories]);

  const radarPoints = useMemo(() => {
    const center = 75;
    const maxRadius = 55;
    const totalPoints = radarMetrics.length;
    
    return radarMetrics.map((m, i) => {
      const angle = (i * 2 * Math.PI) / totalPoints - Math.PI / 2;
      const radius = maxRadius * (0.15 + 0.85 * m.score);
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y, label: m.label, score: m.score };
    });
  }, [radarMetrics]);

  const radarPointsString = useMemo(() => radarPoints.map(p => `${p.x},${p.y}`).join(' '), [radarPoints]);

  // SVG Circular Chart calculations
  const radialChart = useMemo(() => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (completedCount / 16) * circumference;
    return { radius, circumference, strokeDashoffset };
  }, [completedCount]);

  // Cognitive Scales mapping based on MBTI
  const cognitiveScales = useMemo(() => {
    let ie = 50, ns = 50, tf = 50, jp = 50;
    if (mbtiData) {
      if (mbtiData.percentages) {
        ie = mbtiData.percentages.EI;
        ns = mbtiData.percentages.SN;
        tf = 100 - mbtiData.percentages.TF;
        jp = 100 - mbtiData.percentages.JP;
      } else {
        const type = (mbtiData.type || mbtiData).toUpperCase();
        if (type.includes('I')) ie = 25;
        if (type.includes('E')) ie = 75;
        if (type.includes('N')) ns = 25;
        if (type.includes('S')) ns = 75;
        if (type.includes('T')) tf = 25;
        if (type.includes('F')) tf = 75;
        if (type.includes('J')) jp = 25;
        if (type.includes('P')) jp = 75;
      }
    }
    return [
      { label: "Energy Focus", left: "Introversion", right: "Extroversion", value: ie, color: "bg-indigo-500" },
      { label: "Information Intake", left: "Intuition", right: "Sensing", value: ns, color: "bg-purple-500" },
      { label: "Decision Criteria", left: "Thinking", right: "Feeling", value: tf, color: "bg-rose-500" },
      { label: "Lifestyle Orientation", left: "Structuring", right: "Adapting", value: jp, color: "bg-amber-500" }
    ];
  }, [mbtiData]);

  // Soul Fusion Synergy Combination Logic
  const soulFusion = useMemo(() => {
    if (!mbtiData || !enneagramData) return null;
    const mbti = (mbtiData.type || mbtiData).toUpperCase();
    const enneagram = String(enneagramData.type || enneagramData).replace(/\D/g, '');
    
    const combos = {
      'INTJ-3': { title: "The Strategic Architect", desc: "A powerful combination of strategic vision and relentless ambition. You execute long-term goals with absolute focus, combining logic with a drive for high performance." },
      'INTJ-5': { title: "The Mastermind Strategist", desc: "An intensely intellectual combination. You seek systemic understanding, mapping out complex systems with detached logic and deep focus." },
      'INFJ-4': { title: "The Empathetic Idealist", desc: "A creative, deep identity focused on authenticity. You seek to understand the human condition, driven by deep values and a desire to help others grow." },
      'INFJ-9': { title: "The Harmonious Counselor", desc: "A peaceful presence. You seek internal and external harmony, utilizing deep empathy to guide others gently toward understanding." },
      'INFP-4': { title: "The Creative Dreamer", desc: "A deeply authentic and creative spirit. Your rich inner world guides your artistic, moral, and emotional expression." },
      'INFP-9': { title: "The Gentle Healer", desc: "An idealistic searcher of peace. You blend deep personal values with an easygoing, supportive nature to heal division." },
      'INTP-5': { title: "The Objective Analyst", desc: "Pure logical exploration. You take apart theories, look for flaws, and seek underlying principles with objective detachment." },
      'ENTJ-3': { title: "The High-Performance Commander", desc: "An unstoppable force. You organize groups, execute projects, and scale new heights with charismatic leadership and high efficiency." },
      'ENFJ-2': { title: "The Supportive Guide", desc: "A natural cultivator of potential. You lead with warm energy, encouraging others and organizing communities for collective good." },
      'ENFP-7': { title: "The Inspired Innovator", desc: "Enthusiastic explorer of possibilities. You spark inspiration everywhere, generating ideas and connecting people with contagious warmth." }
    };
    
    const key = `${mbti}-${enneagram}`;
    return combos[key] || {
      title: `${mbti} • Type ${enneagram}`,
      desc: `Your ${mbti} cognitive architecture blends with your Enneagram Type ${enneagram} core motivation. This creates a balanced focus between logical planning, personal growth, and authentic goals.`
    };
  }, [mbtiData, enneagramData]);

  const majorTypes = useMemo(() => ({
    mbti: mbtiData ? (mbtiData.type || mbtiData).toUpperCase() : "LOCKED",
    enneagram: enneagramData ? (enneagramData.type || enneagramData) : "LOCKED",
    alignment: alignmentData ? (alignmentData.type || alignmentData) : "LOCKED",
    loveLanguage: loveLanguagesData ? (loveLanguagesData.fullTitle || loveLanguagesData) : "LOCKED",
    attachmentStyle: attachmentStylesData ? (attachmentStylesData.fullTitle || attachmentStylesData) : "LOCKED"
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
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 1.0, pixelRatio: 3 });
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

  const getBioText = () => {
    const list = [];
    if (mbtiData) list.push(mbtiData.type || mbtiData);
    if (enneagramData) list.push(enneagramData.type || enneagramData);
    if (alignmentData) list.push(alignmentData.type || alignmentData);
    return `My OmniType Blueprint: ${list.join(' | ') || 'Unmapped'}. Discover yours at ${window.location.host}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#fafafa] pb-32 relative text-slate-800 font-sans selection:bg-indigo-100">
      {/* Soft Dynamic Background Auras */}
      <div className={`fixed top-[-10vh] right-[-10vw] w-[50vw] h-[50vw] rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-1000 ${dynamicColorGlow}`} />
      <div className="fixed bottom-[-10vh] left-[-10vw] w-[40vw] h-[40vw] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header and greeting */}
      <div className="pt-32 pb-8 px-6 max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-2">My Profile</h1>
        <p className="text-slate-500 font-medium text-sm md:text-base">Review your custom psychometric profile and export your Shareable Identity Card.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT COLUMN: Overview, Identity Details, & Cognitive Scales */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Welcome & Circle Progress Chart */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-3 text-center sm:text-left">
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                Hello, <span className="text-indigo-600">{profile.name.split(' ')[0]}</span>
              </h2>
              <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                Your psychological profile compiles in real-time as you complete assessments. Check out your completion rates and identity overview.
              </p>
            </div>
            
            {/* SVG Circle Graph */}
            <div className="relative flex items-center justify-center w-28 h-28 shrink-0 bg-slate-50 rounded-full border border-slate-100 shadow-inner">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r={radialChart.radius}
                  className="text-slate-200"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="transparent"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r={radialChart.radius}
                  className="text-indigo-600"
                  strokeWidth="5"
                  strokeDasharray={radialChart.circumference}
                  initial={{ strokeDashoffset: radialChart.circumference }}
                  animate={{ strokeDashoffset: radialChart.strokeDashoffset }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-900 leading-none">{Math.round((completedCount / 16) * 100)}%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{completedCount}/16</span>
              </div>
            </div>
          </div>

          {/* Identity Details Editor (Visually Appealing & Premium Card Layout) */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Identity Details</h3>
              {isEditing ? (
                <div className="flex gap-2">
                  <button onClick={handleSaveProfile} className="px-4 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-full font-bold text-xs flex items-center gap-1 transition shadow-sm cursor-pointer border border-indigo-600">
                    <Check className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full font-bold text-xs flex items-center gap-1 hover:bg-slate-200 transition cursor-pointer border border-slate-200">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleEditClick} className="px-4 py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200/50 hover:border-indigo-100 text-slate-400 hover:text-indigo-600 rounded-full font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer">
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Profile
                  </button>
                  <button onClick={handleLogout} className="px-4 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-full font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer">
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-6">
                {/* Image upload row */}
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                  <div className="relative w-16 h-16 rounded-full bg-white p-[2px] border border-slate-200 shrink-0">
                    {editAvatar ? (
                      <img src={editAvatar} alt="Preview" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 text-center sm:text-left w-full sm:w-auto">
                    <h4 className="text-xs font-bold text-slate-800">Profile Photo</h4>
                    <p className="text-[10px] text-slate-400">Upload a custom image to display on your dashboard and shareable identity card.</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-xl transition inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      Upload Image
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preferred Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none rounded-xl px-4 py-2.5 font-bold text-sm text-slate-800 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Age</label>
                    <input
                      type="number"
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none rounded-xl px-4 py-2.5 font-bold text-sm text-slate-800 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gender Identity</label>
                    <select
                      value={editGender}
                      onChange={(e) => setEditGender(e.target.value)}
                      className="bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none rounded-xl px-3 py-2.5 font-bold text-sm text-slate-800 transition cursor-pointer"
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
                
                {/* Privacy check-toggles */}
                <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-600">
                    <input
                      type="checkbox"
                      checked={editShowAge}
                      onChange={(e) => setEditShowAge(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-650 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span>Show Age on Profile & Card</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-600">
                    <input
                      type="checkbox"
                      checked={editShowGender}
                      onChange={(e) => setEditShowGender(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-650 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span>Show Gender on Profile & Card</span>
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50/40 rounded-3xl p-6 border border-slate-100/50">
                {/* Profile Pic Circle */}
                <div className="w-20 h-20 rounded-full bg-white p-[3px] border border-slate-200/50 shadow-xs shrink-0 flex items-center justify-center">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="w-7 h-7" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-center sm:text-left">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                      <User className="w-3 h-3 text-indigo-500" /> Name
                    </span>
                    <span className="text-base font-bold text-slate-900 block">{profile.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                      <Smile className="w-3 h-3 text-indigo-500" /> Age
                    </span>
                    <span className="text-base font-bold text-slate-900 block">
                      {profile.showAge ?? true ? profile.age : <span className="text-slate-400 italic text-xs">Hidden</span>}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                      <Users className="w-3 h-3 text-indigo-500" /> Gender
                    </span>
                    <span className="text-base font-bold text-slate-900 block">
                      {profile.showGender ?? true ? profile.gender : <span className="text-slate-400 italic text-xs">Hidden</span>}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                      <Calendar className="w-3 h-3 text-indigo-500" /> Enrolled
                    </span>
                    <span className="text-base font-bold text-slate-900 block">{profile.memberSince}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Soul Fusion Synergy Combination */}
          {soulFusion && (
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-[60px]" />
              <div className="relative z-10 space-y-4">
                <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-full inline-block">
                  Soul Fusion Synergy
                </span>
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">{soulFusion.title}</h3>
                <p className="text-slate-505 text-xs leading-relaxed font-medium max-w-2xl">{soulFusion.desc}</p>
              </div>
            </div>
          )}

          {/* Cognitive Map and Radar Fingerprint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Cognitive Fingerprint Polygon Map */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between items-center text-center">
              <div className="w-full text-left mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cognitive Fingerprint</h3>
                <p className="text-[10px] text-slate-400 mt-1">Interactive mapping based on categories completed.</p>
              </div>

              {completedCount > 0 ? (
                <div className="w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 150 150">
                    {/* Outer boundary hexagon */}
                    <polygon
                      points="75,20 122.6,47.5 122.6,102.5 75,130 27.4,102.5 27.4,47.5"
                      className="fill-transparent stroke-slate-100"
                      strokeWidth="1.5"
                    />
                    {/* Inner layers */}
                    <polygon
                      points="75,47.5 101.3,62.7 101.3,93.2 75,108.4 48.7,93.2 48.7,62.7"
                      className="fill-transparent stroke-slate-100"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <polygon
                      points="75,61.2 89.3,69.5 89.3,86.1 75,94.4 60.7,86.1 60.7,69.5"
                      className="fill-transparent stroke-slate-100"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    
                    {/* Category Spoke Lines */}
                    {radarPoints.map((p, i) => (
                      <line
                        key={i}
                        x1="75"
                        y1="75"
                        x2={75 + 55 * Math.cos((i * 2 * Math.PI) / 6 - Math.PI / 2)}
                        y2={75 + 55 * Math.sin((i * 2 * Math.PI) / 6 - Math.PI / 2)}
                        className="stroke-slate-100/60"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Active completed fingerprint shape */}
                    <polygon
                      points={radarPointsString}
                      className="fill-indigo-500/25 stroke-indigo-600"
                      strokeWidth="2"
                    />
                    
                    {/* Center point */}
                    <circle cx="75" cy="75" r="3" className="fill-indigo-600" />
                  </svg>
                </div>
              ) : (
                <div className="py-8">
                  <Compass className="w-8 h-8 text-slate-300 mx-auto mb-2 animate-spin-slow" />
                  <p className="text-[10px] text-slate-400 font-medium">Complete at least one quiz to map fingerprint shape.</p>
                </div>
              )}

              <div className="w-full grid grid-cols-3 gap-1 mt-4">
                {radarPoints.map((p, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-tight block truncate w-full">{p.label}</span>
                    <span className="text-[10px] font-black text-slate-800">{Math.round(p.score * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cognitive Architecture Sliders */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between">
              <div className="w-full text-left mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cognitive Architecture</h3>
              </div>
              
              {mbtiData ? (
                <div className="space-y-4">
                  {cognitiveScales.map((scale, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                        <span className={scale.value <= 50 ? "text-slate-800" : ""}>{scale.left}</span>
                        <span className="text-[8px] uppercase text-slate-300 tracking-wider font-semibold">{scale.label}</span>
                        <span className={scale.value > 50 ? "text-slate-800" : ""}>{scale.right}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scale.value}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full ${scale.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 my-auto">
                  <Brain className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                    Unlock <Link to="/test/mbti" className="text-indigo-650 underline font-semibold">16 Archetypes</Link> to map variables.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Assessment Ecosystem */}
          <div className="space-y-8">
            <div className="border-t border-slate-200/60 pt-6">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Assessment Ecosystem</h3>
              <p className="text-slate-500 text-sm">Complete core psychological paradigms to map your personality stack.</p>
            </div>

            {categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l-2 border-indigo-500 pl-2">{category.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {category.tests.map((t) => (
                    <div
                      key={t.id}
                      className={`p-6 rounded-[2rem] border transition-all duration-305 flex flex-col justify-between min-h-[130px] ${
                        t.loaded
                          ? 'bg-white border-slate-100 shadow-xs hover:border-slate-200'
                          : 'bg-slate-50/50 border-slate-200/30'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block truncate">{category.title}</span>
                          {!t.loaded && <Lock className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                        </div>
                        <span className="text-base font-bold text-slate-850 block mt-1 leading-tight">{t.title}</span>
                        {t.loaded ? (
                          <span className="text-xs font-semibold text-indigo-600 mt-1 block truncate">{t.value}</span>
                        ) : (
                          <span className="text-xs text-slate-350 mt-1 block">Locked</span>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center">
                        {t.loaded ? (
                          <Link to={t.path} className="text-[9px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest inline-flex items-center gap-1 transition">
                            <span>Retake</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </Link>
                        ) : (
                          <Link to={t.path} className="text-[9px] font-bold text-indigo-650 hover:text-indigo-850 uppercase tracking-widest inline-flex items-center gap-1 transition">
                            <span>Start Assessment</span>
                            <PlusCircle className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Shareable Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] sticky top-24">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Shareable Identity Card</h3>
            
            {/* The Card Preview (Tight, aspect-[4/5] shape with zero empty space) */}
            <div className="w-full flex justify-center py-2 overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100">
              <ShareableIDCard user={{ ...profile, majorTypes }} theme={cardTheme} ref={cardRef} />
            </div>

            {/* Interactive Theme Selector */}
            <div className="mt-5 space-y-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Select Card Style</span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CARD_THEMES).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setCardTheme(key)}
                    className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition truncate ${
                      cardTheme === key
                        ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 font-extrabold'
                        : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                    }`}
                  >
                    {config.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed">
                Export your verified stack pass to display in your social profiles, links page, or team bios.
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={downloadCard}
                  disabled={isDownloading}
                  className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isDownloading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>{isDownloading ? 'Downloading...' : 'Download Card'}</span>
                </button>
                
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-3.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 transition cursor-pointer"
                  title="Share profile link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-7 max-w-md w-full border border-slate-100 shadow-xl relative"
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-5 right-5 p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Share2 className="w-4.5 h-4.5 text-indigo-500" />
                Share Your Stack
              </h3>
              <p className="text-slate-505 text-xs mb-5 leading-relaxed">
                Copy this text to showcase your psychometric stats in your social media bio.
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 font-mono text-xs text-slate-600 mb-5 select-all relative">
                {getBioText()}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-3 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition text-slate-700"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Profile Link'}</span>
                </button>
                
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getBioText());
                    setShowShareModal(false);
                  }}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Check className="w-3.5 h-3.5" />
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

// Clean Shorter Card with exact absolute/relative alignments
const ShareableIDCard = React.forwardRef(({ user, theme }, ref) => {
  const tConfig = CARD_THEMES[theme] || CARD_THEMES.minimal;

  const metadataText = useMemo(() => {
    const showAge = user.showAge ?? true;
    const showGender = user.showGender ?? true;
    if (!showAge && !showGender) return "IDENTITY PASS";
    return [
      showGender ? user.gender : null,
      showAge ? `AGE ${user.age}` : null
    ].filter(Boolean).join(' • ');
  }, [user.showAge, user.showGender, user.gender, user.age]);
  
  return (
    <div
      ref={ref}
      className={`relative w-full max-w-[280px] aspect-[4/5] rounded-3xl overflow-hidden flex flex-col justify-between p-0 border shadow-md shrink-0 transition-all ${tConfig.bg} ${tConfig.text} ${tConfig.border}`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Mesh / Gradient Top Header */}
      <div className={`relative h-[24%] bg-gradient-to-br ${tConfig.headerBg} px-4 py-3 flex flex-col justify-between overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-center relative z-10 w-full">
          <div className={`flex items-center gap-1.5 ${tConfig.headerText}`}>
            <Fingerprint className="w-4.5 h-4.5 opacity-80" />
            <span className="text-[10px] font-black tracking-widest uppercase">OMNITYPE</span>
          </div>
        </div>
      </div>

      {/* Avatar Container sitting precisely on the border box */}
      <div className="absolute top-[24%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white p-[2px] shadow-sm flex items-center justify-center border border-slate-100/50">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <User className="w-4.5 h-4.5 text-indigo-500 animate-none" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="h-[76%] px-4 pb-2 pt-6.5 flex flex-col justify-between">
        
        {/* Profile Identity */}
        <div className="text-center">
          <h2 className="text-[13px] font-black tracking-tight leading-none truncate">{user.name}</h2>
          <p className="text-[7px] font-extrabold opacity-60 uppercase tracking-wider mt-1.5">
            {metadataText}
          </p>
        </div>

        {/* Stack Indicators */}
        <div className="flex flex-col gap-1 my-auto">
          
          <div className="grid grid-cols-2 gap-1.5">
            <div className={`p-1 border rounded-lg flex flex-col items-center text-center transition ${tConfig.badgeBg} ${tConfig.border}`}>
              <span className={`text-[6.5px] font-bold uppercase tracking-widest mb-0.5 ${tConfig.badgeLabel}`}>MBTI</span>
              <span className={`text-[10.5px] leading-none truncate w-full ${user.majorTypes.mbti === 'LOCKED' ? 'font-bold text-[9px] opacity-70' : tConfig.badgeText}`}>{user.majorTypes.mbti}</span>
            </div>
            
            <div className={`p-1 border rounded-lg flex flex-col items-center text-center transition ${tConfig.badgeBg} ${tConfig.border}`}>
              <span className={`text-[6.5px] font-bold uppercase tracking-widest mb-0.5 ${tConfig.badgeLabel}`}>Enneagram</span>
              <span className={`text-[10.5px] leading-none truncate w-full ${user.majorTypes.enneagram === 'LOCKED' ? 'font-bold text-[9px] opacity-70' : tConfig.badgeText}`}>{user.majorTypes.enneagram}</span>
            </div>
          </div>

          <div className={`p-1 border rounded-lg flex flex-col items-center text-center transition ${tConfig.badgeBg} ${tConfig.border}`}>
            <span className={`text-[6.5px] font-bold uppercase tracking-widest mb-0.5 ${tConfig.badgeLabel}`}>Moral Alignment</span>
            <span className={`text-[10.5px] leading-none truncate w-full ${user.majorTypes.alignment === 'LOCKED' ? 'font-bold text-[9px] opacity-70' : tConfig.badgeText}`}>{user.majorTypes.alignment}</span>
          </div>

          <div className={`p-1 border rounded-lg flex flex-col items-center text-center transition ${tConfig.badgeBg} ${tConfig.border}`}>
            <span className={`text-[6.5px] font-bold uppercase tracking-widest mb-0.5 ${tConfig.badgeLabel}`}>Love Language</span>
            <span className={`text-[10.5px] leading-none truncate w-full ${user.majorTypes.loveLanguage === 'LOCKED' ? 'font-bold text-[9px] opacity-70' : tConfig.badgeText}`}>{user.majorTypes.loveLanguage}</span>
          </div>

          <div className={`p-1 border rounded-lg flex flex-col items-center text-center transition ${tConfig.badgeBg} ${tConfig.border}`}>
            <span className={`text-[6.5px] font-bold uppercase tracking-widest mb-0.5 ${tConfig.badgeLabel}`}>Attachment Style</span>
            <span className={`text-[10.5px] leading-none truncate w-full ${user.majorTypes.attachmentStyle === 'LOCKED' ? 'font-bold text-[9px] opacity-70' : tConfig.badgeText}`}>{user.majorTypes.attachmentStyle}</span>
          </div>

        </div>

        {/* Card Footer (Snug at the bottom of the content area) */}
        <div className={`flex justify-between items-center border-t pt-2 mt-1 pb-0.5 ${tConfig.footerBorder}`}>
          <div className="flex items-center gap-1 opacity-60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[7px] font-black tracking-wider">VERIFIED SYSTEM</span>
          </div>

          {/* Authentic Mini Barcode */}
          <div className="flex gap-[0.7px] items-center opacity-25 select-none">
            <div className={`w-[0.8px] h-2 ${tConfig.barcodeColor}`} />
            <div className={`w-[2px] h-2 ${tConfig.barcodeColor}`} />
            <div className={`w-[0.8px] h-2 ${tConfig.barcodeColor}`} />
            <div className={`w-[0.8px] h-2 ${tConfig.barcodeColor}`} />
            <div className={`w-[2.2px] h-2 ${tConfig.barcodeColor}`} />
            <div className={`w-[1px] h-2 ${tConfig.barcodeColor}`} />
            <div className={`w-[0.5px] h-2 ${tConfig.barcodeColor}`} />
          </div>
        </div>

      </div>
    </div>
  );
});
ShareableIDCard.displayName = 'ShareableIDCard';
