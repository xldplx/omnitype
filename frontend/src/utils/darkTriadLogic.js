export const darkTriadTestQuestions = [
    { id: 1, text: "I tend to manipulate others to get what I want.", type: "machiavellianism" },
    { id: 2, text: "I believe I am inherently more important or talented than most people.", type: "narcissism" },
    { id: 3, text: "I rarely feel remorse or guilt if my actions hurt someone else.", type: "psychopathy" },
    { id: 4, text: "I believe that to succeed, you sometimes have to deceive people.", type: "machiavellianism" },
    { id: 5, text: "I expect others to grant me special favors because of who I am.", type: "narcissism" },
    { id: 6, text: "I can be cold and calculating if a situation requires it.", type: "psychopathy" },
    { id: 7, text: "I keep track of information that I can use against people later if necessary.", type: "machiavellianism" },
    { id: 8, text: "I get frustrated when I am not the center of attention in a room.", type: "narcissism" },
    { id: 9, text: "I enjoy taking reckless risks just for the thrill of it.", type: "psychopathy" },
    { id: 10, text: "I believe that flattery is a useful tool to control others.", type: "machiavellianism" },
    { id: 11, text: "I am preoccupied with fantasies of immense success, power, or beauty.", type: "narcissism" },
    { id: 12, text: "I often act impulsively without considering the long-term consequences.", type: "psychopathy" },
    { id: 13, text: "I think it's better to be feared than loved in a leadership position.", type: "machiavellianism" },
    { id: 14, text: "I strongly resent it when others achieve something I feel I deserve.", type: "narcissism" },
    { id: 15, text: "I find it easy to emotionally detach myself from chaotic or tragic situations.", type: "psychopathy" },
    { id: 16, text: "I am careful not to reveal my true motives unless it benefits me.", type: "machiavellianism" },
    { id: 17, text: "I feel that typical societal rules and norms don't necessarily apply to me.", type: "narcissism" },
    { id: 18, text: "I have used charm or charisma to exploit someone else for personal gain.", type: "psychopathy" }
];

