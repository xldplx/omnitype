// Wiki registry: normalizes every framework's data into one entry shape so the
// Wiki page can render, search and cross-link them uniformly.
//
// Entry shape:
//   { id, framework, name, kicker, tagline, summary, group, color, chips[], href?, sections[] }
// Section kinds:
//   text    { title, body }
//   quote   { body, cite? }
//   facts   { title, items: [{label, text}] }
//   list    { title, items[], tone: 'good' | 'bad' | 'neutral' }
//   chips   { title, items[] }
//   people  { title, items: [{name, role, quote?}] }
//   links   { title, items: [{framework, id, label, reason?}] }
//   dos     { title, doText, dontText }

import { typeDescriptions } from './mbtiResultLogic';
import { temperamentGroups, mbtiCognitiveStacks, getTypeTemperament } from './mbtiWikiData';
import { enneagramTypes, CENTER_DETAILS } from './enneagramResultLogic';
import { instinctualVariantsTypes, STACKING_PROFILES, INSTINCTUAL_FIGURES } from './instinctualVariantsLogic';
import { tritypeArchetypes } from './tritypeResultLogic';
import { jungianArchetypesMap } from './jungianArchetypesLogic';
import { colorArchetypes } from './colorPsychologyLogic';
import { alignmentMap } from './moralAlignmentLogic';
import { rqMap } from './resilienceQuotientLogic';
import { attachmentStylesTypes } from './attachmentStylesLogic';
import { loveLanguagesTypes } from './loveLanguagesLogic';
import { dereTypes } from './dereLogic';
import { defenseStatuses } from './defenseLogic';
import { darkTriadStatuses } from './darkTriadLogic';
import { imposterStatuses } from './imposterLogic';
import { hspStatuses } from './hspLogic';
import { burnoutStatuses } from './burnoutLogic';

const DEFAULT_COLOR = 'from-indigo-500 to-purple-500';

// ---------- section helpers ----------
const text = (title, body) => (body ? { kind: 'text', title, body } : null);
const quote = (body, cite) => (body ? { kind: 'quote', body, cite } : null);
const facts = (title, items) => {
  const clean = items.filter((i) => i && i.text);
  return clean.length ? { kind: 'facts', title, items: clean } : null;
};
const list = (title, items, tone = 'neutral') =>
  items && items.length ? { kind: 'list', title, items, tone } : null;
const chips = (title, items) => (items && items.length ? { kind: 'chips', title, items } : null);
const people = (title, items) => (items && items.length ? { kind: 'people', title, items } : null);
const links = (title, items) => (items && items.length ? { kind: 'links', title, items } : null);
const dos = (title, doText, dontText) =>
  doText || dontText ? { kind: 'dos', title, doText, dontText } : null;
const pairsFrom = (obj, labels) =>
  Object.entries(obj || {}).map(([k, v]) => ({ label: labels?.[k] || k.charAt(0).toUpperCase() + k.slice(1), text: v }));
const compact = (arr) => arr.filter(Boolean);

// ---------- framework builders ----------

function buildMbti() {
  return Object.entries(typeDescriptions).map(([code, info]) => {
    const temp = getTypeTemperament(code);
    const stack = mbtiCognitiveStacks[code] || [];
    return {
      id: code.toLowerCase(),
      framework: 'mbti',
      name: info.title,
      kicker: code,
      tagline: info.mythologicalArchetype || 'The Archetype',
      summary: info.desc,
      group: temp.title,
      color: temp.color,
      chips: stack.map((s) => s.function),
      coreValues: info.coreValues || [],
      href: `/wiki/mbti/${code.toLowerCase()}`,
      searchExtra: [...(info.coreValues || []), ...stack.map((s) => `${s.function} ${s.name}`)].join(' '),
      sections: [],
    };
  });
}

