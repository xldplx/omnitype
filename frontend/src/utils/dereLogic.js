// dereLogic.js - The -dere Archetype Assessment Logic & Profiles

export const dereTypes = {
  tsundere: {
    id: "tsundere",
    name: "Tsundere",
    japaneseName: "ツンデレ",
    title: "The Guarded Defender",
    tagline: "Sharp on the outside, deeply soft and loyal on the inside.",
    description: "You protect your vulnerability behind a shield of sarcasm, pride, or mock indifference. When someone catches you off guard with genuine kindness, your initial reflex is denial. Beneath your prickly exterior lies an intensely loyal, fiercely caring protector who expresses love through reliable actions rather than flattery.",
    signatureQuote: "\"It's not like I did this because I care about you or anything... don't get the wrong idea!\"",
    loveLanguage: "Acts of Service & Quality Time",
    defenseMechanism: "Mock Indifference & Sarcastic Deflection",
    relationalDriver: "Authenticity & Earned Trust",
    strengths: [
      "Fiercely protective of the people you cherish; always ready to defend them.",
      "Uncompromising integrity—you express care through concrete support rather than empty praise.",
      "Incredibly loyal once someone earns your trust; your bonds are unbreakable."
    ],
    vulnerabilities: [
      "Struggle to express affection directly without feeling awkward or exposed.",
      "Initial defensive reactions can occasionally push away people who take your words literally.",
      "Tendency to bottle up emotions until feeling overwhelmed or flustered."
    ],
    partnerGuide: {
      do: "Be patient, recognize care in their quiet actions, and respond to their banter with gentle warmth.",
      dont: "Don't force them to confess feelings publicly or tease them aggressively when they are flustered."
    },
    publicVsPrivate: {
      inPublic: "Independent, slightly aloof, sharp-witted, and quick to brush off compliments.",
      inPrivate: "Attentive, quietly affectionate, remembering every small detail about your partner."
    },
    flusteredReaction: "Blushes, crosses arms, looks away, and makes a clumsy excuse about why they were being helpful.",
    compatibility: {
      highSynergy: ["deredere", "dandere", "kuudere"],
      growthChallenge: ["sadodere", "himedere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "deredere", name: "Deredere", reason: "Deredere's cheerful warmth naturally melts Tsundere's defensive walls without taking teasing personally." },
        { id: "dandere", name: "Dandere", reason: "Tsundere provides active protection and vocal confidence while Dandere offers a gentle, safe haven." },
        { id: "kuudere", name: "Kuudere", reason: "Both value quiet reliability and actions over drama, creating a low-stress, mutual understanding." }
      ],
      growthChallenge: [
        { id: "sadodere", name: "Sadodere", reason: "Constant teasing battles can escalate into genuine pride clashes if boundaries aren't established." },
        { id: "himedere", name: "Himedere", reason: "Two prideful personalities may engage in stubborn standoffs over who compromises first." }
      ]
    },
    famousExamples: ["Taiga Aisaka (Toradora)", "Rin Tohsaka (Fate/stay night)", "Kyo Sohma (Fruits Basket)", "Asuka Langley (Evangelion)"],
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
    description: "You possess an unflappable exterior that rarely betrays emotion. While others might interpret your quiet demeanor as coldness, you are simply highly emotionally regulated and observant. You express care through steady dependability, subtle acts of service, and sharp, deadpan wit.",
    signatureQuote: "\"Your presence has been calculated as a statistically significant positive variable in my daily life.\"",
    loveLanguage: "Quiet Presence & Practical Support",
    defenseMechanism: "Intellectualization & Emotional Regulation",
    relationalDriver: "Stability & Rational Harmony",
    strengths: [
      "Rock-solid composure during crises and emotional turbulence.",
      "Deeply observant, noticing subtle shifts in people's needs before they speak them.",
      "Zero emotional manipulation or drama—you communicate with honest, refreshing clarity."
    ],
    vulnerabilities: [
      "Can come across as intimidating, distant, or unapproachable to sensitive acquaintances.",
      "May struggle to provide overt emotional praise even when feeling deep admiration.",
      "Prone to over-intellectualizing relationships instead of embracing messy spontaneity."
    ],
    partnerGuide: {
      do: "Appreciate comfortable silence, communicate logically, and value their subtle signs of affection.",
      dont: "Don't demand instant dramatic emotional displays or accuse them of being robotic."
    },
    publicVsPrivate: {
      inPublic: "Poised, quiet, analytical, and maintaining clear personal boundaries.",
      inPrivate: "Gentle, comfortable in silent intimacy, sharing subtle smiles and dry inside jokes."
    },
    flusteredReaction: "Pauses for a few seconds, maintains a straight face, but ears turn subtly red as they rapidly change the topic with logic.",
    compatibility: {
      highSynergy: ["deredere", "tsundere", "dandere"],
      growthChallenge: ["yandere", "himedere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "deredere", name: "Deredere", reason: "Deredere brings energetic color to Kuudere's calm world, while Kuudere provides grounding stability." },
        { id: "tsundere", name: "Tsundere", reason: "Kuudere sees straight through Tsundere's bluffs without reacting, calming tension effortlessly." },
        { id: "dandere", name: "Dandere", reason: "Both enjoy peaceful, quiet companionship without social pressure or performative energy." }
      ],
      growthChallenge: [
        { id: "yandere", name: "Yandere", reason: "Kuudere's need for personal space can trigger Yandere's fear of emotional abandonment." },
        { id: "himedere", name: "Himedere", reason: "Kuudere's refusal to flatter or play into royal demands can frustrate Himedere's expectations." }
      ]
    },
    famousExamples: ["Rei Ayanami (Evangelion)", "C.C. (Code Geass)", "Mikasa Ackerman (Attack on Titan)", "Yuki Nagato (Haruhi Suzumiya)"],
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
    description: "When you love, you love with every fiber of your being. You don't understand lukewarm feelings or casual affection—for you, relationships are all-or-nothing partnerships. You are intensely attentive, anticipating your partner's every need and defending your connection with ferocious loyalty.",
    signatureQuote: "\"I would tear down the entire world just to make sure you stay safe and happy with me.\"",
    loveLanguage: "Total Devotion & Constant Closeness",
    defenseMechanism: "Possessive Fixation & Hypervigilance",
    relationalDriver: "Absolute Loyalty & Unconditional Security",
    strengths: [
      "Limitless, unconditional devotion to the person you choose.",
      "Incredible intuition regarding your partner's emotional state and physical security.",
      "Willing to make massive sacrifices without a second thought to support your loved one."
    ],
    vulnerabilities: [
      "Prone to hyper-fixating on your partner to the detriment of your own personal space.",
      "Can struggle with jealousy, over-analyzing small shifts in attention or distance.",
      "Difficulty accepting boundaries or emotional separation in relationships."
    ],
    partnerGuide: {
      do: "Provide steady reassurance, maintain transparent communication, and prioritize clear boundaries.",
      dont: "Don't act secretive, dismiss their loyalty, or play jealousy-inducing mind games."
    },
    publicVsPrivate: {
      inPublic: "Sweet, hyper-supportive, keeping a close eye on anyone interacting with your partner.",
      inPrivate: "Intensely affectionate, craving total closeness, physical presence, and constant reassurance."
    },
    flusteredReaction: "Fixates gaze intensely, gets emotionally overwhelmed with love, and vows complete loyalty on the spot.",
    compatibility: {
      highSynergy: ["dandere", "bakadere", "deredere"],
      growthChallenge: ["kuudere", "mayadere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "dandere", name: "Dandere", reason: "Dandere appreciates the deep security and exclusive focus that Yandere provides." },
        { id: "bakadere", name: "Bakadere", reason: "Bakadere's innocent honesty leaves no room for suspicion, putting Yandere at ease." },
        { id: "deredere", name: "Deredere", reason: "Deredere's open affection satisfies Yandere's need for unambiguous romantic validation." }
      ],
      growthChallenge: [
        { id: "kuudere", name: "Kuudere", reason: "Kuudere's emotional detachment and need for solitude can trigger intense attachment anxiety." },
        { id: "mayadere", name: "Mayadere", reason: "Mayadere's fierce independence can create explosive control struggles." }
      ]
    },
    famousExamples: ["Yuno Gasai (Future Diary)", "Misa Amane (Death Note)", "Toga Himiko (My Hero Academia)", "Juvia Lockser (Fairy Tail)"],
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
    description: "You are an introspective soul who feels easily overwhelmed by loud social environments. You tend to keep to yourself, which makes you seem quiet or mysterious. However, once you feel safe in a one-on-one connection, your shell melts away, revealing an extraordinarily thoughtful, gentle, and affectionate confidant.",
    signatureQuote: "\"I might not say a lot when everyone is watching... but with you, I feel completely at peace.\"",
    loveLanguage: "Thoughtful Gestures & Peaceful Quality Time",
    defenseMechanism: "Social Withdrawal & Quiet Observance",
    relationalDriver: "Emotional Safety & Gentle Acceptance",
    strengths: [
      "Remarkable active listener who provides a soothing, judgment-free emotional space.",
      "Deeply thoughtful, expressing love through handwritten notes, meaningful gifts, and subtle warmth.",
      "Immense emotional sensitivity and empathy for the struggles of others."
    ],
    vulnerabilities: [
      "Can struggle with social anxiety, hesitating to make the first move or speak up in groups.",
      "Tendency to hide in the background even when having brilliant insights to share.",
      "Prone to overthinking everyday interactions and worrying about having said the wrong thing."
    ],
    partnerGuide: {
      do: "Create calm one-on-one environments, validate their feelings, and give them room to speak at their own pace.",
      dont: "Don't put them on the spot in public or mistake their quietness for disinterest."
    },
    publicVsPrivate: {
      inPublic: "Quiet, modest, avoiding the spotlight, speaking softly with select friends.",
      inPrivate: "Talkative, deeply sweet, sharing vulnerable dreams, and radiating comforting warmth."
    },
    flusteredReaction: "Covers mouth with both hands, stammers softly, and hides behind a book or sweater.",
    compatibility: {
      highSynergy: ["tsundere", "deredere", "kuudere"],
      growthChallenge: ["sadodere", "himedere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "tsundere", name: "Tsundere", reason: "Tsundere takes charge and stands up for Dandere, while Dandere provides a gentle, calming presence." },
        { id: "deredere", name: "Deredere", reason: "Deredere's easygoing warmth gently coaxes Dandere out of their protective shell." },
        { id: "kuudere", name: "Kuudere", reason: "Both cherish low-stimulation intimacy and share a profound mutual respect for boundaries." }
      ],
      growthChallenge: [
        { id: "sadodere", name: "Sadodere", reason: "Persistent teasing can make Dandere feel overwhelmed and retreat into self-isolation." },
        { id: "himedere", name: "Himedere", reason: "Himedere's loud demands can intimidate Dandere and prevent open communication." }
      ]
    },
    famousExamples: ["Hinata Hyuga (Naruto)", "Nagisa Furukawa (Clannad)", "Komi Shouko (Komi Can't Communicate)", "Sawako Kuronuma (Kimi ni Todoke)"],
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
    description: "You are a radiant sunbeam in human form. You don't believe in mind games, playing hard to get, or suppressing your feelings. When you care about someone, you show it openly with boundless joy, enthusiasm, and bright optimism. Your warmth naturally lifts the spirits of everyone around you.",
    signatureQuote: "\"Seeing you smile is literally the best part of my entire day! Let's do something fun!\"",
    loveLanguage: "Words of Affirmation & Physical Affection",
    defenseMechanism: "Optimistic Cheer & Spontaneous Generosity",
    relationalDriver: "Shared Joy & Emotional Connection",
    strengths: [
      "Unmatched emotional transparency—people always know where they stand with you.",
      "Naturally lifts team morale and turns ordinary moments into celebratory memories.",
      "Resilient optimism that helps loved ones see the silver lining during dark times."
    ],
    vulnerabilities: [
      "Can occasionally be taken advantage of by cynical or self-centered individuals.",
      "May struggle to process somber moods in others without trying to immediately 'fix' them.",
      "Prone to burning out social energy by constantly trying to keep everyone entertained."
    ],
    partnerGuide: {
      do: "Reciprocate their enthusiasm, participate in their joyful ideas, and check in on their emotional battery.",
      dont: "Don't dismiss their optimism as naive or take their constant kindness for granted."
    },
    publicVsPrivate: {
      inPublic: "Bubbly, energetic, welcoming newcomers, and sharing spontaneous laughter.",
      inPrivate: "Equally affectionate, cuddly, emotionally transparent, and deeply supportive."
    },
    flusteredReaction: "Beams with a wide grin, giggles enthusiastically, and gives a big spontaneous hug.",
    compatibility: {
      highSynergy: ["tsundere", "kuudere", "dandere"],
      growthChallenge: ["mayadere", "sadodere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "tsundere", name: "Tsundere", reason: "Deredere's genuine warmth effortlessly disarms Tsundere's defensive barriers." },
        { id: "kuudere", name: "Kuudere", reason: "Deredere brings lively joy to Kuudere's quiet life without disturbing their peace." },
        { id: "dandere", name: "Dandere", reason: "Deredere provides unconditional acceptance, helping Dandere feel welcomed and loved." }
      ],
      growthChallenge: [
        { id: "mayadere", name: "Mayadere", reason: "Mayadere's initial skepticism may feel needlessly harsh or cynical to Deredere's trusting nature." },
        { id: "sadodere", name: "Sadodere", reason: "Excessive teasing can slowly deplete Deredere's joyful battery if sincerity isn't shown." }
      ]
    },
    famousExamples: ["Tohru Honda (Fruits Basket)", "Orihime Inoue (Bleach)", "Mina Ashido (My Hero Academia)", "Usagi Tsukino (Sailor Moon)"],
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
    description: "You hold yourself to high standards and expect the same from the people in your life. You have a natural regal presence, commanding respect and effort rather than settling for mediocrity. You reward genuine devotion and competence with extraordinary generosity, standing proudly beside your partner as an equal power couple.",
    signatureQuote: "\"If you want a place by my side, you had better prove you have the ambition to keep up.\"",
    loveLanguage: "Lavish Care & Public Respect",
    defenseMechanism: "Status Assertion & High Standard Setting",
    relationalDriver: "Mutual Elevation & Respect",
    strengths: [
      "Unshakable self-confidence, setting healthy boundaries and inspiring excellence.",
      "Incredible taste, generosity, and ability to elevate the aspirations of those around you.",
      "Fiercely protective of their partner's dignity and reputation in public."
    ],
    vulnerabilities: [
      "High expectations can make partners feel pressured or afraid of falling short.",
      "Struggle to admit fault or apologize first when pride gets in the way.",
      "Difficulty accepting help when feeling vulnerable or overwhelmed."
    ],
    partnerGuide: {
      do: "Demonstrate competence, treat them as an equal partner, and acknowledge their high taste and efforts.",
      dont: "Don't embarrass them in public or dismiss their personal standards as superficial."
    },
    publicVsPrivate: {
      inPublic: "Dignified, confident, commanding attention, and expecting top-tier respect.",
      inPrivate: "Deeply loyal, sharing exclusive vulnerability, and pampering their partner with luxurious care."
    },
    flusteredReaction: "Tosses hair, smirks with mock haughtiness, and demands to be treated to a favorite dessert.",
    compatibility: {
      highSynergy: ["bakadere", "deredere", "tsundere"],
      growthChallenge: ["kuudere", "yandere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "bakadere", name: "Bakadere", reason: "Bakadere willingly pampers Himedere with wholesome adoration without power struggles." },
        { id: "deredere", name: "Deredere", reason: "Deredere's cheerful loyalty validates Himedere's desire to be appreciated." },
        { id: "tsundere", name: "Tsundere", reason: "Both understand pride and high standards, forming a formidable power couple." }
      ],
      growthChallenge: [
        { id: "kuudere", name: "Kuudere", reason: "Kuudere's refusal to engage in dramatic praise can frustrate Himedere's desire for grandeur." },
        { id: "yandere", name: "Yandere", reason: "Clashing desires for control and boundary enforcement can create severe tension." }
      ]
    },
    famousExamples: ["Erina Nakiri (Food Wars)", "Noelle Silva (Black Clover)", "Lelouch Lamperouge (Code Geass)", "Ciel Phantomhive (Black Butler)"],
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
    tagline: "Loves pushing buttons and playful banter, but fiercely protective against the world.",
    description: "Your primary love language is playful teasing. You love pushing buttons, watching people blush, and getting a reaction out of them with quick-witted mischief. Beneath your mischievous grin, however, you have sharp psychological intuition and only tease those you deeply care about—and heaven help anyone else who tries to mistreat your partner.",
    signatureQuote: "\"You're so cute when you get all worked up over nothing... I just can't resist messing with you.\"",
    loveLanguage: "Playful Banter & Fierce Territorial Protection",
    defenseMechanism: "Mischievous Deflection & Humor Shields",
    relationalDriver: "Emotional Dynamic & Intellectual Spark",
    strengths: [
      "Brings dynamic excitement, humor, and lively banter to everyday life.",
      "Master of reading body language, understanding what makes people tick.",
      "Fiercely territorial—nobody else is allowed to hurt or disrespect the person they cherish."
    ],
    vulnerabilities: [
      "Can occasionally cross from playful banter into unintentional hurt if partners misread tone.",
      "Uses humor and teasing as a deflection shield to avoid opening up about insecurities.",
      "Struggle to be purely serious and sentimental without making a witty joke."
    ],
    partnerGuide: {
      do: "Banter back playfully, show confidence, and occasionally call them out gently on their soft side.",
      dont: "Don't take lighthearted teasing as malice, but do set clear boundaries if a topic is off-limits."
    },
    publicVsPrivate: {
      inPublic: "Smirking, teasing, charming, and pulling playful pranks on their favorite person.",
      inPrivate: "Surpassingly tender, holding hands gently, and making sure their partner feels truly cherished."
    },
    flusteredReaction: "Smirks wider to mask surprise, then playfully doubles down on teasing the other person.",
    compatibility: {
      highSynergy: ["tsundere", "hajidere", "dandere"],
      growthChallenge: ["deredere", "himedere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "tsundere", name: "Tsundere", reason: "The rapid-fire banter and competitive chemistry between them is endlessly entertaining." },
        { id: "hajidere", name: "Hajidere", reason: "Hajidere's cute, flustered reactions provide the exact affectionate dynamic Sadodere loves." },
        { id: "dandere", name: "Dandere", reason: "Sadodere acts as an assertive shield in public while showing gentle tenderness in private." }
      ],
      growthChallenge: [
        { id: "deredere", name: "Deredere", reason: "Deredere's pure sweetness can make Sadodere feel guilty or awkward about teasing." },
        { id: "himedere", name: "Himedere", reason: "Himedere's sensitivity about status can turn playful banter into real arguments." }
      ]
    },
    famousExamples: ["Nagatoro Hayase (Don't Toy With Me, Nagatoro)", "Holo the Wise Wolf (Spice and Wolf)", "Senjougahara Hitagi (Bakemonogatari)", "Kurumi Tokisaki (Date A Live)"],
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
    description: "You navigate life with an endearing, innocent charm. You might occasionally trip over your feet, misplace keys, or take jokes a bit literally, but your heart is pure gold. You have zero malice or manipulation in your body. People are naturally drawn to your authenticity and wholesome efforts to make others happy.",
    signatureQuote: "\"I might not be the smartest person in the room, but I promise I will always try my best for you!\"",
    loveLanguage: "Wholehearted Effort & Genuine Comfort",
    defenseMechanism: "Endearing Sincerity & Good Faith",
    relationalDriver: "Pure Connection & Unconditional Acceptance",
    strengths: [
      "Completely genuine and incapable of deceitful manipulation or games.",
      "Brings wholesome warmth, laughter, and lighthearted comfort to everyone.",
      "Endlessly forgiving and patient with the flaws of loved ones."
    ],
    vulnerabilities: [
      "Prone to being overly trusting of people who may not have good intentions.",
      "Can struggle with complex logistical planning or subtle emotional subtext.",
      "Sometimes underestimates own capabilities and intellectual worth."
    ],
    partnerGuide: {
      do: "Appreciate their genuine heart, offer gentle practical guidance, and protect their innocence.",
      dont: "Don't make fun of their mistakes with malice or manipulate their trusting nature."
    },
    publicVsPrivate: {
      inPublic: "Cheerful, clumsy, sincere, often dropping things or making cute innocent mistakes.",
      inPrivate: "Warm, devoted, giving honest affection and cheering up their partner with pure joy."
    },
    flusteredReaction: "Trips slightly, laughs nervously, scratches the back of head, and blushes warmly.",
    compatibility: {
      highSynergy: ["kuudere", "himedere", "yandere"],
      growthChallenge: ["mayadere", "sadodere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "kuudere", name: "Kuudere", reason: "Kuudere provides grounded organization and guidance, while Bakadere brings warmth to their life." },
        { id: "himedere", name: "Himedere", reason: "Bakadere happily supports Himedere's high aspirations without competing for control." },
        { id: "yandere", name: "Yandere", reason: "Bakadere's transparent sincerity eliminates any suspicion or jealousy." }
      ],
      growthChallenge: [
        { id: "mayadere", name: "Mayadere", reason: "Mayadere's strategic intensity can overwhelm Bakadere's simple, peaceful approach." },
        { id: "sadodere", name: "Sadodere", reason: "Sadodere may accidentally take teasing too far if Bakadere takes jokes literally." }
      ]
    },
    famousExamples: ["Yui Hirasawa (K-On!)", "Yoshiko Hanabatake (Aho Girl)", "Asta (Black Clover)", "Monkey D. Luffy (One Piece)"],
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
    description: "You feel romantic emotions intensely, so much so that even simple affectionate gestures can send your heart racing. You get butterflies easily—whether it's direct eye contact, a surprise compliment, or holding hands. Your shyness is deeply endearing, and your reactions show just how deeply you value the connection.",
    signatureQuote: "\"W-wait... you really meant that compliment? My heart is beating so fast right now...\"",
    loveLanguage: "Sweet Reassurance & Delicate Intimacy",
    defenseMechanism: "Bashful Overload & Gentle Freezing",
    relationalDriver: "Emotional Reverence & Romantic Tenderness",
    strengths: [
      "Deeply romantic and sensitive, treating intimate moments with reverence and care.",
      "Pure, unfiltered emotional reactions that make partners feel uniquely special.",
      "Attentive to small romantic traditions, anniversaries, and meaningful gestures."
    ],
    vulnerabilities: [
      "Can get so flustered that you freeze up or accidentally avoid romantic opportunities.",
      "May struggle to take initiative or confess feelings without encouragement.",
      "Prone to feeling self-conscious about how easily you blush or get nervous."
    ],
    partnerGuide: {
      do: "Take things step-by-step, reassure them when they blush, and initiate romantic steps gently.",
      dont: "Don't pressure them for instant bold confessions or laugh at their shyness."
    },
    publicVsPrivate: {
      inPublic: "Gentle, shy, blushing when teased, maintaining polite distance.",
      inPrivate: "Sweetly affectionate, holding hands tightly, and melting into quiet romantic moments."
    },
    flusteredReaction: "Face turns completely bright red, stammers softly, and buries face in hands.",
    compatibility: {
      highSynergy: ["sadodere", "deredere", "tsundere"],
      growthChallenge: ["kuudere", "mayadere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "sadodere", name: "Sadodere", reason: "Sadodere's playful banter brings out Hajidere's most charming, blushing reactions." },
        { id: "deredere", name: "Deredere", reason: "Deredere's welcoming kindness helps Hajidere feel secure and comfortable." },
        { id: "tsundere", name: "Tsundere", reason: "Both understand the vulnerability of blushing, creating sweet mutual empathy." }
      ],
      growthChallenge: [
        { id: "kuudere", name: "Kuudere", reason: "Kuudere's deadpan silence may cause Hajidere to overthink whether they made a mistake." },
        { id: "mayadere", name: "Mayadere", reason: "Mayadere's sharp competitive energy can intimidate Hajidere's gentle romantic pace." }
      ]
    },
    famousExamples: ["Kosaki Onodera (Nisekoi)", "Megumi Tadokoro (Food Wars)", "Miku Nakano (Quintessential Quintuplets)", "Mei Tachibana (Say I Love You)"],
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
    description: "You respect strength, wit, and conviction. In the beginning, you often clash with others, viewing them through the lens of healthy competition or skepticism. However, when someone earns your respect and proves their character, you transform into their most loyal, unstoppable protector—while maintaining your sharp edge.",
    signatureQuote: "\"I used to want to defeat you... now I'll destroy anyone who dares stand in your way.\"",
    loveLanguage: "Comradeship & Mutual Growth",
    defenseMechanism: "Competitive Guard & Strategic Skepticism",
    relationalDriver: "Mutual Respect & Competence",
    strengths: [
      "Incredible strategic intellect, grit, and fearlessness in high-stakes situations.",
      "A fierce protector who transforms competitive fire into unwavering team loyalty.",
      "Challenges their partner to continuously level up, never settling for mediocrity."
    ],
    vulnerabilities: [
      "Can maintain a competitive guard for too long before allowing emotional softness.",
      "Prone to pride battles during minor relationship disagreements.",
      "May hesitate to show vulnerability out of fear of losing the upper hand."
    ],
    partnerGuide: {
      do: "Stand your ground respectfully, demonstrate your skills, and challenge them to friendly matches.",
      dont: "Don't treat them as weak or attempt to control or patronize them."
    },
    publicVsPrivate: {
      inPublic: "Sharp, competitive, commanding, standing shoulder-to-shoulder with their partner.",
      inPrivate: "Surpassingly protective, loyal, and letting down their combat guard exclusively for one person."
    },
    flusteredReaction: "Pauses, crosses arms, smirks with quiet intensity, and promises a rematch or duel.",
    compatibility: {
      highSynergy: ["kuudere", "tsundere", "deredere"],
      growthChallenge: ["yandere", "hajidere"]
    },
    compatibilityDetails: {
      highSynergy: [
        { id: "kuudere", name: "Kuudere", reason: "Both respect intelligence, logic, and quiet strength without emotional drama." },
        { id: "tsundere", name: "Tsundere", reason: "Shared competitive spirit and sharp banter create an electric, loyal dynamic." },
        { id: "deredere", name: "Deredere", reason: "Deredere's disarming warmth helps Mayadere let go of unnecessary rivalries." }
      ],
      growthChallenge: [
        { id: "yandere", name: "Yandere", reason: "Mayadere's fierce independence clashes with Yandere's possessive control." },
        { id: "hajidere", name: "Hajidere", reason: "Mayadere's intense demeanor can easily overwhelm Hajidere's gentle shyness." }
      ]
    },
    famousExamples: ["Esdeath (Akame ga Kill!)", "Vegeta (Dragon Ball Z)", "Ryuko Matoi (Kill la Kill)", "Akame (Akame ga Kill!)"],
    color: "from-slate-700 to-indigo-900",
    bgLight: "bg-slate-50",
    borderLight: "border-slate-300",
    textClass: "text-slate-900",
    badgeClass: "bg-slate-200 text-slate-900 border-slate-300"
  }
};

