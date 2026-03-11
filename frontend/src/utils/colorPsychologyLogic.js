export const colorPsychologyQuestions = [
  {
    id: 1,
    text: "I often feel a surge of intense, restless energy that I need to channel into action.",
    type: "vibrant_warm" // Favors Crimson, Fuchsia, Gold
  },
  {
    id: 2,
    text: "I am drawn to quiet, dimly lit spaces where I can lose myself in thought.",
    type: "deep_cool" // Favors Indigo, Obsidian, Forest
  },
  {
    id: 3,
    text: "I prefer everything in my life to feel airy, light, and free of heavy emotional burdens.",
    type: "light_cool" // Favors Cyan, Lavender
  },
  {
    id: 4,
    text: "I find beauty in the bittersweet, melancholic, and complex aspects of life.",
    type: "muted_cool" // Favors Lavender, Indigo, Sage
  },
  {
    id: 5,
    text: "I thrive when I am at the center of attention, bringing warmth and joy to the room.",
    type: "light_warm" // Favors Gold, Terracotta
  },
  {
    id: 6,
    text: "I am deeply grounded and prefer things that are natural, traditional, and enduring.",
    type: "muted_warm" // Favors Sage, Forest, Terracotta
  },
  {
    id: 7,
    text: "I embrace radical change and love standing out from the crowd with boldness.",
    type: "neon" // Favors Fuchsia, Lime, Cyan
  },
  {
    id: 8,
    text: "My emotions run incredibly deep, often feeling like a bottomless ocean.",
    type: "deep_cool" // Favors Sapphire, Indigo
  },
  {
    id: 9,
    text: "I have a highly analytical mind and prefer logic and structure over pure feeling.",
    type: "deep_neutral" // Favors Obsidian, Indigo
  },
  {
    id: 10,
    text: "I am fiercely protective of my loved ones and will fight for what I believe in.",
    type: "vibrant_warm" // Favors Crimson
  },
  {
    id: 11,
    text: "I am a mediator, always seeking harmony, peace, and balance in my environment.",
    type: "muted_cool" // Favors Sage, Lavender
  },
  {
    id: 12,
    text: "I feel most myself when I am exploring new ideas, concepts, and futuristic possibilities.",
    type: "neon" // Favors Cyan, Lime
  },
  {
    id: 13,
    text: "I feel a deep connection to the earth, the changing seasons, and organic growth.",
    type: "muted_warm" // Favors Forest, Sage, Terracotta
  },
  {
    id: 14,
    text: "I experience feelings of immense joy and optimism that easily rub off on others.",
    type: "light_warm" // Favors Gold, Lime
  },
  {
    id: 15,
    text: "I am fiercely independent and prefer to carve out my own path, regardless of the rules.",
    type: "vibrant_cool" // Favors Sapphire, Fuchsia
  },
  {
    id: 16,
    text: "I often feel a sense of detachment, observing the world as if from a distance.",
    type: "deep_neutral" // Favors Obsidian, Lavender
  },
  {
    id: 17,
    text: "I am highly empathetic and easily absorb the emotional atmosphere of a room.",
    type: "light_cool" // Favors Cyan, Lavender, Sage
  },
  {
    id: 18,
    text: "My willpower is unrelenting; when I set a goal, nothing can stop me.",
    type: "vibrant_warm" // Favors Crimson, Obsidian
  }
];

