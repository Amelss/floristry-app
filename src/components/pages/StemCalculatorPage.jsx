import { useState, useMemo } from 'react';
import { ARRANGEMENT_TYPES } from '../../data/arrangementTypes';

/* Average UK wholesale price per stem by role (used when no specific flower is chosen) */
const AVG_PRICE = { focal: 1.60, secondary: 0.90, foliage: 0.95, filler: 0.80 };

const ROLE_CONFIG = {
  focal:     { label: 'Focal',     colour: '#3D5C3A' },
  secondary: { label: 'Secondary', colour: '#6B8A66' },
  foliage:   { label: 'Foliage',   colour: '#8B9DC0' },
  filler:    { label: 'Filler',    colour: '#C9948E' },
};

function calcRoleCounts(type, size) {
  const total = type.sizes[size].stems;
  const r = type.ratios;
  const focal     = Math.round(total * r.focal);
  const secondary = Math.round(total * r.secondary);
  const foliage   = Math.round(total * r.foliage);
  const filler    = total - focal - secondary - foliage;
  return { focal, secondary, foliage, filler, total };
}

function scaleByQty(counts, qty) {
  return Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, v * qty]));
}

function stemCost(counts) {
  return Object.entries(AVG_PRICE).reduce((s, [role, price]) => s + (counts[role] ?? 0) * price, 0);
}