function buildEnneagram() {
  return Object.entries(enneagramTypes).map(([num, t]) => {
    const wings = Object.values(t.wingSubtypes || {}).map((w) => ({ label: w.title, text: w.subtitle }));
    return {
      id: num,
      framework: 'enneagram',
      name: t.name,
      kicker: `Type ${num}`,
      tagline: t.tagline,
      summary: t.description,
      group: `${t.centerShort} Center`,
      color: t.color,
      chips: [`Wings ${(t.wings || []).join(' & ')}`],
      sections: compact([
        facts('Core motivation', [
          { label: 'Core desire', text: t.coreDesire },
          { label: 'Core fear', text: t.coreFear },
        ]),
        facts('Where it sits', [
          { label: `${t.centerShort} center`, text: t.centerEmotion },
          { label: 'Harmonic group', text: t.harmonic && `${t.harmonic}${t.harmonicExplanation ? ' — ' + t.harmonicExplanation : ''}` },
          { label: 'Hornevian group', text: t.hornevian && `${t.hornevian}${t.hornevianExplanation ? ' — ' + t.hornevianExplanation : ''}` },
        ]),
        list('Strengths', t.strengths, 'good'),
        list('Blindspots', t.weaknesses, 'bad'),
        facts('Wing variants', wings),
        facts('Under growth and stress', [
          { label: t.growthTitle, text: t.growthDetails },
          { label: t.stressTitle, text: t.stressDetails },
        ]),
        text('In relationships', t.relationshipDynamics),
        text('At work', t.workplaceBehavior),
        chips('Typical careers', t.idealCareers),
        chips('Often associated with', t.famousExamples),
        links('Connected types', [
          t.growth && { framework: 'enneagram', id: String(t.growth), label: `Growth arrow → Type ${t.growth}`, reason: t.growthTitle },
          t.stress && { framework: 'enneagram', id: String(t.stress), label: `Stress arrow → Type ${t.stress}`, reason: t.stressTitle },
        ].filter(Boolean)),
      ]),
    };
  });
}

function buildInstinctual() {
  const variants = Object.entries(instinctualVariantsTypes).map(([key, v]) => ({
    id: v.abbreviation,
    framework: 'instinctual',
    name: v.shortName,
    kicker: v.abbreviation.toUpperCase(),
    tagline: v.tagline,
    summary: v.description,
    group: 'The three instincts',
    color: v.color,
    chips: [v.primaryFocus.split(',')[0]],
    sections: compact([
      facts('Orientation', [
        { label: 'Primary focus', text: v.primaryFocus },
        { label: 'Core zone', text: v.coreZone },
        { label: 'Core desire', text: v.coreDesire },
        { label: 'Core fear', text: v.coreFear },
      ]),
      list('Strengths', v.strengths, 'good'),
      list('Blindspots', v.weaknesses, 'bad'),
      text('In relationships', v.relationshipDynamics),
      text('At work', v.workplaceBehavior),
      people('Often associated with', INSTINCTUAL_FIGURES[key]),
    ]),
  }));

  const stackings = Object.entries(STACKING_PROFILES).map(([key, s]) => ({
    id: key.replace('/', '-'),
    framework: 'instinctual',
    name: s.title,
    kicker: key.toUpperCase(),
    tagline: `${key.split('/')[0].toUpperCase()} leads, ${key.split('/')[1].toUpperCase()} supports`,
    summary: s.essence,
    group: 'The six stackings',
    color: DEFAULT_COLOR,
    chips: [],
    sections: compact([
      text('Essence', s.essence),
      text('How the stack behaves', s.dynamics),
      links('Built from', key.split('/').map((a) => ({
        framework: 'instinctual',
        id: a,
        label: instinctualVariantsTypes[{ sp: 1, so: 2, sx: 3 }[a]].shortName,
      }))),
    ]),
  }));

  return [...variants, ...stackings];
}

function buildTritype() {
  const nums = Object.keys(enneagramTypes);
  return Object.entries(tritypeArchetypes).map(([code, t]) => {
    const digits = code.split('');
    return {
      id: code,
      framework: 'tritype',
      name: t.name,
      kicker: digits.join('–'),
      tagline: digits.map((d) => enneagramTypes[d]?.name).filter(Boolean).join(' · '),
      summary: t.description,
      group: `Types starting at ${digits[0]}`,
      color: t.color,
      chips: [],
      sections: compact([
        text('Overview', t.description),
        list('Strengths', t.strengths, 'good'),
        links('Built from', digits.filter((d) => nums.includes(d)).map((d) => ({
          framework: 'enneagram',
          id: d,
          label: `Type ${d}: ${enneagramTypes[d].name}`,
          reason: enneagramTypes[d].tagline,
        }))),
      ]),
    };
  });
}

