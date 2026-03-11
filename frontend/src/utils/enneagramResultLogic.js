// Enneagram Types and their specific mapping logic
// 1-9 Types corresponding to their Centers (Gut, Heart, Head)

export const enneagramTypes = {
  1: {
    name: "The Reformer",
    coreFear: "Being corrupt, evil, or defective",
    coreDesire: "To be good, to have integrity, to be balanced",
    description: "Principled, purposeful, self-controlled, and perfectionistic. Ones are conscientious and ethical, with a strong sense of right and wrong. They strive to improve things but can become highly critical.",
    strengths: [
      "Deeply principled and highly reliable, consistently doing what is right even when it is difficult.",
      "Incredible attention to detail with an unmatched ability to optimize systems and correct errors.",
      "Deeply fair, objective, and driven by a strong, unwavering moral compass."
    ],
    weaknesses: [
      "Can be overwhelmingly critical of themselves and others, projecting impossible standards.",
      "Tend to suppress their own desires and anger, leading to sudden bursts of tense resentment.",
      "Prone to rigid, black-and-white thinking when under severe stress."
    ],
    relationshipDynamics: "In relationships, Ones are intensely loyal and constantly strive to build the 'perfect' partnership. They express love through acts of service and helping their partner improve. However, their critical eye can sometimes make their partners feel heavily scrutinized or never quite good enough.",
    workplaceBehavior: "Ones thrive in environments that require extreme precision, ethical standards, and clear rules. They are the ultimate quality-control experts, but can struggle to delegate tasks because they deeply fear others won't execute them perfectly.",
    famousExamples: ["Nelson Mandela", "Mahatma Gandhi", "Michelle Obama", "Steve Jobs"],
    color: "from-sky-500 to-blue-600",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-100",
    center: "Gut (Instinctive)",
    wings: [9, 2],
    growth: 7,
    stress: 4
  },
  2: {
    name: "The Helper",
    coreFear: "Being unwanted or unworthy of being loved",
    coreDesire: "To feel loved, appreciated, and needed",
    description: "Generous, demonstrative, people-pleasing, and possessive. Twos are empathetic, sincere, and warm-hearted. They are driven to be close to others but can slip into doing things for others in order to be needed.",
    strengths: [
      "Extraordinarily highly empathetic, instinctively knowing exactly what other people feel and need.",
      "Incredibly generous and willing to sacrifice their own comfort to ensure others are taken care of.",
      "Able to foster deeply warm, emotionally rich, and intensely intimate connections with almost anyone."
    ],
    weaknesses: [
      "Can become highly manipulative or passive-aggressive when they feel their help is unappreciated.",
      "Struggle profoundly to acknowledge their own needs or ask for help, leading to severe burnout.",
      "May lack personal boundaries and become overly enmeshed in the lives and problems of others."
    ],
    relationshipDynamics: "Twos are the ultimate warm, devoted partners. They will shower their significant other with affection, gifts, and emotional support. The danger lies in their tendency to quietly keep a 'mental ledger' of everything they have done, eventually exploding if they feel the emotional scales are tipped.",
    workplaceBehavior: "In the workplace, Twos are the glue that holds teams together. They excel in HR, nursing, customer relations, or any role where they can nurture others. They often take on far too much invisible emotional labor.",
    famousExamples: ["Mother Teresa", "Princess Diana", "Dolly Parton", "Fred Rogers"],
    color: "from-rose-400 to-pink-500",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-100",
    center: "Heart (Feeling)",
    wings: [1, 3],
    growth: 4,
    stress: 8
  },
  3: {
    name: "The Achiever",
    coreFear: "Being worthless or without inherent value",
    coreDesire: "To feel valuable and worthwhile",
    description: "Adaptable, excelling, driven, and image-conscious. Threes are self-assured, attractive, and charming. Ambitious and competent, they can also be status-conscious and highly driven for advancement.",
    strengths: [
      "Unbelievably driven and effective; they can conceptualize a goal and relentlessly execute it.",
      "Highly adaptable and charming social chameleons who can read a room and deliver exactly what is desired.",
      "Inspiring and motivating leaders who push everyone around them to elevate their standards."
    ],
    weaknesses: [
      "Can become dangerously disconnected from their authentic feelings, confusing 'doing' with 'being'.",
      "Highly prone to immense workaholism and cutting corners to maintain an image of success.",
      "May view other people primarily as obstacles, competitors, or stepping stones."
    ],
    relationshipDynamics: "Threes want a partner who reflects well on them and supports their massive ambitions. They bring intense energy, motivation, and excitement to relationships. However, their partners often feel they are playing a supporting role to the Three's career, struggling to coax the Three to be truly emotionally vulnerable.",
    workplaceBehavior: "Threes are the absolute stars of the corporate world. They are highly competitive, incredibly efficient, and naturally rise to leadership or executive roles. They loathe inefficiency and will rapidly dismantle processes that don't yield tangible results.",
    famousExamples: ["Taylor Swift", "Tony Robbins", "Oprah Winfrey", "Tom Cruise"],
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-100",
    center: "Heart (Feeling)",
    wings: [2, 4],
    growth: 6,
    stress: 9
  },
  4: {
    name: "The Individualist",
    coreFear: "Having no identity or personal significance",
    coreDesire: "To create an identity and find themselves",
    description: "Expressive, dramatic, self-absorbed, and temperamental. Fours are self-aware, sensitive, and reserved. They are emotionally honest and personal, but can also be moody and self-conscious.",
    strengths: [
      "Incredibly emotionally courageous; willing to sit with deep grief and darkness that terrifies others.",
      "Highly creative, possessing a profound, unique aesthetic and a natural gift for artistic expression.",
      "Deeply authentic; they refuse to fake their feelings or conform to shallow societal expectations."
    ],
    weaknesses: [
      "Prone to intense bouts of melancholy, envy, and feeling like they are uniquely fatally flawed.",
      "Can become highly self-absorbed and dramatically over-identify with their emotional suffering.",
      "Often push people away when they feel misunderstood, preferring isolation to inauthenticity."
    ],
    relationshipDynamics: "Fours desire a romantic savior who will finally understand their complex depths. They bring immense passion, romance, and emotional intensity to relationships. But their idealization often turns to disappointment when their partner inevitably proves to be an ordinary, flawed human.",
    workplaceBehavior: "Fours need their work to be a true extension of their soul. They suffocate in sterile, corporate environments. They excel as writers, designers, therapists, or artists, requiring autonomy and an environment that values emotional intelligence over sheer output.",
    famousExamples: ["Vincent van Gogh", "Frida Kahlo", "Kurt Cobain", "Edgar Allan Poe"],
    color: "from-purple-500 to-fuchsia-600",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-100",
    center: "Heart (Feeling)",
    wings: [3, 5],
    growth: 1,
    stress: 2
  },
  5: {
    name: "The Investigator",
    coreFear: "Being useless, helpless, or incapable",
    coreDesire: "To be capable and competent",
    description: "Perceptive, innovative, secretive, and isolated. Fives are alert, insightful, and curious. They are able to concentrate and focus on developing complex ideas and skills, but can become detached.",
    strengths: [
      "Incredibly sharp, objective thinkers capable of mastering highly complex, esoteric systems.",
      "Unflappable in a crisis; they detach from emotion and observe situations with pure logic.",
      "Highly independent; they ask for very little from others and respect the boundaries of everyone."
    ],
    weaknesses: [
      "Can become completely detached from their physical bodies and entirely isolated in their own minds.",
      "Prone to intense intellectual arrogance and dismissing the emotional experiences of others.",
      "Suffer from 'scarcity mindset', hoarding their time, energy, and resources out of fear of depletion."
    ],
    relationshipDynamics: "Fives are fiercely protective of their autonomy and require partners who don't demand constant emotional processing. They express love by sharing their highly guarded inner world and obscure interests. Intimacy for a Five means allowing someone behind their heavily fortified walls.",
    workplaceBehavior: "Fives are the ultimate deep-work specialists. They excel in research, engineering, academia, and highly technical fields. They despise excessive meetings and micromanagement, preferring to be locked in a room to solve complex problems independently.",
    famousExamples: ["Albert Einstein", "Bill Gates", "Mark Zuckerberg", "Stephen King"],
    color: "from-indigo-500 to-blue-600",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-100",
    center: "Head (Thinking)",
    wings: [4, 6],
    growth: 8,
    stress: 7
  },
  6: {
    name: "The Loyalist",
    coreFear: "Being without support or guidance",
    coreDesire: "To have security and support",
    description: "Engaging, responsible, anxious, and suspicious. Sixes are reliable, hard-working, and excellent troubleshooters. They foresee problems and foster cooperation, but can also become defensive and evasive.",
    strengths: [
      "Incredibly loyal, deeply committed friends and partners who will absolutely die for their tribe.",
      "Unparalleled troubleshooters; they intuitively foresee every possible point of failure and plan for it.",
      "Highly courageous; despite their internal anxiety, they will face massive danger to protect others."
    ],
    weaknesses: [
      "Plagued by constant internal doubt, anxiety, and a highly suspicious nature regarding authority.",
      "Prone to intense 'analysis paralysis', unable to act without gathering endless external reassurance.",
      "Can aggressively project their own insecurities onto others, randomly testing their loyalty."
    ],
    relationshipDynamics: "Sixes take a long time to trust, subjecting potential partners to unconscious 'tests'. Once you pass, you have a fiercely loyal partner for life. They seek absolute stability and transparency, and nothing damages a relationship with a Six more quickly than unpredictability or broken promises.",
    workplaceBehavior: "Sixes are the bedrock of any institution. They are diligent, risk-averse, and highly collaborative. While they may not seek the spotlight, they are the ones ensuring the entire operation doesn't collapse. They thrive when they have clear expectations and a boss they deeply trust.",
    famousExamples: ["Tom Hanks", "Mark Twain", "Bruce Springsteen", "Marilyn Monroe"],
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-100",
    center: "Head (Thinking)",
    wings: [5, 7],
    growth: 9,
    stress: 3
  },
  7: {
    name: "The Enthusiast",
    coreFear: "Being deprived or trapped in pain",
    coreDesire: "To be satisfied and content",
    description: "Spontaneous, versatile, acquisitive, and scattered. Sevens are extroverted, optimistic, and playful. They are practical and bold, but their constant busyness can lead them to become over-extended.",
    strengths: [
      "Possess an incredibly infectious, boundless energy and a brilliant ability to quickly learn new skills.",
      "Highly resilient; they can reframe almost any disaster into an exciting positive learning experience.",
      "Visionary thinkers capable of connecting entirely disparate ideas into brilliant new combinations."
    ],
    weaknesses: [
      "Desperately flee from negative emotions, using constant activity and plans as an anesthetic.",
      "Highly prone to deep impulsivity, massive over-commitment, and leaving projects completely unfinished.",
      "Can be deeply unreliable, constantly suffering from severe FOMO and abandoning plans for better ones."
    ],
    relationshipDynamics: "Sevens are wildly fun, adventurous partners who turn everyday life into a thrilling movie. However, they are deeply terrified of being 'tied down'. When conflicts arise, their instinct is to literally run away. They need a grounding partner who doesn't suffocate their need for vast freedom.",
    workplaceBehavior: "Sevens are brilliant brainstormers and charismatic pitchmen. They excel in startups, dynamic creative agencies, and travel. However, they absolutely despise the 'follow-through' phase of a project. They need to be surrounded by people who can execute the brilliant ideas they generate.",
    famousExamples: ["Robin Williams", "Amelia Earhart", "Elton John", "Miley Cyrus"],
    color: "from-yellow-400 to-amber-500",
    bgLight: "bg-yellow-50",
    borderLight: "border-yellow-100",
    center: "Head (Thinking)",
    wings: [6, 8],
    growth: 5,
    stress: 1
  },
  8: {
    name: "The Challenger",
    coreFear: "Being harmed or controlled by others",
    coreDesire: "To protect themselves and be in control of their own life",
    description: "Self-confident, strong, assertive, and dominating. Eights are protective, resourceful, straight-talking, and decisive, but can also be ego-centric and domineering.",
    strengths: [
      "Possess a massive, undeniable physical and energetic presence; natural born, fearless leaders.",
      "Deeply protective champions of the underdog; they will relentlessly fight for those they love.",
      "Incredibly incredibly decisive and highly direct; they cut through massive complexity with brute force."
    ],
    weaknesses: [
      "Highly prone to severe anger and incredibly dominating, intimidating behavior when threatened.",
      "Fundamentally terrified of vulnerability, viewing any emotional softness as a deep, fatal weakness.",
      "Prone to pushing themselves to severe physical exhaustion by completely denying their own biological limits."
    ],
    relationshipDynamics: "Eights want a partner who can stand up to them. If you back down easily, they will lose respect for you. They express deep love through intense loyalty and physical protection. Their biggest struggle is lowering their massive armor to admit when they are actually hurt.",
    workplaceBehavior: "Eights are natural CEOs, entrepreneurs, and generals. They are completely unfazed by conflict and will make the harsh decisions everyone else is afraid of. They hate micromanagement and prefer to be the ones totally in charge, but must learn to not crush the spirits of more sensitive employees.",
    famousExamples: ["Martin Luther King Jr.", "Serena Williams", "Winston Churchill", "Frank Sinatra"],
    color: "from-red-500 to-rose-600",
    bgLight: "bg-red-50",
    borderLight: "border-red-100",
    center: "Gut (Instinctive)",
    wings: [7, 9],
    growth: 2,
    stress: 5
  },
  9: {
    name: "The Peacemaker",
    coreFear: "Loss and separation",
    coreDesire: "To have inner stability and peace of mind",
    description: "Receptive, reassuring, complacent, and resigned. Nines are accepting, trusting, and stable. They are usually creative, optimistic, and supportive, but can also be too willing to go along with others to keep the peace.",
    strengths: [
      "Incredibly incredibly gifted mediators who can truly understand and validate every possible perspective.",
      "Projects a deeply calming, intensely grounding 'earthy' energy that makes everyone feel totally accepted.",
      "Naturally inclusive and inherently supportive, lacking any trace of harsh ego or severe judgment."
    ],
    weaknesses: [
      "Prone to intense 'narcotization'—numbing themselves to their own anger with food, TV, or busywork.",
      "Deeply stubborn; they resist being controlled through passive-aggressive inaction rather than outward defiance.",
      "Will frequently completely abandon their own desires and merge with others simply to avoid any friction."
    ],
    relationshipDynamics: "Nines are incredibly comforting, low-maintenance partners. They happily merge with their partner's lifestyle and hobbies. However, their desperate desire to avoid conflict can lead to years of repressed, unspoken resentment. Their partners often have to force them to express a preference.",
    workplaceBehavior: "Nines are the diplomats of any office. They are excellent facilitators, counselors, and steady workers who never cause drama. The challenge for Nines is stepping into leadership and actually asserting themselves, as they prefer to quietly blend into the background.",
    famousExamples: ["Abraham Lincoln", "Barack Obama", "Marge Simpson", "Keanu Reeves"],
    color: "from-teal-400 to-cyan-500",
    bgLight: "bg-teal-50",
    borderLight: "border-teal-100",
    center: "Gut (Instinctive)",
    wings: [8, 1],
    growth: 3,
    stress: 6
  }
};

