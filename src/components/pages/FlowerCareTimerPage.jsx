import { useState, useEffect } from 'react';
import Hero from '../shared/Hero';

/* ── Flower data ─────────────────────────────────────────────── */
const FLOWERS = [
  { name: 'Rose',          emoji: '🌹', minHours: 12, water: 'Cold (8–12°C)',          tip: 'Hammer or split woody stems. Remove damaged guard petals. Cut under water if possible for best uptake.' },
  { name: 'Peony',         emoji: '🌸', minHours: 24, water: 'Cold (6–10°C)',          tip: 'Condition from tight bud only — open peonies won\'t survive a full event day. Keep very cool. Do not mist.' },
  { name: 'Tulip',         emoji: '🌷', minHours: 4,  water: 'Ice cold (4–8°C)',       tip: 'Plain cold water only — no flower food. Wrap in paper to keep stems straight. They continue growing after cutting.' },
  { name: 'Hydrangea',     emoji: '💐', minHours: 12, water: 'Cold (8–12°C)',          tip: 'Submerge the entire head in cold water for 20–30 minutes first, then stand in bucket. Hammer the stem end.' },
  { name: 'Gerbera',       emoji: '🌼', minHours: 2,  water: 'Shallow cold (5–8cm)',   tip: 'Shallow water only — gerbera stems rot if fully submerged. Change water daily. Keep upright.' },
  { name: 'Lily',          emoji: '🌺', minHours: 12, water: 'Cool (10–14°C)',         tip: 'Remove pollen stamens as soon as buds open — pollen permanently stains fabric, including bridal gowns.' },
  { name: 'Sweet Pea',     emoji: '🪷', minHours: 4,  water: 'Cold (6–10°C)',          tip: 'Handle very gently — stems bruise easily. Do not crowd in the bucket. Best cut in the morning.' },
  { name: 'Dahlia',        emoji: '🌻', minHours: 12, water: 'Boiling sear, then cold', tip: 'Sear cut ends in boiling water for 10 seconds immediately after cutting, then move to cold water. Prevents rapid wilting.' },
  { name: 'Ranunculus',    emoji: '🌸', minHours: 8,  water: 'Cold (6–10°C)',          tip: 'Remove all foliage — it rots quickly and contaminates the water. Keep very cool. Heat-sensitive: avoid warm venues.' },
  { name: 'Lisianthus',    emoji: '🌸', minHours: 12, water: 'Cold (8–12°C)',          tip: 'One of the most reliable conditioning flowers. Strip lower foliage carefully — the stems are delicate.' },
  { name: 'Sunflower',     emoji: '🌻', minHours: 8,  water: 'Cold (8–12°C)',          tip: 'Hammer the thick stem end. Remove all leaves — they transpire rapidly and dehydrate the head quickly.' },
  { name: 'Anemone',       emoji: '🌸', minHours: 8,  water: 'Cold (6–10°C)',          tip: 'Keep cool and dark to slow opening. Anemones open fast in warmth and light — condition overnight in a cool room.' },
  { name: 'Scabiosa',      emoji: '🌸', minHours: 6,  water: 'Cold (8–12°C)',          tip: 'Delicate stems — handle gently. Remove all lower foliage. Best used within 24 hours of conditioning.' },
  { name: 'Foliage / Greenery', emoji: '🌿', minHours: 8, water: 'Cold (8–12°C)',     tip: 'Hammer or slit woody stems. Strip any foliage that will sit below the waterline — it rots within hours and poisons the water.' },
];

const TARGET_OPTIONS = [
  { label: '2h',  hours: 2,  note: 'Minimum — adequate for robust foliage and resilient stems only' },
  { label: '12h', hours: 12, note: 'Recommended — standard for most flowers before an event' },
  { label: '24h', hours: 24, note: 'Optimal — best results for weddings and multi-day events' },
];