const JUNG_GROUPS = {
  creator: 'Stability', ruler: 'Stability', caregiver: 'Stability',
  jester: 'Belonging', orphan: 'Belonging', lover: 'Belonging',
  hero: 'Mastery & risk', rebel: 'Mastery & risk', magician: 'Mastery & risk',
  innocent: 'Independence', explorer: 'Independence', sage: 'Independence',
};

function buildJungian() {
  return Object.values(jungianArchetypesMap).map((a) => ({
    id: a.id,
    framework: 'jungian',
    name: a.name,
    kicker: a.shortName,
    tagline: a.coreDesire,
    summary: a.description,
    group: JUNG_GROUPS[a.id] || 'Other',
    color: a.color,
    chips: [],
    sections: compact([
      facts('Core motivation', [
        { label: 'Core desire', text: a.coreDesire },
        { label: 'Core fear', text: a.coreFear },
      ]),
      list('Strengths', a.strengths, 'good'),
      list('Shadow side', a.weaknesses, 'bad'),
      text('In relationships', a.relationshipDynamics),
      text('At work', a.workplaceBehavior),
    ]),
  }));
}

function colorFamily(temp = '') {
  if (/warm/i.test(temp)) return 'Warm';
  if (/cool/i.test(temp)) return 'Cool';
  if (/neutral/i.test(temp)) return 'Neutral';
  return 'Luminous';
}

function buildColor() {
  return Object.values(colorArchetypes).map((c) => ({
    id: c.id,
    framework: 'color',
    name: c.name,
    kicker: c.hex,
    tagline: c.temperature,
    summary: c.description,
    group: colorFamily(c.temperature),
    color: c.gradient || c.color,
    swatch: c.hex,
    chips: (c.keywords || []).slice(0, 3),
    searchExtra: (c.keywords || []).join(' '),
    sections: compact([
      chips('Keywords', c.keywords),
      facts('Core motivation', [
        { label: 'Core desire', text: c.coreDesire },
        { label: 'Core fear', text: c.coreFear },
      ]),
      facts('Color relationships', [
        { label: 'Temperature', text: c.temperature },
        { label: 'Chakra', text: c.chakra },
        { label: 'Complementary', text: c.complementaryColor },
        { label: 'Shadow color', text: c.shadowColor },
      ]),
      list('Traits', c.traits, 'neutral'),
      list('Strengths', c.pros, 'good'),
      list('Watch-outs', c.cons, 'bad'),
      facts('Expression', [
        { label: 'Communication style', text: c.communicationStyle },
        { label: 'Space & decor', text: c.decorTherapy },
      ]),
    ]),
  }));
}

const ALIGN_ORDER = [
  'lawful-good', 'neutral-good', 'chaotic-good',
  'lawful-neutral', 'true-neutral', 'chaotic-neutral',
  'lawful-evil', 'neutral-evil', 'chaotic-evil',
];

function buildAlignment() {
  return ALIGN_ORDER.map((id) => alignmentMap[id]).filter(Boolean).map((a) => {
    const law = a.id === 'true-neutral' ? 'Neutral' : a.name.split(' ')[0];
    return {
      id: a.id,
      framework: 'alignment',
      name: a.name,
      kicker: a.shortName,
      tagline: a.axis,
      summary: a.description,
      group: law,
      color: a.color,
      chips: [],
      sections: compact([
        quote(a.quote),
        text('Philosophy', a.description),
        list('Strengths', a.strengths, 'good'),
        list('Weaknesses', a.weaknesses, 'bad'),
      ]),
    };
  });
}

function buildResilience() {
  return Object.values(rqMap).map((r) => ({
    id: r.id,
    framework: 'resilience',
    name: r.name,
    kicker: r.code,
    tagline: r.archetype,
    summary: r.description,
    group: r.archetype.split(' & ')[0],
    color: r.color,
    chips: [],
    sections: compact([
      quote(r.quote),
      text('Overview', r.description),
      list('Strengths', r.strengths, 'good'),
      list('Weaknesses', r.weaknesses, 'bad'),
    ]),
  }));
}

