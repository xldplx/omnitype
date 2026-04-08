export const alignmentMap = {
  "lawful-good": {
    id: "lawful-good",
    name: "Lawful Good",
    shortName: "Crusader",
    description: "You believe that structure, rules, and order are the best ways to protect the innocent and ensure the greater good. You are a principled defender of justice who holds yourself to a strict moral code.",
    axis: "Lawful & Good",
    quote: "\"Justice must be served, and the rules are our weapon against darkness.\"",
    strengths: ["Highly dependable and trustworthy.", "Strong moral compass.", "Will stand up against injustice consistently."],
    weaknesses: ["Can be inflexible and dogmatic.", "Struggles to understand moral gray areas.", "May blindly follow corrupt authority if it is 'the law'."],
    color: "from-sky-400 to-blue-500",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-100"
  },
  "neutral-good": {
    id: "neutral-good",
    name: "Neutral Good",
    shortName: "Benefactor",
    description: "You are guided by your conscience above all else. You respect rules when they help people, but have no problem breaking or ignoring them if they interfere with doing the right thing.",
    axis: "Neutral & Good",
    quote: "\"I just want to help people. The law mostly gets in the way, but I won't cause chaos just for fun.\"",
    strengths: ["Deeply compassionate.", "Pragmatic altruism.", "Doesn't let bureaucracy stop them from helping."],
    weaknesses: ["Can be unpredictable to strict authority figures.", "May lack a cohesive long-term plan.", "Prone to being taken advantage of."],
    color: "from-teal-400 to-emerald-500",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-100"
  },
  "chaotic-good": {
    id: "chaotic-good",
    name: "Chaotic Good",
    shortName: "Rebel",
    description: "You are a fiercely independent individualist who despises tyranny and restrictive laws. You act according to your own strong internal compass to do what is right, regardless of what society expects.",
    axis: "Chaotic & Good",
    quote: "\"Rules are just tools used by the powerful to oppress the weak. I make my own rules.\"",
    strengths: ["Fiercely independent and creative.", "Will fight tyranny at all costs.", "Highly adaptable to changing moral landscapes."],
    weaknesses: ["Often reckless and disruptive.", "Dislikes working within a team hierarchy.", "Can cause collateral damage in the pursuit of justice."],
    color: "from-amber-400 to-yellow-500",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-100"
  },
  "lawful-neutral": {
    id: "lawful-neutral",
    name: "Lawful Neutral",
    shortName: "Judge",
    description: "You believe in order, tradition, and the rule of law as structural necessities for civilization. You enforce the rules objectively, whether they result in a 'good' or 'bad' outcome.",
    axis: "Lawful & Neutral",
    quote: "\"The law is the law. Without it, we are nothing but beasts.\"",
    strengths: ["Extremely fair, objective, and unbiased.", "Incredibly reliable and structured.", "Creates lasting stability."],
    weaknesses: ["Can lack compassion and empathy.", "May enforce cruel laws just because they are written.", "Often struggles with nuance."],
    color: "from-slate-400 to-slate-500",
    bgLight: "bg-slate-50",
    borderLight: "border-slate-100"
  },
  "true-neutral": {
    id: "true-neutral",
    name: "True Neutral",
    shortName: "Undecided",
    description: "You prefer to stay out of grand ideological battles. You act naturally based on your own self-interest or a desire for elemental balance, avoiding extreme commitments to 'good', 'evil', 'law', or 'chaos'.",
    axis: "Neutral",
    quote: "\"I'm just trying to live my life and stay out of other people's wars. Everything in moderation.\"",
    strengths: ["Highly adaptable and unassuming.", "Avoids dogmatic extremism.", "Often very peaceful and grounded."],
    weaknesses: ["Can be apathetic to the suffering of others.", "May lack strong convictions.", "Can be seen as unreliable in a crisis."],
    color: "from-stone-400 to-stone-500",
    bgLight: "bg-stone-50",
    borderLight: "border-stone-100"
  },
  "chaotic-neutral": {
    id: "chaotic-neutral",
    name: "Chaotic Neutral",
    shortName: "Free Spirit",
    description: "You value your own absolute freedom above everything else. You buck tradition and authority not to help anyone else, but purely to avoid restrictions on your own life. You are truly unpredictable.",
    axis: "Chaotic & Neutral",
    quote: "\"Don't tell me what to do. I answer to nobody but myself.\"",
    strengths: ["Infinite creativity and spontaneity.", "Completely unburdened by societal expectations.", "Highly resilient self-reliance."],
    weaknesses: ["Highly unreliable and fickle.", "Can be entirely self-centered.", "Creates chaos for no productive reason."],
    color: "from-orange-400 to-rose-500",
    bgLight: "bg-orange-50",
    borderLight: "border-orange-100"
  },
  "lawful-evil": {
    id: "lawful-evil",
    name: "Lawful Evil",
    shortName: "Domineer",
    description: "You understand that systems, laws, and hierarchies are the perfect tools to gain power and oppress others. You operate ruthlessly within a strict code of conduct or legal framework to achieve selfish dominance.",
    axis: "Lawful & Evil",
    quote: "\"Power is everything. I will rebuild this world in my image, and every law will serve me.\"",
    strengths: ["Incredibly strategic, patient, and methodical.", "Excellent at building empires or organizations.", "Honors specific codes or contracts."],
    weaknesses: ["Completely devoid of empathy.", "Extremely arrogant and oppressive.", "Will betray anyone if the contract allows it."],
    color: "from-indigo-700 to-purple-800",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-100"
  },
  "neutral-evil": {
    id: "neutral-evil",
    name: "Neutral Evil",
    shortName: "Mercenary",
    description: "You are the ultimate pragmatist of selfishness. You do whatever you can get away with to advance your own interests. You have no loyalty to order, and no inherent love of chaos—only a focus on yourself.",
    axis: "Neutral & Evil",
    quote: "\"I'm looking out for number one. If that hurts you, that's your problem, not mine.\"",
    strengths: ["Highly efficient survivor.", "Unburdened by morality or honor.", "Can adapt to any situation to gain an advantage."],
    weaknesses: ["Betrays allies instantly if it benefits them.", "Universally untrustworthy.", "Ultimately isolated and alone."],
    color: "from-zinc-700 to-slate-800",
    bgLight: "bg-zinc-100",
    borderLight: "border-zinc-200"
  },
  "chaotic-evil": {
    id: "chaotic-evil",
    name: "Chaotic Evil",
    shortName: "Destroyer",
    description: "You are driven by pure self-interest, rage, or a desire for destruction. You are brutal, unpredictable, and actively seek to dismantle order and hurt others for your own pleasure or gain.",
    axis: "Chaotic & Evil",
    quote: "\"Burn it all down. Let the strong survive the ashes.\"",
    strengths: ["Terrifyingly relentless and aggressive.", "Cannot be reasoned with or controlled.", "Operates purely on primal instinct."],
    weaknesses: ["Self-destructive and reckless.", "Incapable of long-term alliance building.", "Attracts constant conflict from all sides."],
    color: "from-red-600 to-rose-700",
    bgLight: "bg-red-50",
    borderLight: "border-red-100"
  }
};

