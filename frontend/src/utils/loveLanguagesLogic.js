// Love Languages Types and their specific mapping logic

export const loveLanguagesTypes = {
  1: {
    id: "words_of_affirmation",
    name: "Words of Affirmation",
    shortName: "Words",
    description: "This language uses words to affirm other people. For you, spoken affection, praise, encouragement, and compliments are paramount. Hearing the words 'I love you' is deeply important.",
    coreDesire: "To feel verbally validated, appreciated, and understood.",
    coreFear: "Harsh words, unconstructive criticism, or prolonged silence.",
    strengths: [
      "Highly articulate about your feelings and naturally encouraging to others.",
      "Notices the hard work of others and makes sure it doesn't go unappreciated.",
      "Leaves beautiful notes, texts, or tells people exactly why they matter."
    ],
    weaknesses: [
      "Can be deeply devastated by casual insults or careless remarks.",
      "May constantly need verbal reassurance when feeling insecure.",
      "Might sometimes doubt actions if they aren't explicitly backed up by words."
    ],
    relationshipDynamics: "In a relationship, you thrive on communication. Unsolicited compliments mean the world to you. Hearing the reasons behind someone's love makes you feel secure. However, insult-driven humor or 'tough love' will likely damage the relationship quickly.",
    workplaceBehavior: "At work, you are motivated by public praise, specific compliments on your projects, and positive feedback. A 'great job' in a meeting energizes you for the rest of the week, whereas feeling unacknowledged drains your motivation.",
    color: "from-sky-400 to-indigo-500",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-100"
  },
  2: {
    id: "acts_of_service",
    name: "Acts of Service",
    shortName: "Service",
    description: "For you, actions speak louder than words. You feel most loved when people do things to ease your burden or help you out. Anything you do to ease the burden of responsibilities weighing on an 'Acts of Service' person will speak volumes.",
    coreDesire: "To have a reliable partner who proactively shares life's heavy lifting.",
    coreFear: "Broken commitments, laziness, and people creating more work for you.",
    strengths: [
      "Incredibly reliable and always willing to step in and handle tasks for others.",
      "Shows deep devotion by anticipating needs and fixing problems before they arise.",
      "Less concerned with flashy romantic gestures, preferring solid dependability."
    ],
    weaknesses: [
      "Can become deeply resentful if you feel you are doing 100% of the household/relationship labor.",
      "May struggle to just 'sit and talk' when there is work that needs to be done.",
      "Can view 'empty promises' (words without action) as a massive betrayal."
    ],
    relationshipDynamics: "Your ideal partner doesn't just say they care; they show it by taking out the trash, cooking dinner when you're exhausted, or running an errand you hate. Laziness, broken commitments, and making more work for you tell you your feelings don't matter.",
    workplaceBehavior: "You are the ultimate team player who actually helps colleagues cross the finish line. You feel most appreciated by your boss when they remove roadblocks for you or take a tedious task off your plate, rather than just offering a shallow 'thank you'.",
    color: "from-emerald-400 to-teal-500",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-100"
  },
  3: {
    id: "receiving_gifts",
    name: "Receiving Gifts",
    shortName: "Gifts",
    description: "Don't mistake this for materialism; the receiver of gifts thrives on the love, thoughtfulness, and effort behind the gift. If you speak this language, the perfect gift or gesture shows that you are known, you are cared for, and you are prized.",
    coreDesire: "To receive tangible, highly thoughtful reminders that someone was thinking of them.",
    coreFear: "Forgotten anniversaries, thoughtless presents, or transactional relationships.",
    strengths: [
      "Incredibly attentive to the specific likes and dislikes of friends and partners.",
      "The absolute best gift-giver, rarely settling for generic options.",
      "Treasures small mementos, keepsakes, and memories associated with physical objects."
    ],
    weaknesses: [
      "Can feel completely unloved if significant occasions (birthdays, anniversaries) are missed or minimized.",
      "May sometimes interpret a lack of physical tokens as a complete lack of affection.",
      "Can be perceived wrongly by others as materialistic, even when the gift is free (like a handpicked flower)."
    ],
    relationshipDynamics: "To you, a gift represents that your partner was thinking of you when you weren't there. You cherish the thought and effort more than the price tag. A surprise coffee, a carefully chosen book, or a handmade trinket makes you feel immensely seen and loved.",
    workplaceBehavior: "You feel highly appreciated when your company rewards hard work with tangible items—a nice lunch, a quality piece of swag, a gift card to your favorite spot, or an end-of-year bonus that reflects personal appreciation.",
    color: "from-purple-400 to-pink-500",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-100"
  },
  4: {
    id: "quality_time",
    name: "Quality Time",
    shortName: "Time",
    description: "This language is all about giving someone your undivided, distraction-free attention. Being there for this type of person is critical. Distractions, postponed dates, or the failure to listen can be especially hurtful.",
    coreDesire: "Undivided, absolutely focused attention and entirely emotionally present connection.",
    coreFear: "Distracted conversations, canceled time together, and feeling like an afterthought.",
    strengths: [
      "An incredibly active, deep listener who makes others feel entirely heard.",
      "Prioritizes relationships above almost all other commitments.",
      "Highly emotionally present; when they are with you, they are 100% with you."
    ],
    weaknesses: [
      "Can become highly jealous or hurt if a partner constantly checks their phone or seems distracted during conversations.",
      "May require immense amounts of one-on-one time, which can drain more independent partners.",
      "Canceled plans or postponed dates are interpreted as a massive rejection."
    ],
    relationshipDynamics: "You don't need fancy dinners; you just want to sit on the couch, face each other, and talk without a TV blazing or phones buzzing. Eye contact, dedicated time blocks, and active listening are your absolute non-negotiables for a healthy relationship.",
    workplaceBehavior: "At work, you value one-on-one meetings with your manager where they are actually focused on you, not checking emails. You thrive in environments where teams actually spend time bonding and talking, rather than just frantically passing tasks back and forth.",
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-100"
  },
  5: {
    id: "physical_touch",
    name: "Physical Touch",
    shortName: "Touch",
    description: "To this person, nothing speaks more deeply than appropriate physical touch. Everyday physical connections like holding hands, kissing, embracing, or simply sitting close to each other foster a deep sense of security and connection.",
    coreDesire: "To feel physically connected, grounded, and safe through touch.",
    coreFear: "Physical coldness, being flinched away from, or long-distance separation.",
    strengths: [
      "Incredibly warm, comforting, and naturally affectionate.",
      "Can comfort others instantly without needing to find 'the exact right words'.",
      "Highly attuned to the body language and physical space of themselves and their partner."
    ],
    weaknesses: [
      "Can feel totally emotionally starving in long-distance relationships.",
      "If a partner withdraws physically during an argument, they feel completely rejected and abandoned.",
      "May unknowingly overwhelm partners who have personal space boundaries."
    ],
    relationshipDynamics: "You aren't necessarily looking for over-the-top intimacy; it's the small, unconscious touches that matter. A hand on the shoulder, sitting so your legs touch while reading, or a tight hug at the end of the day. Physical absence or turning away physically feels like emotional death.",
    workplaceBehavior: "While physical touch is heavily restricted in the workplace, those with this language often appreciate warm, collegial environments. A firm, genuine handshake, a pat on the back for a job well done, or high-fives celebrate victories effectively for them.",
    color: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-100"
  }
};

