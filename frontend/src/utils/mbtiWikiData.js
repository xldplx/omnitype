// mbtiWikiData.js - Comprehensive MBTI Jungian Cognitive Stacks & Detailed Type Guides

export const temperamentGroups = {
  analysts: {
    id: 'analysts',
    title: 'The Analysts',
    code: 'NT',
    badge: '🟣 Analysts (NT)',
    tagline: 'Strategic Vision, Logic & Systems Thinking',
    desc: 'Driven by curiosity, intellectual rigor, and relentless optimization of complex structures.',
    color: 'from-indigo-500 to-purple-600',
    themeBg: 'bg-indigo-50/70',
    themeBorder: 'border-indigo-200/80',
    themeText: 'text-indigo-700',
    types: ['INTJ', 'INTP', 'ENTJ', 'ENTP']
  },
  diplomats: {
    id: 'diplomats',
    title: 'The Diplomats',
    code: 'NF',
    badge: '🟢 Diplomats (NF)',
    tagline: 'Empathy, Authenticity & Human Growth',
    desc: 'Guided by core values, interpersonal resonance, and a passion for helping people reach their potential.',
    color: 'from-emerald-500 to-teal-600',
    themeBg: 'bg-emerald-50/70',
    themeBorder: 'border-emerald-200/80',
    themeText: 'text-emerald-700',
    types: ['INFJ', 'INFP', 'ENFJ', 'ENFP']
  },
  sentinels: {
    id: 'sentinels',
    title: 'The Sentinels',
    code: 'SJ',
    badge: '🔵 Sentinels (SJ)',
    tagline: 'Reliability, Order & Community Stewardship',
    desc: 'Anchored by duty, time-tested wisdom, and steadfast dedication to structural stability.',
    color: 'from-sky-500 to-blue-600',
    themeBg: 'bg-sky-50/70',
    themeBorder: 'border-sky-200/80',
    themeText: 'text-sky-700',
    types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ']
  },
  explorers: {
    id: 'explorers',
    title: 'The Explorers',
    code: 'SP',
    badge: '🟡 Explorers (SP)',
    tagline: 'Spontaneity, Action & Aesthetic Mastery',
    desc: 'Thriving in the tangible moment with adaptability, quick instincts, and creative freedom.',
    color: 'from-amber-500 to-orange-600',
    themeBg: 'bg-amber-50/70',
    themeBorder: 'border-amber-200/80',
    themeText: 'text-amber-700',
    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP']
  }
};

