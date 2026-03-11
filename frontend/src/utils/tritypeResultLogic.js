// Tritype logic and 27 archetypes
export const tritypeTestQuestions = [
  // Heart Center (2, 3, 4)
  { id: 1, text: "I constantly monitor the emotional temperature of others and adapt myself to make sure they feel cared for.", type: 2 },
  { id: 2, text: "I derive a massive amount of my self-worth from knowing that crucial people in my life rely on me.", type: 2 },
  { id: 3, text: "I will go out of my way to help people, sometimes secretly hoping they will deeply appreciate me in return.", type: 2 },
  { id: 4, text: "I struggle to directly ask for what I need, preferring to hint at it by taking care of others first.", type: 2 },
  
  { id: 5, text: "I measure my inherent worth by my tangible accomplishments and public successes.", type: 3 },
  { id: 6, text: "I know exactly how to alter my image or behavior to impress whoever happens to be my current audience.", type: 3 },
  { id: 7, text: "I struggle to 'just relax' without feeling an intense underlying guilt that I am falling behind my goals.", type: 3 },
  { id: 8, text: "I prioritize ruthless efficiency and rapid results, sometimes at the expense of my own personal feelings.", type: 3 },

  { id: 9, text: "I carry a deep, quiet sense of melancholy and a feeling that there is something fundamentally missing inside me.", type: 4 },
  { id: 10, text: "I despise the ordinary and am fiercely committed to expressing my unique, authentic self.", type: 4 },
  { id: 11, text: "I often feel deeply misunderstood by the rest of the world, like an outsider looking in.", type: 4 },
  { id: 12, text: "I find a strange, comforting beauty in sadness, grief, and longing, and I don't shy away from 'dark' emotions.", type: 4 },

  // Head Center (5, 6, 7)
  { id: 13, text: "My energy is an extremely limited resource; interacting heavily drains my battery, requiring vast amounts of alone time.", type: 5 },
  { id: 14, text: "I effortlessly shut down my feelings in chaotic situations and retreat entirely into cold, objective observation.", type: 5 },
  { id: 15, text: "I hoard knowledge and specialized information because my greatest fear is being fundamentally incapable or useless.", type: 5 },
  { id: 16, text: "I passionately dislike being dependent on anyone, going to extreme lengths to ensure my absolute self-sufficiency.", type: 5 },

  { id: 17, text: "My brain is constantly scanning the horizon for potential worst-case scenarios so that I can intricately prepare for them.", type: 6 },
  { id: 18, text: "I have a deeply complex relationship with authority; I want a strong leader to trust, but I am fiercely suspicious of them.", type: 6 },
  { id: 19, text: "I struggle with self-doubt and often poll several friends for their opinions before finalizing a major decision.", type: 6 },
  { id: 20, text: "Once you have earned my trust, I am ferociously loyal and will vigorously defend my 'tribe' against external threats.", type: 6 },

  { id: 21, text: "I have a fast-paced mind that constantly jumps between thousands of exciting new ideas and grand future adventures.", type: 7 },
  { id: 22, text: "I absolutely cannot stand feeling trapped, bored, or limited; committing to a single life path feels terrifying.", type: 7 },
  { id: 23, text: "When painful emotions surface, my immediate instinct is to enthusiastically distract myself with fun or new activities.", type: 7 },
  { id: 24, text: "I start many brilliant projects with massive enthusiasm, but frequently abandon them when the work becomes tedious.", type: 7 },

  // Gut Center (8, 9, 1)
  { id: 25, text: "I possess an intense, powerful energy that naturally commands the room; I instinctively step into leadership during crises.", type: 8 },
  { id: 26, text: "My absolute greatest core fear is being controlled or manipulated; I refuse to ever be weak or vulnerable.", type: 8 },
  { id: 27, text: "I have absolutely no issue with open conflict or heated arguments; I am incredibly direct and completely blunt.", type: 8 },
  { id: 28, text: "I am fiercely protective of exactly those I love; if you threaten my people, I will destroy you without a second thought.", type: 8 },

  { id: 29, text: "I possess a profound ability to truly see, entirely comprehend, and deeply validate all opposing sides of any argument.", type: 9 },
  { id: 30, text: "I routinely sacrifice what I truly want and merge with the desires of my partner or friends just to maintain absolute peace.", type: 9 },
  { id: 31, text: "When I am stressed, I 'numb out' and completely distract myself with highly comforting, mindless routines.", type: 9 },
  { id: 32, text: "I desperately hate intense tension or conflict; I will frequently just check out emotionally entirely rather than fight back.", type: 9 },

  { id: 33, text: "I have a harsh, relentless internal judge that constantly points out exactly how I—and others—could have done things better.", type: 1 },
  { id: 34, text: "When I see a system that is disorganized or unfair, I feel a physical, almost instinctive urge to immediately fix it.", type: 1 },
  { id: 35, text: "I am absolutely deeply terrified of making a mistake, as I equate making an error with being fundamentally 'bad'.", type: 1 },
  { id: 36, text: "I hold myself to impossibly high moral and ethical standards, and I desperately expect those closest to me to do the same.", type: 1 },
];