// 30 Easy, relatable, clear questions (3 per archetype, distributed evenly across 5 pages of 6 questions)
export const dereQuestions = [
  // Phase 1 (Questions 1 - 6)
  { id: 1, text: "When someone I have a crush on compliments me, I get flustered and try to brush it off with an excuse.", type: "tsundere" },
  { id: 2, text: "In stressful or emotional moments, I stay calm and analyze the situation logically before reacting.", type: "kuudere" },
  { id: 3, text: "When I fall in love, I become completely devoted and focus most of my attention and energy on my partner.", type: "yandere" },
  { id: 4, text: "I am quiet and reserved around crowds, but I open up and become warm in one-on-one private conversations.", type: "dandere" },
  { id: 5, text: "I am naturally cheerful and enthusiastic, and I show my affection openly without playing hard to get.", type: "deredere" },
  { id: 6, text: "I hold high standards in relationships and expect my partner to show genuine effort and respect.", type: "himedere" },

  // Phase 2 (Questions 7 - 12)
  { id: 7, text: "My favorite way to show someone I like them is through playful teasing and witty banter.", type: "sadodere" },
  { id: 8, text: "I can be a bit clumsy or forgetful, but my feelings and intentions are always 100% genuine and sincere.", type: "bakadere" },
  { id: 9, text: "Simple romantic gestures like holding hands, eye contact, or sweet compliments easily make me blush.", type: "hajidere" },
  { id: 10, text: "I often start out feeling competitive or guarded around new people until they prove their character.", type: "mayadere" },
  { id: 11, text: "I tend to hide how much I care behind light teasing or mock indifference so I don't look vulnerable.", type: "tsundere" },
  { id: 12, text: "I show affection through quiet dependability and practical problem-solving rather than dramatic words.", type: "kuudere" },

  // Phase 3 (Questions 13 - 18)
  { id: 13, text: "I can get noticeably jealous or protective if I feel like someone else is trying to take my partner's attention.", type: "yandere" },
  { id: 14, text: "I find it hard to speak up or make the first move, even when I really like someone.", type: "dandere" },
  { id: 15, text: "Making the people I love smile and laugh is one of the things that brings me the most joy.", type: "deredere" },
  { id: 16, text: "I take pride in my dignity and ambition, and I want a relationship where we feel like a powerful team.", type: "himedere" },
  { id: 17, text: "I love having witty back-and-forth jokes with someone I like—it is much more exciting than plain small talk.", type: "sadodere" },
  { id: 18, text: "I don't hold grudges or play complicated mind games; I just want everyone to be happy and get along.", type: "bakadere" },

  // Phase 4 (Questions 19 - 24)
  { id: 19, text: "I get butterflies very easily and often feel nervous or tongue-tied during romantic moments.", type: "hajidere" },
  { id: 20, text: "Once someone earns my deep trust and respect, I transform into their fiercest ally and protector.", type: "mayadere" },
  { id: 21, text: "If I do something nice for someone I care about, I'll pretend it was just a coincidence or no big deal.", type: "tsundere" },
  { id: 22, text: "People often think I look serious or hard to read, but I deeply value the people in my inner circle.", type: "kuudere" },
  { id: 23, text: "I would make major personal sacrifices without hesitation to keep the person I love safe and happy.", type: "yandere" },
  { id: 24, text: "I express care through thoughtful quiet gestures, like remembering small details or sending sweet notes.", type: "dandere" },

  // Phase 5 (Questions 25 - 30)
  { id: 25, text: "I wear my heart on my sleeve and communicate my positive feelings directly without hiding them.", type: "deredere" },
  { id: 26, text: "When someone treats me with true loyalty and respect, I reward them with generous devotion and care.", type: "himedere" },
  { id: 27, text: "I might poke fun at the person I care about, but I won't let anyone else ever disrespect or hurt them.", type: "sadodere" },
  { id: 28, text: "Even when I make silly mistakes, I always put my whole heart into cheering up the people I love.", type: "bakadere" },
  { id: 29, text: "I feel romantic feelings deeply, but I get easily embarrassed showing affection when people are watching.", type: "hajidere" },
  { id: 30, text: "I love challenging the person I'm with intellectually or competitively so we can both level up.", type: "mayadere" }
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
      scores[type] += Number(ans.value || 3);
    }
  });

  // Calculate percentages (each type has 3 questions, max score 15, min score 3)
  const percentages = {};
  Object.keys(scores).forEach(key => {
    const pct = Math.round(((scores[key] - 3) / 12) * 100);
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
