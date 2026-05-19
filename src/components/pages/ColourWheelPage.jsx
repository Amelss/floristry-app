import { useState, useRef, useEffect } from "react";
import { COLOUR_NODES, SCHEMES } from "../../data/colourWheel";
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
        eyebrow="UK Floristry · Colour Theory"
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
        <div className="border-t border-stone-100 mt-10 pt-8">
          <div className="flex items-baseline gap-3 mb-5">
            <h3
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-2xl font-semibold text-stone-800"
            >
              Flowers in this palette
            </h3>
            <span className="text-[11px] text-stone-400">
              {bn.name} base · {sc.label.toLowerCase()} harmony
            </span>
          </div>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            }}
          >
            {sH.map((h) => {
              const node = getNearestNode(h);
              return (
                <div
                  key={h}
                  className="bg-white border border-stone-100 rounded-xl p-4"
                  style={{
                    borderTopColor: hsl(h, 75, 55),
                    borderTopWidth: "4px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <div
                      className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                      style={{ background: hsl(h, 78, 58) }}
                    />
                    <span className="text-[12px] font-medium text-stone-700">
                      {node.name}
                    </span>
                  </div>
                  <ul className="text-[11.5px] text-stone-500 leading-7 font-light">
                    {node.flowers.map((fl) => (
                      <li key={fl}>{fl}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
