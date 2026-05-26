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
        subName: 'Low Shadow Density',
        description: 'You scored remarkably low on the dark spectrum. Your psychology is anchored in radical transparency, reciprocal trust, and authentic relational bonds. Rather than treating social interactions as a game of utility, you prioritize alignment of values, emotional resonance, and shared truth.',
        color: 'from-zinc-400 to-slate-500',
        bgLight: 'bg-slate-50',
        borderLight: 'border-slate-200',
        coreDesire: 'Sincere mutual understanding, emotional safety, and a clear, unburdened conscience.',
        coreFear: 'Involuntary complicity in deceit, or being trapped in relationships built on false pretenses.',
        pros: ['Deeply empathetic, creating strong psychological safety for others', 'High conversational integrity and reliability', 'Acts as a natural anchor of moral coherence in groups', 'Builds robust, long-term relational assets based on mutual respect'],
        cons: ['Highly vulnerable to tactical exploitation by predatory actors', 'Struggles with defensive boundaries and saying "no" to manipulative requests', 'May avoid necessary tactical conflicts out of a preference for harmony'],
        socialLeverage: 'Sincere Teamwork & Vulnerability',
        blindspot: 'Naiveté regarding strategic malice. You default to assuming others possess the same internal honesty, leaving you blind to calculating agendas.',
        darkCore: 'Minimal to non-existent. You consistently choose the slow path of merit over the fast path of manipulation.',
        relationshipStyle: 'Transparent & Interdependent. You crave deep intimacy where both parties lay their cards on the table.',
        hiddenStrength: 'Incorruptible trust equity. Because your authenticity is felt immediately, you draw in loyal partners who will defend you fiercely.',
        cognitiveModus: 'Win-Win Reciprocity. You compute actions based on maximizing collective well-being and maintaining emotional equilibrium.',
        exhaustionIndex: 'High-intensity transactional environments where every smile is calculated and authenticity is treated as a weakness.',
        selfCorrection: 'Practice boundaries: realize that not all social spaces warrant full transparency. Develop "strategic skepticism" as a necessary self-defense shield.'
    },
    'NARCISSIST': {
        id: 'narcissist',
        name: 'The Spotlight Seeker',
        subName: 'Ego-Driven Magnificence',
        description: 'Your personality operates on a high-octane drive for distinction and validation. You possess an intense aesthetic appreciation for your own intellect, capability, and talent. To fuel this elite self-image, your psyche actively scans environments for admiration, using charisma to bend the spotlight toward you.',
        color: 'from-amber-400 to-rose-500',
        bgLight: 'bg-rose-50',
        borderLight: 'border-rose-100',
        coreDesire: 'Uncontested admiration, legacy status, and public acknowledgement of exceptionalism.',
        coreFear: 'Irrelevance, being labeled as ordinary, or experiencing public ego-collapse (shame).',
        pros: ['Unmatched visionary energy and infectious confidence', 'Compelling presence capable of leading and inspiring large teams', 'Highly resilient in the face of initial rejection or skepticism', 'Pushes the boundaries of performance to validate personal status'],
        cons: ['Highly sensitive to perceived insults, leading to sudden emotional defensiveness', 'Tends to hog relational airspace, crowding out partner validation', 'Struggles to celebrate the success of others without competing'],
        socialLeverage: 'Magnetism, Splendor, & Calculated Charm',
        blindspot: 'Echo-chamber vulnerability. You confuse polite agreement or fatigue in others with genuine adoration, missing subtle warning signs of resentment.',
        darkCore: 'Protecting the Illusion. Your darker impulses are triggered strictly when your idealized self-image is threatened or ignored.',
        relationshipStyle: 'The Star and the Starlight. You seek relationships that act as a mirror, reflecting your brilliance back to you with interest.',
        hiddenStrength: 'The power of self-fulfilling prophecy. Your unyielding belief in your potential often forces reality to yield to your ambition.',
        cognitiveModus: 'Status Maximization. Every interaction is subconsciously evaluated for its potential to elevate, sustain, or threaten your standing.',
        exhaustionIndex: 'Anonymity or routine task environments where individual brilliance is suppressed by standard operating procedures.',
        selfCorrection: 'Practice radical listening. Actively validate others\' achievements without introducing your own stories. True prestige is quiet and self-sustaining.'
    },
    'MACHIAVELLIAN': {
        id: 'machiavellian',
        name: 'The Strategic Mastermind',
        subName: 'Cold Pragmatic Calculation',
        description: 'You treat the social landscape as an intricate chessboard. Driven by logic, foresight, and a cynical view of human nature, you maintain a cool emotional detachment that allows you to calculate leverage, control information flow, and guide outcomes behind the scenes without getting swept up in emotional drama.',
        color: 'from-indigo-600 to-zinc-800',
        bgLight: 'bg-zinc-100',
        borderLight: 'border-zinc-300',
        coreDesire: 'Absolute strategic autonomy, informational asymmetry, and systemic control.',
        coreFear: 'Being outmaneuvered, caught with no contingency plans, or becoming vulnerable to others.',
        pros: ['Masterful navigation of highly complex political landscapes', 'Decisive execution unhindered by temporary emotional noise', 'Always operates with multiple contingency plans and exit strategies', 'Superb advisor and strategist under volatile conditions'],
        cons: ['Deep-seated cynicism that prevents genuine, vulnerability-based intimacy', 'Views human relationships through a transactional, utility-based lens', 'May alienate valuable allies if short-term math dictates a betrayal'],
        socialLeverage: 'Informational Control, Calculated Flattery, & Leverage Dynamics',
        blindspot: 'Underestimating the irrational force of human loyalty. You assume everyone else is as transactional as you are, occasionally miscalculating moves driven by pure love or spite.',
        darkCore: 'Utilitarian Efficiency. You do not inflict harm for pleasure; rather, you treat ethical boundaries as variable recommendations that can be adjusted to secure victory.',
        relationshipStyle: 'Strategic Alliance. Relationships are established with individuals who serve as valuable complementary assets.',
        hiddenStrength: 'Total systemic composure. In chaotic situations where others panic and burn, you see the field with crystalline tactical clarity.',
        cognitiveModus: 'Game-Theoretic Utility. Every word spoken is checked against long-term informational advantage and potential risk exposure.',
        exhaustionIndex: 'Raw emotional outbursts and chaotic environments that defy logical prediction or systematic manipulation.',
        selfCorrection: 'Experiment with unconditional trust in low-stakes environments. Intentionally give up control over a project or event to experience the relief of not having to manage the variables.'
    },
    'PSYCHOPATHIC': {
        id: 'psychopathic',
        name: 'The Fearless Risk-Taker',
        subName: 'High Thrill Autonomy',
        description: 'Your brain is built for high-stakes speed and low-friction action. Blessed (or cursed) with an exceptionally low arousal threshold and a muted fear response, you walk through high-stress situations with cold, absolute focus. Normal social boundaries of guilt, remorse, or anxiety simply do not register in your neural circuit.',
        color: 'from-red-600 to-black',
        bgLight: 'bg-red-50',
        borderLight: 'border-red-200',
        coreDesire: 'Untethered personal freedom, intense sensory inputs, and the thrill of crossing limits.',
        coreFear: 'Confinement, boredom, or submission to institutional authority.',
        pros: ['Total composure in extreme emergencies where others freeze', 'Exceptional capacity to execute painful, necessary, or high-risk actions', 'High social agility and superficial charm that makes strong first impressions', 'Does not suffer from lingering psychological guilt or regret'],
        cons: ['Highly impulsive behavior with a disregard for long-term collateral damage', 'Fails to process or respect the emotional pain and boundaries of loved ones', 'Quick to burn through relationships when the initial thrill threshold drops'],
        socialLeverage: 'Hypnotic Charisma & Intimidation Playbook',
        blindspot: 'Temporal near-sightedness. You are so wired for the immediate payoff or escape that you consistently undermine your own long-term security.',
        darkCore: 'Impulse and Domination. Your darker behaviors are driven by the search for dopamine hits, pushing rules to see if they break.',
        relationshipStyle: 'Volatile & High-Stimulus. You treat relationships like high-speed joyrides—thrilling on the highway but prone to rapid abandonment.',
        hiddenStrength: 'A complete lack of cognitive panic. You possess the raw nervous system of a natural emergency operator.',
        cognitiveModus: 'Thrill vs. Cost Optimization. If an action yields excitement or dominance with low immediate cost, your brain triggers immediate action.',
        exhaustionIndex: 'Bureaucracy, slow-moving procedures, and long discussions about feelings that carry no practical action or thrill.',
        selfCorrection: 'Build in a "24-hour pause button" before making major life decisions. Create high-risk outlets that are physically engaging (like extreme sports) so you don\'t seek dopamine by disrupting your relationships.'
    },
    'DARK_TRIAD': {
        id: 'dark_triad',
        name: 'The Shadow Operator',
        subName: 'Total Shadow Integration',
        description: 'You scored remarkably high across all three pillars. Your psyche seamlessly integrates the visionary magnetism of the Spotlight Seeker, the chessmaster calculations of the Strategic Mastermind, and the icy, high-risk fearlessness of the Risk-Taker. You represent an exceptionally formidable, highly strategic, yet highly volatile psychological archetype.',
        color: 'from-zinc-900 to-black',
        bgLight: 'bg-zinc-200',
        borderLight: 'border-zinc-400',
        coreDesire: 'Total systemic dominance, absolute untouchability, and the execution of grand personal vision.',
        coreFear: 'Vulnerability, yielding control, or undergoing strategic humiliation.',
        pros: ['Unparalleled ambition backed by high-level planning and fearless execution', 'Highly sophisticated reading of interpersonal leverage and vulnerability', 'Ability to build complex empires or coordinate large groups effortlessly', 'Complete immunity to normal social intimidation or guilt'],
        cons: ['Inability to experience simple, uncalculated relational peace', 'Leaves a wake of severe collateral damage, creating hidden enemies', 'Extremely prone to a spectacular, public downfall if you miss a variable'],
        socialLeverage: 'The Ultimate Stack: Strategic Charm, Fear-Inducing Intellect, & Hidden Leverage',
        blindspot: 'The Invincibility Trap. You start believing your own press and assuming everyone else is too simple to trap you, leading to catastrophic oversights.',
        darkCore: 'Sovereign Dominance. Your mind views life as a zero-sum Darwinian landscape where you must either occupy the top of the pyramid or be crushed.',
        relationshipStyle: 'Asymmetrical Control. You require total dominance, ensuring your partners remain predictable assets rather than independent variables.',
        hiddenStrength: 'Unshakeable willpower. You can strip your emotions down to absolute zero to execute complex operations under pressure.',
        cognitiveModus: 'Apex Predation. You continuously compute the balance of power in any room, looking for weaknesses to leverage and strengths to neutralize.',
        exhaustionIndex: 'Vulnerability and emotional reconciliation sessions that demand you put down your strategic armor and confess weakness.',
        selfCorrection: 'Seek professional therapy specializing in high-performance personalities to build healthy shadow integration. Find safe, non-destructive areas of life where you can practice letting go of control.'
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
