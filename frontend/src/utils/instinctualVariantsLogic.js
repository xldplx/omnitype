// Instinctual Variants Types, Stacking Logic, and Scoring Engine
// SP (Self-Preservation), SO (Social), SX (Sexual / One-to-One)

export const instinctualVariantsTypes = {
  1: {
    id: "self_preservation",
    name: "Self-Preservation (SP)",
    shortName: "Self-Preservation",
    abbreviation: "sp",
    tagline: "The Grounded Guardian of Physical Resources & Balance",
    primaryFocus: "Health, Resource Security & Domestic Comfort",
    coreZone: "Physical Environment & Personal Stamina",
    description: "Your primary instinct is oriented toward physical safety, financial security, health, and domestic comfort. You have a natural radar for resource management, bodily energy, and practical logistics, creating a solid and dependable foundation for life.",
    coreDesire: "To secure physical well-being, financial independence, and a stable, comfortable environment.",
    coreFear: "Lack of resources, physical vulnerability, burnout, or having to rely on unreliable systems for survival.",
    strengths: [
      "Highly practical, grounded, and skilled at managing budgets, resources, and everyday logistics.",
      "Creates comfortable, restorative sanctuaries where loved ones feel cared for and secure.",
      "Emotionally resilient and steady; unswayed by impulsive fads or unrealistic daydreams.",
      "Exceptional foresight in anticipating material needs, emergencies, and health maintenance."
    ],
    weaknesses: [
      "Can slip into a scarcity mindset, over-conserving energy or money out of fear of future depletion.",
      "May use material comfort (food, nesting, binge-watching) to avoid difficult emotional processing.",
      "Can resist spontaneous adventures or interpersonal intimacy if it disrupts established routines.",
      "Prone to carrying the entire burden of practical responsibilities without asking for help."
    ],
    relationshipDynamics: "In romantic relationships, you show love through dependable acts of service, practical support, and creating a safe harbor. You value a partner who is reliable, shares domestic responsibilities, and respects your need for quiet downtime.",
    workplaceBehavior: "You are the steady anchor of any organization. You care about sustainable pacing, clear compensation, and realistic timelines. You excel at operational continuity, risk management, and ensuring projects are executed with practical precision.",
    color: "from-emerald-500 to-teal-600",
    themeBg: "bg-emerald-50",
    themeBorder: "border-emerald-200",
    themeText: "text-emerald-700",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-100"
  },
  2: {
    id: "social",
    name: "Social (SO)",
    shortName: "Social",
    abbreviation: "so",
    tagline: "The Connected Architect of Community & Belonging",
    primaryFocus: "Belonging, Group Dynamics & Collective Impact",
    coreZone: "Social Networks & Shared Purpose",
    description: "Your primary instinct is oriented toward community, collective connection, and your role within groups. You are naturally attuned to social dynamics, unspoken group norms, and how people interact, driven to contribute to causes larger than yourself.",
    coreDesire: "To belong meaningfully, build strong alliances, and contribute to the well-being of the collective.",
    coreFear: "Being ostracized, excluded, socially invisible, or failing to make a meaningful community contribution.",
    strengths: [
      "Gifted at reading group dynamics, facilitating consensus, and bringing diverse people together.",
      "Generous with time and energy in championing team causes and lifting up community initiatives.",
      "High cultural intelligence and awareness of societal trends, ethics, and collective impact.",
      "Natural networking ability; easily builds bridges and introduces people to mutually beneficial circles."
    ],
    weaknesses: [
      "Can suffer from FOMO (Fear Of Missing Out) and over-commit energy to too many social obligations.",
      "May adapt personal views too quickly to preserve group harmony or maintain an admirable social image.",
      "Vulnerable to anxiety regarding reputation, status, or what peers might secretly think.",
      "Can neglect private personal needs while striving to be helpful and present for everyone else."
    ],
    relationshipDynamics: "You thrive when your partner shares your social values and integrates smoothly into your community. You enjoy introducing your significant other to friends and attending gatherings together, valuing open social communication and mutual respect.",
    workplaceBehavior: "You shine in collaborative teams, organizational development, public relations, and cross-functional leadership. You care deeply about healthy company culture, clear communication channels, and shared missions.",
    color: "from-blue-500 to-indigo-600",
    themeBg: "bg-blue-50",
    themeBorder: "border-blue-200",
    themeText: "text-blue-700",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-100"
  },
  3: {
    id: "sexual",
    name: "Sexual / One-to-One (SX)",
    shortName: "Sexual (Sx)",
    abbreviation: "sx",
    tagline: "The Passionate Catalyst of Intensity & Transformation",
    primaryFocus: "Chemistry, Magnetic Depth & Vitality",
    coreZone: "One-to-One Intimacy & Creative Immersion",
    description: "Your primary instinct is oriented toward intensity, magnetic chemistry, and transformative experiences. Despite the clinical term, this instinct is about pursuing the vital 'spark' in life—deep one-to-one connections, creative immersion, and boundary-pushing passion.",
    coreDesire: "To experience total immersion, electric chemistry, and profound, transformative connection.",
    coreFear: "Emotional numbness, losing vitality, superficiality, or disconnection from deeply cherished passions.",
    strengths: [
      "Deeply charismatic and magnetic, forming powerful, transformative emotional bonds.",
      "Unafraid of raw vulnerability, cutting straight through superficiality to what truly matters.",
      "Laser-focused stamina and passionate dedication when captivated by a creative idea or partner.",
      "Inspires others to embrace their true desires, take daring leaps, and live with full vitality."
    ],
    weaknesses: [
      "Can become easily bored by steady routines, occasionally courting drama just to feel intense.",
      "Prone to all-or-nothing obsession with a person or project, leading to sudden emotional exhaustion.",
      "May neglect basic practical needs (sleep, balanced finances) when swept up in a consuming passion.",
      "Can experience possessiveness or struggle when partners need ordinary, low-key downtime."
    ],
    relationshipDynamics: "You crave deep emotional resonance and mutual immersion. Casual surface-level dating often feels uninspiring; you seek a partner with whom you share undeniable chemistry, late-night vulnerability, and an exciting shared journey.",
    workplaceBehavior: "You thrive in high-creativity environments, product launches, bespoke one-on-one consulting, and dynamic design sprints. You perform best when working closely with talented peers on inspiring challenges rather than executing repetitive maintenance.",
    color: "from-rose-500 to-red-600",
    themeBg: "bg-rose-50",
    themeBorder: "border-rose-200",
    themeText: "text-rose-700",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-100"
  }
};

