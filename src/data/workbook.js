export const INTRO = {
  heading: 'My Floristry Learning Workbook',
  subheading: 'A self-guided study companion for UK floristry students',
  body: [
    'This workbook is your personal space to reflect, practise, and track your progress as you work through the materials in UK Floristry Reference. There are no deadlines and no grades — only the flowers, your hands, and the joy of learning.',
    'Work through the weekly study plans in order, or dip into individual topics as they become relevant to you. Complete the practice exercises with real flowers where possible, use the checklists to mark off skills as you build confidence, and return to the reflection prompts after each week — they become a record of your growth.',
  ],
  howToUse: [
    'Print the full workbook once and work through it over six weeks, or print individual sections as you reach them in the app.',
    'Use a pencil so you can revisit exercises and update your answers over time.',
    'Keep your workbook alongside the app — each weekly plan links directly to a module you can study on screen.',
    'There is no right or wrong way to fill this in. It is a thinking tool, not an assessment.',
  ],
};

export const ROADMAP = {
  title: 'Part One — Your Learning Roadmap',
  subtitle: 'Before you begin, take stock of where you are starting from.',
  startingQuestions: [
    'How long have you been interested in floristry?',
    'Do you have any formal training or qualifications?',
    'What do you most want to learn or improve?',
    'Do you have access to fresh flowers regularly?',
    'What is your main goal: hobby, career, or both?',
  ],
  goalPrompt: 'Write one clear goal for completing this workbook:',
  stages: [
    {
      stage: 'Stage 1',
      title: 'Foundation Knowledge',
      weeks: 'Weeks 1–2',
      items: [
        'Learn the 30 core cut flowers and foliage',
        'Understand Latin naming conventions',
        'Know the main UK seasons for cut flowers',
        'Identify focal, filler, and foliage categories',
        'Understand the colour wheel and the five harmony schemes',
        'Apply colour theory to a simple arrangement',
      ],
    },
    {
      stage: 'Stage 2',
      title: 'Practical Skills',
      weeks: 'Weeks 3–4',
      items: [
        'Complete a hand-tied bouquet',
        'Practise stem conditioning technique',
        'Understand basic wiring and taping',
        'Study at least two historical floristry styles',
        'Research the symbolism of ten flowers',
      ],
    },
    {
      stage: 'Stage 3',
      title: 'Applied Design & Context',
      weeks: 'Weeks 5–6',
      items: [
        'Understand the key elements of wedding and event floristry',
        'Write a design brief for a fictional client',
        'Study sustainable sourcing and foam-free alternatives',
        'Identify three tools still missing from your kit',
        'Complete the Knowledge Quiz with a score of 70% or above',
      ],
    },
  ],
};

