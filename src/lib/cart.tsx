import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct } from "@/content/catalog.js";

export interface CartLine {
  id: string;
  qty: number;
}

interface CartValue {
  lines: CartLine[];
  count: number;
  total: number; // cents
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const KEY = "ba-cart-v1";
const CartContext = createContext<CartValue | null>(null);

// The cart is remembered in this browser only. Wrapped in try/catch because private windows can block storage.
function load(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    const out: CartLine[] = [];
    for (const l of parsed) {
      const p = l && typeof l.id === "string" ? getProduct(l.id) : undefined;
      if (p && Number.isInteger(l.qty) && l.qty >= 1) out.push({ id: p.id, qty: Math.min(l.qty, p.maxQty) });
    }
    return out;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage blocked: the cart still works until the page is closed */
    }
  }, [lines]);

  const add = useCallback((id: string) => {
    const p = getProduct(id);
    if (!p) return;
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (!found) return [...prev, { id, qty: 1 }];
      return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, p.maxQty) } : l));
    });
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    const p = getProduct(id);
    if (!p) return;
    setLines((prev) =>
      qty < 1 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, p.maxQty) } : l)),
    );
  }, []);
  const remove = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    let count = 0;
    let total = 0;
    for (const l of lines) {
      count += l.qty;
      total += l.qty * (getProduct(l.id)?.amount ?? 0);
    }
    return { lines, count, total, add, setQty, remove, clear };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