// 6 Complete Instinctual Stacking Sequences
export const STACKING_PROFILES = {
  "sp/so": {
    title: "The Citizen / Anchor",
    essence: "Pragmatic, community-oriented, and dependable. Uses practical mastery to build sustainable foundations for family, team, and society.",
    dynamics: "Primary focus is on establishing financial security, health, and domestic comfort (SP), supported by an active, responsible role in the community or workplace (SO). The Sexual (SX) instinct is in the shadow, meaning one-on-one intensity and emotional drama are avoided in favor of calm stability."
  },
  "sp/sx": {
    title: "The Mystic / Insular Artisan",
    essence: "Earthy, intense, and deeply private. Protects their sanctuary while channeling passionate depth into selective, intimate bonds and creative crafts.",
    dynamics: "Grounds life in physical comfort and self-sufficiency (SP), while seeking electric, transformative passion with chosen individuals or art (SX). The Social (SO) instinct is in the shadow, making broad group networking and social hierarchies feel uninteresting or exhausting."
  },
  "so/sp": {
    title: "The Steward / Social Architect",
    essence: "Civic-minded, strategic, and protective. Builds dependable institutions, networks, and groups to ensure collective security.",
    dynamics: "Energized by community involvement, social standing, and collective well-being (SO), backed by solid practical management and resource preservation (SP). The Sexual (SX) instinct is in the shadow, prioritizing broad organizational harmony over disruptive private passions."
  },
  "so/sx": {
    title: "The Catalyst / Social Magnet",
    essence: "Charismatic, expressive, and connective. Uses magnetic charm and interpersonal spark to bridge groups and inspire movements.",
    dynamics: "Thrives on broad social connection and cultural currents (SO), infused with electric chemistry, charisma, and enthusiasm (SX). The Self-Preservation (SP) instinct is in the shadow, often leading to neglecting personal rest, domestic chores, or long-term financial routines."
  },
  "sx/sp": {
    title: "The Alchemist / Lightning Rod",
    essence: "Intense, focused, and deeply transformative. Craves profound one-on-one fusion while maintaining an insular haven to recharge.",
    dynamics: "Driven by consuming passion, deep intimacy, and energetic spark (SX), backed by a fiercely protected personal sanctuary for recovery (SP). The Social (SO) instinct is in the shadow, meaning large group events, politics, and social small talk are readily dismissed."
  },
  "sx/so": {
    title: "The Firebrand / Visionary Romantic",
    essence: "Electrifying, daring, and expressive. Channels magnetic passion into inspiring the crowd and shaking up social norms.",
    dynamics: "Pursues intense chemistry, profound emotional depth, and raw vitality (SX), which spills outward into charismatic social expression and creative reach (SO). The Self-Preservation (SP) instinct is in the shadow, often risking physical burnout or financial instability in pursuit of the flame."
  }
};

