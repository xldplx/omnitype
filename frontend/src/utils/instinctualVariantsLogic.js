export const instinctualVariantsTypes = {
  1: {
    id: "self_preservation",
    name: "Self-Preservation (SP)",
    shortName: "Self-Preservation",
    abbreviation: "sp",
    description: "Your primary focus in life is on physical safety, comfort, health, and resource security. You are naturally attuned to your environment—temperature, lighting, food quality, and financial stability. You build a strong foundation to ensure your survival and independence.",
    coreDesire: "To secure physical well-being, financial independence, and a comfortable, predictable environment.",
    coreFear: "Lack of resources, physical discomfort, illness, or relying on untrustworthy people for survival.",
    strengths: [
      "Extremely practical, reliable, and capable of managing logistics, finances, and resources effectively.",
      "Able to create comfortable, nurturing environments for themselves and their loved ones.",
      "Highly resilient and grounded; unlikely to be easily swept away by unrealistic fantasies."
    ],
    weaknesses: [
      "Can become overly focused on hoarding resources, money, or energy, leading to intense stinginess or isolation.",
      "May use material comfort (food, shopping, sleep) to numb out emotional distress.",
      "Often struggles to prioritize relationships or deep connections if they interfere with their routine or security."
    ],
    relationshipDynamics: "You view relationships through a lens of practical support. A good partner is someone who helps build a secure life, shares responsibilities, and doesn't disrupt your peace or drain your resources. You show love by ensuring your partner's physical needs are met.",
    workplaceBehavior: "You are the anchor of any team. You care deeply about job security, benefits, and having a predictable schedule. You excel at maintaining systems and ensuring the practical details are flawlessly executed.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-100"
  },
  2: {
    id: "social",
    name: "Social (SO)",
    shortName: "Social",
    abbreviation: "so",
    description: "Your primary focus is on your status, role, and connection within groups or communities. You are highly attuned to social hierarchies, unspoken rules, and how you are perceived by others. You seek to find your place in the world and contribute to a larger cause or network.",
    coreDesire: "To belong to a group, achieve social standing, and feel valued by the community.",
    coreFear: "Being outcast, excluded, publicly humiliated, or failing to find a meaningful role in society.",
    strengths: [
      "Brilliant at networking, reading social dynamics, and bringing people together for a common goal.",
      "Deeply generous with their time and energy when it comes to supporting their community or chosen family.",
      "Often highly aware of global issues, politics, and the 'big picture' of human interaction."
    ],
    weaknesses: [
      "Can struggle deeply with 'FOMO' (Fear Of Missing Out) and overcommit their energy to too many social groups.",
      "May alter their personality or suppress their true desires to fit in or maintain a specific social image.",
      "Prone to intense anxiety about their reputation and what other people are saying about them."
    ],
    relationshipDynamics: "You want a partner who can integrate seamlessly into your social world. You often process relationships through the lens of how they appear to others. You are excellent at introducing your partner to new experiences and wide circles of friends.",
    workplaceBehavior: "You thrive in collaborative environments and excel at office politics (often in a positive way). You care deeply about the company culture, your title, and how your contribution affects the overall mission of the organization.",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-100"
  },
  3: {
    id: "sexual",
    name: "Sexual / One-to-One (SX)",
    shortName: "Sexual (Sx)",
    abbreviation: "sx",
    description: "Your primary focus is on intensity, chemistry, and finding 'the juice' in life. Despite the name, this isn't exclusively about intimacy—it’s about a magnetic pull toward people, passions, or ideas that make you feel intensely alive. You seek fusion and transformation.",
    coreDesire: "Total immersion, intense emotional and physical chemistry, and breaking boundaries.",
    coreFear: "A lack of passion, feeling 'dead' inside, or losing the intense connection they have with a specific person/interest.",
    strengths: [
      "Incredibly charismatic, passionate, and capable of forming deeply transformative, powerful bonds with others.",
      "Unafraid to dive into the darkest or most intense aspects of life; highly comfortable with vulnerability.",
      "Can direct laser-like focus and boundless energy toward a person or project they are obsessed with."
    ],
    weaknesses: [
      "Can be highly volatile, easily bored by daily routines, and prone to creating drama just to feel 'alive'.",
      "May struggle with intense jealousy, possessiveness, or an all-consuming need for a partner's undivided attention.",
      "Often completely neglects basic physical needs (sleep, money) when absorbed in an intense connection or passion."
    ],
    relationshipDynamics: "You demand absolute fusion. Casual dating is often boring or baffling to you. You want a relationship that is a constant exchange of intense energy. When you lock onto someone, you want to know their deepest secrets immediately, bypassing small talk entirely.",
    workplaceBehavior: "You perform terribly at mundane, repetitive tasks. However, if you are passionate about a project, you will work with a fiery, manic energy until it is complete. You often prefer working closely with one other highly competent person rather than a large group.",
    color: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-100"
  }
};

