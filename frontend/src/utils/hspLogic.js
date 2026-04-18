export const hspTestQuestions = [
    { id: 1, text: "I am easily overwhelmed by strong sensory input like bright lights or loud noises.", type: "sensory" },
    { id: 2, text: "I seem to be aware of subtleties in my environment that others miss.", type: "sensory" },
    { id: 3, text: "Other people's moods profoundly affect my own energy levels.", type: "empathy" },
    { id: 4, text: "I tend to need significant downtime after a busy day to recharge in a quiet room.", type: "processing" },
    { id: 5, text: "I am particularly sensitive to the effects of caffeine or sugar.", type: "sensory" },
    { id: 6, text: "I often feel overwhelmed by things like bright lights, strong smells, or coarse fabrics.", type: "sensory" },
    { id: 7, text: "I have a rich, complex inner life with deep thoughts and feelings.", type: "processing" },
    { id: 8, text: "I am deeply moved by arts, music, or nature.", type: "empathy" },
    { id: 9, text: "I get rattled when I have a lot to do in a short amount of time.", type: "processing" },
    { id: 10, text: "When people are uncomfortable in a physical environment, I usually know what needs to change.", type: "empathy" },
    { id: 11, text: "I make a point to avoid violent movies and TV shows because they affect me too much.", type: "empathy" },
    { id: 12, text: "I become unpleasantly aroused or anxious when there is a lot going on around me.", type: "sensory" },
    { id: 13, text: "Changes in my life, even positive ones, can shake me up deeply.", type: "processing" },
    { id: 14, text: "I notice and enjoy delicate or fine scents, tastes, sounds, and works of art.", type: "sensory" },
    { id: 15, text: "It is a high priority for me to arrange my life to avoid upsetting or overwhelming situations.", type: "processing" },
    { id: 16, text: "I am highly attuned to non-verbal cues and can usually tell when someone is lying.", type: "empathy" },
    { id: 17, text: "When I must compete or be observed while performing a task, I become nervous and perform poorly.", type: "processing" },
    { id: 18, text: "I often feel the emotional pain of others as if it were my own.", type: "empathy" }
];

