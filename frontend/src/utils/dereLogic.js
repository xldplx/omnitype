// dereLogic.js - The -dere Archetype Assessment Logic & Profiles

export const dereTypes = {
  tsundere: {
    id: "tsundere",
    name: "Tsundere",
    japaneseName: "ツンデレ",
    title: "The Guarded Defender",
    tagline: "Sharp on the outside, deeply soft and flustered on the inside.",
    description: "You protect your vulnerability behind a shield of sarcasm, pride, or mock indifference. When someone catches you off guard with genuine kindness or affection, your initial reflex is denial. Beneath your prickly exterior, however, lies an intensely loyal, fiercely caring protector who would go to the ends of the earth for the people who manage to crack your shell.",
    signatureQuote: "\"It's not like I did this because I care about you or anything... don't get the wrong idea!\"",
    strengths: [
      "Fiercely protective of the people you cherish, willing to stand up for them in any situation.",
      "Uncompromising personal integrity—you express care through quiet, reliable actions rather than fake flattery.",
      "Incredibly loyal once someone earns your trust; your bonds are unbreakable."
    ],
    vulnerabilities: [
      "Struggle to express genuine affection directly without feeling awkward or exposed.",
      "Initial defensive reactions can occasionally push away people who don't understand your humor.",
      "Tendency to bottle up feelings until you get completely overwhelmed and flustered."
    ],
    publicVsPrivate: {
      inPublic: "Independent, slightly aloof, sharp-witted, and quick to brush off compliments.",
      inPrivate: "Attentive, quietly affectionate, remembering every small detail about your partner."
    },
    flusteredReaction: "Blushes, crosses arms, looks away, and makes a clumsy excuse about why they were being helpful.",
    compatibility: {
      highSynergy: ["deredere", "dandere", "kuudere"],
      growthChallenge: ["sadodere", "himedere"]
    },
    famousExamples: ["Taiga Aisaka", "Rin Tohsaka", "Kyo Sohma", "Asuka Langley"],
    color: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    textClass: "text-rose-700",
    badgeClass: "bg-rose-100 text-rose-800 border-rose-200"
  },
  kuudere: {
    id: "kuudere",
    name: "Kuudere",
    japaneseName: "クーデレ",
    title: "The Stoic Intellectual",
    tagline: "Cool, calm, and analytical; expressions of love through unwavering reliability.",
    description: "You possess an unflappable exterior that rarely betrays emotion. While others might interpret your quiet demeanor as coldness, you are simply highly emotionally regulated and observant. You express care through steady dependability, subtle acts of service, and sharp, deadpan wit. Once someone enters your inner circle, you reveal a gentle, deeply devoted warmth.",
    signatureQuote: "\"Your presence has been calculated as a statistically significant positive variable in my daily life.\"",
    strengths: [
      "Rock-solid composure during crises and emotional turbulence.",
      "Deeply observant, noticing subtle shifts in people's needs before they speak them.",
      "Zero emotional manipulation or drama—you communicate with honest, refreshing clarity."
    ],
    vulnerabilities: [
      "Can come across as intimidating, distant, or unapproachable to sensitive acquaintances.",
      "May struggle to provide overt emotional praise even when you feel deep admiration.",
      "Prone to over-intellectualizing relationships instead of embracing messy spontaneity."
    ],
    publicVsPrivate: {
      inPublic: "Poised, quiet, analytical, and maintaining clear personal boundaries.",
      inPrivate: "Gentle, comfortable in silent intimacy, sharing subtle smiles and dry inside jokes."
    },
    flusteredReaction: "Pauses for 3 seconds, maintains a straight face, but ears turn subtly red as they rapidly change the topic with logic.",
    compatibility: {
      highSynergy: ["deredere", "tsundere", "dandere"],
      growthChallenge: ["yandere", "himedere"]
    },
    famousExamples: ["Rei Ayanami", "C.C.", "Mikasa Ackerman", "Yuki Nagato"],
    color: "from-sky-500 to-indigo-600",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-200",
    textClass: "text-sky-700",
    badgeClass: "bg-sky-100 text-sky-800 border-sky-200"
  },
  yandere: {
    id: "yandere",
    name: "Yandere",
    japaneseName: "ヤンデレ",
    title: "The Obsessive Devotee",
    tagline: "All-consuming devotion, intense attachment, and fierce emotional fixation.",
    description: "When you love, you love with 1000% of your being. You don't understand lukewarm feelings or casual affection—for you, relationships are all-or-nothing partnerships. You are intensely attentive, anticipating your partner's every need and defending your connection with ferocious loyalty. However, your fear of abandonment can sometimes lead to intense jealousy or possessiveness.",
    signatureQuote: "\"I would tear down the entire world just to make sure you stay safe and happy with me.\"",
    strengths: [
      "Limitless, unconditional devotion to the person you choose.",
      "Incredible intuition regarding your partner's emotional state and physical security.",
      "Willing to make massive sacrifices without a second thought to support your loved one."
    ],
    vulnerabilities: [
      "Prone to hyper-fixating on your partner to the detriment of your own personal hobbies.",
      "Can struggle with intense jealousy, over-analyzing small shifts in attention or distance.",
      "Difficulty accepting boundaries or allowing emotional distance in relationships."
    ],
    publicVsPrivate: {
      inPublic: "Sweet, hyper-supportive, keeping a close eye on anyone interacting with your partner.",
      inPrivate: "Intensely affectionate, craving total closeness, physical presence, and constant reassurance."
    },
    flusteredReaction: "Fixates their gaze intensely, gets emotionally overwhelmed with love, and vows eternal loyalty on the spot.",
    compatibility: {
      highSynergy: ["dandere", "bakadere", "deredere"],
      growthChallenge: ["kuudere", "mayadere"]
    },
    famousExamples: ["Yuno Gasai", "Misa Amane", "Toga Himiko", "Juvia Lockser"],
    color: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
    textClass: "text-purple-700",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-200"
  },
  dandere: {
    id: "dandere",
    name: "Dandere",
    japaneseName: "ダンデレ",
    title: "The Quiet Sanctuary",
    tagline: "Soft-spoken and shy in social crowds, blooming into deep sweetness in one-on-one intimacy.",
    description: "You are an introspective soul who feels easily overwhelmed by loud social environments. You tend to keep to yourself, speaking only when necessary, which often makes you seem mysterious. However, once you feel safe in a one-on-one connection, your quiet shell melts away, revealing an extraordinarily thoughtful, gentle, and affectionate confidant.",
    signatureQuote: "\"I might not say a lot when everyone is watching... but with you, I feel completely at peace.\"",
    strengths: [
      "Remarkable active listener who provides a soothing, judgment-free emotional space.",
      "Deeply thoughtful, expressing love through handwritten notes, meaningful gifts, and subtle warmth.",
      "Immense emotional sensitivity and empathy for the struggles of others."
    ],
    vulnerabilities: [
      "Can struggle with social anxiety, hesitating to make the first move or speak up in groups.",
      "Tendency to hide in the background even when you have brilliant insights to share.",
      "Prone to overthinking everyday interactions and worrying that you said the wrong thing."
    ],
    publicVsPrivate: {
      inPublic: "Quiet, modest, avoiding the spotlight, speaking softly with select friends.",
      inPrivate: "Talkative, deeply sweet, sharing vulnerable dreams, and radiating comforting warmth."
    },
    flusteredReaction: "Covers mouth with both hands, stammers softly, and hides behind a book or sweater.",
    compatibility: {
      highSynergy: ["tsundere", "deredere", "kuudere"],
      growthChallenge: ["sadodere", "himedere"]
    },
    famousExamples: ["Hinata Hyuga", "Nagisa Furukawa", "Komi Shouko", "Sawako Kuronuma"],
    color: "from-teal-400 to-emerald-600",
    bgLight: "bg-teal-50",
    borderLight: "border-teal-200",
    textClass: "text-teal-700",
    badgeClass: "bg-teal-100 text-teal-800 border-teal-200"
  },
  deredere: {
    id: "deredere",
    name: "Deredere",
    japaneseName: "デレデレ",
    title: "The Pure Heart",
    tagline: "Boundlessly energetic, unapologetically affectionate, and radiant with positive warmth.",
    description: "You are a radiant sunbeam in human form. You don't believe in mind games, playing hard to get, or suppressing your feelings. When you like someone, you show it openly with boundless joy, enthusiasm, and bright optimism. Your warmth is infectious, and you naturally lift the spirits of everyone around you, bringing a joyful lightness to romance and friendships.",
    signatureQuote: "\"Seeing you smile is literally the best part of my entire day! Let's do something fun!\"",
    strengths: [
      "Unmatched emotional transparency—people always know where they stand with you.",
      "Naturally lifts team morale and turns ordinary moments into celebratory memories.",
      "Resilient optimism that helps loved ones see the silver lining during dark times."
    ],
    vulnerabilities: [
      "Can occasionally be taken advantage of by cynical or selfish individuals.",
      "May struggle to process negative or somber moods in others without trying to immediately 'fix' them.",
      "Prone to burning out your social battery by constantly trying to keep everyone entertained."
    ],
    publicVsPrivate: {
      inPublic: "Bubbly, energetic, welcoming newcomers, and sharing spontaneous laughter.",
      inPrivate: "Equally affectionate, cuddly, emotionally transparent, and deeply supportive."
    },
    flusteredReaction: "Beams with an even wider grin, giggles enthusiastically, and gives a big spontaneous hug.",
    compatibility: {
      highSynergy: ["tsundere", "kuudere", "dandere"],
      growthChallenge: ["mayadere", "sadodere"]
    },
    famousExamples: ["Tohru Honda", "Orihime Inoue", "Mina Ashido", "Usagi Tsukino"],
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    textClass: "text-amber-800",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-200"
  },
  himedere: {
    id: "himedere",
    name: "Himedere / Oujidere",
    japaneseName: "姫デレ / 王子デレ",
    title: "The Regal Sovereign",
    tagline: "Aristocratic pride, high standards, and royal generosity toward true equals.",
    description: "You hold yourself to high standards and expect the same from the people in your life. You have a natural regal presence, commanding respect and effort rather than accepting settling for mediocrity. While some may initially see you as high-maintenance, you reward genuine devotion, competence, and loyalty with extraordinary generosity, standing proudly beside your partner as an equal power couple.",
    signatureQuote: "\"If you want a place by my side, you had better prove you have the ambition to keep up.\"",
    strengths: [
      "Unshakable self-confidence, setting healthy boundaries and inspiring excellence.",
      "Incredible taste, generosity, and ability to elevate the lifestyle and aspirations of those around you.",
      "Fiercely protective of their partner's dignity and reputation in public."
    ],
    vulnerabilities: [
      "High expectations can make partners feel pressured or afraid of falling short.",
      "Struggle to admit fault or apologize first when pride gets in the way.",
      "Difficulty accepting help when you are feeling vulnerable or overwhelmed."
    ],
    publicVsPrivate: {
      inPublic: "Dignified, confident, commanding attention, and expecting top-tier respect.",
      inPrivate: "Deeply loyal, sharing exclusive vulnerability, and pampering their partner with luxurious care."
    },
    flusteredReaction: "Tosses their hair, smirks with mock haughtiness, and demands to be treated to a fancy dessert.",
    compatibility: {
      highSynergy: ["bakadere", "deredere", "tsundere"],
      growthChallenge: ["kuudere", "yandere"]
    },
    famousExamples: ["Erina Nakiri", "Noelle Silva", "Lelouch Lamperouge", "Ciel Phantomhive"],
    color: "from-violet-500 to-purple-700",
    bgLight: "bg-violet-50",
    borderLight: "border-violet-200",
    textClass: "text-violet-700",
    badgeClass: "bg-violet-100 text-violet-800 border-violet-200"
  },
  sadodere: {
    id: "sadodere",
    name: "Sadodere",
    japaneseName: "サドデレ",
    title: "The Playful Tormentor",
    tagline: "Loves pushing buttons and playful banter, but fiercely protective of their partner against the world.",
    description: "Your primary love language is playful teasing. You love nothing more than pushing someone's buttons, watching them blush, and getting a reaction out of them with quick-witted mischief. Beneath your mischievous grin, however, you have sharp psychological radar and know exactly where the boundary lies. You only tease those you deeply care about—and heaven help anyone else who tries to mistreat your partner.",
    signatureQuote: "\"You're so cute when you get all worked up over nothing... I just can't resist messing with you.\"",
    strengths: [
      "Brings dynamic excitement, humor, and playful banter to everyday life.",
      "Master of reading body language, understanding what makes people tick.",
      "Fiercely territorial—nobody else is allowed to hurt or disrespect the person they cherish."
    ],
    vulnerabilities: [
      "Can occasionally cross from playful banter into unintentional hurt if partners misread the tone.",
      "Uses humor and teasing as a deflection shield to avoid opening up about their own insecurities.",
      "Struggle to be purely serious and sentimental without making a witty joke."
    ],
    publicVsPrivate: {
      inPublic: "Smirking, teasing, charming, and pulling playful pranks on their favorite person.",
      inPrivate: "Surpassingly tender, holding hands gently, and making sure their partner feels truly cherished."
    },
    flusteredReaction: "Smirks wider to mask their surprise, then playfully doubles down on teasing the other person.",
    compatibility: {
      highSynergy: ["tsundere", "hajidere", "dandere"],
      growthChallenge: ["deredere", "himedere"]
    },
    famousExamples: ["Nagatoro Hayase", "Holo the Wise Wolf", "Senjougahara Hitagi", "Kurumi Tokisaki"],
    color: "from-fuchsia-500 to-rose-600",
    bgLight: "bg-fuchsia-50",
    borderLight: "border-fuchsia-200",
    textClass: "text-fuchsia-700",
    badgeClass: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200"
  },
  bakadere: {
    id: "bakadere",
    name: "Bakadere",
    japaneseName: "バカデレ",
    title: "The Clumsy Sweetheart",
    tagline: "A bit clumsy and innocent, but loves with 100% wholesome sincerity and pure loyalty.",
    description: "You navigate life with an endearing, innocent charm. You might occasionally trip over your own feet, misplace your keys, or take jokes a bit too literally, but your heart is made of pure gold. You have zero malice or manipulation in your body. People are naturally drawn to your genuine authenticity, and your clumsy, sincere efforts to make others happy are impossible not to love.",
    signatureQuote: "\"I might not be the smartest person in the room, but I promise I will always try my best for you!\"",
    strengths: [
      "Completely genuine and incapable of deceitful manipulation or games.",
      "Brings wholesome warmth, laughter, and lighthearted comfort to everyone.",
      "Endlessly forgiving and patient with the flaws of loved ones."
    ],
    vulnerabilities: [
      "Prone to being overly trusting of strangers who may not have good intentions.",
      "Can struggle with complex logistical planning or nuanced emotional subtext.",
      "Sometimes underestimates their own capabilities and intellectual worth."
    ],
    publicVsPrivate: {
      inPublic: "Cheerful, clumsy, sincere, often dropping things or making cute innocent mistakes.",
      inPrivate: "Warm, devoted, giving honest affection and cheering up their partner with pure joy."
    },
    flusteredReaction: "Trips slightly, laughs nervously, scratches the back of their head, and blushes warmly.",
    compatibility: {
      highSynergy: ["kuudere", "himedere", "yandere"],
      growthChallenge: ["mayadere", "sadodere"]
    },
    famousExamples: ["Yui Hirasawa", "Aho Girl (Yoshiko)", "Asta", "Monkey D. Luffy"],
    color: "from-yellow-400 to-amber-500",
    bgLight: "bg-yellow-50",
    borderLight: "border-yellow-200",
    textClass: "text-yellow-800",
    badgeClass: "bg-yellow-100 text-yellow-900 border-yellow-200"
  },
  hajidere: {
    id: "hajidere",
    name: "Hajidere",
    japaneseName: "恥デレ",
    title: "The Bashful Romantic",
    tagline: "Overwhelmed with romantic butterflies, blushing at the slightest hint of intimacy.",
    description: "You feel romantic emotions intensely, so much so that even simple affectionate gestures can send your heart racing. You get butterflies easily—whether it's direct eye contact, a surprise compliment, or holding hands. Your shyness is deeply endearing, and while you might get tongue-tied in romantic moments, your reactions show just how deeply and purely you value the connection.",
    signatureQuote: "\"W-wait... you really meant that compliment? My heart is beating so fast right now...\"",
    strengths: [
      "Deeply romantic and sensitive, treating intimate moments with reverence and care.",
      "Pure, unfiltered emotional reactions that make partners feel uniquely special and desired.",
      "Attentive to small romantic traditions, anniversaries, and meaningful gestures."
    ],
    vulnerabilities: [
      "Can get so flustered that you freeze up or accidentally avoid romantic opportunities.",
      "May struggle to take the initiative or confess feelings without immense encouragement.",
      "Prone to feeling self-conscious about how easily you blush or get nervous."
    ],
    publicVsPrivate: {
      inPublic: "Gentle, shy, blushing when teased, maintaining polite distance.",
      inPrivate: "Sweetly affectionate, holding hands tightly, and melting into quiet romantic moments."
    },
    flusteredReaction: "Face turns completely bright red, stammers uncontrollably, and buries face in their hands.",
    compatibility: {
      highSynergy: ["sadodere", "deredere", "tsundere"],
      growthChallenge: ["kuudere", "mayadere"]
    },
    famousExamples: ["Kosaki Onodera", "Megumi Tadokoro", "Miku Nakano", "Mei Tachibana"],
    color: "from-pink-400 to-rose-500",
    bgLight: "bg-pink-50",
    borderLight: "border-pink-200",
    textClass: "text-pink-700",
    badgeClass: "bg-pink-100 text-pink-800 border-pink-200"
  },
  mayadere: {
    id: "mayadere",
    name: "Mayadere",
    japaneseName: "マヤデレ",
    title: "The Reformed Rival",
    tagline: "Starts as a formidable rival or critic, softening into an unstoppable, loyal ally.",
    description: "You respect strength, wit, and conviction. In the beginning, you often clash with others, viewing them through the lens of healthy competition or skepticism. However, when someone earns your respect and proves their character, you undergo a powerful transformation. You switch from a formidable rival to their most loyal, unstoppable protector—though you always maintain your sharp, dangerous edge.",
    signatureQuote: "\"I used to want to defeat you... now I'll destroy anyone who dares stand in your way.\"",
    strengths: [
      "Incredible strategic intellect, grit, and fearlessness in high-stakes situations.",
      "A fierce protector who transforms competitive fire into unwavering team loyalty.",
      "Challenges their partner to continuously level up, never settling for comfort."
    ],
    vulnerabilities: [
      "Can maintain a competitive guard for too long before allowing emotional softness.",
      "Prone to pride battles during minor relationship disagreements.",
      "May hesitate to show vulnerability out of fear of losing the upper hand."
    ],
    publicVsPrivate: {
      inPublic: "Sharp, competitive, commanding, standing shoulder-to-shoulder with their partner.",
      inPrivate: "Surpassingly protective, loyal, and letting down their combat guard exclusively for one person."
    },
    flusteredReaction: "Pauses, crosses arms, smirks with quiet intensity, and promises a duel or rematch.",
    compatibility: {
      highSynergy: ["kuudere", "tsundere", "deredere"],
      growthChallenge: ["yandere", "hajidere"]
    },
    famousExamples: ["Esdeath", "Vegeta", "Ryuko Matoi", "Akame"],
    color: "from-slate-700 to-indigo-900",
    bgLight: "bg-slate-50",
    borderLight: "border-slate-300",
    textClass: "text-slate-900",
    badgeClass: "bg-slate-200 text-slate-900 border-slate-300"
  }
};

