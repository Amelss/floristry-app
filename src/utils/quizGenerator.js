import FLOWERS from '../data/flowers';
import STYLES from '../data/styles';
import { COLOUR_NODES, SCHEMES } from '../data/colourWheel';
import TECHNIQUES_DATA from '../data/techniques';
import COND_DATA from '../data/conditioning';
import MONTHS_CAL from '../data/seasonal';

const MONTHS_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function sample(arr, n) { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function others(arr, exclude, n) { return sample(arr.filter(x => x !== exclude), n); }

/* ─── Flower Knowledge ─── */

function qLatinName() {
  const f = pick(FLOWERS);
  const opts = shuffle([f.latin, ...sample(FLOWERS.filter(x=>x.num!==f.num), 3).map(x=>x.latin)]);
  return {
    question: `What is the Latin name for the ${f.common}?`,
    options: opts,
    answer: f.latin,
    explanation: `The ${f.common} (${f.latin}) belongs to the ${f.family} family and originates from ${f.native}.`,
    category: 'Flower Knowledge',
  };
}

function qCommonName() {
  const f = pick(FLOWERS);
  const opts = shuffle([f.common, ...sample(FLOWERS.filter(x=>x.num!==f.num), 3).map(x=>x.common)]);
  return {
    question: `Which flower has the Latin name ${f.latin}?`,
    options: opts,
    answer: f.common,
    explanation: `${f.latin} is the ${f.common}. ${f.desc.split('.')[0]}.`,
    category: 'Flower Knowledge',
  };
}

function qPlantFamily() {
  const families = [...new Set(FLOWERS.map(f => f.family))];
  const f = pick(FLOWERS);
  const wrongFamilies = sample(families.filter(x=>x!==f.family), 3);
  const opts = shuffle([f.family, ...wrongFamilies]);
  return {
    question: `The ${f.common} (${f.latin}) belongs to which plant family?`,
    options: opts,
    answer: f.family,
    explanation: `The ${f.common} is a member of the ${f.family} family. Knowing plant families helps you understand which flowers share similar care needs.`,
    category: 'Flower Knowledge',
  };
}

function qFlowerRole() {
  const f = pick(FLOWERS.filter(fl => fl.roles.length > 0));
  const primaryRole = f.roles[0];
  const allRoles = ['Focal','Secondary','Filler','Line','Foliage','Texture'];
  const opts = shuffle([primaryRole, ...sample(allRoles.filter(r=>r!==primaryRole), 3)]);
  return {
    question: `What is the primary arrangement role of the ${f.common}?`,
    options: opts,
    answer: primaryRole,
    explanation: `The ${f.common} is primarily used as a ${primaryRole} flower. ${primaryRole === 'Focal' ? 'Focal flowers are the star of the arrangement — the first flower the eye is drawn to.' : primaryRole === 'Foliage' ? 'Foliage frames and grounds the focal flowers, adding depth and texture.' : primaryRole === 'Filler' ? 'Filler flowers fill gaps and add texture and volume.' : 'Line flowers create height, direction, and movement in an arrangement.'}`,
    category: 'Flower Knowledge',
  };
}

function qInSeason() {
  const monthIdx = Math.floor(Math.random() * 12);
  const monthName = MONTHS_FULL[monthIdx];
  const inSeason = FLOWERS.filter(f => f.season[monthIdx] === 1 && !f.imp);
  const notInSeason = FLOWERS.filter(f => f.season[monthIdx] === 0 && !f.imp);
  if (inSeason.length < 1 || notInSeason.length < 3) return null;
  const correct = pick(inSeason);
  const wrongs = sample(notInSeason, 3);
  const opts = shuffle([correct.common, ...wrongs.map(f=>f.common)]);
  return {
    question: `Which of these flowers is naturally in season in the UK in ${monthName}?`,
    options: opts,
    answer: correct.common,
    explanation: `The ${correct.common} is UK-grown and in season in ${monthName}. Seasonal flowers are fresher, cheaper, and more sustainable than imported alternatives.`,
    category: 'Flower Knowledge',
  };
}

function qImported() {
  const importedFlowers = FLOWERS.filter(f => f.imp);
  const notImported = FLOWERS.filter(f => !f.imp);
  if (importedFlowers.length < 1 || notImported.length < 3) return null;
  const correct = pick(importedFlowers);
  const wrongs = sample(notImported, 3);
  const opts = shuffle([correct.common, ...wrongs.map(f=>f.common)]);
  return {
    question: `Which of these flowers is available imported year-round, regardless of UK season?`,
    options: opts,
    answer: correct.common,
    explanation: `The ${correct.common} is widely imported and available year-round. However, buying UK-grown ${correct.common} when in season is always fresher and more sustainable.`,
    category: 'Flower Knowledge',
  };
}

function qNativeOrigin() {
  const f = pick(FLOWERS);
  const regions = [...new Set(FLOWERS.map(fl=>fl.native))].filter(r=>r!==f.native);
  const opts = shuffle([f.native, ...sample(regions, 3)]);
  return {
    question: `Where is the ${f.common} (${f.latin}) originally native to?`,
    options: opts,
    answer: f.native,
    explanation: `The ${f.common} is native to ${f.native}. Understanding a plant's origin helps you understand its natural growing conditions and care needs.`,
    category: 'Flower Knowledge',
  };
}

/* ─── Colour Theory ─── */

function qHarmonyScheme() {
  const entries = Object.entries(SCHEMES);
  const [key, scheme] = pick(entries);
  const others3 = entries.filter(([k])=>k!==key).map(([,s])=>s.label);
  const opts = shuffle([scheme.label, ...sample(others3, 3)]);
  return {
    question: `Which harmony scheme is described as: "${scheme.desc.split('.')[0]}"?`,
    options: opts,
    answer: scheme.label,
    explanation: `${scheme.label}: ${scheme.desc} ${scheme.tip}`,
    category: 'Colour Theory',
  };
}

function qColourTemperature() {
  const node = pick(COLOUR_NODES);
  const tempLabel = node.temp === 'warm' ? 'a warm colour' : node.temp === 'cool' ? 'a cool colour' : 'a neutral colour';
  const others3 = sample(COLOUR_NODES.filter(n=>n.hue!==node.hue && n.temp!==node.temp), 3);
  const opts = shuffle([node.name, ...others3.map(n=>n.name)]);
  return {
    question: `Which of these is considered ${tempLabel} in floral design?`,
    options: opts,
    answer: node.name,
    explanation: `${node.name} is ${tempLabel}. Warm colours advance visually toward the viewer, creating energy and drama. Cool colours recede, creating depth and calm.`,
    category: 'Colour Theory',
  };
}

function qFlowersForColour() {
  const node = pick(COLOUR_NODES.filter(n=>n.flowers.length >= 2));
  const correctFlower = pick(node.flowers);
  const allOtherFlowers = COLOUR_NODES.filter(n=>n.hue!==node.hue).flatMap(n=>n.flowers);
  const opts = shuffle([correctFlower, ...sample(allOtherFlowers, 3)]);
  return {
    question: `Which of these flowers would you typically use to represent ${node.name} in an arrangement?`,
    options: opts,
    answer: correctFlower,
    explanation: `${correctFlower} sits in the ${node.name} range on the colour wheel (${node.hue}°). ${node.name} is considered a ${node.temp} colour in floral design.`,
    category: 'Colour Theory',
  };
}

function qHarmonyCount() {
  const entries = Object.entries(SCHEMES);
  const [key, scheme] = pick(entries);
  const count = scheme.offsets.length;
  const countWord = count === 2 ? 'two' : count === 3 ? 'three' : 'four';
  const opts = shuffle(['Two colours', 'Three colours', 'Four colours', 'Five colours']);
  const answer = count === 2 ? 'Two colours' : count === 3 ? 'Three colours' : 'Four colours';
  return {
    question: `The ${scheme.label} colour harmony uses how many colours?`,
    options: opts,
    answer,
    explanation: `${scheme.label} harmony uses ${countWord} colours. ${scheme.desc}`,
    category: 'Colour Theory',
  };
}

/* ─── Care & Conditioning ─── */

function qConditioningTip() {
  const cond = pick(COND_DATA.filter(c => c.tips.length >= 2));
  const correctTip = pick(cond.tips);
  const allOtherTips = COND_DATA.filter(c=>c.title!==cond.title).flatMap(c=>c.tips);
  const wrongs = sample(allOtherTips, 3);
  const opts = shuffle([correctTip, ...wrongs]);
  return {
    question: `When conditioning ${cond.title === 'Universal Conditioning' ? 'all cut flowers' : cond.title.toLowerCase()}, which of the following is correct practice?`,
    options: opts,
    answer: correctTip,
    explanation: `For ${cond.title}: "${correctTip}" — ${cond.sub}.`,
    category: 'Care & Conditioning',
  };
}

function qEthyleneSensitivity() {
  const sensitiveTitles = ['Roses','Daffodils & Narcissus'];
  const sensitive = pick(COND_DATA.filter(c=>sensitiveTitles.includes(c.title)));
  const allFlowers = FLOWERS.map(f=>f.common);
  const sens = pick(['roses', 'carnations', 'delphiniums', 'lilies', 'sweet peas']);
  const notSens = pick(['chrysanthemums', 'alstroemeria', 'gerbera', 'statice']);
  const opts = shuffle([sens, notSens, pick(['tulips','dahlias']), pick(['snapdragons','cornflowers'])]);
  return {
    question: `Which of these cut flowers is highly sensitive to ethylene gas and must be kept away from fruit?`,
    options: opts,
    answer: sens,
    explanation: `${sens.charAt(0).toUpperCase()+sens.slice(1)} are highly sensitive to ethylene gas, which is released by ripening fruit. Even one piece of fruit nearby can significantly shorten vase life. Less sensitive varieties include chrysanthemums and gerbera.`,
    category: 'Care & Conditioning',
  };
}

function qStemCut() {
  return {
    question: `At what angle should you recut flower stems before placing them in water?`,
    options: ['45°', '90° (straight across)', '30°', '60°'],
    answer: '45°',
    explanation: `Always recut stems at a 45° angle. This increases the surface area available for water uptake and prevents the cut end from sitting flat on the bottom of the bucket, which would block absorption.`,
    category: 'Care & Conditioning',
  };
}

function qDaffodilCare() {
  return {
    question: `Why must daffodils be conditioned separately from other cut flowers?`,
    options: [
      'Their sap is toxic to most other cut flowers',
      'They drink too much water and dehydrate other stems',
      'Their scent causes other flowers to close prematurely',
      'They produce too much heat and wilt nearby flowers',
    ],
    answer: 'Their sap is toxic to most other cut flowers',
    explanation: `Daffodil sap contains lycorine, an alkaloid that is toxic to most other cut flowers — especially damaging to roses. Condition daffodils alone for 24 hours first; once conditioned they can be safely mixed without recutting.`,
    category: 'Care & Conditioning',
  };
}

function qTropicalStorage() {
  return {
    question: `What is the minimum safe storage temperature for tropical flowers like anthurium and bird of paradise?`,
    options: ['13–18°C (room temperature)', '1–5°C (standard fridge)', '6–10°C (cool room)', '0°C (near freezing)'],
    answer: '13–18°C (room temperature)',
    explanation: `Tropical flowers must never be refrigerated. They originate in warm climates and will blacken and collapse below 13°C. Store at room temperature, away from air conditioning vents. They are naturally long-lasting — bird of paradise lasts 2–3 weeks.`,
    category: 'Care & Conditioning',
  };
}

/* ─── Design Styles ─── */

function qStyleTechnique() {
  const s = pick(STYLES);
  const allSubtitles = STYLES.map(st=>st.subtitle);
  const opts = shuffle([s.name, ...sample(STYLES.filter(st=>st.id!==s.id), 3).map(st=>st.name)]);
  return {
    question: `Which floral design style is described as "${s.subtitle}"?`,
    options: opts,
    answer: s.name,
    explanation: `${s.name} (${s.subtitle}) — ${s.desc.split('.')[0]}.`,
    category: 'Design Styles',
  };
}

function qStyleOrigin() {
  const s = pick(STYLES);
  const opts = shuffle([s.name, ...sample(STYLES.filter(st=>st.id!==s.id), 3).map(st=>st.name)]);
  const country = s.origin.split('·')[0].trim();
  return {
    question: `Which floral design style originated in ${country}?`,
    options: opts,
    answer: s.name,
    explanation: `${s.name} originated in ${s.origin}. ${s.desc.split('.')[0]}.`,
    category: 'Design Styles',
  };
}

function qStyleFlower() {
  const s = pick(STYLES.filter(st=>st.flowers.length >= 2));
  const correctFlower = pick(s.flowers.filter(f => !f.includes('only')));
  const allOtherFlowers = STYLES.filter(st=>st.id!==s.id).flatMap(st=>st.flowers).filter(f=>!f.includes('only'));
  const opts = shuffle([correctFlower, ...sample(allOtherFlowers, 3)]);
  return {
    question: `Which of these flowers is a signature bloom of the ${s.name} style?`,
    options: opts,
    answer: correctFlower,
    explanation: `${correctFlower} is a key flower in the ${s.name} style. ${s.desc.split('.')[0]}.`,
    category: 'Design Styles',
  };
}

function qStyleDifficulty() {
  const s = pick(STYLES);
  const allDiffs = [...new Set(STYLES.map(st=>st.difficulty))];
  const opts = shuffle([s.difficulty, ...sample(allDiffs.filter(d=>d!==s.difficulty), Math.min(3, allDiffs.length-1))]);
  return {
    question: `What difficulty level is the ${s.name} style rated for floristry students?`,
    options: opts.length >= 4 ? opts : shuffle([s.difficulty, 'Beginner', 'Intermediate', 'Advanced']),
    answer: s.difficulty,
    explanation: `${s.name} is rated ${s.difficulty}. ${s.tip.split('.')[0]}.`,
    category: 'Design Styles',
  };
}

function qParallelTechnique() {
  return {
    question: `In the Continental parallel technique, how are the stems arranged?`,
    options: [
      'Upright and parallel — not spiralled',
      'In a natural spiral, all rotating the same way',
      'Fanned outward from a central point',
      'Cascading downward from a tall central stem',
    ],
    answer: 'Upright and parallel — not spiralled',
    explanation: `The Continental parallel technique places all stems vertically and parallel to each other — the opposite of the hand-tied spiral technique. Flowers are grouped by variety rather than mixed throughout. This creates a geometric, architectural effect.`,
    category: 'Design Styles',
  };
}

function qIkebanaTool() {
  return {
    question: `What is the name of the spiked metal tool used to hold stems in Ikebana arrangements?`,
    options: ['Kenzan (flower frog)', 'Secateur', 'Stub wire', 'Oasis foam'],
    answer: 'Kenzan (flower frog)',
    explanation: `A kenzan (also called a flower frog or pin frog) is a heavy metal disc covered in sharp upright pins. Stems are pushed onto the pins in a shallow dish of water. The kenzan is essential in Ikebana and also used in foam-free contemporary floristry.`,
    category: 'Design Styles',
  };
}

/* ─── Generator map by category ─── */

const ALL_GENERATORS = {
  flowers: [qLatinName, qCommonName, qPlantFamily, qFlowerRole, qInSeason, qImported, qNativeOrigin],
  colour:  [qHarmonyScheme, qColourTemperature, qFlowersForColour, qHarmonyCount],
  care:    [qConditioningTip, qEthyleneSensitivity, qStemCut, qDaffodilCare, qTropicalStorage],
  styles:  [qStyleTechnique, qStyleOrigin, qStyleFlower, qStyleDifficulty, qParallelTechnique, qIkebanaTool],
};

export function generateQuiz(category = 'all', count = 10) {
  const pool = category === 'all'
    ? Object.values(ALL_GENERATORS).flat()
    : ALL_GENERATORS[category] || Object.values(ALL_GENERATORS).flat();

  const questions = [];
  const usedGenerators = new Set();
  let attempts = 0;

  while (questions.length < count && attempts < count * 6) {
    attempts++;
    const gen = pick(pool);
    if (usedGenerators.has(gen) && questions.length < pool.length) continue;
    const q = gen();
    if (!q) continue;
    usedGenerators.add(gen);
    questions.push(q);
  }

  return questions;
}

export const CATEGORIES = [
  { id: 'all',     label: 'Mixed — All Topics',    desc: 'A bit of everything. The best preparation for a floristry exam.',   emoji: '🌸' },
  { id: 'flowers', label: 'Flower Knowledge',       desc: 'Latin names, plant families, seasonality, and flower roles.',        emoji: '🌹' },
  { id: 'colour',  label: 'Colour Theory',          desc: 'Harmony schemes, colour temperature, and palette building.',         emoji: '🎨' },
  { id: 'care',    label: 'Care & Conditioning',    desc: 'How to maximise vase life and handle specialist flowers.',           emoji: '💧' },
  { id: 'styles',  label: 'Design Styles',          desc: 'Identify styles, techniques, tools, and their origins.',            emoji: '✂️' },
];
