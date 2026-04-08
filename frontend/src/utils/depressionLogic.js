export const depressionQuestions = [
    { id: 1, text: "How often have you felt little interest or pleasure in doing things you normally enjoy?", type: "anhedonia" },
    { id: 2, text: "How often have you felt down, depressed, or hopeless about the future?", type: "mood" },
    { id: 3, text: "How often do you have trouble falling asleep, staying asleep, or sleeping too much?", type: "sleep" },
    { id: 4, text: "How often do you feel tired, drained, or as if your energy is depleted?", type: "energy" },
    { id: 5, text: "How often have you experienced a significant change in your appetite (eating much less or much more)?", type: "physical" },
    { id: 6, text: "How often have you felt like a failure or that you have let yourself or your family down?", type: "worth" },
    { id: 7, text: "How often do you have trouble concentrating on things, such as reading or watching television?", type: "cognitive" },
    { id: 8, text: "How often have you noticed yourself moving or speaking slowly, or being more fidgety/restless than usual?", type: "motor" },
    { id: 9, text: "How often do you feel like you are moving through a heavy fog or mental haze?", type: "cognitive" },
    { id: 10, text: "How often do you feel disconnected from the people around you, even those you care about?", type: "social" },
    { id: 11, text: "How often do you feel that your thoughts are increasingly negative or self-critical?", type: "worth" },
    { id: 12, text: "How often do you feel like every small task requires an immense amount of effort?", type: "energy" },
    { id: 13, text: "How often have you felt that you have no motivation to start your day?", type: "anhedonia" },
    { id: 14, text: "How often have you felt irritable or easily frustrated by small things?", type: "mood" },
    { id: 15, text: "How often do you experience physical aches, pains, or tension that have no clear cause?", type: "physical" },
    { id: 16, text: "How often do you feel that your future looks increasingly empty or unchangeable?", type: "mood" },
    { id: 17, text: "How often do you find yourself avoiding social interactions because you feel you have nothing to offer?", type: "social" },
    { id: 18, text: "How often do you feel that you are just 'going through the motions' of life?", type: "mood" },
];

