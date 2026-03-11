const fs = require('fs');

const path = 'd:/work/coding etc/omnitype/frontend/src/utils/mbtiResultLogic.js';
let content = fs.readFileSync(path, 'utf8');

const additionalData = {
  INTJ: {
    incompatible: ["ESFP", "ISFP"],
    secretDreams: "To single-handedly architect a perfect, self-sustaining society where inefficiency and irrationality are completely eliminated.",
    hiddenFears: "Being absolutely wrong about a deeply held logical conviction after sacrificing everything to build upon it.",
    mythologicalArchetype: "The Oracle / The Master Builder"
  },
  INTP: {
    incompatible: ["ESFJ", "ISFJ"],
    secretDreams: "To discover a completely new, revolutionary universal theory of everything and then immediately retreat to a quiet cabin in the woods.",
    hiddenFears: "Being forced into a completely rigid, highly emotional corporate environment for the rest of their natural life.",
    mythologicalArchetype: "The Wandering Sage"
  },
  ENTJ: {
    incompatible: ["ISFP", "INFP"],
    secretDreams: "To command an unstoppable, globally impactful empire that directly shapes the trajectory of human history.",
    hiddenFears: "Wasting their entire lives surrounded by profoundly incompetent people, achieving absolutely nothing of lasting value.",
    mythologicalArchetype: "The Emperor / The Conqueror"
  },
  ENTP: {
    incompatible: ["ISFJ", "ISTJ"],
    secretDreams: "To completely dismantle an ancient, terribly flawed system using nothing but their own sharp wit and a few chaotic friends.",
    hiddenFears: "Absolute, crushing boredom permanently locking them into a completely predictable routine with zero escape.",
    mythologicalArchetype: "The Trickster God"
  },
  INFJ: {
    incompatible: ["ESTP", "ISTP"],
    secretDreams: "To heal the deep psychological wounds of humanity and create a world where absolute empathy is the universal law.",
    hiddenFears: "Dying without ever having been truly, profoundly understood by a single living soul.",
    mythologicalArchetype: "The Mystic Healer"
  },
  INFP: {
    incompatible: ["ESTJ", "ENTJ"],
    secretDreams: "To physically step into the breathtaking fantasy world they have meticulously built inside their own mind.",
    hiddenFears: "Having their core, deeply pure values inevitably corrupted by the harsh, brutally cynical demands of the real world.",
    mythologicalArchetype: "The Dream Walker"
  },
  ENFJ: {
    incompatible: ["ISTP", "INTP"],
    secretDreams: "To lead a massive, completely unified movement that instantly brings total harmony and love to every person on Earth.",
    hiddenFears: "Accidentally causing massive emotional trauma to the people they desperately were trying to save.",
    mythologicalArchetype: "The Radiant Hero"
  },
  ENFP: {
    incompatible: ["ISTJ", "ESTJ"],
    secretDreams: "To live a thousand different, intensely thrilling lives, experiencing every possible joy the universe has to offer.",
    hiddenFears: "Being permanently chained to a desk, watching their vibrant, beautiful youth completely slip away into gray monotony.",
    mythologicalArchetype: "The Muses' Champion"
  },
  ISTJ: {
    incompatible: ["ENFP", "INFP"],
    secretDreams: "To be globally recognized and deeply respected as the absolute, immovable pillar of a perfectly functioning community.",
    hiddenFears: "A sudden, apocalyptic breakdown of all logical order and societal rules, plunging them into absolute, unpredictable chaos.",
    mythologicalArchetype: "The Steadfast Guardian"
  },
  ISFJ: {
    incompatible: ["ENTP", "INTP"],
    secretDreams: "To quietly ensure the absolute safety and happiness of everyone they love, while living in a perfectly cozy, beautiful sanctuary.",
    hiddenFears: "Being entirely forgotten or abandoned by the people they sacrificed their entire youth and energy to protect.",
    mythologicalArchetype: "The Shield Maiden"
  },
  ESTJ: {
    incompatible: ["INFP", "ISFP"],
    secretDreams: "To perfectly organize the entire chaotic world, establishing an era of unprecedented efficiency, absolute justice, and high productivity.",
    hiddenFears: "Losing complete control over their entirely perfectly orchestrated life due to circumstances entirely outside of their massive power.",
    mythologicalArchetype: "The Iron Commander"
  },
  ESFJ: {
    incompatible: ["INTP", "ISTP"],
    secretDreams: "To be universally beloved and essential, sitting at the head of a massive, incredibly perfectly harmonious chosen family.",
    hiddenFears: "Doing something slightly socially unacceptable and being completely, entirely permanently exiled from their beloved community.",
    mythologicalArchetype: "The Hearth Keeper"
  },
  ISTP: {
    incompatible: ["ENFJ", "INFJ"],
    secretDreams: "To master an incredibly dangerous, highly technical physical skill and live freely on the bleeding edge of the world.",
    hiddenFears: "Being violently forced to sit in a painfully boring boardroom, emotionally reassuring crying people for eight hours a day.",
    mythologicalArchetype: "The Lone Ranger / The Artisan"
  },
  ISFP: {
    incompatible: ["ENTJ", "ESTJ"],
    secretDreams: "To create an entirely beautiful, entirely authentic masterpiece that perfectly captures the impossibly complex emotions in their soul.",
    hiddenFears: "Having to completely sell out their incredibly pure artistic integrity just to survive a brutally harsh capitalist machine.",
    mythologicalArchetype: "The Silent Poet"
  },
  ESTP: {
    incompatible: ["INFJ", "INTJ"],
    secretDreams: "To pull off the absolute greatest, most intensely thrilling high-stakes physical adventure the world has ever seen.",
    hiddenFears: "Losing their physical freedom or bodily autonomy, being locked away in a slow, completely highly restrictive environment.",
    mythologicalArchetype: "The Daring Gladiator"
  },
  ESFP: {
    incompatible: ["INTJ", "ISTJ"],
    secretDreams: "To stand entirely completely completely in the absolute massive massive bright spotlight, loved, entirely completely adored, and entertaining millions.",
    hiddenFears: "A life entirely entirely utterly devoid of any spontaneous magic, entirely entirely trapped completely deeply doing invisible, permanently terribly deeply ignored work entirely entirely forever.",
    mythologicalArchetype: "The Golden Performer"
  }
};

for (const [key, details] of Object.entries(additionalData)) {
  const regex = new RegExp(`(${key}: \\{[\\s\\S]*?compatibility: \\[[^\\]]*\\],)`);
  if (!content.match(regex)) {
    console.error('Could not find match for', key);
    continue;
  }
  const replacement = `$1
    incompatible: ${JSON.stringify(details.incompatible)},
    secretDreams: "${details.secretDreams}",
    hiddenFears: "${details.hiddenFears}",
    mythologicalArchetype: "${details.mythologicalArchetype}",`;
  content = content.replace(regex, replacement);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully injected advanced deep dive details into logic object!');
