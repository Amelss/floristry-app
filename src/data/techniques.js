// ── Core technique cards ─────────────────────────────────────
const TECHNIQUES_DATA = [
  {
    emoji: '🌸',
    title: 'Hand-Tied Bouquet',
    sub: 'The foundation skill of UK floristry.',
    steps: [
      'Strip all foliage that would fall below the binding point.',
      'Hold your first stem in your non-dominant hand.',
      'Add stems one at a time at a 45° angle, always rotating the bouquet toward you.',
      'All stems should spiral in the same direction — this is non-negotiable.',
      'Tie firmly with twine or raffia at the binding point. The bouquet should stand unsupported.',
      'Recut all stems at a 45° angle and place immediately in clean water.',
    ],
    meta: ['⏱ 20–40 mins', '🌹 8–15 stems', '📚 RHS Level 2 core skill'],
  },
  {
    emoji: '🌿',
    title: 'Foam-Free Mechanics',
    sub: 'Modern UK floristry has moved away from single-use floral foam.',
    steps: [
      'Tape grid: stretch waterproof tape across the vessel opening in a 3×3 or 4×4 grid.',
      'Chicken wire: scrunch a sheet and fit inside the vase for a flexible, reusable stem holder.',
      'Flower frog (kenzan): a spiked pin holder — ideal for low bowl arrangements and Ikebana.',
      'Moss base: pack damp sphagnum moss tightly into a vessel or frame for a natural hold.',
      'Bud vase cluster: group five or more small vessels at varying heights for an organic look.',
      'All of these mechanics are washable and can be reused indefinitely.',
    ],
    meta: ['⏱ 10–20 mins setup', '♻️ Reusable', '📚 RHS Level 2 — mechanics'],
  },
  {
    emoji: '🪴',
    title: 'Wreath Making',
    sub: 'A classic UK seasonal skill — sold year-round as workshop content.',
    steps: [
      'Start with a wire ring or a pre-formed willow/wicker frame.',
      'For wire frames: bind damp sphagnum moss onto the frame with reel wire, building an even pad.',
      'Work in small bundles, moving consistently in one direction around the ring.',
      'Bind each bundle with reel wire before adding the next — overlap to hide binds.',
      'Vary texture throughout: mix fine foliage, berries, cones, and seed heads.',
      'Add focal flowers last, securing them with a double leg mount and wiring into the moss base.',
    ],
    meta: ['⏱ 60–90 mins', '🌿 Wire or willow frame', '📚 RHS Level 2 — seasonal work'],
  },
  {
    emoji: '💐',
    title: 'Buttonhole & Corsage',
    sub: 'Wired personal flowers for weddings, proms, and formal occasions.',
    steps: [
      'Select a focal flower and wire it using the appropriate method for its stem type (see Wiring Guide below).',
      'Wire all additional flowers and foliage — nothing should retain its natural stem.',
      'Tape every wired element individually before assembling.',
      'Build the piece in your hand: focal first, foliage and secondary flowers framing it.',
      'Bind all elements together at the binding point with reel wire, then tape over the wires.',
      'Keep the finished piece in a cool damp environment — a sealed box in the fridge — until delivery.',
    ],
    meta: ['⏱ 45–60 mins', '✂️ Stub wire + floristry tape', '📚 RHS Level 2 — occasion work'],
  },
];

export default TECHNIQUES_DATA;

// ── Wiring & Mechanics Guide ─────────────────────────────────
export const WIRE_GAUGES = [
  {
    gauge: '0.32mm',
    label: 'Reel wire — extra fine',
    uses: ['Binding hand-tied stems at the binding point', 'Securing wreath material bundles to a frame', 'Wiring very delicate dried flowers'],
    tip: null,
  },
  {
    gauge: '0.46mm',
    label: 'Stub wire — fine',
    uses: ['Wiring small spray flowers (waxflower, freesia, gypsophila)', 'Delicate corsage work', 'Wiring small berries and foliage sprigs'],
    tip: null,
  },
  {
    gauge: '0.71mm',
    label: 'Stub wire — standard',
    uses: ['Most buttonhole and corsage wiring', 'Roses, carnations, and spray flowers', 'Leaf stitch wiring', 'The most versatile gauge — begin here'],
    tip: 'Start here. This gauge handles 80% of floristry wiring tasks.',
    recommended: true,
  },
  {
    gauge: '0.90mm',
    label: 'Stub wire — heavy',
    uses: ['Large-headed flowers (sunflowers, peonies, dahlias)', 'Extending or replacing short or broken stems', 'Supporting drooping heavy heads'],
    tip: null,
  },
  {
    gauge: '1.25mm',
    label: 'Stub wire — very heavy',
    uses: ['Structural armature work', 'Extending thick woody stems', 'Building internal frames for large wired pieces'],
    tip: null,
  },
];