export const depressionStatuses = {
    'NEGLIGIBLE': {
        name: 'Stable & Balanced',
        subName: 'Emotional Resilience',
        description: 'You currently show a healthy level of emotional stability. While everyone has "off" days, your core energy and sense of purpose remain intact.',
        color: 'from-blue-400 to-indigo-500',
        bgLight: 'bg-blue-50',
        borderLight: 'border-blue-100',
        coreDesire: 'Continued Growth & Presence. You value staying engaged with life and maintaining your mental clarity.',
        coreFear: 'Loss of Vitality. You are mindful of maintaining your energy levels to prevent burnout.',
        pros: ['High emotional recovery speed', 'Consistent motivation for daily tasks', 'Clear and balanced self-perspective', 'Good social engagement levels', 'Stable sleep and appetite patterns'],
        cons: ['May occasionally overlook subtle stress signals', 'Can be overly focused on productivity', 'At risk of burnout if life pressure increases'],
        mbti: ['ENTJ', 'ESTJ', 'ENFJ', 'ESTP'],
        careers: ['High-Performance Leadership', 'Dynamic Creative Direction', 'Crisis Management'],
        socialStyle: 'The Active Engager. You bring energy to conversations and are usually the one initiating plans.',
        energy: 'Vibrant & Sustained'
    },
    'MILD': {
        name: 'Persistent Low Mood',
        subName: 'The Gray Fog',
        description: 'You are experiencing a mild emotional weight. Life might feel a bit more "gray" than usual, and tasks that used to be easy now require a bit more mental push.',
        color: 'from-blue-500 to-indigo-600',
        bgLight: 'bg-blue-50',
        borderLight: 'border-blue-100',
        coreDesire: 'Rest & Recalibration. You need a bit of space to reclaim your energy and find interest in things again.',
        coreFear: 'Missing Out on Life. You worry that this "low tide" will become your new normal.',
        pros: ['Increased internal reflection', 'Higher empathy for others in pain', 'Low-pressure productivity', 'Realism about life challenges'],
        cons: ['Mild social withdrawal', 'Occasional "Brain Fog"', 'Slightly disrupted sleep cycles', 'Irritability during high stress'],
        mbti: ['ISTJ', 'ISFJ', 'INTJ', 'INFJ'],
        careers: ['Independent Research', 'Deep Technical Analysis', 'Strategic Planning'],
        socialStyle: 'The Selective Listener. You prefer one-on-one deep conversations over large group energy.',
        energy: 'Fluctuating & Fragile'
    },
    'MODERATE': {
        name: 'Moderate Depression Patterns',
        subName: 'The Heavy Anchor',
        description: 'Your emotional weight has become more significant. It likely interferes with your daily productivity and social life, making you feel disconnected or perpetually tired.',
        color: 'from-blue-600 to-indigo-700',
        bgLight: 'bg-blue-50',
        borderLight: 'border-blue-100',
        coreDesire: 'Relief & Support. You are looking for a way to lift the weight and re-engage with the world.',
        coreFear: 'Total Disconnection. You worry that you are losing the ability to feel "joy" or "spark" in anything.',
        pros: ['Profound emotional depth', 'High sensitivity to subtle changes', 'Deep intellectual introspection'],
        cons: ['Difficulty starting anything new', 'Frequent social avoidance', 'Disrupted physical energy', 'Intense self-criticism'],
        mbti: ['INFP', 'INTP', 'ISFP', 'ISTP'],
        careers: ['Care-focused roles', 'Creative Expression', 'Quiet Analytical work'],
        socialStyle: 'The Quiet Observer. You need a lot of mental energy just to be present in social settings.',
        energy: 'Low & Labored'
    },
    'HIGH': {
        name: 'High Intensity Depression',
        subName: 'The Midnight Voyager',
        description: 'You are navigating a deep and heavy emotional landscape. Every day feels like a battle against your own gravity, and your sense of future and self-worth is likely heavily impacted.',
        color: 'from-indigo-600 to-slate-900',
        bgLight: 'bg-indigo-50',
        borderLight: 'border-indigo-100',
        coreDesire: 'Deep Healing & Safety. You need a supportive environment that acknowledges the weight you are carrying.',
        coreFear: 'Endless Darkness. You worry that the "Midnight" will never end.',
        pros: ['Immense interior resilience', 'Unique perspective on the human condition', 'Quiet and profound strength'],
        cons: ['Severe cognitive fatigue', 'Intense social isolation', 'Physical pain or heavy lethargy', 'Deeply nihilistic thoughts'],
        mbti: ['Any Type - Situationally Universal'],
        careers: ['Safe, Low-Stress Environments', 'Support-driven roles'],
        socialStyle: 'The Withdrawn Voyager. You are focusing all your energy on internal survival.',
        energy: 'Critically Low'
    }
};

export const calculateDepressionResult = (answers) => {
    const answersArray = Array.isArray(answers) ? answers : Object.values(answers);
    const totalScore = answersArray.reduce((acc, curr) => acc + curr.value, 0);
    
    // Scale: 18 questions * 7 points = 126 max. 18 questions * 1 point = 18 min.
    // 7 is "Very Often" (Higher Depression), 1 is "Never"
    
    // Reverse the scale if needed (usually 7 = High frequency)
    let statusKey = 'NEGLIGIBLE';
    
    if (totalScore >= 95) statusKey = 'HIGH';
    else if (totalScore >= 70) statusKey = 'MODERATE';
    else if (totalScore >= 45) statusKey = 'MILD';
    
    // Breakdown Percentages
    const anhedonia = answersArray.filter(a => a.type === 'anhedonia').reduce((acc, curr) => acc + curr.value, 0);
    const energy = answersArray.filter(a => a.type === 'energy').reduce((acc, curr) => acc + curr.value, 0);
    const worth = answersArray.filter(a => a.type === 'worth').reduce((acc, curr) => acc + curr.value, 0);

    return {
        statusKey,
        fullTitle: statusKey.toLowerCase(),
        info: depressionStatuses[statusKey],
        breakdown: {
            joyPercent: Math.min(Math.round((anhedonia / 14) * 100), 100),
            energyPercent: Math.min(Math.round((energy / 14) * 100), 100),
            worthPercent: Math.min(Math.round((worth / 14) * 100), 100)
        }
    };
};
