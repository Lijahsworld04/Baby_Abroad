import { useSyncExternalStore } from "react";

/**
 * Shared state for the "How sure are you?" slider (0, 20, 40, 60, 80, 100).
 * The value is written to the --sure CSS variable (0 to 1) on <html>, so the
 * background glow and tree update live, with no page reload. It is remembered
 * in the visitor's browser so it carries across pages.
 */
const KEY = "baby-abroad-sure";
const DEFAULT = 40;
let value = DEFAULT;
const listeners = new Set<() => void>();

function apply(v: number) {
  document.documentElement.style.setProperty("--sure", String(v / 100));
}

export function initSureness() {
  try {
    const saved = Number(window.localStorage.getItem(KEY));
    if (window.localStorage.getItem(KEY) !== null && [0, 20, 40, 60, 80, 100].includes(saved)) {
      value = saved;
    }
  } catch {
    /* storage unavailable: use the default */
  }
  apply(value);
  listeners.forEach((l) => l());
}

export function setSureness(v: number) {
  value = v;
  apply(v);
  try {
    window.localStorage.setItem(KEY, String(v));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function useSureness() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => value,
    () => DEFAULT,
  );
}
