import { useState } from 'react';
import Hero from '../shared/Hero';
import { BackLink, SectionHead, Checklist, TipCard, ExerciseCard } from '../shared/LearningPage';

const PATHWAY_STAGES = [
  {
    badge: 1,
    colour: 'bg-[#3D5C3A]',
    title: 'Assist an established wedding florist',
    desc: 'The fastest way to learn. Contact local wedding florists directly — offer to assist for free or low cost on wedding prep days. You will condition flowers, build buttonholes, and assist with setup. In one season you will see more real weddings than years of courses.',
    tasks: ['Flower conditioning', 'Buttonhole and corsage building', 'Venue setup and strike', 'Loading and logistics'],
    timeline: '3–12 months',
  },
  {
    badge: 2,
    colour: 'bg-[#6B8A66]',
    title: 'Build skills through practice',
    desc: 'Parallel to assisting, dedicate time to deliberate skill-building at home. Practice the hand-tied bouquet daily. Build and time buttonholes. Each session should be photographed and timed — the goal is professional speed and quality.',
    tasks: ['Daily bouquet practice', 'Timed buttonhole builds', 'Foam-free mechanics', 'Wiring and taping drills'],
    timeline: 'Ongoing',
  },
  {
    badge: 3,
    colour: 'bg-[#6B8A66]',
    title: 'Do styled shoots',
    desc: 'A styled shoot is a practice wedding — a photographer, florist, and often other suppliers collaborate to create images in a real venue with real flowers. No client, no pressure. The output is portfolio content. This is how most florists build their portfolio before their first paid wedding.',
    tasks: ['Contact wedding photographers on Instagram/social', 'Offer floristry in exchange for images', 'Target venues you want to work in', 'Build 3–4 shoots before going live'],
    timeline: '6–18 months in',
  },
  {
    badge: 4,
    colour: 'bg-[#3D5C3A]',
    title: 'Take your first paid weddings',
    desc: 'Start small. A 30-person intimate wedding, an elopement, or a family member\'s wedding is the best starting point. Under-promise and over-deliver. Price fairly — you are building reputation, not profit. Do not take a 150-person venue wedding as your first solo job.',
    tasks: ['Intimate weddings and elopements', 'Family and friend weddings', 'Clear written contracts', 'Post-wedding review every time'],
    timeline: '12–24 months in',
  },
];

const PRACTICAL_SKILLS = [
  'Hand-tied bouquet to exhibition standard',
  'Buttonhole: under 20 minutes',
  'Corsage: wrist and pin-on',
  'Foam-free mechanics: chicken wire, kenzan',
  'Wiring: double leg mount, support wiring',
  'Floristry tape: even and professional finish',
  'Ribbon wrap: bouquet handle',
  'Flower conditioning protocol',
];

const BUSINESS_SKILLS = [
  'Pricing formula and item costing',
  'Written quotation process',
  'Client consultation structure',
  'Wedding floor plan reading',
  'Logistics and timeline planning',
  'Supplier relationships (growers, wholesalers)',
  'Basic photography for portfolio',
];

const PORTFOLIO_TIPS = [
  { icon: '📸', label: 'Styled shoots first', tip: 'You do not need paid weddings to have a portfolio. Three well-photographed styled shoots produce better portfolio content than six real weddings with poor images. Partner with emerging photographers who are also building their portfolios.' },
  { icon: '📱', label: 'Phone photography', tip: 'A modern smartphone in good natural light produces perfectly usable portfolio images. Place arrangements near a large window. Use portrait mode for bouquets. Never photograph against busy backgrounds or in yellow artificial light.' },
  { icon: '🌐', label: 'Instagram as portfolio', tip: 'Many UK wedding florists use Instagram as their primary portfolio. Consistent posting of your own work, clear captions including the style and flowers used, and a clean grid aesthetic will do more than a formal website for most beginners.' },
  { icon: '🤝', label: 'Photographer relationships', tip: 'A good relationship with 2–3 local wedding photographers is invaluable. They shoot your work beautifully, tag you in posts, and refer you to couples. Invest time in these relationships — they are worth more than any advertisement.' },
  { icon: '🎯', label: 'Style consistency', tip: 'Your portfolio should show a consistent design voice — not one of every style. Choose the styles you want to be hired for and build your portfolio around those. Couples select florists whose portfolio matches their vision.' },
  { icon: '📝', label: 'Testimonials', tip: 'After every wedding, ask for a written testimonial. A specific testimonial — "Emma created exactly the blush garden-style bouquet I had imagined, three months before the wedding she managed our colour changes brilliantly" — is far more powerful than a star rating.' },
];

