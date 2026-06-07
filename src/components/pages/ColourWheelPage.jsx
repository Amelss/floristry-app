import { useState, useRef, useEffect } from "react";
import { COLOUR_NODES, SCHEMES } from "../../data/colourWheel";
import { FLOWER_ROLES, SCHEME_FORMULAS } from "../../data/colourRecipes";
import { getNearestNode, hsl } from "../../utils";
import Hero from "../shared/Hero";
import InfoBand from "../shared/InfoBand";

function ColourWheelCanvas({ baseHue, setBaseHue, schemeKey }) {
  const canvasRef = useRef(null);
  const SZ = 360,
    CX = 180,
    CY = 180,
    OR = 148,
    IR = 62,
    MR = (OR + IR) / 2;

  function draw(hue, sk) {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, SZ, SZ);
    for (let h = 0; h < 360; h++) {
      const a1 = ((h - 90.6) * Math.PI) / 180,
        a2 = ((h + 0.6 - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.arc(CX, CY, OR, a1, a2);
      ctx.arc(CX, CY, IR, a2, a1, true);
      ctx.closePath();
      ctx.fillStyle = hsl(h, 78, 56);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(CX, CY, IR, 0, Math.PI * 2);
    ctx.fillStyle = "#FAF8F4";
    ctx.fill();
    ctx.strokeStyle = "rgba(80,60,40,0.08)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    COLOUR_NODES.forEach((n) => {
      const a = ((n.hue - 90) * Math.PI) / 180,
        r = OR + 13;
      ctx.beginPath();
      ctx.arc(
        CX + r * Math.cos(a),
        CY + r * Math.sin(a),
        [0, 120, 240].includes(n.hue) ? 5 : 3,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = hsl(n.hue, 65, 38);
      ctx.fill();
    });
    const offsets = SCHEMES[sk].offsets,
      sH = offsets.map((o) => (((hue + o) % 360) + 360) % 360);
    if (offsets.length >= 2) {
      ctx.beginPath();
      sH.forEach((h, i) => {
        const a = ((h - 90) * Math.PI) / 180,
          mx = CX + MR * Math.cos(a),
          my = CY + MR * Math.sin(a);
        i === 0 ? ctx.moveTo(mx, my) : ctx.lineTo(mx, my);
      });
      if (offsets.length > 2) ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    sH.forEach((h, i) => {
      const a = ((h - 90) * Math.PI) / 180,
        mx = CX + MR * Math.cos(a),
        my = CY + MR * Math.sin(a),
        r = i === 0 ? 13 : 10;
      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI * 2);
      ctx.fillStyle = hsl(h, 80, 55);
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      if (i === 0) {
        ctx.beginPath();
        ctx.arc(mx, my, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });
  }

  useEffect(() => draw(baseHue, schemeKey), [baseHue, schemeKey]);

  function getHueFromPoint(clientX, clientY) {
    const c = canvasRef.current;
    if (!c) return null;
    const rect = c.getBoundingClientRect(),
      sx = SZ / rect.width,
      sy = SZ / rect.height;
    const x = (clientX - rect.left) * sx - CX,
      y = (clientY - rect.top) * sy - CY;
    const d = Math.sqrt(x * x + y * y);
    if (d < IR - 5 || d > OR + 20) return null;
    let a = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (a < 0) a += 360;
    return (Math.round(a / 30) * 30) % 360;
  }

  function getHue(e) {
    return getHueFromPoint(e.clientX, e.clientY);
  }

  const drag = useRef(false);
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[360px] mx-auto lg:mx-0">
        <canvas
          ref={canvasRef}
          width={SZ}
          height={SZ}
          className="cursor-crosshair w-full h-auto touch-none"
          onMouseDown={(e) => {
            drag.current = true;
            const h = getHue(e);
            if (h !== null) setBaseHue(h);
          }}
          onMouseMove={(e) => {
            if (!drag.current) return;
            const h = getHue(e);
            if (h !== null) setBaseHue(h);
          }}
          onMouseUp={() => (drag.current = false)}
          onMouseLeave={() => (drag.current = false)}
          onTouchStart={(e) => {
            e.preventDefault();
            const t = e.touches[0];
            const h = getHueFromPoint(t.clientX, t.clientY);
            if (h !== null) setBaseHue(h);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            const t = e.touches[0];
            const h = getHueFromPoint(t.clientX, t.clientY);
            if (h !== null) setBaseHue(h);
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-xl font-semibold text-stone-800"
            >
              {getNearestNode(baseHue).name}
            </div>
            <div className="text-xs text-stone-400 mt-0.5">{baseHue}°</div>
          </div>
        </div>
      </div>
      <p className="text-xs text-stone-400 mt-2 font-light">
        Tap or drag to choose a colour
      </p>
    </div>
  );
}

export default function ColourWheelPage() {
  const [baseHue, setBaseHue] = useState(0);
  const [schemeKey, setSchemeKey] = useState("complementary");
  const sc = SCHEMES[schemeKey],
    sH = sc.offsets.map((o) => (((baseHue + o) % 360) + 360) % 360),
    bn = getNearestNode(baseHue);

  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Colour Theory"
        title="Interactive"
        em="Colour Wheel"
        sub="Click or drag the wheel to select a base colour and explore harmony schemes with suggested flowers for each."
      />
      <InfoBand
        items={[
          [
            "How to use",
            "Click any part of the colour ring to set your base colour. Markers update to show your chosen harmony scheme.",
          ],
          [
            "Colour temperature",
            "Warm colours advance visually. Cool colours recede. Mix both for depth and interest.",
          ],
          [
            "In floristry",
            "Analogous for bridal work. Complementary for bold statements. Triadic for seasonal displays.",
          ],
        ]}
      />
      <div className="max-w-[1100px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          <ColourWheelCanvas
            baseHue={baseHue}
            setBaseHue={setBaseHue}
            schemeKey={schemeKey}
          />
          <div className="flex flex-col gap-5 flex-1 w-full">
            <div>
              <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-2">
                Harmony scheme
              </p>
              <div className="flex flex-col gap-1.5">
                {Object.entries(SCHEMES).map(([key, s]) => (
                  <button
                    key={key}
                    onClick={() => setSchemeKey(key)}
                    className={`text-left text-[12px] px-4 py-2.5 rounded-lg border transition-all cursor-pointer ${schemeKey === key ? "bg-[#3D5C3A] border-[#3D5C3A] text-white font-medium" : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-2">
                Selected palette
              </p>
              <div className="flex gap-2.5 flex-wrap mb-3">
                {sH.map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-11 h-11 rounded-lg ${i === 0 ? "ring-2 ring-stone-700 ring-offset-1" : ""}`}
                      style={{ background: hsl(h, 78, 58) }}
                    />
                    <span className="text-[9px] text-stone-400 leading-none">
                      {getNearestNode(h).name.split("-")[0]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-400">Temperature:</span>
                <span
                  className={`text-[10.5px] font-medium px-3 py-0.5 rounded-full ${bn.temp === "warm" ? "bg-orange-50 text-orange-800" : bn.temp === "cool" ? "bg-blue-50 text-blue-800" : "bg-stone-100 text-stone-500"}`}
                >
                  {bn.temp.charAt(0).toUpperCase() + bn.temp.slice(1)}
                </span>
              </div>
            </div>
            <div className="border-t border-stone-100 pt-4">
              <h3
                style={{ fontFamily: '"Cormorant Garamond",serif' }}
                className="text-[20px] font-semibold text-stone-800 mb-2"
              >
                {sc.label}
              </h3>
              <p className="text-[12px] text-stone-500 font-light leading-relaxed mb-3">
                {sc.desc}
              </p>
              <div className="bg-[#F0EBE1] border-l-2 border-[#B8CEAE] pl-3 pr-3 py-2.5 rounded-r-lg text-[11.5px] text-[#5C4535] leading-relaxed">
                <strong className="font-medium">Floristry tip: </strong>
                {sc.tip}
              </div>
            </div>
          </div>
        </div>
        {/* ── Section 1: Flowers available in these colours ── */}
        <div className="border-t border-stone-100 mt-10 pt-8">
          <div className="flex items-baseline gap-3 mb-2">
            <h3
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-2xl font-semibold text-stone-800"
            >
              Flowers Available in These Colours
            </h3>
          </div>
          <p className="text-[12px] text-stone-400 font-light mb-5">
            {bn.name} base · {sc.label.toLowerCase()} harmony — all flowers that fall within your selected palette
          </p>
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fit,minmax(175px,1fr))" }}
          >
            {sH.map((h) => {
              const node = getNearestNode(h);
              return (
                <div
                  key={h}
                  className="bg-white border border-stone-100 rounded-xl p-4"
                  style={{ borderTopColor: hsl(h, 75, 55), borderTopWidth: "4px" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                      style={{ background: hsl(h, 78, 58) }}
                    />
                    <span className="text-[12px] font-semibold text-stone-700">{node.name}</span>
                  </div>
                  <ul className="flex flex-col gap-1">
                    {node.flowers.map((fl) => {
                      const role = FLOWER_ROLES[fl];
                      const roleColour =
                        role === 'focal'     ? 'text-[#C9948E]' :
                        role === 'secondary' ? 'text-[#6B8A66]' :
                        role === 'filler'    ? 'text-amber-600'  :
                        role === 'line'      ? 'text-blue-500'   :
                        role === 'foliage'   ? 'text-[#3D5C3A]'  :
                                               'text-stone-400';
                      return (
                        <li key={fl} className="flex items-center gap-1.5 text-[11.5px] text-stone-600 font-light">
                          <span className={`text-[8px] font-semibold uppercase tracking-wide w-14 flex-shrink-0 ${roleColour}`}>
                            {role ?? ''}
                          </span>
                          {fl}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Role legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { role: 'focal',     colour: 'text-[#C9948E]', label: 'Focal — dominant statement flower' },
              { role: 'secondary', colour: 'text-[#6B8A66]', label: 'Secondary — supporting bloom' },
              { role: 'filler',    colour: 'text-amber-600',  label: 'Filler — texture & volume' },
              { role: 'line',      colour: 'text-blue-500',   label: 'Line — height & movement' },
              { role: 'foliage',   colour: 'text-[#3D5C3A]',  label: 'Foliage — backdrop & structure' },
            ].map(({ role, colour, label }) => (
              <div key={role} className="flex items-center gap-1.5">
                <span className={`text-[8px] font-semibold uppercase tracking-wide w-14 flex-shrink-0 ${colour}`}>{role}</span>
                <span className="text-[10px] text-stone-400 font-light">{label.split('—')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 2: Recommended flower combinations ── */}
        <div className="border-t border-stone-100 mt-10 pt-8">
          <h3
            style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-2xl font-semibold text-stone-800 mb-2"
          >
            Recommended Flower Combinations
          </h3>
          <p className="text-[12px] text-stone-400 font-light mb-6">
            Curated pairings from your palette — chosen for contrast of form, texture, and scale, not just colour.
          </p>

          {(() => {
            // Build role buckets from selected hue nodes
            const buckets = { focal: [], secondary: [], filler: [], line: [], foliage: [] };
            sH.forEach(h => {
              const node = getNearestNode(h);
              node.flowers.forEach(fl => {
                const role = FLOWER_ROLES[fl];
                if (role && buckets[role]) buckets[role].push({ flower: fl, hue: h, colour: node.name });
              });
            });

            // Build 3 combination suggestions
            const combos = [];

            // Combo 1: Focal + Secondary + Filler
            if (buckets.focal[0] && buckets.secondary[0] && (buckets.filler[0] || buckets.foliage[0])) {
              combos.push({
                label: 'Classic Arrangement',
                icon: '🌸',
                stems: [
                  { flower: buckets.focal[0].flower, role: 'Focal', colour: buckets.focal[0].colour, hue: buckets.focal[0].hue },
                  { flower: buckets.secondary[0].flower, role: 'Secondary', colour: buckets.secondary[0].colour, hue: buckets.secondary[0].hue },
                  ...(buckets.filler[0] ? [{ flower: buckets.filler[0].flower, role: 'Filler', colour: buckets.filler[0].colour, hue: buckets.filler[0].hue }] : []),
                  ...(buckets.foliage[0] ? [{ flower: buckets.foliage[0].flower, role: 'Foliage', colour: buckets.foliage[0].colour, hue: buckets.foliage[0].hue }] : []),
                ],
                note: 'A well-rounded, balanced combination. The focal commands attention; the secondary reinforces the palette; filler and foliage add texture and softness.',
              });
            }

            // Combo 2: Different focal + different secondary + filler/line
            const focal2 = buckets.focal[1] || buckets.focal[0];
            const sec2 = buckets.secondary[1] || buckets.secondary[0];
            if (focal2 && sec2) {
              combos.push({
                label: 'Contemporary Pairing',
                icon: '✨',
                stems: [
                  { flower: focal2.flower, role: 'Focal', colour: focal2.colour, hue: focal2.hue },
                  { flower: sec2.flower, role: 'Secondary', colour: sec2.colour, hue: sec2.hue },
                  ...(buckets.line[0] ? [{ flower: buckets.line[0].flower, role: 'Line', colour: buckets.line[0].colour, hue: buckets.line[0].hue }] : []),
                  ...(buckets.filler[1] ? [{ flower: buckets.filler[1].flower, role: 'Filler', colour: buckets.filler[1].colour, hue: buckets.filler[1].hue }] : buckets.filler[0] ? [{ flower: buckets.filler[0].flower, role: 'Filler', colour: buckets.filler[0].colour, hue: buckets.filler[0].hue }] : []),
                ],
                note: 'A pairing that leans into texture contrast — a strong structural flower beside a softer bloom, with line elements adding height and movement.',
              });
            }

            // Combo 3: Tonal — same hue group, different roles
            const tonal = sH.flatMap(h => {
              const node = getNearestNode(h);
              return node.flowers.map(fl => ({ flower: fl, role: FLOWER_ROLES[fl], hue: h, colour: node.name }));
            }).filter(f => f.role);

            const tonalFocal = tonal.find(f => f.role === 'focal');
            const tonalSec   = tonal.find(f => f.role === 'secondary' && f.hue === tonalFocal?.hue);
            const tonalFill  = tonal.find(f => (f.role === 'filler' || f.role === 'foliage') && f.hue !== tonalFocal?.hue);
            if (tonalFocal && tonalSec && combos.length < 3) {
              combos.push({
                label: 'Monochromatic Moment',
                icon: '🎨',
                stems: [
                  { flower: tonalFocal.flower, role: 'Focal', colour: tonalFocal.colour, hue: tonalFocal.hue },
                  { flower: tonalSec.flower,   role: 'Secondary', colour: tonalSec.colour, hue: tonalSec.hue },
                  ...(tonalFill ? [{ flower: tonalFill.flower, role: tonalFill.role.charAt(0).toUpperCase() + tonalFill.role.slice(1), colour: tonalFill.colour, hue: tonalFill.hue }] : []),
                ],
                note: 'Flowers from the same part of the palette — different forms and textures within a single tonal family. Sophisticated and cohesive.',
              });
            }

            if (combos.length === 0) {
              return (
                <p className="text-[12px] text-stone-400 font-light italic">
                  Select a colour with more flower options to see combination suggestions.
                </p>
              );
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {combos.map(combo => (
                  <div key={combo.label} className="bg-white rounded-xl border border-stone-100 p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{combo.icon}</span>
                      <h4 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[16px] font-semibold text-stone-800">
                        {combo.label}
                      </h4>
                    </div>
                    <div className="flex flex-col gap-1.5 mb-3">
                      {combo.stems.map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0 border border-black/10" style={{ background: hsl(s.hue, 75, 60) }} />
                          <span className="text-[11px] font-medium text-stone-700">{s.flower}</span>
                          <span className="text-[9px] text-stone-400 ml-auto">{s.role}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10.5px] text-stone-500 font-light leading-relaxed border-t border-stone-100 pt-2.5">
                      {combo.note}
                    </p>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* ── Section 3: Suggested arrangement formula ── */}
        <div className="border-t border-stone-100 mt-10 pt-8">
          <h3
            style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-2xl font-semibold text-stone-800 mb-2"
          >
            Suggested Arrangement Formula
          </h3>
          <p className="text-[12px] text-stone-400 font-light mb-6">
            A stem count guide for your chosen harmony scheme — professional ratios that ensure balance without guesswork.
          </p>

          {(() => {
            const formula = SCHEME_FORMULAS[schemeKey];
            if (!formula) return null;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
                {/* Stem count cards */}
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { role: 'Focal',    stems: formula.stems.focal,     colour: '#C9948E', desc: 'Statement bloom' },
                      { role: 'Secondary',stems: formula.stems.secondary,  colour: '#6B8A66', desc: 'Supporting flower' },
                      { role: 'Filler',   stems: formula.stems.filler,     colour: '#D4B870', desc: 'Texture & volume' },
                      { role: 'Foliage',  stems: formula.stems.foliage,    colour: '#3D5C3A', desc: 'Backdrop & structure' },
                    ].map(({ role, stems, colour, desc }) => (
                      <div key={role} className="bg-white rounded-xl border border-stone-100 p-4 text-center">
                        <p className="text-[26px] font-semibold leading-none mb-1" style={{ color: colour }}>{stems}</p>
                        <p className="text-[10px] font-semibold text-stone-700 uppercase tracking-wide mb-0.5">{role}</p>
                        <p className="text-[10px] text-stone-400 font-light">{desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Ratio visualisation */}
                  <div className="bg-white rounded-xl border border-stone-100 p-4">
                    <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-2">Colour ratio</p>
                    <div className="flex gap-1 h-6 rounded-full overflow-hidden mb-1.5">
                      {formula.ratio.split(' / ').map((pct, i) => {
                        const colours = ['#C9948E', '#6B8A66', '#D4B870', '#3D5C3A'];
                        return (
                          <div
                            key={i}
                            className="h-full transition-all"
                            style={{ width: `${pct}%`, background: colours[i] ?? '#B8CEAE' }}
                          />
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-stone-500 font-light">{formula.ratio} — {formula.ratioLabel}</p>
                  </div>
                </div>

                {/* Scheme tip card */}
                <div className="bg-[#3D5C3A] rounded-xl p-5 text-white flex flex-col gap-3">
                  <div>
                    <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-[#B8CEAE] mb-1">
                      {sc.label} — design tip
                    </p>
                    <p className="text-[13px] font-light leading-relaxed text-white/90">
                      {formula.tip}
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <p className="text-[11px] text-[#B8CEAE] font-light leading-relaxed">
                      {formula.combination}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
