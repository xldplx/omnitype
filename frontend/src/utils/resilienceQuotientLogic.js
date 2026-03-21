export const rqMap = {
  "assured-grounded": {
    id: "assured-grounded",
    name: "The Anchor",
    code: "RQ-A",
    description: "You possess a formidable combination of high self-confidence and high stress tolerance. In a crisis, you are the steady hand that others rely on. You trust your own abilities and remain largely unaffected by external pressure or criticism.",
    archetype: "Assured & Grounded",
    quote: "\"I know what I am capable of, and I do not let the storm dictate my course.\"",
    strengths: ["Immune to panic in high-stress situations.", "Deeply self-assured and resistant to imposter syndrome.", "Provides immense stability to teams."],
    weaknesses: ["Can sometimes appear emotionally detached to others.", "May underestimate real threats due to overconfidence.", "Struggles to empathize with people who panic easily."],
    color: "from-sky-500 to-indigo-600",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-100"
  },
  "assured-volatile": {
    id: "assured-volatile",
    name: "The Reactor",
    code: "RQ-R",
    description: "You are highly confident in your skills, but you have a volatile response to stress. When challenged, your instinct is to fight back immediately rather than retreat. You use stress and anger as fuel, pushing through obstacles with sheer willpower.",
    archetype: "Assured & Volatile",
    quote: "\"Pressure doesn't crush me. It ignites me. I will burn down the obstacle.\"",
    strengths: ["Fiercely competitive and driven.", "Incredibly fast response times in a crisis.", "Will confidently take charge when things go wrong."],
    weaknesses: ["Prone to anger and frustration when stressed.", "Can act impulsively without waiting for all the facts.", "May cause collateral relationship damage under pressure."],
    color: "from-orange-500 to-rose-600",
    bgLight: "bg-orange-50",
    borderLight: "border-orange-100"
  },
  "doubtful-grounded": {
    id: "doubtful-grounded",
    name: "The Observer",
    code: "RQ-O",
    description: "You have an incredibly high tolerance for stress and chaos, but you suffer from internal self-doubt. You remain calm when everything goes wrong, but you often hesitate to take the lead because you underestimate your own competence.",
    archetype: "Doubtful & Grounded",
    quote: "\"The world might be ending, and that's okay, I just hope I'm doing this right.\"",
    strengths: ["Excellent at detached, rational analysis during a crisis.", "Never makes things worse by panicking.", "Highly receptive to feedback and learning."],
    weaknesses: ["Suffers from chronic imposter syndrome.", "Frequently hesitates to make necessary executive decisions.", "Allows less competent people to lead the way."],
    color: "from-teal-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-100"
  },
  "doubtful-volatile": {
    id: "doubtful-volatile",
    name: "The Perfectionist",
    code: "RQ-P",
    description: "You experience both low self-confidence and high reactivity to stress. However, you use this extreme anxiety as an engine. You over-prepare, over-analyze, and strive for absolute perfection to prevent the catastrophic outcomes you constantly worry about.",
    archetype: "Doubtful & Volatile",
    quote: "\"If I haven't planned for every single outcome, I have already failed.\"",
    strengths: ["The ultimate planner who anticipates every flaw.", "Incredibly detail-oriented and thorough.", "Produces exceptionally high-quality work to avoid criticism."],
    weaknesses: ["Highly prone to burnout and chronic anxiety.", "Becomes paralyzed by the fear of making a mistake.", "Devastated by negative feedback or failure."],
    color: "from-violet-500 to-purple-700",
    bgLight: "bg-violet-50",
    borderLight: "border-violet-100"
  }
};