export const dereQuestions = [
  { id: 1, text: "When someone I have a crush on gives me an unexpected compliment, my first instinct is to deny it or make a sarcastic remark to hide my embarrassment.", type: "tsundere" },
  { id: 2, text: "I prefer showing affection through quiet reliability, practical problem-solving, and calm presence rather than loud emotional declarations.", type: "kuudere" },
  { id: 3, text: "When I fall in love, I become intensely devoted and can get noticeably jealous if I sense anyone else trying to get too close to my partner.", type: "yandere" },
  { id: 4, text: "I am extremely quiet and reserved in large social groups, but I become warm, talkative, and deeply affectionate in private one-on-one settings.", type: "dandere" },
  { id: 5, text: "I am naturally enthusiastic and openly expressive about my feelings—I don't believe in playing hard to get or hiding how much I care.", type: "deredere" },
  { id: 6, text: "I hold high standards for relationships and expect my partner to put in genuine effort, but I reward true loyalty with royal generosity.", type: "himedere" },
  { id: 7, text: "My favorite way of showing affection is playful teasing, pushing buttons, and making my partner blush or get flustered.", type: "sadodere" },
  { id: 8, text: "I can be a bit clumsy or airheaded in everyday life, but my intentions and love are always 100% wholesome and sincere.", type: "bakadere" },
  { id: 9, text: "Even small romantic gestures like holding hands, prolonged eye contact, or sweet compliments make my heart race and my face turn bright red.", type: "hajidere" },
  { id: 10, text: "I often start out feeling competitive or skeptical toward people, but once they earn my deep respect, I become their fiercest ally.", type: "mayadere" },
  { id: 11, text: "If I secretly do a huge favor for someone I care about, I'll pretend it was just a coincidence or no big deal so they don't think I'm being soft.", type: "tsundere" },
  { id: 12, text: "During high-stress emotional moments, I stay completely composed on the surface and analyze the situation logically before reacting.", type: "kuudere" },
  { id: 13, text: "I want to know everything about my partner's daily routine, and I would do literally anything to ensure they are safe and exclusively mine.", type: "yandere" },
  { id: 14, text: "I find it difficult to speak up in crowds or make the first move, but I express profound love through thoughtful notes and quiet gestures.", type: "dandere" },
  { id: 15, text: "I smile easily, greet people with high energy, and love making my partner laugh without caring about looking silly.", type: "deredere" },
  { id: 16, text: "I have strong self-worth and dignity; I want a partner who treats our relationship like a prestigious power couple.", type: "himedere" },
  { id: 17, text: "I love having witty banter and mock arguments with the person I like—it's much more exciting than boring polite small talk.", type: "sadodere" },
  { id: 18, text: "I don't hold grudges or play complicated psychological games; I just want everyone to be happy and get along.", type: "bakadere" },
  { id: 19, text: "I get overwhelmed with romantic butterflies easily and often feel tongue-tied when having intimate, deep conversations.", type: "hajidere" },
  { id: 20, text: "I enjoy challenging my partner intellectually or competitively because pushing each other to grow is the ultimate form of respect.", type: "mayadere" }
];

