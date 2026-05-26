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
        subName: 'Integrative Resolution',
        description: 'You scored exceptionally low on primitive, suppressive, or avoidant defenses. Instead of hiding from anxiety or projecting conflict outward, your psyche utilizes the highly mature mechanism of "Sublimation". You actively convert raw emotional volatility, anxiety, and distress into constructive creative expression, somatic outlets, or logical focus.',
        color: 'from-emerald-500 to-teal-600',
        bgLight: 'bg-emerald-50',
        borderLight: 'border-emerald-200',
        coreDesire: 'Authentic processing, somatic integration, and reality-aligned personal evolution.',
        coreFear: 'Becoming emotionally numb, losing somatic awareness, or acting with reactive toxicity.',
        pros: ['Exceptional emotional intelligence and state regulation', 'Transmute dark emotions into beautiful art, hard work, or physical performance', 'Fosters high relational trust and models emotional maturity for others', 'High threshold for sitting with vulnerability and painful truth'],
        cons: ['Prone to "hyper-responsibility," taking on the emotional processing labor for others', 'May struggle to relate to or hold space for highly reactive, defensive individuals'],
        coreTrigger: 'Intense systemic emotional pain, threat of isolation, or existential vulnerability.',
        subconsciousGoal: 'To transmute primal, disruptive survival energy into productive, pro-social, or creative assets.',
        backfireEffect: 'The Productivity Trap. You might accidentally weaponize sublimation by turning all your grief, grief-work, and sadness into "productivity metrics," denying yourself the simple right to collapse and rest.',
        cognitiveLoad: 'Low to Moderate. Your mind processes emotional events near real-time, preventing the accumulation of cognitive debt.',
        nervousSystemStatus: 'Regulated & Ventral Vagal. Your physiology defaults to active engagement and social connection even under stress.',
        growthPathway: 'Ventral Rest. Practice the art of doing nothing with your pain. Let yourself feel sad or angry without the immediate urge to create, write, paint, or work it off.'
    },
    'LOGIC': {
        id: 'logic',
        name: 'The Logic Shield',
        subName: 'Hyper-Intellectualization',
        description: 'When the emotional landscape gets chaotic, your mind builds an impenetrable fortress of pure intellect. You unconsciously strip the somatic raw feeling out of painful events, translating overwhelming emotional threat into structured theories, fascinating data, and historical analysis to avoid the actual discomfort of feeling.',
        color: 'from-sky-500 to-blue-600',
        bgLight: 'bg-sky-50',
        borderLight: 'border-sky-200',
        coreDesire: 'Total systemic stability, predictability, and emotional insulation.',
        coreFear: 'Being entirely overwhelmed by raw, irrational feelings and losing logical control.',
        pros: ['Remarkable composure and objectivity in high-intensity emergencies', 'Deeply analytical approach to mapping and solving personal blockages', 'Excellent mediator because you do not get infected by raw emotional charge', 'Highly articulate in explaining the intellectual source of distress'],
        cons: ['Perceived as cold, detached, or clinical by relational partners', 'Suppresses deep somatic grief, which stores as chronic physical tension', 'Delays emotional resolution indefinitely by analyzing instead of integrating'],
        coreTrigger: 'Situations involving profound somatic vulnerability, shame, or sudden grief.',
        subconsciousGoal: 'To sever the cognitive brain from the raw, unpredictable nervous system, believing that if you can define the pain, it cannot hurt you.',
        backfireEffect: 'The Emotional Debt. Because you only explain your pain instead of somatic processing, the emotional debt accumulates in your body, often presenting as chronic fatigue, sudden panic attacks, or unexplained physical tightness.',
        cognitiveLoad: 'Very High. The brain runs constant background subroutines to translate raw bodily distress into verbal frameworks.',
        nervousSystemStatus: 'Functional Freeze (High Alert). You appear perfectly calm on the surface, but your body is locked in a high-alert intellectual state.',
        growthPathway: 'Somatic Grounding. Shift from "Why do I feel this?" to "Where is this located in my body?". Practice somatic therapies, breathwork, or simple crying without needing to explain the reason.'
    },
    'DEFLECTOR': {
        id: 'deflector',
        name: 'The Deflector',
        subName: 'Externalized Projection',
        description: 'Your psyche shields you from the intolerable weight of internal shame and inadequacy by actively projecting those traits onto the external environment. It is far safer for your survival circuits to fight an external enemy or criticize someone else\'s shortcomings than to face the raw internal truth of your own imperfections.',
        color: 'from-rose-500 to-red-600',
        bgLight: 'bg-rose-50',
        borderLight: 'border-rose-200',
        coreDesire: 'Absolute preservation of a blameless, flawless, and righteous self-image.',
        coreFear: 'Admitting inherent inadequacy, toxic traits, or moral failure.',
        pros: ['Exceptionally sharp radar for spotting environmental threats and hypocrisy', 'Highly passionate, protective, and energetic in defending personal territory', 'Decisive external action to correct perceived injustices or flaws in others'],
        cons: ['Creates severe relational conflict by projecting internal anger onto partners', 'Inability to take authentic responsibility for mistakes, blocking personal growth', 'Fosters a highly hostile personal reality by populating it with imagined adversaries'],
        coreTrigger: 'Deep-seated shame, acute guilt, or the threat of failure and accusation.',
        subconsciousGoal: 'To export uncomfortable internal toxicity onto others, converting a painful internal self-reflection into a self-righteous external fight.',
        backfireEffect: 'The Hostile Mirror. By constantly accusing partners of the very anger, distrust, or betrayal you secretly harbor, you systematically destroy trust, creating the exact hostile, unsafe relational environment you feared.',
        cognitiveLoad: 'High. Your mind is constantly scanning environment to validate its projected narratives and defend against counter-accusations.',
        nervousSystemStatus: 'Sympathetic Hyper-Arousal (Fight). Your nervous system is mobilized for active conflict, keeping heart rate and muscle tension elevated.',
        growthPathway: 'The Accountability Pause. When you feel a sudden, intense urge to blame or criticize someone, stop and ask: "Is this a trait I am refusing to examine in myself?". Practice the vulnerability of saying: "I made a mistake."'
    },
    'GHOST': {
        id: 'ghost',
        name: 'The Ghost',
        subName: 'Dissociative Avoidance',
        description: 'When emotional threat levels cross your threshold, your nervous system simply pulls the plug. You leverage profound denial, physical escape, and psychological dissociation to ensure you never have to stand and face the source of your anxiety. You disappear into hobbies, scrolling, sleep, or physical isolation.',
        color: 'from-purple-500 to-indigo-600',
        bgLight: 'bg-purple-50',
        borderLight: 'border-purple-200',
        coreDesire: 'Absolute physiological peace, zero demands, and the preservation of energy.',
        coreFear: 'Confrontation, intense emotional friction, and being trapped in uncomfortable expectations.',
        pros: ['Highly independent and self-soothing in isolation', 'Extremely low-friction partner who rarely initiates toxic arguments', 'Adaptable to highly chaotic external variables by simply tuning them out'],
        cons: ['Chronic procrastination that systematically decays long-term goals', 'Causes partners to feel deeply abandoned, isolated, or ignored during crises', 'Minor problems compound into catastrophic failures because they are never addressed'],
        coreTrigger: 'Confrontational demands, deadlines, intense relational expectations, or heavy criticism.',
        subconsciousGoal: 'To escape the immediate visceral, physical discomfort of anxiety by severing connection with the present moment.',
        backfireEffect: 'The Compound Threat. While avoidance gives you immediate, soothing relief, it ensures long-term ruin. The problems you run from grow exponentially larger in the shadow, returning as much more terrifying demands.',
        cognitiveLoad: 'Moderate to High. Significant energy is spent maintaining boundaries of denial and ignoring the compounding pile of responsibilities.',
        nervousSystemStatus: 'Dorsal Vagal Collapse (Flight/Freeze). Your body defaults to low-energy shutdown, slowing metabolism and creating a mental fog.',
        growthPathway: 'Micro-Confrontation. Practice facing tiny, low-friction tasks or conversations instead of running. Set a 5-minute timer to address a feared email. Learn that you can survive the physical sensation of discomfort.'
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
