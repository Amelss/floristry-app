import MEANINGS from '../data/meanings';
import GLOSSARY from '../data/glossary';

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function sample(arr, n) { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

/* ─── Flower Meanings ─── */

function qMeaningOverall() {
  const m = pick(MEANINGS);
  const wrongs = sample(MEANINGS.filter(x => x.id !== m.id), 3);
  const opts = shuffle([m.overall, ...wrongs.map(x => x.overall)]);
  return {
    question: `What does the ${m.flower} primarily symbolise in the language of flowers?`,
    options: opts,
    answer: m.overall,
    explanation: `The ${m.flower} represents: ${m.overall} ${m.history.split('.')[0]}.`,
    category: 'Flower Meanings',
  };
}

function qMeaningColour() {
  const m = pick(MEANINGS.filter(x => x.colours.length >= 2));
  const c = pick(m.colours);
  const allMeanings = MEANINGS.flatMap(x => x.colours.map(co => co.meaning)).filter(x => x !== c.meaning);
  const opts = shuffle([c.meaning, ...sample(allMeanings, 3)]);
  return {
    question: `In floriography, what does a ${c.colour.toLowerCase()} ${m.flower.toLowerCase()} represent?`,
    options: opts,
    answer: c.meaning,
    explanation: `A ${c.colour.toLowerCase()} ${m.flower.toLowerCase()} represents: ${c.meaning}. Different colours of the same flower carry completely different meanings — always choose with care for the occasion.`,
    category: 'Flower Meanings',
  };
}

function qWhichFlowerForMeaning() {
  const m = pick(MEANINGS);
  const keyword = m.overall.split('—')[0].split(',')[0].trim().toLowerCase();
  const wrongs = sample(MEANINGS.filter(x => x.id !== m.id), 3);
  const opts = shuffle([m.flower, ...wrongs.map(x => x.flower)]);
  return {
    question: `Which flower is most strongly associated with "${keyword}"?`,
    options: opts,
    answer: m.flower,
    explanation: `The ${m.flower} is associated with: ${m.overall}`,
    category: 'Flower Meanings',
  };
}

function qMeaningOccasion() {
  const m = pick(MEANINGS.filter(x => x.occasions.length >= 3));
  const occasion = pick(m.occasions);
  const others = MEANINGS.filter(x => !x.occasions.includes(occasion) && x.id !== m.id);
  if (others.length < 3) return null;
  const wrongs = sample(others, 3);
  const opts = shuffle([m.flower, ...wrongs.map(x => x.flower)]);
  return {
    question: `Which flower is most traditionally associated with ${occasion}?`,
    options: opts,
    answer: m.flower,
    explanation: `The ${m.flower} is well suited to occasions including: ${m.occasions.join(', ')}.`,
    category: 'Gifting & Occasions',
  };
}

function qFlowerCategory() {
  const m = pick(MEANINGS);
  const allCats = [...new Set(MEANINGS.map(x => x.category))];
  const opts = shuffle([m.category, ...sample(allCats.filter(c => c !== m.category), 3)]);
  return {
    question: `In floriography, which symbolic category does the ${m.flower} belong to?`,
    options: opts,
    answer: m.category,
    explanation: `The ${m.flower} belongs to the "${m.category}" category. ${m.overall}`,
    category: 'Flower Meanings',
  };
}

function qSubRosa() {
  return {
    question: `In ancient Rome, a rose hung over a meeting room gave rise to the phrase "sub rosa." What did it signify?`,
    options: [
      'Everything spoken within was confidential',
      'The meeting was open to all citizens',
      'A royal decree was in effect',
      'A funeral ceremony was being prepared',
    ],
    answer: 'Everything spoken within was confidential',
    explanation: `"Sub rosa" (under the rose) meant all words spoken were strictly confidential — the rose symbolised secrecy through its association with Aphrodite. Roses have carried symbolic weight for over 5,000 years, appearing in ancient Greek, Roman, and Victorian culture.`,
    category: 'Flower Meanings',
  };
}

function qDaffodilNationalFlower() {
  return {
    question: `The daffodil is the national flower of which country, worn on St David's Day (1 March)?`,
    options: ['Wales', 'Scotland', 'Ireland', 'England'],
    answer: 'Wales',
    explanation: `The daffodil is the national flower of Wales, worn on St David's Day (1 March). Despite its Latin name Narcissus (from the Greek myth of youth who fell for his own reflection), the daffodil universally symbolises hope — and is the international symbol of cancer care charities.`,
    category: 'Flower Meanings',
  };
}

function qChrysanthemumCulture() {
  return {
    question: `In which countries should you never give chrysanthemums as a casual gift, as they are strictly associated with funerals?`,
    options: [
      'France, Belgium, Italy & Austria',
      'Japan, China & South Korea',
      'Spain, Portugal & Greece',
      'Sweden, Norway & Denmark',
    ],
    answer: 'France, Belgium, Italy & Austria',
    explanation: `In France, Belgium, Italy, and Austria, chrysanthemums are strictly for funerals — never give them casually. In Japan and China however, the chrysanthemum symbolises joy and longevity — Japan's Imperial family has used it as their emblem for centuries.`,
    category: 'Cultural Knowledge',
  };
}

function qOrchidSpecies() {
  return {
    question: `Orchids are one of the largest flowering plant families on Earth. Approximately how many species exist?`,
    options: ['Over 28,000 species', 'Around 5,000 species', 'Around 1,000 species', 'Over 80,000 species'],
    answer: 'Over 28,000 species',
    explanation: `Orchids (Orchidaceae) have over 28,000 species. Victorian "Orchid Mania" gripped Britain as wealthy collectors sent hunters to tropical jungles at great risk. The Aztecs mixed vanilla orchid with chocolate to create a drink believed to confer power.`,
    category: 'Flower Meanings',
  };
}

function qProteasAge() {
  return {
    question: `The Protea is one of Earth's oldest flowering plant families. How old is the plant family?`,
    options: ['Over 300 million years old', 'Around 10 million years old', 'Around 50 million years old', 'Around 1 million years old'],
    answer: 'Over 300 million years old',
    explanation: `The Protea family has been flowering for over 300 million years, making it one of the oldest on Earth. Named after the Greek god Proteus (who could change form), it represents transformation. The King Protea is South Africa's national flower.`,
    category: 'Flower Meanings',
  };
}

function qSweetPeaMeaning() {
  return {
    question: `In Victorian floriography, sweet peas were given to departing guests. What message did they carry?`,
    options: [
      '"Goodbye — fond farewell and good memories"',
      '"I love you deeply and passionately"',
      '"Thank you for your kind hospitality"',
      '"I wish you great fortune ahead"',
    ],
    answer: '"Goodbye — fond farewell and good memories"',
    explanation: `In Victorian floriography, sweet peas meant "goodbye" or "departure." They were given as farewell gifts at the end of a visit. Native to Sicily, they became enormously popular in English cottage gardens from the 1800s — a quintessentially British summer flower.`,
    category: 'Flower Meanings',
  };
}

function qTulipMania() {
  return {
    question: `"Tulip Mania" in 1630s Netherlands is historically significant for what reason?`,
    options: [
      "It was the world's first recorded speculative financial bubble",
      'It caused a devastating crop disease that spread across Europe',
      'It prompted the first international flower trade regulations',
      "It led to the Dutch royal family's ban on tulip imports",
    ],
    answer: "It was the world's first recorded speculative financial bubble",
    explanation: `Tulip Mania (1637) was the world's first recorded speculative bubble — single bulbs sold for more than a skilled craftsman's annual salary. The tulip name comes from the Turkish "tülbend" (turban), reflecting the flower's shape.`,
    category: 'Flower Meanings',
  };
}

function qForgetMeNotLegend() {
  return {
    question: `According to the legend behind the forget-me-not, who is said to have coined the flower's name?`,
    options: [
      'A medieval knight swept away by a river, throwing flowers to his lady',
      'A Victorian poet writing from his deathbed',
      'A Roman soldier departing for a distant campaign',
      'A Norse god blessing flowers in a meadow',
    ],
    answer: 'A medieval knight swept away by a river, throwing flowers to his lady',
    explanation: `In German legend, a knight picking the flowers fell into a river and, swept away, threw them to his lady crying "Vergiss mein nicht!" (Forget me not!). The flower is now used by Alzheimer's charities worldwide as a symbol of memory and the struggle against forgetting.`,
    category: 'Flower Meanings',
  };
}

function qDahliaOrigin() {
  return {
    question: `Dahlias originate from which region, where the Aztecs used them for food and ceremony?`,
    options: ['Mexico and Central America', 'South Africa', 'The Mediterranean', 'Japan and Korea'],
    answer: 'Mexico and Central America',
    explanation: `Dahlias are native to Mexico and Central America, where the Aztecs used them in food and ceremony. Named after Swedish botanist Anders Dahl, they were brought to Europe in the late 18th century. Victorian England developed over 2,000 varieties by the 1840s — now among the UK's most popular cut flowers.`,
    category: 'Flower Meanings',
  };
}

function qLavenderEtymology() {
  return {
    question: `The word "lavender" derives from the Latin "lavare." What does "lavare" mean?`,
    options: ['To wash', 'To perfume', 'To calm', 'To heal'],
    answer: 'To wash',
    explanation: `Lavender comes from "lavare" (to wash) — Romans scented their baths, beds, and clothes with it. Used for over 2,500 years, lavender oil was even applied to soldiers' wounds in WWI when antiseptics ran out. It is one of the UK's most commercially successful aromatic plants.`,
    category: 'Flower Meanings',
  };
}

function qAnemoneMyth() {
  return {
    question: `In Greek mythology, what gave rise to the anemone flower?`,
    options: [
      "Aphrodite's tears as she wept over the dying Adonis",
      'Zeus transforming a nymph as punishment',
      "The blood of Achilles spilled in battle",
      "Apollo's grief after losing a chariot race",
    ],
    answer: "Aphrodite's tears as she wept over the dying Adonis",
    explanation: `Anemones sprang from Aphrodite's tears as she wept over Adonis — giving the flower its association with forsaken love. "Anemone" comes from the Greek "anemos" (wind), as the wind scattered their seeds. In Eastern cultures the flower can symbolise ill luck, highlighting the importance of cultural context.`,
    category: 'Flower Meanings',
  };
}

function qPeonyChina() {
  return {
    question: `What honorary title does the peony hold in China, where it has been cultivated for over 1,500 years?`,
    options: ['King of Flowers', 'The Imperial Bloom', 'Dragon Flower', 'Flower of Heaven'],
    answer: 'King of Flowers',
    explanation: `The peony is China's "King of Flowers," representing wealth, honour, and high social status. In Greek mythology it is named after Paeon, physician to the gods. In the language of flowers, peonies carry a dual meaning — prosperity and bashfulness.`,
    category: 'Cultural Knowledge',
  };
}

function qIrisGoddess() {
  return {
    question: `The iris flower is named after a Greek goddess. What was her role?`,
    options: [
      'Goddess of the rainbow, who carried messages from the gods to mortals',
      'Goddess of love and beauty',
      'Goddess of wisdom and war strategy',
      'Goddess of the harvest and seasons',
    ],
    answer: 'Goddess of the rainbow, who carried messages from the gods to mortals',
    explanation: `Iris was the Greek goddess of the rainbow — a messenger between gods and mortals. Ancient Egyptians placed irises on pharaohs' sceptres. The fleur-de-lis (France's royal symbol) is widely believed to depict a stylised iris. Japan holds Iris festivals (Hanashobu) each June.`,
    category: 'Flower Meanings',
  };
}

function qHelleboreHistory() {
  return {
    question: `The hellebore has one of the darkest histories of any garden flower. It has been linked to which historical death?`,
    options: [
      'Alexander the Great (possibly via hellebore poisoning)',
      'Julius Caesar (used in the Ides of March)',
      'Cleopatra (by self-administered extract)',
      'Socrates (mixed with hemlock)',
    ],
    answer: 'Alexander the Great (possibly via hellebore poisoning)',
    explanation: `The death of Alexander the Great has been attributed to hellebore poisoning. In Medieval Europe hellebores were used in exorcism rituals. In modern floristry, their meaning has shifted entirely — they represent serenity and beauty found in difficult times, drawn from their habit of blooming in the darkest winter months.`,
    category: 'Flower Meanings',
  };
}

function qHyacinthMyth() {
  return {
    question: `In Greek mythology, Hyacinthus was a Spartan prince loved by Apollo. How did he die and what resulted?`,
    options: [
      'Killed by a discus — Apollo transformed his blood into the hyacinth flower',
      'Drowned at sea — Poseidon transformed him into the flower',
      'Consumed by grief — Aphrodite turned his tears into blooms',
      'Struck by lightning — Zeus created the flower from his ashes',
    ],
    answer: 'Killed by a discus — Apollo transformed his blood into the hyacinth flower',
    explanation: `Hyacinthus was accidentally killed by a discus (or by the jealous Zephyrus redirecting it). Apollo transformed his blood into the hyacinth, with the inscription "AI AI" (alas) on its petals. The hyacinth's sweet fragrance made it beloved in Persian and Ottoman gardens long before it reached Western Europe.`,
    category: 'Flower Meanings',
  };
}

function qFreesiaOrigin() {
  return {
    question: `Freesias are named after a German physician. Where are they originally native to?`,
    options: [
      'The Cape region of South Africa',
      'The Mediterranean coast of Sicily',
      'The highlands of Peru and Bolivia',
      'The coastal regions of Japan',
    ],
    answer: 'The Cape region of South Africa',
    explanation: `Freesias are native to the Cape region of South Africa, named after German physician Friedrich Freese. Introduced to Europe in the 19th century, they became popular for their extraordinary fragrance and long vase life. In the language of flowers they represent trust and innocence.`,
    category: 'Flower Meanings',
  };
}

/* ─── Cultural & Symbolism ─── */

function qFloriographyDefinition() {
  return {
    question: `What is "floriography" — the practice at the heart of Victorian flower-giving?`,
    options: [
      'The language of flowers — assigning precise meanings to each bloom and colour',
      'The scientific study of flower anatomy and reproduction',
      'The art of pressing and drying flowers for preservation',
      'The commercial photography of flowers for botanical records',
    ],
    answer: 'The language of flowers — assigning precise meanings to each bloom and colour',
    explanation: `Floriography is the Victorian art of communicating through flowers — each bloom and colour carried a precise message: love, sorrow, admiration, farewell. It allowed Victorians to express feelings that polite society forbade speaking aloud. The practice was especially rich in the 1800s.`,
    category: 'Flower Meanings',
  };
}

function qWhiteFlowersCulture() {
  return {
    question: `White flowers symbolise purity and celebration in Western cultures. What do they typically represent in many Eastern cultures?`,
    options: ['Mourning and death', 'Prosperity and wealth', 'Romantic love', 'New beginnings and hope'],
    answer: 'Mourning and death',
    explanation: `Cultural variation in flower meanings is significant — always check before arranging for specific occasions or recipients. White means purity in the West (bridal use) but mourning in many Eastern cultures. Red means love in the West but luck and celebration in China.`,
    category: 'Cultural Knowledge',
  };
}

function qDaisyEtymology() {
  return {
    question: `The English word "daisy" comes from Old English "dæges ēage." What does this translate to?`,
    options: ["Day's eye", "Angel's crown", "Pure star", "Morning dew"],
    answer: "Day's eye",
    explanation: `"Daisy" comes from Old English "dæges ēage" — "day's eye" — because the flower opens at dawn and closes at dusk. In Norse mythology, the daisy was sacred to Freya, goddess of love and fertility. The "he loves me, he loves me not" tradition dates back to medieval Europe.`,
    category: 'Flower Meanings',
  };
}

function qDelphinium() {
  return {
    question: `The delphinium takes its name from the Greek word "delphis." What does this mean, and why?`,
    options: [
      'Dolphin — the unopened bud nectary resembles a dolphin\'s shape',
      'Sky — because of its tall blue spikes reaching upward',
      'Water — because it grows near rivers and streams',
      'Star — because each floret has a star-like pattern',
    ],
    answer: 'Dolphin — the unopened bud nectary resembles a dolphin\'s shape',
    explanation: `The name delphinium comes from the Greek "delphis" (dolphin) — the nectary of the unopened bud resembles a dolphin's shape. In Native American cultures, delphiniums were used to make blue dye for ceremonial clothing. Their intense blue is unusually rare in the flower world.`,
    category: 'Flower Meanings',
  };
}

/* ─── Sustainable Floristry ─── */

function qFoamMicroplastics() {
  return {
    question: `How many microplastic particles can a single brick of floral foam release when handled?`,
    options: ['Up to 7.5 million', 'Around 500,000', 'Around 2 million', 'Up to 20 million'],
    answer: 'Up to 7.5 million',
    explanation: `A single brick of floral foam releases up to 7.5 million microplastic particles. These pass through wastewater treatment unchanged, accumulating in rivers, oceans, and food chains. The RHS Chelsea Flower Show banned single-use floral foam in 2021.`,
    category: 'Sustainable Floristry',
  };
}

function qImportedPercentage() {
  return {
    question: `What percentage of cut flowers sold in the UK are imported — primarily from Kenya and the Netherlands?`,
    options: ['Over 90%', 'Around 50%', 'Around 70%', 'Around 30%'],
    answer: 'Over 90%',
    explanation: `Over 90% of UK cut flowers are imported. The average flower from Kenya travels 6,500+ miles by air freight — one of the most carbon-intensive transport methods. British-grown seasonal flowers arrive at market within 24–48 hours of cutting, needing no air freight or refrigerated storage.`,
    category: 'Sustainable Floristry',
  };
}

function qBritishSeason() {
  return {
    question: `When does the peak British flower-growing season run?`,
    options: ['May to October', 'January to June', 'March to August', 'July to December'],
    answer: 'May to October',
    explanation: `The peak British growing season runs May–October. Seasonal British flowers are fresher, cheaper, and require no air freight. Many UK florists now plan designs around what is naturally in season rather than importing year-round varieties.`,
    category: 'Sustainable Floristry',
  };
}

function qFoamAlternative() {
  return {
    question: `Which of the following is a genuine eco-friendly alternative to single-use floral foam?`,
    options: [
      'Chicken wire crumpled into a vase',
      'Polystyrene foam sheeting',
      'Acrylic water gel crystals',
      'Expanded polyurethane sheeting',
    ],
    answer: 'Chicken wire crumpled into a vase',
    explanation: `Chicken wire crumpled into a vase is described as "the most versatile foam-free mechanic." Other alternatives include kenzan pin holders, florist tape grids, moss armatures, and reusable cage mechanics — all reusable and far more sustainable than single-use foam.`,
    category: 'Sustainable Floristry',
  };
}

function qFlowerWaste() {
  return {
    question: `Approximately what proportion of cut flowers purchased by UK florists never reach a vase?`,
    options: ['Around 40%', 'Around 5%', 'Around 20%', 'Around 60%'],
    answer: 'Around 40%',
    explanation: `Around 40% of cut flowers purchased by UK florists never reach a vase — lost to overordering, poor forecasting, and minimum order requirements. Better ordering systems, smaller grower relationships, and creative use of near-end stock can dramatically reduce this.`,
    category: 'Sustainable Floristry',
  };
}

function qFairtradeKenya() {
  return {
    question: `Which certification guarantees flower farm workers receive fair wages and that environmental standards are upheld?`,
    options: ['Fairtrade certification', 'ISO 14001 standard', 'BS7750 British Standard', 'CITES Appendix I listing'],
    answer: 'Fairtrade certification',
    explanation: `Fairtrade certification guarantees a minimum price to growers and a Fairtrade Premium invested in community projects — schools, clean water, healthcare. The Rainforest Alliance focuses on environmental practices. Together they help protect over 100,000 Kenyan flower workers, the majority of whom are women.`,
    category: 'Sustainable Floristry',
  };
}

function qFoamChelsea() {
  return {
    question: `Which prestigious horticultural event banned single-use floral foam in 2021?`,
    options: [
      'The RHS Chelsea Flower Show',
      'The Hampton Court Palace Garden Festival',
      'The Royal Horticultural Society Annual Exhibition',
      'The British Florist Association Awards',
    ],
    answer: 'The RHS Chelsea Flower Show',
    explanation: `The RHS Chelsea Flower Show banned single-use floral foam in 2021, marking a major shift for the industry. Many professional studios have pledged to phase it out entirely. Biodegradable foam alternatives exist but are not yet proven to be fully eco-friendly.`,
    category: 'Sustainable Floristry',
  };
}

function qDriedFlowersBenefit() {
  return {
    question: `Drying and preserving surplus flowers at peak quality provides what benefit to a floristry studio?`,
    options: [
      'Extends flower life from days to years and creates an additional revenue stream',
      'Reduces the need for cold chain management and refrigeration',
      'Allows fresh flowers to be used in larger arrangements',
      'Eliminates the need for flower food and conditioning chemicals',
    ],
    answer: 'Extends flower life from days to years and creates an additional revenue stream',
    explanation: `Dried floristry has seen a significant resurgence in popularity and preserved flowers command premium prices. Air-drying, silica gel drying, and pressing all work well for different materials. A studio that routinely dries surplus stock can sell dried bunches with almost no additional cost.`,
    category: 'Sustainable Floristry',
  };
}

/* ─── Floristry Terminology ─── */

function qGlossaryDef() {
  const g = pick(GLOSSARY);
  const wrongs = sample(GLOSSARY.filter(x => x.term !== g.term), 3);
  const opts = shuffle([g.def, ...wrongs.map(x => x.def)]);
  return {
    question: `What is the correct meaning of the floristry term "${g.term}"?`,
    options: opts,
    answer: g.def,
    explanation: `${g.term} (${g.category}): ${g.def}`,
    category: 'Floristry Terminology',
  };
}

function qGlossaryTerm() {
  const g = pick(GLOSSARY);
  const firstSentence = g.def.split('.')[0];
  const wrongs = sample(GLOSSARY.filter(x => x.term !== g.term), 3);
  const opts = shuffle([g.term, ...wrongs.map(x => x.term)]);
  return {
    question: `Which floristry term is defined as: "${firstSentence}"?`,
    options: opts,
    answer: g.term,
    explanation: `${g.term} (${g.category}): ${g.def}`,
    category: 'Floristry Terminology',
  };
}

function qVaseLife() {
  return {
    question: `According to professional conditioning standards, how long can carnations last in a vase?`,
    options: ['14–21 days', '3–5 days', '7–10 days', '25–30 days'],
    answer: '14–21 days',
    explanation: `Carnations have exceptional vase life — 14–21 days with proper conditioning. Compare this to sweet peas (4–7 days) and roses (7–14 days). Conditioning, flower food, and regular water changes all significantly extend vase life.`,
    category: 'Care & Conditioning',
  };
}

function qXylem() {
  return {
    question: `What is the "xylem" in a flower stem, and why does it matter for conditioning?`,
    options: [
      'Vascular tissue that carries water upward — blockages cause wilting',
      'The outer waxy coating that prevents water loss from petals',
      'A hormone that triggers bud opening when light levels change',
      'The pigment layer in petals responsible for colour intensity',
    ],
    answer: 'Vascular tissue that carries water upward — blockages cause wilting',
    explanation: `The xylem carries water from the cut stem end upward to all parts of the plant. An air bubble or bacterial blockage stops uptake and causes wilting. This is precisely why stems must be recut at 45° — to remove the sealed end and open fresh xylem tissue to water.`,
    category: 'Floristry Terminology',
  };
}

function qBindingPoint() {
  return {
    question: `In a hand-tied bouquet, where should the "binding point" be positioned?`,
    options: [
      'About one-third up from the cut ends',
      'At the midpoint of the stems',
      'Just below the flower heads',
      'At the very base of the stems',
    ],
    answer: 'About one-third up from the cut ends',
    explanation: `The binding point — where all stems are held and tied — sits about one-third up from the cut ends. A clean binding point is the hallmark of skilled hand-tied work, allowing the bouquet to stand unsupported in a vase.`,
    category: 'Floristry Terminology',
  };
}

function qDutchAuction() {
  return {
    question: `What is the "Dutch auction" system used at major flower markets like Royal FloraHolland in Aalsmeer?`,
    options: [
      'A descending-price clock — starts high and drops until a buyer stops it',
      'An ascending-price bid where buyers compete upward until one wins',
      'A sealed envelope system where buyers submit blind bids',
      'A rotating rota system assigning lots to registered buyers in sequence',
    ],
    answer: 'A descending-price clock — starts high and drops until a buyer stops it',
    explanation: `The Dutch auction clock starts at a high price and rapidly descends. The first buyer to stop the clock wins the lot. Speed and decisiveness are essential — hesitation means losing the lot. Royal FloraHolland in Aalsmeer is the world's largest flower auction.`,
    category: 'Floristry Terminology',
  };
}

function qMarkup() {
  return {
    question: `What is the standard markup on individual stems in UK floristry trade?`,
    options: ['2.5–3× wholesale cost', '5× wholesale cost', '1.5× wholesale cost', '10× wholesale cost'],
    answer: '2.5–3× wholesale cost',
    explanation: `Standard UK floristry markup is 2.5–3× wholesale cost for individual stems — higher for made-up work that includes labour and sundries. Understanding and applying correct markup is fundamental to running a profitable floristry business.`,
    category: 'Floristry Terminology',
  };
}

function qColdChain() {
  return {
    question: `What is the "cold chain" in flower distribution, and why does maintaining it matter?`,
    options: [
      'Temperature-controlled journey from grower to florist — breaks shorten vase life',
      'The process of cooling flowers in ice water immediately before arranging',
      'A wholesale pricing system based on freshness and refrigeration grade',
      'The refrigeration unit installed in delivery vehicles',
    ],
    answer: 'Temperature-controlled journey from grower to florist — breaks shorten vase life',
    explanation: `The cold chain is the unbroken temperature-controlled journey from grower to wholesaler to florist. Any break — sitting in a warm van, for example — significantly reduces vase life. British-grown flowers often beat long-distance imports precisely because their cold chain is so much shorter.`,
    category: 'Floristry Terminology',
  };
}

function qPaveTechnique() {
  return {
    question: `In floristry, what is the "pavé" technique?`,
    options: [
      'Flowers cut very short and massed tightly at the same level, like cobblestones',
      'Tall parallel stems arranged in regimented vertical groups',
      'Flowers wired individually before being inserted into foam',
      'A hand-tied spiral technique used for bridal bouquets',
    ],
    answer: 'Flowers cut very short and massed tightly at the same level, like cobblestones',
    explanation: `Pavé (from the French for "paved") places flowers cut very short and massed tightly at the same level, covering the mechanics completely like cobblestones in a road. It creates a lush, textural carpet of bloom and is popular in contemporary low centrepieces.`,
    category: 'Floristry Terminology',
  };
}

function qEthyleneGlosssary() {
  return {
    question: `What is ethylene gas in the context of floristry, and what produces it?`,
    options: [
      'A natural gas produced by ripening fruit and damaged flowers — accelerates ageing in sensitive varieties',
      'A preservative gas used in cold rooms to extend flower vase life',
      'A nutrient released by flower food that strengthens stem cell walls',
      'A fragrance compound emitted by heavily scented flowers',
    ],
    answer: 'A natural gas produced by ripening fruit and damaged flowers — accelerates ageing in sensitive varieties',
    explanation: `Ethylene is a natural gas produced by ripening fruit and dying or damaged flowers. It accelerates ageing in ethylene-sensitive varieties like carnations, sweet peas, and roses. Even one piece of fruit nearby can significantly shorten vase life — always keep flowers away from fruit bowls.`,
    category: 'Floristry Terminology',
  };
}

/* ─── Care & Conditioning ─── */

function qPHWater() {
  return {
    question: `At what water pH should cut flower stems be rinsed to maximise water uptake?`,
    options: ['pH 3.5–4.5 (slightly acidic)', 'pH 7 (neutral)', 'pH 9–10 (alkaline)', 'pH 1–2 (strongly acidic)'],
    answer: 'pH 3.5–4.5 (slightly acidic)',
    explanation: `Slightly acidic water (pH 3.5–4.5) prevents air bubbles blocking the xylem and maximises water uptake. Commercial flower food contains acidifiers to achieve this. UK tap water is typically neutral to slightly alkaline, so flower food makes a genuine, measurable difference to vase life.`,
    category: 'Care & Conditioning',
  };
}

function qHollowStemCare() {
  return {
    question: `Delphiniums and dahlias have hollow stems requiring special conditioning. What is the correct method?`,
    options: [
      'Turn upside down, fill with water, then plug with cotton wool',
      'Cut at 45° and immediately submerge in boiling water for 30 seconds',
      'Crush the stem ends with a hammer to break open the tissue',
      'Sear the stem base in a flame before placing in cold water',
    ],
    answer: 'Turn upside down, fill with water, then plug with cotton wool',
    explanation: `Hollow-stemmed flowers like delphiniums and dahlias must be inverted, filled with water, and plugged with cotton wool before placing upright in a bucket. This fills the air space and prevents the stem from collapsing under the flower's weight as it drinks.`,
    category: 'Care & Conditioning',
  };
}

function qWoodyStemCare() {
  return {
    question: `When conditioning woody-stemmed flowers like lilac or viburnum, what technique maximises water uptake?`,
    options: [
      'Hammer or split the bottom 3–5cm of the stem to increase surface area',
      'Cut at a very shallow angle (almost horizontal)',
      'Remove all leaves and sear the base in boiling water for 1 minute',
      'Place in ice-cold water for 24 hours before arranging',
    ],
    answer: 'Hammer or split the bottom 3–5cm of the stem to increase surface area',
    explanation: `Woody-stemmed flowers have thick, bark-covered stems that resist water uptake. Hammering or splitting the bottom 3–5cm breaks down the woody tissue and dramatically increases the surface area available for absorption — essential for lilac, viburnum, and other shrubby stems.`,
    category: 'Care & Conditioning',
  };
}

/* ─── Design Principles ─── */

function qProportion() {
  return {
    question: `Classical floristry design rules suggest an arrangement should be what height relative to its container?`,
    options: ['1.5–2× the container height', 'Equal to the container height', '3× the container height', 'Half the container height'],
    answer: '1.5–2× the container height',
    explanation: `Classical proportion rules suggest a design should be 1.5–2× the height of its container. This creates visual balance between flowers and vessel. Some contemporary styles intentionally break this rule for dramatic effect — but understanding the rule first is essential.`,
    category: 'Design Principles',
  };
}

function qAdvancementRecession() {
  return {
    question: `In floral design, what does "advancement" refer to?`,
    options: [
      'Warm or light colours appearing to come forward visually, feeling closer to the viewer',
      'Placing the tallest stems at the back of an arrangement',
      'Gradually increasing the size of flowers from base to tip',
      'The technique of wiring flowers to advance them beyond the natural stem length',
    ],
    answer: 'Warm or light colours appearing to come forward visually, feeling closer to the viewer',
    explanation: `Advancement is the visual effect of warm or light colours appearing to come forward in a design, making elements feel closer to the viewer. The opposite is "recession" — dark, cool, or dull colours that recede and create depth. Understanding this helps florists control visual weight and depth.`,
    category: 'Design Principles',
  };
}

function qMonochromatic() {
  return {
    question: `In floral colour theory, what defines a "monochromatic" colour scheme?`,
    options: [
      'Different tints, tones, and shades of a single hue',
      'Two colours directly opposite on the colour wheel',
      'Three colours equally spaced around the colour wheel',
      'Five adjacent colours on the colour wheel',
    ],
    answer: 'Different tints, tones, and shades of a single hue',
    explanation: `A monochromatic scheme uses tints, tones, and shades of a single hue — creating elegant, sophisticated designs. An all-white or all-blush palette is a classic bridal monochromatic scheme. It is often described as the most fail-safe of all colour approaches in floristry.`,
    category: 'Design Principles',
  };
}

/* ─── Wedding Floristry ─── */

function qWeddingBouquetStyle() {
  const variants = [
    {
      question: `Which UK wedding bouquet style is the most popular, featuring a hand-tied domed shape?`,
      answer: 'Round / Posy',
      distractors: ['Cascading', 'Crescent', 'Single stem'],
      explanation: `The Round/Posy is the most popular UK bridal bouquet — a hand-tied domed shape, typically 25–35cm in diameter. Clean, balanced, and flattering for most dress silhouettes. It has been the UK's favourite bridal style for decades.`,
    },
    {
      question: `Which bridal bouquet style flows downward dramatically and requires wiring skills to construct?`,
      answer: 'Cascading',
      distractors: ['Round / Posy', 'Wildflower / Organic', 'Crescent'],
      explanation: `The cascading bouquet trails elegantly downward, traditionally associated with formal classic weddings. It requires wiring skills to achieve the flowing, waterfall-like shape — quite different from the simpler hand-tied round/posy approach.`,
    },
    {
      question: `Which current UK wedding bouquet trend features a loose, garden-picked aesthetic with foliage and herbs?`,
      answer: 'Wildflower / Organic',
      distractors: ['Cascading', 'Round / Posy', 'Crescent'],
      explanation: `The Wildflower/Organic style is the most popular current UK wedding trend — loose, naturalistic, with foliage, herbs, and wildflowers. It's a deliberate shift away from formal, structured bouquets toward a garden-gathered aesthetic.`,
    },
  ];
  const v = pick(variants);
  const opts = shuffle([v.answer, ...v.distractors]);
  return { question: v.question, options: opts, answer: v.answer, explanation: v.explanation, category: 'Wedding Floristry' };
}

function qWeddingElements() {
  const variants = [
    {
      question: `In UK wedding floristry, a "buttonhole" is worn by the groom, groomsmen, and key guests. What does it consist of?`,
      options: [
        'A single wired flower or spray on a lapel',
        'A wrist corsage of mixed blooms',
        'A small posy carried in the hand',
        'A floral circlet pinned to a hat',
      ],
      answer: 'A single wired flower or spray on a lapel',
      explanation: `A buttonhole (boutonnière in American English) is a small, wired single flower or spray worn on a jacket lapel. Traditionally a rose, carnation, or freesia, it should relate to the bridal bouquet palette. The groom, groomsmen, fathers, and key guests typically wear one.`,
    },
    {
      question: `How many stems does a full floral ceremony arch typically require?`,
      options: ['600–800 stems', '50–100 stems', '200–350 stems', '1,500+ stems'],
      answer: '600–800 stems',
      explanation: `A full floral ceremony arch typically requires 600–800 stems and is the most impactful ceremony installation. It frames the couple during the ceremony and creates stunning photography. A simpler draped frame is a lower-stem alternative for smaller budgets.`,
    },
    {
      question: `In wedding floristry, what is the difference between a buttonhole and a corsage?`,
      options: [
        'A buttonhole is a lapel spray (groom/groomsmen); a corsage is worn on the wrist or lapel by mothers of the couple',
        'A buttonhole is worn by women; a corsage is worn by men',
        'A buttonhole is always a single stem; a corsage is always a full bouquet',
        'A buttonhole is fresh flowers; a corsage is always dried or preserved',
      ],
      answer: 'A buttonhole is a lapel spray (groom/groomsmen); a corsage is worn on the wrist or lapel by mothers of the couple',
      explanation: `A buttonhole (UK) or boutonnière (US) is worn on a lapel by men — groom, groomsmen, fathers. A corsage is more elaborate and worn on the wrist or pinned to a lapel by mothers of the couple. Both require wiring and taping for a neat, lightweight result.`,
    },
    {
      question: `What is a "bud vase cluster" table centre in wedding floristry?`,
      options: [
        'Groups of 5–9 small vessels at varying heights — a relaxed, modern style',
        'A single tall vase of mixed flowers above eye level',
        'A low square foam arrangement in a mirrored tray',
        'A floral runner stretching the full length of the table',
      ],
      answer: 'Groups of 5–9 small vessels at varying heights — a relaxed, modern style',
      explanation: `Bud vase clusters — groups of 5–9 small vessels at varying heights — are a very popular current UK wedding trend. They are relaxed, modern, and highly adaptable to different table sizes and shapes. Often a lower-cost alternative to a single large centrepiece.`,
    },
  ];
  const v = pick(variants);
  return { ...v, category: 'Wedding Floristry' };
}

/* ─── Generator registry ─── */

const ALL_DEEP_GENERATORS = [
  qMeaningOverall, qMeaningColour, qWhichFlowerForMeaning, qMeaningOccasion,
  qFlowerCategory, qSubRosa, qDaffodilNationalFlower, qChrysanthemumCulture,
  qOrchidSpecies, qProteasAge, qSweetPeaMeaning, qTulipMania,
  qForgetMeNotLegend, qDahliaOrigin, qLavenderEtymology, qAnemoneMyth,
  qPeonyChina, qIrisGoddess, qHelleboreHistory, qHyacinthMyth,
  qFreesiaOrigin, qDaisyEtymology, qDelphinium,
  qFloriographyDefinition, qWhiteFlowersCulture,
  qFoamMicroplastics, qImportedPercentage, qBritishSeason,
  qFoamAlternative, qFlowerWaste, qFairtradeKenya, qFoamChelsea, qDriedFlowersBenefit,
  qGlossaryDef, qGlossaryTerm,
  qVaseLife, qXylem, qBindingPoint, qDutchAuction, qMarkup, qColdChain,
  qPaveTechnique, qEthyleneGlosssary,
  qPHWater, qHollowStemCare, qWoodyStemCare,
  qProportion, qAdvancementRecession, qMonochromatic,
  qWeddingBouquetStyle, qWeddingElements,
];

export const DEEP_QUIZ_LENGTH = 40;

export const DEEP_CATEGORY_COLOURS = {
  'Flower Meanings':       '#C9948E',
  'Gifting & Occasions':   '#E8A44A',
  'Cultural Knowledge':    '#8B5E9E',
  'Sustainable Floristry': '#6B8A66',
  'Floristry Terminology': '#5B7BA8',
  'Wedding Floristry':     '#948C82',
  'Care & Conditioning':   '#3D7A8A',
  'Design Principles':     '#8B7355',
};

export function generateDeepQuiz() {
  const questions = [];
  const usedGenerators = new Set();
  const usedQuestions = new Set();
  let attempts = 0;

  while (questions.length < DEEP_QUIZ_LENGTH && attempts < DEEP_QUIZ_LENGTH * 12) {
    attempts++;
    const gen = pick(ALL_DEEP_GENERATORS);
    if (usedGenerators.has(gen) && questions.length < ALL_DEEP_GENERATORS.length) continue;
    const q = gen();
    if (!q) continue;
    if (usedQuestions.has(q.question)) continue;
    usedGenerators.add(gen);
    usedQuestions.add(q.question);
    questions.push(q);
  }

  return questions;
}
