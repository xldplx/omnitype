export const attachmentStylesTypes = {
  1: {
    id: "secure",
    name: "Secure Attachment",
    shortName: "Secure",
    description: "You have a balanced and healthy approach to intimacy. You are comfortable being close to others, do not worry excessively about abandonment, and do not panic when your partner needs space. You view yourself and others positively.",
    coreDesire: "Mutual trust, stable connection, and emotional availability.",
    coreFear: "Very little inherent fear of intimacy or abandonment; able to handle relationship stress rationally.",
    strengths: [
      "Highly resilient in the face of conflict, preferring to communicate directly rather than play games.",
      "Able to provide support to partners without becoming completely emotionally engulfed by their problems.",
      "Comfortable with both deep intimacy and healthy independence."
    ],
    weaknesses: [
      "May occasionally struggle to understand why partners with insecure attachment are acting irrationally or pulling away.",
      "Can sometimes stay in a stable but unfulfilling relationship too long because they are good at enduring and repairing.",
      "Might unintentionally overlook the deep underlying anxieties of their anxious or avoidant partners."
    ],
    relationshipDynamics: "In a relationship, you are a grounding force. You offer reassurance naturally but don't require constant validation in return. You are usually not prone to extreme jealousy. You expect relationships to be a source of comfort, not a battlefield.",
    workplaceBehavior: "You are an excellent collaborator. You handle constructive criticism well, don't take professional setbacks as personal attacks, and can build strong and healthy boundaries with your coworkers and managers.",
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-100"
  },
  2: {
    id: "anxious_preoccupied",
    name: "Anxious-Preoccupied",
    shortName: "Anxious",
    description: "You crave deep emotional intimacy and often feel that you want to be closer to your partner than they want to be to you. You are highly vigilant to changes in your partner's mood and often fear that they will eventually lose interest or abandon you.",
    coreDesire: "Absolute reassurance, visible devotion, and constant emotional connection.",
    coreFear: "Abandonment, being unlovable, and gradual emotional distancing.",
    strengths: [
      "Incredibly attuned to the emotional wavelengths of others; highly empathetic and caring.",
      "Willing to put immense effort, time, and energy into making a relationship work.",
      "Deeply loyal, fiercely loving, and capable of profound emotional connection."
    ],
    weaknesses: [
      "Highly prone to overthinking, over-analyzing text messages, and spiraling into anxiety.",
      "Can overwhelm partners by demanding constant reassurance or trying to force closeness when the partner needs space.",
      "May use 'protest behavior' (like making a partner jealous or withdrawing) to get attention."
    ],
    relationshipDynamics: "You have a highly active 'attachment system.' If your partner is slightly distant, you may assume the relationship is ending and panic. When a partner offers consistent, warm reassurance, you blossom. You are drawn to people, but often inadvertently choose avoidant partners, triggering a cycle of anxiety.",
    workplaceBehavior: "You may suffer strongly from imposter syndrome and require frequent validation from managers to feel secure. You are an incredibly dedicated worker but might over-commit to tasks out of a fear of disappointing the team or being deemed expendable.",
    color: "from-sky-400 to-blue-500",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-100"
  },
  3: {
    id: "dismissive_avoidant",
    name: "Dismissive-Avoidant",
    shortName: "Avoidant",
    description: "You equate intimacy with a loss of independence. You prefer not to depend on others and prefer that others don't depend heavily on you. When a partner tries to get very close to you, your immediate subconscious instinct is to pull away and guard your autonomy.",
    coreDesire: "Absolute self-reliance, emotional independence, and uncompromised freedom.",
    coreFear: "Being smothered, controlled, or trapped by someone else's emotional needs.",
    strengths: [
      "Incredibly self-sufficient; capable of handling high levels of stress without needing to lean on others.",
      "Able to maintain strong boundaries and rarely lose their sense of self in a relationship.",
      "Often highly successful in their personal goals because they are not derailed by interpersonal drama."
    ],
    weaknesses: [
      "Habitually suppress or shut down their own emotions, making them seem cold or detached.",
      "Will subconsciously sabotage relationships by finding fatal flaws in their partner when things get 'too close'.",
      "Struggle deeply to provide emotional support or vulnerability when a partner desperately needs it."
    ],
    relationshipDynamics: "You value your partner but keep them at arm's length. The closer the relationship gets, the more 'flaws' you suddenly notice in the other person. You often prefer casual relationships or long-distance setups. When confronted with intense emotion or conflict, your flight response triggers instantly.",
    workplaceBehavior: "You excel as an individual contributor. You dislike micromanagement or highly emotional workplace environments. You are excellent in a crisis because you naturally detach your emotions from the situation, but you may occasionally alienate teammates who desire a warmer connection.",
    color: "from-emerald-400 to-teal-500",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-100"
  },
  4: {
    id: "fearful_avoidant",
    name: "Fearful-Avoidant",
    shortName: "Disorganized",
    description: "You experience a conflicting push-and-pull dynamic regarding intimacy. You desperately desire emotional closeness and love, but the moment you achieve it, you become terrified of getting hurt and push the person away. It is a state of constant internal conflict.",
    coreDesire: "To find safety and deep love, but without the threat of inevitable betrayal.",
    coreFear: "Both abandonment AND engulfment; being hurt by exactly the person who is supposed to love them.",
    strengths: [
      "Extremely perceptive and intuitive, often easily able to read a room or a partner's hidden motives.",
      "Can be highly passionate, deep, and capable of forming intense, transformative bonds.",
      "Deeply understands human suffering and complexity, making them profoundly empathetic when they feel safe."
    ],
    weaknesses: [
      "Relationships can be chaotic and volatile, characterized by intense highs and devastating, sudden lows.",
      "May abruptly end relationships out of fear, only to regret it deeply later.",
      "Often struggles to trust their own instincts, assuming that a safe partner is secretly dangerous, or a dangerous partner is safe."
    ],
    relationshipDynamics: "You want them to 'come here' but also 'go away.' When a partner pulls away, you become intensely anxious and chase them. But when that partner finally offers consistent love, you suddenly feel claustrophobic and detached. This style often stems from confusing or chaotic early life environments.",
    workplaceBehavior: "You may alternate between being highly engaged and deeply withdrawn based on your stress levels. You are likely highly perceptive of office politics and power dynamics, but you may struggle to trust your superiors completely, seeing hidden threats where none exist.",
    color: "from-purple-500 to-fuchsia-600",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-100"
  }
};