const rawQuestions = [
  // CONFIDENCE AXIS (Assured = 1, Doubtful = -1)
  { id: 1, text: "When I walk into a room of strangers, I generally assume they will like me.", axis: "cvsd", weight: 1 },
  { id: 2, text: "I frequently feel like an 'imposter' who is eventually going to be found out.", axis: "cvsd", weight: -1 },
  { id: 3, text: "I rarely second-guess the decisions I make, even if they end up being wrong.", axis: "cvsd", weight: 1 },
  { id: 4, text: "I replay past social interactions in my head, analyzing what I said wrong.", axis: "cvsd", weight: -1 },
  { id: 5, text: "If someone criticizes my work, I easily brush it off without taking it personally.", axis: "cvsd", weight: 1 },
  { id: 6, text: "I constantly seek reassurance from others before committing to a major choice.", axis: "cvsd", weight: -1 },
  { id: 7, text: "I consider myself naturally highly competent in most things I try.", axis: "cvsd", weight: 1 },
  { id: 8, text: "When I succeed at something difficult, I usually attribute it to luck rather than my own skill.", axis: "cvsd", weight: -1 },
  { id: 9, text: "I have no problem asserting my opinion in a group, even if it's unpopular.", axis: "cvsd", weight: 1 },
  { id: 10, text: "I am deeply afraid of looking foolish or incompetent in front of my peers.", axis: "cvsd", weight: -1 },
  { id: 11, text: "I trust my intuition implicitly and act on it without hesitation.", axis: "cvsd", weight: 1 },
  { id: 12, text: "I often feel like everyone else has life figured out better than I do.", axis: "cvsd", weight: -1 },

  // STRESS TOLERANCE AXIS (Grounded = 1, Volatile = -1)
  { id: 13, text: "When a sudden crisis occurs, my heart rate barely changes.", axis: "gvsv", weight: 1 },
  { id: 14, text: "I often feel overwhelmed by the sheer number of tasks I have to complete.", axis: "gvsv", weight: -1 },
  { id: 15, text: "I fall asleep easily, rarely kept awake by racing thoughts about tomorrow.", axis: "gvsv", weight: 1 },
  { id: 16, text: "When things don't go exactly according to plan, I become visibly frustrated or angry.", axis: "gvsv", weight: -1 },
  { id: 17, text: "People often describe me as 'chill' or completely unbothered.", axis: "gvsv", weight: 1 },
  { id: 18, text: "Loud noises, chaotic environments, or sudden changes easily severely drain my energy.", axis: "gvsv", weight: -1 },
  { id: 19, text: "I can completely compartmentalize my stress, leaving work problems at work.", axis: "gvsv", weight: 1 },
  { id: 20, text: "If someone is upset with me, it occupies my mind until the issue is completely resolved.", axis: "gvsv", weight: -1 },
  { id: 21, text: "I thrive under pressure and actually perform better when there is a tight deadline.", axis: "gvsv", weight: 1 },
  { id: 22, text: "I tend to catastrophize, imagining the worst absolute outcome for any given situation.", axis: "gvsv", weight: -1 },
  { id: 23, text: "I rebound from setbacks very quickly, ready to try again the next day.", axis: "gvsv", weight: 1 },
  { id: 24, text: "Small, unexpected inconveniences (like traffic or a spilled drink) can ruin my entire morning.", axis: "gvsv", weight: -1 }
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

export const rqQuestions = shuffle([...rawQuestions]);

export function calculateRQ(answers) {
  let confScore = 0; // Positive = Assured, Negative = Doubtful
  let stressScore = 0; // Positive = Grounded, Negative = Volatile

  // Max score per axis is 12 * 3 = 36
  answers.forEach(answer => {
    // 1 (Left) = Agree, 7 (Right) = Disagree.
    // Score conversion: 1 -> +3, 7 -> -3
    const scoreVal = 4 - answer.value; 

    if (answer.axis === "cvsd") {
      confScore += (scoreVal * answer.weight);
    } else if (answer.axis === "gvsv") {
      stressScore += (scoreVal * answer.weight);
    }
  });

  const confSegment = confScore >= 0 ? "assured" : "doubtful";
  const stressSegment = stressScore >= 0 ? "grounded" : "volatile";

  const resultId = `${confSegment}-${stressSegment}`;
  
  // Convert -36 to +36 range to 0-100%
  const confPercent = Math.max(0, Math.min(100, Math.round(((confScore + 36) / 72) * 100)));
  const stressPercent = Math.max(0, Math.min(100, Math.round(((stressScore + 36) / 72) * 100)));

  return {
    rqInfo: rqMap[resultId],
    confScore,
    stressScore,
    scores: {
      confidence: confPercent,
      stressTolerance: stressPercent
    }
  };
}