// Expanded 54 High-Impact Questions (6 per type)
const enneagramExpandedQuestions = [
    // TYPE 1: The Reformer
    { id: 1, text: "I have a harsh, relentless internal judge that constantly points out exactly how I—and others—could have done things better.", type: 1, multiplier: 1 },
    { id: 2, text: "When I see a system that is disorganized or unfair, I feel a physical, almost instinctive urge to immediately fix it.", type: 1, multiplier: 1 },
    { id: 3, text: "I frequently feel a deep, simmering resentment that I am the only one doing things 'the right way' while others slack off.", type: 1, multiplier: 1 },
    { id: 4, text: "I am absolutely deeply terrified of making a mistake, as I equate making an error with being fundamentally 'bad'.", type: 1, multiplier: 1 },
    { id: 5, text: "I often deny myself pleasure, rest, or relaxation until every single item on my to-do list is perfectly complete.", type: 1, multiplier: 1 },
    { id: 6, text: "I hold myself to impossibly high moral and ethical standards, and I desperately expect those closest to me to do the same.", type: 1, multiplier: 1 },

    // TYPE 2: The Helper
    { id: 7, text: "I constantly monitor the emotional temperature of the room and instantly adapt myself to make sure everyone else feels comfortable.", type: 2, multiplier: 1 },
    { id: 8, text: "I feel an overwhelming sense of anxiety if I suspect someone I care about is upset with me, and I will bend over backwards to fix it.", type: 2, multiplier: 1 },
    { id: 9, text: "I am highly skilled at anticipating what others need before they even ask, but I find it entirely impossible to ask for what *I* need.", type: 2, multiplier: 1 },
    { id: 10, text: "Deep down, I harbor a secret fear that if I stop being incredibly useful and deeply helpful to others, they will inevitably abandon me.", type: 2, multiplier: 1 },
    { id: 11, text: "I sometimes feel deeply exhausted or secretly resentful because I pour all my energy into others and rarely get the same level in return.", type: 2, multiplier: 1 },
    { id: 12, text: "I derive a massive amount of my self-worth from knowing that crucial people in my life intensely rely upon me.", type: 2, multiplier: 1 },

    // TYPE 3: The Achiever
    { id: 13, text: "I am fiercely competitive and highly driven; I measure my inherent worth by my tangible accomplishments and public successes.", type: 3, multiplier: 1 },
    { id: 14, text: "I intuitively know exactly how to alter my image, tone, and behavior to impress whoever happens to be my current audience.", type: 3, multiplier: 1 },
    { id: 15, text: "I struggle deeply to 'just relax' without feeling an intense underlying guilt that I am wasting time and falling behind my goals.", type: 3, multiplier: 1 },
    { id: 16, text: "My biggest fear is being perceived as a failure, being completely ordinary, or lacking any impressive distinguishing traits.", type: 3, multiplier: 1 },
    { id: 17, text: "I prioritize ruthless efficiency and rapid results above almost everything else, sometimes at the expense of my own personal feelings.", type: 3, multiplier: 1 },
    { id: 18, text: "If I am completely honest, I sometimes catch myself genuinely confusing 'who I am' with 'what I do for a living.'", type: 3, multiplier: 1 },

    // TYPE 4: The Individualist
    { id: 19, text: "I carry a deep, quiet sense of melancholy and a tragic feeling that there is something fundamentally missing inside me.", type: 4, multiplier: 1 },
    { id: 20, text: "I absolutely despise the ordinary; I am fiercely committed to expressing my unique, authentic self through aesthetics, art, or emotions.", type: 4, multiplier: 1 },
    { id: 21, text: "I frequently feel deeply misunderstood by the rest of the world, feeling like an alien surrounded by shallow, simplistic people.", type: 4, multiplier: 1 },
    { id: 22, text: "I am totally unafraid of 'dark' emotions; in fact, I often find a strange, comforting beauty in sadness, grief, and longing.", type: 4, multiplier: 1 },
    { id: 23, text: "I often find myself longing intensely for relationships or situations from the past, rather than enjoying what I actually have right now.", type: 4, multiplier: 1 },
    { id: 24, text: "I sometimes secretly pull away from people who get too close, just to see if they care enough to desperately chase after me.", type: 4, multiplier: 1 },

    // TYPE 5: The Investigator
    { id: 25, text: "My energy is an extremely limited resource; interacting with other humans heavily drains my battery, requiring vast amounts of isolated alone time.", type: 5, multiplier: 1 },
    { id: 26, text: "In chaotic or highly emotional situations, I effortlessly shut down my feelings and retreat entirely into cold, objective observation.", type: 5, multiplier: 1 },
    { id: 27, text: "I hoard knowledge and deeply specialized information because my absolute greatest fear is being fundamentally incapable, stupid, or useless.", type: 5, multiplier: 1 },
    { id: 28, text: "I passionately dislike being physically or emotionally dependent on anyone, going to extreme lengths to ensure my absolute self-sufficiency.", type: 5, multiplier: 1 },
    { id: 29, text: "I often compartmentalize my life so strictly that my work friends know absolutely nothing about my romantic or family life.", type: 5, multiplier: 1 },
    { id: 30, text: "I feel incredibly intruded upon when people demand instantaneous emotional reactions from me; I literally need time alone to process how I feel.", type: 5, multiplier: 1 },

    // TYPE 6: The Loyalist
    { id: 31, text: "My brain is constantly scanning the horizon for potential absolute worst-case scenarios so that I can intricately prepare for them.", type: 3, multiplier: 0 }, // DUMMY SKIP
    { id: 31, text: "My brain is constantly scanning the horizon for potential worst-case scenarios so that I can intricately prepare for them.", type: 6, multiplier: 1 },
    { id: 32, text: "I have a deeply complex relationship with authority; I desperately want a strong leader to trust, but I am fiercely suspicious of their hidden motives.", type: 6, multiplier: 1 },
    { id: 33, text: "I struggle heavily with crippling self-doubt and often poll several of my friends for their opinions before I can finalize a major decision.", type: 6, multiplier: 1 },
    { id: 34, text: "Once you have truly earned my trust, I am ferociously loyal; I will vigorously defend my 'tribe' against any absolutely massive external threat.", type: 6, multiplier: 1 },
    { id: 35, text: "My internal monologue is essentially an endless committee of conflicting voices questioning if I am making a fatal mistake.", type: 6, multiplier: 1 },
    { id: 36, text: "I feel vastly more secure operating under clear guidelines, boundaries, and established systems rather than wildly flying by the seat of my pants.", type: 6, multiplier: 1 },

    // TYPE 7: The Enthusiast
    { id: 37, text: "I have a brilliant, fast-paced mind that constantly jumps between thousands of exciting new ideas, projects, and future grand adventures.", type: 7, multiplier: 1 },
    { id: 38, text: "I absolutely cannot stand feeling trapped, bored, or limited; committing to a single life path feels terrifying because it cuts off my options.", type: 7, multiplier: 1 },
    { id: 39, text: "When painful or highly uncomfortable emotions begin to surface, my immediate instinct is to enthusiastically distract myself with fun, food, or activity.", type: 7, multiplier: 1 },
    { id: 40, text: "I am an eternal optimist who can effortlessly reframe almost any massive failure into a thrilling, incredibly positive learning narrative.", type: 7, multiplier: 1 },
    { id: 41, text: "I start a dozen brilliant projects with massive enthusiasm, but I frequently abandon them the exact instant the work becomes tedious or repetitive.", type: 7, multiplier: 1 },
    { id: 42, text: "I genuinely fear that if I stop moving and actually confront the painful depths of my own mind, the underlying pain will completely swallow me alive.", type: 7, multiplier: 1 },

    // TYPE 8: The Challenger
    { id: 43, text: "I possess an intense, deeply powerful energy that naturally commands the room; I instinctively step into leadership vacuums during intense crises.", type: 8, multiplier: 1 },
    { id: 44, text: "My absolute greatest core fear is being controlled, manipulated, or subjugated by someone else; I refuse to ever be weak or vulnerable.", type: 8, multiplier: 1 },
    { id: 45, text: "I have absolutely no issue with open conflict or heated arguments; in fact, I often push people just to see what their true, honest substance is.", type: 8, multiplier: 1 },
    { id: 46, text: "I am fiercely protective of exactly those I love; if you threaten my people or the innocent underdog, I will destroy you without a second thought.", type: 8, multiplier: 1 },
    { id: 47, text: "I am incredibly direct and completely blunt; I despise office politics, passive-aggression, and fragile people who cannot handle the harsh truth.", type: 8, multiplier: 1 },
    { id: 48, text: "I struggle deeply with recognizing my own exhaustion; I push my physical body to massive extremes, totally denying any biological limitations.", type: 8, multiplier: 1 },

    // TYPE 9: The Peacemaker
    { id: 49, text: "I possess a profound, nearly magical ability to truly see, entirely comprehend, and deeply validate all opposing sides of any complex argument.", type: 9, multiplier: 1 },
    { id: 50, text: "I routinely sacrifice what I truly want and essentially merge with the desires of my partner or friends just to maintain absolute peace and harmony.", type: 9, multiplier: 1 },
    { id: 51, text: "When I am stressed, I 'numb out' and completely distract myself with highly comforting, entirely mindless routines instead of actually solving the problem.", type: 9, multiplier: 1 },
    { id: 52, text: "I desperately hate the feeling of intense tension or conflict; I will frequently just check out emotionally entirely rather than fight back.", type: 9, multiplier: 1 },
    { id: 53, text: "I am deeply stubborn, but instead of aggressively fighting you directly, I will simply dig in my heels through passive-aggressively 'forgetting' to do it.", type: 9, multiplier: 1 },
    { id: 54, text: "I often feel like my own deeply authentic presence doesn't actually matter that much, deeply feeling that the world will go on spinning perfectly well without my input.", type: 9, multiplier: 1 }
];

