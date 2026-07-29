export const imposterTestQuestions = [
    { id: 1, text: "I feel like a failure if I don't execute a task absolutely perfectly.", type: "perfectionist" },
    { id: 2, text: "I hesitate to apply for a job or start a project unless I meet 100% of the requirements.", type: "expert" },
    { id: 3, text: "I believe that if I have to ask for help, it proves I am not actually qualified.", type: "soloist" },
    { id: 4, text: "I focus intensely on the one small mistake I made, completely ignoring the 99 things I did right.", type: "perfectionist" },
    { id: 5, text: "I constantly seek out new certifications or training because I feel I don't know enough yet.", type: "expert" },
    { id: 6, text: "I would rather struggle alone for hours than admit to a colleague that I am stuck.", type: "soloist" },
    { id: 7, text: "If a project turns out well but wasn't 'flawless', I feel like I deceived everyone into thinking it's good.", type: "perfectionist" },
    { id: 8, text: "I live in fear of someone asking me a question that I don't know the answer to.", type: "expert" },
    { id: 9, text: "I feel extremely uncomfortable when people offer to assist me with my workload.", type: "soloist" },
    { id: 10, text: "I set unbelievably high standards for myself that I would never expect anyone else to meet.", type: "perfectionist" },
    { id: 11, text: "I often downplay my knowledge, even when I am the most qualified person in the room.", type: "expert" },
    { id: 12, text: "I believe that true success only counts if I achieved it entirely by myself without any support.", type: "soloist" },
    { id: 13, text: "I frequently rewrite emails or redo tasks multiple times before submitting them.", type: "perfectionist" },
    { id: 14, text: "I feel like a fraud when someone calls me an 'expert' or praises my intelligence.", type: "expert" },
    { id: 15, text: "I view collaboration as a crutch for people who aren't strong enough to do it alone.", type: "soloist" },
    { id: 16, text: "I feel crushed and invalidated by even mild, constructive criticism.", type: "perfectionist" },
    { id: 17, text: "I stockpile books, articles, or courses that I feel I 'must' finish before I can start working.", type: "expert" },
    { id: 18, text: "I hide my struggles from my friends and family because I want them to think I have it all together.", type: "soloist" }
];

