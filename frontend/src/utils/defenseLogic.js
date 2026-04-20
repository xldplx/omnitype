export const defenseTestQuestions = [
    { id: 1, text: "When I feel deeply hurt, my first instinct is to analyze the psychological reasons why the other person acted that way.", type: "intellectualization" },
    { id: 2, text: "When things go wrong in my life, I often feel it is due to other people's incompetence or malice.", type: "projection" },
    { id: 3, text: "I frequently procrastinate or completely ignore problems, hoping they will resolve themselves.", type: "avoidance" },
    { id: 4, text: "I prefer to read research or data about a traumatic event rather than sit and feel the sadness of it.", type: "intellectualization" },
    { id: 5, text: "I often notice my own flaws (like being selfish or lazy) predominantly in the people around me.", type: "projection" },
    { id: 6, text: "When a conversation becomes tense or emotional, I usually find an excuse to leave the room.", type: "avoidance" },
    { id: 7, text: "I use big words and complex theories to explain away my personal failures.", type: "intellectualization" },
    { id: 8, text: "If I am secretly angry, I tend to accuse my partner or friends of being angry at me.", type: "projection" },
    { id: 9, text: "I distract myself with endless scrolling, gaming, or drinking when I am stressed.", type: "avoidance" },
    { id: 10, text: "I feel much safer in the realm of facts and logic than in the realm of messy human emotions.", type: "intellectualization" },
    { id: 11, text: "I feel like people are constantly judging me, even though I might actually be judging them.", type: "projection" },
    { id: 12, text: "I will change the subject immediately if someone asks me a difficult personal question.", type: "avoidance" },
    { id: 13, text: "I often detach myself from my body and watch highly stressful situations as if they were a movie.", type: "intellectualization" },
    { id: 14, text: "It is much easier to be critical of society or others than to look at my own shortcomings.", type: "projection" },
    { id: 15, text: "I have physically hidden or slept to escape the overwhelming pressure of deadlines.", type: "avoidance" },
    { id: 16, text: "I believe that if you just understand the exact root cause of a feeling, you don't actually have to feel it.", type: "intellectualization" },
    { id: 17, text: "I am quick to spot hypocrisy in others, though I struggle to admit when I am a hypocrite.", type: "projection" },
    { id: 18, text: "I regularly cancel plans at the last minute because the thought of socializing causes me anxiety.", type: "avoidance" }
];

