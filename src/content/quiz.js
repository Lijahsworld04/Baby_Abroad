// Baby Abroad relocation match quiz: questions, starter country profiles, and the free-teaser scoring.
//
// IMPORTANT: the country ratings below are STARTER numbers based on general knowledge. They only power the
// free "top match" teaser on the website. Review them before launch. The paid reports must use a separate,
// verified table of visa rules with a "last verified" date for every country.

/**
 * @typedef {{ v: string, label: string, exclusive?: boolean }} Option
 * @typedef {{ key: string, label?: string, type: "single"|"multi"|"select"|"text"|"longtext", options?: Option[], max?: number, optional?: boolean, placeholder?: string, showIf?: { key: string, includes: string } }} Part
 * @typedef {{ id: string, section: string, title: string, help?: string, parts: Part[] }} Screen
 */

const BANDS = [
  { v: "b1", label: "Under $1,500" },
  { v: "b2", label: "$1,500 to $2,500" },
  { v: "b3", label: "$2,500 to $4,000" },
  { v: "b4", label: "$4,000 or more" },
];

/** @type {Screen[]} */
export const SCREENS = [
  {
    id: "persona", section: "About your move", title: "Which describes you best?",
    parts: [{ key: "persona", type: "single", options: [
      { v: "retired", label: "Retired" },
      { v: "remote", label: "Remote or online worker" },
      { v: "jobseeker", label: "Looking for work abroad" },
      { v: "student", label: "Student" },
      { v: "family", label: "Moving as a family" },
    ] }],
  },
  {
    id: "passport", section: "About your move", title: "What passport do you hold?",
    help: "Visa rules depend on your passport.",
    parts: [
      { key: "passport", type: "select", options: [
        { v: "US", label: "United States" }, { v: "CA", label: "Canada" }, { v: "GB", label: "United Kingdom" },
        { v: "IE", label: "Ireland" }, { v: "AU", label: "Australia" }, { v: "NZ", label: "New Zealand" },
        { v: "JM", label: "Jamaica" }, { v: "NG", label: "Nigeria" }, { v: "GH", label: "Ghana" },
        { v: "EU", label: "A European Union country" }, { v: "OTHER", label: "Other" },
      ] },
      { key: "passportOther", label: "Which country?", type: "text", optional: true, placeholder: "Your passport country", showIf: { key: "passport", includes: "OTHER" } },
    ],
  },
  { id: "budget", section: "Money", title: "What monthly budget do you want to live on?", help: "Your total monthly spending abroad, rent included.", parts: [{ key: "budget", type: "single", options: BANDS }] },
  {
    id: "income", section: "Money", title: "What monthly income can you document?", help: "Many visas ask for proof of income.",
    parts: [{ key: "income", type: "single", options: [{ v: "none", label: "No steady income yet" }, ...BANDS] }],
  },
  {
    id: "savings", section: "Money", title: "What savings could you show for a visa?",
    parts: [{ key: "savings", type: "single", options: [
      { v: "s1", label: "Under $5,000" }, { v: "s2", label: "$5,000 to $15,000" }, { v: "s3", label: "$15,000 to $30,000" }, { v: "s4", label: "$30,000 or more" },
    ] }],
  },
  {
    id: "timeline", section: "About your move", title: "When do you want to move?",
    parts: [{ key: "timeline", type: "single", options: [
      { v: "t1", label: "Within 3 months" }, { v: "t2", label: "3 to 6 months" }, { v: "t3", label: "6 to 12 months" }, { v: "t4", label: "More than a year" },
    ] }],
  },
  {
    id: "party", section: "About your move", title: "Who's coming with you?", help: "Pick everything that applies.",
    parts: [
      { key: "party", type: "multi", options: [
        { v: "solo", label: "Just me", exclusive: true }, { v: "partner", label: "My partner" }, { v: "kids", label: "My kids" }, { v: "pets", label: "My pets" },
      ] },
      { key: "schooling", label: "What schooling do you want for your kids?", type: "single", showIf: { key: "party", includes: "kids" }, options: [
        { v: "intl", label: "International school" }, { v: "local", label: "Local school" }, { v: "home", label: "Homeschool" }, { v: "unsure", label: "Not sure yet" },
      ] },
      { key: "pets", label: "What kind of pet, and what size?", type: "text", optional: true, placeholder: "Example: one small dog, 15 lbs", showIf: { key: "party", includes: "pets" } },
    ],
  },
  {
    id: "climate", section: "Your lifestyle", title: "What climate and setting do you want?",
    parts: [
      { key: "climate", label: "Climate", type: "single", options: [
        { v: "warm", label: "Warm all year" }, { v: "mild", label: "Mild seasons" }, { v: "cool", label: "Cooler" }, { v: "any", label: "No preference" },
      ] },
      { key: "setting", label: "Setting", type: "single", options: [
        { v: "city", label: "Big city" }, { v: "beach", label: "Beach or small town" }, { v: "countryside", label: "Quiet countryside" },
      ] },
    ],
  },
  {
    id: "languages", section: "Your lifestyle", title: "What languages are you comfortable with?",
    parts: [
      { key: "languages", label: "Pick all that apply", type: "multi", options: [
        { v: "en", label: "English" }, { v: "es", label: "Spanish" }, { v: "pt", label: "Portuguese" }, { v: "it", label: "Italian" }, { v: "fr", label: "French" }, { v: "other", label: "Another language" },
      ] },
      { key: "learn", label: "Would you learn a new language?", type: "single", options: [
        { v: "yes", label: "Happy to learn" }, { v: "little", label: "A little" }, { v: "no", label: "I'd prefer English-friendly places" },
      ] },
    ],
  },
  {
    id: "priorities", section: "Your lifestyle", title: "What are your top 3 priorities?", help: "Pick up to 3.",
    parts: [{ key: "priorities", type: "multi", max: 3, options: [
      { v: "healthcare", label: "Healthcare" }, { v: "lowcost", label: "Low cost of living" }, { v: "safety", label: "Safety" },
      { v: "community", label: "Community of people like me" }, { v: "easyvisa", label: "Easy visa" }, { v: "travel", label: "Travel access" }, { v: "culture", label: "Culture and food" },
    ] }],
  },
  {
    id: "work", section: "Work and money", title: "How do you earn your money?",
    parts: [{ key: "work", type: "single", options: [
      { v: "employer", label: "I work for an employer abroad" }, { v: "freelance", label: "I freelance" }, { v: "business", label: "I run a business" }, { v: "none", label: "No work income" },
    ] }],
  },
  {
    id: "obligations", section: "Work and money", title: "What bills will you still pay back home?", help: "Loans, storage, family support, and so on, per month.",
    parts: [{ key: "obligations", type: "single", options: [
      { v: "o0", label: "Nothing" }, { v: "o1", label: "Under $300" }, { v: "o2", label: "$300 to $800" }, { v: "o3", label: "More than $800" },
    ] }],
  },
  {
    id: "localwork", section: "Work and money", title: "Do you plan to work locally?",
    parts: [{ key: "localwork", type: "single", options: [
      { v: "outside", label: "No, I'll keep my income from outside the country" }, { v: "maybe", label: "Maybe, down the road" }, { v: "yes", label: "Yes, I want a local job or business" },
    ] }],
  },
  {
    id: "pace", section: "Daily life", title: "What pace of life do you want?",
    parts: [{ key: "pace", type: "single", options: [
      { v: "calm", label: "Slow and calm" }, { v: "balanced", label: "Balanced" }, { v: "energetic", label: "Energetic" },
    ] }],
  },
  {
    id: "transport", section: "Daily life", title: "How do you want to get around?",
    parts: [{ key: "transport", type: "single", options: [
      { v: "walk", label: "Walking" }, { v: "transit", label: "Public transit" }, { v: "ride", label: "Taxis and rideshare" }, { v: "car", label: "My own car" },
    ] }],
  },
  {
    id: "housing", section: "Daily life", title: "What's your housing plan?",
    parts: [{ key: "housing", type: "single", options: [
      { v: "short", label: "Short-term rental first" }, { v: "lease", label: "A long lease" }, { v: "buy", label: "Buy eventually" },
    ] }],
  },
  {
    id: "community", section: "Daily life", title: "What community do you want around you?",
    parts: [
      { key: "community", type: "single", options: [
        { v: "expat", label: "A big expat circle" }, { v: "mix", label: "A mix of both" }, { v: "local", label: "Mostly local life" },
      ] },
      { key: "diet", label: "Any food preferences? (optional)", type: "multi", optional: true, options: [
        { v: "veg", label: "Vegetarian or vegan" }, { v: "halal", label: "Halal or kosher" }, { v: "glutenfree", label: "Gluten-free" }, { v: "none", label: "No preferences" },
      ] },
    ],
  },
  {
    id: "health", section: "Health and safety", title: "How do you want to handle healthcare?",
    parts: [
      { key: "health", type: "single", options: [
        { v: "intl", label: "Buy international insurance" }, { v: "local", label: "Use the local system" }, { v: "unsure", label: "I'm not sure yet" },
      ] },
      { key: "care", label: "Do you have ongoing care needs? (optional, and kept private)", type: "single", optional: true, options: [
        { v: "none", label: "None" }, { v: "regular", label: "Regular care" }, { v: "specialist", label: "Specialist care" }, { v: "skip", label: "Prefer not to say" },
      ] },
    ],
  },
  {
    id: "safety", section: "Health and safety", title: "What matters most for feeling safe?", help: "Pick up to 2.",
    parts: [{ key: "safety", type: "multi", max: 2, options: [
      { v: "lowcrime", label: "Low crime" }, { v: "solo", label: "Solo-woman friendly" }, { v: "welcome", label: "Welcoming to people like me" }, { v: "stable", label: "Stable government" }, { v: "emergency", label: "Good emergency services" },
    ] }],
  },
  {
    id: "abroad", section: "Health and safety", title: "Have you lived abroad before?",
    parts: [{ key: "abroad", type: "single", options: [
      { v: "yes", label: "Yes, I have" }, { v: "visited", label: "I've traveled but not lived abroad" }, { v: "first", label: "This would be my first time abroad" }, { v: "scout", label: "I'd like to visit before I commit" },
    ] }],
  },
  {
    id: "flights", section: "Practical needs", title: "How often will you fly home?", help: "This helps us weigh flight time and cost.",
    parts: [{ key: "flights", type: "single", options: [
      { v: "often", label: "A few times a year" }, { v: "yearly", label: "About once a year" }, { v: "rare", label: "Rarely" },
    ] }],
  },
  {
    id: "internet", section: "Practical needs", title: "How important is fast, reliable internet?",
    parts: [{ key: "internet", type: "single", options: [
      { v: "essential", label: "Essential" }, { v: "nice", label: "Nice to have" }, { v: "no", label: "Not important" },
    ] }],
  },
  {
    id: "dealbreakers", section: "What makes it work", title: "What are your deal-breakers?", help: "Pick up to 2.",
    parts: [{ key: "dealbreakers", type: "multi", max: 2, options: [
      { v: "heat", label: "Heat" }, { v: "humidity", label: "Humidity" }, { v: "language", label: "A big language barrier" }, { v: "longflight", label: "Long flights home" }, { v: "strictvisa", label: "Strict visa rules" },
    ] }],
  },
  {
    id: "worry", section: "What makes it work", title: "What's your biggest worry about moving?",
    parts: [{ key: "worry", type: "single", options: [
      { v: "money", label: "Money" }, { v: "lonely", label: "Loneliness" }, { v: "safety", label: "Safety" }, { v: "visa", label: "Getting a visa" }, { v: "health", label: "Healthcare" }, { v: "language", label: "Language" },
    ] }],
  },
  {
    id: "success", section: "What makes it work", title: "What would make this move a success one year from now?",
    help: "Optional, but it helps us make your report feel like it's about you.",
    parts: [{ key: "success", type: "longtext", optional: true, placeholder: "In my own words..." }],
  },
];

