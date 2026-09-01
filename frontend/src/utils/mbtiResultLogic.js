export const mbtiQuestions = [
  // Page 1 (6 Questions)
  { id: 1, text: "You feel mentally drained after spending hours in crowded social events and need solitude to recharge.", axis: "E-I", positive: "I" },
  { id: 2, text: "You are frequently drawn to abstract theories, philosophical concepts, and big-picture ideas.", axis: "S-N", positive: "N" },
  { id: 3, text: "When making decisions, you prioritize objective logic, rational analysis, and consistency over personal feelings.", axis: "T-F", positive: "T" },
  { id: 4, text: "You prefer having a structured daily plan and feel uncomfortable when things are left unsettled.", axis: "J-P", positive: "J" },
  { id: 5, text: "You feel energized and enthusiastic when interacting with a wide circle of friends and meeting new people.", axis: "E-I", positive: "E" },
  { id: 6, text: "You focus heavily on concrete facts, practical details, and present realities rather than speculative ideas.", axis: "S-N", positive: "S" },

  // Page 2 (6 Questions)
  { id: 7, text: "You are deeply attuned to how your decisions affect other people's emotions and value interpersonal harmony.", axis: "T-F", positive: "F" },
  { id: 8, text: "You thrive on spontaneity and prefer keeping your schedule open and adaptable to last-minute changes.", axis: "J-P", positive: "P" },
  { id: 9, text: "You prefer working through complex problems in solitary contemplation rather than in group brainstorming sessions.", axis: "E-I", positive: "I" },
  { id: 10, text: "You love connecting seemingly unrelated concepts and discovering hidden patterns behind everyday events.", axis: "S-N", positive: "N" },
  { id: 11, text: "In an argument or debate, reaching the absolute factual truth matters more to you than protecting someone's feelings.", axis: "T-F", positive: "T" },
  { id: 12, text: "You make to-do lists and feel a strong sense of satisfaction when checking off completed milestones.", axis: "J-P", positive: "J" },

  // Page 3 (6 Questions)
  { id: 13, text: "You feel comfortable speaking up in large group discussions and often take the lead in social settings.", axis: "E-I", positive: "E" },
  { id: 14, text: "You trust proven methods, hands-on experience, and practical guidelines over untested experimental theories.", axis: "S-N", positive: "S" },
  { id: 15, text: "You instinctively put yourself in other people's shoes and find it easy to empathize with their emotional struggles.", axis: "T-F", positive: "F" },
  { id: 16, text: "You tend to delay making final decisions until the last possible moment so you can gather more information.", axis: "J-P", positive: "P" },
  { id: 17, text: "You find small talk exhausting and prefer diving straight into deep, intellectually stimulating conversations.", axis: "E-I", positive: "I" },
  { id: 18, text: "You are more fascinated by future possibilities and hypothetical scenarios than by what is currently happening.", axis: "S-N", positive: "N" },

  // Page 4 (6 Questions)
  { id: 19, text: "You naturally analyze systems, point out logical fallacies, and spot inconsistencies in reasoning.", axis: "T-F", positive: "T" },
  { id: 20, text: "You feel unsettled when your living or working environment is cluttered or disarranged.", axis: "J-P", positive: "J" },
  { id: 21, text: "You tend to process thoughts out loud by talking them through with others rather than keeping them internal.", axis: "E-I", positive: "E" },
  { id: 22, text: "You describe yourself as a grounded realist who values tangible, step-by-step results over abstract visions.", axis: "S-N", positive: "S" },
  { id: 23, text: "You strive to maintain emotional peace and will often compromise to avoid interpersonal conflict.", axis: "T-F", positive: "F" },
  { id: 24, text: "Your productivity comes in spontaneous bursts of inspiration rather than steady, methodical routines.", axis: "J-P", positive: "P" },

  // Page 5 (6 Questions)
  { id: 25, text: "You prefer spending a quiet evening with a book, hobby, or one close confidant over attending a loud party.", axis: "E-I", positive: "I" },
  { id: 26, text: "You often think about complex conceptual models, symbolic meanings, and overarching systems.", axis: "S-N", positive: "N" },
  { id: 27, text: "You remain calm, level-headed, and emotionally detached when analyzing stressful situations.", axis: "T-F", positive: "T" },
  { id: 28, text: "You prefer having your travel itineraries, deadlines, and social calendar finalized well in advance.", axis: "J-P", positive: "J" },
  { id: 29, text: "You readily start conversations with strangers and find it easy to break the ice in unfamiliar environments.", axis: "E-I", positive: "E" },
  { id: 30, text: "You prefer concrete, direct answers over open-ended philosophical speculations.", axis: "S-N", positive: "S" }
];

