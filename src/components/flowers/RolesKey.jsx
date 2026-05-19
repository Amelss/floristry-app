import { useState } from "react";

const ROLES_INFO = [
  [
    "Focal",
    "The star of the arrangement — the first flower the eye is drawn to. Usually the largest or most colourful bloom.",
  ],
  [
    "Secondary",
    "Supports and complements the focal flower. Adds depth and variety without competing for attention.",
  ],
  [
    "Filler",
    "Fills gaps, adds texture and volume. Often small-flowered — gypsophila, waxflower, statice.",
  ],
  [
    "Line",
    "Creates height, direction and movement. Spike-shaped flowers — delphiniums, snapdragons, veronica.",
  ],
  [
    "Foliage",
    "Structural greenery that frames and grounds the arrangement — eucalyptus, ruscus, pittosporum.",
  ],
  [
    "Texture",
    "Added for tactile and visual interest — berries, seed heads, and unusual architectural forms.",
  ],
];

export default function RolesKey() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#FAF8F4] border-b border-stone-100 px-4 py-4 sm:px-10">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <div>
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400">
            Flower Roles Explained
          </p>
          <p className="text-[11px] text-stone-500 font-light mt-2">
            Tap to {open ? "hide" : "view"} the role definitions.
          </p>
        </div>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-sm text-stone-600">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {ROLES_INFO.map(([role, desc]) => (
            <div
              key={role}
              className="flex flex-col gap-2.5 items-start sm:flex-row sm:items-start min-w-0"
            >
              <span className="text-[9px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#3D5C3A] text-white whitespace-nowrap flex-shrink-0 mt-0.5">
                {role}
              </span>
              <span className="text-[11px] text-stone-500 font-light leading-relaxed min-w-0">
                {desc}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
