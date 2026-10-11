// Enneagram Types and their specific mapping logic
// 1-9 Types corresponding to their Centers (Gut, Heart, Head)

export const enneagramTypes = {
  1: {
    name: "The Reformer",
    tagline: "The Principled, Purposeful Perfectionist",
    coreFear: "Being corrupt, defective, or making mistakes",
    coreDesire: "To have integrity, be balanced, and do what is right",
    description: "Principled, purposeful, self-controlled, and perfectionistic. Ones are conscientious and ethical, with a strong internal sense of right and wrong. They strive to improve systems and maintain high standards, but can struggle with self-criticism and resentment.",
    center: "Gut (Instinctive)",
    centerShort: "Gut",
    centerEmotion: "Anger & Somatic Boundary Control",
    centerExplanation: "As a Gut type, Ones experience life through gut instincts and somatic tension. They turn their anger inward as self-discipline, holding themselves to strict moral and quality standards.",
    harmonic: "Competency",
    harmonicExplanation: "When problems arise, Ones manage emotional distress by turning to objective rules, correctness, and procedural precision.",
    hornevian: "Dutiful / Compliant",
    hornevianExplanation: "Ones meet their needs by actively aligning with moral duty, conscience, and doing what is expected.",
    wings: [9, 2],
    wingSubtypes: {
      9: {
        title: "1w9: The Idealist",
        subtitle: "Calmer, more detached, and philosophical. Blends Type 1's moral principles with Type 9's peaceful, introverted composure."
      },
      2: {
        title: "1w2: The Advocate",
        subtitle: "Warm, vocal, and action-oriented. Blends Type 1's ethical drive with Type 2's desire to actively help and nurture others."
      }
    },
    growth: 7,
    growthTitle: "Integration to Type 7 (The Enthusiast)",
    growthDetails: "In security and self-acceptance, Ones relax their rigid internal judge and embrace spontaneous joy, curiosity, optimism, and playfulness.",
    stress: 4,
    stressTitle: "Disintegration to Type 4 (The Individualist)",
    stressDetails: "Under chronic stress and exhaustion, Ones become moody, alienated, and resentful, feeling that their sacrifices go unappreciated by an imperfect world.",
    strengths: [
      "Deeply principled and dependable; reliably follows through on commitments with uncompromising integrity.",
      "Incredible attention to detail with a rare talent for streamlining chaotic processes and eliminating waste.",
      "Fair-minded and objective, consistently defending ethical standards and high quality.",
      "Driven by an enduring commitment to leave people, tools, and environments better than they found them."
    ],
    weaknesses: [
      "Can hold an unforgiving internal critic that judges self and others against unrealistic benchmarks.",
      "Prone to repressing natural desires and frustrations until they spill out as simmering resentment.",
      "Can fall into rigid black-and-white thinking when under pressure, struggling with nuance.",
      "Finds it hard to rest or celebrate achievements until every pending task is completely checked off."
    ],
    relationshipDynamics: "In romantic relationships, Ones are intensely loyal and strive to build a healthy, respectful partnership. They show love through acts of service, practical support, and encouraging growth. However, their partners can sometimes feel scrutinized if constructive feedback starts feeling like continuous correction.",
    workplaceBehavior: "Ones thrive in environments that require precision, high ethical guidelines, and transparent procedures. They are exceptional quality managers, editors, and operational leaders, but can struggle to delegate tasks when fearing others won't execute them with equal care.",
    idealCareers: ["Systems Architect", "Operations Director", "Quality Assurance Lead", "Civil Rights Attorney", "Editor & Publisher", "Ethics Consultant"],
    famousExamples: ["Nelson Mandela", "Mahatma Gandhi", "Steve Jobs", "Michelle Obama"],
    color: "from-sky-500 to-blue-600",
    themeBg: "bg-sky-50",
    themeBorder: "border-sky-200",
    themeText: "text-sky-700",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-100"
  },
  2: {
    name: "The Helper",
    tagline: "The Warm, Generous, and Supportive Giver",
    coreFear: "Being unwanted, unworthy of love, or dispensable",
    coreDesire: "To feel genuinely loved, appreciated, and needed",
    description: "Generous, demonstrative, empathetic, and people-focused. Twos are naturally attuned to others' feelings and needs. They are warm-hearted and build strong bonds, but can slip into over-accommodating others while neglecting their own boundaries.",
    center: "Heart (Feeling)",
    centerShort: "Heart",
    centerEmotion: "Shame & Relational Attunement",
    centerExplanation: "As a Heart type, Twos channel their feelings into supporting others, seeking connection and validation by being indispensable in the lives of people they love.",
    harmonic: "Positive Outlook",
    harmonicExplanation: "When facing hardship, Twos cope by emphasizing affection, optimism, and being a source of encouragement for everyone.",
    hornevian: "Dutiful / Compliant",
    hornevianExplanation: "Twos meet their needs by actively moving toward others through service, empathy, and attentive care.",
    wings: [1, 3],
    wingSubtypes: {
      1: {
        title: "2w1: The Servant",
        subtitle: "Quiet, conscientious, and duty-driven. Blends Type 2's compassion with Type 1's disciplined ethics and self-restraint."
      },
      3: {
        title: "2w3: The Host / Hostess",
        subtitle: "Outgoing, charming, and ambitious. Blends Type 2's warmth with Type 3's social grace, energy, and drive for accomplishment."
      }
    },
    growth: 4,
    growthTitle: "Integration to Type 4 (The Individualist)",
    growthDetails: "In health and security, Twos learn self-nurturance, discovering their own genuine desires and honoring personal emotional depth without guilt.",
    stress: 8,
    stressTitle: "Disintegration to Type 8 (The Challenger)",
    stressDetails: "Under prolonged emotional burnout or unappreciated labor, Twos become surprisingly confrontational, blunt, and demanding.",
    strengths: [
      "Remarkably empathetic, instinctively understanding what people need before it is voiced.",
      "Warm, hospitable, and gifted at creating welcoming spaces where people feel seen and valued.",
      "Exceptionally loyal confidant, offering deep emotional support during tough seasons.",
      "Naturally builds and nurtures communities through generous acts of everyday kindness."
    ],
    weaknesses: [
      "Struggles to identify or express personal needs, leading to sudden emotional exhaustion.",
      "Can develop quiet resentment when their unseen sacrifices are not reciprocated.",
      "May blur personal boundaries and become overly invested in solving other people's problems.",
      "Finds it hard to accept feedback that hints they may have inadvertently overstepped."
    ],
    relationshipDynamics: "Twos are devoted, attentive partners who show love through warmth, thoughtful gestures, and continuous emotional presence. The pitfall occurs when they silently tally all they have given without communicating what they desire, expecting their partner to read their mind in return.",
    workplaceBehavior: "Twos excel in roles centered on people, culture, and team wellbeing. They are the glue in collaborative projects, thriving in HR, mentorship, client success, and healthcare. They must be intentional about protecting their own workload from mission creep.",
    idealCareers: ["Counselor / Therapist", "Community Director", "Healthcare Specialist", "HR & Talent Partner", "Nonprofit Director", "Educator"],
    famousExamples: ["Mother Teresa", "Fred Rogers", "Dolly Parton", "Princess Diana"],
    color: "from-rose-400 to-pink-500",
    themeBg: "bg-rose-50",
    themeBorder: "border-rose-200",
    themeText: "text-rose-700",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-100"
  },
  3: {
    name: "The Achiever",
    tagline: "The Driven, Goal-Oriented Performer",
    coreFear: "Being worthless, failing, or lacking inherent value",
    coreDesire: "To feel valuable, competent, and admired for success",
    description: "Adaptable, excelling, driven, and goal-oriented. Threes are ambitious and energetic, with a sharp focus on achieving tangible results. They inspire others to aim high, but can struggle with disconnecting their authentic feelings from their performance.",
    center: "Heart (Feeling)",
    centerShort: "Heart",
    centerEmotion: "Shame & Image Crafting",
    centerExplanation: "As a Heart type, Threes manage underlying feelings of inadequacy by crafting a competent, admirable persona and proving their worth through excellence.",
    harmonic: "Competency",
    harmonicExplanation: "When obstacles arise, Threes suppress emotional noise and focus on effective strategy, speed, and objective results.",
    hornevian: "Assertive",
    hornevianExplanation: "Threes move against obstacles by actively stepping up, competing, and driving initiatives across the finish line.",
    wings: [2, 4],
    wingSubtypes: {
      2: {
        title: "3w2: The Enchanter",
        subtitle: "Charismatic, warm, and socially engaging. Blends Type 3's competitive ambition with Type 2's interpersonal charm and generosity."
      },
      4: {
        title: "3w4: The Professional",
        subtitle: "Specialized, refined, and introspective. Blends Type 3's drive for success with Type 4's aesthetic discernment and personal depth."
      }
    },
    growth: 6,
    growthTitle: "Integration to Type 6 (The Loyalist)",
    growthDetails: "In health and security, Threes become grounded, collaborative, and deeply loyal to group missions rather than solely personal milestones.",
    stress: 9,
    stressTitle: "Disintegration to Type 9 (The Peacemaker)",
    stressDetails: "Under burnout and relentless pressure, Threes lose their spark, becoming checked out, unmotivated, and numb to their usual ambitions.",
    strengths: [
      "Outstanding focus and execution; consistently transforms ambitious concepts into finished reality.",
      "Quickly adapts communication style and energy to build rapport with diverse audiences.",
      "Optimizes workflows ruthlessly, finding the most direct path to high-impact outcomes.",
      "Charismatic motivator who inspires colleagues and peers to raise their performance standards."
    ],
    weaknesses: [
      "Prone to workaholism, measuring personal worth exclusively through accomplishments.",
      "May brush off genuine emotional processing in favor of staying constantly productive.",
      "Can prioritize the appearance of success over long-term stability when rushed.",
      "Struggles to slow down and enjoy the journey without an imminent finish line."
    ],
    relationshipDynamics: "Threes bring optimism, energy, and shared ambition to romantic partnerships. They take pride in supporting their partner's growth. However, their partner may sometimes feel competing with the Three's calendar, wishing for unfiltered vulnerability without the polished exterior.",
    workplaceBehavior: "Threes thrive in fast-paced, high-stakes environments where merit and measurable results are rewarded. They are natural founders, product leaders, sales directors, and brand strategists who excel at presenting compelling visions.",
    idealCareers: ["Executive / Founder", "Product Strategy Lead", "Marketing Director", "Venture Partner", "Creative Producer", "Management Consultant"],
    famousExamples: ["Michael Jordan", "Oprah Winfrey", "Tony Robbins", "Taylor Swift"],
    color: "from-amber-400 to-orange-500",
    themeBg: "bg-amber-50",
    themeBorder: "border-amber-200",
    themeText: "text-amber-700",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-100"
  },
  4: {
    name: "The Individualist",
    tagline: "The Expressive, Authentic, and Introspective Soul",
    coreFear: "Having no identity, personal significance, or inner depth",
    coreDesire: "To express true individuality and create authentic meaning",
    description: "Expressive, sensitive, authentic, and emotionally deep. Fours possess an intense appreciation for aesthetics, nuance, and individuality. They are unafraid of life's complex emotions, but can struggle with feeling alienated or chronically misunderstood.",
    center: "Heart (Feeling)",
    centerShort: "Heart",
    centerEmotion: "Shame & Identity Differentiation",
    centerExplanation: "As a Heart type, Fours manage feelings of inadequacy by cultivating a distinctive identity, finding pride in their unique emotional depth and creative expression.",
    harmonic: "Reactive",
    harmonicExplanation: "When difficulties arise, Fours want genuine emotional honesty and realness, refusing to accept superficial optimism or dismissive brush-offs.",
    hornevian: "Withdrawn",
    hornevianExplanation: "Fours move away from external noise into their rich inner imagination to process feelings and preserve individuality.",
    wings: [3, 5],
    wingSubtypes: {
      3: {
        title: "4w3: The Aristocrat",
        subtitle: "Creative, ambitious, and refined. Blends Type 4's emotional depth with Type 3's desire for public recognition and aesthetic excellence."
      },
      5: {
        title: "4w5: The Bohemian",
        subtitle: "Introspective, idiosyncratic, and philosophical. Blends Type 4's emotional sensitivity with Type 5's intellectual curiosity and privacy."
      }
    },
    growth: 1,
    growthTitle: "Integration to Type 1 (The Reformer)",
    growthDetails: "In health, Fours ground their intense emotional currents into disciplined craft, practical ethics, consistency, and purposeful action.",
    stress: 2,
    stressTitle: "Disintegration to Type 2 (The Helper)",
    stressDetails: "Under severe emotional distress, Fours can become overly clingy or subtly manipulative, seeking reassurance that they are loved.",
    strengths: [
      "Remarkable emotional courage, willing to explore profound questions that others avoid.",
      "Rich aesthetic intuition and artistic talent; creates work with genuine soul and depth.",
      "Uncompromising authenticity; refuses to pretend or conform to hollow societal scripts.",
      "Deeply compassionate listener for others walking through grief, loss, or creative doubt."
    ],
    weaknesses: [
      "Can cycle into intense melancholy, longing for what is absent while missing current blessings.",
      "May take constructive feedback very personally, feeling that their very identity is being judged.",
      "Prone to withdrawing abruptly when feeling out of sync or misunderstood by a group.",
      "Can get lost in mood fluctuations, causing inconsistent follow-through on long-term plans."
    ],
    relationshipDynamics: "Fours bring romantic devotion, passionate depth, and poetic resonance to relationships. They seek a partner who honors their complex inner world. However, their tendency to idealize distant connections and scrutinize present ones can create unintentional push-pull cycles.",
    workplaceBehavior: "Fours shine in roles that demand artistic direction, storytelling, brand voice, and psychological insight. They wilt in sterile corporate bureaucracy, requiring autonomy and an environment that celebrates originality.",
    idealCareers: ["Creative Director", "Author & Screenwriter", "Fine Artist / Musician", "Depth Psychotherapist", "Brand Identity Designer", "Curator"],
    famousExamples: ["Frida Kahlo", "Vincent van Gogh", "Edgar Allan Poe", "Virginia Woolf"],
    color: "from-purple-500 to-fuchsia-600",
    themeBg: "bg-purple-50",
    themeBorder: "border-purple-200",
    themeText: "text-purple-700",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-100"
  },
  5: {
    name: "The Investigator",
    tagline: "The Observant, Analytical, and Autonomous Thinker",
    coreFear: "Being overwhelmed, incompetent, or helplessly depleted",
    coreDesire: "To be capable, knowledgeable, and intellectually self-reliant",
    description: "Perceptive, innovative, independent, and observant. Fives focus on gathering knowledge and understanding systems from first principles. They value autonomy and privacy, but can struggle with emotional detachment and feeling drained by social demands.",
    center: "Head (Thinking)",
    centerShort: "Head",
    centerEmotion: "Fear & Mental Mastery",
    centerExplanation: "As a Head type, Fives cope with anxiety about navigating an overwhelming world by retreating into intellectual observation and building specialized competence.",
    harmonic: "Competency",
    harmonicExplanation: "When crises hit, Fives detach from emotional upheaval to objectively analyze data, map variables, and calculate rational solutions.",
    hornevian: "Withdrawn",
    hornevianExplanation: "Fives move away from intrusive demands to protect their mental energy and maintain personal sovereignty.",
    wings: [4, 6],
    wingSubtypes: {
      4: {
        title: "5w4: The Iconoclast",
        subtitle: "Creative, unconventional, and philosophical. Blends Type 5's analytical rigor with Type 4's artistic imagination and introspective depth."
      },
      6: {
        title: "5w6: The Problem Solver",
        subtitle: "Methodical, pragmatic, and detail-oriented. Blends Type 5's depth of knowledge with Type 6's vigilance, loyalty, and structured logic."
      }
    },
    growth: 8,
    growthTitle: "Integration to Type 8 (The Challenger)",
    growthDetails: "In health and confidence, Fives step out of abstract contemplation into physical presence, decisive leadership, and bold action.",
    stress: 7,
    stressTitle: "Disintegration to Type 7 (The Enthusiast)",
    stressDetails: "Under extreme mental fatigue, Fives become scattered, restless, and prone to impulsive escapism or bingeing superficial distractions.",
    strengths: [
      "Exceptional capacity for deep focus, capable of untangling multi-layered abstract systems.",
      "Calm and objective under crisis, cutting through drama with clarity and sharp insight.",
      "Respects personal boundaries thoroughly and asks very little unnecessary help from others.",
      "Curious and open-minded thinker who values truth, data, and intellectual integrity."
    ],
    weaknesses: [
      "Can isolate themselves excessively, neglecting physical wellbeing and relationship maintenance.",
      "Prone to hoarding personal time and energy due to an underlying fear of depletion.",
      "May dismiss emotional dynamics as irrational, creating accidental friction with teammates.",
      "Struggles to move from the research phase to practical, public execution."
    ],
    relationshipDynamics: "Fives are quiet, loyal, and low-maintenance partners who show deep devotion by inviting someone into their private sanctuary of ideas. They need partners who respect their need for quiet solitude without interpreting it as a lack of affection.",
    workplaceBehavior: "Fives are the ultimate deep-work specialists. They excel in systems architecture, research engineering, data science, and investigative journalism. They perform best with autonomy, clear scopes, and minimal meeting overhead.",
    idealCareers: ["Research Scientist", "Software Architect", "Data Scientist", "Cybersecurity Analyst", "Philosopher / Academic", "Investigative Journalist"],
    famousExamples: ["Albert Einstein", "Marie Curie", "Nikola Tesla", "Bill Gates"],
    color: "from-indigo-500 to-blue-600",
    themeBg: "bg-indigo-50",
    themeBorder: "border-indigo-200",
    themeText: "text-indigo-700",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-100"
  },
  6: {
    name: "The Loyalist",
    tagline: "The Reliable, Vigilant, and Committed Troubleshooter",
    coreFear: "Being unsupported, unprepared, or caught completely off guard",
    coreDesire: "To have security, trustworthy guidance, and reliable stability",
    description: "Reliable, committed, hard-working, and foresightful. Sixes are exceptional troubleshooters who excel at anticipating potential risks and building dependable support networks. They are deeply loyal to people who earn their trust, but can grapple with self-doubt and anxiety.",
    center: "Head (Thinking)",
    centerShort: "Head",
    centerEmotion: "Fear & Risk Vigilance",
    centerExplanation: "As a Head type, Sixes experience anxiety as a constant radar scanning for what could go wrong, seeking safety through preparation, allies, and clear frameworks.",
    harmonic: "Reactive",
    harmonicExplanation: "When threats arise, Sixes respond with vigilance and direct questioning, wanting to surface hidden flaws and address risks openly.",
    hornevian: "Dutiful / Compliant",
    hornevianExplanation: "Sixes meet security needs by forming dependable alliances, honoring commitments, and upholding group safety.",
    wings: [5, 7],
    wingSubtypes: {
      5: {
        title: "6w5: The Defender",
        subtitle: "Analytical, cautious, and independent. Blends Type 6's vigilance with Type 5's depth of technical knowledge and self-reliance."
      },
      7: {
        title: "6w7: The Buddy",
        subtitle: "Engaging, playful, and socially warm. Blends Type 6's loyalty with Type 7's humor, spontaneity, and optimistic connection."
      }
    },
    growth: 9,
    growthTitle: "Integration to Type 9 (The Peacemaker)",
    growthDetails: "In health and security, Sixes quiet their internal alarm bells, cultivating deep inner calm, trust in life, and relaxed acceptance.",
    stress: 3,
    stressTitle: "Disintegration to Type 3 (The Achiever)",
    stressDetails: "Under acute pressure, Sixes become competitive, guarded, and image-conscious, working frantically to prove their standing.",
    strengths: [
      "Incomparable loyalty; stands up for friends, teams, and family through the most difficult storms.",
      "Proactive risk assessment; spots critical system vulnerabilities long before anyone else does.",
      "Realistic and down-to-earth; brings practical common sense and stability to grand visions.",
      "Remarkable courage in action; moves forward to protect their community even while feeling fear."
    ],
    weaknesses: [
      "Can get trapped in 'worst-case scenario' loops, creating unnecessary stress and delay.",
      "Prone to testing other people's loyalty or doubting good intentions without cause.",
      "May struggle with internal confidence, second-guessing decisions without external validation.",
      "Can react defensively to sudden, ambiguous changes in plans or leadership."
    ],
    relationshipDynamics: "Sixes take time to fully open up, but once trust is established, they are among the most devoted, ride-or-die partners on the Enneagram. Consistency, transparency, and clear communication are vital to making them feel safe and cherished.",
    workplaceBehavior: "Sixes are the operational backbone of any great organization. They excel in risk management, compliance, emergency preparedness, logistics, and quality assurance. They thrive under clear leadership and predictable expectations.",
    idealCareers: ["Risk Management Officer", "Quality & Safety Director", "Civil Engineer", "Financial Analyst", "Operations Manager", "Public Health Specialist"],
    famousExamples: ["Mark Twain", "Malcolm X", "Princess Diana", "Tom Hanks"],
    color: "from-emerald-500 to-teal-600",
    themeBg: "bg-emerald-50",
    themeBorder: "border-emerald-200",
    themeText: "text-emerald-700",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-100"
  },
  7: {
    name: "The Enthusiast",
    tagline: "The Spontaneous, Versatile, and Optimistic Visionary",
    coreFear: "Being trapped, limited, bored, or submerged in pain",
    coreDesire: "To experience freedom, joy, and the full variety of life",
    description: "Spontaneous, versatile, optimistic, and energetic. Sevens have agile minds that generate endless possibilities and love exploring new horizons. They bring joy and enthusiasm everywhere, but can struggle with impulsivity and avoiding difficult emotions.",
    center: "Head (Thinking)",
    centerShort: "Head",
    centerEmotion: "Fear & Mental Anticipation",
    centerExplanation: "As a Head type, Sevens evade underlying anxiety by planning exciting future experiences, using mental momentum and fun as a safeguard against boredom and distress.",
    harmonic: "Positive Outlook",
    harmonicExplanation: "When faced with disappointment, Sevens quickly reframe the scenario, finding silver linings and pivoting toward exciting next steps.",
    hornevian: "Assertive",
    hornevianExplanation: "Sevens assertively initiate adventures, pursue options, and refuse to let obstacles constrict their freedom.",
    wings: [6, 8],
    wingSubtypes: {
      6: {
        title: "7w6: The Pathfinder",
        subtitle: "Warm, witty, and loyal. Blends Type 7's infectious energy with Type 6's commitment to relationships and practical foresight."
      },
      8: {
        title: "7w8: The Realist",
        subtitle: "Bold, entrepreneurial, and assertive. Blends Type 7's visionary ideas with Type 8's toughness, directness, and pragmatic execution."
      }
    },
    growth: 5,
    growthTitle: "Integration to Type 5 (The Investigator)",
    growthDetails: "In health and grounding, Sevens quiet their restlessness, diving deeply into specialized mastery, patience, and contemplative focus.",
    stress: 1,
    stressTitle: "Disintegration to Type 1 (The Reformer)",
    stressDetails: "Under prolonged frustration, Sevens snap into rigid perfectionism, becoming unusually critical, dogmatic, and impatient with errors.",
    strengths: [
      "Infectious positive energy that revitalizes teams and inspires daring innovation.",
      "Lightning-fast mental agility, effortlessly connecting unrelated concepts into fresh insights.",
      "Deeply resilient; can bounce back from significant setbacks with constructive optimism.",
      "Fearless about trying new challenges, creating momentum where others hesitate."
    ],
    weaknesses: [
      "Prone to starting many exciting projects but abandoning them when execution turns routine.",
      "May evade difficult emotional conversations by deflecting with humor or fast distractions.",
      "Can suffer from severe FOMO (fear of missing out), over-committing and burning out.",
      "Impulsive decision-making can inadvertently overlook crucial long-term risks."
    ],
    relationshipDynamics: "Sevens bring magic, playfulness, and spontaneous joy to romance. They want a partner who is a co-adventurer in life. The growth edge for Sevens is staying present during quiet, unglamorous seasons and leaning into emotional discomfort rather than running away.",
    workplaceBehavior: "Sevens excel in dynamic, fast-evolving arenas like early-stage startups, creative media, event production, and creative strategy. They thrive in ideation, pitches, and concept sprints, benefiting from reliable teammates who oversee detailed implementation.",
    idealCareers: ["Startup Founder", "Creative Strategist", "Travel & Adventure Lead", "Innovation Consultant", "Product Evangelist", "Media Producer"],
    famousExamples: ["Robin Williams", "Richard Branson", "Amelia Earhart", "Elton John"],
    color: "from-amber-400 to-yellow-500",
    themeBg: "bg-amber-50",
    themeBorder: "border-amber-200",
    themeText: "text-amber-700",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-100"
  },
  8: {
    name: "The Challenger",
    tagline: "The Powerful, Assertive, and Protective Leader",
    coreFear: "Being harmed, controlled, manipulated, or vulnerable",
    coreDesire: "To protect themselves and loved ones, maintaining full autonomy",
    description: "Assertive, decisive, protective, and bold. Eights possess a commanding presence and an instinct for justice. They cut straight to the core of problems and stand up for those who cannot defend themselves, but can struggle with vulnerability and appearing intimidating.",
    center: "Gut (Instinctive)",
    centerShort: "Gut",
    centerEmotion: "Anger & Direct Boundary Enforcement",
    centerExplanation: "As a Gut type, Eights channel instinctive energy outward, facing the world directly and using raw willpower to establish control and safeguard their sphere.",
    harmonic: "Reactive",
    harmonicExplanation: "When conflict strikes, Eights confront issues head-on, demanding unfiltered truth, raw transparency, and immediate resolution.",
    hornevian: "Assertive",
    hornevianExplanation: "Eights actively push through roadblocks, asserting authority and shaping their environment through decisive willpower.",
    wings: [7, 9],
    wingSubtypes: {
      7: {
        title: "8w7: The Maverick",
        subtitle: "Expansive, energetic, and entrepreneurial. Blends Type 8's fierce strength with Type 7's visionary appetite for adventure and big risks."
      },
      9: {
        title: "8w9: The Bear",
        subtitle: "Grounded, steady, and calm. Blends Type 8's protective authority with Type 9's relaxed, patient, and unshakeable presence."
      }
    },
    growth: 2,
    growthTitle: "Integration to Type 2 (The Helper)",
    growthDetails: "In health and security, Eights drop their heavy armor, revealing immense open-hearted tenderness, protective nurturing, and generous service.",
    stress: 5,
    stressTitle: "Disintegration to Type 5 (The Investigator)",
    stressDetails: "Under sustained threat or betrayal, Eights withdraw into secretive isolation, becoming hyper-vigilant, cynical, and emotionally guarded.",
    strengths: [
      "Natural-born decisive leader who steps into chaotic crises and restores direction with courage.",
      "Fiercely protective champion of the underdog; refuses to tolerate bullying or injustice.",
      "Direct, transparent, and authentic; what you see is completely what you get.",
      "Massive endurance and grit; perseveres through daunting obstacles that deter others."
    ],
    weaknesses: [
      "Can easily come across as overwhelming or intimidating without realizing their impact.",
      "Deep aversion to showing vulnerability, viewing softness or asking for help as fatal weakness.",
      "Prone to pushing past physical exhaustion, denying biological limits out of pure stubbornness.",
      "Can spark unnecessary power struggles when feeling even subtly controlled."
    ],
    relationshipDynamics: "Eights desire a strong partner who can meet them as equals without backing down from healthy debate. Once an Eight trusts you, their loyalty and protective devotion are boundless. Their challenge is lowering their shields to reveal tender, vulnerable emotions.",
    workplaceBehavior: "Eights excel as chief executives, founders, trial lawyers, and turnaround specialists. They make difficult decisions effortlessly, cut through bureaucratic posturing, and fight for their team. They need to ensure they leave space for gentler voices to contribute.",
    idealCareers: ["Chief Executive (CEO)", "Trial Attorney", "Turnaround Consultant", "Union / Labor Leader", "Crisis Management Lead", "Venture Builder"],
    famousExamples: ["Martin Luther King Jr.", "Winston Churchill", "Serena Williams", "Ernest Hemingway"],
    color: "from-red-500 to-rose-600",
    themeBg: "bg-red-50",
    themeBorder: "border-red-200",
    themeText: "text-red-700",
    bgLight: "bg-red-50",
    borderLight: "border-red-100"
  },
  9: {
    name: "The Peacemaker",
    tagline: "The Receptive, Grounded, and Harmonious Mediator",
    coreFear: "Loss of connection, separation, and disruptive conflict",
    coreDesire: "To maintain inner stability, peace of mind, and mutual harmony",
    description: "Receptive, calm, empathetic, and accommodating. Nines have a remarkable gift for seeing every angle of an issue and helping opposing factions find common ground. They create a calming presence, but can struggle with self-assertion and passive inertia.",
    center: "Gut (Instinctive)",
    centerShort: "Gut",
    centerEmotion: "Anger & Somatic Numbing",
    centerExplanation: "As a Gut type, Nines hold instinctive energy, but suppress their anger beneath an even, peaceful surface to avoid stirring up friction with their surroundings.",
    harmonic: "Positive Outlook",
    harmonicExplanation: "When faced with turmoil, Nines minimize tension, focus on common ground, and reassure everyone that things will work out peacefully.",
    hornevian: "Withdrawn",
    hornevianExplanation: "Nines step back from disruptive demands to protect their inner equilibrium and avoid creating waves.",
    wings: [8, 1],
    wingSubtypes: {
      8: {
        title: "9w8: The Referee",
        subtitle: "Grounded, confident, and steady. Blends Type 9's calm mediation with Type 8's protective strength, gut instinct, and quiet firmness."
      },
      1: {
        title: "9w1: The Dreamer",
        subtitle: "Principled, gentle, and reflective. Blends Type 9's peaceful nature with Type 1's moral clarity, self-control, and idealistic order."
      }
    },
    growth: 3,
    growthTitle: "Integration to Type 3 (The Achiever)",
    growthDetails: "In health and awakening, Nines step onto the field, taking ownership of their personal potential, ambitions, and assertive voice.",
    stress: 6,
    stressTitle: "Disintegration to Type 6 (The Loyalist)",
    stressDetails: "Under prolonged pressure or confrontation, Nines lose their easygoing composure, becoming anxious, suspicious, and reactive.",
    strengths: [
      "Extraordinary mediation gift; can understand, synthesize, and validate opposing perspectives.",
      "Radiates a grounding, tranquil energy that helps tense groups de-escalate and find solutions.",
      "Deeply inclusive and non-judgmental, making others feel unconditionally accepted.",
      "Patient, dependable, and steady; provides an unshakeable emotional anchor for loved ones."
    ],
    weaknesses: [
      "Prone to merging with others' desires and forgetting what they personally want.",
      "Can slip into passive resistance or procrastination when feeling pressured rather than speaking up.",
      "May numb difficult emotions with mindless habits, comfort foods, or repetitive busywork.",
      "Avoids necessary conflict until unexpressed frustration unexpectedly boils over."
    ],
    relationshipDynamics: "Nines are warm, accepting, and uncomplicated partners who make relationships feel like a sanctuary. However, their partners can sometimes find it frustrating trying to extract the Nine's genuine preference. Relationships thrive when Nines actively bring their authentic desires to the table.",
    workplaceBehavior: "Nines excel in conflict resolution, organizational mediation, human resources, counseling, and consensus building. They keep collaborative teams united and harmonious. They shine brightest when given encouragement to lead and voice their own strategic ideas.",
    idealCareers: ["Ombudsperson / Mediator", "Diplomat & Negotiator", "Family Counselor", "HR Operations Lead", "Community Facilitator", "Landscape Architect"],
    famousExamples: ["Abraham Lincoln", "Keanu Reeves", "Barack Obama", "Walt Disney"],
    color: "from-teal-400 to-cyan-500",
    themeBg: "bg-teal-50",
    themeBorder: "border-teal-200",
    themeText: "text-teal-700",
    bgLight: "bg-teal-50",
    borderLight: "border-teal-100"
  }
};

