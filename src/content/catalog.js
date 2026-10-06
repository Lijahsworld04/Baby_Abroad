// What can be bought on the website. Prices are in US cents.
// This one file is used by BOTH the website (cart) and the Cloudflare checkout code
// (worker/index.js). The server always uses these prices, never a price sent by the browser.
// If you change a price here, also change the matching price text on the Services page.

/** @typedef {{ id: string, name: string, description: string, amount: number, maxQty: number }} Product */

/** @type {Product[]} */
export const PRODUCTS = [
  {
    id: "gettin-gone",
    name: "Gettin' Gone (workbook)",
    description: "Monetary limits, location planning, necessities and non-negotiables.",
    amount: 500,
    maxQty: 1,
  },
  {
    id: "mentally-expatting-better",
    name: "Mentally Expatting Better (workbook)",
    description: "Mindset and mental preparation for leaving home.",
    amount: 700,
    maxQty: 1,
  },
  {
    id: "bundled-books",
    name: "Bundled Books (both workbooks)",
    description: "Both workbooks at a lower price.",
    amount: 1000,
    maxQty: 1,
  },
  {
    id: "consultation-written-plan",
    name: "Consultation + Written Plan",
    description: "1-hour meeting, visa planning and a step-by-step plan by email and PDF within 24 business hours.",
    amount: 7500,
    maxQty: 1,
  },
  {
    id: "extra-written-plan",
    name: "Extra Written Plan (per destination)",
    description: "Add-on: one personalized written plan for each additional destination.",
    amount: 2500,
    maxQty: 10,
  },
];

/** @param {string} id */
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

/** @param {number} cents */
export const formatPrice = (cents) =>
  `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: cents % 100 ? 2 : 0 })}`;
