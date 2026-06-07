import { useState } from 'react';
import Hero from '../shared/Hero';
import { BackLink, SectionHead, TipCard } from '../shared/LearningPage';

const COST_COMPONENTS = [
  {
    icon: '🌸',
    name: 'Flower & foliage cost',
    desc: 'The actual trade cost of all flowers, foliage, and filler. This is only one component — never the whole price. Typical industry practice: multiply the trade flower cost by 3× to 3.5× to get the base selling price for the flowers alone.',
  },
  {
    icon: '⚙️',
    name: 'Sundries & mechanics',
    desc: 'Wire, tape, ribbon, pins, vases, foam alternatives, packaging. Often underestimated by beginners. Budget £8–15 per bouquet, £3–6 per buttonhole. These are real costs and must be costed separately.',
  },
  {
    icon: '👐',
    name: 'Labour',
    desc: 'The time cost of designing, building, and finishing. Calculate at your hourly rate (beginners often use £15–20/hr; experienced florists £25–35/hr). A bridal bouquet takes 45–90 minutes. A buttonhole: 15–20 minutes. Labour is often the biggest cost item.',
  },
  {
    icon: '🚐',
    name: 'Delivery & setup',
    desc: 'Travel time, vehicle costs, setup time at venue, pack-down if required. For an out-of-town wedding, this can be 3–6 hours of billable time plus fuel. Never omit it.',
  },
];

const SAMPLE_ITEMS = [
  {
    name: 'Bridal bouquet (round, medium)',
    tradeCost: '£15–25',
    sellRange: '£85–160',
    note: 'Most price-sensitive item — research local competitors',
  },
  {
    name: 'Bridesmaid bouquet',
    tradeCost: '£8–14',
    sellRange: '£45–80',
    note: 'Usually 60–70% of bridal bouquet price',
  },
  {
    name: 'Groom\'s buttonhole',
    tradeCost: '£2–4',
    sellRange: '£18–30',
    note: 'Price is for quality construction, not just the flower',
  },
  {
    name: 'Groomsmen buttonholes (×5)',
    tradeCost: '£8–16',
    sellRange: '£70–120 for 5',
    note: 'Quantity discount of 10–15% is standard',
  },
  {
    name: 'Wrist corsage',
    tradeCost: '£5–9',
    sellRange: '£30–50',
    note: 'Labour-intensive — never underprice',
  },
  {
    name: 'Guest table low arrangement',
    tradeCost: '£12–22',
    sellRange: '£55–95',
    note: 'Often the largest revenue item across 15–20 tables',
  },
  {
    name: 'Top table arrangement',
    tradeCost: '£25–45',
    sellRange: '£95–180',
    note: 'Typically 2–3× a guest table arrangement',
  },
  {
    name: 'Ceremony arch (full)',
    tradeCost: '£150–300',
    sellRange: '£600–1,200+',
    note: 'Highly variable — get exact size from venue',
  },
];

const BUDGETS = [
  {
    title: 'Small Wedding — 30 guests, £1,200 budget',
    items: [
      { item: 'Bridal bouquet (garden rose, ranunculus)', price: '£125' },
      { item: 'Bridesmaid bouquets (×2)', price: '£110' },
      { item: 'Buttonholes — groom + 3 groomsmen (×4)', price: '£80' },
      { item: 'Corsages — mothers (×2)', price: '£70' },
      { item: 'Guest table arrangements (×5, low round)', price: '£350' },
      { item: 'Top table arrangement', price: '£120' },
      { item: 'Welcome arrangement', price: '£95' },
      { item: 'Delivery & setup (2.5 hrs)', price: '£50' },
    ],
    total: '£1,000',
    labour: '£120',
    delivery: '£50',
    grandTotal: '£1,170',
    note: 'Comfortably within brief. Labour at £20/hr for 6 build hours included in item prices above. Delivery charged separately.',
  },
  {
    title: 'Medium Wedding — 80 guests, £3,500 budget',
    items: [
      { item: 'Bridal bouquet (loose garden style)', price: '£145' },
      { item: 'Bridesmaid bouquets (×4)', price: '£240' },
      { item: 'Buttonholes (×8)', price: '£160' },
      { item: 'Corsages (×3)', price: '£105' },
      { item: 'Guest table arrangements (×12, bud vase clusters)', price: '£780' },
      { item: 'Top table arrangement', price: '£160' },
      { item: 'Ceremony arch (simple)', price: '£580' },
      { item: 'Welcome arrangement', price: '£110' },
      { item: 'Delivery & setup (4 hrs)', price: '£80' },
    ],
    total: '£2,280',
    labour: '£840',
    delivery: '£80',
    grandTotal: '£3,200',
    note: 'Labour at £25/hr across 2.5 build days. Ceremony arch is most profitable single item. Bud vase clusters include vessel hire.',
  },
  {
    title: 'Luxury Wedding — 120 guests, £8,500 budget',
    items: [
      { item: 'Premium bridal bouquet (garden rose, lily of the valley)', price: '£220' },
      { item: 'Bridesmaid bouquets (×5)', price: '£375' },
      { item: 'Buttonholes (×15)', price: '£330' },
      { item: 'Corsages (×5)', price: '£175' },
      { item: 'Guest tables — high candelabra arrangements (×20)', price: '£2,400' },
      { item: 'Top table — 8m arrangement', price: '£380' },
      { item: 'Full ceremony arch', price: '£1,100' },
      { item: 'Hanging floral installation', price: '£950' },
      { item: 'Bar arrangements (×2)', price: '£220' },
      { item: 'Welcome flowers', price: '£180' },
      { item: 'Delivery & setup (2-day, team of 3)', price: '£480' },
    ],
    total: '£6,330',
    labour: '£1,800',
    delivery: '£480',
    grandTotal: '£8,610',
    note: 'Labour at £30/hr across team of 3, 2 setup days. High candelabra arrangements at 60–120 stems each are the largest material cost. Installation requires specialist rigging equipment — confirm venue approval in advance.',
  },
];