export const WEEKLY_PLANS = [
  {
    week: 1,
    title: 'The Foundations — Flowers & Foliage',
    focus: 'Building your plant knowledge from the ground up.',
    module: '30 Core Flowers, Bouquet Flowers, Seasonal Calendar',
    days: [
      {
        day: 'Monday',
        topic: '30 Core Flowers',
        instruction: 'Spend 30–45 minutes studying the 30 Core Flowers module. As you read, note five flowers you already know well, five you have never worked with, and the flower you most want to try.',
        prompts: [
          'Five flowers I already know well:',
          'Five flowers I have never worked with:',
          'The flower I most want to try:',
        ],
      },
      {
        day: 'Tuesday',
        topic: 'Latin Names & Plant Families',
        instruction: 'Review the plant families covered in the module. Without looking, write the Latin name for five flowers you studied yesterday.',
        exercise: 'Exercise: Write the Latin name for five flowers from memory — then check.',
      },
      {
        day: 'Wednesday',
        topic: 'Seasonal Availability',
        instruction: 'Open the Seasonal Calendar. Choose the current month and list every flower in season. Consider which of them are UK-grown and which are typically imported.',
        prompts: ['What surprises you about what is and is not available right now?'],
      },
      {
        day: 'Thursday',
        topic: 'Flower Roles in Arrangements',
        instruction: 'Study the Bouquet Flowers guide. Choose five flowers and categorise each as focal, filler, or foliage — and explain why.',
        exercise: 'Exercise: Focal / Filler / Foliage — categorise five flowers and give your reasoning.',
      },
      {
        day: 'Friday',
        topic: 'Week 1 Reflection',
        instruction: '',
        prompts: [
          'What is the most useful thing you learned this week?',
          'What do you want to understand better?',
          'Sketch a simple arrangement using only flowers from this week\'s study.',
        ],
      },
    ],
  },
  {
    week: 2,
    title: 'Colour Theory & Design',
    focus: 'Understanding how colour creates mood, harmony, and impact.',
    module: 'Colour Wheel, Flower Meanings',
    days: [
      {
        day: 'Monday',
        topic: 'The Colour Wheel',
        instruction: 'Spend time with the Interactive Colour Wheel. Experiment with each of the five harmony schemes in turn.',
        prompts: [
          'Which scheme do you find most visually pleasing, and why?',
          'Which scheme feels most challenging to work with?',
        ],
      },
      {
        day: 'Tuesday',
        topic: 'Colour in Practice',
        instruction: 'Choose three harmony schemes. For each, name three real flowers that could work together within that palette.',
        exercise: 'Exercise: Three harmony schemes × three flower combinations each.',
      },
      {
        day: 'Wednesday',
        topic: 'Flower Meanings & Colour Symbolism',
        instruction: 'Read the Flower Meanings module with colour symbolism in mind. Consider how the meaning of a flower changes depending on its colour.',
        prompts: [
          'If you were designing an arrangement for a celebration, which five flowers would you choose and why?',
          'Which colour pairing surprised you most?',
        ],
      },
      {
        day: 'Thursday',
        topic: 'Mood Board Day',
        instruction: 'Create a simple paper mood board using magazine cuttings, colour swatches, fabric scraps, or your own sketches. Choose a theme — wedding, sympathy, birthday, or a favourite season — and develop a colour story for it.',
        exercise: 'Exercise: One mood board, one theme, one paragraph describing your colour choices.',
      },
      {
        day: 'Friday',
        topic: 'Week 2 Reflection',
        instruction: '',
        prompts: [
          'What colour combination surprised you most this week?',
          'Did your personal colour preferences shift after studying colour theory?',
          'Is there a harmony scheme you would like to explore further?',
        ],
      },
    ],
  },
  {
    week: 3,
    title: 'Practical Skills — The Hand-Tied Bouquet',
    focus: 'Developing foundational practical technique with real flowers.',
    module: 'Techniques & Skills, Conditioning & Care',
    preparationNote: 'Before you begin, gather garden flowers, foliage, scissors, and twine. Even informal garden cuttings are excellent for practice — this is not about expensive stems.',
    days: [
      {
        day: 'Monday',
        topic: 'Study: Techniques & Skills',
        instruction: 'Read the Techniques module, focusing on the hand-tied bouquet guide. Read slowly and visualise each step before you attempt it in practice.',
        prompts: ['Note the key technique used in spiral stem construction:'],
      },
      {
        day: 'Tuesday',
        topic: 'First Attempt',
        instruction: 'Attempt a hand-tied bouquet using whatever flowers you have access to. The goal is not perfection — it is to experience the physical challenge of the technique.',
        prompts: [
          'What did not work as expected?',
          'What worked better than anticipated?',
        ],
      },
      {
        day: 'Wednesday',
        topic: 'Conditioning & Care',
        instruction: 'Study the Conditioning & Care module in full. Before your next practice session, properly condition your stems: recut at a 45° angle, strip lower leaves, and leave in fresh water for a minimum of four hours.',
        prompts: ['What difference does conditioning make to how stems handle?'],
      },
      {
        day: 'Thursday',
        topic: 'Second Attempt',
        instruction: 'Repeat the hand-tied bouquet, this time with properly conditioned stems. Compare the process and result to Tuesday\'s attempt.',
        prompts: [
          'What improved with conditioned stems?',
          'What do you want to refine in your next practice session?',
        ],
      },
      {
        day: 'Friday',
        topic: 'Week 3 Reflection',
        instruction: '',
        prompts: [
          'What is the hardest physical skill you encountered this week?',
          'Sketch the top view of your best bouquet from this week.',
          'What would you do differently with more practice?',
        ],
      },
    ],
  },
  {
    week: 4,
    title: 'Floristry Styles & Historical Context',
    focus: 'Understanding where floristry comes from — and where it is going.',
    module: 'Style Guide, Flower Meanings',
    days: [
      {
        day: 'Monday',
        topic: 'The Style Guide',
        instruction: 'Read through the Style Guide module. Note the name and key visual characteristics of three styles that interest or intrigue you most.',
        exercise: 'Exercise: Three styles, their defining characteristics, and one word that captures each one\'s mood.',
      },
      {
        day: 'Tuesday',
        topic: 'Research & Inspiration',
        instruction: 'Search for real examples of your three chosen styles — look at the work of florists who specialise in each. For one image per style, describe what you notice about structure, colour, texture, and proportion.',
        prompts: [
          'Style 1 — what do you observe?',
          'Style 2 — what do you observe?',
          'Style 3 — what do you observe?',
        ],
      },
      {
        day: 'Wednesday',
        topic: 'Floriography in Practice',
        instruction: 'Study the Flower Meanings module from beginning to end, paying attention to the historical notes. Design an arrangement that communicates a specific message using the language of flowers.',
        prompts: [
          'The message you want to convey:',
          'The flowers you would use and why:',
        ],
      },
      {
        day: 'Thursday',
        topic: 'The Victorian Nosegay Exercise',
        instruction: 'Design a small posy using only flowers with meaningful symbolism. Choose five flowers, identify their traditional meanings, and write the collective message your posy conveys.',
        exercise: 'Exercise: Five flowers, five meanings, one coherent message.',
      },
      {
        day: 'Friday',
        topic: 'Week 4 Reflection',
        instruction: '',
        prompts: [
          'Has learning about floristry history changed how you think about arranging flowers?',
          'Is there a style you would like to specialise in?',
          'Which historical period of floristry do you find most interesting?',
        ],
      },
    ],
  },
  {
    week: 5,
    title: 'Event & Wedding Floristry',
    focus: 'Understanding floristry in a professional and client-facing context.',
    module: 'Wedding Floristry, Troubleshooting',
    days: [
      {
        day: 'Monday',
        topic: 'Wedding Floristry',
        instruction: 'Study the Wedding Floristry module. List the key floristry elements typically required across a full wedding brief — from ceremony to reception.',
        exercise: 'Exercise: List at least six distinct floral elements a florist might be asked to provide for a wedding.',
      },
      {
        day: 'Tuesday',
        topic: 'Client Brief Practice',
        instruction: 'Write a full brief for a fictional client. Include: colour palette, style direction, key pieces required, seasonal considerations, and a rough budget range.',
        prompts: [
          'Client name (fictional):',
          'Occasion and date:',
          'Colour palette and style:',
          'Key floristry pieces required:',
          'Budget range:',
          'Seasonal notes:',
        ],
      },
      {
        day: 'Wednesday',
        topic: 'Bridal Bouquet Styles',
        instruction: 'Review the four main bridal bouquet shapes. Sketch or describe each one, noting which styles would suit which dress silhouettes or themes.',
        exercise: 'Exercise: Four bouquet shapes — a brief description and best-suited occasion for each.',
      },
      {
        day: 'Thursday',
        topic: 'Troubleshooting Common Problems',
        instruction: 'Read the Troubleshooting Guide. Identify three problems you have already encountered — or are most likely to face — and write the correct diagnosis and solution.',
        exercise: 'Exercise: Three problems, three solutions.',
      },
      {
        day: 'Friday',
        topic: 'Week 5 Reflection',
        instruction: '',
        prompts: [
          'Does event floristry appeal to you as a career direction?',
          'What would you need to learn or practise before taking on a paid wedding brief?',
          'What was the most professionally useful thing you learned this week?',
        ],
      },
    ],
  },
  {
    week: 6,
    title: 'Sustainable Practice & Consolidation',
    focus: 'Working responsibly and bringing together everything you have learned.',
    module: 'Sustainability Guide, Tools & Equipment, Knowledge Quiz',
    days: [
      {
        day: 'Monday',
        topic: 'Sustainability Guide',
        instruction: 'Read the Sustainability Guide in full. Identify three changes you could make immediately to your current practice, and three longer-term goals.',
        prompts: [
          'Three immediate changes:',
          'Three longer-term sustainability goals:',
        ],
      },
      {
        day: 'Tuesday',
        topic: 'Local & Seasonal Sourcing',
        instruction: 'Research one UK flower grower or local supplier near you. Note what they grow, when they grow it, and how to buy from them.',
        prompts: ['Grower name, location, and what they grow:'],
      },
      {
        day: 'Wednesday',
        topic: 'Tools & Equipment Audit',
        instruction: 'Study the Tools & Equipment Guide. Compare your current kit against the essential items listed. Prioritise any gaps.',
        prompts: [
          'Tools I already own:',
          'Tools I need to buy (in priority order):',
        ],
      },
      {
        day: 'Thursday',
        topic: 'Knowledge Quiz',
        instruction: 'Complete the Knowledge Quiz in the app. Note your score and identify which topics or modules you should revisit before considering this workbook complete.',
        prompts: [
          'My score:',
          'Topics to review:',
        ],
      },
      {
        day: 'Friday',
        topic: 'Final Reflection',
        instruction: '',
        prompts: [
          'How has your understanding of floristry changed over six weeks of study?',
          'What is the one skill or piece of knowledge you are most proud of developing?',
          'What do you want to work on next?',
          'Write yourself a note about what floristry means to you now, compared to when you started.',
        ],
      },
    ],
  },
];