export const colorArchetypes = {
  "crimson": {
    name: "Crimson Passion",
    hex: "#D9042B",
    gradient: "from-red-600 to-rose-700",
    bgLight: "bg-red-50",
    borderLight: "border-red-100",
    color: "from-red-600 to-rose-700",
    description: "Your aura burns with immense intensity and power. You are driven by deep desires, strong convictions, and a relentless life force. You feel things fully and act with absolute certainty.",
    keywords: ["Intensity", "Power", "Desire", "Vitality", "Action"],
    traits: [
      "Fiercely protective of those you love.",
      "Unrelenting willpower and determination.",
      "A natural leader who commands attention.",
      "Experiences emotion as physical energy."
    ]
  },
  "indigo": {
    name: "Midnight Indigo",
    hex: "#1A1B41",
    gradient: "from-indigo-900 to-slate-900",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-100",
    color: "from-indigo-600 to-blue-800",
    description: "Deep, mysterious, and profoundly intuitive. Your emotional state is like a midnight ocean—calm on the surface but containing infinite depth and complexity underneath.",
    keywords: ["Intuition", "Depth", "Mystery", "Wisdom", "Introspection"],
    traits: [
      "Highly perceptive to hidden truths.",
      "Requires substantial alone time to recharge.",
      "Guided by a strong inner compass and intuition.",
      "Comfortable navigating the shadows of the psyche."
    ]
  },
  "cyan": {
    name: "Ethereal Cyan",
    hex: "#00F0FF",
    gradient: "from-cyan-400 to-blue-500",
    bgLight: "bg-cyan-50",
    borderLight: "border-cyan-100",
    color: "from-cyan-400 to-blue-500",
    description: "Your aura is bright, clear, and electric. You are a forward-thinker, often living in the realm of ideas, concepts, and futuristic possibilities. Your energy is refreshing and untethered.",
    keywords: ["Clarity", "Innovation", "Freedom", "Electric", "Visionary"],
    traits: [
      "Quick-witted and mentally agile.",
      "Values truth, logic, and pure ideas above heavy emotions.",
      "A visionary who sees the vast potential of the future.",
      "Struggles with feeling tied down or restricted."
    ]
  },
  "gold": {
    name: "Golden Dawn",
    hex: "#FFB800",
    gradient: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-100",
    color: "from-amber-400 to-orange-500",
    description: "Warm, radiant, and endlessly optimistic. Your emotional baseline is one of hope and expansion. People are naturally drawn to your light and the genuine joy you bring to spaces.",
    keywords: ["Warmth", "Optimism", "Radiance", "Joy", "Expansion"],
    traits: [
      "Naturally lifts the spirits of those around them.",
      "Sees the best potential in people and situations.",
      "Driven by a desire to create harmony and happiness.",
      "Can border on idealism, ignoring harsher realities."
    ]
  },
  "lavender": {
    name: "Lavender Haze",
    hex: "#C4B5FD",
    gradient: "from-violet-300 to-fuchsia-300",
    bgLight: "bg-violet-50",
    borderLight: "border-violet-100",
    color: "from-violet-400 to-purple-500",
    description: "Soft, empathetic, and uniquely perceptive. Your aura is gentle and highly sensitive to the vibrations of the world. You exist in the dreamy liminal space between reality and imagination.",
    keywords: ["Empathy", "Dreams", "Sensitivity", "Gentleness", "Imagination"],
    traits: [
      "Incredibly attuned to the feelings of others.",
      "Finds deep solace in art, music, or spiritual practices.",
      "Tends to absorb the energy of their environment.",
      "A natural mediator who desires peaceful outcomes."
    ]
  },
  "sage": {
    name: "Sage Serenity",
    hex: "#9CAF88",
    gradient: "from-emerald-400 to-teal-500",
    bgLight: "bg-stone-50",
    borderLight: "border-stone-200",
    color: "from-emerald-500 to-teal-600",
    description: "Grounded, balanced, and enduring. You possess a quiet strength that doesn't need to be loud to be felt. Your aura reflects the tranquility of nature and the wisdom of patience.",
    keywords: ["Balance", "Grounding", "Tranquility", "Growth", "Patience"],
    traits: [
      "Provides a calming presence during chaotic times.",
      "Values consistency, loyalty, and slow, steady growth.",
      "Deeply connected to the physical, natural world.",
      "Can be resistant to sudden, uncalculated change."
    ]
  },
  "obsidian": {
    name: "Obsidian Void",
    hex: "#0F0F0F",
    gradient: "from-slate-800 to-black",
    bgLight: "bg-slate-100",
    borderLight: "border-slate-200",
    color: "from-slate-700 to-slate-900",
    description: "Aesthetic, detached, and formidable. Your aura absorbs light, keeping your true self heavily guarded. You are deeply analytical, favoring logic and absolute independence.",
    keywords: ["Independence", "Logic", "Formidable", "Guarded", "Aesthetic"],
    traits: [
      "Highly selective about who they let into their inner circle.",
      "Approaches problems with cold, calculated logic.",
      "Possesses a minimalist, refined aesthetic sense.",
      "Often feels distinctly separate from the rest of society."
    ]
  },
  "fuchsia": {
    name: "Neon Fuchsia",
    hex: "#D946EF",
    gradient: "from-fuchsia-500 to-pink-600",
    bgLight: "bg-fuchsia-50",
    borderLight: "border-fuchsia-100",
    color: "from-fuchsia-500 to-pink-600",
    description: "Rebellious, magnetic, and fiercely expressive. You refuse to be ignored or categorized. Your energy is a disruptive force of creativity and unapologetic authenticity.",
    keywords: ["Rebellion", "Magnetism", "Expression", "Disruptive", "Authentic"],
    traits: [
      "Completely unafraid to challenge the status quo.",
      "Thrives on intense, varied, and novel experiences.",
      "A highly magnetic personality that draws strong reactions.",
      "Struggles with routine, boredom, or strict rules."
    ]
  }
};

export function calculateColorPsychology(answers) {
  // Initialize scores
  const scores = {
    crimson: 0,
    indigo: 0,
    cyan: 0,
    gold: 0,
    lavender: 0,
    sage: 0,
    obsidian: 0,
    fuchsia: 0
  };

  // Map answer types to score increments
  const typeMap = {
    "vibrant_warm": ["crimson", "gold", "fuchsia"],
    "deep_cool": ["indigo", "obsidian"],
    "light_cool": ["cyan", "lavender"],
    "muted_cool": ["lavender", "sage", "indigo"],
    "light_warm": ["gold", "cyan"],
    "muted_warm": ["sage", "gold"],
    "neon": ["fuchsia", "cyan"],
    "deep_neutral": ["obsidian", "indigo"],
    "vibrant_cool": ["fuchsia", "cyan", "indigo"]
  };

  // Tally scores
  colorPsychologyQuestions.forEach(q => {
    const score = answers[q.id] || 0;
    if (score !== 0) {
      const targetColors = typeMap[q.type];
      if (targetColors) {
        targetColors.forEach(color => {
          scores[color] += score; // Can be positive or negative
        });
      }
    }
  });

  // Find the highest scoring color
  let maxScore = -Infinity;
  let dominantColor = "indigo"; // default fallback

  for (const [color, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      dominantColor = color;
    }
  }

  // Calculate percentages for the breakdown (normalize lowest score to 0)
  const scoreValues = Object.values(scores);
  const minScore = Math.min(...scoreValues);
  const adjustedScores = {};
  let totalAdjusted = 0;
  
  for (const [color, score] of Object.entries(scores)) {
      const adjusted = score - minScore;
      adjustedScores[color] = adjusted;
      totalAdjusted += adjusted;
  }

  const breakdown = {};
  for (const color in adjustedScores) {
      breakdown[color] = totalAdjusted > 0 
          ? Math.round((adjustedScores[color] / totalAdjusted) * 100) 
          : Math.round(100 / 8);
  }

  return {
    dominantArchetype: dominantColor,
    info: colorArchetypes[dominantColor],
    breakdown,
    rawScores: scores
  };
}