export const tritypeArchetypes = {
  // 1-2 Combos
  "125": { name: "The Mentor", description: "You are intelligent, caring, and highly principled. You want to be helpful and wise, striving for excellence and sharing your knowledge to guide others.", strengths: ["Wise and advising", "Highly responsible", "Knowledgeable"], color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50", borderLight: "border-blue-100" },
  "126": { name: "The Supporter", description: "You are incredibly responsible, loyal, and deeply caring. You are driven by a strong moral compass and a desire to be of service while maintaining community rules.", strengths: ["Loyal and steadfast", "Community-oriented", "Hardworking"], color: "from-teal-500 to-emerald-600", bgLight: "bg-teal-50", borderLight: "border-teal-100" },
  "127": { name: "The Teacher", description: "You are enthusiastic, principled, and extremely caring. You bring a sense of joy and optimism to your teaching and helping, effortlessly inspiring others.", strengths: ["Optimistic", "Inspiring", "Highly ethical"], color: "from-amber-400 to-orange-500", bgLight: "bg-amber-50", borderLight: "border-amber-100" },
  // 1-3 Combos
  "135": { name: "The Technical Expert", description: "You are highly precise, incredibly driven, and fiercely intellectual. You excel at creating brilliant, efficient systems and achieving complex technical mastery.", strengths: ["Precision-oriented", "Highly focused", "Efficient problem solver"], color: "from-slate-600 to-slate-800", bgLight: "bg-slate-50", borderLight: "border-slate-200" },
  "136": { name: "The Taskmaster", description: "You are exceptionally hardworking, highly successful, and deeply loyal to your duties. You are the backbone of any organization, making sure everything runs flawlessly.", strengths: ["Exceptional work ethic", "Highly organized", "Reliable"], color: "from-indigo-500 to-blue-700", bgLight: "bg-indigo-50", borderLight: "border-indigo-100" },
  "137": { name: "The Systems Builder", description: "You are an innovative, ambitious, and perfectionistic visionary. You combine incredibly high standards with endless energy to build fast-paced, successful systems.", strengths: ["Visionary thinker", "Highly productive", "Innovative"], color: "from-orange-500 to-red-500", bgLight: "bg-orange-50", borderLight: "border-orange-100" },
  // 1-4 Combos
  "145": { name: "The Researcher", description: "You are introverted, deeply intellectual, and highly intuitive. You possess an insatiable curiosity and a profound need to correctly understand the complex depths of the world.", strengths: ["Deeply analytical", "Intuitively brilliant", "Original"], color: "from-purple-600 to-indigo-800", bgLight: "bg-purple-50", borderLight: "border-purple-100" },
  "146": { name: "The Philosopher", description: "You are morally focused, emotionally deep, and highly seeking. You are constantly searching for meaning and absolute security, wrestling with profound philosophical questions.", strengths: ["Morally driven", "Deeply feeling", "Authentic"], color: "from-cyan-600 to-blue-700", bgLight: "bg-cyan-50", borderLight: "border-cyan-100" },
  "147": { name: "The Visionary", description: "You are highly creative, deeply idealistic, and radically innovative. You want to transform the mundane world into something perfectly beautiful and exciting.", strengths: ["Brilliantly creative", "Idealistic", "Passionate"], color: "from-pink-500 to-rose-600", bgLight: "bg-pink-50", borderLight: "border-pink-100" },
  
  // 2-5 Combos
  "258": { name: "The Strategist", description: "You are highly protective, deeply analytical, and surprisingly caring. You combine powerful force with brilliant intellect to fiercely protect those under your care.", strengths: ["Fiercely protective", "Highly strategic", "Independent"], color: "from-red-600 to-slate-800", bgLight: "bg-red-50", borderLight: "border-red-100" },
  "259": { name: "The Problem Solver", description: "You are deeply peaceful, intellectually curious, and warmly helpful. You excel at quietly fixing massive problems behind the scenes without needing any of the credit.", strengths: ["Comforting presence", "Objective analyst", "Humble"], color: "from-teal-400 to-cyan-500", bgLight: "bg-teal-50", borderLight: "border-teal-100" },
  // 2-6 Combos
  "268": { name: "The Rescuer", description: "You are intensely deeply loyal, powerfully protective, and incredibly caring. You rush straight into danger to save the underdog and fiercely guard your community.", strengths: ["Loyal champion", "Protective", "Courageous"], color: "from-rose-500 to-red-600", bgLight: "bg-rose-50", borderLight: "border-rose-100" },
  "269": { name: "The Good Samaritan", description: "You are the ultimate peacemaker, deeply loyal and boundlessly helpful. You want everybody to essentially just get along and will happily sacrifice yourself for group harmony.", strengths: ["Deeply accommodating", "Loyal", "Gentle"], color: "from-emerald-400 to-teal-500", bgLight: "bg-emerald-50", borderLight: "border-emerald-100" },
  // 2-7 Combos
  "278": { name: "The Free Spirit", description: "You are incredibly energetic, fiercely independent, and warmly giving. You love grand adventures and use your massive charm and power to ensure everyone has a fantastic time.", strengths: ["Vibrantly charismatic", "Empowering", "Adventurous"], color: "from-amber-500 to-red-500", bgLight: "bg-amber-50", borderLight: "border-amber-100" },
  "279": { name: "The Peacemaker", description: "You are entirely upbeat, deeply gentle, and incredibly friendly. You spread massive positivity everywhere you go, completely avoiding conflict to maintain a happy environment.", strengths: ["Endlessly positive", "Friendly", "Harmonious"], color: "from-yellow-400 to-lime-500", bgLight: "bg-yellow-50", borderLight: "border-yellow-100" },

  // 3-5 Combos
  "358": { name: "The Solution Master", description: "You are highly ambitious, brilliantly intellectual, and powerfully direct. You are a natural CEO who efficiently solves incredibly massive, complex problems with brute force and logic.", strengths: ["Highly executive", "Brilliantly logical", "Unstoppable"], color: "from-slate-700 to-slate-900", bgLight: "bg-slate-50", borderLight: "border-slate-200" },
  "359": { name: "The Thinker", description: "You are deeply intellectual, comfortably peaceful, and highly successful. You mask your immense internal drive behind a cool, calm, and collected, introverted exterior.", strengths: ["Calmly successful", "Deeply observant", "Balanced"], color: "from-sky-500 to-blue-600", bgLight: "bg-sky-50", borderLight: "border-sky-100" },
  // 3-6 Combos
  "368": { name: "The Justice Fighter", description: "You are fiercely loyal, incredibly driven, and highly confrontational. You use your amazing success and immense power to physically battle against any perceived injustices.", strengths: ["Fierce advocate", "Highly protective", "Driven"], color: "from-red-600 to-orange-600", bgLight: "bg-red-50", borderLight: "border-red-100" },
  "369": { name: "The Mediator", description: "You are highly adaptable, intensely loyal, and deeply diplomatic. You perfectly balance your amazing drive for huge success with a desperate need for peaceful, secure relationships.", strengths: ["Highly diplomatic", "Adaptable", "Secure"], color: "from-teal-500 to-blue-500", bgLight: "bg-teal-50", borderLight: "border-teal-100" },
  // 3-7 Combos
  "378": { name: "The Mover and Shaker", description: "You are absolutely explosive, wildly ambitious, and powerfully charismatic. You are a torrential force of nature, relentlessly innovating and conquering new territories.", strengths: ["Fiercely bold", "Charismatic", "Unstoppable"], color: "from-orange-500 to-yellow-500", bgLight: "bg-orange-50", borderLight: "border-orange-100" },
  "379": { name: "The Ambassador", description: "You are charming, endlessly optimistic, and deeply peaceful. You effortlessly glide through life, using your incredible charm and amazing positivity to achieve your massive goals without conflict.", strengths: ["Highly charming", "Optimistic", "Smooth operator"], color: "from-yellow-300 to-amber-500", bgLight: "bg-yellow-50", borderLight: "border-yellow-100" },

  // 4-5 Combos
  "458": { name: "The Scholar", description: "You are deeply introverted, fiercely independent, and powerfully insightful. You dive absolutely fearlessly into the darkest depths of massive intellectual and emotional territory.", strengths: ["Fearless intellect", "Deeply original", "Intense"], color: "from-fuchsia-600 to-purple-800", bgLight: "bg-fuchsia-50", borderLight: "border-fuchsia-100" },
  "459": { name: "The Contemplative", description: "You are highly introspective, deeply peaceful, and intricately cerebral. You live almost entirely inside your own incredibly rich, absolutely massive world of imagination and theory.", strengths: ["Deeply imaginative", "Calm and observant", "Profound"], color: "from-indigo-400 to-purple-500", bgLight: "bg-indigo-50", borderLight: "border-indigo-100" },
  // 4-6 Combos
  "468": { name: "The Truth Teller", description: "You are intensely reactive, deeply authentic, and fiercely protective. You possess an absolutely burning need to violently rip away the facade and scream the absolute raw truth.", strengths: ["Fiercely authentic", "Protective", "Unafraid of truth"], color: "from-rose-600 to-fuchsia-700", bgLight: "bg-rose-50", borderLight: "border-rose-100" },
  "469": { name: "The Seeker", description: "You are deeply questioning, highly feeling, and entirely peaceful. You grapple constantly with massive self-doubt and deep melancholia, searching endlessly for a perfectly true path.", strengths: ["Intensely authentic", "Gentle", "Searching"], color: "from-cyan-500 to-purple-500", bgLight: "bg-cyan-50", borderLight: "border-cyan-100" },
  // 4-7 Combos
  "478": { name: "The Messenger", description: "You are wildly wildly expressive, deeply unconventional, and powerfully bold. You possess an absolute genius for cutting-edge creativity and entirely fearless self-expression.", strengths: ["Wildly original", "Fearless", "Creative genius"], color: "from-pink-500 to-orange-500", bgLight: "bg-pink-50", borderLight: "border-pink-100" },
  "479": { name: "The Gentle Spirit", description: "You are magically incredibly idealistic, endlessly romantic, and wonderfully peaceful. You bring entirely shimmering, magical light to the deeply mundane world through absolute pure imagination.", strengths: ["Deeply compassionate", "Magical creativity", "Uplifting"], color: "from-violet-400 to-fuchsia-500", bgLight: "bg-violet-50", borderLight: "border-violet-100" }
};

export function calculateTritypeResult(answersObj) {
  // Extract values from Object to array if needed
  const answers = Array.isArray(answersObj) ? answersObj : Object.values(answersObj);
  
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  
  answers.forEach((ans) => {
    scores[ans.type] += ans.value;
  });

  const getHighest = (arr) => {
    let highestType = arr[0];
    let highestScore = -999;
    arr.forEach(type => {
      // Small random tie-breaker is purely optional, but we can just take the first if tied
      if (scores[type] > highestScore) {
        highestScore = scores[type];
        highestType = type;
      }
    });
    return { type: highestType, score: highestScore };
  };

  const gut = getHighest([8, 9, 1]);
  const heart = getHighest([2, 3, 4]);
  const head = getHighest([5, 6, 7]);

  const topThree = [gut, heart, head].sort((a, b) => b.score - a.score);
  
  const dominantType = topThree[0].type;
  const secondaryType = topThree[1].type;
  const tertiaryType = topThree[2].type;

  const tritypeNumStr = `${dominantType}${secondaryType}${tertiaryType}`;
  // To fetch the archetype from the dictionary, we sort the digits numerically.
  const archetypeKey = [dominantType, secondaryType, tertiaryType].sort().join('');

  const archetypeInfo = tritypeArchetypes[archetypeKey] || {
    name: "The Unknown",
    description: "An incredibly rare psychological combination.",
    strengths: ["Complex", "Unique", "Multifaceted"],
    color: "from-slate-400 to-slate-500",
    bgLight: "bg-slate-50",
    borderLight: "border-slate-100"
  };

  const MAX_SCORE_PER_TYPE = 28; // 4 questions * 7 max score points per question
  return {
    tritypeFull: tritypeNumStr,
    archetypeKey: archetypeKey,
    dominantType,
    archetypeInfo,
    breakdown: {
      gut: Math.max(0, Math.round((gut.score / MAX_SCORE_PER_TYPE) * 100)),
      heart: Math.max(0, Math.round((heart.score / MAX_SCORE_PER_TYPE) * 100)),
      head: Math.max(0, Math.round((head.score / MAX_SCORE_PER_TYPE) * 100))
    }
  };
}