export const CHECKLISTS = [
  {
    title: 'Reference Knowledge',
    colour: '#3D5C3A',
    items: [
      'I can name 20 or more core cut flowers from memory',
      'I can identify focal, filler, and foliage flowers',
      'I know the Latin name for at least 10 flowers',
      'I can name three flowers in season for each month of the year',
      'I understand how imports affect UK availability and why British-grown matters',
      'I know the traditional meaning of at least 10 common flowers',
      'I can describe the colour wheel and all five harmony schemes',
      'I understand how colour symbolism varies across cultures',
    ],
  },
  {
    title: 'Practical Skills',
    colour: '#6B8A66',
    items: [
      'I have completed a hand-tied bouquet',
      'I can spiral stems correctly and tie off securely',
      'I know how to condition stems before arranging',
      'I have attempted at least one foam-free arrangement',
      'I understand basic wiring and taping techniques',
      'I have worked with at least three different foliage types',
      'I have cleaned and maintained my cutting tools properly',
      'I understand how to manage ethylene exposure to extend vase life',
    ],
  },
  {
    title: 'Design Knowledge',
    colour: '#8B7355',
    items: [
      'I can describe at least five distinct floristry styles with examples',
      'I understand how texture and form complement colour in an arrangement',
      'I can design an arrangement for a specific occasion or client brief',
      'I have created at least one mood board for a design project',
      'I understand the difference between garden, structured, and Ikebana styles',
      'I can identify a Dutch Masters floral painting and describe its characteristics',
    ],
  },
  {
    title: 'Professional Awareness',
    colour: '#5B7BA8',
    items: [
      'I know the key elements of a wedding floristry quote or brief',
      'I understand foam-free mechanics and why they are increasingly important',
      'I can source seasonal, UK-grown flowers where possible',
      'I know the common causes of premature wilting and how to prevent them',
      'I understand why conditioning is a professional standard, not an optional step',
      'I have read the Troubleshooting Guide and can apply it to common problems',
      'I am aware of the RHS and the plant knowledge resources it offers',
    ],
  },
];