/** Starter profiles for the free teaser. Review before launch. cost = comfortable monthly USD for one person. */
// Flip to true only when the n8n report workflow is live, so nobody pays for a report we can't deliver yet.
export const PAID_REPORTS_OPEN = false;

export const COUNTRIES = [
  { slug: "portugal", name: "Portugal", cost: 2200, climate: ["mild", "warm"], setting: ["city", "beach", "countryside"], pace: ["calm", "balanced"], lang: "pt", english: 4, healthcare: 4, safety: 5, expat: 5, visa: 3, travel: 4, walk: 4, internet: 4, culture: 5, hot: false, humid: false, longFlight: false },
  { slug: "spain", name: "Spain", cost: 2000, climate: ["mild", "warm"], setting: ["city", "beach", "countryside"], pace: ["balanced", "energetic"], lang: "es", english: 3, healthcare: 5, safety: 4, expat: 4, visa: 2, travel: 4, walk: 5, internet: 4, culture: 5, hot: false, humid: false, longFlight: false },
  { slug: "mexico", name: "Mexico", cost: 1700, climate: ["warm", "mild"], setting: ["city", "beach", "countryside"], pace: ["balanced", "energetic"], lang: "es", english: 3, healthcare: 3, safety: 3, expat: 5, visa: 4, travel: 5, walk: 3, internet: 3, culture: 5, hot: false, humid: false, longFlight: false },
  { slug: "costa-rica", name: "Costa Rica", cost: 2200, climate: ["warm"], setting: ["beach", "countryside"], pace: ["calm"], lang: "es", english: 3, healthcare: 4, safety: 3, expat: 4, visa: 3, travel: 4, walk: 2, internet: 3, culture: 3, hot: false, humid: true, longFlight: false },
  { slug: "panama", name: "Panama", cost: 2000, climate: ["warm"], setting: ["city", "beach"], pace: ["balanced"], lang: "es", english: 3, healthcare: 4, safety: 3, expat: 4, visa: 4, travel: 4, walk: 3, internet: 4, culture: 3, hot: true, humid: true, longFlight: false },
  { slug: "thailand", name: "Thailand", cost: 1500, climate: ["warm"], setting: ["city", "beach"], pace: ["balanced", "energetic"], lang: "th", english: 3, healthcare: 5, safety: 4, expat: 5, visa: 3, travel: 3, walk: 3, internet: 4, culture: 5, hot: true, humid: true, longFlight: true },
  { slug: "italy", name: "Italy", cost: 2300, climate: ["mild", "warm"], setting: ["city", "countryside", "beach"], pace: ["balanced"], lang: "it", english: 2, healthcare: 4, safety: 4, expat: 3, visa: 2, travel: 4, walk: 5, internet: 3, culture: 5, hot: false, humid: false, longFlight: false },
  { slug: "colombia", name: "Colombia", cost: 1400, climate: ["mild", "warm"], setting: ["city", "countryside", "beach"], pace: ["energetic", "balanced"], lang: "es", english: 2, healthcare: 4, safety: 3, expat: 4, visa: 4, travel: 4, walk: 3, internet: 3, culture: 4, hot: false, humid: false, longFlight: false },
  { slug: "honduras", name: "Honduras", cost: 1300, climate: ["warm"], setting: ["beach", "countryside"], pace: ["calm"], lang: "es", english: 2, healthcare: 2, safety: 1, expat: 2, visa: 3, travel: 3, walk: 2, internet: 2, culture: 2, hot: true, humid: true, longFlight: false },
  { slug: "vietnam", name: "Vietnam", cost: 1200, climate: ["warm"], setting: ["city", "beach"], pace: ["energetic"], lang: "vi", english: 2, healthcare: 3, safety: 4, expat: 3, visa: 2, travel: 2, walk: 3, internet: 4, culture: 5, hot: true, humid: true, longFlight: true },
  { slug: "nigeria", name: "Nigeria", cost: 1400, climate: ["warm"], setting: ["city", "beach"], pace: ["energetic"], lang: "en", english: 5, healthcare: 2, safety: 1, expat: 2, visa: 2, travel: 3, walk: 1, internet: 2, culture: 5, hot: true, humid: true, longFlight: false },
  { slug: "ghana", name: "Ghana", cost: 1500, climate: ["warm"], setting: ["city", "beach"], pace: ["balanced", "calm"], lang: "en", english: 5, healthcare: 3, safety: 3, expat: 4, visa: 4, travel: 3, walk: 2, internet: 3, culture: 5, hot: true, humid: true, longFlight: false },
  { slug: "south-africa", name: "South Africa", cost: 1800, climate: ["mild", "warm"], setting: ["city", "beach", "countryside"], pace: ["balanced", "energetic"], lang: "en", english: 5, healthcare: 4, safety: 2, expat: 3, visa: 2, travel: 2, walk: 2, internet: 3, culture: 4, hot: false, humid: false, longFlight: true },
  { slug: "brazil", name: "Brazil", cost: 1600, climate: ["warm"], setting: ["city", "beach"], pace: ["energetic", "balanced"], lang: "pt", english: 2, healthcare: 3, safety: 2, expat: 3, visa: 3, travel: 4, walk: 3, internet: 3, culture: 5, hot: true, humid: true, longFlight: false },
  { slug: "uruguay", name: "Uruguay", cost: 2300, climate: ["mild"], setting: ["city", "beach", "countryside"], pace: ["calm", "balanced"], lang: "es", english: 2, healthcare: 4, safety: 4, expat: 3, visa: 4, travel: 3, walk: 4, internet: 4, culture: 4, hot: false, humid: false, longFlight: true },
  { slug: "canada", name: "Canada", cost: 3200, climate: ["cool", "mild"], setting: ["city", "countryside"], pace: ["calm", "balanced"], lang: "en", english: 5, healthcare: 4, safety: 4, expat: 3, visa: 2, travel: 5, walk: 3, internet: 5, culture: 4, hot: false, humid: false, longFlight: false },
  { slug: "kenya", name: "Kenya", cost: 1500, climate: ["warm", "mild"], setting: ["city", "countryside", "beach"], pace: ["balanced"], lang: "en", english: 5, healthcare: 3, safety: 2, expat: 3, visa: 3, travel: 2, walk: 2, internet: 3, culture: 4, hot: false, humid: false, longFlight: true },
  { slug: "rwanda", name: "Rwanda", cost: 1400, climate: ["mild"], setting: ["city", "countryside"], pace: ["calm", "balanced"], lang: "en", english: 4, healthcare: 3, safety: 4, expat: 3, visa: 4, travel: 2, walk: 3, internet: 4, culture: 3, hot: false, humid: false, longFlight: true },
  { slug: "senegal", name: "Senegal", cost: 1500, climate: ["warm"], setting: ["city", "beach"], pace: ["balanced"], lang: "fr", english: 1, healthcare: 2, safety: 3, expat: 3, visa: 4, travel: 3, walk: 2, internet: 3, culture: 5, hot: true, humid: false, longFlight: false },
  { slug: "dominican-republic", name: "Dominican Republic", cost: 1700, climate: ["warm"], setting: ["beach", "city"], pace: ["balanced"], lang: "es", english: 2, healthcare: 3, safety: 3, expat: 4, visa: 3, travel: 5, walk: 2, internet: 3, culture: 4, hot: true, humid: true, longFlight: false },
  { slug: "ecuador", name: "Ecuador", cost: 1500, climate: ["mild", "warm"], setting: ["city", "countryside", "beach"], pace: ["calm", "balanced"], lang: "es", english: 2, healthcare: 3, safety: 3, expat: 4, visa: 4, travel: 4, walk: 3, internet: 3, culture: 4, hot: false, humid: false, longFlight: false },
  { slug: "greece", name: "Greece", cost: 2200, climate: ["mild", "warm"], setting: ["city", "beach", "countryside"], pace: ["calm", "balanced"], lang: "el", english: 4, healthcare: 3, safety: 5, expat: 3, visa: 2, travel: 4, walk: 4, internet: 3, culture: 5, hot: false, humid: false, longFlight: false },
  { slug: "malta", name: "Malta", cost: 2800, climate: ["warm", "mild"], setting: ["city", "beach"], pace: ["balanced"], lang: "en", english: 5, healthcare: 4, safety: 5, expat: 4, visa: 3, travel: 3, walk: 4, internet: 4, culture: 4, hot: false, humid: false, longFlight: false },
  { slug: "albania", name: "Albania", cost: 1500, climate: ["mild", "warm"], setting: ["city", "beach", "countryside"], pace: ["calm", "balanced"], lang: "sq", english: 3, healthcare: 2, safety: 4, expat: 3, visa: 4, travel: 3, walk: 3, internet: 4, culture: 3, hot: false, humid: false, longFlight: false },
  { slug: "seychelles", name: "Seychelles", cost: 3200, climate: ["warm"], setting: ["beach"], pace: ["calm"], lang: "en", english: 5, healthcare: 3, safety: 4, expat: 2, visa: 3, travel: 1, walk: 1, internet: 3, culture: 3, hot: true, humid: true, longFlight: true },
  { slug: "palau", name: "Palau", cost: 3000, climate: ["warm"], setting: ["beach"], pace: ["calm"], lang: "en", english: 5, healthcare: 2, safety: 5, expat: 1, visa: 1, travel: 1, walk: 1, internet: 2, culture: 2, hot: true, humid: true, longFlight: true },
  { slug: "sri-lanka", name: "Sri Lanka", cost: 1100, climate: ["warm"], setting: ["beach", "city", "countryside"], pace: ["calm", "balanced"], lang: "si", english: 3, healthcare: 3, safety: 3, expat: 3, visa: 3, travel: 1, walk: 2, internet: 3, culture: 5, hot: true, humid: true, longFlight: true },
  { slug: "belize", name: "Belize", cost: 2200, climate: ["warm"], setting: ["beach"], pace: ["calm"], lang: "en", english: 5, healthcare: 2, safety: 2, expat: 4, visa: 4, travel: 4, walk: 1, internet: 2, culture: 3, hot: true, humid: true, longFlight: false },
  { slug: "barbados", name: "Barbados", cost: 3000, climate: ["warm"], setting: ["beach"], pace: ["calm"], lang: "en", english: 5, healthcare: 3, safety: 4, expat: 3, visa: 3, travel: 4, walk: 2, internet: 4, culture: 4, hot: true, humid: true, longFlight: false },
  { slug: "malaysia", name: "Malaysia", cost: 1600, climate: ["warm"], setting: ["city", "beach"], pace: ["balanced"], lang: "ms", english: 4, healthcare: 4, safety: 4, expat: 4, visa: 3, travel: 2, walk: 3, internet: 5, culture: 5, hot: true, humid: true, longFlight: true },
];