export const hspStatuses = {
    'GROUNDED': {
        id: 'grounded',
        name: 'The Grounded Realist',
        subName: 'Low Sensitivity',
        description: 'You are highly resilient to environmental static. You likely process the world exactly as it is presented, without becoming bogged down by overwhelming sensory inputs or absorbing the emotional chaos of the room.',
        color: 'from-emerald-400 to-teal-500',
        bgLight: 'bg-emerald-50',
        borderLight: 'border-emerald-100',
        coreDesire: 'Efficiency and Action. You thrive in fast-paced environments where you can focus on the task without emotional distraction.',
        coreFear: 'Over-complication. You prefer straightforward situations and may feel impatient with those who over-analyze every detail.',
        pros: ['High resilience in chaotic environments', 'Does not easily absorb others\' negative energy', 'Can make quick decisions under pressure', 'Comfortable with loud or intense settings', 'Practical and steady presence'],
        cons: ['May miss subtle emotional cues from others', 'Might underestimate the need for rest', 'Can seem insensitive to highly sensitive people', 'Might gloss over important details'],
        traits: {
            sensory: 'Robust and resilient to external stimuli.',
            empathy: 'Practical empathy; you help by solving problems, not just feeling them.',
            processing: 'Straightforward and efficient.'
        },
        rechargeMode: 'Active Decompression',
        rechargeDesc: 'You recover energy best by switching tasks to something physical or engaging rather than complete sensory deprivation.',
        environmentalNeeds: 'Functional and practical spaces; unbothered by normal office chatter.',
        sensoryTriggers: 'Excessive complaining or highly dramatic emotional outbursts.',
        idealWorkspace: 'A bustling coffee shop or an open-plan office where you can feed off the productive energy.'
    },
    'BALANCED': {
        id: 'balanced',
        name: 'The Balanced Observer',
        subName: 'Moderate Sensitivity',
        description: 'You sit right in the middle of the sensitivity spectrum. You appreciate subtlety and can read a room well, but you also have the ability to build a mental wall when the environment becomes too overwhelming.',
        color: 'from-sky-400 to-indigo-500',
        bgLight: 'bg-sky-50',
        borderLight: 'border-sky-100',
        coreDesire: 'Harmony and Adaptability. You want to enjoy the depth of life while maintaining your personal boundaries.',
        coreFear: 'Losing control of your environment. You function best when you have a healthy mix of social interaction and private downtime.',
        pros: ['Highly adaptable to most situations', 'Good at reading the room without losing yourself', 'Appreciates art and nuance', 'Can handle moderate stress and chaos well', 'Excellent mediator'],
        cons: ['Occasional fatigue from trying to balance both worlds', 'Can still get overwhelmed if boundaries are pushed too far', 'May struggle to explain your needs to extremes on either end'],
        traits: {
            sensory: 'Appreciates aesthetic details without chronic overwhelm.',
            empathy: 'Warm and understanding, but retains a sense of self.',
            processing: 'Thoughtful but decisive.'
        },
        rechargeMode: 'Scheduled Solitude',
        rechargeDesc: 'You need dedicated blocks of quiet time to process the day, but you do not need to completely withdraw from society.',
        environmentalNeeds: 'A space with natural light, comfortable temperatures, and the ability to close the door when needed.',
        sensoryTriggers: 'Simultaneous overlapping noises (e.g., TV on while someone is talking over loud music).',
        idealWorkspace: 'A hybrid setup—collaborative office days mixed with quiet work-from-home days.'
    },
    'EMPATHETIC': {
        id: 'empathetic',
        name: 'The Empathetic Sensor',
        subName: 'High Emotional Sensitivity',
        description: 'Your nervous system is highly attuned to the emotional wavelengths of others. You are a natural healer and listener, but this means you often carry the weight of the world on your shoulders.',
        color: 'from-purple-500 to-fuchsia-600',
        bgLight: 'bg-purple-50',
        borderLight: 'border-purple-100',
        coreDesire: 'Deep, authentic connection. You want to understand and be understood on a soul level.',
        coreFear: 'Emotional conflict and disharmony. Harsh words and angry environments physically exhaust your nervous system.',
        pros: ['Incredible emotional intelligence and empathy', 'Creates safe spaces for others', 'Deeply appreciates beauty and art', 'Highly intuitive about people\'s true motives', 'Loyal and caring friend'],
        cons: ['Highly vulnerable to emotional burnout', 'Tends to absorb other people\'s stress', 'Can struggle to set firm boundaries', 'Over-analyzes social interactions'],
        traits: {
            sensory: 'Sensitive, particularly to tone of voice and facial expressions.',
            empathy: 'Deeply profound; you feel what others feel.',
            processing: 'Internalizes and reflects on emotional data.'
        },
        rechargeMode: 'Emotional Detachment',
        rechargeDesc: 'You must actively practice "un-merging" your energy from others. Activities like grounding in nature or solo creative hobbies are essential.',
        environmentalNeeds: 'Spaces filled with emotionally safe, predictable, and warm people.',
        sensoryTriggers: 'Passive aggression, unspoken tension in a room, or witnessing conflict.',
        idealWorkspace: 'A small, close-knit team with a high degree of psychological safety and low corporate politics.'
    },
    'DEEP': {
        id: 'deep',
        name: 'The Deep Processor',
        subName: 'High Overall Sensitivity',
        description: 'You are a classic Highly Sensitive Person (HSP). Your nervous system processes every sight, sound, and emotion at a fundamentally deeper level than the average person. The world is vivid, but easily overwhelming.',
        color: 'from-rose-400 to-pink-500',
        bgLight: 'bg-rose-50',
        borderLight: 'border-rose-100',
        coreDesire: 'A curated, peaceful environment. You thrive when you have total control over your sensory inputs and can dive deeply into your interests.',
        coreFear: 'Sensory overload and forced urgency. Being rushed in a chaotic, loud environment is your ultimate nightmare.',
        pros: ['Rich, beautiful inner world', 'Notices the profound details others miss', 'Extremely conscientious and careful', 'Deeply moved by music and nature', 'Highly creative and visionary'],
        cons: ['Requires significant daily downtime to function', 'Easily startled or overwhelmed by noise/light', 'Highly affected by caffeine, hunger, or lack of sleep', 'Often feels misunderstood by society'],
        traits: {
            sensory: 'Intensely aware; easily overstimulated by the physical environment.',
            empathy: 'High empathy, sometimes leading to emotional flooding.',
            processing: 'Thinks deeply about everything before acting.'
        },
        rechargeMode: 'Total Sensory Deprivation',
        rechargeDesc: 'You require absolute quiet. A dark room, noise-canceling headphones, or a solitary walk in nature is the only way your nervous system resets.',
        environmentalNeeds: 'Low lighting, soft textures, absolute quiet, and total control over interruptions.',
        sensoryTriggers: 'Fluorescent lights, scratchy clothing, strong synthetic perfumes, and sudden loud noises.',
        idealWorkspace: 'A private, soundproofed room or an entirely remote position with asynchronous communication.'
    }
};

export const calculateHspResult = (answers) => {
    const answersArray = Array.isArray(answers) ? answers : Object.values(answers);
    
    // Calculate total score (out of 18 * 7 = 126 max, lowest is 18)
    let totalScore = 0;
    let sensoryScore = 0;
    let empathyScore = 0;
    let processingScore = 0;

    answersArray.forEach(a => {
        totalScore += a.value;
        if (a.type === 'sensory') sensoryScore += a.value;
        if (a.type === 'empathy') empathyScore += a.value;
        if (a.type === 'processing') processingScore += a.value;
    });

    let statusKey = 'GROUNDED';
    
    // Average score per question: Max 7
    const averageScore = totalScore / 18;

    if (averageScore >= 5.5) {
        statusKey = 'DEEP';
    } else if (averageScore >= 4.5) {
        // High score, let's see if it's more empathy or sensory/processing
        if (empathyScore > sensoryScore && empathyScore > processingScore) {
            statusKey = 'EMPATHETIC';
        } else {
            statusKey = 'DEEP';
        }
    } else if (averageScore >= 3.2) {
        statusKey = 'BALANCED';
    } else {
        statusKey = 'GROUNDED';
    }

    // Breakdown Percentages (Max score for each section is 6 * 7 = 42)
    const sensoryPercent = Math.min(Math.round(((sensoryScore - 6) / 36) * 100), 100);
    const empathyPercent = Math.min(Math.round(((empathyScore - 6) / 36) * 100), 100);
    const processingPercent = Math.min(Math.round(((processingScore - 6) / 36) * 100), 100);

    return {
        statusKey,
        fullTitle: statusKey.toLowerCase(),
        info: hspStatuses[statusKey],
        breakdown: {
            sensoryPercent: Math.max(0, sensoryPercent),
            empathyPercent: Math.max(0, empathyPercent),
            processingPercent: Math.max(0, processingPercent)
        }
    };
};