const CASE_STUDIES = [
  {
    icon: '🌸',
    name: 'Emily & James',
    style: 'Romantic / Blush',
    guests: 32,
    budget: '£1,400',
    budgetColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    venue: 'Country house hotel',
    requirements: [
      '1 bridal bouquet (garden rose, ranunculus, sweet pea)',
      '2 bridesmaid bouquets',
      '5 buttonholes (groom + 4 groomsmen)',
      '2 corsages (mothers)',
      '4 guest table low arrangements',
      '1 top table arrangement',
      '3 pew ends',
    ],
    labour: '18 hours total (8 build, 4 setup, 3 prep/ordering, 3 admin)',
    lessons: 'Pew ends were underpriced — we spent 40 minutes on each. Review buttonhole time — 3 hours for 5 buttons is too slow for commercial pace.',
  },
  {
    icon: '🌿',
    name: 'Sophie & Tom',
    style: 'English Garden',
    guests: 85,
    budget: '£3,800',
    budgetColour: 'bg-amber-50 text-amber-700',
    venue: 'Barn',
    requirements: [
      '1 bridal bouquet (loose garden style)',
      '4 bridesmaid bouquets',
      '10 buttonholes',
      '3 corsages',
      '12 guest table bud vase clusters',
      '1 top table runner (6m)',
      '1 ceremony arch (simple)',
      '1 welcome arrangement',
    ],
    labour: '42 hours total across 3 days',
    lessons: 'Bud vase clusters took longer than expected — 25 minutes per table including filling water. The ceremony arch was the most profitable single item at 4× flower cost.',
  },
  {
    icon: '👑',
    name: 'Charlotte & Alexander',
    style: 'Classic / Luxury',
    guests: 120,
    budget: '£9,500',
    budgetColour: 'bg-[#D4B8B5]/40 text-[#5C4535]',
    venue: 'Stately home',
    requirements: [
      'Premium bridal bouquet (garden rose, lily of the valley)',
      '5 bridesmaid bouquets',
      '15 buttonholes',
      '5 corsages',
      '20 guest tables — high candelabra arrangements',
      '1 top table (8m)',
      '1 full ceremony arch',
      '1 hanging floral installation',
      'Bar arrangements',
      'Welcome flowers',
    ],
    labour: '120+ hours across team of 3 over 2 days setup',
    lessons: 'Installations require a second pair of hands — solo setup of anything over 3 hours at height is unsafe. Delivery van size was underestimated — needed two trips.',
  },
];

const EXERCISES = [
  {
    level: 'Beginner',
    levelColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    title: 'Your First Costing Exercise',
    task: 'Price a complete "small wedding" package: 1 bridal bouquet, 3 bridesmaid bouquets, 5 buttonholes, 2 corsages, 8 guest table arrangements, 1 top table. Use the pricing formula: (flowers × 3) + sundries + labour + delivery.',
    goal: 'A written quote document showing every item, the cost breakdown behind each, and a total. Compare to the sample pricing in the Pricing & Costing section.',
    time: '60–90 mins',
  },
  {
    level: 'Intermediate',
    levelColour: 'bg-amber-50 text-amber-700',
    title: 'Timed Build Challenge',
    task: 'Build a bridal bouquet (20 stems minimum, round posy) and one matching groom\'s buttonhole in 75 minutes total. Photograph against a clean background. Review: dome shape, ribbon handle, stem length.',
    goal: 'Professional-quality bouquet and buttonhole within the commercial time limit. Most professional florists build a medium bridal bouquet in 45–60 minutes.',
    time: '75 mins timed',
  },
  {
    level: 'Advanced',
    levelColour: 'bg-[#D4B8B5]/40 text-[#5C4535]',
    title: 'Plan a Styled Shoot',
    task: 'Plan a complete styled shoot brief: choose a wedding style, identify 5 floral items to build, write a mood board description, list all flowers needed, cost the materials, and contact one local photographer.',
    goal: 'A written shoot brief and an outreach message to a photographer. The goal is to plan and execute one real styled shoot within 60 days.',
    time: 'Multi-day project',
  },
];

