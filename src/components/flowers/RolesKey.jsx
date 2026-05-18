const ROLES_INFO = [
  ['Focal','The star of the arrangement — the first flower the eye is drawn to. Usually the largest or most colourful bloom.'],
  ['Secondary','Supports and complements the focal flower. Adds depth and variety without competing for attention.'],
  ['Filler','Fills gaps, adds texture and volume. Often small-flowered — gypsophila, waxflower, statice.'],
  ['Line','Creates height, direction and movement. Spike-shaped flowers — delphiniums, snapdragons, veronica.'],
  ['Foliage','Structural greenery that frames and grounds the arrangement — eucalyptus, ruscus, pittosporum.'],
  ['Texture','Added for tactile and visual interest — berries, seed heads, and unusual architectural forms.'],
];

export default function RolesKey() {
  return (
    <div className="bg-[#FAF8F4] border-b border-stone-100 px-10 py-4">
      <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Flower Roles Explained</p>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
        {ROLES_INFO.map(([role, desc]) => (
          <div key={role} className="flex gap-2.5 items-start">
            <span className="text-[9px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#3D5C3A] text-white whitespace-nowrap flex-shrink-0 mt-0.5">{role}</span>
            <span className="text-[11px] text-stone-500 font-light leading-relaxed">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