export const RHS = {
  intro: 'The Royal Horticultural Society (RHS) is the UK\'s leading horticultural charity, founded in 1804. While primarily focused on gardening and plant science, its resources are exceptionally valuable for floristry students who want to develop a deeper understanding of plants beyond the cut-flower context.',
  sections: [
    {
      title: 'Why the RHS Matters for Floristry Students',
      content: 'Most floristry training focuses on flowers as a finished product — already cut, already conditioned, ready to arrange. The RHS helps you understand where those flowers come from: the conditions in which they grew, the science behind their structure, and the reasons certain varieties perform better as cut stems than others. This knowledge makes you a better florist.',
      points: [
        {
          heading: 'Plant identification',
          text: 'The RHS Plant Finder and online encyclopaedia cover tens of thousands of species, including the Latin names used across the floristry trade. Understanding nomenclature in its horticultural context makes it easier to communicate with growers, identify suitable substitutes, and recognise plant families.',
        },
        {
          heading: 'Seasonal knowledge',
          text: 'The RHS publishes detailed guidance on UK growing seasons. This directly supports the Seasonal Calendar module, and is especially useful if you want to grow any of your own material or build relationships with local growers.',
        },
        {
          heading: 'Growing conditions',
          text: 'Understanding a flower\'s preferred climate, soil type, and growth habit helps explain why some stems are fragile, why certain varieties have shorter vase lives, and why availability shifts so dramatically with the seasons.',
        },
        {
          heading: 'Show floristry',
          text: 'RHS Chelsea Flower Show, Hampton Court, and Tatton Park are a major part of the UK floristry and horticulture calendar. They showcase cutting-edge design, rare plant material, and the work of leading contemporary florists. Attending or following the shows closely is one of the best ways to stay current and inspired.',
        },
      ],
    },
    {
      title: 'RHS Qualifications',
      content: 'For floristry students who want to formalise their plant knowledge, the RHS offers a progressive pathway of qualifications that complement — rather than duplicate — floristry training.',
      qualifications: [
        {
          name: 'RHS Level 2 Award in Horticulture',
          desc: 'An accessible entry-level qualification covering plant science, soil, and seasonal growing. Ideal for floristry students who want a stronger foundation in how plants actually grow.',
        },
        {
          name: 'RHS Level 2 Certificate in the Principles of Plant Growth',
          desc: 'A more in-depth study of plant biology. Valuable if you want to understand why flowers behave the way they do — why petals open, why stems wilt, and how plants respond to their environment.',
        },
        {
          name: 'RHS Level 3 Diploma in Horticulture',
          desc: 'A professional-level qualification for those who want to combine growing and designing, or who plan to work in horticultural settings alongside floristry.',
        },
      ],
      note: 'These qualifications are available through accredited colleges across the UK and are increasingly offered as distance-learning programmes. Visit rhs.org.uk/education-learning for a full list of approved centres.',
    },
    {
      title: 'Using the RHS as a Daily Reference',
      content: 'When you encounter a flower in the 30 Core Flowers module or the Seasonal Calendar, look it up on the RHS plant database as a supplementary reference. Compare the horticultural description with what you know about the flower as a cut stem — the differences are often illuminating.',
      resources: [
        'A searchable plant encyclopaedia with photographs, cultivation notes, and pest and disease information',
        'Advice on which flowers attract pollinators — useful when advising clients on sustainable or wildlife-friendly plantings',
        'A monthly "what to do in the garden" guide that tracks the UK growing season in real time',
        'Show and event listings, including ticket information and exhibitor details for all RHS shows',
        'The RHS Community — an active forum where growers, gardeners, and plant enthusiasts share knowledge',
      ],
    },
  ],
  exercise: {
    title: 'RHS Exercise — Going Deeper',
    steps: [
      'Choose any five flowers from the 30 Core Flowers module.',
      'Look each one up on the RHS plant database (rhs.org.uk/plants).',
      'For each, note its country of origin, preferred growing conditions, and typical UK season.',
      'Consider how this information changes the way you think about conditioning, sourcing, or substituting that flower.',
      'Write a short paragraph connecting what you learned about one flower to how you would treat it as a cut stem.',
    ],
  },
};