function buildAttachment() {
  return Object.values(attachmentStylesTypes).map((a) => ({
    id: a.id,
    framework: 'attachment',
    name: a.name,
    kicker: a.shortName,
    tagline: a.coreDesire,
    summary: a.description,
    group: a.id === 'secure' ? 'Secure' : 'Insecure',
    color: a.color,
    chips: [],
    sections: compact([
      facts('Core motivation', [
        { label: 'Core desire', text: a.coreDesire },
        { label: 'Core fear', text: a.coreFear },
      ]),
      list('Strengths', a.strengths, 'good'),
      list('Challenges', a.weaknesses, 'bad'),
      list('Common triggers', a.triggers, 'neutral'),
      facts('Communication and conflict', [
        { label: 'Communication', text: a.communicationStyle },
        { label: 'In conflict', text: a.conflictResolution },
      ]),
      text('In relationships', a.relationshipDynamics),
      text('Dating', a.datingAdvice),
      text('At work', a.workplaceBehavior),
      list('Pathways to security', a.growthPath, 'good'),
    ]),
  }));
}

function buildLoveLanguages() {
  return Object.values(loveLanguagesTypes).map((l) => ({
    id: l.id,
    framework: 'love-languages',
    name: l.name,
    kicker: l.shortName,
    tagline: l.coreDesire,
    summary: l.description,
    group: null,
    color: l.color,
    chips: [],
    sections: compact([
      facts('Core motivation', [
        { label: 'Core desire', text: l.coreDesire },
        { label: 'Core fear', text: l.coreFear },
      ]),
      list('Strengths', l.strengths, 'good'),
      list('Blindspots', l.weaknesses, 'bad'),
      text('In relationships', l.relationshipDynamics),
      text('At work', l.workplaceBehavior),
    ]),
  }));
}

function buildDere() {
  const labels = { inPublic: 'In public', inPrivate: 'In private' };
  return Object.values(dereTypes).map((d) => ({
    id: d.id,
    framework: 'dere',
    name: d.name,
    kicker: d.japaneseName,
    tagline: d.title,
    summary: d.description,
    group: null,
    color: d.color,
    chips: [],
    sections: compact([
      quote(d.signatureQuote),
      text('Overview', d.description),
      facts('Inner workings', [
        { label: 'Love language', text: d.loveLanguage },
        { label: 'Defense mechanism', text: d.defenseMechanism },
        { label: 'Relational driver', text: d.relationalDriver },
        { label: 'When flustered', text: d.flusteredReaction },
      ]),
      facts('Public vs. private', pairsFrom(d.publicVsPrivate, labels)),
      list('Strengths', d.strengths, 'good'),
      list('Vulnerabilities', d.vulnerabilities, 'bad'),
      dos('Loving one', d.partnerGuide?.do, d.partnerGuide?.dont),
      links('Natural synergy', (d.compatibilityDetails?.highSynergy || []).map((c) => ({ framework: 'dere', id: c.id, label: c.name, reason: c.reason }))),
      links('Growth challenges', (d.compatibilityDetails?.growthChallenge || []).map((c) => ({ framework: 'dere', id: c.id, label: c.name, reason: c.reason }))),
      chips('Often associated with', d.famousExamples),
    ]),
  }));
}

function buildProfiles(framework, map, { extras = [], traitsKey, traitLabels, group }) {
  return Object.values(map).map((s) => ({
    id: s.id || s.name.toLowerCase().replace(/[^a-z]+/g, '-'),
    framework,
    name: s.name,
    kicker: null,
    tagline: s.subName,
    summary: s.description,
    group: group ? group(s) : null,
    color: s.color,
    chips: [],
    sections: compact([
      text('Overview', s.description),
      facts('Core motivation', [
        { label: 'Core desire', text: s.coreDesire },
        { label: 'Core fear', text: s.coreFear },
      ]),
      list('Strengths', s.pros, 'good'),
      list('Costs', s.cons, 'bad'),
      traitsKey ? facts('Signature traits', pairsFrom(s[traitsKey], traitLabels)) : null,
      facts('Deeper patterns', extras.map(([key, label]) => ({ label, text: s[key] }))),
    ]),
  }));
}

// ---------- framework definitions ----------

export const wikiCategories = [
  { id: 'personality', label: 'Personality & Cognition' },
  { id: 'motivation', label: 'Motivation & Instinct' },
  { id: 'relational', label: 'Relationships' },
  { id: 'shadow', label: 'Shadow & Defense' },
  { id: 'body', label: 'Body & Nervous System' },
  { id: 'values', label: 'Morality & Resilience' },
];

