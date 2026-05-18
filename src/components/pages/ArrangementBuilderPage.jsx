import { useState, useMemo } from 'react';
import FLOWERS from '../../data/flowers';
import { FOLIAGE as BOUQUET_FOLIAGE } from '../../data/bouquets';
import { ARRANGEMENT_TYPES, stemPrice } from '../../data/arrangementTypes';

// Adapt bouquets foliage (name/latin) to the flower shape the picker expects
const FOLIAGE_FLOWERS = BOUQUET_FOLIAGE.map((f, i) => ({
  num: `foliage-${i}`,
  common: f.name,
  latin: f.latin,
  season: Array(12).fill(true), // foliage is available year-round
  roles: ['Foliage'],
}));

/* ── helpers ─────────────────────────────────────────────── */
const MONTHS_S = ['J','F','M','A','M','J','J','A','S','O','N','D'];
const ROLE_CONFIG = {
  focal:     { label: 'Focal',     colour: '#3D5C3A', max: 2, min: 1, roles: ['Focal'] },
  secondary: { label: 'Secondary', colour: '#6B8A66', max: 2, min: 0, roles: ['Secondary','Line','Texture'] },
  foliage:   { label: 'Foliage',   colour: '#8B9DC0', max: 3, min: 1, roles: ['Foliage'] },
  filler:    { label: 'Filler',    colour: '#C9948E', max: 2, min: 1, roles: ['Filler'] },
};

function flowersByRole(roleKeys) {
  if (roleKeys.includes('Foliage')) return FOLIAGE_FLOWERS;
  return FLOWERS.filter(f => f.roles.some(r => roleKeys.includes(r)));
}

function distributeStems(flowers, total) {
  if (!flowers.length) return [];
  const base = Math.floor(total / flowers.length);
  const rem  = total % flowers.length;
  return flowers.map((f, i) => ({ flower: f, stems: base + (i < rem ? 1 : 0) }));
}

function calcRecipe(type, size, picks) {
  const total = type.sizes[size].stems;
  const r     = type.ratios;
  const hasSecondary = picks.secondary.length > 0;
  const focalTotal   = Math.round(total * r.focal);
  const secTotal     = hasSecondary ? Math.round(total * r.secondary) : 0;
  const foliageTotal = Math.round(total * r.foliage);
  const fillerTotal  = total - focalTotal - secTotal - foliageTotal;
  return {
    focal:     distributeStems(picks.focal,     focalTotal),
    secondary: distributeStems(picks.secondary, secTotal),
    foliage:   distributeStems(picks.foliage,   foliageTotal),
    filler:    distributeStems(picks.filler,    fillerTotal),
    total,
  };
}

function calcCost(recipe) {
  let cost = 0;
  ['focal','secondary','foliage','filler'].forEach(role => {
    recipe[role].forEach(({ flower, stems }) => { cost += stems * stemPrice(flower.common); });
  });
  return cost;
}

function getWarnings(picks) {
  const all = Object.values(picks).flat().map(f => f.common.toLowerCase());
  const warnings = [];
  if (all.some(n => n.includes('daffodil') || n.includes('narcissus')))
    warnings.push({ emoji: '⚠️', text: 'Daffodils must be conditioned alone for 24 hours before mixing — their sap is toxic to roses and most other stems.' });
  if (all.some(n => n.includes('lily')))
    warnings.push({ emoji: '👕', text: "Remove lily anthers as soon as buds open — pollen permanently stains petals and fabric." });
  if (all.some(n => n.includes('tulip')))
    warnings.push({ emoji: '📏', text: "Tulips keep growing 2–3cm after cutting. Account for this when measuring stem lengths for your arrangement." });
  if (all.some(n => n.includes('hyacinth')))
    warnings.push({ emoji: '🧤', text: "Hyacinth sap can irritate skin — wear gloves when handling large quantities." });
  return warnings;
}

/* ── sub-components ──────────────────────────────────────── */

