import { useState } from 'react';
import Hero from '../shared/Hero';
import { BackLink, SectionHead, PillGroup } from '../shared/LearningPage';

const WEDDING_STYLES = [
  {
    key: 'classic',
    icon: '🏛️',
    name: 'Classic',
    tag: 'Timeless',
    tagColour: 'bg-stone-100 text-stone-500',
    desc: 'Formal, elegant, and enduringly popular. White and cream with greenery. The benchmark against which other styles are measured.',
    palette: ['Ivory', 'White', 'Cream', 'Soft green', 'Gold accents'],
    flowers: ['White rose', 'White lisianthus', 'White peony', 'Lily of the valley', 'White ranunculus'],
    foliage: ['Asparagus fern', 'Ruscus', 'Pittosporum', 'Eucalyptus'],
    bouquet: 'Round posy, 28–32cm, tight and domed. Very clean foliage collar. White ribbon handle.',
    reception: 'Low round arrangements in white vessels. White candles. Simple and restrained.',
    tip: 'The most frequently requested UK wedding style. Mastering Classic first gives you the discipline to execute all other styles.',
  },
  {
    key: 'romantic',
    icon: '🌹',
    name: 'Romantic',
    tag: 'Popular',
    tagColour: 'bg-[#D4B8B5]/40 text-[#5C4535]',
    desc: 'Soft, lush, and feminine. Blush, peach, and dusky pink tones with abundant textures. Garden roses and peonies are the signature flowers.',
    palette: ['Blush pink', 'Dusty rose', 'Peach', 'Champagne', 'Antique white'],
    flowers: ['Garden rose', 'Peony', 'Ranunculus', 'Sweet pea', 'Astrantia', 'Lisianthus'],
    foliage: ['Eucalyptus', 'Pittosporum', 'Soft ruscus', 'Ferns', 'Olive'],
    bouquet: 'Garden style or generous round posy. Loose and lush. Blush garden roses as the focal.',
    reception: 'Low lush arrangements. Bud vase clusters. Soft candles. Abundant and generous.',
    tip: 'The most commercially important style in current UK wedding floristry. Invest time learning the Romantic style first.',
  },
  {
    key: 'english-garden',
    icon: '🌸',
    name: 'English Garden',
    tag: 'British Classic',
    tagColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    desc: 'Inspired by an English cottage garden in June. Mixed seasonal flowers, herbs, and naturalistic foliage. Informally structured and richly textured.',
    palette: ['Mixed pastels', 'Blush', 'Lilac', 'Sage green', 'Warm white'],
    flowers: ['Sweet pea', 'Garden rose', 'Foxglove', 'Delphinium', 'Scabiosa', 'Ammi'],
    foliage: ['Herb foliage (mint, rosemary)', 'Astrantia leaves', 'Ferns', 'Grasses', 'Blackberry'],
    bouquet: 'Garden style, loose and highly textural. Includes herbs and foliage at the edges. Never perfectly round.',
    reception: 'Bud vase clusters with herb jars. Floral runners. Relaxed and abundant.',
    tip: 'The key to English Garden style is the foliage — it should be as important as the flowers. Use 5–6 foliage varieties, not just two.',
  },
  {
    key: 'luxury',
    icon: '👑',
    name: 'Luxury',
    tag: 'Premium',
    tagColour: 'bg-amber-50 text-amber-700',
    desc: 'The highest price-point style. Premium flowers in abundance. Installations, hanging florals, and ceremony arches. Garden roses, magnolia, and orchids dominate.',
    palette: ['Deep ivory', 'Warm white', 'Gold', 'Antique champagne', 'Deep green'],
    flowers: ['Garden rose (premium varieties)', 'Magnolia', 'Orchid', 'Lily of the valley', 'Phalaenopsis', 'Amaryllis'],
    foliage: ['Magnolia leaves', 'Olive branch', 'Large tropical leaves', 'Smilax', 'Bay'],
    bouquet: 'Generous round posy or cascade. Premium flowers only. Velvet ribbon with pearl pins.',
    reception: 'Statement candelabra arrangements. Full ceremony arch. Hanging installations.',
    tip: 'Luxury weddings are won through relationships and reputation, not price lists. Prioritise quality over quantity in every decision.',
  },
  {
    key: 'contemporary',
    icon: '🖼️',
    name: 'Contemporary',
    tag: 'Modern',
    tagColour: 'bg-stone-100 text-stone-500',
    desc: 'Clean lines, controlled colour palettes, and deliberate negative space. Often monochromatic. Dried and structural materials increasingly popular.',
    palette: ['White', 'Black accents', 'Terracotta', 'Sage', 'Warm neutrals'],
    flowers: ['Anthurium', 'Calla lily', 'Protea', 'Dried pampas', 'Cotton stems', 'Banksia'],
    foliage: ['Eucalyptus (preserved)', 'Ruscus (dried)', 'Structural grasses', 'Tropical leaves'],
    bouquet: 'Asymmetrical or single-stem. Minimal filler. High-impact focal flowers with deliberate negative space.',
    reception: 'Architectural arrangements. Bud vase clusters in matte vessels. Restrained and precise.',
    tip: 'Contemporary style is harder than it looks — every flower and every gap is intentional. Undisciplined contemporary style just looks unfinished.',
  },
  {
    key: 'minimalist',
    icon: '⬜',
    name: 'Minimalist',
    tag: 'Simple',
    tagColour: 'bg-stone-100 text-stone-500',
    desc: 'Fewer, better. Single varieties, clean lines, and very little foliage. Every stem earns its place. White, green, and single-colour palettes predominate.',
    palette: ['White', 'Soft green', 'Single accent colour'],
    flowers: ['White rose', 'White ranunculus', 'White cosmos', 'Single dahlia', 'White anemone'],
    foliage: ['Minimal — one variety only. Eucalyptus coins or ruscus sprigs.'],
    bouquet: 'Round posy, single variety, one foliage. Or single large stem. Rarely exceeds 25cm.',
    reception: 'Single-stem bud vases. Minimal. Often paired with candlelight.',
    tip: 'Minimalist is the most unforgiving style — there is nowhere to hide imperfect stems or sloppy construction. Flower and technique quality must be perfect.',
  },
  {
    key: 'rustic',
    icon: '🌾',
    name: 'Rustic',
    tag: 'Relaxed',
    tagColour: 'bg-amber-50 text-amber-700',
    desc: 'Natural, textured, and unfussy. Barn and outdoor venues. Hessian, wood, and terracotta. Mixed grains, grasses, and seasonal wildflowers.',
    palette: ['Warm white', 'Wheat', 'Terracotta', 'Sage green', 'Rust'],
    flowers: ['Sunflower', 'Cosmos', 'Chrysanthemum', 'Alstroemeria', 'Dahlia', 'Dried grasses'],
    foliage: ['Eucalyptus', 'Ferns', 'Wheat and grains', 'Hops', 'Olive'],
    bouquet: 'Garden style, generous and relaxed. Hessian or twine handle wrap. Grasses at the edges.',
    reception: 'Bud vase clusters in terracotta or jute-wrapped vessels. Hay bale florals. Floral runners.',
    tip: 'Rustic has the most forgiving aesthetic — imperfect stems and organic shapes are features, not flaws. A great entry point for beginners.',
  },
  {
    key: 'bohemian',
    icon: '🌙',
    name: 'Bohemian',
    tag: 'Free-spirited',
    tagColour: 'bg-[#D4B8B5]/40 text-[#5C4535]',
    desc: 'Flowing, earthy, and unconventional. Dried flowers, macramé, feathers, and wild textures. Pampas grass and protea are signature materials.',
    palette: ['Terracotta', 'Dusty mauve', 'Rust', 'Warm nude', 'Dried straw'],
    flowers: ['Protea', 'Dried pampas', 'Dried banksia', 'Preserved rose', 'Cotton stems', 'Dried orange slices'],
    foliage: ['Dried pampas', 'Dried ferns', 'Preserved magnolia', 'Ruscus (dried)', 'Grasses'],
    bouquet: 'Large, loose, and textural. Mixed fresh and dried. Trailing grasses and pampas at the edges.',
    reception: 'Dried pampas installations. Macramé backdrops with dried florals. Earthy vessels.',
    tip: 'Dried and preserved florals in Bohemian designs are made weeks in advance — a significant logistical and financial advantage. Discuss with couples.',
  },
  {
    key: 'wild',
    icon: '🌿',
    name: 'Wild & Natural',
    tag: 'Sustainable',
    tagColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    desc: 'Looks genuinely foraged. Unstructured, almost undone. Cow parsley, ferns, wildflowers, and British seasonal flowers only. The opposite of anything engineered.',
    palette: ['Soft white', 'Green', 'Yellows', 'Purples', 'Whatever is in season'],
    flowers: ['Ammi', 'Scabiosa', 'Cornflower', 'Foxglove', 'Cosmos', 'Poppy'],
    foliage: ['Ferns', 'Ivy', 'Blackberry', 'Beech', 'Wild grasses', 'Herbs'],
    bouquet: 'Truly wild-looking — stems of varying lengths, no uniform dome, trailing ends. Should look self-gathered.',
    reception: 'Loose bud vase clusters. Foliage-heavy floral runners. Branches in tall vessels.',
    tip: 'Wild style demands the most flower knowledge — you need to know what is genuinely in season regionally to source authentically. No foraged stem substitutes.',
  },
  {
    key: 'sustainable',
    icon: '♻️',
    name: 'Sustainable Wedding',
    tag: 'Eco-conscious',
    tagColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    desc: 'British-grown, seasonal, zero foam, minimal packaging, repurposed where possible. A growing segment of the UK market with very conscious couples.',
    palette: ['Seasonal palette — not fixed', 'Whatever British growers offer'],
    flowers: ['Seasonal British-grown only — dahlia, sweet pea, scabiosa, etc.'],
    foliage: ['Seasonal British foliage — ivy, fern, rosehip, beech, herbs'],
    bouquet: 'Garden style in seasonal materials. Twine binding. No oasis. No imported flowers.',
    reception: 'Foam-free mechanics only. Bud vase clusters. Repurposed vessels. Compost-friendly.',
    tip: 'Sustainable weddings command a premium in the UK market currently. Training in foam-free mechanics and UK-grown sourcing is a direct commercial advantage.',
  },
];