function CaseStudyAccordion({ studies }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="flex flex-col gap-4">
      {studies.map((s, i) => (
        <div key={i} className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left px-5 py-4 flex items-center gap-4 cursor-pointer"
          >
            <span className="text-2xl flex-shrink-0">{s.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <p className="text-[14px] font-semibold text-stone-800">{s.name}</p>
                <span className={`text-[8px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${s.budgetColour}`}>{s.budget}</span>
              </div>
              <p className="text-[11px] text-stone-400 font-light">{s.style} · {s.guests} guests · {s.venue}</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Floral requirements</p>
                  <ul className="flex flex-col gap-1.5">
                    {s.requirements.map((req, j) => (
                      <li key={j} className="flex gap-2 text-[12px] text-stone-600 font-light leading-relaxed">
                        <span className="text-[#6B8A66] flex-shrink-0 font-bold mt-0.5">·</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="bg-white border border-stone-100 rounded-lg px-4 py-3 mb-3">
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-1">Labour</p>
                    <p className="text-[12px] text-stone-600 font-light leading-relaxed">{s.labour}</p>
                  </div>
                  <div className="bg-[#B8CEAE]/20 border border-[#B8CEAE]/40 rounded-lg px-4 py-3">
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-1">Key lessons</p>
                    <p className="text-[12px] text-[#3D5C3A] font-medium leading-relaxed">{s.lessons}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function WeddingCareerPage({ go }) {
  return (
    <div>
      <Hero
        eyebrow="Wedding Floristry · Career Guidance"
        title="Getting Started in"
        em="Wedding Floristry"
        sub="Your realistic route into wedding floristry — from assisting and styled shoots to portfolio building and running your first complete wedding."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Wedding Floristry" onBack={() => go?.('wedding')} />

        {/* Section 1 — The Realistic Pathway */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Career Pathway"
            title="How Most Wedding Florists Get Started"
            desc="A realistic four-stage pathway — most professional wedding florists follow some version of this route."
          />
          <div className="flex flex-col gap-5">
            {PATHWAY_STAGES.map(stage => (
              <div key={stage.badge} className="bg-white rounded-xl border border-stone-100 overflow-hidden">
                <div className="flex items-start gap-4 px-5 pt-5 pb-4">
                  <span className={`flex-shrink-0 w-9 h-9 rounded-full ${stage.colour} text-white text-[14px] font-bold flex items-center justify-center`}>
                    {stage.badge}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                      <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[20px] font-semibold text-stone-800 leading-tight">{stage.title}</h3>
                      <span className="text-[10px] font-medium text-stone-400 bg-stone-100 px-2.5 py-0.5 rounded-full flex-shrink-0">{stage.timeline}</span>
                    </div>
                    <p className="text-[12px] text-stone-500 font-light leading-relaxed mb-3">{stage.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.tasks.map(task => (
                        <span key={task} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#3D5C3A]/8 text-[#3D5C3A]">{task}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 — Skills to Build */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Skill Development"
            title="Skills to Build Before Your First Wedding"
            desc="Practical and business skills that must be in place before you take your first solo wedding."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-4">Practical skills</h3>
              <Checklist items={PRACTICAL_SKILLS} />
            </div>
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-4">Business skills</h3>
              <Checklist items={BUSINESS_SKILLS} />
            </div>
          </div>
        </div>

        {/* Section 3 — Building a Portfolio */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Portfolio"
            title="Building a Portfolio"
            desc="How to create compelling portfolio content before your first paid wedding."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PORTFOLIO_TIPS.map(t => (
              <TipCard key={t.label} {...t} />
            ))}
          </div>
        </div>

        {/* Section 4 — Case Studies */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Case Studies"
            title="Three Wedding Case Studies"
            desc="Real wedding scenarios with requirements, labour breakdowns, and key lessons. Tap each to expand."
          />
          <CaseStudyAccordion studies={CASE_STUDIES} />
        </div>

        {/* Section 5 — Practice Exercises */}
        <div className="mb-0">
          <SectionHead
            eyebrow="Practice"
            title="Practice Exercises"
            desc="Three exercises to build the skills and confidence needed for your first wedding."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {EXERCISES.map(ex => (
              <ExerciseCard key={ex.title} {...ex} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