// Historical and Cultural Archetypes for each Variant
export const INSTINCTUAL_FIGURES = {
  1: [
    { name: "Warren Buffett", role: "Legendary Investor & Capital Steward", quote: "Someone's sitting in the shade today because someone planted a tree a long time ago." },
    { name: "Henry David Thoreau", role: "Naturalist & Philosopher of Self-Reliance", quote: "Our life is frittered away by detail. Simplify, simplify." },
    { name: "Marie Kondo", role: "Organizing Consultant & Author", quote: "The space in which we live should be for the person we are becoming now, not for the person we were." }
  ],
  2: [
    { name: "Barack Obama", role: "44th US President & Community Organizer", quote: "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for." },
    { name: "Jane Goodall", role: "Primatologist & Global Conservationist", quote: "What you do makes a difference, and you have to decide what kind of difference you want to make." },
    { name: "Bono", role: "Musician & Humanitarian Leader", quote: "Where you live should not determine whether you live." }
  ],
  3: [
    { name: "Frida Kahlo", role: "Iconic Visual Artist", quote: "I love you more than my own skin and even though you don't love me the same way, you love me anyways, don't you?" },
    { name: "Prince", role: "Musical Polymath & Visionary Artist", quote: "A strong spirit transcends rules." },
    { name: "Lord Byron", role: "Romantic Poet & Adventurer", quote: "There is a pleasure in the pathless woods, there is a rapture on the lonely shore." }
  ]
};

// 30 Clear, Relatable Questions (10 per instinct: SP, SO, SX)
// Phrased in natural second-person language ("You...")
export const instinctualQuestions = [
  // Type 1: Self-Preservation (SP) (Questions 1 - 10)
  { id: 1, text: "You are naturally mindful of your physical comfort, room temperature, and lighting wherever you spend time.", type: 1 },
  { id: 2, text: "Having a stable financial safety net and predictable savings gives you deep peace of mind.", type: 1 },
  { id: 3, text: "When feeling worn down or stressed, your first instinct is to sleep, eat nourishing food, or relax quietly at home.", type: 1 },
  { id: 4, text: "You dislike taking careless risks that could jeopardize your personal safety, health, or financial stability.", type: 1 },
  { id: 5, text: "You pay close attention to your daily energy levels and know when you need to conserve your stamina.", type: 1 },
  { id: 6, text: "You take pride in maintaining an orderly, comfortable living space where you can recharge without intrusion.", type: 1 },
  { id: 7, text: "You prefer taking practical, hands-on steps to solve an everyday problem rather than just talking about it.", type: 1 },
  { id: 8, text: "You naturally keep track of household essentials, groceries, and maintenance before supplies run low.", type: 1 },
  { id: 9, text: "You value self-reliance and feel uneasy when forced to rely entirely on others for basic necessities.", type: 1 },
  { id: 10, text: "You enjoy regular, grounding daily routines that protect your long-term physical wellbeing.", type: 1 },

  // Type 2: Social (SO) (Questions 11 - 20)
  { id: 11, text: "You quickly notice social dynamics, group hierarchies, and unspoken norms whenever you join a gathering.", type: 2 },
  { id: 12, text: "You care deeply about how your contributions impact your team, community, or broader circle.", type: 2 },
  { id: 13, text: "You feel energized and engaged when collaborating with a group toward a shared, meaningful goal.", type: 2 },
  { id: 14, text: "You naturally adjust your communication style to help conversations flow smoothly and make others feel included.", type: 2 },
  { id: 15, text: "You feel a strong sense of loyalty and responsibility toward your friends, coworkers, or chosen community.", type: 2 },
  { id: 16, text: "You feel a touch of FOMO (fear of missing out) when your friend group or team gathers without you.", type: 2 },
  { id: 17, text: "You value building a supportive network of friendships and connections across different areas of life.", type: 2 },
  { id: 18, text: "You care about having a respected reputation and being known as someone who contributes positively to the group.", type: 2 },
  { id: 19, text: "You enjoy keeping up with news, cultural trends, and what is happening in your social circles.", type: 2 },
  { id: 20, text: "You feel unfulfilled when you are isolated from group activities or disconnected from a shared purpose.", type: 2 },

  // Type 3: Sexual / One-to-One (SX) (Questions 21 - 30)
  { id: 21, text: "You are drawn to intense, magnetic connections with people rather than casual, surface-level socializing.", type: 3 },
  { id: 22, text: "When you become passionate about a project, person, or creative pursuit, you immerse yourself completely.", type: 3 },
  { id: 23, text: "A life that feels predictable and routine can make you feel restless, bored, or drained of vitality.", type: 3 },
  { id: 24, text: "You actively seek interactions that have an emotional spark, chemistry, and real depth.", type: 3 },
  { id: 25, text: "You are completely comfortable with raw vulnerability if it allows you to truly understand someone on a deeper level.", type: 3 },
  { id: 26, text: "People often perceive your energy and conversation style as passionate, intense, or captivating.", type: 3 },
  { id: 27, text: "You sometimes lose track of time, meals, or rest when deeply captivated by an exciting new endeavor.", type: 3 },
  { id: 28, text: "You prefer having one or two electric, deeply intimate bonds over a large circle of casual acquaintances.", type: 3 },
  { id: 29, text: "You look for experiences that make you feel truly alive, inspired, and creatively ignited.", type: 3 },
  { id: 30, text: "You find routine small talk unfulfilling and prefer cutting straight to what someone is truly passionate about.", type: 3 }
];

