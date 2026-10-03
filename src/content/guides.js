// Original long-form guides. Rendered by src/pages/Guide.tsx and used for the
// pre-rendered (crawler-friendly) HTML and the Article schema markup.
//
// Baby Abroad shares planning guidance, not legal, tax or immigration advice.
// Keep rules-based claims general, and point readers to official sources.

export const DISCLAIMER =
  "Baby Abroad shares planning guidance, not legal, tax or immigration advice. Visa rules, fees and requirements change often, so always confirm details with the official government or embassy website for your destination.";

/**
 * @typedef {{ h2: string, paragraphs?: string[], list?: string[], ordered?: boolean, after?: string[] }} Section
 * @typedef {{
 *   slug: string, seoTitle: string, h1: string, description: string, summary: string,
 *   readMinutes: number, datePublished: string, dateModified: string,
 *   intro: string[], sections: Section[], related: string[]
 * }} Guide
 */

/** @type {Guide[]} */
export const GUIDES = [
  {
    slug: "moving-to-costa-rica-black-woman",
    seoTitle: "Moving to Costa Rica as a Black Woman: Starter Guide",
    h1: "Moving to Costa Rica as a Black American Woman: A Starter Guide",
    description:
      "A starter guide to moving to Costa Rica: visas, cost, healthcare, learning Spanish, safety and finding community, from someone who lived there.",
    summary: "Visas, costs, healthcare, Spanish, safety and community, from someone who has lived it.",
    readMinutes: 8,
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    intro: [
      "Costa Rica is the dream country for a lot of people, and for good reason: it is welcoming to visitors, rich in nature, and one of the most approachable places to try life abroad for the first time. It was my own first home abroad, and it is where I learned most of what I now teach.",
      "This guide is a starting point for Black American women who are curious about Costa Rica. It covers the big questions, which are visas, money, healthcare, language, safety and community, in plain language. Figures and rules change, so treat the numbers here as a rough guide and confirm them with official sources before you commit.",
    ],
    sections: [
      {
        h2: "Why Costa Rica makes a good first move",
        paragraphs: [
          "Costa Rica is often recommended as a starter country because so much about it is easy to try before you commit. Tourism is a major part of the economy, so the infrastructure for visitors and newcomers is well developed. Many expats already live there, which means plenty of people have walked the paths you are about to walk.",
          "From my own time there, two things stood out. Learning Spanish was manageable and made everyday life much richer, and getting involved in the community was not difficult. People are generally friendly, and showing up with a few words of Spanish and some curiosity goes a long way.",
        ],
      },
      {
        h2: "Visas and how long you can stay",
        paragraphs: [
          "Most American visitors enter as tourists without a visa in advance. Published guides commonly say U.S. citizens are admitted for up to 90 days, and in some cases up to 180 days at the border officer's discretion, so check the stamp in your passport rather than assuming. You will also need a valid passport and proof of onward travel when you arrive.",
          "If you want to stay longer, Costa Rica offers several residency routes. The ones people ask about most are:",
        ],
        list: [
          "Digital nomad visa: for remote workers who earn income from outside Costa Rica. Published figures put the income requirement around $3,000 USD a month for one person (more with dependents), for one year, renewable once.",
          "Rentista: for people who can show steady monthly income or a qualifying deposit, with published figures in the range of $2,500 USD a month.",
          "Pensionado: for retirees with a qualifying pension.",
          "Inversionista: for people making a qualifying investment in property or a business.",
        ],
        after: [
          "Requirements, fees and thresholds are updated by the government, and different sources do not always agree. Confirm the current rules with Costa Rica's immigration authority (Dirección General de Migración y Extranjería) or a qualified immigration attorney before you plan around any of them.",
        ],
      },
      {
        h2: "What it costs to live there",
        paragraphs: [
          "Costa Rica is not the cheapest country in Central America, and many newcomers are surprised by that. Imported goods, cars and electronics can be expensive, while local produce, rice and beans, and neighborhood sodas (small family restaurants) keep daily food costs low if you eat the way locals do.",
          "Where you live changes everything. A beach town popular with tourists will cost more than a smaller inland town, and renting a place you have visited in person is almost always cheaper than booking something sight unseen. Build a budget with a cushion, and use our guide to how much money you need to move abroad as a starting point.",
        ],
      },
      {
        h2: "Healthcare",
        paragraphs: [
          "Costa Rica has a public healthcare system run by the Caja Costarricense de Seguro Social, known as the CAJA. Legal residents are generally required to enroll, and the monthly cost is based on a percentage of declared income. Public care can involve long waits for specialists and non-emergency procedures, so many expats pair the CAJA with private care or private insurance for time-sensitive needs.",
          "If you have ongoing health needs or take prescriptions, research how to get them filled before you move, and ask people already living in your target town which clinics and providers they trust.",
        ],
      },
      {
        h2: "Learning Spanish",
        paragraphs: [
          "You can get by with English in the most tourist-heavy areas, but daily life, from the pharmacy to the bank to your neighbors, gets easier and warmer once you speak even basic Spanish. For me it was manageable and well worth the effort.",
        ],
        list: [
          "Start before you land with an app, a tutor or a conversation group.",
          "Take classes once you arrive. They double as a way to meet people.",
          "Practice out loud, even when it is awkward. Locals tend to appreciate the effort.",
        ],
      },
      {
        h2: "Safety, with nuance",
        paragraphs: [
          "Safety is rarely a yes-or-no question, and anyone who gives you a blanket answer is leaving something out. In my experience abroad I feel safer than I did at home: I can walk around at night without being harassed, and I worry less about hate crimes. I am also a single woman, so vigilance is key anywhere.",
          "Petty theft is the most common issue for visitors and new residents, so basic habits matter: do not leave belongings visible in a parked car, be careful with your phone in crowded places, and use trusted transport at night. Safety varies by city and neighborhood, so ask locals and other expats about the specific area you are considering.",
        ],
      },
      {
        h2: "Finding community as a Black woman",
        paragraphs: [
          "Costa Rica has its own Afro-Costa Rican history and culture, with a long-established Afro-Caribbean community on the Caribbean coast, in the province of Limón. As a Black American, you may be treated with curiosity, and experiences differ from person to person and place to place, so go in open-minded rather than expecting one story.",
          "Getting involved in the community was not hard for me. Join expat and local groups before you arrive, take classes, volunteer, and say yes to invitations in your first few months. Our guide to finding community abroad as a woman of color goes deeper on this.",
        ],
      },
      {
        h2: "A simple way to start",
        list: [
          "Visit before you commit, ideally for a few weeks in the town you are considering.",
          "Talk to at least three people who live there.",
          "Match your income and work situation to a visa pathway.",
          "Build a budget with a safety cushion.",
          "Start learning Spanish now.",
        ],
        after: [
          "If you want help turning this into a plan that fits your goals and budget, a consultation and written relocation plan is exactly what we built Baby Abroad to provide.",
        ],
      },
    ],
    related: ["how-to-move-abroad", "visa-options-for-moving-abroad", "finding-community-abroad-as-a-woman-of-color"],
  },
  {
    slug: "how-to-move-abroad",
    seoTitle: "How to Move Abroad as a Woman of Color: 8 Steps",
    h1: "How to Move Abroad as a Woman of Color: An 8-Step Plan",
    description:
      "A calm, practical 8-step plan for moving abroad: define your why, choose a destination, match a visa, build your budget, scout, and land softly.",
    summary: "A calm 8-step plan from first idea to your first month abroad.",
    readMinutes: 7,
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    intro: [
      "Moving abroad can feel like one enormous leap, but it is really a series of small, doable decisions. Most people who make the move do it over six to eighteen months, one step at a time.",
      "This plan is written for women of color, so it makes room for the questions that rarely show up in generic relocation advice: where you will feel safe and welcome, where you can find community, and whether the everyday things that make a place feel like home (food, hair care, culture) will be within reach.",
    ],
    sections: [
      {
        h2: "Step 1: Get clear on your why",
        paragraphs: [
          "Your reason for leaving shapes every choice that follows. Are you chasing lower living costs, better work-life balance, a slower pace, a fresh start, or a place where you are simply treated better? Write your reasons down in plain language. When the process gets stressful, that page is what you come back to.",
        ],
      },
      {
        h2: "Step 2: Name your non-negotiables",
        paragraphs: ["Before you fall in love with a photo of a beach town, decide what a place must have for you to thrive. Think in categories:"],
        list: [
          "Budget: the monthly amount you can comfortably live on, and the savings you want to arrive with.",
          "Safety and belonging: how you want to feel walking down the street, and how you want to be treated.",
          "Healthcare: access to doctors you trust and a plan for insurance.",
          "Everyday life: climate, language, internet quality, and access to food, hair care and skin care that work for you.",
          "Work: whether you will work remotely, find a local job, or live on savings or passive income.",
        ],
      },
      {
        h2: "Step 3: Build a shortlist of three to five countries",
        paragraphs: [
          "Start broad, then narrow. Use your non-negotiables to rule places out quickly, and keep a simple scorecard for the rest. Our guide to choosing where to move abroad walks through a scoring method you can copy.",
        ],
      },
      {
        h2: "Step 4: Match yourself to a visa pathway",
        paragraphs: [
          "A beautiful destination does not help you if you cannot legally stay. Look at which pathways fit your life: work, remote work, study, retirement or passive income, ancestry, or starting a business. Read the requirements on the official government site and note processing times, income thresholds, insurance rules and document needs.",
        ],
      },
      {
        h2: "Step 5: Build your money plan",
        paragraphs: [
          "Add up one-time moving costs, your monthly cost of living, and a cushion for the unexpected. If you are a U.S. citizen, remember that you generally still file U.S. taxes while living abroad, so plan for that early. We break the whole budget down in our guide to how much money you need to move abroad.",
        ],
      },
      {
        h2: "Step 6: Scout before you commit",
        paragraphs: [
          "If you can, spend a few weeks in your top choice before you sign a lease or ship your things. Stay in a normal neighborhood, not a tourist strip. Take public transit, shop at local markets, visit a clinic or pharmacy, and chat with women who live there. How a city feels on an ordinary Tuesday tells you more than any ranking.",
        ],
      },
      {
        h2: "Step 7: Handle paperwork and logistics",
        paragraphs: ["Work backward from your target move date and give every task a deadline. Our moving abroad checklist has a full timeline, but the big items are:"],
        list: [
          "Check that your passport is valid for the length your visa requires.",
          "Gather and, if needed, authenticate key documents such as birth certificates, background checks and diplomas.",
          "Arrange temporary housing for your first weeks so you can find a long-term place in person.",
          "Set up health insurance, banking and a way to receive mail.",
        ],
      },
      {
        h2: "Step 8: Prepare your heart and land softly",
        paragraphs: [
          "Even a dream move comes with grief, homesickness and culture shock. Plan for it: build routines, keep in touch with your people, and find your community early. Give yourself permission to take the first three months slowly. You are not behind. You are settling into a new chapter.",
        ],
      },
    ],
    related: ["moving-abroad-checklist", "how-to-choose-where-to-move-abroad", "visa-options-for-moving-abroad"],
  },

  {
    slug: "moving-abroad-checklist",
    seoTitle: "Moving Abroad Checklist: A 12-Month Timeline",
    h1: "The Moving Abroad Checklist: A 12-Month Timeline",
    description:
      "A month-by-month moving abroad checklist covering research, visas, money, housing, documents and your first 30 days in a new country.",
    summary: "A month-by-month checklist from decision day to your first 30 days abroad.",
    readMinutes: 6,
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    intro: [
      "A long to-do list is easier to face when it is broken into seasons. Use this checklist as a starting point and adjust the dates to your own timeline. Some visas take only weeks, others take many months, so check your destination's processing times first.",
    ],
    sections: [
      {
        h2: "12 to 9 months before: decide and research",
        list: [
          "Write your why and your non-negotiables.",
          "Choose three to five destinations to compare.",
          "Research visa pathways and the official requirements for each.",
          "Check your passport expiration date and renew it if needed.",
          "Start a dedicated moving-abroad savings account and set a monthly goal.",
        ],
      },
      {
        h2: "9 to 6 months before: scout and prepare",
        list: [
          "Take a scouting trip or an extended stay in your top choice.",
          "Narrow to one destination and a backup.",
          "Begin collecting visa documents, since some need to be ordered or authenticated.",
          "Talk with women who already live there about daily life, safety and community.",
          "Start decluttering: sell, donate or store what you will not take.",
        ],
      },
      {
        h2: "6 to 3 months before: apply and arrange",
        list: [
          "Submit your visa application and keep copies of everything.",
          "Book temporary housing for your first weeks.",
          "Research health insurance that is valid in your destination.",
          "Tell your employer, clients or school about your plans if relevant.",
          "Decide what to do with your car, lease, subscriptions and storage.",
          "Learn basic phrases in the local language.",
        ],
      },
      {
        h2: "3 to 1 months before: lock it in",
        list: [
          "Book your flights once your visa timing is clear.",
          "Notify your banks, update your address where needed and set up mail forwarding or a mail service.",
          "Make digital and paper copies of your passport, visa, birth certificate and other key documents.",
          "Stock up on prescriptions where allowed, and on hair and skin products that are hard to find abroad.",
          "Confirm how your phone, internet and money transfers will work when you land.",
        ],
      },
      {
        h2: "The final month: say your goodbyes",
        list: [
          "Pack essentials in your carry-on: documents, medication, chargers and a change of clothes.",
          "Spend time with your people. Gather contact details and plan how you will stay in touch.",
          "Review your arrival plan: airport transfer, first-night address and first-week to-dos.",
        ],
      },
      {
        h2: "Your first 30 days abroad",
        list: [
          "Register your residence, get your residency card or complete any local registration your visa requires.",
          "Open a local bank account if you need one, and get a local SIM or data plan.",
          "Find a doctor, pharmacy and hair or beauty provider you like.",
          "Learn your neighborhood, public transit and emergency numbers.",
          "Join one community, whether that is a class, a gym or a group of women expats.",
        ],
        after: ["Rules differ by country and visa type, so treat this as a framework and confirm every legal step with official sources."],
      },
    ],
    related: ["how-to-move-abroad", "how-much-money-to-move-abroad", "visa-options-for-moving-abroad"],
  },

  {
    slug: "how-to-choose-where-to-move-abroad",
    seoTitle: "How to Choose Where to Move Abroad (Scorecard)",
    h1: "How to Choose Where to Move Abroad (Beyond Cost of Living)",
    description:
      "Use a simple scorecard to compare countries on visas, budget, safety, community, healthcare and daily life so you choose where you will actually thrive.",
    summary: "A simple scorecard for comparing countries on what truly matters.",
    readMinutes: 6,
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    intro: [
      "Lists of the best countries to live in are fun to read, but they cannot tell you where you will be happy. Your answer depends on your income, your visa options, your values and how you want to feel in your daily life.",
      "Instead of asking which country is best, ask which country is best for you. A scorecard makes that question concrete.",
    ],
    sections: [
      {
        h2: "Build your scorecard",
        paragraphs: [
          "List the factors below, give each one a weight from 1 (nice to have) to 5 (non-negotiable), then score each country from 1 to 5. Multiply, add it up, and see which places rise to the top.",
        ],
        list: [
          "Visa feasibility: is there a realistic pathway you qualify for?",
          "Cost of living compared with your income or savings.",
          "Safety, including how safe women feel and how people of color are treated day to day.",
          "Community: existing groups of women of color, expats and locals who are welcoming.",
          "Healthcare: quality, cost and whether you can see providers you trust.",
          "Daily life: climate, language, internet, transit, and access to food, hair care and skin care you love.",
          "Work: remote-work friendliness, time zone overlap with your clients or family, and local job options.",
          "Taxes and money: how your income will be taxed and how easy it is to bank and transfer money.",
          "Connection: flight time and cost to visit family and friends.",
        ],
      },
      {
        h2: "Look past the headlines",
        paragraphs: [
          "Rankings and travel articles are a starting point, not a verdict. A country can rank well overall and still feel hard for you in a specific city, or the reverse. Look for lived experience from women who share parts of your identity, and read for specifics: which neighborhoods, which situations, which surprises.",
        ],
      },
      {
        h2: "How to research real, lived experience",
        list: [
          "Join online communities for expats and for women of color abroad, and ask pointed questions.",
          "Follow creators who live in your target city and watch how they describe ordinary days, not only highlights.",
          "Ask about the hard parts: bureaucracy, loneliness, how long it took to make friends.",
          "Book a call with someone who made the move and ask what they wish they had known.",
        ],
      },
      {
        h2: "Test it with a scouting trip",
        paragraphs: [
          "Your scorecard gets you to a shortlist. Time on the ground picks the winner. Stay at least two to four weeks if you can, live like a local, and score the city again after your visit. Gut feeling counts as data too.",
        ],
      },
      {
        h2: "Plan for more than one destination",
        paragraphs: [
          "Your first choice might fall through because of a visa rule, a budget change or a bad scouting trip. Keep a backup, and consider a written plan for each destination so you can pivot without starting over.",
        ],
      },
    ],
    related: ["how-to-move-abroad", "finding-community-abroad-as-a-woman-of-color", "visa-options-for-moving-abroad"],
  },

  {
    slug: "how-much-money-to-move-abroad",
    seoTitle: "How Much Money Do You Need to Move Abroad?",
    h1: "How Much Money Do You Need to Move Abroad?",
    description:
      "Break down moving abroad costs into one-time expenses, monthly living costs and a safety buffer, then build a realistic number for your own move.",
    summary: "Build your own number: one-time costs, monthly runway and a safety buffer.",
    readMinutes: 6,
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    intro: [
      "There is no single price tag for moving abroad. Costs vary enormously by country, city, visa type and lifestyle. The good news is that you can build a reliable personal number in three parts.",
    ],
    sections: [
      {
        h2: "Part 1: One-time moving costs",
        paragraphs: ["These are the expenses you pay once, mostly before or right after you arrive:"],
        list: [
          "Visa application fees, document costs, translations and any required background checks or authentications.",
          "Flights, plus shipping or storage for belongings.",
          "A security deposit and first month's rent, and sometimes agent fees.",
          "Setup costs like a phone, adapters, bedding and basic household items.",
          "Medical checks or insurance premiums that your visa may require.",
        ],
      },
      {
        h2: "Part 2: Your monthly cost of living",
        paragraphs: ["Add up what a normal month will cost in your target city, using real listings and local price research instead of averages from social media:"],
        list: [
          "Rent and utilities.",
          "Groceries and eating out.",
          "Health insurance and out-of-pocket care.",
          "Transportation.",
          "Phone and internet.",
          "Visa renewals, residency fees and taxes.",
          "Travel back home and fun money. Do not skip this line.",
        ],
      },
      {
        h2: "Part 3: Your safety buffer",
        paragraphs: [
          "Many planners suggest arriving with several months of living expenses saved, often three to six months or more, so a delayed paycheck or surprise bill does not force you home. Your visa may also require you to show a minimum amount of savings or income, so check the official requirements early.",
        ],
      },
      {
        h2: "Plan your income",
        paragraphs: [
          "Decide how you will earn while abroad: remote work, a local job, freelancing, a business, or savings and passive income. If your income is in a different currency than your expenses, build in a margin for exchange-rate swings and transfer fees.",
        ],
      },
      {
        h2: "Remember taxes",
        paragraphs: [
          "If you are a U.S. citizen, you generally still file U.S. tax returns while living abroad, and you may also owe tax in your new country. Talk to a tax professional who understands expat situations before you move so there are no surprises.",
        ],
      },
      {
        h2: "Ways to lower your costs",
        list: [
          "Move to a smaller city or a quieter neighborhood.",
          "Rent a furnished place at first, so you ship less.",
          "Sell or donate what you do not need instead of paying to ship it.",
          "Compare local health insurance with international plans.",
          "Travel in your first year with purpose, not impulse.",
        ],
        after: ["Our Gettin' Gone workbook includes a budgeting section built for exactly this kind of planning."],
      },
    ],
    related: ["moving-abroad-checklist", "how-to-choose-where-to-move-abroad", "how-to-move-abroad"],
  },

  {
    slug: "visa-options-for-moving-abroad",
    seoTitle: "Visa Options for Moving Abroad: 6 Common Pathways",
    h1: "Visa Options for Moving Abroad: 6 Common Pathways",
    description:
      "An overview of six common ways to live abroad legally: work, remote work, study, retirement, ancestry and business visas, plus what to check first.",
    summary: "Six common pathways to living abroad, and what to check before you apply.",
    readMinutes: 6,
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    intro: [
      "Your visa pathway often decides your destination. It is worth understanding the main options before you commit to a country. This overview explains the most common categories in plain language.",
      "Every country has its own names, rules and fees, and they change. Use this guide to know what to look for, then confirm the details with the destination's official government or embassy website.",
    ],
    sections: [
      {
        h2: "1. Work visas",
        paragraphs: [
          "These usually require a job offer from an employer in the destination country, and sometimes the employer sponsors the visa. Some countries also have skilled-worker programs based on your profession, education and experience.",
        ],
      },
      {
        h2: "2. Remote work or digital nomad visas",
        paragraphs: [
          "A growing number of countries offer residence permits for people who work remotely for employers or clients outside the country. Typical requirements include proof of steady income, health insurance and a clean background check, but the details differ widely and some are short-term only.",
        ],
      },
      {
        h2: "3. Student visas",
        paragraphs: [
          "Enrolling in a degree or language program can be a way to live abroad while you learn the country. Some places allow limited work while studying, and some offer routes to stay after graduation. Check both the rules and the real cost.",
        ],
      },
      {
        h2: "4. Retirement or passive income visas",
        paragraphs: [
          "Some countries welcome residents who can show a reliable pension, investment income or other passive income. They often set a minimum monthly income, and they are not limited to people of retirement age. Check the age rules for each program.",
        ],
      },
      {
        h2: "5. Ancestry or heritage-based residency and citizenship",
        paragraphs: [
          "A few countries offer residency or citizenship to people with a parent, grandparent or other ancestor from there. These routes can take serious paperwork and research into your family history, but they can lead to long-term rights to live and work.",
        ],
      },
      {
        h2: "6. Business, self-employment and investment visas",
        paragraphs: [
          "If you plan to start a business, work for yourself or invest, some countries have visas designed for that. Requirements often include a business plan, funds or a minimum investment, and proof of qualifications.",
        ],
      },
      {
        h2: "What to check before you apply",
        list: [
          "Eligibility: age, income, education, family status and any country-specific rules.",
          "Total cost: application fees, translations, document authentications and required insurance.",
          "Processing time and whether you must apply from your home country.",
          "Whether the visa allows you to work, and for whom.",
          "How to renew or convert it into longer-term residency.",
          "Your tax situation in both countries.",
        ],
      },
      {
        h2: "Get reliable help",
        paragraphs: [
          "Social media is a great place to find ideas, and a risky place to confirm rules. Trust official sources first. For complex situations, an immigration attorney in the destination country is worth the fee. If you want help organizing your options and building a plan, our Consultation + Written Plan includes visa planning.",
        ],
      },
    ],
    related: ["how-to-move-abroad", "how-much-money-to-move-abroad", "moving-abroad-checklist"],
  },

  {
    slug: "finding-community-abroad-as-a-woman-of-color",
    seoTitle: "Finding Community Abroad as a Woman of Color",
    h1: "Finding Community and Belonging Abroad as a Woman of Color",
    description:
      "How to build safety, friendships and a sense of home abroad: research lived experiences, find your people, care for your hair and skin, and protect your peace.",
    summary: "Safety, friendship and everyday comfort: how to feel at home in a new country.",
    readMinutes: 6,
    datePublished: "2026-10-03",
    dateModified: "2026-10-03",
    intro: [
      "Moving abroad is not only a logistics project. It is also about where you will feel seen, safe and supported. Women of color often carry extra questions into a move: how will I be treated, where is my community, and where can I find the products and people that make me feel like myself?",
      "Experiences differ by person, place and city, so treat this as a set of ideas to adapt, not a promise about any one country.",
    ],
    sections: [
      {
        h2: "Start building community before you land",
        list: [
          "Join online groups for expats and for women of color living in your destination.",
          "Introduce yourself, ask specific questions and offer to meet up when you arrive.",
          "Follow local and expat creators to get a feel for different neighborhoods.",
        ],
      },
      {
        h2: "Expect to be perceived differently, and plan for it",
        paragraphs: [
          "How race, hair, skin tone and being a foreigner are perceived varies enormously from country to country and even from city to city. You may experience curiosity, kindness, stares, awkward questions or outright bias. Talk with women who live there to hear what daily life is actually like, and decide in advance how you want to respond to situations that are uncomfortable.",
        ],
      },
      {
        h2: "Make safety a habit, not a worry",
        list: [
          "Research neighborhoods and choose housing in an area that feels right in person.",
          "Learn local emergency numbers and nearby clinics before you need them.",
          "Share your location with someone you trust, especially in your first months.",
          "Use trusted transportation options and ask local women for recommendations.",
        ],
      },
      {
        h2: "Plan for hair, skin and everyday comforts",
        paragraphs: [
          "Finding a stylist who understands your hair or a product you trust can make the difference between feeling at home and feeling out of place. Before you move, ask in community groups where women with your hair type and skin tone shop and get services. Consider bringing a supply of your must-have products for the first few months while you test local options.",
        ],
      },
      {
        h2: "Make friends on purpose",
        list: [
          "Take a language class, which doubles as a social life.",
          "Join a gym, dance class, church, volunteer group or hobby club.",
          "Say yes to invitations in your first few months, even when you are tired.",
          "Build friendships with both locals and other expats for a well-rounded support system.",
        ],
      },
      {
        h2: "Protect your peace",
        paragraphs: [
          "Homesickness and culture shock are common, even when you chose the move. Build routines that ground you: favorite meals, regular calls home, movement, journaling or a faith practice. If you need extra support, consider setting up a counselor or a regular check-in with a trusted friend early, not after a hard moment.",
        ],
      },
      {
        h2: "Keep your roots",
        paragraphs: [
          "Home does not disappear when you leave it. Cook the foods you grew up with, keep your traditions, and invite new friends into them. The best expat lives are built by adding a new chapter, not erasing the old ones.",
        ],
      },
    ],
    related: ["how-to-choose-where-to-move-abroad", "how-to-move-abroad", "moving-abroad-checklist"],
  },
];

export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug);
}