export default function WeddingStylesPage({ go }) {
  const [activeStyle, setActiveStyle] = useState('romantic');
  const selected = WEDDING_STYLES.find(s => s.key === activeStyle);

  return (
    <div>
      <Hero
        eyebrow="Wedding Floristry · Design Direction"
        title="Wedding Styles &"
        em="Trends"
        sub="Ten wedding design styles — from Classic to Sustainable — with colour palettes, signature flowers, and design guidance for each."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Wedding Floristry" onBack={() => go?.('wedding')} />

        <SectionHead
          eyebrow="Ten Wedding Styles"
          title="Find Your Design Direction"
          desc="Tap any style to see colour palettes, signature flowers, and design guidance."
        />

        {/* Style selector buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {WEDDING_STYLES.map(style => (
            <button
              key={style.key}
              onClick={() => setActiveStyle(style.key)}
              className={`flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full border transition-all ${
                activeStyle === style.key
                  ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-[#3D5C3A]/40'
              }`}
            >
              <span>{style.icon}</span>
              <span>{style.name}</span>
            </button>
          ))}
        </div>

        {/* Selected style detail panel */}
        {selected && (
          <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#3D5C3A]/5 border-b border-stone-100 px-6 py-5">
              <div className="flex items-start gap-4 flex-wrap">
                <span className="text-3xl flex-shrink-0">{selected.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[26px] font-semibold text-stone-800 leading-tight">{selected.name}</h2>
                    <span className={`text-[8px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${selected.tagColour}`}>{selected.tag}</span>
                  </div>
                  <p className="text-[13px] text-stone-500 font-light leading-relaxed max-w-2xl">{selected.desc}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              {/* 3-col grid: palette, flowers, foliage */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Colour palette</p>
                  <PillGroup items={selected.palette} />
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Signature flowers</p>
                  <PillGroup items={selected.flowers} colour="bg-[#D4B8B5]/30 text-[#5C4535]" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Foliage choices</p>
                  <PillGroup items={selected.foliage} colour="bg-[#B8CEAE]/30 text-[#3D5C3A]" />
                </div>
              </div>

              {/* 2-col: bouquet note, reception note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-stone-50 rounded-lg border border-stone-100 px-4 py-4">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-2">Bouquet approach</p>
                  <p className="text-[12px] text-stone-600 font-light leading-relaxed">{selected.bouquet}</p>
                </div>
                <div className="bg-stone-50 rounded-lg border border-stone-100 px-4 py-4">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-2">Reception flowers</p>
                  <p className="text-[12px] text-stone-600 font-light leading-relaxed">{selected.reception}</p>
                </div>
              </div>

              {/* Tip callout */}
              <div className="bg-[#3D5C3A] rounded-lg px-5 py-4 flex gap-3">
                <span className="text-[16px] flex-shrink-0">💡</span>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-[#B8CEAE] mb-1">Professional tip</p>
                  <p className="text-[12px] text-white/90 font-light leading-relaxed">{selected.tip}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