const frameworkDefs = [
  {
    id: 'mbti', category: 'personality', label: '16 Archetypes', icon: 'Brain',
    accent: 'indigo',
    intro: 'Sixteen cognitive profiles built from four preference axes and ordered stacks of Jungian functions. Each entry opens into a full chapter.',
    build: buildMbti,
    groupOrder: Object.values(temperamentGroups).map((t) => t.title),
  },
  {
    id: 'jungian', category: 'personality', label: 'Jungian Archetypes', icon: 'Sparkles',
    accent: 'purple',
    intro: "Twelve universal patterns from Carl Jung's collective unconscious — the characters that recur in myth, story and personal identity.",
    build: buildJungian,
    groupOrder: ['Stability', 'Belonging', 'Mastery & risk', 'Independence'],
  },
  {
    id: 'color', category: 'personality', label: 'Color Psychology', icon: 'Palette',
    accent: 'fuchsia',
    intro: 'Sixteen color archetypes that map temperament, communication style and emotional atmosphere to a hue.',
    build: buildColor,
    groupOrder: ['Warm', 'Cool', 'Neutral', 'Luminous'],
  },
  {
    id: 'enneagram', category: 'motivation', label: 'Enneagram', icon: 'Compass',
    accent: 'amber',
    intro: 'Nine core motivations spread across three centers — Gut, Heart and Head — each with wings, a growth arrow and a stress arrow.',
    build: buildEnneagram,
    groupOrder: Object.values(CENTER_DETAILS).map((c) => `${c.name.split(' ')[0]} Center`),
  },
  {
    id: 'tritype', category: 'motivation', label: 'Tritype', icon: 'Layers',
    accent: 'sky',
    intro: 'The combination of one Enneagram type from each center. Twenty-seven archetypes describe how the three centers blend.',
    build: buildTritype,
  },
  {
    id: 'instinctual', category: 'motivation', label: 'Instinctual Variants', icon: 'Flame',
    accent: 'emerald',
    intro: 'Three survival instincts — Self-Preservation, Social and Sexual — and the six ways they can be stacked.',
    build: buildInstinctual,
    groupOrder: ['The three instincts', 'The six stackings'],
  },
  {
    id: 'attachment', category: 'relational', label: 'Attachment Styles', icon: 'Heart',
    accent: 'rose',
    intro: 'The four adult attachment patterns, shaped by early bonds, that govern closeness, conflict and emotional safety.',
    build: buildAttachment,
    groupOrder: ['Secure', 'Insecure'],
  },
  {
    id: 'love-languages', category: 'relational', label: 'Love Languages', icon: 'HeartHandshake',
    accent: 'rose',
    intro: 'Five channels through which people give and receive affection.',
    build: buildLoveLanguages,
  },
  {
    id: 'dere', category: 'relational', label: 'The -dere Spectrum', icon: 'Sparkles',
    accent: 'pink',
    intro: 'Ten affection archetypes from Japanese pop culture, used as a lens for how people hide, show and defend their feelings.',
    build: buildDere,
  },
  {
    id: 'defense', category: 'shadow', label: 'Defense Mechanisms', icon: 'Shield',
    accent: 'sky',
    intro: 'The unconscious strategies the psyche uses to avoid overwhelming feeling — what each protects, and what it costs.',
    build: () => buildProfiles('defense', defenseStatuses, {
      extras: [
        ['coreTrigger', 'Core trigger'], ['subconsciousGoal', 'Subconscious goal'], ['backfireEffect', 'How it backfires'],
        ['cognitiveLoad', 'Cognitive load'], ['nervousSystemStatus', 'Nervous system'], ['growthPathway', 'Growth pathway'],
      ],
    }),
  },
  {
    id: 'dark-triad', category: 'shadow', label: 'The Dark Triad', icon: 'Ghost',
    accent: 'slate',
    intro: 'Narcissism, Machiavellianism and psychopathy — three overlapping shadow traits, described as patterns rather than diagnoses.',
    build: () => buildProfiles('dark-triad', darkTriadStatuses, {
      extras: [
        ['socialLeverage', 'Social leverage'], ['blindspot', 'Blindspot'], ['darkCore', 'Dark core'],
        ['relationshipStyle', 'Relationship style'], ['hiddenStrength', 'Hidden strength'], ['cognitiveModus', 'Cognitive modus'],
        ['exhaustionIndex', 'Exhaustion index'], ['selfCorrection', 'Self-correction'],
      ],
    }),
  },
  {
    id: 'imposter', category: 'shadow', label: 'Imposter Syndrome', icon: 'UserMinus',
    accent: 'violet',
    intro: 'Four ways the feeling of being a fraud shows up, each with its own hidden lie and its own antidote.',
    build: () => buildProfiles('imposter', imposterStatuses, {
      extras: [
        ['specificLie', 'The lie it tells'], ['triggerCondition', 'Trigger'], ['objectiveEvidence', 'Counter-evidence'],
        ['cognitiveOverhead', 'Cognitive overhead'], ['reframingMantra', 'Reframe'], ['somaticProtocol', 'Somatic protocol'],
      ],
    }),
  },
  {
    id: 'hsp', category: 'body', label: 'Sensory Sensitivity', icon: 'Waves',
    accent: 'cyan',
    intro: 'Sensory-processing sensitivity as a spectrum: how deeply a nervous system registers stimuli, emotion and subtlety.',
    build: () => buildProfiles('hsp', hspStatuses, {
      traitsKey: 'traits',
      traitLabels: { sensory: 'Sensory', empathy: 'Empathy', processing: 'Processing' },
      extras: [
        ['rechargeMode', 'Recharge mode'], ['rechargeDesc', 'How to recharge'], ['environmentalNeeds', 'Environmental needs'],
        ['sensoryTriggers', 'Sensory triggers'], ['idealWorkspace', 'Ideal workspace'],
      ],
    }),
  },
  {
    id: 'burnout', category: 'body', label: 'Burnout & Nervous System', icon: 'Battery',
    accent: 'orange',
    intro: 'Four states of the stress response, from regulated baseline to total depletion, with the signs and recovery path for each.',
    build: () => buildProfiles('burnout', burnoutStatuses, {
      traitsKey: 'traits',
      traitLabels: { physical: 'Physical', cognitive: 'Cognitive', nervous: 'Nervous system' },
      extras: [
        ['warningSigns', 'Early warning signs'], ['energyDrain', 'Biggest energy drain'], ['restType', 'Rest that works'],
        ['recoveryPath', 'Recovery path'], ['recoveryDesc', 'What recovery looks like'],
      ],
    }),
  },
  {
    id: 'alignment', category: 'values', label: 'Moral Alignment', icon: 'Scale',
    accent: 'emerald',
    intro: 'The nine-point grid of law and ethics, from Lawful Good to Chaotic Evil.',
    build: buildAlignment,
    groupOrder: ['Lawful', 'Neutral', 'Chaotic'],
    matrix: true,
  },
  {
    id: 'resilience', category: 'values', label: 'Resilience Quotient', icon: 'Mountain',
    accent: 'teal',
    intro: 'Four resilience profiles formed by two axes: how steady your self-belief is and how steady your emotions are.',
    build: buildResilience,
  },
];