const BUDGET_MAX = { b1: 1500, b2: 2500, b3: 4000, b4: 7000 };

const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

/**
 * Scores every country against the quiz answers. Used only for the free teaser.
 * Returns countries sorted best-first, each with a few plain-English reasons.
 */
export function scoreCountries(answers) {
  const a = answers || {};
  const prios = asArray(a.priorities);
  const safe = asArray(a.safety);
  const breakers = asArray(a.dealbreakers);
  const langs = asArray(a.languages);
  const budgetMax = BUDGET_MAX[a.budget] || 2500;

  const results = COUNTRIES.map((c) => {
    let s = 0;
    const why = [];

    if (c.cost <= budgetMax) { s += 20; why.push("it fits your monthly budget"); }
    else if (c.cost <= budgetMax * 1.15) s += 6;
    else s -= 15;

    if (a.climate === "any") s += 6;
    else if (c.climate.includes(a.climate)) { s += 12; why.push("the climate matches what you want"); }
    else s -= 4;

    if (c.setting.includes(a.setting)) { s += 10; why.push("it has the kind of setting you picked"); }
    if (c.pace.includes(a.pace)) s += 8;

    if (langs.includes(c.lang)) { s += 10; why.push("you already speak the local language"); }
    else if (a.learn === "yes") s += 4;
    else if (a.learn === "no") s += c.english * 2;
    else s += c.english;

    if (prios.includes("healthcare")) s += c.healthcare * 3;
    if (prios.includes("safety")) s += c.safety * 3;
    if (prios.includes("community")) s += c.expat * 3;
    if (prios.includes("easyvisa")) s += c.visa * 3;
    if (prios.includes("travel")) s += c.travel * 3;
    if (prios.includes("culture")) s += c.culture * 3;
    if (prios.includes("lowcost")) s += c.cost <= 1500 ? 15 : c.cost <= 2000 ? 9 : 3;
    if (prios.includes("healthcare") && c.healthcare >= 4) why.push("it has strong healthcare");
    if (prios.includes("safety") && c.safety >= 4) why.push("it scores well on safety");
    if (prios.includes("community") && c.expat >= 4) why.push("it has a large, welcoming expat community");
    if (prios.includes("easyvisa") && c.visa >= 4) why.push("its visa routes are comparatively approachable");
    if (prios.includes("travel") && c.travel >= 4) why.push("it's easy to fly home from");
    if (prios.includes("culture") && c.culture >= 4) why.push("its culture and food are a standout");
    if (prios.includes("lowcost") && c.cost <= 1700) why.push("it's one of the more affordable options");

    if (safe.includes("lowcrime")) s += c.safety * 2;
    if (a.community === "expat") s += c.expat * 2;
    else if (a.community === "local") s += (6 - c.expat) * 1.5;
    else s += 6;
    if (a.transport === "walk") s += c.walk * 2;
    if (a.internet === "essential") s += c.internet * 3;
    if (a.flights === "often") s += c.travel * 2;

    if (breakers.includes("heat") && c.hot) s -= 20;
    if (breakers.includes("humidity") && c.humid) s -= 15;
    if (breakers.includes("language") && c.english <= 2) s -= 12;
    if (breakers.includes("longflight") && c.longFlight) s -= 15;
    if (breakers.includes("strictvisa") && c.visa <= 2) s -= 15;

    return { slug: c.slug, name: c.name, score: s, reasons: why.slice(0, 3) };
  });

  return results.sort((x, y) => y.score - x.score);
}
