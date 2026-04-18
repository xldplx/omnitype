export const burnoutTestQuestions = [
    { id: 1, text: "I feel physically exhausted before the day has even truly begun.", type: "physical" },
    { id: 2, text: "I have difficulty remembering short-term tasks or concentrating on complex problems.", type: "cognitive" },
    { id: 3, text: "I feel a constant, low-level anxiety that I am forgetting something important.", type: "nervous" },
    { id: 4, text: "I find myself feeling numb or detached from activities I used to care about.", type: "nervous" },
    { id: 5, text: "My body aches or feels unusually heavy even when I haven't done physical labor.", type: "physical" },
    { id: 6, text: "I make careless mistakes at work or in daily life because my brain feels 'foggy'.", type: "cognitive" },
    { id: 7, text: "I react with disproportionate frustration or anger to small inconveniences.", type: "nervous" },
    { id: 8, text: "I often cancel social plans at the last minute because I have zero energy.", type: "physical" },
    { id: 9, text: "Reading a book or watching a complex movie feels like too much mental effort.", type: "cognitive" },
    { id: 10, text: "I feel like I am constantly 'running on empty' or purely on adrenaline.", type: "nervous" },
    { id: 11, text: "I struggle to fall asleep or stay asleep despite feeling deeply exhausted.", type: "physical" },
    { id: 12, text: "I frequently lose my train of thought while speaking.", type: "cognitive" },
    { id: 13, text: "I feel a strong urge to isolate myself and avoid any demands from others.", type: "nervous" },
    { id: 14, text: "My immune system feels weak (e.g., getting sick often, lingering colds).", type: "physical" },
    { id: 15, text: "Making simple decisions (like what to eat for dinner) feels overwhelming.", type: "cognitive" },
    { id: 16, text: "I physically brace myself or clench my jaw when my phone rings or vibrates.", type: "nervous" },
    { id: 17, text: "I rely heavily on caffeine or sugar just to maintain a baseline level of functioning.", type: "physical" },
    { id: 18, text: "I feel a profound sense of 'why bother?' regarding my goals and future.", type: "cognitive" }
];

export const burnoutStatuses = {
    'REGULATED': {
        id: 'regulated',
        name: 'The Regulated System',
        subName: 'Healthy Baseline',
        description: 'Your nervous system and energy reserves are in a healthy, regulated state. You might experience normal daily tiredness, but you are not currently suffering from systemic burnout.',
        color: 'from-emerald-400 to-teal-500',
        bgLight: 'bg-emerald-50',
        borderLight: 'border-emerald-100',
        coreDesire: 'Continued growth and sustainable balance.',
        coreFear: 'Losing your current healthy rhythm to unexpected chaos.',
        pros: ['High resilience to daily stress', 'Clear cognitive processing and decision making', 'Healthy sleep and recovery cycles', 'Emotional availability for friends and family', 'Consistent physical energy'],
        cons: ['May underestimate the burnout levels of colleagues', 'Might take on too much out of a sense of capability', 'Needs to actively protect this baseline'],
        traits: {
            physical: 'You wake up feeling relatively rested most days.',
            cognitive: 'Your mind is clear and capable of sustained focus.',
            nervous: 'Your nervous system feels safe, allowing you to relax easily.'
        },
        recoveryPath: 'Maintenance & Prevention',
        recoveryDesc: 'Your goal is to maintain this state. Continue your current routines but begin auditing your calendar to say "no" to future obligations that don\'t serve you.',
        warningSigns: 'Feeling unusually irritated when someone asks you for a small favor; hitting snooze multiple times.',
        energyDrain: 'Taking on the emotional baggage of those around you who are burning out.',
        restType: 'Creative Rest'
    },
    'ADRENALINE': {
        id: 'adrenaline',
        name: 'Adrenaline Fatigue',
        subName: 'The "Wired and Tired" State',
        description: 'You are operating in a state of high-functioning anxiety. Your nervous system is stuck in "Fight or Flight," using adrenaline and cortisol to push through exhaustion. You feel wired, anxious, but completely physically depleted.',
        color: 'from-amber-400 to-orange-500',
        bgLight: 'bg-amber-50',
        borderLight: 'border-amber-100',
        coreDesire: 'To finally step off the treadmill and let your guard down without everything collapsing.',
        coreFear: 'Stopping. You fear that if you slow down even for a day, the exhaustion will catch up and you won\'t be able to start again.',
        pros: ['Extremely high output (for now)', 'Hyper-vigilant and rarely misses a deadline', 'Appears highly successful to the outside world'],
        cons: ['Chronically elevated cortisol', 'Inability to sleep deeply despite exhaustion', 'Irritability and a short temper', 'Close to a complete system crash'],
        traits: {
            physical: 'Tense muscles, reliance on caffeine, poor sleep quality.',
            cognitive: 'Racing thoughts, hyper-focus on stressors, difficulty unwinding.',
            nervous: 'Stuck in sympathetic arousal (Fight/Flight).'
        },
        recoveryPath: 'Nervous System Down-Regulation',
        recoveryDesc: 'You must signal to your body that it is safe to stop running. High-intensity workouts will only worsen this; you need restorative yoga, deep breathing, and to drastically cut caffeine.',
        warningSigns: 'Waking up at 3 AM with your heart racing; snapping at loved ones over minor inconveniences.',
        energyDrain: 'The constant internal pressure and false urgency you place on every single task.',
        restType: 'Physical & Mental Rest'
    },
    'FREEZE': {
        id: 'freeze',
        name: 'Functional Freeze',
        subName: 'The "Stuck" State',
        description: 'Your nervous system has bypassed "Fight or Flight" and gone straight into "Freeze." You are functional enough to survive the day, but you feel emotionally numb, disconnected, and chronically unmotivated.',
        color: 'from-indigo-400 to-purple-500',
        bgLight: 'bg-indigo-50',
        borderLight: 'border-indigo-100',
        coreDesire: 'To feel a genuine sense of joy, interest, or "spark" again.',
        coreFear: 'That this emotional numbness is permanent.',
        pros: ['Can endure long periods of monotony', 'Rarely gets outwardly angry or explosive', 'Highly resilient to further external shocks'],
        cons: ['Profound sense of apathy and "why bother?"', 'Complete loss of creative or passionate drives', 'Heavy procrastination and task avoidance', 'Social isolation'],
        traits: {
            physical: 'A sense of physical heaviness or lethargy.',
            cognitive: 'Brain fog, dissociation, scrolling paralysis.',
            nervous: 'Stuck in dorsal vagal shutdown (Freeze).'
        },
        recoveryPath: 'Gentle Activation',
        recoveryDesc: 'You cannot jump straight back into high productivity. You need tiny, low-stakes wins to "thaw" the freeze. Moving your body gently (like a 10-minute walk) and completing micro-tasks is the way out.',
        warningSigns: 'Spending hours mindlessly scrolling without realizing it; staring at your inbox without opening emails.',
        energyDrain: 'A deep sense of overwhelm and a lack of clear, manageable priorities.',
        restType: 'Emotional & Social Rest'
    },
    'CHRONIC': {
        id: 'chronic',
        name: 'Chronic Burnout',
        subName: 'Total System Depletion',
        description: 'You are experiencing severe, multi-layered burnout. Your physical, cognitive, and nervous systems are completely depleted. You are running on less than zero, and your body is demanding a hard reset.',
        color: 'from-rose-500 to-red-600',
        bgLight: 'bg-rose-50',
        borderLight: 'border-rose-100',
        coreDesire: 'Total rest. Six months on a quiet island with absolutely zero demands or responsibilities.',
        coreFear: 'That you will never regain the energy and cognitive sharpness you used to have.',
        pros: ['Forces a necessary re-evaluation of life priorities', 'You are acutely aware of your absolute limits', 'Zero tolerance for unnecessary BS'],
        cons: ['Severe physical fatigue and compromised immunity', 'Inability to perform basic executive functions', 'High risk of clinical depression if left unaddressed', 'Requires significant time and intervention to heal'],
        traits: {
            physical: 'Deep cellular exhaustion, frequent illness or pain.',
            cognitive: 'Severe memory issues, inability to make simple decisions.',
            nervous: 'Completely dysregulated; alternating between panic and total numbness.'
        },
        recoveryPath: 'Radical Rest & Medical Intervention',
        recoveryDesc: 'You require a complete cessation of non-essential duties. This is a medical-grade exhaustion. You must prioritize sleep, nutrition, and professional support above all else.',
        warningSigns: 'Getting sick frequently; feeling a sense of dread when waking up; inability to remember recent conversations.',
        energyDrain: 'Prolonged exposure to a toxic or misaligned environment without any chance for recovery.',
        restType: 'Sensory & Complete Rest'
    }
};