// 24 High-Impact Questions (6 per style)
const attachmentQuestions = [
  // Type 1: Secure
  { id: 1, text: "I find it relatively easy to get close to others and feel comfortable depending on them.", type: 1 },
  { id: 2, text: "I rarely worry about my partner unexpectedly leaving me or betraying my trust.", type: 1 },
  { id: 3, text: "If my partner asks for a few days of space to be alone, I don't take it personally or panic.", type: 1 },
  { id: 4, text: "I am comfortable expressing my needs to my partner, assuming they will usually try to meet them.", type: 1 },
  { id: 5, text: "I believe that I am a fundamentally lovable person and that my relationships will generally be successful.", type: 1 },
  { id: 6, text: "When my partner and I argue, I can usually stay grounded without fearing the relationship is completely over.", type: 1 },

  // Type 2: Anxious
  { id: 7, text: "I often worry that my partner doesn't really love me or won't want to stay with me long-term.", type: 2 },
  { id: 8, text: "If my partner takes a surprisingly long time to text back, I start to feel a knot of anxiety or fear.", type: 2 },
  { id: 9, text: "I often feel a desire to essentially 'merge' completely with another person, which can sometimes scare them away.", type: 2 },
  { id: 10, text: "I sometimes act out, withdraw, or test my partner just to see if they will notice and come after me.", type: 2 },
  { id: 11, text: "My romantic relationships often consume a vast majority of my mental and emotional energy.", type: 2 },
  { id: 12, text: "I constantly seek reassurance that I am cared for, valued, and not going to be abandoned.", type: 2 },

  // Type 3: Avoidant
  { id: 13, text: "I get uncomfortable when someone tries to get too emotionally close to me too quickly.", type: 3 },
  { id: 14, text: "I highly prioritize my independence and often feel suffocated if a partner expects me to check in constantly.", type: 3 },
  { id: 15, text: "When a relationship starts getting very serious, I suddenly start noticing small, annoying flaws in my partner.", type: 3 },
  { id: 16, text: "If I am going through a severely tough time, my instinct is to isolate and handle it completely alone.", type: 3 },
  { id: 17, text: "I prefer not to have to rely on anyone emotionally, and I prefer they don't rely heavily on me.", type: 3 },
  { id: 18, text: "Partners have told me in the past that I am emotionally distant, closed off, or hard to read.", type: 3 },

  // Type 4: Fearful-Avoidant (Disorganized)
  { id: 19, text: "I desperately want a deep emotional connection, but when I actually get it, I usually panic and pull away.", type: 4 },
  { id: 20, text: "I often alternate between 'clinging' to a partner when they pull away, and 'pushing' them away when they show love.", type: 4 },
  { id: 21, text: "I often feel that if someone gets too close and sees the 'real' me, they will eventually hurt or reject me.", type: 4 },
  { id: 22, text: "My relationship history is characterized by a lot of intense turbulence, instability, highs, and lows.", type: 4 },
  { id: 23, text: "I sometimes feel deeply suspicious of a partner's motives even when they are being completely loving.", type: 4 },
  { id: 24, text: "I fear being abandoned just as heavily as I fear being smothered—I never feel entirely safe.", type: 4 }
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

export const attachmentTestQuestions = shuffle([...attachmentQuestions]);

export function calculateAttachmentResult(answers) {
    const scores = { 1: 0, 2: 0, 3: 0, 4: 0 };
  
    answers.forEach(answer => {
      scores[answer.type] += answer.value;
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
  
    // Calculate percentage breakdown (6 questions * 7 points max = 42 points)
    const MAX_SCORE_PER_TYPE = 42;
    const breakdown = {};
    for (let i = 1; i <= 4; i++) {
        breakdown[i] = Math.max(0, Math.round((scores[i] / MAX_SCORE_PER_TYPE) * 100));
    }

    const primaryInfo = attachmentStylesTypes[PrimaryType];
  
    return {
      type: PrimaryType,
      fullTitle: primaryInfo.shortName,
      info: primaryInfo,
      breakdown
    };
}