// Archetypal Historical Figures with Real Insights & Quotes
export const ARCHETYPE_FIGURES = {
  1: [
    { name: "Nelson Mandela", role: "Anti-Apartheid Leader & President", quote: "It always seems impossible until it is done." },
    { name: "Mahatma Gandhi", role: "Civil Rights Leader & Philosopher", quote: "Be the change that you wish to see in the world." },
    { name: "Steve Jobs", role: "Tech Innovator & Visionary", quote: "Details matter; it's worth waiting to get it right." }
  ],
  2: [
    { name: "Mother Teresa", role: "Humanitarian & Nobel Laureate", quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier." },
    { name: "Fred Rogers", role: "Educator & Broadcaster", quote: "There are three ways to ultimate success: The first way is to be kind. The second way is to be kind. The third way is to be kind." },
    { name: "Dolly Parton", role: "Musician & Philanthropist", quote: "If your actions create a legacy that inspires others to dream more and learn more, you are a leader." }
  ],
  3: [
    { name: "Michael Jordan", role: "Basketball Legend & Entrepreneur", quote: "I've failed over and over and over again in my life. And that is why I succeed." },
    { name: "Oprah Winfrey", role: "Media Pioneer & Philanthropist", quote: "The biggest adventure you can take is to live the life of your dreams." },
    { name: "Muhammad Ali", role: "Boxing Champion & Activist", quote: "Don't count the days, make the days count." }
  ],
  4: [
    { name: "Frida Kahlo", role: "Visual Artist & Cultural Icon", quote: "I paint my own reality. The only thing I know is that I paint because I need to." },
    { name: "Edgar Allan Poe", role: "Poet & Storyteller", quote: "All that we see or seem is but a dream within a dream." },
    { name: "Virginia Woolf", role: "Author & Essayist", quote: "You cannot find peace by avoiding life." }
  ],
  5: [
    { name: "Albert Einstein", role: "Theoretical Physicist", quote: "The important thing is not to stop questioning. Curiosity has its own reason for existing." },
    { name: "Marie Curie", role: "Nobel Laureate in Physics & Chemistry", quote: "Nothing in life is to be feared, it is only to be understood." },
    { name: "Nikola Tesla", role: "Inventor & Electrical Engineer", quote: "Be alone, that is the secret of invention; be alone, that is when ideas are born." }
  ],
  6: [
    { name: "Mark Twain", role: "Author & Humorist", quote: "Courage is resistance to fear, mastery of fear—not absence of fear." },
    { name: "Malcolm X", role: "Civil Rights Leader & Orator", quote: "There is no better than adversity. Every defeat, every heartbreak contains its own seed on how to improve." },
    { name: "Princess Diana", role: "Humanitarian & Global Icon", quote: "Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you." }
  ],
  7: [
    { name: "Robin Williams", role: "Actor & Comedian", quote: "You're only given a little spark of madness. You mustn't lose it." },
    { name: "Richard Branson", role: "Entrepreneur & Founder", quote: "Life is a lot more fun if you say yes to things rather than no." },
    { name: "Amelia Earhart", role: "Aviation Pioneer", quote: "Adventure is worthwhile in itself." }
  ],
  8: [
    { name: "Martin Luther King Jr.", role: "Civil Rights Icon & Orator", quote: "The ultimate measure of a person is not where they stand in moments of comfort, but where they stand at times of challenge and controversy." },
    { name: "Winston Churchill", role: "Statesman & Prime Minister", quote: "Success is not final, failure is not fatal: it is the courage to continue that counts." },
    { name: "Serena Williams", role: "Grand Slam Champion", quote: "I've grown most not from victories, but from setbacks." }
  ],
  9: [
    { name: "Abraham Lincoln", role: "16th US President & Unifier", quote: "Do I not destroy my enemies when I make them my friends?" },
    { name: "Keanu Reeves", role: "Actor & Philanthropist", quote: "Every struggle in your life has shaped you into the person you are today. Be thankful for the hard times, they can only make you stronger." },
    { name: "Walt Disney", role: "Pioneer of Animation & Entertainment", quote: "Laughter is timeless, imagination has no age, dreams are forever." }
  ]
};

export const CENTER_DETAILS = {
  "Gut": {
    name: "Gut / Instinctive Center",
    types: "Types 8, 9, 1",
    theme: "Autonomy, Boundaries & Anger",
    color: "from-amber-500 to-red-500",
    badge: "Gut Center",
    description: "Types in the Gut Center process life primarily through somatic intuition, gut instinct, and physical presence. They are fundamentally concerned with personal autonomy, boundary integrity, and managing underlying anger (acting it out as Type 8, numbing it as Type 9, or turning it inward as Type 1)."
  },
  "Heart": {
    name: "Heart / Feeling Center",
    types: "Types 2, 3, 4",
    theme: "Identity, Connection & Shame",
    color: "from-rose-500 to-fuchsia-600",
    badge: "Heart Center",
    description: "Types in the Heart Center process life primarily through emotional connection, interpersonal attunement, and personal value. They are fundamentally concerned with self-worth, image, and managing underlying shame (seeking approval by helping as Type 2, by achieving as Type 3, or by being unique as Type 4)."
  },
  "Head": {
    name: "Head / Thinking Center",
    types: "Types 5, 6, 7",
    theme: "Security, Foresight & Fear",
    color: "from-blue-500 to-indigo-600",
    badge: "Head Center",
    description: "Types in the Head Center process life primarily through mental analysis, strategy, and conceptual frameworks. They are fundamentally concerned with security, certainty, and managing underlying fear (retreating to understand as Type 5, preparing for hazards as Type 6, or anticipating excitement as Type 7)."
  }
};

// 54 Clear, Accessible Enneagram Questions (6 questions per type, Types 1 to 9)
// Styled to be easy to understand, relatable, and phrased like the MBTI assessment
export const enneagramExpandedQuestions = [
  // TYPE 1: The Reformer (Questions 1 - 6)
  { id: 1, text: "You hold yourself to high personal standards and feel uneasy when tasks are done carelessly or without effort.", type: 1, multiplier: 1 },
  { id: 2, text: "When you notice a mistake, typo, or disorganization, you feel a natural urge to step in and fix it.", type: 1, multiplier: 1 },
  { id: 3, text: "You have an active inner voice that constantly critiques your own performance and points out how things could be improved.", type: 1, multiplier: 1 },
  { id: 4, text: "You find it hard to truly relax if there are still unfinished chores, emails, or responsibilities on your plate.", type: 1, multiplier: 1 },
  { id: 5, text: "You believe rules, fairness, and principles should apply equally to everyone, regardless of personal feelings.", type: 1, multiplier: 1 },
  { id: 6, text: "You sometimes feel quiet frustration when you feel like you are the only one taking responsibility seriously.", type: 1, multiplier: 1 },

  // TYPE 2: The Helper (Questions 7 - 12)
  { id: 7, text: "You easily sense when someone is struggling emotionally and naturally offer your help before they have to ask.", type: 2, multiplier: 1 },
  { id: 8, text: "You feel happiest and most fulfilled when you know that people close to you genuinely appreciate and need you.", type: 2, multiplier: 1 },
  { id: 9, text: "You find it much easier to listen to and support everyone else's problems than to ask for help with your own.", type: 2, multiplier: 1 },
  { id: 10, text: "You place enormous value on close personal relationships and worry when a loved one seems emotionally distant.", type: 2, multiplier: 1 },
  { id: 11, text: "You frequently go out of your way to make others feel welcome, sometimes sacrificing your own comfort or time.", type: 2, multiplier: 1 },
  { id: 12, text: "A sincere, heartfelt 'thank you' from someone you helped means more to you than formal awards or prestige.", type: 2, multiplier: 1 },

  // TYPE 3: The Achiever (Questions 13 - 18)
  { id: 13, text: "You are motivated by setting ambitious goals and get immense satisfaction from checking off measurable wins.", type: 3, multiplier: 1 },
  { id: 14, text: "You naturally adjust your style and communication depending on your audience to make an impressive impact.", type: 3, multiplier: 1 },
  { id: 15, text: "You prioritize efficiency and fast progress, getting impatient when projects get bogged down in endless debate.", type: 3, multiplier: 1 },
  { id: 16, text: "You feel most confident and energized when your competence and hard work are recognized by others.", type: 3, multiplier: 1 },
  { id: 17, text: "You struggle to sit idle without feeling a nagging guilt that you ought to be doing something productive.", type: 3, multiplier: 1 },
  { id: 18, text: "You focus heavily on projecting success and capability to the world, even when you have private doubts inside.", type: 3, multiplier: 1 },

  // TYPE 4: The Individualist (Questions 19 - 24)
  { id: 19, text: "You value authenticity and deep meaning above all else, disliking anything that feels generic, fake, or superficial.", type: 4, multiplier: 1 },
  { id: 20, text: "You experience a rich, complex range of emotions and often express your inner world through creative tastes or personal style.", type: 4, multiplier: 1 },
  { id: 21, text: "You frequently feel like an outsider who sees life differently from the conventional crowd.", type: 4, multiplier: 1 },
  { id: 22, text: "You prefer raw, heartfelt conversations about life's real struggles over cheerful, polite small talk.", type: 4, multiplier: 1 },
  { id: 23, text: "You allow yourself to fully feel feelings of nostalgia, longing, or sadness instead of immediately trying to distract yourself.", type: 4, multiplier: 1 },
  { id: 24, text: "You have a strong desire to create a unique personal identity that is distinctly your own.", type: 4, multiplier: 1 },

  // TYPE 5: The Investigator (Questions 25 - 30)
  { id: 25, text: "You need plenty of uninterrupted time alone to recharge your mental energy after socializing or working around crowds.", type: 5, multiplier: 1 },
  { id: 26, text: "Before taking action or giving an opinion on a subject, you prefer researching thoroughly to understand all the mechanics.", type: 5, multiplier: 1 },
  { id: 27, text: "In tense or emotionally charged situations, you tend to step back mentally and observe with cool, calm logic.", type: 5, multiplier: 1 },
  { id: 28, text: "You guard your personal time and boundaries carefully, disliking when others make sudden demands on your energy.", type: 5, multiplier: 1 },
  { id: 29, text: "You love exploring complex topics and acquiring deep expertise simply for the pure joy of understanding them.", type: 5, multiplier: 1 },
  { id: 30, text: "You pride yourself on being self-sufficient and prefer solving problems independently rather than asking for assistance.", type: 5, multiplier: 1 },

  // TYPE 6: The Loyalist (Questions 31 - 36)
  { id: 31, text: "You naturally anticipate potential risks and always like having a practical Plan B ready just in case.", type: 6, multiplier: 1 },
  { id: 32, text: "You are fiercely loyal to your inner circle and stand firmly by people who have proven themselves trustworthy.", type: 6, multiplier: 1 },
  { id: 33, text: "When facing major life decisions, you often feel internal self-doubt and like bouncing your thoughts off trusted confidants.", type: 6, multiplier: 1 },
  { id: 34, text: "You place high value on honesty, consistency, and clear rules, feeling uneasy when people have hidden agendas.", type: 6, multiplier: 1 },
  { id: 35, text: "You mentally run through 'what-if' scenarios in advance so that unexpected hiccups don't catch you off balance.", type: 6, multiplier: 1 },
  { id: 36, text: "You take your time before fully trusting new people or untested ideas, looking for real proof of consistency first.", type: 6, multiplier: 1 },

  // TYPE 7: The Enthusiast (Questions 37 - 42)
  { id: 37, text: "Your mind is constantly bubbling with exciting ideas, creative plans, and upcoming adventures you want to try.", type: 7, multiplier: 1 },
  { id: 38, text: "You hate feeling trapped in rigid routines or boredom, preferring to keep your calendar open and full of possibilities.", type: 7, multiplier: 1 },
  { id: 39, text: "When something goes wrong, you quickly look for the silver lining and find ways to turn it into a positive learning experience.", type: 7, multiplier: 1 },
  { id: 40, text: "You love starting new projects and hobbies, though your interest can wane once the initial novelty wears off.", type: 7, multiplier: 1 },
  { id: 41, text: "When uncomfortable or stressful feelings start creeping in, your reflex is to lift your spirits with fun activities or positive company.", type: 7, multiplier: 1 },
  { id: 42, text: "You bring infectious enthusiasm and spontaneity to groups, inspiring people around you to enjoy the moment.", type: 7, multiplier: 1 },

  // TYPE 8: The Challenger (Questions 43 - 48)
  { id: 43, text: "You are straightforward and direct, preferring honest, blunt communication over beating around the bush.", type: 8, multiplier: 1 },
  { id: 44, text: "You naturally step up and take charge of a situation when there is confusion, hesitation, or a lack of leadership.", type: 8, multiplier: 1 },
  { id: 45, text: "You are fiercely protective of people you care about and never hesitate to stand up for someone being treated unfairly.", type: 8, multiplier: 1 },
  { id: 46, text: "You are completely comfortable with debate and confrontation, respecting people who have the guts to stand their ground.", type: 8, multiplier: 1 },
  { id: 47, text: "You value independence and strongly push back against anyone who tries to control, micromanage, or patronize you.", type: 8, multiplier: 1 },
  { id: 48, text: "You prefer taking immediate, decisive action to tackle a problem rather than sitting around and overanalyzing it.", type: 8, multiplier: 1 },

  // TYPE 9: The Peacemaker (Questions 49 - 54)
  { id: 49, text: "You have a natural ability to understand different points of view in a dispute and help people find common ground.", type: 9, multiplier: 1 },
  { id: 50, text: "You value inner peace and calm above all, often going with the flow to prevent unnecessary friction or arguments.", type: 9, multiplier: 1 },
  { id: 51, text: "You find it easy to compromise on small plans or preferences because keeping everyone happy feels more important.", type: 9, multiplier: 1 },
  { id: 52, text: "When tension or harsh conflict breaks out around you, your first instinct is to diffuse it gently or quietly withdraw.", type: 9, multiplier: 1 },
  { id: 53, text: "You sometimes hold back your true preferences to keep the peace, only to realize later that you compromised too much.", type: 9, multiplier: 1 },
  { id: 54, text: "You feel most comfortable in peaceful, steady environments where there is no pressure or hostility.", type: 9, multiplier: 1 }
];

export const cleanExpandedQuestions = enneagramExpandedQuestions;
export const enneagramTestQuestions = [...enneagramExpandedQuestions];

export function calculateEnneagramResult(answers, simpleAnswersMap, allQuestions) {
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  if (Array.isArray(answers) && answers.length > 0) {
    answers.forEach(item => {
      const val = Number(item.value || 0);
      const t = item.type;
      if (t && scores[t] !== undefined) {
        scores[t] += val;
      }
    });
  } else if (simpleAnswersMap && typeof simpleAnswersMap === 'object') {
    const questionsToUse = allQuestions || enneagramExpandedQuestions;
    questionsToUse.forEach(q => {
      const val = simpleAnswersMap[q.id];
      if (val !== undefined && scores[q.type] !== undefined) {
        scores[q.type] += Number(val);
      }
    });
  }

  // Find primary type with highest score
  let primaryType = 1;
  let maxScore = -1;

  for (let i = 1; i <= 9; i++) {
    if (scores[i] > maxScore) {
      maxScore = scores[i];
      primaryType = i;
    }
  }

  // Calculate wing (highest among the two adjacent wings on the circle)
  const candidateWings = enneagramTypes[primaryType]?.wings || [9, 2];
  const wing1 = candidateWings[0];
  const wing2 = candidateWings[1];
  const wing1Score = scores[wing1] || 0;
  const wing2Score = scores[wing2] || 0;

  const wingType = wing1Score >= wing2Score ? wing1 : wing2;

  // Normalize breakdown scores (percentages out of 42 max possible points: 6 questions * 7 points)
  const MAX_POSSIBLE_SCORE = 42;
  const breakdown = {};
  for (let i = 1; i <= 9; i++) {
    const pct = Math.round((scores[i] / MAX_POSSIBLE_SCORE) * 100);
    breakdown[i] = Math.min(Math.max(pct, 5), 100);
  }

  return {
    type: primaryType,
    wing: wingType,
    fullTitle: `${primaryType}w${wingType}`,
    info: enneagramTypes[primaryType],
    breakdown
  };
}