const rawQuestions = [
  // L/C AXIS (Lawful = 1, Chaotic = -1)
  { id: 1, text: "I believe that society strictly needs strong, unbreakable laws to function.", axis: "lc", weight: 1 },
  { id: 2, text: "I naturally distrust authority figures and institutions.", axis: "lc", weight: -1 },
  { id: 3, text: "Even if a rule seems unfair, it is better to change it from within than simply break it.", axis: "lc", weight: 1 },
  { id: 4, text: "Complete personal freedom is far more important than public order.", axis: "lc", weight: -1 },
  { id: 5, text: "I strictly honor contracts, verbal agreements, and traditions.", axis: "lc", weight: 1 },
  { id: 6, text: "I prefer to live entirely spontaneously rather than committing to long-term plans.", axis: "lc", weight: -1 },
  { id: 7, text: "Without a clear hierarchy, human endeavors usually collapse into a mess.", axis: "lc", weight: 1 },
  { id: 8, text: "Rules are merely suggestions created by people who want to control others.", axis: "lc", weight: -1 },
  { id: 9, text: "I feel very uncomfortable when things lack structure or predictability.", axis: "lc", weight: 1 },
  { id: 10, text: "I have a strong rebellious streak that flares up when I am given orders.", axis: "lc", weight: -1 },
  { id: 11, text: "Loyalty to one's organization or nation is a foundational virtue.", axis: "lc", weight: 1 },
  { id: 12, text: "Chaos and disruption are often the only ways to achieve true progress.", axis: "lc", weight: -1 },

  // G/E AXIS (Good = 1, Evil = -1)
  { id: 13, text: "I am willing to make significant personal sacrifices to help a stranger in need.", axis: "ge", weight: 1 },
  { id: 14, text: "I mostly view other people as resources to help me get what I want.", axis: "ge", weight: -1 },
  { id: 15, text: "I feel a profound sense of responsibility to leave the world better than I found it.", axis: "ge", weight: 1 },
  { id: 16, text: "If someone is weak or gullible, it's their own fault if they get taken advantage of.", axis: "ge", weight: -1 },
  { id: 17, text: "Compassion and empathy are the most important traits a human can possess.", axis: "ge", weight: 1 },
  { id: 18, text: "I believe that in the real world, morality is just an illusion.", axis: "ge", weight: -1 },
  { id: 19, text: "It deeply upsets me when I witness an act of cruelty.", axis: "ge", weight: 1 },
  { id: 20, text: "I have no problem betraying a friend if it guarantees my own success.", axis: "ge", weight: -1 },
  { id: 21, text: "I actively go out of my way to ensure everyone around me feels safe and valued.", axis: "ge", weight: 1 },
  { id: 22, text: "Revenge is a highly satisfying and completely justifiable response.", axis: "ge", weight: -1 },
  { id: 23, text: "I believe in forgiving people who have wronged me.", axis: "ge", weight: 1 },
  { id: 24, text: "I enjoy asserting my dominance and making others feel inferior.", axis: "ge", weight: -1 }
];

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export const moralAlignmentQuestions = shuffle([...rawQuestions]);