export function calculateDereResult(answersArray) {
  const scores = {
    tsundere: 0,
    kuudere: 0,
    yandere: 0,
    dandere: 0,
    deredere: 0,
    himedere: 0,
    sadodere: 0,
    bakadere: 0,
    hajidere: 0,
    mayadere: 0
  };

  answersArray.forEach((ans) => {
    const question = dereQuestions.find(q => q.id === ans.id);
    const type = question?.type || ans.type;
    if (type && scores[type] !== undefined) {
      // Scale is 1-5, normalize weight (1 => 1, 5 => 5)
      scores[type] += Number(ans.value || 3);
    }
  });

  // Calculate percentages (each type has 2 questions, max raw score is 10, min 2)
  const percentages = {};
  let totalScore = 0;
  Object.keys(scores).forEach(key => {
    totalScore += scores[key];
    // Base percentage based on individual score max 10
    const pct = Math.round(((scores[key] - 2) / 8) * 100);
    percentages[key] = Math.max(10, Math.min(98, isNaN(pct) ? 50 : pct));
  });

  // Sort archetypes by score
  const sortedTypes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => dereTypes[key]);

  const primaryType = sortedTypes[0] || dereTypes.tsundere;
  const secondaryType = sortedTypes[1] || dereTypes.kuudere;

  // Construct Hybrid Tagline
  const hybridTitle = `${primaryType.name} with ${secondaryType.name} undertones`;

  const breakdown = Object.entries(percentages).map(([key, val]) => ({
    id: key,
    name: dereTypes[key]?.name || key,
    title: dereTypes[key]?.title || '',
    percentage: val,
    color: dereTypes[key]?.color || 'from-indigo-500 to-purple-600',
    textClass: dereTypes[key]?.textClass || 'text-indigo-600'
  })).sort((a, b) => b.percentage - a.percentage);

  return {
    primaryType,
    secondaryType,
    hybridTitle,
    scores,
    percentages,
    breakdown
  };
}