export const darkTriadStatuses = {
    'LIGHT': {
        id: 'light',
        name: 'The Genuine Friend',
        subName: 'Low Shadow Traits',
        description: 'You scored very low on the dark traits. You believe in being honest, playing fair, and building real connections with people. You do not like playing mind games to get what you want.',
        color: 'from-zinc-400 to-slate-500',
        bgLight: 'bg-slate-50',
        borderLight: 'border-slate-200',
        coreDesire: 'Authentic relationships and a clear conscience.',
        coreFear: 'Being forced into a situation where you must compromise your integrity.',
        pros: ['Highly trustworthy and reliable', 'Forms deep, genuine emotional bonds', 'Strong moral compass', 'Does not exploit others in vulnerable moments'],
        cons: ['Can be naive to the malicious intentions of others', 'May struggle in highly cutthroat corporate environments', 'Can be easily taken advantage of by manipulative people'],
        socialLeverage: 'Sincere Teamwork',
        blindspot: 'Assuming everyone else is as honest as you are, which can leave you exposed to being used.',
        darkCore: 'Almost non-existent. You prefer hard work over taking shady shortcuts.',
        relationshipStyle: 'Open Book. You say what you mean and you mean what you say.',
        hiddenStrength: 'People naturally trust you, which builds long-lasting, unbreakable loyalty.'
    },
    'NARCISSIST': {
        id: 'narcissist',
        name: 'The Spotlight Seeker',
        subName: 'Ego-Driven Traits',
        description: 'You have a very strong belief in your own special abilities. While this massive self-confidence can help you achieve great things, it also means you constantly crave praise and attention from others to feel good about yourself.',
        color: 'from-amber-500 to-rose-600',
        bgLight: 'bg-rose-50',
        borderLight: 'border-rose-200',
        coreDesire: 'To be recognized, admired, and universally acknowledged as the absolute best.',
        coreFear: 'Being ordinary, ignored, or publicly embarrassed.',
        pros: ['Incredible self-confidence and charisma', 'Fearless in pursuing massive goals', 'Can inspire and captivate large audiences', 'Highly resilient to initial rejection'],
        cons: ['Requires constant praise to maintain self-esteem', 'Prone to envy or resentment of others\' success', 'Can overlook the needs or feelings of partners', 'Struggles with taking constructive criticism'],
        socialLeverage: 'Charm and Showing Off',
        blindspot: 'Failing to realize when people are just agreeing with you because they are tired of arguing, rather than actually admiring you.',
        darkCore: 'Protecting the Ego. Your darker behaviors usually come out when you feel insulted or ignored.',
        relationshipStyle: 'The Star and the Audience. You often need partners who are willing to admire and support you constantly.',
        hiddenStrength: 'Incredible charisma and the ability to bounce back quickly from failure by protecting your ego.'
    },
    'MACHIAVELLIAN': {
        id: 'machiavellian',
        name: 'The Strategic Mastermind',
        subName: 'Highly Calculating',
        description: 'You treat social situations like a game of chess. You are highly strategic, rarely let your emotions take over, and are perfectly willing to use flattery, secrets, or leverage to make sure you win.',
        color: 'from-indigo-600 to-zinc-800',
        bgLight: 'bg-zinc-100',
        borderLight: 'border-zinc-300',
        coreDesire: 'Power, control, and absolute strategic advantage.',
        coreFear: 'Being outsmarted or losing leverage over a situation.',
        pros: ['Exceptional at navigating office politics', 'Rarely acts out of pure emotional impulse', 'Highly persuasive and socially adaptable', 'Always has a backup plan'],
        cons: ['Struggles to form truly vulnerable, trusting relationships', 'Can be deeply cynical about human nature', 'May burn important bridges if the math says it\'s worth it', 'Views people as tools rather than individuals'],
        socialLeverage: 'Controlling Information and Calculated Flattery',
        blindspot: 'Underestimating the power of real, uncalculated human loyalty. Not everything is a transaction.',
        darkCore: 'Pure Strategy. You do not hurt people for fun; you just do what is necessary to get ahead.',
        relationshipStyle: 'Transactional. You tend to view relationships based on what practical value the person brings to your life.',
        hiddenStrength: 'Unshakable focus and the ability to stay totally calm and rational during chaotic emotional drama.'
    },
    'PSYCHOPATHIC': {
        id: 'psychopathic',
        name: 'The Fearless Risk-Taker',
        subName: 'High Thrill-Seeking',
        description: 'You have an unusually high tolerance for risk and a noticeable lack of fear. You do not easily feel guilt or anxiety, which allows you to make brutal, split-second decisions without losing any sleep over it.',
        color: 'from-red-600 to-black',
        bgLight: 'bg-red-50',
        borderLight: 'border-red-200',
        coreDesire: 'Absolute freedom, excitement, and the absence of rules.',
        coreFear: 'Boredom, physical confinement, or being controlled by another person.',
        pros: ['Immune to panic in high-stress or dangerous situations', 'Can make painful, necessary decisions instantly', 'Highly charming when making first impressions', 'Does not suffer from anxiety or guilt'],
        cons: ['High impulsivity and reckless behavior', 'Inability to truly care about others\' suffering', 'Prone to burning through relationships quickly', 'Can easily cross legal or ethical lines without a second thought'],
        socialLeverage: 'Quick Charm and Intimidation',
        blindspot: 'Ignoring the long-term consequences of your actions because you are too focused on the immediate thrill.',
        darkCore: 'Impulse and Excitement. Your darker behaviors stem from simply wanting to see what happens next, regardless of the rules.',
        relationshipStyle: 'Fast and Fleeting. You get bored easily and may move on quickly when the initial excitement fades.',
        hiddenStrength: 'Total immunity to panic. You are icy cool in extreme emergencies where everyone else freezes up.'
    },
    'DARK_TRIAD': {
        id: 'dark_triad',
        name: 'The Shadow Operator',
        subName: 'High Across All Traits',
        description: 'You scored highly across the board. You combine the massive ego of the Spotlight Seeker, the cold strategy of the Mastermind, and the fearless rule-breaking of the Risk-Taker. You are a formidable force, but a dangerous one.',
        color: 'from-zinc-900 to-black',
        bgLight: 'bg-zinc-200',
        borderLight: 'border-zinc-400',
        coreDesire: 'Total dominance and untouchable supremacy.',
        coreFear: 'Vulnerability and losing absolute control.',
        pros: ['Unstoppable drive and ambition', 'Can manipulate systems and people with frightening ease', 'Zero hesitation in cutting out obstacles', 'Projects an aura of absolute authority'],
        cons: ['Relationships are entirely based on what you can get from them', 'High risk of a spectacular downfall if outmaneuvered', 'Inability to experience genuine, peaceful joy', 'Leaves a trail of collateral damage'],
        socialLeverage: 'The Full Toolkit: Charm, Fear, and Leverage',
        blindspot: 'Believing you are totally invincible. If you push people too far, they will eventually team up against you.',
        darkCore: 'Total Supremacy. You seamlessly blend ego, strategy, and ruthlessness to get exactly what you want.',
        relationshipStyle: 'Dominant. You must be in absolute control of the relationship dynamic at all times.',
        hiddenStrength: 'An unstoppable drive to succeed and the ability to completely bypass normal emotional barriers that stop regular people.'
    }
};