// 30 High-Impact Questions (6 per type)
// We use a 1-5 scale (Strongly Disagree to Strongly Agree)
const loveLanguagesExpandedQuestions = [
    // Type 1: Words of Affirmation
    { id: 1, text: "I feel immensely loved when someone unexpectedly sends me a text or note just to say they appreciate me.", type: 1 },
    { id: 2, text: "A harsh, thoughtless criticism from someone I care about can ruin my entire week.", type: 1 },
    { id: 3, text: "I need to hear the words 'I love you' out loud; assuming it isn't enough for me.", type: 1 },
    { id: 4, text: "I naturally compliment the people around me and verbalize exactly why I think they are great.", type: 1 },
    { id: 5, text: "I often replay kind words, compliments, or glowing feedback in my head long after they were said.", type: 1 },
    { id: 6, text: "When I am feeling down, a sincere, heartfelt conversation where someone praises my character is the fastest cure.", type: 1 },

    // Type 2: Acts of Service
    { id: 7, text: "I feel incredibly romantic when my partner cleans the house or runs an annoying errand so I don't have to.", type: 2 },
    { id: 8, text: "I firmly believe that talk is cheap; if you really love me, your actions and dependability will prove it.", type: 2 },
    { id: 9, text: "It deeply damages my trust when someone promises to do a chore or favor and then completely 'forgets'.", type: 2 },
    { id: 10, text: "When people I love are stressed, my immediate instinct is to step in and literally do their work for them.", type: 2 },
    { id: 11, text: "Laziness is one of the quickest ways to absolutely kill any romantic feelings I have for a person.", type: 2 },
    { id: 12, text: "I feel an incredible surge of unprompted affection when someone makes me dinner after I've had a long day.", type: 2 },

    // Type 3: Receiving Gifts
    { id: 13, text: "I treasure small physical souvenirs from dates or trips much more than the average person does.", type: 3 },
    { id: 14, text: "It deeply hurts my feelings if someone I love gets me a generic, thoughtless gift for a major milestone.", type: 3 },
    { id: 15, text: "When I travel, I almost always bring back highly specific, thoughtful little gifts for the people I care about.", type: 3 },
    { id: 16, text: "I feel overwhelmingly thought of and loved when someone buys me my favorite small treat 'just because'.", type: 3 },
    { id: 17, text: "I put an immense amount of planning, research, and energy into finding the absolute perfect present for a loved one.", type: 3 },
    { id: 18, text: "I often keep cards, sticky notes, and wrapping paper because the physical object represents the love given to me.", type: 3 },

    // Type 4: Quality Time
    { id: 19, text: "I feel wildly disrespected if I am talking to someone and they are casually scrolling on their phone.", type: 4 },
    { id: 20, text: "My absolute favorite dates involve just sitting quietly somewhere and having a deep, uninterrupted conversation for hours.", type: 4 },
    { id: 21, text: "If my partner repeatedly cancels or postpones our dedicated plans together, I interpret it as them not loving me.", type: 4 },
    { id: 22, text: "I am extremely good at making deep, sustained eye contact and truly shutting out the rest of the world when someone is speaking.", type: 4 },
    { id: 23, text: "I would much rather do a completely boring chore together with my partner than do a highly fun activity entirely by myself.", type: 4 },
    { id: 24, text: "I genuinely start to feel emotionally starved if I haven't had dedicated, one-on-one focused time with my partner recently.", type: 4 },

    // Type 5: Physical Touch
    { id: 25, text: "A long, tight, lingering hug from someone I love can instantly evaporate almost all of my anxiety and stress.", type: 5 },
    { id: 26, text: "I instinctively reach out to touch the arm or shoulder of the person I am talking to when I want to emphasize a point.", type: 5 },
    { id: 27, text: "If my partner physically pulls away from me or flinches after an argument, it feels like an absolute, devastating rejection.", type: 5 },
    { id: 28, text: "Sitting silently on the couch while physically leaning against my partner feels like a deeply profound conversation to me.", type: 5 },
    { id: 29, text: "Long-distance relationships are incredibly difficult for me because digital communication simply cannot replace physical presence.", type: 5 },
    { id: 30, text: "I love holding hands in public; it is a small, constant, grounding reminder that I belong to my partner.", type: 5 }
];

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
export const loveLanguagesTestQuestions = shuffle([...loveLanguagesExpandedQuestions]);