export const defenseStatuses = {
    'SUBLIMATOR': {
        id: 'sublimator',
        name: 'The Sublimator',
        subName: 'Mature Coping Mechanism',
        description: 'You score low on primitive defense mechanisms. Instead of running, blaming, or over-analyzing, you tend to face reality. You likely use "Sublimation"—channeling your anxiety and pain into productive, creative, or healthy outlets.',
        color: 'from-emerald-500 to-teal-600',
        bgLight: 'bg-emerald-50',
        borderLight: 'border-emerald-200',
        coreDesire: 'To process reality exactly as it is and grow from it.',
        coreFear: 'Losing touch with reality or being entirely consumed by unmanaged trauma.',
        pros: ['High emotional intelligence', 'Channels anger into art or exercise', 'Rarely creates toxic interpersonal drama', 'Can sit with uncomfortable feelings without panicking'],
        cons: ['Can become exhausted from constantly doing the "heavy emotional lifting"', 'May struggle to relate to highly defensive or reactive people'],
        coreTrigger: 'Intense emotional pain or overwhelming stress.',
        subconsciousGoal: 'To transform negative energy into a socially acceptable or beautiful outcome.',
        backfireEffect: 'You might accidentally turn your pain into a "productivity metric," failing to ever just rest and grieve without producing something.'
    },
    'LOGIC': {
        id: 'logic',
        name: 'The Logic Shield',
        subName: 'High Intellectualization',
        description: 'When the world gets messy, you build a fortress of facts. You unconsciously strip the emotion out of painful events by treating them as fascinating data points to be studied, rather than lived.',
        color: 'from-sky-500 to-blue-600',
        bgLight: 'bg-sky-50',
        borderLight: 'border-sky-200',
        coreDesire: 'Total control over unpredictable emotional chaos.',
        coreFear: 'Being overwhelmed by irrational feelings and losing your mind.',
        pros: ['Excellent in a crisis or emergency', 'Highly objective and rational problem solver', 'Rarely acts out of blind rage or panic', 'Can mediate disputes effectively'],
        cons: ['Comes across as cold or unfeeling to loved ones', 'Pain is never actually processed, just delayed', 'Prone to severe physical burnout from suppressed emotions'],
        coreTrigger: 'Situations involving profound vulnerability, grief, or shame.',
        subconsciousGoal: 'To separate the brain from the heart, believing that if you can explain it, it can\'t hurt you.',
        backfireEffect: 'By analyzing the pain instead of feeling it, the emotional debt accumulates in your body, often leading to sudden panic attacks or physical illness later on.'
    },
    'DEFLECTOR': {
        id: 'deflector',
        name: 'The Deflector',
        subName: 'High Projection',
        description: 'Your psyche protects you by taking your own unacceptable thoughts, flaws, or insecurities and assigning them to the people around you. It is much easier to fight an external enemy than an internal one.',
        color: 'from-rose-500 to-red-600',
        bgLight: 'bg-rose-50',
        borderLight: 'border-rose-200',
        coreDesire: 'To maintain a flawless, blameless self-image.',
        coreFear: 'That you are inherently flawed, toxic, or unworthy.',
        pros: ['Highly sensitive to the dynamics in a room', 'Passionate and fiercely defensive of your beliefs', 'Quick to identify potential threats or injustices'],
        cons: ['Creates massive interpersonal conflict out of nowhere', 'Inability to take accountability for mistakes', 'Alienates friends who feel constantly accused'],
        coreTrigger: 'Deep-seated shame, guilt, or feelings of inadequacy.',
        subconsciousGoal: 'To export your toxic feelings so you don\'t have to deal with the pain of self-reflection.',
        backfireEffect: 'By constantly accusing others of what you are secretly doing or feeling, you destroy trust and create the exact hostile environment you were afraid of.'
    },
    'GHOST': {
        id: 'ghost',
        name: 'The Ghost',
        subName: 'High Avoidance',
        description: 'When threatened, your nervous system simply unplugs. You utilize denial, distraction, and physical escape to ensure you never have to face the source of your anxiety.',
        color: 'from-purple-500 to-indigo-600',
        bgLight: 'bg-purple-50',
        borderLight: 'border-purple-200',
        coreDesire: 'Absolute peace, quiet, and the absence of demands.',
        coreFear: 'Confrontation, failure, and being trapped in an uncomfortable reality.',
        pros: ['Rarely initiates conflict', 'Can adapt to almost anything by simply ignoring the bad parts', 'Highly independent and self-soothing'],
        cons: ['Procrastination destroys long-term goals', 'Partners feel abandoned during times of crisis', 'Minor problems compound into catastrophic failures because they are ignored'],
        coreTrigger: 'Conflict, deadlines, or overwhelming expectations.',
        subconsciousGoal: 'To buy time and escape the immediate physiological discomfort of anxiety.',
        backfireEffect: 'Avoidance provides immediate relief but guarantees long-term suffering. The problems you run from grow exponentially larger in the dark.'
    }
};

export const calculateDefenseResult = (answers) => {
    const answersArray = Array.isArray(answers) ? answers : Object.values(answers);
    
    let totalScore = 0;
    let logicScore = 0;
    let projectionScore = 0;
    let avoidanceScore = 0;

    answersArray.forEach(a => {
        totalScore += a.value;
        if (a.type === 'intellectualization') logicScore += a.value;
        if (a.type === 'projection') projectionScore += a.value;
        if (a.type === 'avoidance') avoidanceScore += a.value;
    });

    let statusKey = 'SUBLIMATOR';
    const averageScore = totalScore / 18;

    if (averageScore >= 3.5) {
        if (logicScore >= projectionScore && logicScore >= avoidanceScore) {
            statusKey = 'LOGIC';
        } else if (projectionScore >= logicScore && projectionScore >= avoidanceScore) {
            statusKey = 'DEFLECTOR';
        } else {
            statusKey = 'GHOST';
        }
    } else {
        statusKey = 'SUBLIMATOR'; // Low overall defensiveness
    }

    const logicPercent = Math.min(Math.round(((logicScore - 6) / 36) * 100), 100);
    const projectionPercent = Math.min(Math.round(((projectionScore - 6) / 36) * 100), 100);
    const avoidancePercent = Math.min(Math.round(((avoidanceScore - 6) / 36) * 100), 100);

    return {
        statusKey,
        fullTitle: statusKey.toLowerCase(),
        info: defenseStatuses[statusKey],
        breakdown: {
            logicPercent: Math.max(0, logicPercent),
            projectionPercent: Math.max(0, projectionPercent),
            avoidancePercent: Math.max(0, avoidancePercent)
        }
    };
};
