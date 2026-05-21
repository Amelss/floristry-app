export default function RevisionGuidePage() {
  return (
    <div className="min-h-screen" style={{ background: '#FAF8F4' }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: '#2D4A2D' }}>
        {/* Subtle texture pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }} />

        <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">

            {/* Book mockup */}
            <div className="flex-shrink-0">
              <div className="relative w-[96px] sm:w-[110px]">
                <div className="absolute top-2 left-2 w-full rounded" style={{ background: 'rgba(255,255,255,0.07)', aspectRatio: '3/4' }} />
                <div className="absolute top-1 left-1 w-full rounded" style={{ background: 'rgba(255,255,255,0.10)', aspectRatio: '3/4' }} />
                <div className="relative rounded shadow-2xl flex flex-col p-4"
                  style={{ background: '#1E3A1E', aspectRatio: '3/4', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div className="mb-2 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                    <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '5.5px', letterSpacing: '0.14em', color: '#6B8A66' }}
                      className="uppercase">My Floristry Helper</p>
                  </div>
                  <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '9px', color: 'white', lineHeight: 1.3 }}
                    className="font-semibold flex-1">
                    Revision<br />Guide
                  </p>
                  <div className="h-px w-full my-2" style={{ background: 'rgba(255,255,255,0.12)' }} />
                  <p style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: '6px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}
                    className="italic">All 8 modules<br />covered</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-[10px] font-medium tracking-[0.18em] uppercase mb-3"
                style={{ color: '#6B8A66' }}>Quick-Reference Companion</p>

              <h1 style={{ fontFamily: '"Cormorant Garamond",serif' }}
                className="text-[32px] sm:text-[38px] font-semibold leading-tight mb-4 text-white">
                Floristry Revision Guide
              </h1>

              <p className="text-[13.5px] font-light leading-relaxed mb-6"
                style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '520px' }}>
                A concise, structured companion to your study workbook. All eight course modules
                distilled into quick-reference tables, key concept summaries, interactive
                checklists, and knowledge-check questions — designed for efficient, focused review.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
                <a
                  href="/my-floristry-revision-guide.pdf"
                  download="My Floristry Revision Guide"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-[13px] font-medium transition-colors"
                  style={{ background: '#6B8A66', color: 'white' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#5a7857'}
                  onMouseLeave={e => e.currentTarget.style.background = '#6B8A66'}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v8M3.5 6.5L7 10l3.5-3.5M1.5 12.5h11"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Revision Guide — PDF
                </a>
                <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.32)' }}>
                  Free · 26 pages · A4 · Interactive
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Distinction banner ── */}
      <div className="border-b border-stone-100" style={{ background: '#FDFCF9' }}>
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-4 items-start p-4 rounded-xl border border-stone-100 bg-white">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: '#3D5C3A' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M2 4h6M2 10h8" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-stone-700 mb-1">Study Workbook</p>
                <p className="text-[11px] font-light text-stone-400 leading-relaxed">
                  Six-week guided journal. Structured daily plans, reflection prompts, observation logs,
                  planning sheets, and personal notes space.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4 rounded-xl border border-[#3D5C3A]/20 bg-[#3D5C3A]/[0.03]">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: '#3D5C3A' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5L8.5 5h3.5l-2.8 2.1 1 3.4L7 8.6 3.8 10.5l1-3.4L2 5h3.5L7 1.5Z"
                    stroke="white" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-stone-700 mb-1">Revision Guide <span className="text-[#3D5C3A]">← you are here</span></p>
                <p className="text-[11px] font-light text-stone-400 leading-relaxed">
                  Concise, reference-focused. All eight modules condensed into quick-reference tables,
                  key concept summaries, checklists and knowledge checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── What's inside ── */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="flex items-center gap-3 mb-8">
          <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-[22px] font-semibold text-stone-700 whitespace-nowrap">What's inside</h2>
          <div className="flex-1 h-px bg-stone-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {[
            {
              num: '01',
              title: 'The World of Floristry',
              items: ['History & context', 'Florist responsibilities', 'Career qualities', 'Essential tools'],
            },
            {
              num: '02',
              title: 'Plant ID & Symbolism',
              items: ['Plant anatomy', 'Botanical names', '16 cut flowers', 'Flower meanings & colour'],
            },
            {
              num: '03',
              title: 'Flower Care',
              items: ['7-step conditioning', 'Ethylene guide', 'Problems & solutions', 'Professional products'],
            },
            {
              num: '04',
              title: 'Design Principles',
              items: ['7 elements', '6 principles', '9 Western styles', 'Ikebana + colour theory'],
            },
            {
              num: '05',
              title: 'Containers & Display',
              items: ['12 container types', 'Mechanics (foam, wire)', 'Display checklist', 'Arrangement → container'],
            },
            {
              num: '06',
              title: 'Flowers, Foliage & Seasons',
              items: ['Filler reference', 'Foliage guide', 'UK seasonal calendar', 'Sourcing tips'],
            },
            {
              num: '07',
              title: 'Wedding & Funeral',
              items: ['7 bouquet styles', 'Wedding elements', 'Funeral tributes', 'Wreath-making steps'],
            },
            {
              num: '08',
              title: 'Business & Career',
              items: ['Business models', 'Marketing (4 Ps)', 'Pricing formula', 'Career pathways & quals'],
            },
          ].map(({ num, title, items }) => (
            <div key={num} className="bg-white rounded-xl border border-stone-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-medium tracking-[0.14em] px-2 py-0.5 rounded-full"
                  style={{ background: '#3D5C3A10', color: '#3D5C3A' }}>
                  {num}
                </span>
              </div>
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
                className="text-[15px] font-semibold text-stone-800 mb-3 leading-tight">
                {title}
              </h3>
              <ul className="flex flex-col gap-1">
                {items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-[11.5px] text-stone-400 font-light leading-snug">
                    <span style={{ color: '#6B8A66' }} className="flex-shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Interactive features */}
        <div className="flex items-center gap-3 mb-6">
          <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-[22px] font-semibold text-stone-700 whitespace-nowrap">Interactive features</h2>
          <div className="flex-1 h-px bg-stone-100" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M4.5 8l2.5 2.5L11.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Master Checklists',
              desc: '45 interactive tick boxes — one per knowledge item across all 8 modules. Check off what you know.',
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3h12M2 8h8M2 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="13" cy="13" r="2" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              ),
              title: 'Knowledge Checks',
              desc: '20 typeable questions covering all modules — fill in answers directly in the PDF to test yourself.',
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
                    stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Study Notes Space',
              desc: '4 large typeable areas for your own observations, mnemonics, examples, and key terms.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start p-5 rounded-xl border border-stone-100 bg-white">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-[#3D5C3A]"
                style={{ background: '#3D5C3A10' }}>
                {icon}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-stone-700 mb-1">{title}</p>
                <p className="text-[11.5px] font-light text-stone-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="rounded-2xl p-8 sm:p-10 text-center" style={{ background: '#2D4A2D' }}>
          <p className="text-[10px] font-medium tracking-[0.18em] uppercase mb-3"
            style={{ color: '#6B8A66' }}>Free Download</p>
          <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-[26px] sm:text-[30px] font-semibold text-white mb-3">
            Ready to review?
          </h2>
          <p className="text-[13px] font-light mb-7 max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.6)' }}>
            Download the full 26-page Revision Guide as a PDF. Use it digitally with interactive
            fields, or print it and work through it with a pen.
          </p>
          <a
            href="/my-floristry-revision-guide.pdf"
            download="My Floristry Revision Guide"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg text-[13px] font-medium transition-colors"
            style={{ background: '#6B8A66', color: 'white' }}
            onMouseEnter={e => e.currentTarget.style.background = '#5a7857'}
            onMouseLeave={e => e.currentTarget.style.background = '#6B8A66'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M3.5 6.5L7 10l3.5-3.5M1.5 12.5h11"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Revision Guide — PDF
          </a>
        </div>

      </div>
    </div>
  );
}
