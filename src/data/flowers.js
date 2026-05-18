const FLOWERS = [
  {
    "num": 1,
    "common": "Rose",
    "latin": "Rosa",
    "family": "Rosaceae",
    "desc": "The undisputed queen of floristry, roses are the world's most commercially grown cut flower. With thousands of cultivars ranging from tight hybrid tea blooms to loose garden varieties, they offer unmatched versatility. Essential for weddings, sympathy, and everyday bouquets.",
    "native": "Asia (primarily China & Middle East), Europe, North America",
    "season": [
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Recut stems at 45°, remove guard petals, strip foliage below waterline. Lasts 7–14 days.",
    "roles": [
      "Focal",
      "Secondary"
    ],
    "tags": [
      "spring",
      "summer",
      "autumn"
    ]
  },
  {
    "num": 2,
    "common": "Carnation",
    "latin": "Dianthus caryophyllus",
    "family": "Caryophyllaceae",
    "desc": "One of the longest-lasting cut flowers available, carnations offer fringed, ruffled petals with a spicy clove-like scent. Available in an extraordinary range of colours including bi-colours and spray varieties. Extremely popular for everyday designs and sympathy work.",
    "native": "Mediterranean region — primarily southern Europe and western Asia",
    "season": [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Crush or slit the base of stems. Avoid ethylene exposure. Lasts 14–21 days.",
    "roles": [
      "Focal",
      "Secondary",
      "Filler"
    ],
    "tags": [
      "yearround"
    ]
  },
  {
    "num": 3,
    "common": "Lisianthus",
    "latin": "Eustoma grandiflorum",
    "family": "Gentianaceae",
    "desc": "Often called the \"poor man's peony\", lisianthus produces delicate, papery blooms resembling roses or peonies in purple, white, pink, and cream. Multiple buds per stem open sequentially. Hugely popular in wedding floristry for its romantic, soft texture.",
    "native": "North America — prairie regions from Nebraska to Texas and northern Mexico",
    "season": [
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Recut stems, keep cool. Remove spent blooms to allow buds to open. Lasts 10–14 days.",
    "roles": [
      "Focal",
      "Secondary"
    ],
    "tags": [
      "summer",
      "autumn"
    ]
  },
  {
    "num": 4,
    "common": "Stocks",
    "latin": "Matthiola incana",
    "family": "Brassicaceae",
    "desc": "Supremely fragrant columnar flowers with tightly packed double blooms in shades of pink, purple, white, red, and cream. One of the most powerfully scented flowers in floristry — a single stem can fragrance a whole room.",
    "native": "Southern Europe — particularly the Mediterranean coast and Greece",
    "season": [
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Recut stems. Remove lower leaves. Keep cool for maximum fragrance. Lasts 7–10 days.",
    "roles": [
      "Secondary",
      "Line"
    ],
    "tags": [
      "spring",
      "summer",
      "british"
    ]
  },
  {
    "num": 5,
    "common": "Freesia",
    "latin": "Freesia",
    "family": "Iridaceae",
    "desc": "Intensely fragrant funnel-shaped blooms arranged along arching stems, opening sequentially from base to tip. Available in yellow, white, pink, red, purple, and orange. The scent is among the most beloved in floristry.",
    "native": "South Africa — particularly the Western Cape Province",
    "season": [
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Recut stems. Open buds in warmth. Do not refrigerate yellow varieties. Lasts 7–10 days.",
    "roles": [
      "Secondary",
      "Filler"
    ],
    "tags": [
      "spring",
      "winter"
    ]
  },
  {
    "num": 6,
    "common": "Gypsophila",
    "latin": "Gypsophila paniculata",
    "family": "Caryophyllaceae",
    "desc": "Also called Baby's Breath, gypsophila creates airy cloud-like masses of tiny white or pale pink flowers on fine branching stems. One of the most universally used filler flowers in floristry worldwide.",
    "native": "Central and Eastern Europe, Central Asia",
    "season": [
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Split stems and place in shallow water. Lasts 5–8 days fresh; dries beautifully.",
    "roles": [
      "Filler",
      "Texture"
    ],
    "tags": [
      "spring",
      "summer",
      "autumn"
    ]
  },
  {
    "num": 7,
    "common": "Alstroemeria",
    "latin": "Alstroemeria",
    "family": "Alstroemeriaceae",
    "desc": "Commonly called Peruvian Lily, alstroemeria produces clusters of trumpet-shaped blooms with distinctive streaked inner petals. Extremely long-lasting — one of the best-value cut flowers for UK florists.",
    "native": "South America — Chile, Peru, Brazil, Argentina",
    "season": [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Recut stems, remove lower leaves. Avoid ethylene. Lasts 14–21 days.",
    "roles": [
      "Secondary",
      "Focal"
    ],
    "tags": [
      "yearround"
    ]
  },
  {
    "num": 8,
    "common": "Chrysanthemum",
    "latin": "Chrysanthemum",
    "family": "Asteraceae",
    "desc": "Chrysanthemums (\"chrys\") are one of the most diverse cut flowers — from single daisy types to large-headed mums, spray varieties, and spider forms. A staple of UK floristry, particularly for sympathy and autumnal work.",
    "native": "China and northeastern Europe; cultivated for over 2,500 years in China",
    "season": [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Recut stems. Remove lower foliage. Keep away from fruit. Lasts 14–21 days.",
    "roles": [
      "Focal",
      "Secondary",
      "Filler"
    ],
    "tags": [
      "yearround"
    ]
  },
  {
    "num": 9,
    "common": "Tulip",
    "latin": "Tulipa",
    "family": "Liliaceae",
    "desc": "Iconic spring bulb flowers with smooth, satiny petals in a vast array of colours and forms — single-cupped, parrot, fringed, and double varieties. Unique in that they continue to grow after cutting, creating natural movement.",
    "native": "Central Asia — originally Kazakhstan, Kyrgyzstan; naturalised in Turkey",
    "season": [
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Keep in cool water. Support drooping stems with newspaper. They grow 2–3cm after cutting. Lasts 5–7 days.",
    "roles": [
      "Focal",
      "Secondary"
    ],
    "tags": [
      "spring",
      "winter"
    ],
    "wiki": "Tulip"
  },
  {
    "num": 10,
    "common": "Delphinium",
    "latin": "Delphinium",
    "family": "Ranunculaceae",
    "desc": "Dramatic tall spike flowers with densely packed florets in shades of blue, purple, white, and pink. The blue shades are particularly prized as true blue is rare. Grown extensively in the UK as a cottage garden flower.",
    "native": "Northern hemisphere — Europe, Asia, North America; most cultivated varieties are UK hybrids",
    "season": [
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Fill hollow stems with water and plug with cotton wool. Lasts 7–10 days.",
    "roles": [
      "Line",
      "Focal"
    ],
    "tags": [
      "summer",
      "british"
    ]
  },
  {
    "num": 11,
    "common": "Lily",
    "latin": "Lilium",
    "family": "Liliaceae",
    "desc": "A broad genus encompassing Oriental, Asiatic, LA hybrid, and Longiflorum types. Oriental lilies are the most intensely fragrant. Multiple buds per stem open sequentially over 10–14 days, making them excellent value.",
    "native": "Asia, Europe, and North America depending on species; most commercial varieties are hybrid",
    "season": [
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Remove pollen anthers immediately to prevent staining. Keep cool. Lasts 10–14 days.",
    "roles": [
      "Focal",
      "Secondary"
    ],
    "tags": [
      "summer",
      "autumn"
    ],
    "wiki": "Lilium"
  },
  {
    "num": 12,
    "common": "Sunflower",
    "latin": "Helianthus annuus",
    "family": "Asteraceae",
    "desc": "Bold, joyful summer flowers with large disc centres surrounded by bright yellow ray petals. Available in classic yellow, bi-colour, orange, and dark chocolate-brown varieties. Now grown extensively in the UK.",
    "native": "North America — originally from the central United States and northern Mexico",
    "season": [
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Recut stems. They drink a lot — top up water daily. Lasts 7–12 days.",
    "roles": [
      "Focal"
    ],
    "tags": [
      "summer",
      "autumn",
      "british"
    ]
  },
  {
    "num": 13,
    "common": "Gerbera",
    "latin": "Gerbera jamesonii",
    "family": "Asteraceae",
    "desc": "Cheerful daisy-like blooms with large, perfectly circular heads in an enormous range of vivid colours. One of the top five cut flowers globally by volume. Their simple, graphic form makes them universally recognisable.",
    "native": "South Africa, Swaziland, and tropical Asia",
    "season": [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Keep stems short and upright; prone to drooping. Use shallow water. Lasts 7–10 days.",
    "roles": [
      "Focal"
    ],
    "tags": [
      "yearround"
    ]
  },
  {
    "num": 14,
    "common": "Ranunculus",
    "latin": "Ranunculus asiaticus",
    "family": "Ranunculaceae",
    "desc": "Produces extraordinarily multi-layered blooms of tissue-paper thin petals in shades of white, cream, yellow, orange, red, pink, and purple. Often likened to peonies but available in winter and spring.",
    "native": "Southwest Asia — Turkey, the Levant, and northeast Africa",
    "season": [
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Keep in cold water. Do not condition in warm water. Lasts 7–10 days.",
    "roles": [
      "Focal",
      "Secondary"
    ],
    "tags": [
      "spring",
      "winter"
    ]
  },
  {
    "num": 15,
    "common": "Peony",
    "latin": "Paeonia",
    "family": "Paeoniaceae",
    "desc": "Among the most beloved and luxurious of all cut flowers, with enormous ruffled blooms in shades of white, cream, blush, pink, coral, and deep red. Their short British season (May–June) makes them highly anticipated. The number one wedding flower in the UK market.",
    "native": "China, Europe, and western North America; cultivated in China for over 1,000 years",
    "season": [
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Buy in tight bud. Wrap in newspaper and store in the fridge to slow opening. Lasts 5–7 days when open.",
    "roles": [
      "Focal"
    ],
    "tags": [
      "spring",
      "summer",
      "british"
    ],
    "wiki": "Peony"
  },
  {
    "num": 16,
    "common": "Sweet Pea",
    "latin": "Lathyrus odoratus",
    "family": "Fabaceae",
    "desc": "Delicate ruffled blooms with an intensely sweet fragrance that defines British summer gardens. Produced extensively by UK flower growers and quintessentially British. Tendril-bearing stems add wonderful organic movement.",
    "native": "Sicily, southern Italy, and the Aegean Islands; developed by British breeders since the 1700s",
    "season": [
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Pick regularly to encourage production. Keep in cool water. Short vase life — 3–5 days. Handle gently.",
    "roles": [
      "Secondary",
      "Filler"
    ],
    "tags": [
      "summer",
      "british"
    ]
  },
  {
    "num": 17,
    "common": "Anemone",
    "latin": "Anemone coronaria",
    "family": "Ranunculaceae",
    "desc": "Striking poppy-like flowers with paper-thin petals and a dramatic dark centre. The \"De Caen\" type — vivid red, white, pink, purple, and bicolour blooms with a black boss at the centre — is the most popular cut variety.",
    "native": "Mediterranean region — from Spain and Portugal east to Turkey and the Levant",
    "season": [
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Buy in bud. They open and close with temperature. Keep cool. Lasts 7–10 days.",
    "roles": [
      "Focal",
      "Secondary"
    ],
    "tags": [
      "spring",
      "winter"
    ]
  },
  {
    "num": 18,
    "common": "Statice",
    "latin": "Limonium sinuatum",
    "family": "Plumbaginaceae",
    "desc": "Also called Sea Lavender, statice produces clusters of small papery flowers in purple, white, yellow, pink, and blue. The papery calyces retain their colour when dried, making it one of the most useful everlasting flowers in British floristry.",
    "native": "Mediterranean coast, Canary Islands, and coastal western Europe",
    "season": [
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Lasts extremely well fresh (10–14 days) and dries naturally in the vase. Hang dry for preserved use.",
    "roles": [
      "Filler",
      "Texture"
    ],
    "tags": [
      "summer",
      "autumn"
    ]
  },
  {
    "num": 19,
    "common": "Dahlia",
    "latin": "Dahlia",
    "family": "Asteraceae",
    "desc": "A late-summer and autumn treasure, produced extensively by British flower farmers. Available in an astonishing range of forms — ball, pompom, cactus, waterlily, dinner-plate, and more. The centrepiece of the British flower scene from July to November.",
    "native": "Mexico and Central America; the national flower of Mexico",
    "season": [
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Recut stems. Keep in cool water. Highly sensitive to ethylene. Very thirsty. Lasts 5–8 days.",
    "roles": [
      "Focal"
    ],
    "tags": [
      "summer",
      "autumn",
      "british"
    ],
    "wiki": "Dahlia"
  },
  {
    "num": 20,
    "common": "Iris",
    "latin": "Iris x hollandica",
    "family": "Iridaceae",
    "desc": "Named after the Greek goddess of the rainbow, the Dutch Iris is a UK staple from spring into early summer. Its distinctive fall petals and upright standards give it a sculptural quality beloved by contemporary florists.",
    "native": "Europe, Middle East, and North Africa; Dutch Iris is a hybrid developed in the Netherlands",
    "season": [
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Buy in tight bud. They open quickly. Keep cool to extend life. Lasts 5–7 days when open.",
    "roles": [
      "Focal",
      "Line"
    ],
    "tags": [
      "spring"
    ],
    "wiki": "Iris_(plant)"
  },
  {
    "num": 21,
    "common": "Snapdragon",
    "latin": "Antirrhinum majus",
    "family": "Plantaginaceae",
    "desc": "Tall elegant spikes densely covered in lipped tubular flowers in shades of white, yellow, orange, red, pink, and bicolour. A key line flower for adding height and vertical drama. A classic UK cottage garden and floristry flower.",
    "native": "Mediterranean region — southern Europe and North Africa",
    "season": [
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Recut stems. They are negatively geotropic — keep upright. Lasts 8–12 days.",
    "roles": [
      "Line",
      "Secondary"
    ],
    "tags": [
      "spring",
      "summer",
      "autumn",
      "british"
    ]
  },
  {
    "num": 22,
    "common": "Waxflower",
    "latin": "Chamelaucium uncinatum",
    "family": "Myrtaceae",
    "desc": "A woody Australian shrub producing masses of small star-shaped waxy blooms in pink, white, and purple along fine, aromatic foliage stems. One of the most popular filler flowers in UK floristry with outstanding vase life.",
    "native": "Western Australia — the Geraldton area; commercially grown in Australia, Israel, and Kenya",
    "season": [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Woody stems — cut with secateurs and crush the base. Keep well-watered. Lasts 14–21 days.",
    "roles": [
      "Filler",
      "Texture"
    ],
    "tags": [
      "yearround"
    ]
  },
  {
    "num": 23,
    "common": "Hypericum",
    "latin": "Hypericum",
    "family": "Hypericaceae",
    "desc": "Used primarily for its ornamental berries, Hypericum (St John's Wort) produces clusters of small round berries in red, burgundy, orange, peach, white, and green. An essential autumnal berry in UK floristry for adding texture and structure.",
    "native": "Widespread — Europe, North Africa, western Asia; many species native to the UK",
    "season": [
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0
    ],
    "imp": true,
    "british": true,
    "care": "Woody stems — crush base. Remove leaves that will submerge. Berries last 10–14 days.",
    "roles": [
      "Texture"
    ],
    "tags": [
      "summer",
      "autumn",
      "british"
    ],
    "wiki": "Hypericum"
  },
  {
    "num": 24,
    "common": "Solidago",
    "latin": "Solidago",
    "family": "Asteraceae",
    "desc": "Also called Goldenrod, solidago produces airy plumes of tiny golden-yellow flowers on arching stems. One of the most useful filler flowers in the UK arsenal — inexpensive, long-lasting, adding warmth and texture to summer and autumn arrangements.",
    "native": "North America primarily; some species native to Europe and Asia",
    "season": [
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0
    ],
    "imp": true,
    "british": false,
    "care": "Remove lower foliage. Lasts 10–14 days. Dries well for autumn wreaths.",
    "roles": [
      "Filler",
      "Texture"
    ],
    "tags": [
      "summer",
      "autumn"
    ],
    "wiki": "Solidago"
  },
  {
    "num": 25,
    "common": "Daffodil",
    "latin": "Narcissus",
    "family": "Amaryllidaceae",
    "desc": "The most beloved British spring flower, grown commercially across Cornwall, Lincolnshire, and Wales. Available in hundreds of cultivars from the classic yellow trumpet to white-petalled, pink-cupped, and miniature varieties.",
    "native": "Western Europe — particularly the Iberian Peninsula; the UK has several native species",
    "season": [
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Condition alone for 24 hrs — sap is toxic to roses. Do not mix conditioning water. Lasts 5–7 days.",
    "roles": [
      "Focal",
      "Secondary"
    ],
    "tags": [
      "spring",
      "winter",
      "british"
    ]
  },
  {
    "num": 26,
    "common": "Lavender",
    "latin": "Lavandula angustifolia",
    "family": "Lamiaceae",
    "desc": "One of the most fragrant plants in the world, grown commercially across England — Norfolk and Kent are key regions. Purple-blue flower spikes on grey-green aromatic stems are used fresh in summer and dried year-round.",
    "native": "Mediterranean region; naturalised and commercially grown extensively in England",
    "season": [
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Cut before fully open for drying. Fresh lasts 5–7 days. Dry by hanging upside down in bunches.",
    "roles": [
      "Line",
      "Filler"
    ],
    "tags": [
      "summer",
      "british"
    ]
  },
  {
    "num": 27,
    "common": "Protea",
    "latin": "Protea cynaroides",
    "family": "Proteaceae",
    "desc": "The national flower of South Africa and one of the most dramatic, architectural flowers available. Its large, woody-bracted flower heads resemble artichokes. Increasingly popular for statement centrepieces and contemporary weddings.",
    "native": "South Africa — particularly the Western Cape and fynbos regions",
    "season": [
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Recut woody stems. Very long-lasting — up to 3 weeks. Dries excellently without shrinking much.",
    "roles": [
      "Focal"
    ],
    "tags": [
      "spring",
      "winter"
    ]
  },
  {
    "num": 28,
    "common": "Agapanthus",
    "latin": "Agapanthus africanus",
    "family": "Amaryllidaceae",
    "desc": "The African Lily produces spherical umbels of trumpet-shaped flowers on tall elegant stems in blue, purple, and white. They have a structural, architectural quality that works beautifully in contemporary floristry.",
    "native": "South Africa — Cape region and KwaZulu-Natal",
    "season": [
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Recut stems. Individual flowers drop but buds continue opening. Lasts 7–10 days.",
    "roles": [
      "Focal",
      "Line"
    ],
    "tags": [
      "summer",
      "british"
    ]
  },
  {
    "num": 29,
    "common": "Veronica",
    "latin": "Veronica spicata",
    "family": "Plantaginaceae",
    "desc": "Also known as Speedwell, this elegant slender spike flower produces densely packed tiny florets in blue, purple, pink, and white. A beautiful line flower for adding vertical interest and a naturalistic, meadow feel.",
    "native": "Europe and northern Asia; native to the UK including meadows and dry grasslands",
    "season": [
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      0
    ],
    "imp": false,
    "british": true,
    "care": "Recut stems. Keep in cool, clean water. Lasts 7–10 days.",
    "roles": [
      "Line",
      "Secondary"
    ],
    "tags": [
      "summer",
      "british"
    ]
  },
  {
    "num": 30,
    "common": "Eucalyptus",
    "latin": "Eucalyptus",
    "family": "Myrtaceae",
    "desc": "The most important foliage in UK floristry — an almost universal structural and fragrant green. Baby blue (round-leaved), seeded, and spiral varieties are the most common. Its silver-green colour complements virtually every flower.",
    "native": "Australia (over 700 species); commercially grown globally including Kenya and Portugal",
    "season": [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1
    ],
    "imp": true,
    "british": false,
    "care": "Crush or slit woody stems. Extremely long-lasting — 2–3 weeks. Dries silver-grey in situ.",
    "roles": [
      "Foliage"
    ],
    "tags": [
      "yearround"
    ]
  }
];

export default FLOWERS;