export const FURTHER_RESOURCES = {
  books: [
    { title: 'The Flower Recipe Book', author: 'Alethea Harampolis & Jill Rizzo', note: 'Step-by-step arrangements with clear photography — excellent for self-taught students.', url: 'https://www.waterstones.com/books/search/term/the+flower+recipe+book' },
    { title: 'Floret Farm\'s A Year in Flowers', author: 'Erin Benzakein', note: 'Seasonal growing and arranging from a leading cut-flower farm. Particularly useful alongside the Seasonal Calendar.', url: 'https://www.waterstones.com/books/search/term/floret+farm+a+year+in+flowers' },
    { title: 'The Seasonal Flower Bible', author: 'Judith Blacklock', note: 'A comprehensive reference covering hundreds of flowers with conditioning and design guidance.', url: 'https://www.waterstones.com/books/search/term/the+seasonal+flower+bible' },
    { title: 'RHS Botany for Gardeners', author: 'Brian Capon', note: 'A rigorous introduction to plant science for those who want to understand flowers at a biological level.', url: 'https://www.waterstones.com/books/search/term/rhs+botany+for+gardeners' },
    { title: 'Flowers: The Complete Book of Floral Design', author: 'Paula Pryke', note: 'A professional-level reference from one of the UK\'s most respected florists.', url: 'https://www.waterstones.com/books/search/term/flowers+complete+book+floral+design+paula+pryke' },
  ],
  qualifications: [
    { name: 'City & Guilds Level 2 Certificate in Floristry', desc: 'The most widely taken floristry qualification in the UK, available through further education colleges.', url: 'https://www.cityandguilds.com' },
    { name: 'City & Guilds Level 3 Diploma in Floristry', desc: 'The professional-level qualification for those pursuing floristry as a career.', url: 'https://www.cityandguilds.com' },
    { name: 'British Florist Association (BFA) Courses', desc: 'Short courses, masterclasses, and accredited training from the UK\'s professional body for florists.', url: 'https://www.britishfloristassociation.org' },
  ],
  industry: [
    { name: 'British Florist Association', note: 'The UK\'s professional body — resources, events, and a directory of accredited providers.', url: 'https://www.britishfloristassociation.org' },
    { name: 'New Covent Garden Flower Market', note: 'The UK\'s largest wholesale flower market. Open to the public on selected dates.', url: 'https://www.newcoventgardenmarket.com' },
    { name: 'RHS Flower Shows', note: 'Chelsea, Hampton Court, and Tatton Park — the calendar highlights of the UK floristry and horticulture year.', url: 'https://www.rhs.org.uk/shows-events' },
    { name: '#ukfloristry on Instagram', note: 'A genuine community of working UK florists sharing daily work, technique, and seasonal inspiration.', url: 'https://www.instagram.com/explore/tags/ukfloristry/' },
  ],
};

export const NOTES_PAGES = [
  'My Floristry Glossary — build your own A–Z of terms as you encounter them.',
  'Sketching Pages — rough arrangement plans, mood board ideas, or flower studies.',
  'Supplier Notes — growers, markets, and stockists you want to remember.',
  'Questions for Further Research — things you want to understand better.',
];