export const imposterStatuses = {
    'SECURE': {
        id: 'secure',
        name: 'The Secure Achiever',
        subName: 'Low Imposter Syndrome',
        description: 'You have a healthy relationship with your own competence. You understand that you are not perfect, but you don\'t let that make you feel like a fraud. You can accept praise and handle criticism gracefully.',
        color: 'from-emerald-500 to-teal-600',
        bgLight: 'bg-emerald-50',
        borderLight: 'border-emerald-200',
        coreDesire: 'Continuous, steady growth and honest feedback.',
        coreFear: 'Becoming arrogant or stagnant in your learning.',
        pros: ['Easily delegates tasks to others', 'Accepts constructive criticism without panicking', 'Can separate self-worth from work output', 'Celebrates wins genuinely'],
        cons: ['May occasionally underestimate the anxiety of peers', 'Might be perceived as over-confident by highly insecure people'],
        specificLie: '"I am only as good as my last achievement." (Though you mostly overcome this)',
        triggerCondition: 'Entering an entirely new field where you are a true beginner.',
        objectiveEvidence: 'Look at your track record. You have learned new things before and succeeded. Being a beginner does not make you a fraud; it makes you a student.',
        cognitiveOverhead: 'Low. You process feedback without internalizing systemic self-doubt.',
        reframingMantra: '"I am worthy of success regardless of temporary mistakes."',
        somaticProtocol: 'Maintain open body posture and celebrate micro-wins in real-time.'
    },
    'PERFECTIONIST': {
        id: 'perfectionist',
        name: 'The Perfectionist',
        subName: 'Flaw-Focused Imposter',
        description: 'Your imposter syndrome manifests through an obsession with flawlessness. You believe that if a task is not executed to 100% perfection, it is a complete failure, and therefore, you are a fake.',
        color: 'from-fuchsia-500 to-purple-600',
        bgLight: 'bg-fuchsia-50',
        borderLight: 'border-fuchsia-200',
        coreDesire: 'To be completely unassailable and beyond reproach.',
        coreFear: 'Being publicly exposed as flawed, messy, or inadequate.',
        pros: ['Produces incredibly high-quality, detailed work', 'Highly reliable and thorough', 'Often catches mistakes everyone else misses'],
        cons: ['Chronic burnout from overworking', 'Misses deadlines due to endless tweaking', 'Cannot enjoy successes because they focus on the 1% that went wrong'],
        specificLie: '"If it\'s not perfect, it\'s worthless, and I deceived them into liking it."',
        triggerCondition: 'Submitting a final project or receiving a performance review.',
        objectiveEvidence: 'Perfection is mathematically impossible in creative/complex work. The fact that others are thrilled with your 95% means the work is genuinely good. You are moving the goalposts on yourself.',
        cognitiveOverhead: 'Very High. Constant background audits scanning for microscopic mistakes.',
        reframingMantra: '"Done with 90% excellence is infinitely better than unreleased perfection."',
        somaticProtocol: 'Intentionally submit a task at 90% completion and observe that safety remains.'
    },
    'EXPERT': {
        id: 'expert',
        name: 'The Perpetual Student',
        subName: 'Knowledge-Focused Imposter',
        description: 'Your imposter syndrome tells you that you never know enough. You measure your competence by what and how much you know. You fear being exposed as ignorant or uneducated.',
        color: 'from-blue-500 to-indigo-600',
        bgLight: 'bg-blue-50',
        borderLight: 'border-blue-200',
        coreDesire: 'To possess absolute mastery and certainty before taking action.',
        coreFear: 'Being asked a question you don\'t know the answer to and looking foolish.',
        pros: ['Incredibly knowledgeable and well-researched', 'Values education and continuous learning', 'Excellent resource for the team'],
        cons: ['Stuck in "tutorial hell" or endless preparation', 'Misses opportunities because they don\'t feel "ready" yet', 'Downplays significant expertise'],
        specificLie: '"I cannot start or speak up until I know absolutely everything about this topic."',
        triggerCondition: 'Being asked for your professional opinion or stepping into a new role.',
        objectiveEvidence: 'Real experts don\'t know everything; they know how to find the answers. The fact that you understand the complexity of the topic proves your competence. A true novice wouldn\'t even know what to research.',
        cognitiveOverhead: 'High. Endless research subroutines preventing decisive execution.',
        reframingMantra: '"I don\'t need to know everything to provide immediate, valuable insight."',
        somaticProtocol: 'Say "I don\'t know the exact answer, but I will find out" with calm confidence.'
    },
    'SOLOIST': {
        id: 'soloist',
        name: 'The Rugged Individualist',
        subName: 'Independence-Focused Imposter',
        description: 'Your imposter syndrome dictates that if you have to ask for help, you are a fraud. You believe that your achievements only count if you reached them completely unassisted.',
        color: 'from-orange-500 to-rose-500',
        bgLight: 'bg-orange-50',
        borderLight: 'border-orange-200',
        coreDesire: 'To prove your absolute independence and capability.',
        coreFear: 'Being seen as weak, needy, or a burden to others.',
        pros: ['Highly self-sufficient and resourceful', 'Takes extreme ownership of projects', 'Will figure out difficult problems independently'],
        cons: ['Becomes a massive bottleneck by refusing to delegate', 'Suffers in silence when overwhelmed', 'Pushes away people who genuinely want to help'],
        specificLie: '"If I can\'t do it entirely by myself, I don\'t deserve the credit and I am a fake."',
        triggerCondition: 'Hitting a roadblock or feeling overwhelmed by workload.',
        objectiveEvidence: 'Every major human achievement required a team. Asking for help is a sign of secure leadership and resource management, not a lack of personal skill. Independence is not a metric for worth.',
        cognitiveOverhead: 'High. Carrying 100% of workload weight alone without emotional relief.',
        reframingMantra: '"Asking for help is strategic collaboration, not personal failure."',
        somaticProtocol: 'Delegate one minor task today and accept the support without apologizing.'
    }
};

export const calculateImposterResult = (answers) => {
    const answersArray = Array.isArray(answers) ? answers : Object.values(answers);
    
    let totalScore = 0;
    let perfectionistScore = 0;
    let expertScore = 0;
    let soloistScore = 0;

    answersArray.forEach(a => {
        totalScore += a.value || 0;
        if (a.type === 'perfectionist') perfectionistScore += a.value || 0;
        if (a.type === 'expert') expertScore += a.value || 0;
        if (a.type === 'soloist') soloistScore += a.value || 0;
    });

    let statusKey = 'SECURE';
    const averageScore = totalScore / 18;

    if (averageScore >= 3.5) {
        if (perfectionistScore >= expertScore && perfectionistScore >= soloistScore) {
            statusKey = 'PERFECTIONIST';
        } else if (expertScore >= perfectionistScore && expertScore >= soloistScore) {
            statusKey = 'EXPERT';
        } else {
            statusKey = 'SOLOIST';
        }
    } else {
        statusKey = 'SECURE';
    }

    const perfectionistPercent = Math.min(Math.round(((perfectionistScore - 6) / 36) * 100), 100);
    const expertPercent = Math.min(Math.round(((expertScore - 6) / 36) * 100), 100);
    const soloistPercent = Math.min(Math.round(((soloistScore - 6) / 36) * 100), 100);

    return {
        statusKey,
        fullTitle: statusKey.toLowerCase(),
        info: imposterStatuses[statusKey],
        breakdown: {
            perfectionistPercent: Math.max(0, perfectionistPercent || 0),
            expertPercent: Math.max(0, expertPercent || 0),
            soloistPercent: Math.max(0, soloistPercent || 0)
        }
    };
};
