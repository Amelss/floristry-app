const NAV_LINKS = [
  { label: 'Foundations',         key: 'foundations'  },
  { label: 'Learn',               key: 'learn'        },
  { label: 'Tools',               key: 'tools'        },
  { label: '30 Core Flowers',     key: 'flowers'      },
  { label: 'Colour Wheel',        key: 'wheel'        },
  { label: 'Seasonal Calendar',   key: 'seasonal'     },
  { label: 'Techniques & Skills', key: 'techniques'   },
  { label: 'Study Companion',     key: 'workbook'     },
  { label: 'Knowledge Quiz',      key: 'quiz'         },
];

export default function Footer({ go }) {
  return (
    <footer className="bg-[#3D5C3A] mt-auto">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-14 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* Brand */}
        <div className="sm:col-span-1">
          <p style={{ fontFamily: '"Great Vibes", cursive' }}
            className="text-[24px] text-white/90 leading-none mb-3 select-none">
            My Floristry Helper
          </p>
          <p className="text-[11.5px] text-white/50 font-light leading-relaxed max-w-[220px]">
            A free self-study resource for beginner to intermediate floristry students in the United Kingdom.
          </p>
        </div>

        {/* Quick links */}
        <div className="sm:col-span-2">
          <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4">Quick Links</p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
            {NAV_LINKS.map(link => (
              <li key={link.key}>
                <button
                  onClick={() => go(link.key)}
                  className="text-[11.5px] text-white/60 hover:text-white transition-colors font-light cursor-pointer bg-transparent border-none text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-14 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] text-white/35 font-light">
            Completely Free.
          </p>
          <p className="text-[11px] text-white/35 font-light">
            Photos courtesy of{' '}
            <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 underline transition-colors">
              Pexels
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