export const instinctualTestQuestions = [...instinctualQuestions];

export function calculateInstinctualResult(answers, simpleAnswersMap, allQuestions) {
  const scores = { 1: 0, 2: 0, 3: 0 };

  // Calculate scores from 1 to 7 Likert scale
  if (Array.isArray(answers) && answers.length > 0) {
    answers.forEach(item => {
      const val = Number(item.value || 0);
      const t = item.type;
      if (t && scores[t] !== undefined) {
        scores[t] += val;
      }
    });
  } else if (simpleAnswersMap && typeof simpleAnswersMap === 'object') {
    const questionsToUse = allQuestions || instinctualQuestions;
    questionsToUse.forEach(q => {
      const val = simpleAnswersMap[q.id];
      if (val !== undefined && scores[q.type] !== undefined) {
        scores[q.type] += Number(val);
      }
    });
  }

  // Identify Dominant Instinct (highest score)
  let primaryType = 1;
  let maxScore = -1;
  for (let i = 1; i <= 3; i++) {
    if (scores[i] > maxScore) {
      maxScore = scores[i];
      primaryType = i;
    }
  }

  // Identify Blindspot (lowest score)
  let blindspotType = 1;
  let minScore = 999;
  for (let i = 1; i <= 3; i++) {
    if (scores[i] < minScore) {
      minScore = scores[i];
      blindspotType = i;
    }
  }

  // Identify Secondary Instinct (the remaining one)
  let secondaryType = 1;
  for (let i = 1; i <= 3; i++) {
    if (i !== primaryType && i !== blindspotType) {
      secondaryType = i;
      break;
    }
  }

  // Normalize scores (percentages out of 70 max possible points: 10 questions * 7 points)
  const MAX_POSSIBLE_SCORE = 70;
  const breakdown = {};
  for (let i = 1; i <= 3; i++) {
    const pct = Math.round((scores[i] / MAX_POSSIBLE_SCORE) * 100);
    breakdown[i] = Math.min(Math.max(pct, 5), 100);
  }

  const primaryInfo = instinctualVariantsTypes[primaryType];
  const secondaryInfo = instinctualVariantsTypes[secondaryType];
  const blindspotInfo = instinctualVariantsTypes[blindspotType];
  const stackingKey = `${primaryInfo.abbreviation}/${secondaryInfo.abbreviation}`;

  return {
    type: primaryType,
    fullTitle: primaryInfo.shortName,
    info: primaryInfo,
    secondaryInfo,
    blindspot: blindspotInfo,
    stacking: stackingKey,
    stackingInfo: STACKING_PROFILES[stackingKey] || {
      title: `${primaryInfo.shortName} Dominant`,
      essence: `Prioritizes ${primaryInfo.primaryFocus.toLowerCase()} with secondary support from ${secondaryInfo.shortName.toLowerCase()}.`,
      dynamics: `Your dominant drive is ${primaryInfo.shortName}, followed by ${secondaryInfo.shortName}, with ${blindspotInfo.shortName} in the shadow.`
    },
    breakdown
  };
}