/* ── Single Arrangement Mode ── */
function SingleMode() {
  const [typeId, setTypeId] = useState('hand-tied');
  const [size, setSize]     = useState('medium');
  const [qty, setQty]       = useState(1);

  const type   = ARRANGEMENT_TYPES.find(t => t.id === typeId);
  const counts = useMemo(() => scaleByQty(calcRoleCounts(type, size), qty), [type, size, qty]);
  const cost   = useMemo(() => stemCost(counts), [counts]);

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8">

      {/* Type */}
      <div className="mb-7">
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Arrangement type</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ARRANGEMENT_TYPES.map(t => (
            <button key={t.id} onClick={() => setTypeId(t.id)}
              className={`text-left px-4 py-3 rounded-xl border transition-all cursor-pointer
                ${typeId === t.id ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white' : 'bg-white border-stone-200 hover:border-[#3D5C3A]/40'}`}>
              <div className="text-lg mb-0.5">{t.emoji}</div>
              <div className={`text-[12px] font-medium leading-tight ${typeId === t.id ? 'text-white' : 'text-stone-800'}`}
                style={{fontFamily:'"Cormorant Garamond",serif'}}>{t.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Size + Quantity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Size</p>
          <div className="flex gap-2">
            {Object.entries(type.sizes).map(([key, s]) => (
              <button key={key} onClick={() => setSize(key)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer
                  ${size === key ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white' : 'bg-white border-stone-200 hover:border-[#3D5C3A]/40'}`}>
                <div className={`text-[12px] font-medium ${size === key ? 'text-white' : 'text-stone-700'}`}>{s.label}</div>
                <div className={`text-[10px] ${size === key ? 'text-white/65' : 'text-stone-400'}`}>{s.stems} stems</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Quantity</p>
          <div className="flex items-center gap-3">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-600 text-lg font-light hover:bg-stone-50 transition-colors cursor-pointer flex-shrink-0">−</button>
            <input type="number" min="1" max="999" value={qty}
              onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center py-2 rounded-lg border border-stone-200 bg-white text-[14px] font-medium text-stone-800 outline-none focus:border-[#6B8A66]"/>
            <button onClick={() => setQty(q => q + 1)}
              className="w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-600 text-lg font-light hover:bg-stone-50 transition-colors cursor-pointer flex-shrink-0">+</button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-[#3D5C3A] px-5 py-4">
          <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8CEAE] mb-0.5 font-medium">Stem count</p>
          <h3 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[20px] font-semibold text-white">
            {type.name} · {type.sizes[size].label}{qty > 1 ? ` × ${qty}` : ''}
          </h3>
        </div>
        <div className="px-5 py-5">
          <table className="w-full text-[12.5px] mb-4">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">Role</th>
                <th className="text-right pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">Stems</th>
                <th className="text-right pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">Est. wholesale</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ROLE_CONFIG).map(([role, cfg]) => (
                <tr key={role} className="border-b border-stone-50 last:border-0">
                  <td className="py-2.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background: cfg.colour}}/>
                    <span className="font-medium text-stone-700">{cfg.label}</span>
                  </td>
                  <td className="py-2.5 text-right font-semibold text-stone-800">{counts[role]}</td>
                  <td className="py-2.5 text-right text-stone-500">£{(counts[role] * AVG_PRICE[role]).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-stone-100 pt-4">
            <div className="flex justify-between text-[12px] mb-1">
              <span className="text-stone-400 font-light">Total stems</span>
              <span className="font-semibold text-stone-800 text-[14px]">{counts.total}</span>
            </div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="text-stone-400 font-light">Est. wholesale</span>
              <span className="font-medium text-stone-700">£{cost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[12px] mt-2 pt-2 border-t border-stone-100">
              <span className="text-stone-500 font-medium">Suggested retail</span>
              <span className="font-semibold text-[#3D5C3A] text-[13px]">£{(cost * 2.8).toFixed(2)}</span>
            </div>
          </div>
          <p className="text-[9.5px] text-stone-300 font-light mt-3 leading-relaxed">
            Wholesale estimates use average UK stem prices by role. Actual costs vary by flower choice. Retail based on ×2.8 markup.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Event Planner Mode ── */
let nextId = 1;

function defaultRow() {
  return { id: nextId++, typeId: 'hand-tied', size: 'medium', qty: 1 };
}

function EventMode() {
  const [rows, setRows] = useState([defaultRow()]);

  function addRow() { setRows(r => [...r, defaultRow()]); }
  function removeRow(id) { setRows(r => r.filter(x => x.id !== id)); }
  function updateRow(id, field, value) {
    setRows(r => r.map(x => x.id === id ? { ...x, [field]: value } : x));
  }

  const totals = useMemo(() => {
    const sum = { focal: 0, secondary: 0, foliage: 0, filler: 0, total: 0 };
    rows.forEach(row => {
      const type = ARRANGEMENT_TYPES.find(t => t.id === row.typeId);
      const counts = scaleByQty(calcRoleCounts(type, row.size), row.qty);
      Object.keys(sum).forEach(k => { sum[k] += counts[k] ?? 0; });
    });
    return sum;
  }, [rows]);

  const totalCost = useMemo(() => stemCost(totals), [totals]);

  function copyList() {
    const lines = [
      'STEM COUNT — EVENT ORDER',
      '',
      ...rows.map(row => {
        const type = ARRANGEMENT_TYPES.find(t => t.id === row.typeId);
        const counts = scaleByQty(calcRoleCounts(type, row.size), row.qty);
        return `${row.qty}× ${type.name} (${type.sizes[row.size].label}) — ${counts.total} stems`;
      }),
      '',
      'TOTALS BY ROLE',
      ...Object.entries(ROLE_CONFIG).map(([role, cfg]) => `  ${cfg.label}: ${totals[role]} stems`),
      '',
      `Total stems: ${totals.total}`,
      `Est. wholesale: £${totalCost.toFixed(2)}`,
      `Suggested retail: £${(totalCost * 2.8).toFixed(2)}`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
  }

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-8 py-8">

      {/* Arrangement rows */}
      <div className="mb-6">
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Add arrangements to your event</p>
        <div className="flex flex-col gap-3">
          {rows.map((row, i) => {
            const type = ARRANGEMENT_TYPES.find(t => t.id === row.typeId);
            const counts = scaleByQty(calcRoleCounts(type, row.size), row.qty);
            return (
              <div key={row.id} className="bg-white border border-stone-100 rounded-xl px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-[10px] font-medium text-stone-300 w-5 flex-shrink-0 hidden sm:block">#{i + 1}</span>

                {/* Type */}
                <select value={row.typeId} onChange={e => updateRow(row.id, 'typeId', e.target.value)}
                  className="flex-1 min-w-0 text-[12px] px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-700 outline-none focus:border-[#6B8A66] cursor-pointer">
                  {ARRANGEMENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>)}
                </select>

                {/* Size */}
                <select value={row.size} onChange={e => updateRow(row.id, 'size', e.target.value)}
                  className="text-[12px] px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-700 outline-none focus:border-[#6B8A66] cursor-pointer">
                  {Object.entries(type.sizes).map(([k, s]) => <option key={k} value={k}>{s.label} ({s.stems} stems)</option>)}
                </select>

                {/* Qty */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => updateRow(row.id, 'qty', Math.max(1, row.qty - 1))}
                    className="w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer text-base">−</button>
                  <input type="number" min="1" max="999" value={row.qty}
                    onChange={e => updateRow(row.id, 'qty', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center py-1.5 rounded-lg border border-stone-200 bg-white text-[13px] font-medium text-stone-800 outline-none focus:border-[#6B8A66]"/>
                  <button onClick={() => updateRow(row.id, 'qty', row.qty + 1)}
                    className="w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer text-base">+</button>
                </div>

                {/* Row subtotal */}
                <span className="text-[11px] font-medium text-stone-400 flex-shrink-0 w-20 text-right hidden sm:block">{counts.total} stems</span>

                {/* Remove */}
                {rows.length > 1 && (
                  <button onClick={() => removeRow(row.id)}
                    className="text-stone-300 hover:text-[#C9948E] transition-colors cursor-pointer bg-transparent border-none flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={addRow}
          className="mt-3 w-full py-2.5 rounded-xl border border-dashed border-stone-300 text-[12px] text-stone-400 hover:border-[#3D5C3A] hover:text-[#3D5C3A] transition-all cursor-pointer bg-transparent">
          + Add arrangement
        </button>
      </div>

      {/* Grand total */}
      {totals.total > 0 && (
        <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#3D5C3A] px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8CEAE] mb-0.5 font-medium">Event total</p>
              <h3 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
                {rows.reduce((s, r) => s + r.qty, 0)} arrangements · {totals.total} stems
              </h3>
            </div>
            <button onClick={copyList}
              className="flex-shrink-0 text-[11px] font-medium text-white/70 hover:text-white border border-white/25 hover:border-white/50 px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-transparent">
              Copy order
            </button>
          </div>
          <div className="px-5 py-5">
            <table className="w-full text-[12.5px] mb-4">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">Role</th>
                  <th className="text-right pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">Stems</th>
                  <th className="text-right pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">Est. wholesale</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ROLE_CONFIG).map(([role, cfg]) => (
                  <tr key={role} className="border-b border-stone-50 last:border-0">
                    <td className="py-2.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background: cfg.colour}}/>
                      <span className="font-medium text-stone-700">{cfg.label}</span>
                    </td>
                    <td className="py-2.5 text-right font-semibold text-stone-800">{totals[role]}</td>
                    <td className="py-2.5 text-right text-stone-500">£{(totals[role] * AVG_PRICE[role]).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-stone-100 pt-4">
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-stone-400 font-light">Total stems to order</span>
                <span className="font-semibold text-stone-800 text-[14px]">{totals.total}</span>
              </div>
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-stone-400 font-light">Est. wholesale</span>
                <span className="font-medium text-stone-700">£{totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[12px] mt-2 pt-2 border-t border-stone-100">
                <span className="text-stone-500 font-medium">Suggested retail (×2.8)</span>
                <span className="font-semibold text-[#3D5C3A] text-[13px]">£{(totalCost * 2.8).toFixed(2)}</span>
              </div>
            </div>
            <p className="text-[9.5px] text-stone-300 font-light mt-3 leading-relaxed">
              Wholesale estimates use average UK stem prices by role. Use "Copy order" to paste into a spreadsheet or message your wholesaler.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function StemCalculatorPage() {
  const [tab, setTab] = useState('single');

  return (
    <div className="bg-[#FAF8F4] min-h-screen">
      {/* Hero */}
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none"/>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">UK Floristry · Planning Tool</p>
        <h1 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[36px] sm:text-[52px] font-semibold text-white leading-[1.1] mb-4">
          Stem Count <em className="italic text-[#D4B8B5]">Calculator</em>
        </h1>
        <p className="text-[13px] text-white/55 font-light max-w-lg leading-relaxed">
          Calculate exactly how many stems to order — for a single arrangement or a full event. Includes wholesale and retail cost estimates.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-[860px] mx-auto px-4 sm:px-8 flex gap-0">
          {[
            { key: 'single', label: 'Single Arrangement', desc: 'One type, any quantity' },
            { key: 'event',  label: 'Event Planner',      desc: 'Multiple arrangement types' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-3.5 text-left transition-all cursor-pointer border-b-2 bg-transparent
                ${tab === t.key ? 'border-[#3D5C3A] text-[#3D5C3A]' : 'border-transparent text-stone-400 hover:text-stone-600'}`}>
              <div className="text-[12px] font-medium">{t.label}</div>
              <div className="text-[10px] font-light">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {tab === 'single' ? <SingleMode/> : <EventMode/>}
    </div>
  );
}