// Ensure no duplicate IDs filtering (fix for 31 duplicate safety)
const cleanExpandedQuestions = enneagramExpandedQuestions.filter(q => q.multiplier > 0);

// Shuffle array
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

// Shuffled version for uniform testing
export const enneagramTestQuestions = shuffle([...cleanExpandedQuestions]);

export function calculateEnneagramResult(answers) {
    // Score tracking for types 1-9
    const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  
    answers.forEach(answer => {
      scores[answer.type] += answer.value * answer.multiplier;
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
    
    // Calculate wing (highest of the adjacent types)
    const possibleWings = enneagramTypes[PrimaryType].wings;
    const wing1Score = scores[possibleWings[0]];
    const wing2Score = scores[possibleWings[1]];
    
    const WingType = wing1Score >= wing2Score ? possibleWings[0] : possibleWings[1];
    
    // Normalize breakdown scores (percentages out of max possible per type -> 6 questions * 7 points max = 42 points)
    const MAX_SCORE_PER_TYPE = 42;
    const breakdown = {};
    for (let i = 1; i <= 9; i++) {
        breakdown[i] = Math.round((scores[i] / MAX_SCORE_PER_TYPE) * 100);
    }
  
    return {
      type: PrimaryType,
      wing: WingType,
      fullTitle: `${PrimaryType}w${WingType}`,
      info: enneagramTypes[PrimaryType],
      breakdown
    };
}
