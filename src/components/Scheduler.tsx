import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { CalendarDays, Clock, Globe } from "lucide-react";

// Pickers for booking a call: timezone first, then a day on a calendar, then a time.
// Everything comes from the list of open slots (UTC times) sent by /api/availability.

const COMMON_ZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Phoenix",
  "America/Los_Angeles",
  "America/Anchorage",
  "Pacific/Honolulu",
  "America/Toronto",
  "America/Mexico_City",
  "America/Costa_Rica",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Lisbon",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Athens",
  "Europe/Tirane",
  "Africa/Lagos",
  "Africa/Accra",
  "Africa/Nairobi",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Bangkok",
  "Asia/Tokyo",
  "Australia/Sydney",
];

function zoneLabel(zone: string, at: Date) {
  let name = "";
  try {
    name = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "long" })
      .formatToParts(at)
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  } catch {
    /* unknown zone: fall back to the plain id */
  }
  const city = zone.split("/").slice(1).join(" / ").replace(/_/g, " ") || zone;
  return name ? `${city} (${name})` : city;
}

export function detectZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export function TimezoneSelect({ value, onChange }: { value: string; onChange: (z: string) => void }) {
  const now = useMemo(() => new Date(), []);
  const all = useMemo(() => {
    try {
      return (Intl as unknown as { supportedValuesOf: (k: string) => string[] }).supportedValuesOf("timeZone");
    } catch {
      return COMMON_ZONES;
    }
  }, []);
  const commonSet = new Set(COMMON_ZONES);
  const options = commonSet.has(value) || all.includes(value) ? null : value;
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
        <Globe className="size-4 text-[var(--sched-accent)]" aria-hidden="true" /> Your time zone
      </span>
      <select
        className="sched-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Your time zone"
      >
        {options && <option value={options}>{zoneLabel(options, now)}</option>}
        <optgroup label="Common">
          {COMMON_ZONES.map((z) => (
            <option key={z} value={z}>
              {zoneLabel(z, now)}
            </option>
          ))}
        </optgroup>
        <optgroup label="All time zones">
          {all
            .filter((z) => !commonSet.has(z))
            .map((z) => (
              <option key={z} value={z}>
                {zoneLabel(z, now)}
              </option>
            ))}
        </optgroup>
      </select>
    </label>
  );
}

const dayKeyInZone = (iso: string, zone: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
const dayKeyLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function formatSlot(iso: string, zone: string) {
  return new Intl.DateTimeFormat("en-US", { timeZone: zone, dateStyle: "full", timeStyle: "short" }).format(new Date(iso));
}

interface Props {
  slots: string[]; // open start times (UTC ISO)
  zone: string; // the customer's time zone
  value: string | null;
  onChange: (iso: string | null) => void;
  exclude?: string[]; // times already picked for another call in this order
  durationMinutes?: number;
}

export function Scheduler({ slots, zone, value, onChange, exclude = [], durationMinutes = 60 }: Props) {
  const usable = useMemo(() => slots.filter((s) => !exclude.includes(s) || s === value), [slots, exclude, value]);
  const byDay = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const s of usable) {
      const k = dayKeyInZone(s, zone);
      m.set(k, [...(m.get(k) ?? []), s]);
    }
    return m;
  }, [usable, zone]);

  const [day, setDay] = useState<Date | undefined>(undefined);

  // Keep the calendar in step with a chosen time (e.g. after the time zone changes).
  useEffect(() => {
    if (!value) return;
    const [y, m, d] = dayKeyInZone(value, zone).split("-").map(Number);
    setDay(new Date(y, m - 1, d));
  }, [value, zone]);

  const keys = [...byDay.keys()].sort();
  const parse = (k: string) => {
    const [y, m, d] = k.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const times = day ? (byDay.get(dayKeyLocal(day)) ?? []).slice().sort() : [];
  const fmtTime = (iso: string) =>
    new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
  const endTime = (iso: string) => fmtTime(new Date(Date.parse(iso) + durationMinutes * 60000).toISOString());

  if (!keys.length) {
    return <p className="text-sm text-muted-foreground">No open times right now. Please check back soon, or email us.</p>;
  }

  return (
    <div className="scheduler grid gap-4 md:grid-cols-[auto_1fr]">
      <div>
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
          <CalendarDays className="size-4 text-[var(--sched-accent)]" aria-hidden="true" /> Pick a day
        </span>
        <div className="rounded-2xl border border-[var(--sched-accent)]/30 bg-[var(--sched-panel)] p-2">
          <DayPicker
            mode="single"
            selected={day}
            onSelect={(d) => {
              setDay(d);
              if (value && d && dayKeyInZone(value, zone) !== dayKeyLocal(d)) onChange(null);
            }}
            disabled={(d) => !byDay.has(dayKeyLocal(d))}
            defaultMonth={parse(keys[0])}
            startMonth={parse(keys[0])}
            endMonth={parse(keys[keys.length - 1])}
          />
        </div>
      </div>
      <div>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
            <Clock className="size-4 text-[var(--sched-accent)]" aria-hidden="true" /> Pick a time
          </span>
          <select
            className="sched-select"
            value={value ?? ""}
            disabled={!day}
            onChange={(e) => onChange(e.target.value || null)}
            aria-label="Pick a time"
          >
            <option value="">{day ? "Choose a time…" : "Choose a day first"}</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {fmtTime(t)} to {endTime(t)}
              </option>
            ))}
          </select>
        </label>
        {value && (
          <p className="mt-3 rounded-xl border border-[var(--sched-accent)]/30 bg-[var(--sched-panel)] p-3 text-sm">
            <strong>Your call:</strong> {formatSlot(value, zone)}
          </p>
        )}
      </div>
    </div>
  );
}
