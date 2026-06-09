import { useMemo } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ARRANGEMENT_TYPES } from "../../data/arrangementTypes";

const AVG_PRICE = { focal: 1.6, secondary: 0.9, foliage: 0.95, filler: 0.8 };

const ROLE_CONFIG = {
  focal: { label: "Focal", colour: "#3D5C3A" },
  secondary: { label: "Secondary", colour: "#6B8A66" },
  foliage: { label: "Foliage", colour: "#8B9DC0" },
  filler: { label: "Filler", colour: "#C9948E" },
};

const EMPTY_ROLES = { focal: 0, secondary: 0, foliage: 0, filler: 0 };

function calcFromRatios(ratios, totalStems) {
  const total = Math.max(0, totalStems);
  const focal = Math.round(total * ratios.focal);
  const secondary = Math.round(total * ratios.secondary);
  const foliage = Math.round(total * ratios.foliage);
  const filler = total - focal - secondary - foliage;
  return { focal, secondary, foliage, filler, total };
}

function scaleByQty(counts, qty) {
  return Object.fromEntries(
    Object.entries(counts).map(([k, v]) => [k, v * qty]),
  );
}

function stemCost(counts) {
  return Object.entries(AVG_PRICE).reduce(
    (s, [role, price]) => s + (counts[role] ?? 0) * price,
    0,
  );
}

/* ── Shared: role-by-role manual input ── */
function RoleInputs({ roles, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
      {Object.entries(ROLE_CONFIG).map(([role, cfg]) => (
        <div key={role} className="flex items-center gap-2.5">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: cfg.colour }}
          />
          <span className="text-[11px] text-stone-600 font-medium w-20 flex-shrink-0">
            {cfg.label}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onChange(role, Math.max(0, roles[role] - 1))}
              className="w-7 h-7 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer text-sm flex-shrink-0"
            >
              −
            </button>
            <input
              type="number"
              min="0"
              max="999"
              value={roles[role]}
              onChange={(e) =>
                onChange(role, Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-14 text-center py-1 rounded-lg border border-stone-200 bg-white text-[13px] font-medium text-stone-800 outline-none focus:border-[#6B8A66]"
            />
            <button
              onClick={() => onChange(role, roles[role] + 1)}
              className="w-7 h-7 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer text-sm flex-shrink-0"
            >
              +
            </button>
          </div>
          <span className="text-[10px] text-stone-400">stems</span>
        </div>
      ))}
    </div>
  );
}