export function calculateMBTI(answers, questions) {
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  questions.forEach(q => {
    const rawVal = answers[q.id];
    if (rawVal !== undefined) {
      const delta = Number(rawVal) - 4;
      const [pole1, pole2] = q.axis.split('-');
      const targetPole = q.positive;
      const oppositePole = targetPole === pole1 ? pole2 : pole1;

      if (delta > 0) {
        scores[targetPole] += delta;
      } else if (delta < 0) {
        scores[oppositePole] += Math.abs(delta);
      }
    }
  });

  const type = [
    scores.E >= scores.I ? 'E' : 'I',
    scores.S >= scores.N ? 'S' : 'N',
    scores.T >= scores.F ? 'T' : 'F',
    scores.J >= scores.P ? 'J' : 'P'
  ].join('');

  const percentages = {
    EI: Math.round((scores.E / (scores.E + scores.I || 1)) * 100) || 50,
    SN: Math.round((scores.S / (scores.S + scores.N || 1)) * 100) || 50,
    TF: Math.round((scores.T / (scores.T + scores.F || 1)) * 100) || 50,
    JP: Math.round((scores.J / (scores.J + scores.P || 1)) * 100) || 50,
  };

  return { type, scores, percentages };
}

export const typeDescriptions = {
  INTJ: {
    title: "The Mastermind",
    desc: "Strategic, analytical, and highly independent thinkers with an insatiable drive for competence and long-term vision.",
    coreValues: ["Autonomy", "Competence", "Strategic Vision", "Systemic Logic"],
    habits: "You approach life as a strategic chessboard. You optimize your daily workflow, anticipate roadblocks days in advance, and protect your focused solitude.",
    careers: ["Systems Architect", "Strategic Consultant", "AI Research Scientist", "Investment Director", "Software Engineer", "Neuroscientist"],
    stressResponse: "Under acute stress, your inferior Extraverted Sensing (Se) can trigger impulsive sensory overindulgence, sudden obsession with external details, or sensory overload.",
    colors: ["indigo", "purple"],
    strengths: ["Strategic Vision", "High Independence", "Deep Logical Clarity", "Unyielding Determination"],
    weaknesses: ["Can be overly critical", "Impatience with inefficiency", "Dismissive of emotional nuances"],
    romantic: "Seek an intellectual equal who respects personal space and communicates with complete authenticity.",
    friendships: "Keep a very small, fiercely loyal inner circle built on deep intellectual trust.",
    workplace: "Excel in complex problem-solving, architectural design, engineering, and macro strategy.",
    compatibility: { best: ["ENFP", "ENTP"], good: ["INFJ", "INTP", "ENTJ"] },
    secretDreams: "To architect an enduring system that outlives them and redefines how the world operates.",
    hiddenFears: "Loss of autonomy, falling prey to incompetence, or having their vision derailed by irrational bureaucracy.",
    mythologicalArchetype: "The Grand Architect"
  },
  INTP: {
    title: "The Logician",
    desc: "Insatiably curious, inventive thinkers who deconstruct complex systems and build intricate conceptual frameworks.",
    coreValues: ["Truth", "Intellectual Freedom", "Conceptual Precision", "Curiosity"],
    habits: "You spend your days dissecting conceptual rabbit holes, identifying logical inconsistencies, and mentally redesigning systems to maximize internal coherence.",
    careers: ["Theoretical Physicist", "Software Architect", "Algorithm Engineer", "Philosopher", "Data Scientist", "Research Analyst"],
    stressResponse: "Under extreme stress, your inferior Extraverted Feeling (Fe) can trigger uncharacteristic emotional hypersensitivity, fear of social rejection, or sudden emotional outbursts.",
    colors: ["indigo", "sky"],
    strengths: ["Brilliant Analytical Logic", "Boundless Curiosity", "Unconventional Thinking", "Objective Honesty"],
    weaknesses: ["Chronic overthinking", "Struggle with routine execution", "Can appear emotionally detached"],
    romantic: "Appreciate partners who engage in witty banter and love exploring abstract ideas together.",
    friendships: "Bond through shared obscure interests, intellectual debates, and zero social pretense.",
    workplace: "Thrive in research, software development, theoretical mathematics, and pioneering innovation.",
    compatibility: { best: ["ENTJ", "ENFJ"], good: ["INTJ", "INFJ", "ENTP"] },
    secretDreams: "To formulate a unified theoretical model that explains the fundamental nature of reality.",
    hiddenFears: "Intellectual stagnation, dogmatic conformity, or being trapped in mindless repetitive routine.",
    mythologicalArchetype: "The Alchemist"
  },
  ENTJ: {
    title: "The Commander",
    desc: "Decisive, visionary leaders with a natural gift for organizing resources, orchestrating talent, and executing ambitious goals.",
    coreValues: ["Leadership", "Efficiency", "Meritocracy", "Achievement"],
    habits: "You naturally take charge of chaotic environments, establish clear operational milestones, and relentlessly eliminate bottlenecks to drive execution.",
    careers: ["Chief Executive Officer", "Management Consultant", "Venture Capitalist", "Corporate Director", "Judge", "Operations Strategist"],
    stressResponse: "Under acute stress, your inferior Introverted Feeling (Fi) can cause sudden emotional volatility, feelings of deep isolation, or self-doubt about personal worth.",
    colors: ["indigo", "rose"],
    strengths: ["Decisive Command", "Strategic Forecasting", "Unyielding Drive", "Exceptional Efficiency"],
    weaknesses: ["Can be blunt or domineering", "Impatience with hesitation", "Struggles with emotional vulnerability"],
    romantic: "Require an ambitious, confident partner who isn't intimidated by direct communication and drive.",
    friendships: "Form powerful alliances and long-lasting friendships with people who share their drive for excellence.",
    workplace: "Excel as executive leaders, entrepreneurs, management consultants, and project directors.",
    compatibility: { best: ["INTP", "INFP"], good: ["INTJ", "ENTP", "ENFJ"] },
    secretDreams: "To build a multi-generational empire or global organization that fundamentally changes an industry.",
    hiddenFears: "Loss of executive control, helplessness in the face of stagnation, or unfulfilled potential.",
    mythologicalArchetype: "The Sovereign"
  },
  ENTP: {
    title: "The Visionary",
    desc: "Dynamic, quick-witted innovators who challenge orthodoxy and see limitless possibilities in every idea.",
    coreValues: ["Innovation", "Mental Agility", "Freedom", "Debate"],
    habits: "You generate dozens of novel concepts daily, challenge prevailing dogmas through intellectual sparring, and pivot rapidly when fresh inspiration strikes.",
    careers: ["Startup Founder", "Creative Director", "Innovation Strategist", "Venture Capitalist", "Patent Attorney", "Political Strategist"],
    stressResponse: "Under acute stress, your inferior Introverted Sensing (Si) can manifest as compulsive fixation on bodily sensations, hypochondria, or obsessive cataloging of minor details.",
    colors: ["purple", "amber"],
    strengths: ["Rapid Lateral Thinking", "High Charisma", "Fearless Innovation", "Adaptable Intellect"],
    weaknesses: ["Easily bored with follow-through", "Argumentative tendencies", "Procrastination on routine tasks"],
    romantic: "Thrive with partners who are open-minded, intellectually adventurous, and enjoy playful banter.",
    friendships: "The spark in any social group, introducing friends to wild ideas and spontaneous adventures.",
    workplace: "Thrive as startup founders, venture creators, creative directors, and debate strategists.",
    compatibility: { best: ["INFJ", "INTJ"], good: ["ENFP", "INTP", "ENTJ"] },
    secretDreams: "To spark a paradigm shift that overturns outdated dogmas across society.",
    hiddenFears: "Mental imprisonment, routine monotony, or having their creative potential stifled.",
    mythologicalArchetype: "The Trickster Innovator"
  },
  INFJ: {
    title: "The Advocate",
    desc: "Insightful, empathetic visionaries guided by profound humanitarian values and deep symbolic intuition.",
    coreValues: ["Authenticity", "Human Growth", "Integrity", "Deep Meaning"],
    habits: "You quietly observe human dynamics, anticipate emotional trajectories, and devote your energy to meaningful causes and creative synthesis.",
    careers: ["Psychotherapist", "Organizational Counselor", "Author / Novelist", "Human Rights Strategist", "Professor", "Bioethicist"],
    stressResponse: "Under acute stress, your inferior Extraverted Sensing (Se) can trigger reckless sensory indulgence, binge eating, or sudden sensory hypersensitivity.",
    colors: ["emerald", "teal"],
    strengths: ["Profound Empathy", "Visionary Insight", "Moral Conviction", "Creative Eloquence"],
    weaknesses: ["Prone to extreme burnout", "Perfectionism", "Reluctance to open up to acquaintances"],
    romantic: "Seek a soulful, emotionally safe partnership grounded in mutual vulnerability and depth.",
    friendships: "Form rare, deeply spiritual connections where conversations transcend surface-level topics.",
    workplace: "Excel in psychology, counseling, literature, organizational development, and social impact.",
    compatibility: { best: ["ENTP", "ENFP"], good: ["INTJ", "INFP", "ENFJ"] },
    secretDreams: "To ignite a global awakening of empathy and elevate the collective human consciousness.",
    hiddenFears: "Being fundamentally misunderstood, isolation, or watching their ideals crushed by cynicism.",
    mythologicalArchetype: "The Oracle"
  },
  INFP: {
    title: "The Mediator",
    desc: "Imaginative, deeply empathetic idealists driven by an unshakeable inner compass and creative devotion.",
    coreValues: ["Individual Authenticity", "Compassion", "Creative Expression", "Harmony"],
    habits: "You filter every experience through your internal value system, expressing your rich emotional world through creative writing, art, and quiet kindness.",
    careers: ["Novelist / Screenwriter", "Mental Health Counselor", "Graphic Artist", "Humanitarian Worker", "Environmental Scientist", "Editor"],
    stressResponse: "Under acute stress, your inferior Extraverted Thinking (Te) can trigger uncharacteristic harshness, obsessive organizing, or blunt, critical outbursts.",
    colors: ["emerald", "rose"],
    strengths: ["Boundless Empathy", "Creative Vision", "Loyalty to Core Values", "Open-Minded Compassion"],
    weaknesses: ["Hypersensitive to criticism", "Impracticality at times", "Tendency to isolate when hurt"],
    romantic: "Crave a poetic, deeply authentic romance where they can share their most vulnerable dreams.",
    friendships: "Unconditionally accepting friends who provide a safe harbor during emotional storms.",
    workplace: "Thrive as writers, artists, mental health therapists, and ethical advocacy leaders.",
    compatibility: { best: ["ENTJ", "ENFJ"], good: ["INFJ", "ISFP", "INTP"] },
    secretDreams: "To heal emotional wounds and write a masterpiece that touches millions of souls.",
    hiddenFears: "Losing their unique identity, moral corruption, or living an uninspired, meaningless life.",
    mythologicalArchetype: "The Mystic Poet"
  },
  ENFJ: {
    title: "The Protagonist",
    desc: "Charismatic, inspiring mentors who bring out the latent potential in others and foster genuine community.",
    coreValues: ["Community", "Growth", "Inspiration", "Empathy"],
    habits: "You intuitively read social dynamics, proactively resolve emotional friction, and organize collaborative initiatives to help individuals flourish.",
    careers: ["Executive Coach", "Educational Director", "Public Relations Leader", "Non-Profit Executive", "Diplomat", "HR Director"],
    stressResponse: "Under acute stress, your inferior Introverted Thinking (Ti) can cause hyper-critical cynicism, bitter self-criticism, and compulsive logical fault-finding.",
    colors: ["emerald", "amber"],
    strengths: ["Magnetic Charisma", "Inspirational Leadership", "Emotional Intelligence", "Altruistic Vision"],
    weaknesses: ["Prone to over-committing", "Struggles to say no", "Can take others' problems too personally"],
    romantic: "Devoted, highly supportive partners who prioritize emotional connection and mutual growth.",
    friendships: "The connector who unites people from all walks of life into cohesive, loving circles.",
    workplace: "Excel in executive coaching, education, public relations, non-profit leadership, and diplomacy.",
    compatibility: { best: ["INFP", "INTP"], good: ["INFJ", "ENFP", "ISFJ"] },
    secretDreams: "To build a world where every single individual feels valued, empowered, and loved.",
    hiddenFears: "Letting down the people who rely on them, social disharmony, or being secretly unloved.",
    mythologicalArchetype: "The Luminary Mentor"
  },
  ENFP: {
    title: "The Campaigner",
    desc: "Enthusiastic, free-spirited visionaries who see life as a magical web of connections and creative possibilities.",
    coreValues: ["Freedom", "Authentic Connection", "Spontaneity", "Inspiration"],
    habits: "You spark spontaneous conversations, explore creative passions, and build bridge connections between diverse people wherever you go.",
    careers: ["Creative Director", "Investigative Journalist", "Marketing Strategist", "UX Designer", "Podcast Host", "Life Coach"],
    stressResponse: "Under acute stress, your inferior Introverted Sensing (Si) can lead to obsessive fixation on physical ailments, tunnel vision on past mistakes, or panic over minor details.",
    colors: ["emerald", "purple"],
    strengths: ["Infectious Optimism", "Deep Empathetic Connection", "Unbounded Creativity", "Social Magnetism"],
    weaknesses: ["Easily overwhelmed by details", "Struggle with repetitive follow-through", "Overthinking reactions"],
    romantic: "Seek an adventurous partner who shares their zest for exploration and supports their wild dreams.",
    friendships: "Unforgettable companions who turn everyday errands into spontaneous adventures.",
    workplace: "Thrive in creative fields, marketing, storytelling, entrepreneurship, and human advocacy.",
    compatibility: { best: ["INTJ", "INFJ"], good: ["ENTP", "INFP", "ENFJ"] },
    secretDreams: "To live a life of total freedom, boundless creative expression, and unforgettable adventures.",
    hiddenFears: "Loss of creative autonomy, being trapped in a grey mundane existence, or emotional numbness.",
    mythologicalArchetype: "The Wandering Muse"
  },
  ISTJ: {
    title: "The Inspector",
    desc: "Methodical, reliable, and deeply grounded traditionalists who uphold structural order and institutional integrity.",
    coreValues: ["Duty", "Reliability", "Factual Accuracy", "Tradition"],
    habits: "You establish orderly checklists, systematically maintain records, and execute your responsibilities with quiet, unwavering consistency.",
    careers: ["Financial Auditor", "Civil Engineer", "Judicial Officer", "Operations Manager", "Database Administrator", "Logistics Director"],
    stressResponse: "Under acute stress, your inferior Extraverted Intuition (Ne) causes catastrophic worst-case scenario thinking, anxiety about the unknown, and fear of sudden disruption.",
    colors: ["sky", "blue"],
    strengths: ["Uncompromising Integrity", "Rock-Solid Dependability", "Procedural Mastery", "Steadfast Loyalty"],
    weaknesses: ["Resistance to unproven change", "Can appear rigid", "Struggles with expressing raw feelings"],
    romantic: "Offer unwavering loyalty, practical protection, and dependable support to their partners.",
    friendships: "Lifelong friends who will show up in the middle of the night if a practical emergency occurs.",
    workplace: "Excel in law, accounting, logistics, civil engineering, and military administration.",
    compatibility: { best: ["ESFP", "ESTP"], good: ["ISFJ", "ESTJ", "INTJ"] },
    secretDreams: "To establish an orderly, prosperous sanctuary where duty is respected and family is secure.",
    hiddenFears: "Total societal breakdown, chaos, or failing to fulfill their moral commitments.",
    mythologicalArchetype: "The Steadfast Guardian"
  },
  ISFJ: {
    title: "The Protector",
    desc: "Warm, conscientious caregivers who create harmonious environments and quietly support those they love.",
    coreValues: ["Caregiving", "Loyalty", "Quiet Devotion", "Harmony"],
    habits: "You remember the small personal preferences of everyone around you, prepare comforting environments, and protect family routines with meticulous care.",
    careers: ["Nurse Practitioner", "Elementary Educator", "Social Worker", "Human Resources Specialist", "Archivist", "Office Administrator"],
    stressResponse: "Under acute stress, your inferior Extraverted Intuition (Ne) causes overwhelming worry about future catastrophes, health fears, or unmanageable changes.",
    colors: ["sky", "emerald"],
    strengths: ["Deep Compassion", "Exceptional Reliability", "Practical Caregiving", "Quiet Resilience"],
    weaknesses: ["Prone to martyrdom", "Repressing own needs", "Reluctant to embrace radical changes"],
    romantic: "Nurturing, attentive partners who show love through thoughtful everyday acts of service.",
    friendships: "The empathetic heart of the group who ensures everyone feels comfortable and included.",
    workplace: "Excel in healthcare, nursing, primary education, social work, and community coordination.",
    compatibility: { best: ["ESFP", "ESTP"], good: ["ISTJ", "ESFJ", "INFJ"] },
    secretDreams: "To create a peaceful, loving home where everyone is protected from hardship and cruelty.",
    hiddenFears: "Being a burden to others, conflict within their family, or ingratitude from those they love.",
    mythologicalArchetype: "The Nurturing Hearth"
  },
  ESTJ: {
    title: "The Executive",
    desc: "Assertive, organized administrators who build practical structures and hold communities to high standards.",
    coreValues: ["Structure", "Accountability", "Productivity", "Tradition"],
    habits: "You coordinate teams with clear benchmarks, enforce accountability, and ensure daily operations run on schedule and within budget.",
    careers: ["Chief Operating Officer", "Financial Manager", "School Principal", "Project Management Director", "Military Officer", "Judge"],
    stressResponse: "Under acute stress, your inferior Introverted Feeling (Fi) can manifest as emotional hypersensitivity, feelings of martyrdom, or sudden emotional isolation.",
    colors: ["sky", "indigo"],
    strengths: ["Strong Executive Presence", "Systemic Organization", "Direct Honesty", "Unwavering Loyalty"],
    weaknesses: ["Can be inflexible", "Impatience with unconventional methods", "Difficulty relaxing"],
    romantic: "Reliable, protective partners who value clear commitments, shared goals, and mutual respect.",
    friendships: "Organize the reunions, coordinate trips, and stand up fiercely for their friends.",
    workplace: "Thrive as corporate directors, operations managers, judges, and civic leaders.",
    compatibility: { best: ["ISFP", "ISTP"], good: ["ISTJ", "ESFJ", "ENTJ"] },
    secretDreams: "To orchestrate a flawless, highly productive organization that stands as a model of efficiency.",
    hiddenFears: "Incompetence, loss of structure, or having their leadership authority undermined.",
    mythologicalArchetype: "The Grand Magistrate"
  },
  ESFJ: {
    title: "The Provider",
    desc: "Warm, social, and deeply cooperative pillars of the community who thrive on interpersonal connection and service.",
    coreValues: ["Harmony", "Community", "Service", "Kindness"],
    habits: "You check in on friends regularly, host gatherings that bring people together, and maintain group traditions with infectious warmth.",
    careers: ["Hospitality Director", "Corporate Trainer", "Event Coordinator", "Healthcare Administrator", "Public Relations Specialist", "Teacher"],
    stressResponse: "Under acute stress, your inferior Introverted Thinking (Ti) triggers hyper-critical second-guessing, suspicious thoughts about others' motives, and self-doubt.",
    colors: ["sky", "rose"],
    strengths: ["Warm Social Hospitality", "Practical Helpfulness", "High Loyalty", "Strong Sense of Duty"],
    weaknesses: ["Sensitive to criticism", "Worrying excessively about social standing", "Struggles with change"],
    romantic: "Attentive, affectionate partners who express love through dedicated care and shared family values.",
    friendships: "The glue of any social group who keeps in touch with everyone and organizes celebrations.",
    workplace: "Excel in event management, customer success, teaching, human resources, and nursing.",
    compatibility: { best: ["ISFP", "ISTP"], good: ["ISFJ", "ESTJ", "ENFJ"] },
    secretDreams: "To be surrounded by a flourishing, joyful community that lives in complete harmony.",
    hiddenFears: "Social rejection, loneliness, or realizing that their sacrifices were unappreciated.",
    mythologicalArchetype: "The Gracious Host"
  },
  ISTP: {
    title: "The Virtuoso",
    desc: "Pragmatic, adaptable craftsmen who master tools, analyze mechanics, and thrive in dynamic problem-solving.",
    coreValues: ["Autonomy", "Craftsmanship", "Pragmatism", "Curiosity"],
    habits: "You observe your physical environment with razor-sharp reflexes, troubleshoot mechanical and technical systems, and maintain personal freedom.",
    careers: ["Mechanical Engineer", "Commercial Pilot", "Cybersecurity Specialist", "Forensic Investigator", "Emergency Surgeon", "Software Developer"],
    stressResponse: "Under acute stress, your inferior Extraverted Feeling (Fe) can trigger sudden emotional hypersensitivity, awkward social outbursts, or feeling overwhelmed by expectations.",
    colors: ["amber", "sky"],
    strengths: ["Tactical Mastery", "Calm Under Pressure", "High Adaptability", "Direct Pragmatism"],
    weaknesses: ["Can be emotionally distant", "Prone to risk-taking out of boredom", "Dislikes rigid rules"],
    romantic: "Need a partner who values personal freedom, enjoys shared activities, and avoids drama.",
    friendships: "Bond through hands-on projects, outdoor adventures, sports, and low-maintenance loyalty.",
    workplace: "Excel in engineering, mechanics, emergency response, software architecture, and surgery.",
    compatibility: { best: ["ESFJ", "ESTJ"], good: ["ISFP", "ESTP", "INTP"] },
    secretDreams: "To master every physical and conceptual tool in existence and explore the world untethered.",
    hiddenFears: "Losing physical autonomy, being micro-managed, or trapped in emotional codependency.",
    mythologicalArchetype: "The Master Artisan"
  },
  ISFP: {
    title: "The Adventurer",
    desc: "Sensory, artistic free-spirits who live authentically in the moment and express deep values through aesthetics.",
    coreValues: ["Personal Expression", "Aesthetic Beauty", "Empathy", "Freedom"],
    habits: "You immerse yourself in creative projects, express subtle emotions through tangible crafts and aesthetics, and live in tuned harmony with the present.",
    careers: ["Graphic Designer", "Fashion Stylist", "Landscape Architect", "Veterinarian", "Musician / Audio Engineer", "Fine Artist"],
    stressResponse: "Under acute stress, your inferior Extraverted Thinking (Te) causes aggressive bluntness, uncharacteristic micromanagement, or excessive self-criticism.",
    colors: ["amber", "emerald"],
    strengths: ["Artistic Authenticity", "Spontaneous Adaptability", "Deep Compassion", "Sensory Awareness"],
    weaknesses: ["Easily overwhelmed by intense conflict", "Fluctuating self-esteem", "Dislikes long-term planning"],
    romantic: "Gentle, intensely devoted partners who create magical, aesthetically delightful moments.",
    friendships: "Loyal, non-judgmental friends who accept people completely for who they are.",
    workplace: "Thrive in graphic design, fashion, culinary arts, music, photography, and veterinary care.",
    compatibility: { best: ["ESTJ", "ESFJ"], good: ["ISTP", "ESFP", "INFP"] },
    secretDreams: "To create authentic art that captures the delicate beauty of the human soul.",
    hiddenFears: "Loss of individuality, confinement in artificial corporate environments, or betrayal.",
    mythologicalArchetype: "The Bohemian Creator"
  },
  ESTP: {
    title: "The Entrepreneur",
    desc: "Energetic, bold thrill-seekers who thrive on real-time action, tactical charisma, and pragmatic execution.",
    coreValues: ["Action", "Boldness", "Tactical Agility", "Freedom"],
    habits: "You read rooms instantly, negotiate deals on the fly, and tackle dynamic physical and business challenges head-on with fearless charisma.",
    careers: ["Tech Entrepreneur", "Investment Trader", "Emergency Physician", "Real Estate Developer", "Crisis Negotiator", "Athletic Director"],
    stressResponse: "Under acute stress, your inferior Introverted Intuition (Ni) manifests as sudden paranoia, seeing sinister hidden meanings behind events, or dread of future doom.",
    colors: ["amber", "rose"],
    strengths: ["Bold Decisiveness", "High Social Magnetism", "Quick Crisis Resolution", "Tactical Realism"],
    weaknesses: ["Impatience with abstract theory", "Prone to impulsive risks", "Difficulty with emotional processing"],
    romantic: "Exciting, playful partners who bring spontaneous adventures and direct confidence to love.",
    friendships: "The dynamic life of the party who gets everyone out of the house and into real-world action.",
    workplace: "Excel in entrepreneurship, sales negotiation, emergency medicine, athletic leadership, and trading.",
    compatibility: { best: ["ISFJ", "ISTJ"], good: ["ESTJ", "ESFP", "ENTP"] },
    secretDreams: "To conquer dynamic challenges on a grand stage and live life at absolute peak performance.",
    hiddenFears: "Physical incapacitation, boredom, or having their momentum restrained by rules.",
    mythologicalArchetype: "The Dauntless Champion"
  },
  ESFP: {
    title: "The Entertainer",
    desc: "Vibrant, spontaneous performers who celebrate the sensory richness of life and bring joy to everyone.",
    coreValues: ["Joy", "Generosity", "Sensory Vitality", "Spontaneity"],
    habits: "You bring contagious enthusiasm to daily tasks, celebrate life's sensory pleasures, and make sure everyone in your presence feels energized.",
    careers: ["Performing Artist", "Event Producer", "Luxury Hospitality Director", "Fitness Coach", "PR Specialist", "Interior Decorator"],
    stressResponse: "Under acute stress, your inferior Introverted Intuition (Ni) triggers gloomy forebodings of future failure, feelings of isolation, or chronic overthinking.",
    colors: ["amber", "purple"],
    strengths: ["Radiant Charisma", "Generous Warmth", "Sensory Presence", "Natural Optimism"],
    weaknesses: ["Easily distracted", "Prone to avoiding uncomfortable realities", "Struggles with abstract routines"],
    romantic: "Warm, deeply affectionate partners who prioritize romance, fun, and making their partner smile.",
    friendships: "Generous friends who make everyone feel like a VIP and turn gatherings into memorable events.",
    workplace: "Thrive in performing arts, hospitality, event production, luxury sales, and therapy.",
    compatibility: { best: ["ISTJ", "ISFJ"], good: ["ESTP", "ISFP", "ENFP"] },
    secretDreams: "To bring joy and wonder to the entire world and live each day as a grand celebration.",
    hiddenFears: "Being forgotten, isolation, or facing a world devoid of laughter and beauty.",
    mythologicalArchetype: "The Radiant Performer"
  }
};