// 30 High-Impact Questions (10 per style)
const instinctualQuestions = [
  // Type 1: Self-Preservation (SP)
  { id: 1, text: "I am constantly aware of the temperature, lighting, and physical comfort of the room I am in.", type: 1 },
  { id: 2, text: "Having a stable financial cushion and a well-stocked pantry gives me a profound sense of peace.", type: 1 },
  { id: 3, text: "When I am stressed, my immediate instinct is to retreat, sleep, eat, or focus on my physical health.", type: 1 },
  { id: 4, text: "I rarely make impulsive decisions that would jeopardize my physical safety or financial security.", type: 1 },
  { id: 5, text: "I often find myself mentally tracking my energy levels and 'conserving' my energy throughout the day.", type: 1 },
  { id: 6, text: "I prefer to handle my own problems practically rather than talking about them extensively.", type: 1 },
  { id: 7, text: "The idea of relying completely on someone else for my basic survival needs terrifies me.", type: 1 },
  { id: 8, text: "I am usually the first person to notice if a home isn't practically functional or safe.", type: 1 },
  { id: 9, text: "I actively research diets, exercise regimens, or health protocols to protect my body from decline.", type: 1 },
  { id: 10, text: "Accumulating resources (money, property, supplies) feels like a necessary buffer against an unpredictable world.", type: 1 },

  // Type 2: Social (SO)
  { id: 11, text: "I am usually hyper-aware of the subtle power dynamics and social hierarchies in any group I join.", type: 2 },
  { id: 12, text: "I spend a lot of time thinking about my role in society, my reputation, and how I contribute to the world.", type: 2 },
  { id: 13, text: "I often feel a strong sense of responsibility toward my friends, community, or chosen family.", type: 2 },
  { id: 14, text: "The thought of being publicly humiliated or permanently cast out of my friend group is horrifying to me.", type: 2 },
  { id: 15, text: "I naturally 'read the room' and adapt my behavior to ensure smooth interactions and group harmony.", type: 2 },
  { id: 16, text: "I feel energized and alive when I am successfully collaborating with a large network of people.", type: 2 },
  { id: 17, text: "I often worry about missing out (FOMO) if my friends are doing something interesting without me.", type: 2 },
  { id: 18, text: "Understanding the politics, gossip, or connections between people in my network is very important to me.", type: 2 },
  { id: 19, text: "I actively shape my image and curations to ensure I am perceived exactly how I wish to be seen by society.", type: 2 },
  { id: 20, text: "It exhausts me heavily when I feel useless or irrelevant to my community.", type: 2 },

  // Type 3: Sexual (SX)
  { id: 21, text: "I have zero interest in casual small talk; I want to immediately dive into deep, intense topics.", type: 3 },
  { id: 22, text: "I often get 'obsessed' with a specific person, hobby, or idea, pouring all my energy into it until I burn out.", type: 3 },
  { id: 23, text: "A life that is safe, comfortable, and predictable sounds incredibly boring and 'dead' to me.", type: 3 },
  { id: 24, text: "When I connect with someone romantically or platonically, I want to completely merge minds and souls.", type: 3 },
  { id: 25, text: "People often describe my energy as 'intense', 'magnetic', or 'overwhelming'.", type: 3 },
  { id: 26, text: "I often ignore basic physical needs (like eating or sleeping) when I am completely captivated by someone or something.", type: 3 },
  { id: 27, text: "I would rather have a relationship full of passionate highs and dramatic lows than one that is stable but boring.", type: 3 },
  { id: 28, text: "I constantly seek a 'spark' or chemistry in my interactions, and if it's missing, I quickly completely disengage.", type: 3 },
  { id: 29, text: "I am unafraid of vulnerability if it means gaining access to the raw, unpolished core of another human being.", type: 3 },
  { id: 30, text: "I feel a profound lack of purpose unless I have a consuming passion driving me forward right now.", type: 3 }
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

export const instinctualTestQuestions = shuffle([...instinctualQuestions]);

export function calculateInstinctualResult(answers) {
    const scores = { 1: 0, 2: 0, 3: 0 };
  
    answers.forEach(answer => {
      // The UI uses val: 7 for "Extremely Unlike Me" and val: 1 for "Exactly Like Me".
      // We must invert this so that "Exactly Like Me" (1) yields the highest positive score (e.g. 7 points)
      // and "Extremely Unlike Me" (7) yields the lowest point value (e.g. 1 point).
      const correctedScore = 8 - answer.value;
      scores[answer.type] += correctedScore;
    });
  
    // Find highest score
    let PrimaryType = 1;
    let maxScore = -1;
  
    for (const [type, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        PrimaryType = parseInt(type);
      }
    }
  
    // Determine the 'Blindspot' (the lowest score)
    let BlindspotType = 1;
    let minScore = 999;
    for (const [type, score] of Object.entries(scores)) {
        if (score < minScore) {
          minScore = score;
          BlindspotType = parseInt(type);
        }
    }

    // Determine the Secondary
    let SecondaryType = 1;
    for (let i = 1; i <= 3; i++) {
        if (i !== PrimaryType && i !== BlindspotType) {
            SecondaryType = i;
        }
    }

    const MAX_SCORE_PER_TYPE = 70; // 10 questions * 7 max
    const breakdown = {};
    for (let i = 1; i <= 3; i++) {
        breakdown[i] = Math.max(0, Math.round((scores[i] / MAX_SCORE_PER_TYPE) * 100));
    }

    const primaryInfo = instinctualVariantsTypes[PrimaryType];
    const secondaryInfo = instinctualVariantsTypes[SecondaryType];
    const blindspotInfo = instinctualVariantsTypes[BlindspotType];
  
    return {
      type: PrimaryType,
      fullTitle: primaryInfo.shortName,
      info: primaryInfo,
      stacking: `${primaryInfo.abbreviation}/${secondaryInfo.abbreviation}`,
      blindspot: blindspotInfo,
      breakdown
    };
}