// Build once; the registry is static data.
export const wikiFrameworks = frameworkDefs.map((def) => {
  const entries = def.build();
  const groups = def.groupOrder
    ? def.groupOrder.filter((g) => entries.some((e) => e.group === g))
    : [...new Set(entries.map((e) => e.group).filter(Boolean))];
  return { ...def, entries, groups, count: entries.length };
});

export const getFramework = (id) => wikiFrameworks.find((f) => f.id === id);

export const getEntry = (frameworkId, entryId) =>
  getFramework(frameworkId)?.entries.find((e) => e.id === entryId);

// Flat index for global search
const searchIndex = wikiFrameworks.flatMap((f) =>
  f.entries.map((e) => ({
    framework: f.id,
    entry: e,
    haystack: [e.name, e.kicker, e.tagline, e.summary, e.group, e.searchExtra, ...(e.chips || []), f.label]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  })),
);

export function searchWiki(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return searchIndex
    .filter((row) => terms.every((t) => row.haystack.includes(t)))
    .map((row) => {
      const name = row.entry.name.toLowerCase();
      const kicker = (row.entry.kicker || '').toLowerCase();
      const score = (name === q || kicker === q ? 3 : 0) + (name.startsWith(q) || kicker.startsWith(q) ? 2 : 0) + (name.includes(q) ? 1 : 0);
      return { ...row, score };
    })
    .sort((a, b) => b.score - a.score);
}

export const totalEntries = wikiFrameworks.reduce((n, f) => n + f.count, 0);