export const getTypeTemperament = (typeCode) => {
  const code = (typeCode || '').toUpperCase();
  if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(code)) return temperamentGroups.analysts;
  if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(code)) return temperamentGroups.diplomats;
  if (['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(code)) return temperamentGroups.sentinels;
  if (['ISTP', 'ISFP', 'ESTP', 'ESFP'].includes(code)) return temperamentGroups.explorers;
  return temperamentGroups.analysts;
};

// All 16 Jungian Cognitive Stacks with plain-English insights
export const mbtiCognitiveStacks = {
  INTJ: [
    { rank: "1st (Dominant)", function: "Ni", name: "Introverted Intuition", role: "The Visionary Blueprint", desc: "Synthesizes subconscious data, patterns, and long-term trajectory into sharp strategic visions." },
    { rank: "2nd (Auxiliary)", function: "Te", name: "Extraverted Thinking", role: "The Execution Engine", desc: "Organizes external reality, sets benchmarks, and eliminates inefficiencies with decisive logic." },
    { rank: "3rd (Tertiary)", function: "Fi", name: "Introverted Feeling", role: "The Moral Core", desc: "A private, steadfast set of internal values and ethics that guides personal convictions." },
    { rank: "4th (Inferior)", function: "Se", name: "Extraverted Sensing", role: "The Sensory Grounding", desc: "Under extreme stress, may overindulge in sensory distractions or feel overwhelmed by sudden physical chaos." }
  ],
  INTP: [
    { rank: "1st (Dominant)", function: "Ti", name: "Introverted Thinking", role: "The Truth Detector", desc: "Deconstructs complex systems to build precise, contradiction-free logical frameworks." },
    { rank: "2nd (Auxiliary)", function: "Ne", name: "Extraverted Intuition", role: "The Idea Connector", desc: "Generates novel concepts, explores 'what if' possibilities, and sees unexpected linkages." },
    { rank: "3rd (Tertiary)", function: "Si", name: "Introverted Sensing", role: "The Memory Archive", desc: "Stores specific facts about favorite topics, though everyday routine tasks may be ignored." },
    { rank: "4th (Inferior)", function: "Fe", name: "Extraverted Feeling", role: "The Secret Heart", desc: "Values social harmony deep down, but heavy emotional pressure feels confusing and draining." }
  ],
  ENTJ: [
    { rank: "1st (Dominant)", function: "Te", name: "Extraverted Thinking", role: "The Grand Director", desc: "Instantly imposes order, marshals resources, and drives teams toward strategic goals." },
    { rank: "2nd (Auxiliary)", function: "Ni", name: "Introverted Intuition", role: "The Strategic Horizon", desc: "Forecasts long-term trends, implications, and opportunities with clear foresight." },
    { rank: "3rd (Tertiary)", function: "Se", name: "Extraverted Sensing", role: "The Tactical Driver", desc: "Thrives in fast-paced real-time execution, commanding situations with sharp presence." },
    { rank: "4th (Inferior)", function: "Fi", name: "Introverted Feeling", role: "The Hidden Compass", desc: "Vulnerable to suppressing personal emotions until stress triggers uncharacteristic self-doubt." }
  ],
  ENTP: [
    { rank: "1st (Dominant)", function: "Ne", name: "Extraverted Intuition", role: "The Possibility Engine", desc: "Rapidly scans the horizon for breakthrough ideas, synergies, and unconventional solutions." },
    { rank: "2nd (Auxiliary)", function: "Ti", name: "Introverted Thinking", role: "The Logic Scalpel", desc: "Stress-tests principles and spots flaws in arguments to refine ideas into viable concepts." },
    { rank: "3rd (Tertiary)", function: "Fe", name: "Extraverted Feeling", role: "The Charismatic Spark", desc: "Engages audiences with wit and charm, reading interpersonal dynamics to captivate the room." },
    { rank: "4th (Inferior)", function: "Si", name: "Introverted Sensing", role: "The Detail Anchor", desc: "Under stress, struggles with monotonous repetition, rigid routines, or tedious administration." }
  ],
  INFJ: [
    { rank: "1st (Dominant)", function: "Ni", name: "Introverted Intuition", role: "The Insight Oracle", desc: "Intuits underlying motives, emotional undercurrents, and future outcomes with quiet depth." },
    { rank: "2nd (Auxiliary)", function: "Fe", name: "Extraverted Feeling", role: "The Harmonic Shield", desc: "Maintains emotional equilibrium, offering empathetic support while uplifting group morale." },
    { rank: "3rd (Tertiary)", function: "Ti", name: "Introverted Thinking", role: "The Inner Analyst", desc: "Subjectively dissects theories and ideas to verify that feelings align with logical consistency." },
    { rank: "4th (Inferior)", function: "Se", name: "Extraverted Sensing", role: "The Sensory Release", desc: "Can suffer sensory overload in chaotic environments or overindulge in comforts when burned out." }
  ],
  INFP: [
    { rank: "1st (Dominant)", function: "Fi", name: "Introverted Feeling", role: "The Authenticity Core", desc: "Evaluates every experience through an internal spectrum of ethics, empathy, and personal truth." },
    { rank: "2nd (Auxiliary)", function: "Ne", name: "Extraverted Intuition", role: "The Poetic Loom", desc: "Weaves metaphors, explores artistic alternatives, and sees hidden beauty in life's complexities." },
    { rank: "3rd (Tertiary)", function: "Si", name: "Introverted Sensing", role: "The Nostalgic Vault", desc: "Holds onto cherished memories, meaningful mementos, and comforting personal rituals." },
    { rank: "4th (Inferior)", function: "Te", name: "Extraverted Thinking", role: "The Pragmatic Tool", desc: "Under stress, may suddenly become uncharacteristically critical or overwhelmed by logistics." }
  ],
  ENFJ: [
    { rank: "1st (Dominant)", function: "Fe", name: "Extraverted Feeling", role: "The Empathic Catalyst", desc: "Unifies groups, elevates collective purpose, and creates an atmosphere where everyone feels seen." },
    { rank: "2nd (Auxiliary)", function: "Ni", name: "Introverted Intuition", role: "The Human Visionary", desc: "Perceives the latent potential in individuals and crafts visionary roadmaps for growth." },
    { rank: "3rd (Tertiary)", function: "Se", name: "Extraverted Sensing", role: "The Expressive Presence", desc: "Engages effortlessly with audiences through animated storytelling, style, and active involvement." },
    { rank: "4th (Inferior)", function: "Ti", name: "Introverted Thinking", role: "The Private Doubter", desc: "Can overthink negative feedback in private, questioning their own objective competence." }
  ],
  ENFP: [
    { rank: "1st (Dominant)", function: "Ne", name: "Extraverted Intuition", role: "The Catalyst of Sparks", desc: "Discovers infectious new ideas, brings disparate worlds together, and champions human potential." },
    { rank: "2nd (Auxiliary)", function: "Fi", name: "Introverted Feeling", role: "The Moral Compass", desc: "Ensures projects and relationships align with genuine personal convictions and human dignity." },
    { rank: "3rd (Tertiary)", function: "Te", name: "Extraverted Thinking", role: "The Action Mobilizer", desc: "Drives initiatives forward with sudden bursts of productivity when passionate about a mission." },
    { rank: "4th (Inferior)", function: "Si", name: "Introverted Sensing", role: "The Daily Anchor", desc: "Under stress, can become fixated on minor past mistakes, bodily aches, or tedious scheduling." }
  ],
  ISTJ: [
    { rank: "1st (Dominant)", function: "Si", name: "Introverted Sensing", role: "The Living Archive", desc: "Compares current circumstances against proven precedents, ensuring absolute reliability and accuracy." },
    { rank: "2nd (Auxiliary)", function: "Te", name: "Extraverted Thinking", role: "The Operational Pillar", desc: "Systematizes tasks, enforces clear timelines, and executes responsibilities without cutting corners." },
    { rank: "3rd (Tertiary)", function: "Fi", name: "Introverted Feeling", role: "The Quiet Code", desc: "Holds steadfast personal honor, loyalty to loved ones, and a quiet dedication to duty." },
    { rank: "4th (Inferior)", function: "Ne", name: "Extraverted Intuition", role: "The Unknown Threat", desc: "Under stress, may catastrophize about unexpected future changes or sudden disruption of order." }
  ],
  ISFJ: [
    { rank: "1st (Dominant)", function: "Si", name: "Introverted Sensing", role: "The Guardian Memory", desc: "Attentively tracks loved ones' needs, schedules, and preferences with unwavering devotion." },
    { rank: "2nd (Auxiliary)", function: "Fe", name: "Extraverted Feeling", role: "The Gentle Caretaker", desc: "Cultivates warmth, defuses interpersonal conflict, and ensures everyone around them is protected." },
    { rank: "3rd (Tertiary)", function: "Ti", name: "Introverted Thinking", role: "The Practical Troubleshooter", desc: "Quietly examines practical details and processes to find effective, sensible everyday solutions." },
    { rank: "4th (Inferior)", function: "Ne", name: "Extraverted Intuition", role: "The Change Hesitation", desc: "Under stress, worries about worst-case future developments or unpredictable alterations to routine." }
  ],
  ESTJ: [
    { rank: "1st (Dominant)", function: "Te", name: "Extraverted Thinking", role: "The System Marshal", desc: "Directs projects with clear rules, rigorous benchmarks, and transparent organizational command." },
    { rank: "2nd (Auxiliary)", function: "Si", name: "Introverted Sensing", role: "The Standard Bearer", desc: "Relies on time-tested frameworks and accurate historical precedent to guarantee stability." },
    { rank: "3rd (Tertiary)", function: "Ne", name: "Extraverted Intuition", role: "The Pragmatic Pioneer", desc: "Tests new methods when they demonstrably prove to enhance output or streamline operations." },
    { rank: "4th (Inferior)", function: "Fi", name: "Introverted Feeling", role: "The Private Heart", desc: "Under intense stress, can feel secretly unappreciated or experience rare emotional vulnerability." }
  ],
  ESFJ: [
    { rank: "1st (Dominant)", function: "Fe", name: "Extraverted Feeling", role: "The Community Pillar", desc: "Creates harmonious social spaces, organizes community support, and makes everyone feel valued." },
    { rank: "2nd (Auxiliary)", function: "Si", name: "Introverted Sensing", role: "The Tradition Keeper", desc: "Maintains family rituals, reliable routines, and practical hospitality with thorough care." },
    { rank: "3rd (Tertiary)", function: "Ne", name: "Extraverted Intuition", role: "The Social Connector", desc: "Enjoys exploring fun social gatherings, novel activities, and fresh ways to bring people together." },
    { rank: "4th (Inferior)", function: "Ti", name: "Introverted Thinking", role: "The Inner Doubt", desc: "Under extreme stress, may become hyper-critical or spiral into second-guessing their logic." }
  ],
  ISTP: [
    { rank: "1st (Dominant)", function: "Ti", name: "Introverted Thinking", role: "The System Mechanic", desc: "Takes things apart—mechanics, software, or strategies—to understand their pure causal physics." },
    { rank: "2nd (Auxiliary)", function: "Se", name: "Extraverted Sensing", role: "The Real-Time Pilot", desc: "Observes the physical environment with precision and responds with calm, lightning-fast agility." },
    { rank: "3rd (Tertiary)", function: "Ni", name: "Introverted Intuition", role: "The Tactical Instinct", desc: "Develops sharp gut hunches about the likely outcomes of complex situations before they happen." },
    { rank: "4th (Inferior)", function: "Fe", name: "Extraverted Feeling", role: "The Emotional Friction", desc: "Dislikes emotional melodrama, preferring to demonstrate loyalty through tangible, physical support." }
  ],
  ISFP: [
    { rank: "1st (Dominant)", function: "Fi", name: "Introverted Feeling", role: "The Soul Artisan", desc: "Lives by a personal compass of authenticity, expressing unspoken feeling through creative action." },
    { rank: "2nd (Auxiliary)", function: "Se", name: "Extraverted Sensing", role: "The Sensory Explorer", desc: "Immerses in colors, textures, sound, and atmosphere, transforming environments into art." },
    { rank: "3rd (Tertiary)", function: "Ni", name: "Introverted Intuition", role: "The Symbolic Vision", desc: "Finds underlying poetic meaning and personal symbolism in synchronistic life moments." },
    { rank: "4th (Inferior)", function: "Te", name: "Extraverted Thinking", role: "The Efficiency Wall", desc: "Under heavy stress, may become uncharacteristically blunt, rigid, or overwhelmed by micromanagement." }
  ],
  ESTP: [
    { rank: "1st (Dominant)", function: "Se", name: "Extraverted Sensing", role: "The Reality Dynamo", desc: "Lives in the physical present, rapidly reading sensory cues and capitalizing on live opportunities." },
    { rank: "2nd (Auxiliary)", function: "Ti", name: "Introverted Thinking", role: "The Pragmatic Logic", desc: "Evaluates immediate circumstances with cool objectivity to find the fastest, most direct solution." },
    { rank: "3rd (Tertiary)", function: "Fe", name: "Extraverted Feeling", role: "The Magnetic Charm", desc: "Connects with energy and humor, effortlessly reading social dynamics and building instant rapport." },
    { rank: "4th (Inferior)", function: "Ni", name: "Introverted Intuition", role: "The Long Horizon", desc: "Under stress, may feel sudden dread or anxiety regarding distant, uncertain future implications." }
  ],
  ESFP: [
    { rank: "1st (Dominant)", function: "Se", name: "Extraverted Sensing", role: "The Radiant Performer", desc: "Engages directly with people and surroundings, infusing ordinary moments with joy and excitement." },
    { rank: "2nd (Auxiliary)", function: "Fi", name: "Introverted Feeling", role: "The Authentic Heart", desc: "Treats others with genuine warmth and stays loyal to their values and close relationships." },
    { rank: "3rd (Tertiary)", function: "Te", name: "Extraverted Thinking", role: "The Practical Mover", desc: "Mobilizes people and resources quickly when an exciting event or emergency calls for action." },
    { rank: "4th (Inferior)", function: "Ni", name: "Introverted Intuition", role: "The Subconscious Cloud", desc: "Under stress, may feel unsettled by abstract prophecies or gloomy forecasts of the future." }
  ]
};

// Full bespoke daily life, myths, and communication guide for ALL 16 TYPES
export const mbtiTypeGuides = {
  INTJ: {
    simpleSummary: "INTJs are quiet visionaries who see life as a chessboard. They constantly analyze systems, spot long-term patterns, and build step-by-step strategies to turn ambitious concepts into reality.",
    scenarios: [
      { title: "Planning Ahead", desc: "Developing a backup plan for their backup plan, optimizing schedules days in advance to eliminate wasted effort." },
      { title: "In Debates", desc: "Focusing purely on underlying facts and systemic outcomes, easily dismissing emotional appeals that lack logical evidence." },
      { title: "Recharging", desc: "Spending an entire weekend completely undisturbed, engrossed in deep research or mastering a complex new subject." }
    ],
    myths: [
      { myth: "INTJs are emotionless robots.", fact: "They feel deeply, but they process feelings internally and express affection through practical, reliable support." },
      { myth: "INTJs are arrogant know-it-alls.", fact: "They simply value objective truth and competence. If you prove them wrong with better data, they adapt immediately." },
      { myth: "INTJs hate people.", fact: "They cherish a small, intimate circle of trusted intellectual equals over superficial small talk with dozens of acquaintances." }
    ],
    howToTalk: [
      { do: "Be direct, concise, and back up ideas with solid evidence.", dont: "Don't overwhelm them with vague emotional appeals or office gossip." },
      { do: "Give them space to process information before asking for an instant decision.", dont: "Don't interrupt deep focus sessions with trivial interruptions." },
      { do: "Respect their time and stick to agreed commitments.", dont: "Don't take their quiet analytical demeanor as personal hostility." }
    ],
    growthHacks: [
      "Validate others' emotional perspectives before delivering constructive logical solutions.",
      "Ship working prototypes early rather than endlessly polishing theoretical models in private.",
      "Incorporate spontaneous physical breaks or walks to balance intense cognitive strain."
    ]
  },
  INTP: {
    simpleSummary: "INTPs are deeply curious thinkers who live in their own heads, dissecting ideas and building elegant logical frameworks to understand the universe.",
    scenarios: [
      { title: "At 3:00 AM", desc: "Falling down a Wikipedia rabbit hole reading about quantum physics or ancient ruins just because a random question popped up." },
      { title: "In Conversations", desc: "Quietly listening until someone makes a logical contradiction, then gently clarifying the nuance without intending to offend." },
      { title: "With Projects", desc: "Having 40 open browser tabs and 5 half-finished ideas because designing the architecture is much more stimulating than paperwork." }
    ],
    myths: [
      { myth: "INTPs are cold and detached.", fact: "They care genuinely, but prefer to show support by solving problems logically rather than dramatic speeches." },
      { myth: "INTPs are disorganized and lazy.", fact: "Their mind is working 24/7. They simply dislike repetitive, mechanical chores that offer no intellectual challenge." },
      { myth: "INTPs are bad at social interaction.", fact: "They love great conversations! They just prefer deep one-on-one discussions on real topics over shallow small talk." }
    ],
    howToTalk: [
      { do: "Be direct, transparent, and open to exploring theoretical 'what ifs'.", dont: "Don't play passive-aggressive emotional games." },
      { do: "Give them quiet time to think before expecting an answer.", dont: "Don't force them into sudden loud group pressure." },
      { do: "Discuss fascinating concepts or shared intellectual hobbies.", dont: "Don't dismiss unorthodox ideas just because 'it's not how things are done'." }
    ],
    growthHacks: [
      "Pick ONE project and carry it to completion before jumping to the next shiny new idea.",
      "Remember that people often process feelings before logic, so deliver feedback with empathy.",
      "Schedule regular breaks to stretch and go outside so you don't get trapped in your head."
    ]
  },
  ENTJ: {
    simpleSummary: "ENTJs are decisive, charismatic commanders who thrive on turning chaos into order. They naturally take charge, streamline inefficiency, and lead teams toward ambitious milestones.",
    scenarios: [
      { title: "In a Crisis", desc: "Stepping up immediately, cutting through panic, and assigning clear roles to bring swift order to the situation." },
      { title: "At Work", desc: "Spotting redundant bureaucracy in a process and redesigning the entire workflow by the end of the afternoon." },
      { title: "Setting Goals", desc: "Treating personal life and career as an interconnected roadmap with measurable benchmarks." }
    ],
    myths: [
      { myth: "ENTJs are tyrannical bullies.", fact: "They are passionate about competence and efficiency, wanting everyone on the team to succeed together." },
      { myth: "ENTJs never relax.", fact: "They relax through active engagement, hobbies, and sports where they can challenge themselves." },
      { myth: "ENTJs don't care about feelings.", fact: "They care deeply about their inner circle, showing love through protective guidance and opening doors of opportunity." }
    ],
    howToTalk: [
      { do: "Present solutions instead of just complaining about problems.", dont: "Don't beat around the bush or give vague, non-committal answers." },
      { do: "Stand your ground respectfully if you have data that proves a better point.", dont: "Don't take their direct feedback as a personal insult." },
      { do: "Follow through on what you promise and meet deadlines.", dont: "Don't make excuses when unexpected mistakes happen." }
    ],
    growthHacks: [
      "Practice active listening and give teammates room to share their perspectives before deciding.",
      "Schedule intentional downtime with zero productivity goals to prevent burnout.",
      "Acknowledge and celebrate small team milestones along the path to major victories."
    ]
  },
  ENTP: {
    simpleSummary: "ENTPs are quick-witted, innovative brainstormers who love playing with ideas. They thrive on challenging conventions, exploring debates, and discovering fresh perspectives.",
    scenarios: [
      { title: "In Brainstorming", desc: "Pitching 10 radical, innovative concepts in 5 minutes and inspiring the room to think outside conventional boundaries." },
      { title: "In Discussions", desc: "Playing devil's advocate purely to test how sturdy an argument really is and uncover hidden angles." },
      { title: "With Routines", desc: "Constantly changing their daily schedule or routes because predictable monotony feels stifling." }
    ],
    myths: [
      { myth: "ENTPs just love arguing to be mean.", fact: "They debate to explore truth and stress-test assumptions, rarely taking disagreements personally." },
      { myth: "ENTPs can never finish anything.", fact: "They finish what genuinely inspires them, but need structure or team partners for routine execution." },
      { myth: "ENTPs lack emotional depth.", fact: "They hide a warm heart beneath their quick wit and fiercely defend friends when it matters." }
    ],
    howToTalk: [
      { do: "Be ready for lively, fast-paced humor and open intellectual sparring.", dont: "Don't take intellectual disagreements as personal attacks." },
      { do: "Encourage their innovative ideas before jumping straight to logistical constraints.", dont: "Don't box them into rigid, unbendable rules without clear rationale." },
      { do: "Match their wit and don't be afraid to playfully challenge their assertions.", dont: "Don't lecture them with tedious, micromanaged checklists." }
    ],
    growthHacks: [
      "Partner with organized collaborators who excel at operational follow-through.",
      "Pause before playing devil's advocate to ensure the timing is appropriate for the group.",
      "Set mini-deadlines for the unglamorous stages of creative projects."
    ]
  },
  INFJ: {
    simpleSummary: "INFJs are insightful, compassionate idealists with a quiet drive to help humanity. They read between the lines of human emotion and dedicate themselves to meaningful causes.",
    scenarios: [
      { title: "Reading a Room", desc: "Instantly sensing unspoken tension or hidden sadness in a friend before a single word is uttered." },
      { title: "During Solitude", desc: "Journaling, meditating, or crafting profound creative works that explore the deeper meaning of life." },
      { title: "After Socializing", desc: "Needing dedicated quiet time to process other people's emotional energy and recharge their battery." }
    ],
    myths: [
      { myth: "INFJs are psychic or mystical gurus.", fact: "Their intuition is real-time pattern recognition based on years of observing human behavior." },
      { myth: "INFJs are pushovers because they're gentle.", fact: "They possess an iron will and will firmly execute a 'door slam' if core trust is repeatedly violated." },
      { myth: "INFJs are extroverted because they are warm.", fact: "They are deep introverts who require solitary time to prevent emotional exhaustion." }
    ],
    howToTalk: [
      { do: "Speak with authenticity, sincerity, and depth.", dont: "Don't use manipulative tactics or superficial flattery." },
      { do: "Give them space when they retreat to recharge their energy.", dont: "Don't force them into overwhelming sensory or social settings without warning." },
      { do: "Validate their intuitive insights and listen attentively.", dont: "Don't dismiss their gut feelings as mere imagination." }
    ],
    growthHacks: [
      "Set clear emotional boundaries so you don't absorb everyone else's troubles as your own.",
      "Express your needs openly rather than expecting loved ones to intuit them.",
      "Ground yourself in physical activities like yoga, walks in nature, or art."
    ]
  },
  INFP: {
    simpleSummary: "INFPs are poetic, empathetic dreamers guided by a profound inner compass of integrity and wonder. They seek authentic beauty and strive to make the world a gentler place.",
    scenarios: [
      { title: "In Daydreams", desc: "Creating rich inner worlds, stories, or melodies inspired by a single song or passing sunset." },
      { title: "Standing Up for Values", desc: "Becoming quietly ferocious when defending a marginalized voice or an ethical cause they cherish." },
      { title: "With Daily Chores", desc: "Putting off spreadsheet data or administrative paperwork in favor of working on a meaningful passion project." }
    ],
    myths: [
      { myth: "INFPs are fragile and weak.", fact: "Their emotional resilience and quiet courage when standing for their principles are formidable." },
      { myth: "INFPs are completely detached from reality.", fact: "They see reality clearly, but choose to focus on what could be improved and healed." },
      { myth: "INFPs are always sad and melancholic.", fact: "They experience a rich spectrum of emotions, including whimsical humor and boundless optimism." }
    ],
    howToTalk: [
      { do: "Be gentle, genuine, and appreciate their unique creative perspective.", dont: "Don't judge their feelings with harsh, dismissive criticism." },
      { do: "Give them time to express thoughts in their own comfortable words.", dont: "Don't demand immediate analytical debates on sensitive personal topics." },
      { do: "Celebrate their artistic or moral initiatives.", dont: "Don't try to force them into a conventional corporate mold." }
    ],
    growthHacks: [
      "Break large creative dreams into small, daily practical actions to bring them to fruition.",
      "Practice detaching constructive feedback from your fundamental self-worth.",
      "Build simple daily routines to keep your physical living space clear and calm."
    ]
  },
  ENFJ: {
    simpleSummary: "ENFJs are charismatic, nurturing mentors who bring out the best in people. They radiate warmth, build strong communities, and guide teams toward inspiring shared goals.",
    scenarios: [
      { title: "In Groups", desc: "Making sure the quietest person in the circle gets a chance to speak and feels genuinely appreciated." },
      { title: "Giving Pep Talks", desc: "Recognizing someone's hidden talents and inspiring them with heartfelt encouragement to reach higher." },
      { title: "Under Pressure", desc: "Taking on too many favors at once because they hate letting anyone down." }
    ],
    myths: [
      { myth: "ENFJs are fake or people-pleasing.", fact: "Their warmth is completely sincere; they derive genuine joy from seeing others thrive." },
      { myth: "ENFJs can't handle hard decisions.", fact: "They make tough choices when needed for the greater good of the group or community." },
      { myth: "ENFJs don't have personal needs.", fact: "They often neglect themselves while caring for others and deeply appreciate when someone asks how they are." }
    ],
    howToTalk: [
      { do: "Express genuine appreciation for their support and thoughtful efforts.", dont: "Don't take their kindness for granted or leave them out of team updates." },
      { do: "Communicate directly with warmth and constructive honesty.", dont: "Don't respond with cold, cynical indifference to their enthusiasm." },
      { do: "Ask about their personal goals and encourage them to rest.", dont: "Don't overload them with all your emotional burdens without offering support in return." }
    ],
    growthHacks: [
      "Learn to say 'no' to non-essential requests to protect your own energy and health.",
      "Allow others to solve their own challenges sometimes rather than jumping in to rescue them.",
      "Carve out solo time for hobbies where you aren't responsible for anyone else."
    ]
  },
  ENFP: {
    simpleSummary: "ENFPs are enthusiastic, imaginative free spirits who find magic in human connection. They connect unexpected ideas, inspire hope, and approach life with vibrant curiosity.",
    scenarios: [
      { title: "Making Friends", desc: "Striking up a deep, meaningful conversation with a stranger in a coffee shop within minutes." },
      { title: "Starting Projects", desc: "Launching into a bold new venture with boundless energy and getting everyone excited about the vision." },
      { title: "With Rigid Rules", desc: "Finding creative workarounds to bureaucratic red tape so they can keep moving forward." }
    ],
    myths: [
      { myth: "ENFPs are superficial or scatterbrained.", fact: "Beneath their playful demeanor lies a thoughtful philosopher with deep core convictions." },
      { myth: "ENFPs are always happy.", fact: "They feel life deeply and experience complex emotional low tides when they need quiet introspection." },
      { myth: "ENFPs can't commit.", fact: "When they find a cause, project, or partner that aligns with their values, their loyalty is unwavering." }
    ],
    howToTalk: [
      { do: "Match their enthusiasm and explore creative ideas with an open mind.", dont: "Don't shut down their ideas with immediate cynicism or rigid negativity." },
      { do: "Give them freedom and flexibility in how they accomplish tasks.", dont: "Don't micromanage every minute of their schedule." },
      { do: "Engage in deep, authentic conversations about values and dreams.", dont: "Don't stick strictly to bland, mechanical small talk." }
    ],
    growthHacks: [
      "Create accountability systems to finish projects before starting the next exciting concept.",
      "Practice grounding exercises when feeling scattered or overwhelmed by multiple possibilities.",
      "Filter your commitments to avoid overbooking your social and professional calendar."
    ]
  },
  ISTJ: {
    simpleSummary: "ISTJs are reliable, fact-minded pragmatists who keep society running smoothly. They honor commitments, build stable routines, and value honest, thorough craftsmanship.",
    scenarios: [
      { title: "Meeting Deadlines", desc: "Delivering thorough, error-free work ahead of time because keeping their word is a matter of personal honor." },
      { title: "In Emergencies", desc: "Staying calm, consulting the emergency manual, and taking step-by-step practical action." },
      { title: "With Traditions", desc: "Preserving family rituals, organizing historical archives, and maintaining trusted tools with precision." }
    ],
    myths: [
      { myth: "ISTJs are boring and rigid.", fact: "They have a dry, sharp sense of humor and simply value stability, order, and doing things right." },
      { myth: "ISTJs hate change.", fact: "They embrace change if you provide clear, logical data proving the new way is genuinely more effective." },
      { myth: "ISTJs don't feel emotion.", fact: "They care deeply and express love through consistent loyalty, reliability, and practical help." }
    ],
    howToTalk: [
      { do: "Be punctual, clear, and honor your promises.", dont: "Don't change plans at the last minute without a solid practical reason." },
      { do: "Present ideas with step-by-step logic and clear examples.", dont: "Don't bring vague, ungrounded theories without concrete evidence." },
      { do: "Acknowledge their dependability and meticulous efforts.", dont: "Don't treat their calm demeanor as an invitation to dump messy drama on them." }
    ],
    growthHacks: [
      "Leave space in your routine for unexpected spontaneous moments with loved ones.",
      "Remember that experimentation and trial-and-error are necessary for breakthrough improvements.",
      "Communicate your appreciation out loud so colleagues know how much you value them."
    ]
  },
  ISFJ: {
    simpleSummary: "ISFJs are warm, devoted protectors who quietly support their communities and families. They remember details others miss and provide steady, selfless care.",
    scenarios: [
      { title: "Hosting Loved Ones", desc: "Remembering everyone's favorite meals, tea preferences, and making sure everyone is cozy." },
      { title: "At Work", desc: "Quietly fixing errors and smoothing over team logistics behind the scenes without demanding public credit." },
      { title: "In Relationships", desc: "Offering a calm, steady shoulder to lean on whenever a friend or partner is having a tough day." }
    ],
    myths: [
      { myth: "ISFJs are weak pushovers.", fact: "When someone threatens those they protect or their core principles, they are remarkably fierce." },
      { myth: "ISFJs only belong in traditional roles.", fact: "Their attention to detail and empathy make them stellar leaders, medical professionals, and managers." },
      { myth: "ISFJs never get upset.", fact: "They often bottle up their frustrations to preserve peace, which can build up if unexpressed." }
    ],
    howToTalk: [
      { do: "Express heartfelt gratitude for their quiet, generous support.", dont: "Don't take their assistance for granted or leave them to do all the chores." },
      { do: "Speak kindly and provide gentle, constructive feedback.", dont: "Don't use harsh or aggressive confrontations." },
      { do: "Encourage them to voice their own desires and needs.", dont: "Don't force sudden radical changes to comfortable traditions without discussion." }
    ],
    growthHacks: [
      "Voice your own needs and boundaries before exhaustion or quiet resentment sets in.",
      "Embrace new experiences and modern methods that can save you time and energy.",
      "Allow yourself to receive help and pampering from loved ones without feeling guilty."
    ]
  },
  ESTJ: {
    simpleSummary: "ESTJs are organized, pragmatic leaders who excel at getting things done. They value structure, clear expectations, and bringing people together to achieve tangible results.",
    scenarios: [
      { title: "Leading Projects", desc: "Assigning clear responsibilities, setting realistic schedules, and keeping everyone accountable to high standards." },
      { title: "In the Community", desc: "Organizing charity drives, neighborhood councils, or sports leagues to maintain civic strength." },
      { title: "Solving Problems", desc: "Using established, battle-tested methods to resolve logistical bottlenecks quickly." }
    ],
    myths: [
      { myth: "ESTJs are bossy and stubborn.", fact: "They naturally step up to prevent disorganization and want the team to succeed efficiently." },
      { myth: "ESTJs have no creativity.", fact: "Their creativity is applied practically—optimizing systems, budgets, and operational logistics." },
      { myth: "ESTJs don't care about feelings.", fact: "They show loyalty by providing security, practical advice, and being someone you can count on in a crisis." }
    ],
    howToTalk: [
      { do: "Be organized, concise, and come prepared with practical facts.", dont: "Don't make excuses or leave tasks half-finished." },
      { do: "Respect established procedures and hierarchies.", dont: "Don't bring chaotic disorganization into collaborative projects." },
      { do: "Be direct and honest about what you can deliver.", dont: "Don't play passive-aggressive games." }
    ],
    growthHacks: [
      "Listen actively to teammates' emotional concerns before immediately issuing directives.",
      "Accept that there is often more than one valid way to reach a successful outcome.",
      "Schedule unstructured leisure time with family and friends to unwind."
    ]
  },
  ESFJ: {
    simpleSummary: "ESFJs are generous, social harmonizers who bring warmth and cohesion to every group. They cultivate community, celebrate traditions, and make sure everyone feels included.",
    scenarios: [
      { title: "At Social Gatherings", desc: "Ensuring everyone has a drink, introducing newcomers, and keeping the energy upbeat and welcoming." },
      { title: "In Daily Life", desc: "Checking in on friends with thoughtful text messages, remembering anniversaries, and sending care packages." },
      { title: "Managing Conflict", desc: "Stepping in gently to defuse arguments and restore comfortable group harmony." }
    ],
    myths: [
      { myth: "ESFJs are superficial or gossipy.", fact: "They care deeply about community welfare and use social connection to ensure everyone is cared for." },
      { myth: "ESFJs are dependent on others.", fact: "They are exceptionally capable organizers who frequently manage entire organizations and households." },
      { myth: "ESFJs cannot handle logic.", fact: "They use practical logic every day to organize schedules, budgets, and complex logistics for groups." }
    ],
    howToTalk: [
      { do: "Show sincere appreciation for their hospitality and kindness.", dont: "Don't dismiss their thoughtful gestures with cold indifference." },
      { do: "Communicate with warmth, respect, and positive energy.", dont: "Don't create unnecessary drama or intentionally exclude group members." },
      { do: "Keep them in the loop regarding plans and social events.", dont: "Don't deliver harsh criticism in public settings." }
    ],
    growthHacks: [
      "Remember that you cannot please everyone all the time, and that is okay.",
      "Take time to discover your own personal interests independently of group expectations.",
      "Accept that constructive conflict is sometimes necessary for genuine long-term resolution."
    ]
  },
  ISTP: {
    simpleSummary: "ISTPs are calm, hands-on problem solvers who master tools, mechanisms, and real-world action. They stay relaxed under pressure and fiercely value personal independence.",
    scenarios: [
      { title: "In an Emergency", desc: "While others are panicking, staying completely composed, picking up the right tool, and fixing the breakdown." },
      { title: "With Rules", desc: "Viewing rigid rules as suggestions; if a policy creates unnecessary friction, finding an efficient workaround." },
      { title: "With Hobbies", desc: "Engaging in hands-on activities—coding, mechanics, outdoor sports, or gaming—where reflexes and skills shine." }
    ],
    myths: [
      { myth: "ISTPs are reckless or aggressive.", fact: "They are calculated risk-takers who accurately assess their own physical capabilities and physics." },
      { myth: "ISTPs don't care about others.", fact: "They are quietly loyal friends who show support through tangible action rather than long speeches." },
      { myth: "ISTPs are unable to plan ahead.", fact: "They plan efficiently for practical contingencies while keeping options open for dynamic realities." }
    ],
    howToTalk: [
      { do: "Keep messages short, concise, and to the point.", dont: "Don't send giant walls of emotional text or micromanage their time." },
      { do: "Bond through shared activities and hands-on projects.", dont: "Don't force them to sit in circles talking about feelings for hours." },
      { do: "Respect their personal autonomy and need for quiet space.", dont: "Don't demand immediate verbal validation on emotional topics." }
    ],
    growthHacks: [
      "Let friends and loved ones know your schedule so they don't feel left in the dark.",
      "Explain your thought process aloud so collaborators understand your brilliant solutions.",
      "Pause for a few seconds before jumping into high-risk physical impulses."
    ]
  },
  ISFP: {
    simpleSummary: "ISFPs are gentle, artistic explorers who live in tune with the present moment. They express their vibrant inner world through art, style, and quiet acts of kindness.",
    scenarios: [
      { title: "Exploring Aesthetics", desc: "Curating a beautiful playlist, rearranging room decor, or experimenting with unique personal fashion." },
      { title: "In Quiet Moments", desc: "Connecting deeply with nature, pets, or working on creative craftsmanship in peaceful solitude." },
      { title: "When Pressured", desc: "Withdrawing quietly to protect their inner harmony when facing rigid bureaucracy or harsh arguments." }
    ],
    myths: [
      { myth: "ISFPs are overly passive.", fact: "They are quietly passionate and will boldly stand their ground when their core values are challenged." },
      { myth: "ISFPs lack ambition.", fact: "Their ambition is personal authenticity and artistic mastery rather than conventional corporate status." },
      { myth: "ISFPs cannot handle practical work.", fact: "They possess acute physical perception and excel as skilled artisans, designers, and caretakers." }
    ],
    howToTalk: [
      { do: "Be authentic, gentle, and respect their artistic perspective.", dont: "Don't judge their choices with cold, condescending criticism." },
      { do: "Give them freedom to express themselves through action and design.", dont: "Don't trap them in suffocating micromanagement or strict rigidity." },
      { do: "Appreciate their quiet gestures of care and loyalty.", dont: "Don't force them into aggressive, competitive social games." }
    ],
    growthHacks: [
      "Develop simple systems for handling necessary financial and administrative tasks.",
      "Share your creative work with the world without fearing immediate judgment.",
      "Communicate your boundaries clearly rather than silently retreating when overwhelmed."
    ]
  },
  ESTP: {
    simpleSummary: "ESTPs are bold, energetic dynamos who love living on the front lines of action. They read room dynamics instantly, adapt to fast changes, and bring unmatched charisma to any situation.",
    scenarios: [
      { title: "In High-Stakes Moments", desc: "Spotting real-time shifts in momentum during negotiations or sports and acting decisively to win." },
      { title: "At Parties", desc: "Entertaining a crowd with daring stories, quick wit, and pulling people into spontaneous fun." },
      { title: "Facing Obstacles", desc: "Tackling challenges directly hands-on while others are still debating theoretical options." }
    ],
    myths: [
      { myth: "ESTPs are reckless troublemakers.", fact: "They possess razor-sharp spatial awareness and real-time analytical logic that keeps them safe." },
      { myth: "ESTPs are shallow.", fact: "They are exceptionally perceptive observers who read people and systems with uncanny precision." },
      { myth: "ESTPs can't be trusted in relationships.", fact: "When committed to an exciting, equal partner, they are fiercely loyal and protective companions." }
    ],
    howToTalk: [
      { do: "Be direct, engaging, and focus on practical, real-world action.", dont: "Don't drown them in long theoretical lectures without tangible application." },
      { do: "Join them in active pursuits and share memorable adventures.", dont: "Don't try to lock them into boring, repetitive routines with no freedom." },
      { do: "Speak honestly and directly when issues arise.", dont: "Don't beat around the bush or use passive-aggressive hints." }
    ],
    growthHacks: [
      "Pause to evaluate the long-term consequences before leaping into high-stakes impulses.",
      "Practice active listening when partners or friends need emotional reassurance.",
      "Commit to seeing long-range strategic goals through beyond the initial adrenaline rush."
    ]
  },
  ESFP: {
    simpleSummary: "ESFPs are vibrant, generous performers who bring infectious joy to the world. They turn ordinary moments into celebrations and ensure everyone feels welcome and energized.",
    scenarios: [
      { title: "Lifting the Room", desc: "Notice when someone is feeling left out and instantly bringing them onto the dance floor or into the joke." },
      { title: "Spontaneous Adventures", desc: "Organizing a road trip or surprise celebration on a whim with incredible music and atmosphere." },
      { title: "Under Stress", desc: "Feeling deeply unsettled by harsh criticism or prolonged isolation from social energy." }
    ],
    myths: [
      { myth: "ESFPs are just party animals.", fact: "They have a deeply sensitive, empathetic heart and frequently check in on struggling friends." },
      { myth: "ESFPs can't be serious.", fact: "They handle real-life crises with surprising practical composure and step up to protect their loved ones." },
      { myth: "ESFPs lack foresight.", fact: "They simply choose to focus on the joy and beauty of today, knowing life is meant to be lived." }
    ],
    howToTalk: [
      { do: "Bring positive energy, warmth, and join in their enthusiasm.", dont: "Don't bring constant gloom, cynicism, or unconstructive criticism." },
      { do: "Acknowledge their style, humor, and generous spirit.", dont: "Don't lecture them with cold, condescending intellectual superiority." },
      { do: "Engage in shared experiential activities (music, food, travel).", dont: "Don't force them into prolonged, silent desk isolation." }
    ],
    growthHacks: [
      "Face difficult conversations directly rather than running away from temporary discomfort.",
      "Build steady long-term financial saving habits to support your spontaneous lifestyle.",
      "Take regular quiet moments for personal reflection away from the spotlight."
    ]
  }
};