export const calculateBurnoutResult = (answers) => {
    const answersArray = Array.isArray(answers) ? answers : Object.values(answers);
    
    // Calculate total score (out of 18 * 7 = 126 max, lowest is 18)
    let totalScore = 0;
    let physicalScore = 0;
    let cognitiveScore = 0;
    let nervousScore = 0;

    answersArray.forEach(a => {
        totalScore += a.value;
        if (a.type === 'physical') physicalScore += a.value;
        if (a.type === 'cognitive') cognitiveScore += a.value;
        if (a.type === 'nervous') nervousScore += a.value;
    });

    let statusKey = 'REGULATED';
    
    // Average score per question: Max 7
    const averageScore = totalScore / 18;

    if (averageScore >= 5.5) {
        statusKey = 'CHRONIC';
    } else if (averageScore >= 4.0) {
        // Look at the breakdown
        if (nervousScore > physicalScore && nervousScore > cognitiveScore) {
            statusKey = 'ADRENALINE';
        } else if (cognitiveScore > physicalScore && cognitiveScore > nervousScore) {
            statusKey = 'FREEZE';
        } else {
            statusKey = 'CHRONIC'; // If physical is highest or tied, it's pretty severe
        }
    } else if (averageScore >= 3.0) {
        // Mild burnout, lean towards Freeze or Adrenaline based on traits
        if (nervousScore > cognitiveScore) {
            statusKey = 'ADRENALINE';
        } else {
            statusKey = 'FREEZE';
        }
    } else {
        statusKey = 'REGULATED';
    }

    // Breakdown Percentages (Max score for each section is 6 * 7 = 42)
    const physicalPercent = Math.min(Math.round(((physicalScore - 6) / 36) * 100), 100);
    const cognitivePercent = Math.min(Math.round(((cognitiveScore - 6) / 36) * 100), 100);
    const nervousPercent = Math.min(Math.round(((nervousScore - 6) / 36) * 100), 100);

    return {
        statusKey,
        fullTitle: statusKey.toLowerCase(),
        info: burnoutStatuses[statusKey],
        breakdown: {
            physicalPercent: Math.max(0, physicalPercent),
            cognitivePercent: Math.max(0, cognitivePercent),
            nervousPercent: Math.max(0, nervousPercent)
        }
    };
};
