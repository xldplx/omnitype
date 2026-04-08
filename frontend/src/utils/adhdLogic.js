export const adhdTestQuestions = [
    { id: 1, text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?", type: "inattention" },
    { id: 2, text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?", type: "inattention" },
    { id: 3, text: "How often do you have problems remembering appointments or obligations?", type: "inattention" },
    { id: 4, text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?", type: "inattention" },
    { id: 5, text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?", type: "hyperactivity" },
    { id: 6, text: "How often do you feel overly active and compelled to do things, as if you were driven by a motor?", type: "hyperactivity" },
    { id: 7, text: "How often do you make careless mistakes when you have to work on a boring or difficult project?", type: "inattention" },
    { id: 8, text: "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?", type: "inattention" },
    { id: 9, text: "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?", type: "inattention" },
    { id: 10, text: "How often do you misplace or have difficulty finding things at home or at work?", type: "inattention" },
    { id: 11, text: "How often are you distracted by activity or noise around you?", type: "inattention" },
    { id: 12, text: "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?", type: "hyperactivity" },
    { id: 13, text: "How often do you feel restless or fidgety?", type: "hyperactivity" },
    { id: 14, text: "How often do you have difficulty unwinding and relaxing when you have time to yourself?", type: "hyperactivity" },
    { id: 15, text: "How often do you find yourself talking too much when you are in social situations?", type: "hyperactivity" },
    { id: 16, text: "When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?", type: "impulsivity" },
    { id: 17, text: "How often do you have difficulty waiting your turn in situations when turn taking is required?", type: "impulsivity" },
    { id: 18, text: "How often do you interrupt others when they are busy?", type: "impulsivity" },
];

export const adhdStatuses = {
    'UNLIKELY': {
        name: 'You likely don\'t have ADHD',
        subName: 'A High-Structure Mindset',
        description: 'Your mind operates with a remarkable level of internal order. You rarely find yourself fighting against your own attention span, and you have a natural talent for staying on track even when the work is tedious.',
        color: 'from-emerald-400 to-teal-500',
        bgLight: 'bg-emerald-50',
        borderLight: 'border-emerald-100',
        coreDesire: 'Steady & Predictable Progress. You thrive when the path ahead is clearly mapped and the benchmarks for success are objective and reachable.',
        coreFear: 'Unstructured Chaos. You are deeply unsettled by environments where rules are fluid or where your time is not respected by others\' lack of planning.',
        pros: ['Exceptional follow-through on complex projects', 'Natural at scheduling and long-term planning', 'High emotional stability under boring conditions', 'Deep focus on routine and administrative tasks', 'Clear mental filing system for technical data', 'Reliable time management and punctuality', 'Physical calmness in stressful situations', 'Consistency over long periods of time'],
        cons: ['Difficulty with sudden, unplanned changes', 'Can be perceived as overly rigid or inflexible', 'Sometimes misses the "big picture" creative sparks', 'Struggles with messy brainstorming sessions', 'May judge others\' "chaos" too harshly', 'Over-reliance on lists to feel secure', 'Slow to pivot strategy when a plan fails'],
        dopamineStyle: 'The Steady Burner',
        dopamineDesc: 'You don\'t need high-intensity "sparks" to get started. You find motivation in the satisfaction of completion and the steady rhythm of a productive day.',
        hyperfocus: 'Methodical Deep Focus',
        hyperfocusDesc: 'Your focus is like a laser—once turned on, it stays on until the task is logically finished, without draining your energy reserves.',
        mbti: ['ISTJ', 'ESTJ', 'INTJ', 'ENTJ'],
        careers: ['Data Architecture', 'Project Engineering', 'Strategic Logistics', 'Financial Management'],
        socialStyle: 'The Anchored Communicator. You speak with precision and expect others to be direct and organized in their thoughts.',
        energy: 'Regulated & Consistent'
    },
    'POSSIBLE': {
        name: 'You might have ADHD patterns',
        subName: 'The Adaptive Thinker',
        description: 'You sit in the middle ground of cognitive styles. While your brain usually stays in gear, you have "sparks" of neurodivergent energy—especially when you\'re tired, stressed, or excited about a new idea.',
        color: 'from-sky-400 to-indigo-500',
        bgLight: 'bg-sky-50',
        borderLight: 'border-sky-100',
        coreDesire: 'Mental Versatility & Balance. You want to be able to switch between high-intensity creative work and structured execution without feeling burnt out.',
        coreFear: 'Losing Your Mental Edge. You worry that if you don\'t find the right balance, your brain will start "glitching" under the weight of modern digital static.',
        pros: ['Can adapt to almost any work environment', 'Good at "MacGyvering" solutions in the moment', 'Balanced energy levels for 8-hour work days', 'Creatively brilliant when truly inspired', 'Empathetic and grounded listener', 'Relatable to both neurotypical and neurodivergent types', 'Handles multi-tasking moderately well', 'Good at bridging the gap between teams'],
        cons: ['Situationally forgetful when distracted', 'Highly vulnerable to "Digital Fatigue"', 'Struggles significantly when sleep-deprived', 'Easily distracted by phone/web notifications', 'Low tolerance for meetings without clear value', 'Bouts of indecisiveness in over-stimulated rooms', 'Occasional "Brain Fog" during transitions'],
        dopamineStyle: 'The Situational Seeker',
        dopamineDesc: 'You need a "why" to work. If a task feels meaningful or high-stakes, your dopamine kicks in and you can out-perform almost anyone.',
        hyperfocus: 'Inspiration-Driven Flow',
        hyperfocusDesc: 'You enter flow states selectively. It usually requires a quiet room and an "Aha!" moment to truly submerge yourself.',
        mbti: ['INFJ', 'ESFJ', 'ISFJ', 'ENFJ'],
        careers: ['User Experience Design', 'Clinical Counseling', 'Creative Operations', 'Market Research'],
        socialStyle: 'The Attuned Mediator. You are highly aware of social cues and adapt your energy to match the person you are talking to.',
        energy: 'Fluctuating but Controllable'
    },
    'LIKELY': {
        name: 'You likely have ADHD',
        subName: 'A High-Velocity Engine',
        description: 'Everything about your cognitive profile points to a high-speed, high-entropy brain. You likely live in a world of constant mental motion where ideas arrive faster than you can sort them.',
        color: 'from-orange-500 to-rose-500',
        bgLight: 'bg-orange-50',
        borderLight: 'border-orange-100',
        coreDesire: 'Constant Novelty & Discovery. You are fueled by the "new"—new places, new people, and new technical concepts keep your brain alive.',
        coreFear: 'Being Trapped in Monotony. The prospect of a repetitive, predictable lifestyle feels like mental suffocation to you.',
        pros: ['Lightning-fast ideation and brainstorming', 'Brilliant and decisive in a crisis', 'Can connect unrelated concepts naturally', 'Boundless creative energy when interested', 'Deep natural empathy for "outsiders"', 'Fearless risk-taking in ventures', 'Master of the "side-hustle" mindset', 'Highly intuitive gut reactions'],
        cons: ['Extremely difficult to start boring tasks', 'The "Wall of Awful" effect during execution', 'Frequent and intense "Time Blindness"', 'Constant mental restlessness and pacing', 'Misplacing keys, phones, and physical objects', 'Interrupting others out of pure excitement', 'Intense self-criticism for perceived "laziness"'],
        dopamineStyle: 'The Novelty Hunter',
        dopamineDesc: 'Your brain is "Dopamine-Hungry." You are naturally attracted to new apps, projects, and hobbies because they provide the chemical fuel your brain needs.',
        hyperfocus: 'The Deep Dive',
        hyperfocusDesc: 'When you are interested, the rest of the world disappears. You can become a world-class expert on a niche topic in a single 48-hour "rabbit hole."',
        mbti: ['ENFP', 'ENTP', 'INFP', 'INTP'],
        careers: ['Founding / Entrepreneurship', 'Investigative Journalism', 'Rapid Prototyping', 'Emergency Medicine'],
        socialStyle: 'The Tangent Master. Your conversations are wide-ranging and enthusiastic, often jumping between five topics at once.',
        energy: 'High Voltage / Low Range'
    },
    'FULLY': {
        name: 'You definitely have ADHD patterns',
        subName: 'The Kinetic Visionary',
        description: 'Your brain is built for a different world—one of high-intensity action and complex problem solving. Standard routine feels like physical pain to you because your mind is wired for "The Spark."',
        color: 'from-amber-400 to-red-600',
        bgLight: 'bg-amber-50',
        borderLight: 'border-amber-100',
        coreDesire: 'Maximum Stimulation & Impact. You want to see immediate results and work in environments where every second counts.',
        coreFear: 'Stagnation & Rules. You despise bureaucratic red tape that slows down your natural speed of execution.',
        pros: ['Incredible lateral thinking and problem solving', 'Unstoppable when motivated by a mission', 'Magnetic, high-energy presence in any room', 'Sees patterns and risks others completely miss', 'Total resilience to failure and setbacks', 'Rapid learning of complex, moving systems', 'Extreme "survivalist" intuition', 'Zero filter for dishonesty or BS'],
        cons: ['Severe and chronic executive dysfunction', 'Chronic procrastination followed by panic', 'Immense difficulty finishing the last 10% of tasks', 'Intense emotional sensitivity (RSD)', 'Struggles with traditional 9-to-5 desk work', 'Impulse spending or life-altering decisions', 'Frequent and heavy mental burnout cycles'],
        dopamineStyle: 'The Adrenaline Jumper',
        dopamineDesc: 'You thrive on deadlines and high-stakes pressure. You might wait until the last minute because that "Emergency Adrenaline" is the only thing that unlocks you.',
        hyperfocus: 'Total Submersion',
        hyperfocusDesc: 'Your hyperfocus is a superpower. You don\'t just work; you merge with the task until it\'s conquered, often forgetting to eat or sleep.',
        mbti: ['ENFP', 'ENTP', 'ESFP', 'ESTP'],
        careers: ['Live Production', 'Crisis Management', 'Specialized Creative Direction', 'Stock Trading'],
        socialStyle: 'The Electric Catalyst. You inspire others with your raw energy and directness, often becoming the life of the party.',
        energy: 'Unpredictable Lightning'
    },
    'ATTENTIVE': {
        name: 'You likely have Inattentive ADHD',
        subName: 'The Internal Voyager',
        description: 'While you may look calm on the outside, your mind is a 24/7 carnival of thoughts, daydreams, and connections. Your ADHD is purely internal, often manifesting as a "fog" or a rich inner world.',
        color: 'from-purple-500 to-indigo-600',
        bgLight: 'bg-purple-50',
        borderLight: 'border-purple-100',
        coreDesire: 'Interior Clarity & Peace. You seek a world where you can explore your thoughts without external sensory overwhelm.',
        coreFear: 'Mental Static & Boredom. You feel trapped when forced to pay attention to surface-level details while your mind wants to go deep.',
        pros: ['Deep abstract intelligence and pattern spotting', 'High creative sensitivity and emotional depth', 'Excellent writing and non-verbal communication', 'Gentle, observant, and non-judgmental nature', 'Rich, cinematic imagination and world-building', 'Strong moral compass and internal values', 'Unique philosophical perspective on life', 'Hidden, immense intellectual depth'],
        cons: ['Frequently "zones out" during long conversations', 'Slow to process and execute verbal instructions', 'Chronic "Brain Fog" that hinders output', 'Deep avoidance of social overwhelm', 'Internalizing stress as physical fatigue', 'Struggles with messy or disorganized data', 'Immense difficulty with the "starting" phase'],
        dopamineStyle: 'The Quiet Seeker',
        dopamineDesc: 'You seek dopamine through internal exploration—books, movies, and deep thoughts. You aren\'t seeking "louder" stimulation; you\'re seeking "deeper" ones.',
        hyperfocus: 'The Mind Palace',
        hyperfocusDesc: 'You disappear into your thoughts. You can spend hours meticulously planning or imagining a project in your head without ever touching a pen.',
        mbti: ['INFP', 'INTP', 'INFJ', 'ISFP'],
        careers: ['Creative Writing', 'Scientific Research', 'Psychology / Therapy', 'Conceptual Illustration'],
        socialStyle: 'The Gentle Observer. You listen more than you speak, often offering profound insights only when the room goes quiet.',
        energy: 'Low External / Infinite Internal'
    }
};

export const calculateAdhdResult = (answers) => {
    // 1. Calculate Score (ASRS v1.1 Style)
    // Part A (First 6 questions) are higher weight for screening
    const answersArray = Array.isArray(answers) ? answers : Object.values(answers);
    
    const partA = answersArray.filter(a => a.id >= 1 && a.id <= 6);
    
    let aScore = 0;
    partA.forEach(a => { if (a.value >= 5) aScore++; }); // 5, 6, 7 are "Often/Very Often"
    
    let totalScore = 0;
    answersArray.forEach(a => { if (a.value >= 5) totalScore++; });

    // 2. Determine Neural Entropy Tiers
    let statusKey = 'UNLIKELY';
    
    // Logic for result types
    const inattentiveCount = answersArray.filter(a => a.type === 'inattention' && a.value >= 5).length;
    const hyperCount = answersArray.filter(a => a.type === 'hyperactivity' && a.value >= 5).length;
    const impulseCount = answersArray.filter(a => a.type === 'impulsivity' && a.value >= 5).length;

    // Classification
    if (aScore >= 4 || totalScore >= 12) {
        if (inattentiveCount > 6 && hyperCount <= 4) {
            statusKey = 'ATTENTIVE';
        } else if (totalScore >= 16) {
            statusKey = 'FULLY';
        } else {
            statusKey = 'LIKELY';
        }
    } else if (totalScore >= 6) {
        statusKey = 'POSSIBLE';
    }

    // Breakdown Percentages
    const inPercent = Math.min(Math.round((inattentiveCount / 9) * 100), 100);
    const hyperPercent = Math.min(Math.round((hyperCount / 6) * 100), 100);
    const impulsePercent = Math.min(Math.round((impulseCount / 3) * 100), 100);

    return {
        statusKey,
        fullTitle: statusKey.toLowerCase(),
        info: adhdStatuses[statusKey],
        breakdown: {
            inPercent,
            hyperPercent,
            impulsePercent
        }
    };
};