export function calculateMoralAlignment(answers) {
  let lcScore = 0; // Negative = Chaotic, Positive = Lawful
  let geScore = 0; // Negative = Evil, Positive = Good

  // Max score per axis is 12 questions * 3 = 36
  answers.forEach(answer => {
    // UI value: 1 = "Completely Agree" (Left), 7 = "Completely Disagree" (Right)
    // Map 1..7 to +3..-3
    const scoreVal = 4 - answer.value; 
    
    // Weight dictates the direction (-1 or 1)
    if (answer.axis === "lc") {
      lcScore += (scoreVal * answer.weight);
    } else if (answer.axis === "ge") {
      geScore += (scoreVal * answer.weight);
    }
  });

  // Threshold logic
  let lawChaosSegment = "neutral";
  if (lcScore >= 8) lawChaosSegment = "lawful";
  else if (lcScore <= -8) lawChaosSegment = "chaotic";

  let goodEvilSegment = "neutral";
  if (geScore >= 8) goodEvilSegment = "good";
  else if (geScore <= -8) goodEvilSegment = "evil";

  let resultId = `${lawChaosSegment}-${goodEvilSegment}`;
  if (resultId === "neutral-neutral") resultId = "true-neutral";
  
  // Calculate percentage mapping for UI
  // Score range: -36 to +36. Normalize to 0-100%
  const lcPercent = Math.max(0, Math.min(100, Math.round(((lcScore + 36) / 72) * 100)));
  const gePercent = Math.max(0, Math.min(100, Math.round(((geScore + 36) / 72) * 100)));

  return {
    alignment: alignmentMap[resultId],
    lcScore,
    geScore,
    scores: {
      lawChaos: lcPercent,
      goodEvil: gePercent
    }
  };
}