export const calculateDarkTriadResult = (answers) => {
    const answersArray = Array.isArray(answers) ? answers : Object.values(answers);
    
    let totalScore = 0;
    let machScore = 0;
    let narcScore = 0;
    let psychScore = 0;

    answersArray.forEach(a => {
        totalScore += a.value;
        if (a.type === 'machiavellianism') machScore += a.value;
        if (a.type === 'narcissism') narcScore += a.value;
        if (a.type === 'psychopathy') psychScore += a.value;
    });

    let statusKey = 'LIGHT';
    
    const averageScore = totalScore / 18;

    // Thresholds: out of 42 max per category (6 questions * 7 max score)
    const highThreshold = 28; // Average of ~4.6+ per question
    
    const isMachHigh = machScore >= highThreshold;
    const isNarcHigh = narcScore >= highThreshold;
    const isPsychHigh = psychScore >= highThreshold;

    if (isMachHigh && isNarcHigh && isPsychHigh) {
        statusKey = 'DARK_TRIAD';
    } else if (isMachHigh && machScore >= narcScore && machScore >= psychScore) {
        statusKey = 'MACHIAVELLIAN';
    } else if (isNarcHigh && narcScore >= machScore && narcScore >= psychScore) {
        statusKey = 'NARCISSIST';
    } else if (isPsychHigh && psychScore >= machScore && psychScore >= narcScore) {
        statusKey = 'PSYCHOPATHIC';
    } else if (averageScore >= 3.5) {
        // Moderate scores, find the highest
        if (machScore >= narcScore && machScore >= psychScore) statusKey = 'MACHIAVELLIAN';
        else if (narcScore >= machScore && narcScore >= psychScore) statusKey = 'NARCISSIST';
        else statusKey = 'PSYCHOPATHIC';
    } else {
        statusKey = 'LIGHT';
    }

    const machPercent = Math.min(Math.round(((machScore - 6) / 36) * 100), 100);
    const narcPercent = Math.min(Math.round(((narcScore - 6) / 36) * 100), 100);
    const psychPercent = Math.min(Math.round(((psychScore - 6) / 36) * 100), 100);

    return {
        statusKey,
        fullTitle: statusKey.toLowerCase(),
        info: darkTriadStatuses[statusKey],
        breakdown: {
            machPercent: Math.max(0, machPercent),
            narcPercent: Math.max(0, narcPercent),
            psychPercent: Math.max(0, psychPercent)
        }
    };
};
