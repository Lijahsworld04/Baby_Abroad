// Affiliate links: gobabyabroad.com/?ref=maya remembers "maya" for 30 days so the sale can be credited.
const KEY = "ba-ref";
const DAYS = 30;
const OK = /^[a-z0-9]{3,24}$/;

export function captureRef(): void {
  try {
    const p = new URLSearchParams(window.location.search).get("ref");
    const code = p ? p.trim().toLowerCase() : "";
    if (OK.test(code)) window.localStorage.setItem(KEY, JSON.stringify({ c: code, t: Date.now() }));
  } catch {
    /* storage can be blocked; nothing to do */
  }
}

export function readRef(): string | undefined {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return undefined;
    const { c, t } = JSON.parse(raw);
    if (typeof c === "string" && OK.test(c) && Date.now() - Number(t) < DAYS * 86400000) return c;
  } catch {
    /* ignore */
  }
  return undefined;
}
