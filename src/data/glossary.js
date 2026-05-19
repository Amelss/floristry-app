const GLOSSARY = [
  { term: 'Advancement', category: 'Design', def: 'The visual effect of warm or light colours appearing to come forward in a design, making elements feel closer to the viewer.' },
  { term: 'Analogous', category: 'Design', def: 'A colour harmony using three to five colours that sit adjacent to each other on the colour wheel. Creates a calm, cohesive palette — e.g. yellow, yellow-green, and green.' },
  { term: 'Aqua pack', category: 'Mechanics', def: 'A method of transporting cut flowers in a small amount of water, sealed in polythene. Keeps stems hydrated during delivery without a full bucket.' },
  { term: 'Armature', category: 'Mechanics', def: 'A structural framework built inside or around an arrangement to support stems. Can be made from chicken wire, willow, rattan, or other materials.' },

  { term: 'Balance', category: 'Design', def: 'The sense of visual equilibrium in a design. Can be symmetrical (mirror-image both sides) or asymmetrical (balanced by visual weight rather than identical placement).' },
  { term: 'Binding point', category: 'Technique', def: 'The point on a hand-tied bouquet where all stems are held together and tied. Usually about one-third of the way up the stems. A clean binding point is the hallmark of good hand-tied work.' },
  { term: 'Boutonnière', category: 'Design', def: 'The American term for a buttonhole — a small flower design worn on a jacket lapel.' },
  { term: 'Bract', category: 'Flower Anatomy', def: 'A modified leaf that resembles a petal and sits beneath or around a flower. Often more colourful than true leaves. Examples: poinsettia, bougainvillea, anthurium spathe.' },
  { term: 'Buttonhole', category: 'Design', def: 'A small, wired single flower or spray worn on a lapel — the UK term for a boutonnière. Traditionally a single rose, carnation, or freesia with foliage.' },

  { term: 'Calyx', category: 'Flower Anatomy', def: 'The collective name for all the sepals of a flower. Typically green, the calyx forms a protective cup beneath the petals and is visible on roses and carnations.' },
  { term: 'Chicken wire', category: 'Mechanics', def: 'Hexagonal galvanised wire mesh crumpled into a vase or container to support stems. A versatile, eco-friendly alternative to floral foam.' },
  { term: 'Cold chain', category: 'Business', def: 'The temperature-controlled journey a flower takes from grower to wholesaler to florist. Breaks in the cold chain (e.g. sitting in a warm delivery van) significantly reduce vase life.' },
  { term: 'Complementary colours', category: 'Design', def: 'Colours that sit directly opposite each other on the colour wheel. When placed together they intensify each other — e.g. red and green, purple and yellow, orange and blue.' },
  { term: 'Conditioning', category: 'Care', def: 'The process of preparing freshly purchased flowers to maximise their vase life. Includes recutting stems, removing lower foliage, and allowing flowers to hydrate in clean water before use.' },
  { term: 'Corbeil', category: 'Design', def: 'A basket-style arrangement, traditionally oval or round, where flowers are arranged to spill naturally over the sides — popular for buffet tables and altar pieces.' },
  { term: 'Corm', category: 'Flower Anatomy', def: 'A swollen underground stem base that stores nutrients. Gladioli and freesias grow from corms. Not to be confused with a bulb, which has distinct layers.' },
  { term: 'Corsage', category: 'Design', def: 'A small floral arrangement pinned to clothing or worn on the wrist. A key skill in wedding and occasion floristry — requires wiring and taping for a neat, lightweight result.' },

  { term: 'Defoliate', category: 'Technique', def: 'To remove leaves from a stem, particularly those that would sit below the waterline in a vase or arrangement. Submerged foliage rots and encourages bacterial growth.' },
  { term: 'Depth', category: 'Design', def: 'The visual illusion of three-dimensionality in an arrangement, created by placing some flowers deeper into the design and bringing others forward.' },
  { term: 'Dutch auction', category: 'Business', def: 'The descending-price clock auction system used at major flower markets such as Royal FloraHolland in Aalsmeer. The price starts high and drops until a buyer stops the clock.' },
  { term: 'Dutch Masters style', category: 'Design', def: 'An opulent, asymmetric design style inspired by 17th-century Dutch and Flemish oil paintings. Characterised by rich colours, layered textures, and garden-grown varieties like peonies, roses, and hellebores.' },

  { term: 'Emphasis', category: 'Design', def: 'The principle of creating a dominant focal point that draws the eye first. Without emphasis, an arrangement can look flat and lacking in interest.' },
  { term: 'Ethylene', category: 'Care', def: 'A natural gas produced by ripening fruit and dying or damaged flowers. Accelerates ageing in ethylene-sensitive flowers such as carnations, sweet peas, and roses. Keep flowers away from fruit bowls.' },
  { term: 'Extension wire', category: 'Mechanics', def: 'A heavier gauge stub wire taped alongside a short or weak flower stem to extend its length and provide rigidity. Commonly used in corsage and buttonhole work.' },

  { term: 'Filler flower', category: 'Design', def: 'Small-headed flowers used to fill gaps, add texture, and soften the outline of an arrangement. Examples include gypsophila, waxflower, alchemilla mollis, and statice.' },
  { term: 'Floral foam', category: 'Mechanics', def: 'A water-retaining phenolic foam block (commonly known by the brand name OASIS) into which stems are inserted. Being phased out in eco-conscious studios due to microplastic pollution.' },
  { term: 'Floret', category: 'Flower Anatomy', def: 'An individual small flower within a clustered head. The round pompom head of a spray chrysanthemum, for example, is made up of many florets.' },
  { term: 'Focal flower', category: 'Design', def: 'The dominant, largest, or most visually striking flower in a design — the first thing the eye is drawn to. Usually placed centrally or at the lowest point. Examples: rose, peony, dahlia, lily.' },
  { term: 'Foliage', category: 'Design', def: 'Leaves, branches, and greenery used to frame, support, and add depth to floral arrangements. Good foliage makes focal flowers sing. Examples: eucalyptus, ruscus, pittosporum, salal.' },
  { term: 'Form flower', category: 'Design', def: 'A flower with a distinctive, architectural shape that adds structure and visual interest. Examples: anthurium, bird of paradise (strelitzia), orchid, protea.' },

  { term: 'Gerbera spinner', category: 'Mechanics', def: 'A circular water-filled disc with pre-drilled holes used to hold gerbera stems upright in a bucket. Prevents the weak hollow stems from collapsing before sale.' },
  { term: 'Grid', category: 'Mechanics', def: 'A framework of florist tape, wire, or stem sections placed across the top of a vase to support and position stems. A simple, foam-free mechanical technique.' },

  { term: 'Hand-tied bouquet', category: 'Technique', def: 'A bouquet where stems are arranged using the spiral technique and bound at the binding point, then cut flat so the bouquet stands unsupported in a vase. The cornerstone skill of UK floristry.' },
  { term: 'Hardening', category: 'Care', def: 'Placing conditioned flowers in a cold room or cool environment to firm up stems and petals before use. Improves vase life and makes flowers easier to work with.' },
  { term: 'Harmony', category: 'Design', def: 'The pleasing sense of unity achieved when all elements of an arrangement — colour, texture, scale, and form — work together cohesively.' },
  { term: 'Hollow stem', category: 'Care', def: 'Stems that are naturally hollow, such as delphinium and dahlia. These require special conditioning: turn upside down, fill with water, and plug with cotton wool before placing in a bucket.' },

  { term: 'Ikebana', category: 'Design', def: 'The ancient Japanese art of flower arranging, governed by rules of minimalism, balance, and harmony. Uses three main lines representing heaven, man, and earth. The kenzan (pin holder) is the primary mechanic.' },
  { term: 'Inflorescence', category: 'Flower Anatomy', def: 'A stem bearing a cluster of flowers, each on its own smaller stalk. Examples include delphinium (raceme), yarrow (umbel), and lilac (panicle). Each flower type has a characteristic inflorescence structure.' },

  { term: 'Kenzan', category: 'Mechanics', def: 'A heavy metal pin holder used in Ikebana as the primary mechanic. Stems are pressed firmly onto the upright pins, allowing precise positioning without foam or wire.' },

  { term: 'Line flower', category: 'Design', def: 'Tall, spike-shaped flowers that create structure, height, and directional movement in an arrangement. Examples: delphinium, gladiolus, snapdragon, liatris, eremurus.' },

  { term: 'Markup', category: 'Business', def: 'The percentage added to wholesale cost to arrive at the retail selling price. Standard UK floristry markup is 2.5–3× wholesale for individual stems, higher for made-up work including labour and sundries.' },
  { term: 'Mass flower', category: 'Design', def: 'A full, round flower used to add bulk and volume — often used interchangeably with "volume flower." Examples: carnation, chrysanthemum, hydrangea.' },
  { term: 'Mechanics', category: 'Mechanics', def: 'The hidden infrastructure that holds a floral arrangement in place. Includes floral foam, chicken wire, tape grids, kenzan pin holders, and water tubes. Good mechanics are invisible in the finished design.' },
  { term: 'Monochromatic', category: 'Design', def: 'A colour scheme using different tints, tones, and shades of a single hue. Creates elegant, sophisticated designs — an all-white or all-blush palette is a classic bridal monochromatic scheme.' },

  { term: 'OASIS', category: 'Mechanics', def: 'The most widely recognised brand of floral foam. The term is often used generically to refer to any floral foam. Must be soaked thoroughly before use — never push stems into dry foam.' },
  { term: 'Overwrapping', category: 'Technique', def: 'Covering a completed bouquet in layers of tissue paper and cellophane for retail presentation. Proper overwrapping protects the flowers and adds perceived value.' },

  { term: 'Pavé', category: 'Technique', def: 'A technique where flowers are cut very short and massed tightly at the same level, covering the mechanics completely like cobblestones. Creates a lush, textural carpet of bloom.' },
  { term: 'Petal', category: 'Flower Anatomy', def: 'The colourful modified leaf that forms the corolla of a flower, attracting pollinators with colour and scent. Collectively, the petals of a flower are called the corolla.' },
  { term: 'pH', category: 'Care', def: 'A measure of acidity. Cutting stems in slightly acidic water (pH 3.5–4.5) helps prevent air bubbles blocking the xylem and maximises water uptake. Commercial flower food contains acidifiers.' },
  { term: 'Posy', category: 'Design', def: 'A small, tightly-packed round bouquet. The bridal posy is the most popular bouquet style in UK weddings. A larger posy bouquet is sometimes called a "full round bouquet."' },
  { term: 'Proportion', category: 'Design', def: 'The size relationship between different elements in a design, and between the arrangement and its container. Classical rules suggest a design should be 1.5–2× the height of its container.' },

  { term: 'Recession', category: 'Design', def: 'The visual effect of dark, cool, or dull colours appearing to recede in a design, pushing elements back and creating depth.' },
  { term: 'Reel wire', category: 'Mechanics', def: 'Continuous wire wound on a spool, available in various gauges. Used for binding hand-tied bouquets, attaching materials to frames, and wreath construction.' },
  { term: 'Recut', category: 'Care', def: 'To trim the base of flower stems at a 45° angle, ideally under water or immediately before placing in water. Removes the sealed base and maximises water uptake. Should be done every 2–3 days.' },
  { term: 'Rhythm', category: 'Design', def: 'The repetition of elements — colour, form, or texture — through a design to create a sense of movement and flow for the eye to follow.' },

  { term: 'Secondary flower', category: 'Design', def: 'A supporting flower that adds bulk, depth, and variety alongside the focal. Usually similar in scale but less dominant. Examples: spray rose, lisianthus, alstroemeria.' },
  { term: 'Sepal', category: 'Flower Anatomy', def: 'One of the leaf-like structures that form the calyx and protect the flower bud before it opens. Typically green. In some flowers (e.g. tulips, lilies) the sepals resemble petals and are called tepals.' },
  { term: 'Sheaf', category: 'Design', def: 'A flat-backed tribute arrangement resembling a bundle of stems laid in parallel, used in sympathy and funeral floristry. One of the most traditional UK funeral flower forms.' },
  { term: 'Spiral technique', category: 'Technique', def: 'The method of adding each stem at an angle in the same rotational direction when building a hand-tied bouquet. Creates a natural twisted pattern that allows the bouquet to stand unaided and opens the stems to water.' },
  { term: 'Split complementary', category: 'Design', def: 'A colour harmony using one base colour and the two colours adjacent to its complement. Less stark than a direct complementary scheme but still bold — e.g. blue with yellow-orange and red-orange.' },
  { term: 'Stub wire', category: 'Mechanics', def: 'Pre-cut lengths of wire in various gauges (from 0.28mm to 1.25mm). The heavier the gauge number in reverse, the thinner the wire. Used for false stemming, wiring flowers and foliage for corsages and tributes.' },

  { term: 'Taping', category: 'Technique', def: 'Wrapping a wired stem with florist stem tape (gutta-percha) to seal in moisture and create a neat, professional finish. The tape is stretched slightly as you wrap to activate the adhesive.' },
  { term: 'Texture', category: 'Design', def: 'The visual or tactile surface quality of flowers and foliage — smooth petals, velvety leaves, spiky seed heads. Contrasting textures add interest and prevent a design from looking flat.' },
  { term: 'Topiary', category: 'Design', def: 'A ball, cone, or geometric shaped floral arrangement, typically using a foam ball mounted on a stem in a pot. Popular for events and entryways. Also refers to shaped moss structures.' },
  { term: 'Triadic', category: 'Design', def: 'A colour harmony using three hues equally spaced around the colour wheel — e.g. red, yellow, and blue, or orange, green, and violet. Vibrant and balanced.' },
  { term: 'Tribute', category: 'Design', def: 'A formal funeral flower arrangement, typically foam-based and purpose-made to a specific shape — wreath, cross, heart, or letter. An important income stream for UK florists.' },

  { term: 'Unity', category: 'Design', def: 'The sense of wholeness in a design — the feeling that all elements belong together. Achieved through consistent colour, repeating materials, and considered placement.' },

  { term: 'Vase life', category: 'Care', def: 'The number of days a cut flower will remain fresh in a vase of clean water. Varies widely: carnations 14–21 days, roses 7–14 days, sweet peas 4–7 days. Conditioning and flower food significantly extend vase life.' },
  { term: 'Volume flower', category: 'Design', def: 'A large-headed flower used to rapidly add bulk and fill space in an arrangement. A single hydrangea head can fill the equivalent space of 10 roses. Also called a mass flower.' },

  { term: 'Water tube', category: 'Mechanics', def: 'A small plastic vial with a rubber cap, filled with water. A single stem is inserted through the cap to keep it hydrated — useful for corsages, buttonholes, and wearable floristry.' },
  { term: 'Wholesaler', category: 'Business', def: 'A business that purchases flowers in bulk from growers (directly or via auction) and sells to florists. Major UK flower markets include New Covent Garden (London) and Birmingham Wholesale Market.' },
  { term: 'Wiring', category: 'Technique', def: 'Inserting a stub wire through or alongside a flower head or stem to give support and allow shaping. Essential for corsages, buttonholes, headdresses, and any wearable floristry where natural stems are too heavy or stiff.' },

  { term: 'Xylem', category: 'Flower Anatomy', def: 'The vascular tissue that carries water and dissolved nutrients up from the roots (or stem cut end) to the rest of the plant. An air bubble or bacterial blockage in the xylem stops water uptake and wilts the flower.' },
];

export default GLOSSARY;
