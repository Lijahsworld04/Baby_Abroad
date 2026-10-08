// Privacy Policy and Terms of Service. Rendered by src/pages/Legal.tsx and used for the
// pre-rendered HTML. This is a plain-language draft, not legal advice: have a qualified
// attorney review it before relying on it.

export const LEGAL_UPDATED = "2026-10-08";
const EMAIL = "contact@gobabyabroad.com";

/**
 * @typedef {{ h2: string, paragraphs?: string[], list?: string[] }} LegalSection
 */

export const LEGAL = {
  privacy: {
    path: "/privacy",
    seoTitle: "Privacy Policy | Baby Abroad",
    h1: "Privacy Policy",
    description:
      "How Baby Abroad collects, uses and protects your information when you visit gobabyabroad.com, request a consultation or buy our services.",
    intro:
      "Baby Abroad (\"we\", \"us\") respects your privacy. This policy explains what information we collect through gobabyabroad.com, how we use it, and the choices you have.",
    sections: [
      {
        h2: "Information we collect",
        paragraphs: ["We collect only what we need to respond to you and deliver our services."],
        list: [
          "Information you give us: when you use our contact form, we receive your name, email address, time zone and the message you write.",
          "Order and booking information: when you buy from us, we receive your name, email address, what you ordered, and, if you booked a call, the date, time and time zone you chose. We use this to deliver your order and to put your call on our calendar.",
          "Information about your plans: if you become a client, you may share details about your destination, budget, work and goals so that we can build your plan.",
          "Payment information: card payments on this site are handled by Stripe, and the payment form is provided by Stripe. We do not see or store your full card number. Stripe shares with us your name, email address, the amount and the status of your payment. If you pay by Zelle, your bank handles that payment and we see only what it shows us.",
          "Chat messages: if you use the chat helper (Aajah, an AI assistant), the messages you type are processed by our automation and AI providers to produce a reply. Please do not share passwords, ID numbers or payment details in the chat.",
          "Basic technical information: our hosting provider and privacy-friendly analytics may record things like your approximate region, device type, browser and the pages you visit, without using cookies to follow you around the web.",
        ],
      },
      {
        h2: "Please do not send sensitive documents through the form",
        paragraphs: [
          "Please do not include passport numbers, Social Security numbers, bank or card numbers, or other highly sensitive identifiers in the contact form or in a first email. If we need a document from you, we will tell you the safest way to share it.",
        ],
      },
      {
        h2: "How we use your information",
        list: [
          "To reply to your messages and schedule consultations.",
          "To email you your workbooks, booking confirmations, calendar invites and order details after you pay, and to alert us to new orders.",
          "To deliver, invoice and support the products and services you request.",
          "To improve our website, guides and services, using aggregated and non-identifying usage statistics.",
          "To meet legal and tax obligations.",
        ],
        paragraphs: ["We do not sell your personal information, and we do not use it for advertising."],
      },
      {
        h2: "Cookies and local storage",
        paragraphs: [
          "We do not use advertising or tracking cookies. Your browser may store small settings on your own device, such as your light or dark theme and your \"How sure are you?\" slider choice, so the site remembers them. These stay on your device and are not sent to us.",
          "If you add items to your cart, your browser also saves the cart (the items and quantities) on your own device so it is still there if you leave and come back. This is not a tracking cookie, and the cart is sent to us only when you go to pay. You can clear it any time by removing the items or clearing your browser's site data.",
        ],
      },
      {
        h2: "Services we use",
        paragraphs: ["To run the site, we rely on trusted providers who process data on our behalf:"],
        list: [
          "Cloudflare, for hosting, security and privacy-friendly analytics.",
          "Our automation and AI providers, which process the messages you type into the chat helper to write replies.",
          "EmailJS, which delivers the messages you send through our contact form to our inbox.",
          "Google Fonts, which loads the typefaces on this site and may receive your IP address when it does.",
          "Stripe, for card payments and the checkout form. Stripe may set its own cookies or use similar technology on the payment form to process payments and prevent fraud, under its own privacy policy. Zelle, for payments made through your bank, is covered by your bank's policies.",
          "Google (Gmail, Google Calendar and Google Drive), which we use to email your orders, put booked calls on our calendar, send you calendar invites, and store our workbook files. Booked calls may include a Google Meet video link.",
          "n8n, the automation tool that connects our website, payments and email. It receives your order details so that it can send your emails and calendar invites.",
          "Social platforms such as Instagram and TikTok, if you follow our links. We do not control their privacy practices.",
        ],
      },
      {
        h2: "How long we keep your information",
        paragraphs: [
          "We keep contact and client information for as long as we need it to serve you and meet legal, tax and accounting requirements, and then delete or anonymize it. You can ask us to delete it sooner, unless we are required to keep it.",
        ],
      },
      {
        h2: "Your choices and rights",
        paragraphs: [
          `You can ask to see, correct or delete the personal information we hold about you, or object to how we use it, by emailing ${EMAIL}. Depending on where you live, including parts of the United States, the European Economic Area and the United Kingdom, you may have additional legal rights, and we will honor them as required.`,
        ],
      },
      {
        h2: "Security",
        paragraphs: [
          "We take reasonable steps to protect your information, but no website or method of transmission is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        h2: "Children",
        paragraphs: [
          "Our website and services are meant for adults. We do not knowingly collect information from anyone under 18.",
        ],
      },
      {
        h2: "International visitors",
        paragraphs: [
          "Baby Abroad works with clients worldwide, so your information may be processed in the United States and other countries where our providers operate.",
        ],
      },
      {
        h2: "Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time. The \"last updated\" date at the top of this page shows when it last changed.",
        ],
      },
      {
        h2: "Contact us",
        paragraphs: [`Questions about privacy? Email ${EMAIL}.`],
      },
    ],
  },
  terms: {
    path: "/terms",
    seoTitle: "Terms of Service & Refund Policy | Baby Abroad",
    h1: "Terms of Service",
    description:
      "The terms for using gobabyabroad.com and buying Baby Abroad workbooks, consultations, written plans and assistance, including our no-refund policy.",
    intro:
      "These terms apply when you use gobabyabroad.com or buy anything from Baby Abroad. By using the site or purchasing a product or service, you agree to them.",
    sections: [
      {
        h2: "What we provide",
        paragraphs: [
          "Baby Abroad offers workbooks, consultations, written relocation plans, free guides and hands-on assistance to help people plan a move abroad. The details of each offering are described on our Services page.",
        ],
      },
      {
        h2: "Not legal, tax, immigration or financial advice",
        paragraphs: [
          "Everything we provide is general planning guidance and shared experience. It is not legal, tax, immigration, medical, insurance or financial advice, and we are not a law firm or licensed advisor. Visa rules, fees and requirements change often. You are responsible for confirming requirements with official government sources and for consulting qualified professionals about your situation.",
        ],
      },
      {
        h2: "No guarantees",
        paragraphs: [
          "We cannot guarantee any visa approval, job, housing, cost estimate or outcome. Your results depend on your circumstances and on decisions made by governments and other third parties. You make your own decisions about whether and where to move.",
        ],
      },
      {
        h2: "Pricing and payment",
        paragraphs: [
          "Prices are listed in US dollars and are indicative. Prices for consultations, written plans and hands-on assistance may be tailored to your needs, and we will confirm the price with you before you pay. We accept payment through Stripe and Zelle. Hands-on assistance begins with a one-hour intro call ($35), after which we quote your monthly plan. The $35 is credited toward your first month if you sign up, and ongoing assistance is billed monthly at the rate we agree with you.",
        ],
      },
      {
        h2: "No refunds",
        paragraphs: [
          "All sales are final. Workbooks, consultations, written relocation plans and assistance are non-refundable, because our products are delivered digitally and cannot be returned once you have received them. If you are unsure which offering fits, please contact us before you buy and we will help you choose.",
        ],
      },
      {
        h2: "Scheduling consultations",
        paragraphs: [
          "Consultations and calls are held virtually. You choose an available time when you check out, and we confirm it by email with a calendar invite. If you need to reschedule, please let us know as early as possible. Rescheduling is at our discretion.",
        ],
      },
      {
        h2: "Written plans and your personal use",
        paragraphs: [
          "Our workbooks, guides and written plans are created for your personal use. You may not copy, resell, republish or share them publicly or with others for a fee without our written permission. All content on this site, including text, graphics and design, belongs to Baby Abroad.",
        ],
      },
      {
        h2: "Your information and testimonials",
        paragraphs: [
          "How we handle your information is described in our Privacy Policy. We will only publish a testimonial or any part of a client's plan with that client's permission, and we remove identifying details when asked.",
        ],
      },
      {
        h2: "Third-party links and services",
        paragraphs: [
          "Our site and guides may link to government, travel and other third-party sites. We do not control or endorse them and are not responsible for their content or policies.",
        ],
      },
      {
        h2: "Limitation of liability",
        paragraphs: [
          "To the fullest extent allowed by law, Baby Abroad is not liable for any indirect, incidental or consequential losses arising from your use of the site or our services, including losses related to travel, visas, relocation or financial decisions. Our total liability for any claim is limited to the amount you paid us for the service in question.",
        ],
      },
      {
        h2: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. The version on this page is the one that applies when you use the site or make a purchase.",
        ],
      },
      {
        h2: "Contact us",
        paragraphs: [`Questions about these terms? Email ${EMAIL}.`],
      },
    ],
  },
};

export const LEGAL_DOCS = [LEGAL.privacy, LEGAL.terms];
