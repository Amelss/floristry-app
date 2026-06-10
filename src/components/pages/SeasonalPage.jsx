import MONTHS_CAL from "../../data/seasonal";
import Hero from "../shared/Hero";
import useLocalStorage from "../../hooks/useLocalStorage";

const DEFAULT_DESC =
  "Growing seasons vary across the UK — southern and coastal areas typically enjoy earlier springs and longer flowering windows than northern and inland regions. Choose your region for local growing notes.";

const REGIONS = [
  {
    key: "east-anglia",
    label: "East Anglia",
    desc: "East Anglia has the UK's longest growing season — low rainfall and high sunshine hours mean earlier flowering and bumper late-summer harvests of dahlias, sunflowers, and sweet peas.",
  },
  {
    key: "south-west",
    label: "South West & Cornwall",
    desc: "The South West benefits from the warming Gulf Stream, giving it the mildest winters in the UK. Daffodils often arrive weeks ahead of the rest of the country, and the season stretches well into autumn.",
  },
  {
    key: "kent",
    label: "Kent",
    desc: "The 'Garden of England' enjoys a warm, dry climate ideal for cut flowers. Kent growers are among the UK's most productive, with long summer days perfect for roses, sweet peas, and peonies.",
  },
  {
    key: "london",
    label: "London",
    desc: "London's urban heat island effect creates a microclimate 1–3°C warmer than the surrounding countryside, extending the growing season and allowing earlier spring blooms than most of England.",
  },
  {
    key: "south-east",
    label: "South East",
    desc: "The South East enjoys one of the UK's warmest and driest climates. A long, reliable growing season makes it ideal territory for roses, peonies, and early spring bulbs.",
  },
  {
    key: "west-country",
    label: "West Country & Welsh Marches",
    desc: "The West Country and Welsh Marches offer fertile soils and a mild, moist climate — ideal for lush growth. Expect a long season of sweet peas, roses, and cottage-garden varieties.",
  },
  {
    key: "wales",
    label: "Wales",
    desc: "Wales has a mild, wet Atlantic climate. The west coast is particularly frost-free in winter, supporting an early spring. Many growers focus on hardy cottage-garden flowers that thrive in the damp.",
  },
  {
    key: "scotland",
    label: "Scotland",
    desc: "Scotland's cooler temperatures and longer summer daylight hours produce intensely coloured, long-lasting blooms. The season is shorter but the flowers — sweet peas, dahlias, and wildflowers — are exceptional.",
  },
  {
    key: "northern-ireland",
    label: "Northern Ireland",
    desc: "Northern Ireland's mild, wet climate supports lush growth. The Gulf Stream keeps winters frost-light, and the long northern summer evenings extend the season for sweet peas, dahlias, and hardy perennials.",
  },
  {
    key: "north-east",
    label: "North East & Yorkshire",
    desc: "The North of England has a shorter but intense growing season. Cool nights produce vibrant flower colours, and crops like sweet peas, dahlias, and hardy annuals thrive in the long summer light.",
  },
  {
    key: "north-west",
    label: "North West",
    desc: "The North West is wetter than most of England, but mild Gulf Stream winters mean the season starts early. Lush conditions suit moisture-loving varieties like hydrangeas, sweet peas, and aquilegia.",
  },
  {
    key: "midlands",
    label: "Midlands",
    desc: "The Midlands sits at the heart of England with a moderate climate. A reliable growing season suits a wide range of cut flowers, from early spring tulips to late-summer dahlias.",
  },
  {
    key: "home-counties",
    label: "Home Counties",
    desc: "The Home Counties enjoy a temperate, relatively dry climate close to the East Anglian influence. A solid mid-length season supports roses, sweet peas, and seasonal British blooms in abundance.",
  },
];

export default function SeasonalPage() {
  const [regionKey, setRegionKey] = useLocalStorage("seasonalRegion", "");
  const region = REGIONS.find((r) => r.key === regionKey);

  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Seasonal Guide"
        title="Seasonal Calendar"
        em="UK Flowers"
        sub="What's growing when — a month-by-month guide to British cut flowers and foliage, from January snowdrops to December amaryllis."
      />

      <div className="bg-white border-b border-stone-100 px-5 sm:px-14 py-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-0">
        {[
          ['UK grown only', 'This calendar covers flowers grown in Britain. Many additional varieties are available via import year-round.'],
          ['Why seasonality matters', 'Seasonal flowers are fresher, cheaper, more sustainable, and support British flower farmers.'],
        ].map(([t, d], i) => (
          <div key={i} className="sm:border-r sm:border-stone-100 sm:pr-6 sm:mr-6">
            <p className="text-[12px] font-medium text-stone-700 mb-0.5">{t}</p>
            <p className="text-[11.5px] text-stone-500 font-light leading-relaxed">{d}</p>
          </div>
        ))}

        {/* Region picker — remembered on this device */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[12px] font-medium text-stone-700">Growing in your region</p>
            <select
              value={regionKey}
              onChange={(e) => setRegionKey(e.target.value)}
              aria-label="Choose your UK region"
              className="ml-auto text-[11px] font-light text-stone-600 border border-stone-200 rounded-lg px-2 py-1 bg-stone-50 outline-none focus:border-[#3D5C3A] cursor-pointer max-w-[160px]"
            >
              <option value="">Choose region…</option>
              {REGIONS.map((r) => (
                <option key={r.key} value={r.key}>{r.label}</option>
              ))}
            </select>
          </div>
          <p className="text-[11.5px] text-stone-500 font-light leading-relaxed">
            {region ? region.desc : DEFAULT_DESC}
          </p>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {MONTHS_CAL.map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-md transition-all"
            >
              <div
                className="px-4 py-3 flex items-center gap-3"
                style={{
                  background: `${m.colour}20`,
                  borderBottom: `1px solid ${m.colour}30`,
                }}
              >
                <span className="text-2xl">{m.emoji}</span>
                <div>
                  <h3
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}
                    className="text-[18px] font-semibold text-stone-800"
                  >
                    {m.name}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-light tracking-wide uppercase">
                    {m.season}
                  </p>
                </div>
                <div
                  className="ml-auto w-3 h-3 rounded-full"
                  style={{ background: m.colour }}
                />
              </div>
              <ul className="px-4 py-2">
                {m.flowers.map((fl) => (
                  <li
                    key={fl}
                    className="text-[11px] text-stone-600 font-light py-0.5 border-b border-stone-50 last:border-0"
                  >
                    {fl}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
