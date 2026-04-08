export const suicideQuestions = [
    { id: 1, text: "How often have you felt that life is a heavy burden to carry?", type: "fatigue" },
    { id: 2, text: "How often have you wished you could just go to sleep and not wake up?", type: "passive" },
    { id: 3, text: "How often have you felt that the world would be easier for your loved ones if you were not here?", type: "worth" },
    { id: 4, text: "How often have you felt that your emotional pain is entirely inescapable?", type: "fatigue" },
    { id: 5, text: "How often have you had fleeting thoughts of ending your life, even if you wouldn't act on them?", type: "active" },
    { id: 6, text: "How often do you feel a sense of profound exhaustion with existence itself?", type: "fatigue" },
    { id: 7, text: "How often do you find yourself thinking about 'The End' as a form of relief?", type: "passive" },
    { id: 8, text: "How often have you felt that your hope for the future is slowly fading away?", type: "hope" },
    { id: 9, text: "How often do you find yourself researching or thinking about methods of self-harm?", type: "active" },
    { id: 10, text: "How often have you felt that you have no more options left to improve your situation?", type: "hope" },
    { id: 11, text: "How often do you experience sudden, intense impulses to harm yourself during a crisis?", type: "active" },
    { id: 12, text: "How often have you felt that your internal safety net is becoming dangerously thin?", type: "safety" },
    { id: 13, text: "How often do you feel that you are just waiting for 'The Spark' to take action?", type: "active" },
    { id: 14, text: "How often do you feel that you are disconnected from any reason to keep pushing forward?", type: "hope" },
    { id: 15, text: "How often have you started making 'Just in case' plans or settling your affairs?", type: "active" },
    { id: 16, text: "How often do you feel that your mind is constantly fixated on the idea of self-destruction?", type: "active" },
    { id: 17, text: "How often do you feel completely isolated in your existential pain?", type: "fatigue" },
    { id: 18, text: "How often do you feel that you need urgent mental intervention to stay safe?", type: "safety" },
];

export const suicideStatuses = {
    'SECURE': {
        name: 'Safe & Secure',
        subName: 'The Solid Anchor',
        description: 'You currently have a strong sense of internal safety and life-interest. While you may experience stress, your foundation of hope remains resilient.',
        color: 'from-slate-400 to-slate-600',
        bgLight: 'bg-slate-50',
        borderLight: 'border-slate-100',
        coreDesire: 'Mental Fortitude & Connection. You value your presence in the world and stay grounded in your relationships.',
        coreFear: 'Sudden Destabilization. You are protective of your mental well-being.',
        pros: ['Strong internal safety net', 'High hope persistence', 'Clear life-focused goals'],
        cons: ['May occasionally dismiss smaller stress signals'],
        mbti: ['Any Type'],
        careers: ['Mentorship', 'Community Building', 'Supportive Leadership'],
        socialStyle: 'The Steady Presence. You bring a sense of stability to those around you.',
        energy: 'Steel-like Resilience'
    },
    'WEARY': {
        name: 'Mild Existential Fatigue',
        subName: 'The Soft Mist',
        description: 'You are experiencing some passive "weight" or weariness with life. You are safe, but you are carrying a quiet sense of exhaustion that needs acknowledgement and rest.',
        color: 'from-slate-500 to-slate-700',
        bgLight: 'bg-slate-50',
        borderLight: 'border-slate-100',
        coreDesire: 'Quiet Rest & Perspective. You are looking for a way to lift the fog and feel lighter again.',
        coreFear: 'Becoming Permanently Lost. You worry that your fatigue will deepen into something heavier.',
        pros: ['Deep empathy for suffering', 'Realistic assessment of life challenges', 'Quiet strength'],
        cons: ['Temporary loss of spark', 'Occasional social withdrawal'],
        mbti: ['Any Type'],
        careers: ['Philosophical work', 'Creative Expression', 'Calm Observation'],
        socialStyle: 'The Thoughtful Listener. You speak with a quiet weight and sincerity.',
        energy: 'Misty & Fragile'
    },
    'CONCERN': {
        name: 'Focus on Frequency of Thoughts',
        subName: 'The Heavy Steel',
        description: 'You are experiencing frequent thoughts related to self-harm or a lack of desire to exist. While you are still holding on, this frequency is a signal that your internal safety net needs immediate reinforcement.',
        color: 'from-slate-600 to-slate-800',
        bgLight: 'bg-slate-50',
        borderLight: 'border-slate-100',
        coreDesire: 'Immediate Connection & Visibility. You need to be heard and supported without judgment.',
        coreFear: 'Total Surrender. You worry that you are losing the strength to keep fighting against the currents.',
        pros: ['Profound endurance in pain', 'Extraordinary internal complexity'],
        cons: ['Chronic cognitive fatigue', 'High intensity of internal pressure', 'Narrowing of perceived options'],
        mbti: ['Any Type - Condition-specific'],
        careers: ['Focus on Wellness First', 'Low-pressure environments'],
        socialStyle: 'The Withdrawn Observer. You are using most of your energy to stay anchored.',
        energy: 'Dense & Labored'
    },
    'URGENT': {
        name: 'Urgent Support Recommended',
        subName: 'The Cracking Steel',
        description: 'You are in a critical state of existential pain. Your thoughts are frequent, intense, and possibly active. This is not a "personality trait"—it is a signal for urgent, compassionate intervention and specialized support.',
        color: 'from-slate-700 to-black',
        bgLight: 'bg-slate-100',
        borderLight: 'border-slate-200',
        coreDesire: 'Survival & Protection. You need an immediate, safe environment that can hold the weight for you.',
        coreFear: 'Unstoppable Action. You worry that you are nearing the point of no return.',
        pros: ['Immeasurable survival strength', 'Deepest possible understanding of the human struggle'],
        cons: ['Severe mental exhaustion', 'Acute loss of safety reflexes', 'Total isolation from hope'],
        mbti: ['Universal Crisis State'],
        careers: ['Prioritize Health & Safety Immediately'],
        socialStyle: 'The Silenced Soul. You need someone else to reach out and speak the words of safety for you.',
        energy: 'Fractured & Critical'
    }
};

export const calculateSuicideResult = (answers) => {
    const answersArray = Array.isArray(answers) ? answers : Object.values(answers);
    const totalScore = answersArray.reduce((acc, curr) => acc + curr.value, 0);
    
    // Scale: 18 questions * 7 points = 126 max. 18 questions * 1 point = 18 min.
    // 7 is "Very Often" (Higher Risk), 1 is "Never"
    
    let statusKey = 'SECURE';
    
    if (totalScore >= 95) statusKey = 'URGENT';
    else if (totalScore >= 70) statusKey = 'CONCERN';
    else if (totalScore >= 45) statusKey = 'WEARY';
    
    // Breakdown Percentages
    const active = answersArray.filter(a => a.type === 'active').reduce((acc, curr) => acc + curr.value, 0);
    const hope = answersArray.filter(a => a.type === 'hope').reduce((acc, curr) => acc + curr.value, 0);
    const fatigue = answersArray.filter(a => a.type === 'fatigue').reduce((acc, curr) => acc + curr.value, 0);

    return {
        statusKey,
        fullTitle: statusKey.toLowerCase(),
        info: suicideStatuses[statusKey],
        breakdown: {
            safetyReflex: Math.min(Math.round((active / 14) * 100), 100),
            hopePersistence: Math.min(Math.round((hope / 21) * 100), 100),
            mentalFatigue: Math.min(Math.round((fatigue / 14) * 100), 100)
        }
    };
};