/* ── Shared: results card ── */
function ResultsCard({ title, counts, cost, ratioDisclaimer }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-[#3D5C3A] px-5 py-4">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8CEAE] mb-0.5 font-medium">
          Stem count
        </p>
        <h3
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[20px] font-semibold text-white leading-tight"
        >
          {title}
        </h3>
      </div>
      <div className="px-5 py-5">
        <table className="w-full text-[12.5px] mb-4">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">
                Role
              </th>
              <th className="text-right pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">
                Stems
              </th>
              <th className="text-right pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">
                Est. wholesale
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ROLE_CONFIG).map(([role, cfg]) => (
              <tr key={role} className="border-b border-stone-50 last:border-0">
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: cfg.colour }}
                    />
                    <span className="font-medium text-stone-700">
                      {cfg.label}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 text-right font-semibold text-stone-800">
                  {counts[role]}
                </td>
                <td className="py-2.5 text-right text-stone-500">
                  £{(counts[role] * AVG_PRICE[role]).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-stone-100 pt-4">
          <div className="flex justify-between text-[12px] mb-1">
            <span className="text-stone-400 font-light">Total stems</span>
            <span className="font-semibold text-stone-800 text-[14px]">
              {counts.total}
            </span>
          </div>
          <div className="flex justify-between text-[12px] mb-1">
            <span className="text-stone-400 font-light">Est. wholesale</span>
            <span className="font-medium text-stone-700">
              £{cost.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-[12px] mt-2 pt-2 border-t border-stone-100">
            <span className="text-stone-500 font-medium">Suggested retail</span>
            <span className="font-semibold text-[#3D5C3A] text-[13px]">
              £{(cost * 2.8).toFixed(2)}
            </span>
          </div>
        </div>

        {ratioDisclaimer && (
          <div className="mt-4 bg-stone-50 border border-stone-100 rounded-lg px-3 py-2.5">
            <p className="text-[9.5px] text-stone-400 font-light leading-relaxed">
              <span className="font-medium text-stone-500">
                Role distribution note:{" "}
              </span>
              {ratioDisclaimer}
            </p>
          </div>
        )}

        <p className="text-[9.5px] text-stone-300 font-light mt-3 leading-relaxed">
          Wholesale estimates use average UK stem prices by role. Actual costs
          vary by flower choice. Retail based on ×2.8 markup.
        </p>
      </div>
    </div>
  );
}

function ratioNote(type) {
  const r = type.ratios;
  return `Stems distributed using standard ${type.name} ratios — ${Math.round(r.focal * 100)}% focal, ${Math.round(r.secondary * 100)}% secondary, ${Math.round(r.foliage * 100)}% foliage, ${Math.round(r.filler * 100)}% filler. Switch to a Custom arrangement type to set your own stem counts per role.`;
}

/* ── Single Arrangement Mode ── */
function SingleMode() {
  const [typeId, setTypeId] = useLocalStorage("stemcalcTypeId", "hand-tied");
  const [size, setSize] = useLocalStorage("stemcalcSize", "medium");
  const [customStems, setCustomStems] = useLocalStorage("stemcalcCustomStems", 30);
  const [customRoles, setCustomRoles] = useLocalStorage("stemcalcCustomRoles", { ...EMPTY_ROLES });
  const [qty, setQty] = useLocalStorage("stemcalcQty", 1);

  const isCustomType = typeId === "custom";
  const isCustomSize = !isCustomType && size === "custom";
  const type = isCustomType
    ? null
    : ARRANGEMENT_TYPES.find((t) => t.id === typeId);

  const counts = useMemo(() => {
    if (isCustomType) {
      const total = Object.values(customRoles).reduce((s, v) => s + v, 0);
      return scaleByQty({ ...customRoles, total }, qty);
    }
    const totalStems = isCustomSize ? customStems : type.sizes[size].stems;
    return scaleByQty(calcFromRatios(type.ratios, totalStems), qty);
  }, [isCustomType, isCustomSize, type, size, customStems, customRoles, qty]);

  const cost = useMemo(() => stemCost(counts), [counts]);

  const title = isCustomType
    ? `Custom arrangement${qty > 1 ? ` × ${qty}` : ""}`
    : `${type.name} · ${isCustomSize ? `${customStems} stems` : type.sizes[size].label}${qty > 1 ? ` × ${qty}` : ""}`;

  const disclaimer = !isCustomType && isCustomSize ? ratioNote(type) : null;

  function setRole(role, value) {
    setCustomRoles((prev) => ({ ...prev, [role]: value }));
  }

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8">
      {/* Type */}
      <div className="mb-7">
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
          Arrangement type
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ARRANGEMENT_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeId(t.id)}
              className={`text-left px-4 py-3 rounded-xl border transition-all cursor-pointer
                ${typeId === t.id ? "bg-[#3D5C3A] border-[#3D5C3A] text-white" : "bg-white border-stone-200 hover:border-[#3D5C3A]/40"}`}
            >
              <div className="text-lg mb-0.5">{t.emoji}</div>
              <div
                className={`text-[12px] font-medium leading-tight ${typeId === t.id ? "text-white" : "text-stone-800"}`}
                style={{ fontFamily: '"Cormorant Garamond",serif' }}
              >
                {t.name}
              </div>
            </button>
          ))}
          {/* Custom type */}
          <button
            onClick={() => setTypeId("custom")}
            className={`text-left px-4 py-3 rounded-xl border transition-all cursor-pointer
              ${isCustomType ? "bg-[#8B7355] border-[#8B7355] text-white" : "bg-white border-stone-200 border-dashed hover:border-[#8B7355]/60"}`}
          >
            <div className="text-lg mb-0.5">✏️</div>
            <div
              className={`text-[12px] font-medium leading-tight ${isCustomType ? "text-white" : "text-stone-600"}`}
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
            >
              Custom
            </div>
          </button>
        </div>
      </div>

      {isCustomType ? (
        /* Custom type: role-by-role inputs */
        <div className="mb-8">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-1">
            Stems per role
          </p>
          <p className="text-[11px] text-stone-400 font-light mb-3">
            Enter exactly how many stems you need for each role.
          </p>
          <RoleInputs roles={customRoles} onChange={setRole} />
        </div>
      ) : (
        /* Preset type: size + optional custom stems */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
              Size
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(type.sizes).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => setSize(key)}
                  className={`flex-1 min-w-[56px] py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer
                    ${size === key ? "bg-[#3D5C3A] border-[#3D5C3A] text-white" : "bg-white border-stone-200 hover:border-[#3D5C3A]/40"}`}
                >
                  <div
                    className={`text-[12px] font-medium ${size === key ? "text-white" : "text-stone-700"}`}
                  >
                    {s.label}
                  </div>
                  <div
                    className={`text-[10px] ${size === key ? "text-white/65" : "text-stone-400"}`}
                  >
                    {s.stems} stems
                  </div>
                </button>
              ))}
              <button
                onClick={() => setSize("custom")}
                className={`flex-1 min-w-[56px] py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer
                  ${isCustomSize ? "bg-[#8B7355] border-[#8B7355] text-white" : "bg-white border-dashed border-stone-200 hover:border-[#8B7355]/60"}`}
              >
                <div
                  className={`text-[12px] font-medium ${isCustomSize ? "text-white" : "text-stone-500"}`}
                >
                  Custom
                </div>
                <div
                  className={`text-[10px] ${isCustomSize ? "text-white/65" : "text-stone-400"}`}
                >
                  enter stems
                </div>
              </button>
            </div>
            {isCustomSize && (
              <div className="mt-3 flex items-center gap-2">
                <label className="text-[11px] text-stone-500 font-light flex-shrink-0">
                  Total stems:
                </label>
                <input
                  type="number"
                  min="1"
                  max="9999"
                  value={customStems}
                  onChange={(e) =>
                    setCustomStems(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-24 px-3 py-1.5 rounded-lg border border-[#8B7355]/50 bg-white text-[13px] font-medium text-stone-800 outline-none focus:border-[#8B7355]"
                  autoFocus
                />
              </div>
            )}
          </div>
          <div>
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
              Arrangement quantity
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-600 text-lg font-light hover:bg-stone-50 transition-colors cursor-pointer flex-shrink-0"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="999"
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 text-center py-2 rounded-lg border border-stone-200 bg-white text-[14px] font-medium text-stone-800 outline-none focus:border-[#6B8A66]"
              />
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-600 text-lg font-light hover:bg-stone-50 transition-colors cursor-pointer flex-shrink-0"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quantity row for custom type */}
      {isCustomType && (
        <div className="mb-8">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
            Quantity
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-600 text-lg font-light hover:bg-stone-50 transition-colors cursor-pointer flex-shrink-0"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="999"
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-16 text-center py-2 rounded-lg border border-stone-200 bg-white text-[14px] font-medium text-stone-800 outline-none focus:border-[#6B8A66]"
            />
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 rounded-lg border border-stone-200 bg-white text-stone-600 text-lg font-light hover:bg-stone-50 transition-colors cursor-pointer flex-shrink-0"
            >
              +
            </button>
          </div>
        </div>
      )}

      <ResultsCard
        title={title}
        counts={counts}
        cost={cost}
        ratioDisclaimer={disclaimer}
      />
    </div>
  );
}

/* ── Event Planner Mode ── */
function defaultRow(custom = false) {
  return {
    id: crypto.randomUUID(),
    typeId: custom ? "custom" : "hand-tied",
    customName: "",
    size: custom ? "custom" : "medium",
    customStems: 30,
    customRoles: { ...EMPTY_ROLES },
    qty: 1,
  };
}

function rowCounts(row) {
  if (row.typeId === "custom") {
    const total = Object.values(row.customRoles).reduce((s, v) => s + v, 0);
    return scaleByQty({ ...row.customRoles, total }, row.qty);
  }
  const type = ARRANGEMENT_TYPES.find((t) => t.id === row.typeId);
  const stems =
    row.size === "custom" ? row.customStems : type.sizes[row.size].stems;
  return scaleByQty(calcFromRatios(type.ratios, stems), row.qty);
}

function rowLabel(row) {
  if (row.typeId === "custom") return row.customName || "Custom arrangement";
  const type = ARRANGEMENT_TYPES.find((t) => t.id === row.typeId);
  return row.size === "custom"
    ? `${type.name} (${row.customStems} stems)`
    : `${type.name} — ${type.sizes[row.size].label}`;
}

function EventMode() {
  const [rows, setRows] = useLocalStorage("stemcalcEventRows", () => [defaultRow()]);

  function addRow(custom = false) {
    setRows((r) => [...r, defaultRow(custom)]);
  }
  function removeRow(id) {
    setRows((r) => r.filter((x) => x.id !== id));
  }
  function updateRow(id, field, value) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
  }
  function updateRole(id, role, value) {
    setRows((r) =>
      r.map((x) =>
        x.id === id
          ? { ...x, customRoles: { ...x.customRoles, [role]: value } }
          : x,
      ),
    );
  }

  const totals = useMemo(() => {
    const sum = { focal: 0, secondary: 0, foliage: 0, filler: 0, total: 0 };
    rows.forEach((row) => {
      const c = rowCounts(row);
      Object.keys(sum).forEach((k) => {
        sum[k] += c[k] ?? 0;
      });
    });
    return sum;
  }, [rows]);

  const totalCost = useMemo(() => stemCost(totals), [totals]);

  // Whether any row uses custom-size on a preset type (needs disclaimer)
  const hasRatioRows = rows.some(
    (r) => r.typeId !== "custom" && r.size === "custom",
  );

  function copyList() {
    const lines = [
      "STEM COUNT — EVENT ORDER",
      "",
      ...rows.map(
        (row) => `${row.qty}× ${rowLabel(row)} — ${rowCounts(row).total} stems`,
      ),
      "",
      "TOTALS BY ROLE",
      ...Object.entries(ROLE_CONFIG).map(
        ([role, cfg]) => `  ${cfg.label}: ${totals[role]} stems`,
      ),
      "",
      `Total stems: ${totals.total}`,
      `Est. wholesale: £${totalCost.toFixed(2)}`,
      `Suggested retail: £${(totalCost * 2.8).toFixed(2)}`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
  }

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-8 py-8">
      <div className="mb-6">
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
          Add arrangements to your event
        </p>
        <div className="flex flex-col gap-3">
          {rows.map((row, i) => {
            const isCustomType = row.typeId === "custom";
            const isCustomSize = !isCustomType && row.size === "custom";
            const type = isCustomType
              ? null
              : ARRANGEMENT_TYPES.find((t) => t.id === row.typeId);
            const counts = rowCounts(row);

            return (
              <div
                key={row.id}
                className={`bg-white border rounded-xl px-4 py-4 ${isCustomType ? "border-[#8B7355]/25" : "border-stone-100"}`}
              >
                {/* Top row: type, size, qty, remove */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-[10px] font-medium text-stone-300 w-5 flex-shrink-0 hidden sm:block">
                    #{i + 1}
                  </span>

                  {/* Type */}
                  {isCustomType ? (
                    <div className="flex gap-2 flex-1 min-w-0">
                      <input
                        type="text"
                        placeholder="Arrangement name…"
                        value={row.customName}
                        onChange={(e) =>
                          updateRow(row.id, "customName", e.target.value)
                        }
                        className="flex-1 min-w-0 text-[12px] px-3 py-2 rounded-lg border border-[#8B7355]/40 bg-white text-stone-700 outline-none focus:border-[#8B7355] placeholder:text-stone-300"
                      />
                      <button
                        onClick={() => updateRow(row.id, "typeId", "hand-tied")}
                        className="text-[10px] text-stone-400 hover:text-stone-600 px-2 py-1 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer bg-transparent flex-shrink-0"
                      >
                        ← Presets
                      </button>
                    </div>
                  ) : (
                    <select
                      value={row.typeId}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateRow(row.id, "typeId", val);
                        if (val === "custom")
                          updateRow(row.id, "size", "custom");
                      }}
                      className="flex-1 min-w-0 text-[12px] px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-700 outline-none focus:border-[#6B8A66] cursor-pointer"
                    >
                      {ARRANGEMENT_TYPES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.emoji} {t.name}
                        </option>
                      ))}
                      <option value="custom">✏️ Custom arrangement…</option>
                    </select>
                  )}

                  {/* Size — preset types only */}
                  {!isCustomType && (
                    <select
                      value={row.size}
                      onChange={(e) =>
                        updateRow(row.id, "size", e.target.value)
                      }
                      className="text-[12px] px-3 py-2 rounded-lg border border-stone-200 bg-white text-stone-700 outline-none focus:border-[#6B8A66] cursor-pointer flex-shrink-0"
                    >
                      {type &&
                        Object.entries(type.sizes).map(([k, s]) => (
                          <option key={k} value={k}>
                            {s.label} ({s.stems} stems)
                          </option>
                        ))}
                      <option value="custom">Custom stems…</option>
                    </select>
                  )}

                  {/* Qty */}
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <span className="text-[9px] font-medium tracking-[0.12em] uppercase text-stone-400 hidden sm:block">
                      Arrangements
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateRow(row.id, "qty", Math.max(1, row.qty - 1))
                        }
                        className="w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer text-base"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="999"
                        value={row.qty}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "qty",
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                        className="w-12 text-center py-1.5 rounded-lg border border-stone-200 bg-white text-[13px] font-medium text-stone-800 outline-none focus:border-[#6B8A66]"
                      />
                      <button
                        onClick={() => updateRow(row.id, "qty", row.qty + 1)}
                        className="w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer text-base"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-stone-400 flex-shrink-0 w-20 text-right hidden sm:block">
                    {counts.total} stems
                  </span>

                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-stone-300 hover:text-[#C9948E] transition-colors cursor-pointer bg-transparent border-none flex-shrink-0 self-start sm:self-auto"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4 4l8 8M12 4l-8 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Custom stem count — preset type with custom size */}
                {isCustomSize && (
                  <div className="mt-3 flex items-center gap-2 sm:pl-8">
                    <label className="text-[11px] text-stone-500 font-light flex-shrink-0">
                      Custom stem count:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="9999"
                      value={row.customStems}
                      onChange={(e) =>
                        updateRow(
                          row.id,
                          "customStems",
                          Math.max(1, parseInt(e.target.value) || 1),
                        )
                      }
                      className="w-24 px-3 py-1.5 rounded-lg border border-[#8B7355]/50 bg-white text-[13px] font-medium text-stone-800 outline-none focus:border-[#8B7355]"
                    />
                  </div>
                )}

                {/* Custom role inputs — custom type */}
                {isCustomType && (
                  <div className="mt-3 sm:pl-8">
                    <p className="text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400 mb-2">
                      Stems per role
                    </p>
                    <RoleInputs
                      roles={row.customRoles}
                      onChange={(role, val) => updateRole(row.id, role, val)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => addRow(false)}
            className="flex-1 py-2.5 rounded-xl border border-dashed border-stone-300 text-[12px] text-stone-400 hover:border-[#3D5C3A] hover:text-[#3D5C3A] transition-all cursor-pointer bg-transparent"
          >
            + Add preset arrangement
          </button>
          <button
            onClick={() => addRow(true)}
            className="flex-1 py-2.5 rounded-xl border border-dashed border-stone-300 text-[12px] text-stone-400 hover:border-[#8B7355] hover:text-[#8B7355] transition-all cursor-pointer bg-transparent"
          >
            + Add custom arrangement
          </button>
        </div>
      </div>

      {/* Grand total */}
      {totals.total > 0 && (
        <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#3D5C3A] px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#B8CEAE] mb-0.5 font-medium">
                Event total
              </p>
              <h3
                style={{ fontFamily: '"Cormorant Garamond",serif' }}
                className="text-[18px] sm:text-[20px] font-semibold text-white leading-tight"
              >
                {rows.reduce((s, r) => s + r.qty, 0)} arrangements ·{" "}
                {totals.total} stems
              </h3>
            </div>
            <button
              onClick={copyList}
              className="flex-shrink-0 text-[11px] font-medium text-white/70 hover:text-white border border-white/25 hover:border-white/50 px-3 py-1.5 rounded-lg transition-all cursor-pointer bg-transparent"
            >
              Copy order
            </button>
          </div>
          <div className="px-5 py-5">
            <table className="w-full text-[12.5px] mb-4">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">
                    Role
                  </th>
                  <th className="text-right pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">
                    Stems
                  </th>
                  <th className="text-right pb-2 text-[9px] font-medium tracking-[0.15em] uppercase text-stone-400">
                    Est. wholesale
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ROLE_CONFIG).map(([role, cfg]) => (
                  <tr
                    key={role}
                    className="border-b border-stone-50 last:border-0"
                  >
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: cfg.colour }}
                        />
                        <span className="font-medium text-stone-700">
                          {cfg.label}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right font-semibold text-stone-800">
                      {totals[role]}
                    </td>
                    <td className="py-2.5 text-right text-stone-500">
                      £{(totals[role] * AVG_PRICE[role]).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-stone-100 pt-4">
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-stone-400 font-light">
                  Total stems to order
                </span>
                <span className="font-semibold text-stone-800 text-[14px]">
                  {totals.total}
                </span>
              </div>
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-stone-400 font-light">
                  Est. wholesale
                </span>
                <span className="font-medium text-stone-700">
                  £{totalCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[12px] mt-2 pt-2 border-t border-stone-100">
                <span className="text-stone-500 font-medium">
                  Suggested retail (×2.8)
                </span>
                <span className="font-semibold text-[#3D5C3A] text-[13px]">
                  £{(totalCost * 2.8).toFixed(2)}
                </span>
              </div>
            </div>

            {hasRatioRows && (
              <div className="mt-4 bg-stone-50 border border-stone-100 rounded-lg px-3 py-2.5">
                <p className="text-[9.5px] text-stone-400 font-light leading-relaxed">
                  <span className="font-medium text-stone-500">
                    Role distribution note:{" "}
                  </span>
                  One or more rows use a custom stem count with a preset
                  arrangement type. Stems are distributed using that type's
                  standard ratios. Use "Custom arrangement" rows to set exact
                  stem counts per role.
                </p>
              </div>
            )}

            <p className="text-[9.5px] text-stone-300 font-light mt-3 leading-relaxed">
              Wholesale estimates use average UK stem prices by role. Use "Copy
              order" to paste into a spreadsheet or message your wholesaler.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function StemCalculatorPage() {
  const [tab, setTab] = useLocalStorage("stemcalcTab", "single");

  return (
    <div className="bg-[#FAF8F4] min-h-screen">
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">
          Floral Foundations · Planning Tool
        </p>
        <h1
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[36px] sm:text-[52px] font-semibold text-[#D4B8B5] leading-[1.1] mb-4"
        >
          Stem Count <em className="italic">Calculator</em>
        </h1>
        <p className="text-[13px] text-white/55 font-light max-w-lg leading-relaxed">
          Calculate exactly how many stems to order — for a single arrangement
          or a full event. Includes wholesale and retail cost estimates.
        </p>
      </div>

      <div className="bg-white border-b border-stone-100">
        <div className="max-w-[860px] mx-auto px-4 sm:px-8 flex gap-0">
          {[
            {
              key: "single",
              label: "Single Arrangement",
              desc: "One type, any quantity",
            },
            {
              key: "event",
              label: "Event Planner",
              desc: "Multiple arrangement types",
            },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3.5 text-left transition-all cursor-pointer border-b-2 bg-transparent
                ${tab === t.key ? "border-[#3D5C3A] text-[#3D5C3A]" : "border-transparent text-stone-400 hover:text-stone-600"}`}
            >
              <div className="text-[12px] font-medium">{t.label}</div>
              <div className="text-[10px] font-light">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {tab === "single" ? <SingleMode /> : <EventMode />}
    </div>
  );
}
