import FLOWERS from './flowers';
import GLOSSARY from './glossary';
import TECHNIQUES_DATA from './techniques';
import WEDDING_DATA from './wedding';
import COND_DATA from './conditioning';
import SUSTAINABILITY from './sustainability';
import STYLES from './styles';
import EQUIPMENT from './equipment';
import TROUBLESHOOTING from './troubleshooting';
import MEANINGS from './meanings';
import MONTHS_CAL from './seasonal';
import { FOCAL, FOLIAGE, FILLER } from './bouquets';
import { VESSELS } from './proportion';
import { COLOUR_NODES } from './colourWheel';
import {
  TRIBUTE_TYPES,
  CULTURAL_CONSIDERATIONS,
  FLOWER_SYMBOLISM,
  SYMPATHY_PALETTES,
} from './sympathy';

export function buildSearchIndex() {
  const items = [];

  // ── Flowers ────────────────────────────────────────────────
  FLOWERS.forEach(f => {
    items.push({
      id: `flower-${f.common}`,
      title: f.common,
      subtitle: `${f.latin} · ${f.roles?.join(', ')}`,
      body: `${f.desc} ${f.care} ${f.tags?.join(' ')}`,
      category: 'Flowers',
      page: 'flowers',
      icon: '🌸',
    });
  });

  // ── Glossary ───────────────────────────────────────────────
  GLOSSARY.forEach(g => {
    items.push({
      id: `glossary-${g.term}`,
      title: g.term,
      subtitle: g.category,
      body: g.def,
      category: 'Glossary',
      page: 'glossary',
      icon: '📖',
    });
  });

  // ── Techniques ─────────────────────────────────────────────
  TECHNIQUES_DATA.forEach(t => {
    items.push({
      id: `technique-${t.title}`,
      title: t.title,
      subtitle: t.sub,
      body: t.steps?.join(' '),
      category: 'Techniques',
      page: 'techniques',
      icon: t.emoji || '✂️',
    });
  });

  // ── Conditioning ───────────────────────────────────────────
  COND_DATA.forEach(c => {
    items.push({
      id: `conditioning-${c.title}`,
      title: c.title,
      subtitle: c.sub,
      body: c.tips?.join(' '),
      category: 'Conditioning & Care',
      page: 'conditioning',
      icon: c.emoji || '💧',
    });
  });

  // ── Styles ─────────────────────────────────────────────────
  STYLES.forEach(s => {
    items.push({
      id: `style-${s.id}`,
      title: s.name,
      subtitle: s.subtitle,
      body: `${s.desc} ${s.characteristics?.join(' ')} ${s.flowers?.join(' ')}`,
      category: 'Design Styles',
      page: 'styles',
      icon: '🖼',
    });
  });

  // ── Equipment ──────────────────────────────────────────────
  EQUIPMENT.forEach(e => {
    items.push({
      id: `equipment-${e.id}`,
      title: e.name,
      subtitle: e.category,
      body: `${e.desc} ${e.uses?.join(' ')} ${e.tip}`,
      category: 'Tools & Equipment',
      page: 'equipment',
      icon: e.icon || '✂️',
    });
  });

  // ── Troubleshooting ────────────────────────────────────────
  TROUBLESHOOTING.forEach(t => {
    items.push({
      id: `trouble-${t.id}`,
      title: t.problem,
      subtitle: t.category,
      body: `${t.symptoms} ${t.causes} ${t.fix} ${t.tip}`,
      category: 'Troubleshooting',
      page: 'troubleshooting',
      icon: t.icon || '🔧',
    });
  });

  // ── Sustainability ─────────────────────────────────────────
  SUSTAINABILITY.forEach(s => {
    items.push({
      id: `sustain-${s.id}`,
      title: s.title,
      subtitle: s.category,
      body: `${s.summary} ${s.detail}`,
      category: 'Sustainability',
      page: 'sustainability',
      icon: s.icon || '🌱',
    });
  });

  // ── Flower Meanings ────────────────────────────────────────
  MEANINGS.forEach(m => {
    items.push({
      id: `meaning-${m.id}`,
      title: m.flower,
      subtitle: m.category,
      body: `${m.overall} ${m.history} ${m.colours?.map(c => c.meaning).join(' ')}`,
      category: 'Flower Meanings',
      page: 'meanings',
      icon: m.emoji || '🌿',
    });
  });

  // ── Seasonal calendar ──────────────────────────────────────
  // Index each month as one entry. Its body contains all flower names so
  // searching a seasonal flower ("dahlia", "hellebore") surfaces the month.
  MONTHS_CAL.forEach(month => {
    items.push({
      id: `seasonal-${month.name}`,
      title: `${month.name} flowers`,
      subtitle: month.season,
      body: month.flowers.join(' '),
      category: 'Seasonal Calendar',
      page: 'seasonal',
      icon: month.emoji || '📅',
    });
  });

  // ── Wedding ────────────────────────────────────────────────
  WEDDING_DATA.forEach(section => {
    section.items?.forEach(([name, desc]) => {
      items.push({
        id: `wedding-${section.title}-${name}`,
        title: name,
        subtitle: section.title,
        body: desc,
        category: 'Wedding Floristry',
        page: 'wedding',
        icon: '💍',
      });
    });
  });

  // ── Bouquet flowers ────────────────────────────────────────
  [...FOCAL, ...FOLIAGE, ...FILLER].forEach(f => {
    if (!items.find(i => i.id === `bouquet-${f.name}`)) {
      items.push({
        id: `bouquet-${f.name}`,
        title: f.name,
        subtitle: `${f.latin} · bouquet guide`,
        body: f.desc,
        category: 'Bouquet Guide',
        page: 'bouquets',
        icon: '💐',
      });
    }
  });

  // ── Proportion & Scale ─────────────────────────────────────
  VESSELS.forEach(v => {
    items.push({
      id: `vessel-${v.key}`,
      title: v.name,
      subtitle: `Vessel · ${v.styles?.join(', ')}`,
      body: `${v.description} ${v.theory} ${v.recommendations ? Object.values(v.recommendations).flat().join(' ') : ''}`,
      category: 'Proportion & Scale',
      page: 'proportion',
      icon: '⚖️',
    });
  });

  // ── Colour nodes ───────────────────────────────────────────
  COLOUR_NODES.forEach(n => {
    items.push({
      id: `colour-${n.name}`,
      title: `${n.name} flowers`,
      subtitle: `${n.temp} · colour wheel`,
      body: n.flowers.join(' '),
      category: 'Colour Wheel',
      page: 'wheel',
      icon: '🎨',
    });
  });

  // ── Sympathy ───────────────────────────────────────────────
  // Tribute types — actionable targets (each tribute has its own selector card)
  TRIBUTE_TYPES.forEach(t => {
    items.push({
      id: `tribute-${t.key}`,
      title: t.name,
      subtitle: `Funeral tribute · ${t.tag}`,
      // Include flower names in body so "lily", "rose" etc. surface this
      body: `${t.description} ${t.design} ${t.flowers.join(' ')} ${t.foliage.join(' ')} ${t.tips.join(' ')}`,
      category: 'Sympathy & Funeral',
      page: 'sympathy',
      icon: t.icon || '🕊️',
    });
  });

  // Cultural considerations — indexed by culture name + notes
  CULTURAL_CONSIDERATIONS.forEach(c => {
    items.push({
      id: `culture-${c.culture}`,
      title: c.culture,
      subtitle: 'Cultural & religious guidance · sympathy',
      body: `${c.notes.join(' ')} ${c.avoid}`,
      category: 'Sympathy & Funeral',
      page: 'sympathy',
      icon: c.icon || '🕊️',
    });
  });

  // Sympathy palettes — indexed by palette name + flower list
  SYMPATHY_PALETTES.forEach(p => {
    items.push({
      id: `sympathy-palette-${p.name}`,
      title: p.name,
      subtitle: 'Sympathy colour palette',
      body: `${p.description} ${p.flowers.join(' ')} ${p.occasions.join(' ')}`,
      category: 'Sympathy & Funeral',
      page: 'sympathy',
      icon: '🎨',
    });
  });

  // Flower symbolism — kept in body of tribute types above; NOT indexed as
  // standalone title entries because clicking "Gladiolus" here would misleadingly
  // route the user to the Sympathy page when they expected the Flowers page.
  // The flower meanings are still searchable via the body text of tribute entries
  // and the MEANINGS page index above.
  void FLOWER_SYMBOLISM; // imported but intentionally not indexed as titles

  return items;
}
