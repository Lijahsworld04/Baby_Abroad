// What can be bought on the website. Prices are in US cents.
// This one file is used by BOTH the website (cart) and the Cloudflare checkout code
// (worker/index.js). The server always uses these prices, never a price sent by the browser.
// If you change a price here, also change the matching price text on the Services page.

/** @typedef {{ id: string, name: string, description: string, amount: number, maxQty: number, booking?: boolean, physical?: boolean }} Product */

/** @type {Product[]} */
export const PRODUCTS = [
  {
    id: "gettin-gone",
    name: "Gettin' Gone (workbook)",
    description: "Monetary limits, location planning, necessities and non-negotiables.",
    amount: 800,
    maxQty: 1,
  },
  {
    id: "mentally-expatting-better",
    name: "Mentally Expatting Better (workbook)",
    description: "Mindset and mental preparation for leaving home.",
    amount: 600,
    maxQty: 1,
  },
  {
    id: "bundled-books",
    name: "Bundled Books (both workbooks)",
    description: "Both workbooks at a lower price.",
    amount: 1100,
    maxQty: 1,
  },
  // Printed paperbacks (coil bound, 7 x 10 in). Lulu prints and ships them to a U.S. address, free shipping.
  // physical: true makes checkout ask for a shipping address (see worker/index.js).
  {
    id: "gettin-gone-paperback",
    name: "Gettin' Gone (paperback)",
    description: "Printed, coil-bound workbook shipped free to a U.S. address.",
    amount: 2500,
    maxQty: 1,
    physical: true,
  },
  {
    id: "mentally-expatting-better-paperback",
    name: "Mentally Expatting Better (paperback)",
    description: "Printed, coil-bound workbook shipped free to a U.S. address.",
    amount: 2300,
    maxQty: 1,
    physical: true,
  },
  {
    id: "bundled-paperbacks",
    name: "Bundled Paperbacks (both printed workbooks)",
    description: "Both printed, coil-bound workbooks shipped free to a U.S. address.",
    amount: 4400,
    maxQty: 1,
    physical: true,
  },
  {
    id: "consultation-written-plan",
    name: "Consultation + Written Plan",
    description: "1-hour meeting, visa planning and a step-by-step plan by email and PDF within 24 business hours.",
    amount: 7500,
    maxQty: 1,
    booking: true, // the customer picks a call time before paying
  },
  {
    id: "extra-written-plan",
    name: "Extra Written Plan (per destination)",
    description: "Add-on: one personalized written plan for each additional destination.",
    amount: 2500,
    maxQty: 10,
  },
  {
    id: "hands-on-intro-call",
    name: "Hands-On Assistance: Intro Call (1 hour)",
    description: "A 1-hour call to plan your support. Your monthly plan is quoted after the call, and the $35 is credited toward it.",
    amount: 3500,
    maxQty: 1,
    booking: true,
  },
];

/** @param {string} id */
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

/** @param {number} cents */
export const formatPrice = (cents) =>
  `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: cents % 100 ? 2 : 0 })}`;