const SETUP_ITEMS = [
  'Bucket thoroughly cleaned — no soap residue',
  'Filled with clean water, temperature correct for flower type',
  'Flower food added at correct dilution (check packaging)',
  'Water temperature checked before adding any stems',
];

const PREP_ITEMS = [
  'Lower two-thirds of foliage stripped from all stems',
  'Stems recut at 45° with clean, sharp scissors or knife',
  'Placed immediately into conditioned water',
  'Stems not crowded — each one must reach the water',
];

/* ── Persistence ─────────────────────────────────────────────── */
const KEY = 'floristry_batches_v1';
const load  = () => { try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; } };
const save  = b => localStorage.setItem(KEY, JSON.stringify(b));
const uid   = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

/* ── Circular countdown ──────────────────────────────────────── */
function Countdown({ timerStart, targetHours }) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const targetMs  = targetHours * 3_600_000;
  const elapsed   = now - timerStart;
  const remaining = Math.max(0, targetMs - elapsed);
  const progress  = Math.min(1, elapsed / targetMs);
  const done      = remaining === 0;

  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1_000);

  const R    = 52;
  const circ = 2 * Math.PI * R;
  const readyTime = new Date(timerStart + targetMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col items-center py-2">
      <div className="relative w-36 h-36 mb-3">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="#E7EEE6" strokeWidth="8" />
          <circle
            cx="60" cy="60" r={R} fill="none"
            stroke={done ? '#3D5C3A' : '#6B8A66'} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {done ? (
            <span className="text-3xl">✓</span>
          ) : (
            <>
              <span className="text-[20px] font-mono font-semibold text-stone-800 leading-none tabular-nums">
                {h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`}
              </span>
              <span className="text-[9px] text-stone-400 mt-0.5 tracking-wide">remaining</span>
            </>
          )}
        </div>
      </div>

      {done ? (
        <p className="text-[13px] font-semibold text-[#3D5C3A]">Conditioning complete</p>
      ) : (
        <p className="text-[11px] text-stone-400 text-center">
          {Math.round(progress * 100)}% · ready at <span className="font-medium text-stone-500">{readyTime}</span>
        </p>
      )}
    </div>
  );
}

/* ── Checkbox item ───────────────────────────────────────────── */
function CheckItem({ label, checked, onToggle }) {
  return (
    <li className="flex gap-3 items-start cursor-pointer select-none" onClick={onToggle}>
      <span className={`flex-shrink-0 w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-all ${checked ? 'bg-[#3D5C3A] border-[#3D5C3A]' : 'border-stone-300 bg-white'}`}>
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <span className={`text-[12px] font-light leading-relaxed transition-colors ${checked ? 'text-stone-400 line-through' : 'text-stone-600'}`}>
        {label}
      </span>
    </li>
  );
}

/* ── Batch card ──────────────────────────────────────────────── */
function BatchCard({ batch, onChange, onDelete }) {
  const { stage, flowers, setupChecked, prepChecked, timerStart, targetHours, waterCheckDismissed } = batch;

  const selectedFlowers = FLOWERS.filter(f => flowers.includes(f.name));
  const recommendedHours = selectedFlowers.length > 0
    ? Math.max(...selectedFlowers.map(f => f.minHours))
    : 12;

  // Water check fires after 4h elapsed, while timer is running and not yet dismissed
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (stage !== 'hydrating' || !timerStart) return;
    const id = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(id);
  }, [stage, timerStart]);

  const elapsed4h = timerStart ? now - timerStart >= 4 * 3_600_000 : false;
  const waterCheckActive = stage === 'hydrating' && timerStart && elapsed4h && !waterCheckDismissed;

  const allSetupDone = setupChecked && setupChecked.filter(Boolean).length === SETUP_ITEMS.length;
  const allPrepDone  = prepChecked  && prepChecked.filter(Boolean).length  === PREP_ITEMS.length;

  function toggleCheck(key, i) {
    const arr = [...(batch[key] ?? [])];
    arr[i] = !arr[i];
    onChange({ ...batch, [key]: arr });
  }

  const STAGE_LABELS = { setup: 'Setting up', prep: 'Stem prep', hydrating: 'Conditioning', ready: 'Ready ✓' };
  const stageColour  = stage === 'ready'
    ? 'bg-[#3D5C3A] text-white'
    : stage === 'hydrating'
    ? 'bg-[#6B8A66]/20 text-[#3D5C3A]'
    : 'bg-stone-100 text-stone-500';

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm mb-4">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100 bg-stone-50/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={`text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0 ${stageColour}`}>
            {STAGE_LABELS[stage]}
          </span>
          <span className="text-[11px] text-stone-500 font-light truncate">
            {selectedFlowers.map(f => f.emoji).join(' ')} {flowers.join(', ')}
          </span>
        </div>
        <button
          onClick={onDelete}
          className="flex-shrink-0 text-stone-300 hover:text-rose-400 transition-colors cursor-pointer bg-transparent border-none p-1.5 ml-2 rounded-lg hover:bg-rose-50"
          aria-label="Remove batch"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="px-5 py-5">

        {/* ── Stage: setup ── */}
        {stage === 'setup' && (
          <>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Prepare your bucket</p>
            <ul className="flex flex-col gap-2.5 mb-5">
              {SETUP_ITEMS.map((item, i) => (
                <CheckItem key={i} label={item} checked={!!setupChecked?.[i]} onToggle={() => toggleCheck('setupChecked', i)} />
              ))}
            </ul>

            {selectedFlowers.length > 0 && (
              <div className="bg-[#B8CEAE]/15 border border-[#B8CEAE]/40 rounded-xl px-4 py-3 mb-5">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-2">Water temperature notes</p>
                {selectedFlowers.map(f => (
                  <p key={f.name} className="text-[11px] text-[#3D5C3A] font-light leading-relaxed mb-1 last:mb-0">
                    <span className="font-semibold">{f.emoji} {f.name}:</span> {f.water}
                  </p>
                ))}
              </div>
            )}

            <button
              onClick={() => onChange({ ...batch, stage: 'prep' })}
              disabled={!allSetupDone}
              className="w-full py-3 rounded-xl text-[12px] font-semibold bg-[#3D5C3A] text-white transition-opacity disabled:opacity-25 cursor-pointer border-none hover:opacity-90"
            >
              Bucket ready — move to stem prep →
            </button>
          </>
        )}

        {/* ── Stage: prep ── */}
        {stage === 'prep' && (
          <>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Stem preparation</p>
            <ul className="flex flex-col gap-2.5 mb-5">
              {PREP_ITEMS.map((item, i) => (
                <CheckItem key={i} label={item} checked={!!prepChecked?.[i]} onToggle={() => toggleCheck('prepChecked', i)} />
              ))}
            </ul>

            {selectedFlowers.length > 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-5">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-amber-600 mb-2">Conditioning tips</p>
                {selectedFlowers.map(f => (
                  <p key={f.name} className="text-[11px] text-amber-800 font-light leading-relaxed mb-1.5 last:mb-0">
                    <span className="font-semibold">{f.emoji} {f.name}:</span> {f.tip}
                  </p>
                ))}
              </div>
            )}

            <button
              onClick={() => onChange({ ...batch, stage: 'hydrating' })}
              disabled={!allPrepDone}
              className="w-full py-3 rounded-xl text-[12px] font-semibold bg-[#3D5C3A] text-white transition-opacity disabled:opacity-25 cursor-pointer border-none hover:opacity-90"
            >
              Stems in water — set conditioning timer →
            </button>
          </>
        )}

        {/* ── Stage: hydrating — pre-start ── */}
        {stage === 'hydrating' && !timerStart && (
          <>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Set conditioning target</p>
            <p className="text-[11px] text-stone-400 font-light mb-4">
              Recommended for your selection: <span className="font-semibold text-[#3D5C3A]">{recommendedHours}h minimum</span>
            </p>
            <div className="flex gap-2 mb-3">
              {TARGET_OPTIONS.map(opt => (
                <button
                  key={opt.hours}
                  onClick={() => onChange({ ...batch, targetHours: opt.hours })}
                  className={`flex-1 py-3 rounded-xl text-[13px] font-bold border-2 transition-all cursor-pointer ${targetHours === opt.hours ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]' : 'bg-white text-stone-500 border-stone-200 hover:border-[#3D5C3A]/40'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-stone-400 font-light text-center mb-5">
              {TARGET_OPTIONS.find(o => o.hours === targetHours)?.note}
            </p>
            <button
              onClick={() => onChange({ ...batch, timerStart: Date.now() })}
              className="w-full py-3 rounded-xl text-[12px] font-semibold bg-[#3D5C3A] text-white cursor-pointer border-none hover:opacity-90 transition-opacity"
            >
              Start {targetHours}h timer
            </button>
          </>
        )}

        {/* ── Stage: hydrating — running ── */}
        {stage === 'hydrating' && timerStart && (
          <>
            <Countdown timerStart={timerStart} targetHours={targetHours} />

            {/* 4-hour water check */}
            {waterCheckActive && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-amber-600 mb-1">⏰ 4-hour water check</p>
                  <p className="text-[11px] text-amber-800 font-light leading-relaxed">Top up the water level. Check all stems are submerged. Remove any wilting or shedding material.</p>
                </div>
                <button
                  onClick={() => onChange({ ...batch, waterCheckDismissed: true })}
                  className="flex-shrink-0 text-[10px] font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg px-3 py-1.5 cursor-pointer border-none transition-colors whitespace-nowrap"
                >
                  Done ✓
                </button>
              </div>
            )}

            <button
              onClick={() => onChange({ ...batch, stage: 'ready' })}
              className="w-full mt-4 py-2.5 rounded-xl text-[11px] font-medium border border-[#3D5C3A]/30 text-[#3D5C3A] cursor-pointer bg-transparent hover:bg-[#3D5C3A]/5 transition-colors"
            >
              Mark as ready to build
            </button>
          </>
        )}

        {/* ── Stage: ready ── */}
        {stage === 'ready' && (
          <div className="text-center py-3">
            <div className="w-14 h-14 rounded-full bg-[#3D5C3A] flex items-center justify-center mx-auto mb-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 12L10 17L19 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[17px] font-semibold text-stone-800 mb-1" style={{ fontFamily: '"Cormorant Garamond",serif' }}>
              Ready to build
            </p>
            <p className="text-[11px] text-stone-400 font-light mb-5">
              {selectedFlowers.map(f => `${f.emoji} ${f.name}`).join(' · ')}
            </p>
            <button
              onClick={() => onChange({ ...batch, stage: 'setup', timerStart: null, setupChecked: [], prepChecked: [], waterCheckDismissed: false })}
              className="text-[10px] text-stone-400 hover:text-stone-600 transition-colors cursor-pointer bg-transparent border-none underline underline-offset-2"
            >
              Recondition same flowers
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── New batch form ──────────────────────────────────────────── */
function NewBatchForm({ onAdd, onCancel }) {
  const [selected, setSelected] = useState([]);

  function toggle(name) {
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  }

  function create() {
    if (!selected.length) return;
    const maxHours = Math.max(...FLOWERS.filter(f => selected.includes(f.name)).map(f => f.minHours));
    onAdd({
      id: uid(),
      flowers: selected,
      stage: 'setup',
      setupChecked: [],
      prepChecked: [],
      timerStart: null,
      targetHours: maxHours,
      waterCheckDismissed: false,
      createdAt: Date.now(),
    });
  }

  const maxHours = selected.length > 0
    ? Math.max(...FLOWERS.filter(f => selected.includes(f.name)).map(f => f.minHours))
    : null;

  return (
    <div className="bg-white rounded-2xl border-2 border-[#3D5C3A]/20 overflow-hidden mb-4">
      <div className="px-5 py-4 border-b border-stone-100 bg-[#3D5C3A]/5">
        <p className="text-[13px] font-semibold text-stone-700">What are you conditioning?</p>
        <p className="text-[10px] text-stone-400 font-light mt-0.5">Select all flower types in this batch</p>
      </div>
      <div className="px-5 py-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {FLOWERS.map(f => (
            <button
              key={f.name}
              onClick={() => toggle(f.name)}
              className={`text-[11px] px-3 py-1.5 rounded-full border font-medium transition-all cursor-pointer ${selected.includes(f.name) ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]' : 'bg-white text-stone-500 border-stone-200 hover:border-[#3D5C3A]/40'}`}
            >
              {f.emoji} {f.name}
            </button>
          ))}
        </div>

        {maxHours && (
          <p className="text-[11px] text-[#3D5C3A] font-medium mb-4">
            Recommended conditioning time: <span className="font-bold">{maxHours} hours minimum</span>
          </p>
        )}

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-[12px] font-medium border border-stone-200 text-stone-500 cursor-pointer bg-white hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={create}
            disabled={!selected.length}
            className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold bg-[#3D5C3A] text-white cursor-pointer border-none disabled:opacity-25 hover:opacity-90 transition-opacity"
          >
            Start conditioning
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function FlowerCareTimerPage({ go }) {
  const [batches, setBatches]   = useState(load);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => save(batches), [batches]);

  function addBatch(b)   { setBatches(prev => [b, ...prev]); setShowForm(false); }
  function updateBatch(u){ setBatches(prev => prev.map(b => b.id === u.id ? u : b)); }
  function deleteBatch(id){ setBatches(prev => prev.filter(b => b.id !== id)); }

  const active = batches.filter(b => b.stage !== 'ready');
  const ready  = batches.filter(b => b.stage === 'ready');

  return (
    <div>
      <Hero
        eyebrow="Tools · Workbench"
        title="Flower Care"
        em="Timer"
        inline
        sub="Step-by-step conditioning workflow with persistent timers. Select your flowers, work through each stage, and track multiple batches at once — even if you close the tab."
      />

      <div className="max-w-[640px] mx-auto px-4 sm:px-8 py-8">

        {/* New batch button / form */}
        {showForm ? (
          <NewBatchForm onAdd={addBatch} onCancel={() => setShowForm(false)} />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full mb-6 py-4 rounded-2xl border-2 border-dashed border-[#B8CEAE] text-[#3D5C3A] text-[12px] font-semibold hover:bg-[#3D5C3A]/5 transition-colors cursor-pointer bg-transparent flex items-center justify-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            New conditioning batch
          </button>
        )}

        {/* Active batches */}
        {active.length > 0 && (
          <div className="mb-2">
            {batches.length > 1 && (
              <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-stone-400 mb-3">In progress</p>
            )}
            {active.map(b => (
              <BatchCard key={b.id} batch={b} onChange={updateBatch} onDelete={() => deleteBatch(b.id)} />
            ))}
          </div>
        )}

        {/* Ready batches */}
        {ready.length > 0 && (
          <div>
            <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-stone-400 mb-3">Ready to build</p>
            {ready.map(b => (
              <BatchCard key={b.id} batch={b} onChange={updateBatch} onDelete={() => deleteBatch(b.id)} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {batches.length === 0 && !showForm && (
          <div className="text-center py-14">
            <span className="text-5xl block mb-4">🌿</span>
            <p className="text-[18px] font-semibold text-stone-700 mb-2" style={{ fontFamily: '"Cormorant Garamond",serif' }}>
              No active batches
            </p>
            <p className="text-[12px] text-stone-400 font-light max-w-xs mx-auto leading-relaxed">
              Tap the button above to start a conditioning batch. Timers persist if you navigate away or close the tab.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