const QUOTING_TIPS = [
  { icon: '📋', label: 'Get a full brief', tip: 'Never quote from memory or a vague description. Use a written brief form: venue, table count, table sizes, ceremony type, colour palette, style direction, and specific items required.' },
  { icon: '🔢', label: 'Count everything', tip: 'Count the tables on the floor plan (not the guest list). Count the wedding party individually. One table or one groomsman missed from a quote is a loss you absorb, not the client.' },
  { icon: '📈', label: 'Build in contingency', tip: 'Add 10% to all flower quantities before pricing. Stems break, heads bruise, and last-minute changes happen. A 10% contingency prevents you from eating into your own profit margin.' },
  { icon: '⏱️', label: 'Cost your time honestly', tip: 'Beginners consistently underprice labour. Track your time building two or three items. You will almost always find the build takes longer than you estimated. Price from actual time, not optimistic estimates.' },
  { icon: '✉️', label: 'Confirm in writing', tip: 'Send a written quote with every item listed, quantities confirmed, and a 48-hour response window. Verbal agreements lead to disputes. Every wedding should have a signed quote or contract before any flowers are ordered.' },
  { icon: '💰', label: 'Take a deposit', tip: 'Require a 30–50% non-refundable deposit to confirm a booking. Flowers must be ordered weeks in advance. Without a deposit, a cancelled wedding means real financial loss.' },
];