export const WIRING_METHODS = [
  {
    name: 'Single Leg Mount',
    icon: '📌',
    difficulty: 'Beginner',
    bestFor: 'Roses, carnations, lily of the valley, most solid-stemmed flowers',
    gauge: '0.71mm',
    steps: [
      'Cut a 0.71mm stub wire to approximately 18cm.',
      'Pierce the natural stem horizontally about 1cm above its base.',
      'Pull the wire through until equal lengths extend from both sides.',
      'Bend both legs downward, running parallel to the natural stem.',
      'Tape from just above the pierce point downward, covering both wire legs completely.',
    ],
  },
  {
    name: 'Internal Stem Wire',
    icon: '🔩',
    difficulty: 'Beginner',
    bestFor: 'Hollow-stemmed flowers: gerbera, agapanthus, sunflower, amaryllis',
    gauge: '0.90mm',
    steps: [
      'Choose a stub wire gauge that fits snugly — not loosely — inside the hollow stem.',
      'Push the wire up through the cut base of the stem, guiding it carefully upward.',
      'Stop when the tip of the wire is just below the flower head — do not push through.',
      'The flower head now sits supported on the wire. No piercing of the stem is needed.',
      'Tape from below the flower head all the way to the wire base.',
    ],
  },
  {
    name: 'Double Leg Mount',
    icon: '🔗',
    difficulty: 'Beginner–Intermediate',
    bestFor: 'Heavy-headed flowers, adding length to short stems, the main buttonhole focal flower',
    gauge: '0.71mm–0.90mm',
    steps: [
      'Cut a stub wire and bend it so one leg is about 4cm longer than the other.',
      'Hold the flower stem between the two wire legs.',
      'Wrap the longer leg firmly around the stem and the shorter leg — three to four tight turns.',
      'Both legs should now hang parallel below the flower. Trim to matching length.',
      'Tape from the binding point downward, covering all wire.',
    ],
  },
  {
    name: 'Stitch Method',
    icon: '🍃',
    difficulty: 'Beginner',
    bestFor: 'Ivy, galax, camellia, hedera, and any large decorative leaf',
    gauge: '0.46mm–0.56mm',
    steps: [
      'Turn the leaf face-down.',
      'Thread a fine stub wire horizontally through the central vein, one-third up from the leaf base.',
      'Pull the wire through until equal lengths extend from both sides.',
      'Bend both legs downward alongside the leaf\'s natural stem.',
      'Twist or tape the wire legs gently together with the natural stem below.',
    ],
  },
  {
    name: 'Hook Method',
    icon: '🪝',
    difficulty: 'Intermediate',
    bestFor: 'Gerberas, chrysanthemum heads, any thick flower head used in corsage work',
    gauge: '0.71mm',
    steps: [
      'Push a stub wire upward through the centre of the flower head from below.',
      'Leave 5mm of wire protruding above the flower centre and bend it into a small tight hook.',
      'Pull the wire back down — the hook catches inside the flower head and holds securely.',
      'The remaining wire hangs below as the new false stem.',
      'Tape from just beneath the flower head down the full length of the wire.',
    ],
  },
  {
    name: 'Support Wiring',
    icon: '🛠️',
    difficulty: 'Beginner',
    bestFor: 'Tulips (bent neck prevention), naturally curved stems, any stem needing straightening',
    gauge: '0.71mm',
    steps: [
      'Do not pierce the stem — this method is entirely external.',
      'Hold a stub wire alongside the natural stem.',
      'Begin taping at the top, binding the wire to the stem firmly.',
      'Work downward, keeping even tension throughout.',
      'Especially useful for tulips in bridal work, where bent necks after wiring are common.',
    ],
  },
];

export const TAPING_TIPS = [
  'Always use floristry tape (stemtex or parafilm) — it is self-sealing when stretched.',
  'Stretch the tape as you wrap — stretching activates the adhesive and bonds the layers.',
  'Start just below the wire entry point, or just beneath the base of the petals.',
  'Wrap at a 45° angle and overlap each pass by roughly half its width.',
  'Work continuously in one direction only — downward. Never go back upward over tape already laid.',
  'A smooth, gap-free finish is the mark of professional wired work. Lumpy tape is a beginner tell.',
  'If tape tears mid-wrap, overlap the new piece generously over the tear and continue.',
];