function MiniSeasonBar({ season }) {
  return (
    <div className="flex gap-px mt-1">
      {season.map((on, i) => (
        <div key={i} className={`h-1 flex-1 rounded-sm ${on ? 'bg-[#6B8A66]' : 'bg-stone-200'}`} title={MONTHS_S[i]}/>
      ))}
    </div>
  );
}

function FlowerChip({ flower, selected, onToggle, disabled }) {
  return (
    <button onClick={onToggle} disabled={disabled && !selected}
      className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all cursor-pointer
        ${selected  ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white'
        : disabled  ? 'bg-stone-50 border-stone-100 text-stone-300 cursor-not-allowed'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-[#3D5C3A]/50'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={`text-[13px] font-semibold leading-tight truncate`} style={{fontFamily:'"Cormorant Garamond",serif'}}>{flower.common}</p>
          <p className={`text-[10px] italic ${selected ? 'text-white/70' : 'text-stone-400'}`}>{flower.latin}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {selected && <span className="text-white text-[10px] font-bold">✓</span>}
          <span className={`text-[9px] font-medium ${selected ? 'text-white/70' : 'text-stone-400'}`}>
            ~£{stemPrice(flower.common).toFixed(2)}/stem
          </span>
        </div>
      </div>
      <MiniSeasonBar season={flower.season}/>
    </button>
  );
}

function FlowerPicker({ roleKey, picks, onToggle }) {
  const cfg     = ROLE_CONFIG[roleKey];
  const flowers = flowersByRole(cfg.roles);
  const sel     = picks[roleKey];
  const atMax   = sel.length >= cfg.max;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[9px] font-medium tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full text-white" style={{background:cfg.colour}}>{cfg.label}</span>
          <span className="text-[11px] text-stone-400 font-light ml-2">
            {cfg.min === 0 ? `Optional · up to ${cfg.max}` : `Pick ${cfg.min}–${cfg.max}`}
          </span>
        </div>
        <span className="text-[11px] font-medium text-stone-500">{sel.length}/{cfg.max} selected</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {flowers.map(f => (
          <FlowerChip key={f.num} flower={f}
            selected={sel.some(s => s.num === f.num)}
            disabled={atMax}
            onToggle={() => onToggle(roleKey, f)}/>
        ))}
      </div>
    </div>
  );
}

function RecipeRow({ label, colour, items }) {
  if (!items.length) return null;
  return (
    <div className="mb-4">
      <p className="text-[9px] font-medium tracking-[0.15em] uppercase mb-2" style={{color:colour}}>{label}</p>
      {items.map(({ flower, stems }) => (
        <div key={flower.num} className="flex items-center justify-between py-1.5 border-b border-stone-50 last:border-0">
          <div>
            <span className="text-[12px] font-medium text-stone-700" style={{fontFamily:'"Cormorant Garamond",serif'}}>{flower.common}</span>
            <span className="text-[10px] text-stone-400 italic ml-1.5">{flower.latin}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] text-stone-400">×{stems}</span>
            <span className="text-[10.5px] text-stone-500 font-medium w-12 text-right">
              £{(stems * stemPrice(flower.common)).toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecipeCard({ type, size, picks, recipe, cost }) {
  const ready = picks.focal.length >= 1 && picks.foliage.length >= 1 && picks.filler.length >= 1;
  const warnings = getWarnings(picks);
  const retail = cost * 2.8;

  function copyRecipe() {
    if (!ready) return;
    const lines = [
      `${type.name} — ${type.sizes[size].label} (${recipe.total} stems)`,
      '',
      ...['focal','secondary','foliage','filler']
        .filter(r => recipe[r].length > 0)
        .flatMap(r => {
          const cfg = ROLE_CONFIG[r];
          return [
            `${cfg.label.toUpperCase()}`,
            ...recipe[r].map(({ flower, stems }) => `  ${flower.common} × ${stems} stems`),
          ];
        }),
      '',
      `Wholesale est. £${cost.toFixed(2)}`,
      `Suggested retail £${retail.toFixed(2)}`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
  }

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-[#3D5C3A] px-5 py-4">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8CEAE] mb-1 font-medium">Your Recipe</p>
        <h3 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[20px] font-semibold text-white leading-tight">
          {type.name}
        </h3>
        <p className="text-[11px] text-white/60 font-light">{type.sizes[size].label} · {type.sizes[size].note} · {type.sizes[size].stems} stems</p>
      </div>

      <div className="px-5 py-5">
        {!ready ? (
          <div className="text-center py-6">
            <p className="text-[13px] text-stone-400 font-light">Select at least one focal flower, foliage, and filler to see your recipe.</p>
          </div>
        ) : (
          <>
            <RecipeRow label="Focal"     colour={ROLE_CONFIG.focal.colour}     items={recipe.focal}/>
            <RecipeRow label="Secondary" colour={ROLE_CONFIG.secondary.colour} items={recipe.secondary}/>
            <RecipeRow label="Foliage"   colour={ROLE_CONFIG.foliage.colour}   items={recipe.foliage}/>
            <RecipeRow label="Filler"    colour={ROLE_CONFIG.filler.colour}    items={recipe.filler}/>

            <div className="border-t border-stone-100 pt-4 mt-2">
              <div className="flex justify-between text-[11.5px] mb-1">
                <span className="text-stone-400 font-light">Total stems</span>
                <span className="font-medium text-stone-700">{recipe.total}</span>
              </div>
              <div className="flex justify-between text-[11.5px] mb-1">
                <span className="text-stone-400 font-light">Wholesale est.</span>
                <span className="font-medium text-stone-700">£{cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[12px] mt-2 pt-2 border-t border-stone-100">
                <span className="text-stone-500 font-medium">Suggested retail</span>
                <span className="font-semibold text-[#3D5C3A]">£{retail.toFixed(2)}</span>
              </div>
              <p className="text-[9.5px] text-stone-300 font-light mt-1.5">Retail based on ×2.8 wholesale markup — adjust for your market.</p>
            </div>

            {warnings.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                {warnings.map((w, i) => (
                  <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5 flex gap-2">
                    <span className="text-sm flex-shrink-0">{w.emoji}</span>
                    <p className="text-[10.5px] text-amber-800 leading-relaxed font-light">{w.text}</p>
                  </div>
                ))}
              </div>
            )}

            <button onClick={copyRecipe}
              className="w-full mt-4 border border-[#3D5C3A] text-[#3D5C3A] py-2.5 rounded-xl text-[11.5px] font-medium tracking-wide hover:bg-[#3D5C3A] hover:text-white transition-all cursor-pointer">
              Copy Recipe to Clipboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ── main page ───────────────────────────────────────────── */
export default function ArrangementBuilderPage() {
  const [typeId, setTypeId] = useState('hand-tied');
  const [size, setSize]     = useState('medium');
  const [activeTab, setActiveTab] = useState('focal');
  const [picks, setPicks]   = useState({ focal: [], secondary: [], foliage: [], filler: [] });

  const type   = ARRANGEMENT_TYPES.find(t => t.id === typeId);
  const recipe = useMemo(() => calcRecipe(type, size, picks), [type, size, picks]);
  const cost   = useMemo(() => calcCost(recipe), [recipe]);

  function toggleFlower(role, flower) {
    setPicks(prev => {
      const sel = prev[role];
      const already = sel.some(f => f.num === flower.num);
      const cfg = ROLE_CONFIG[role];
      if (already) return { ...prev, [role]: sel.filter(f => f.num !== flower.num) };
      if (sel.length >= cfg.max) return prev;
      return { ...prev, [role]: [...sel, flower] };
    });
  }

  function changeType(id) {
    setTypeId(id);
    setPicks({ focal: [], secondary: [], foliage: [], filler: [] });
  }

  const tabs = ['focal','foliage','filler','secondary'];

  return (
    <div className="bg-[#FAF8F4] min-h-screen">

      {/* Header */}
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none"/>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">UK Floristry · Design Tool</p>
        <h1 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[36px] sm:text-[52px] font-semibold text-white leading-[1.1] mb-4 max-w-2xl">
          Arrangement <em className="italic text-[#D4B8B5]">Builder</em>
        </h1>
        <p className="text-[13px] text-white/55 font-light max-w-lg leading-relaxed">
          Choose an arrangement type, pick your flowers, and get an instant stem count recipe with estimated UK wholesale and retail costs.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-0 lg:items-start">

        {/* ── Builder panel ── */}
        <div className="flex-1 min-w-0 px-5 sm:px-10 py-6 sm:py-8">

          {/* Step 1 — Type */}
          <div className="mb-8">
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Step 1 · Arrangement type</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ARRANGEMENT_TYPES.map(t => (
                <button key={t.id} onClick={() => changeType(t.id)}
                  className={`text-left px-4 py-3.5 rounded-xl border transition-all cursor-pointer
                    ${typeId === t.id ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white' : 'bg-white border-stone-200 hover:border-[#3D5C3A]/40'}`}>
                  <div className="text-xl mb-1">{t.emoji}</div>
                  <div className={`text-[13px] font-medium ${typeId===t.id?'text-white':'text-stone-800'}`} style={{fontFamily:'"Cormorant Garamond",serif'}}>{t.name}</div>
                  <div className={`text-[10px] font-light mt-0.5 ${typeId===t.id?'text-white/65':'text-stone-400'}`}>{t.desc.split('.')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Size */}
          <div className="mb-8">
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Step 2 · Size</p>
            <div className="flex gap-3">
              {Object.entries(type.sizes).map(([key, s]) => (
                <button key={key} onClick={() => setSize(key)}
                  className={`flex-1 py-3 px-4 rounded-xl border text-center transition-all cursor-pointer
                    ${size===key ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white' : 'bg-white border-stone-200 hover:border-[#3D5C3A]/40'}`}>
                  <div className={`text-[13px] font-medium ${size===key?'text-white':'text-stone-700'}`}>{s.label}</div>
                  <div className={`text-[10px] ${size===key?'text-white/65':'text-stone-400'}`}>{s.note} · {s.stems} stems</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 — Flowers */}
          <div>
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Step 3 · Build your recipe</p>

            {/* Tabs */}
            <div className="flex gap-1 mb-5 bg-stone-100 p-1 rounded-xl">
              {tabs.map(role => {
                const cfg = ROLE_CONFIG[role];
                const sel = picks[role].length;
                const ok  = sel >= cfg.min && (cfg.min === 0 || sel > 0);
                return (
                  <button key={role} onClick={() => setActiveTab(role)}
                    className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5
                      ${activeTab===role ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500 hover:text-stone-700'}`}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background: sel > 0 ? cfg.colour : '#D4D4D4'}}/>
                    {cfg.label}
                    {sel > 0 && <span className="text-[9px] font-semibold" style={{color:cfg.colour}}>{sel}</span>}
                  </button>
                );
              })}
            </div>

            <FlowerPicker roleKey={activeTab} picks={picks} onToggle={toggleFlower}/>

            {/* Season legend */}
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-3">
              <div className="flex gap-px">
                {MONTHS_S.map((m,i) => <div key={i} className={`h-1.5 w-3 rounded-sm ${i===new Date().getMonth()?'bg-[#3D5C3A]':'bg-stone-200'}`}/>)}
              </div>
              <p className="text-[10px] text-stone-400 font-light">Green bars = UK in season. Bold = current month. <span className="text-stone-500">Imported flowers available year-round.</span></p>
            </div>
          </div>
        </div>

        {/* ── Recipe card ── */}
        <div className="w-full lg:w-72 lg:flex-shrink-0 lg:sticky lg:top-[49px] px-5 sm:px-6 pb-6 lg:py-6">
          <RecipeCard type={type} size={size} picks={picks} recipe={recipe} cost={cost}/>
        </div>
      </div>
    </div>
  );
}