function BudgetAccordion({ budgets }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="flex flex-col gap-3">
      {budgets.map((b, i) => (
        <div key={i} className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center gap-3 cursor-pointer"
          >
            <div className="flex-1">
              <p className="text-[13px] font-medium text-stone-700 leading-snug">{b.title}</p>
            </div>
            <svg
              width="12" height="12" viewBox="0 0 14 14" fill="none"
              className={`flex-shrink-0 text-stone-400 transition-transform ${open === i ? 'rotate-180' : ''}`}
            >
              <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open === i && (
            <div className="border-t border-stone-100 px-5 py-5 bg-stone-50/60">
              <div className="flex flex-col gap-1.5 mb-4">
                {b.items.map((row, j) => (
                  <div key={j} className="flex items-start justify-between gap-3">
                    <p className="text-[12px] text-stone-600 font-light leading-relaxed">{row.item}</p>
                    <p className="text-[12px] font-medium text-stone-700 flex-shrink-0">{row.price}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-200 pt-3 flex flex-col gap-1 mb-3">
                <div className="flex justify-between">
                  <p className="text-[11px] text-stone-500 font-light">Labour (included in items above)</p>
                  <p className="text-[11px] font-medium text-stone-600">{b.labour}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[11px] text-stone-500 font-light">Delivery & setup</p>
                  <p className="text-[11px] font-medium text-stone-600">{b.delivery}</p>
                </div>
                <div className="flex justify-between mt-1 pt-2 border-t border-stone-200">
                  <p className="text-[13px] font-semibold text-stone-800">Total</p>
                  <p className="text-[13px] font-bold text-[#3D5C3A]">{b.grandTotal}</p>
                </div>
              </div>
              <div className="bg-[#B8CEAE]/20 border border-[#B8CEAE]/40 rounded-lg px-4 py-2.5">
                <p className="text-[11px] text-[#3D5C3A] font-medium leading-relaxed">{b.note}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function WeddingPricingPage({ go }) {
  return (
    <div>
      <Hero
        eyebrow="Wedding Floristry · Business Skills"
        title="Pricing &"
        em="Costing"
        sub="How professional wedding florists price their work — from flower costs and labour to markup, profit margins, and accurate quoting."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Wedding Floristry" onBack={() => go?.('wedding')} />

        {/* Section 1 — Four Cost Components */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Pricing Fundamentals"
            title="The Four Elements of Wedding Floristry Pricing"
            desc="Every wedding quote is built from these four components. Missing any one of them erodes your margin."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COST_COMPONENTS.map(comp => (
              <div key={comp.name} className="bg-white rounded-xl border border-stone-100 px-5 py-5">
                <div className="text-2xl mb-3">{comp.icon}</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-2">{comp.name}</h3>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 — The Pricing Formula */}
        <div className="mb-14">
          <SectionHead
            eyebrow="The Formula"
            title="The Wedding Florist's Pricing Formula"
            desc="A worked example showing how the four components combine into a final selling price."
          />
          <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
            <div className="bg-[#3D5C3A]/5 border-b border-stone-100 px-6 py-5">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-2">The formula</p>
              <p className="font-mono text-[15px] font-semibold text-stone-800">
                Selling Price = (Flower Cost × 3) + Sundries + Labour + Delivery
              </p>
            </div>
            <div className="px-6 py-5">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-4">Worked example: Bridal Bouquet</p>
              <div className="flex flex-col gap-2 mb-4">
                {[
                  { label: 'Flower cost', calc: '£18.00 × 3', result: '£54.00' },
                  { label: 'Sundries (ribbon, wire, tape, pins)', calc: '', result: '£8.00' },
                  { label: 'Labour (90 mins @ £20/hr)', calc: '', result: '£30.00' },
                  { label: 'Contribution to delivery', calc: '', result: '£10.00' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[12px] text-stone-600 font-light">{row.label}</span>
                      {row.calc && <span className="text-[11px] text-stone-400 font-light ml-2">{row.calc}</span>}
                    </div>
                    <span className="text-[12px] font-medium text-stone-700 flex-shrink-0">{row.result}</span>
                  </div>
                ))}
                <div className="border-t border-stone-200 pt-3 flex items-center justify-between">
                  <span className="text-[14px] font-bold text-stone-800">Total</span>
                  <span className="text-[16px] font-bold text-[#3D5C3A]">£102.00</span>
                </div>
              </div>
              <div className="bg-[#B8CEAE]/20 border border-[#B8CEAE]/40 rounded-lg px-4 py-3">
                <p className="text-[11px] text-[#3D5C3A] font-medium leading-relaxed">
                  This is a conservative calculation. Established wedding florists typically sell bridal bouquets at £95–£180+ depending on size, style, and location.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 — Sample Item Pricing */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Pricing Reference"
            title="Sample Item Pricing"
            desc="Typical trade costs and selling price ranges for common wedding floristry items."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SAMPLE_ITEMS.map(item => (
              <div key={item.name} className="bg-white rounded-xl border border-stone-100 px-5 py-4">
                <p className="text-[12px] font-semibold text-stone-700 mb-2">{item.name}</p>
                <div className="flex items-center gap-4 mb-2">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-0.5">Trade cost</p>
                    <p className="text-[12px] font-medium text-stone-600">{item.tradeCost}</p>
                  </div>
                  <div className="w-px h-8 bg-stone-100" />
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-0.5">Sell price</p>
                    <p className="text-[13px] font-bold text-[#3D5C3A]">{item.sellRange}</p>
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 font-light">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 — Sample Wedding Budgets */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Worked Examples"
            title="Three Wedding Budgets — Worked Examples"
            desc="Realistic breakdowns from small to luxury. Tap each to see the full item-by-item quote."
          />
          <BudgetAccordion budgets={BUDGETS} />
        </div>

        {/* Section 5 — Quoting Accurately */}
        <div className="mb-0">
          <SectionHead
            eyebrow="Quoting Guidance"
            title="Quoting Accurately"
            desc="Six principles for producing accurate, professional wedding quotes."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUOTING_TIPS.map(t => (
              <TipCard key={t.label} {...t} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
