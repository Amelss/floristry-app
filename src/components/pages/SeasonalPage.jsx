import { useState, useEffect } from "react";
import MONTHS_CAL from "../../data/seasonal";
import Hero from "../shared/Hero";
import InfoBand from "../shared/InfoBand";

function getRegionDesc(city, region) {
  const combined = `${region || ""} ${city || ""}`.toLowerCase();

  if (/suffolk|norfolk|cambridgeshire|essex|east anglia|ipswich|norwich|cambridge|colchester|bury st edmunds|lowestoft|peterborough|ely/.test(combined))
    return "East Anglia has the UK's longest growing season — low rainfall and high sunshine hours mean earlier flowering and bumper late-summer harvests of dahlias, sunflowers, and sweet peas.";

  if (/cornwall|isles of scilly|devon|truro|exeter|plymouth|penzance|torquay/.test(combined))
    return "The South West benefits from the warming Gulf Stream, giving it the mildest winters in the UK. Daffodils often arrive weeks ahead of the rest of the country, and the season stretches well into autumn.";

  if (/\bkent\b|maidstone|canterbury|margate|folkestone|tunbridge/.test(combined))
    return "The 'Garden of England' enjoys a warm, dry climate ideal for cut flowers. Kent growers are among the UK's most productive, with long summer days perfect for roses, sweet peas, and peonies.";

  if (/greater london|\blondon\b/.test(combined))
    return "London's urban heat island effect creates a microclimate 1–3°C warmer than the surrounding countryside, extending the growing season and allowing earlier spring blooms than most of England.";

  if (/sussex|surrey|hampshire|berkshire|wiltshire|dorset|brighton|guildford|southampton|portsmouth|salisbury/.test(combined))
    return "The South East enjoys one of the UK's warmest and driest climates. A long, reliable growing season makes it ideal territory for roses, peonies, and early spring bulbs.";

  if (/herefordshire|worcestershire|gloucestershire|somerset|bristol|bath|gloucester|shrewsbury|shropshire/.test(combined))
    return "The West Country and Welsh Marches offer fertile soils and a mild, moist climate — ideal for lush growth. Expect a long season of sweet peas, roses, and cottage-garden varieties.";

  if (/wales|cardiff|swansea|newport|wrexham|aberystwyth/.test(combined))
    return "Wales has a mild, wet Atlantic climate. The west coast is particularly frost-free in winter, supporting an early spring. Many growers focus on hardy cottage-garden flowers that thrive in the damp.";

  if (/scotland|edinburgh|glasgow|aberdeen|dundee|inverness|perth|stirling/.test(combined))
    return "Scotland's cooler temperatures and longer summer daylight hours produce intensely coloured, long-lasting blooms. The season is shorter but the flowers — sweet peas, dahlias, and wildflowers — are exceptional.";

  if (/northern ireland|belfast|derry|londonderry|lisburn/.test(combined))
    return "Northern Ireland's mild, wet climate supports lush growth. The Gulf Stream keeps winters frost-light, and the long northern summer evenings extend the season for sweet peas, dahlias, and hardy perennials.";

  if (/yorkshire|durham|northumberland|tyne|cumbria|leeds|sheffield|newcastle|sunderland|bradford|hull|york|middlesbrough/.test(combined))
    return "The North of England has a shorter but intense growing season. Cool nights produce vibrant flower colours, and crops like sweet peas, dahlias, and hardy annuals thrive in the long summer light.";

  if (/lancashire|manchester|merseyside|cheshire|liverpool|blackpool|bolton|preston|chester/.test(combined))
    return "The North West is wetter than most of England, but mild Gulf Stream winters mean the season starts early. Lush conditions suit moisture-loving varieties like hydrangeas, sweet peas, and aquilegia.";

  if (/midlands|leicestershire|nottinghamshire|derbyshire|lincolnshire|northamptonshire|warwickshire|staffordshire|birmingham|nottingham|leicester|derby|coventry|lincoln/.test(combined))
    return "The Midlands sits at the heart of England with a moderate climate. A reliable growing season suits a wide range of cut flowers, from early spring tulips to late-summer dahlias.";

  if (/hertfordshire|bedfordshire|oxfordshire|buckinghamshire|hertford|luton|oxford|milton keynes/.test(combined))
    return "The Home Counties enjoy a temperate, relatively dry climate close to the East Anglian influence. A solid mid-length season supports roses, sweet peas, and seasonal British blooms in abundance.";

  return "Growing seasons vary across the UK — southern and coastal areas typically enjoy earlier springs and longer flowering windows than northern and inland regions.";
}

function useLocation() {
  const [info, setInfo] = useState({ label: "Location Not Found", desc: getRegionDesc("", "") });

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const city = d.city || "";
        const region = d.region || "";
        const label = city && region ? `${city}, ${region}` : city || region || "Location Not Found";
        setInfo({ label, desc: getRegionDesc(city, region) });
      })
      .catch(() => {});
  }, []);

  return info;
}

export default function SeasonalPage() {
  const { label, desc } = useLocation();

  return (
    <div>
      <Hero
        eyebrow="UK Floristry · Seasonal Guide"
        title="Seasonal Calendar"
        em="UK Flowers"
        sub="What's growing when — a month-by-month guide to British cut flowers and foliage, from January snowdrops to December amaryllis."
      />
      <InfoBand
        items={[
          [
            "UK grown only",
            "This calendar covers flowers grown in Britain. Many additional varieties are available via import year-round.",
          ],
          [
            "Why seasonality matters",
            "Seasonal flowers are fresher, cheaper, more sustainable, and support British flower farmers.",
          ],
          [label, desc],
        ]}
      />
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