export function calculateLoveLanguagesResult(answers) {
    // Score tracking for types 1-5
    const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
    answers.forEach(answer => {
      scores[answer.type] += answer.value;
    });
  
    // Find highest score (Primary)
    let PrimaryType = 1;
    let maxScore = -1;
  
    for (const [type, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        PrimaryType = parseInt(type);
      }
    }
    
    // Find second highest score (Secondary)
    let SecondaryType = null;
    let secondMaxScore = -1;
    for (const [type, score] of Object.entries(scores)) {
        if (parseInt(type) !== PrimaryType && score > secondMaxScore) {
            secondMaxScore = score;
            SecondaryType = parseInt(type);
        }
    }
    
    // Normalize breakdown scores (percentages out of max possible per type -> 6 questions * 7 max score)
    const MAX_SCORE_PER_TYPE = 42; // 6 questions * 7 max score
    const breakdown = {};
    for (let i = 1; i <= 5; i++) {
        breakdown[i] = Math.max(0, Math.round((scores[i] / MAX_SCORE_PER_TYPE) * 100)); // Cap at 0 bottom
    }

    const primaryInfo = loveLanguagesTypes[PrimaryType];
    const secondaryInfo = loveLanguagesTypes[SecondaryType];
  
    return {
      type: PrimaryType,
      secondary: SecondaryType,
      fullTitle: `${primaryInfo.shortName} / ${secondaryInfo.shortName}`,
      info: primaryInfo,
      secondaryInfo: secondaryInfo,
      breakdown
    };
}
