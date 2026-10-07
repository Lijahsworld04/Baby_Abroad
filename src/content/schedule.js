// When calls can be booked, and the time maths for it. Used by BOTH the website (the time picker)
// and the Cloudflare checkout code (which re-checks every time before taking payment).
//
// Availability is defined on Albania's clock (Europe/Tirane), so "9am to 10pm" stays correct
// when the clocks change in spring and autumn. Customers see times converted to their own timezone.

export const SCHEDULE = {
  zone: "Europe/Tirane",
  openHour: 9, // first call can start at 9:00
  closeHour: 22, // every call must be finished by 22:00
  stepMinutes: 90, // a new call can start every 90 minutes (1 hour call + 30 minute break)
  durationMinutes: 60,
  minNoticeMinutes: 120, // earliest bookable time is 2 hours from now
  windowDays: 60, // how far ahead people can book
};

/** Milliseconds that `zone` is ahead of UTC at the moment `utcMs`. */
function zoneOffsetMs(utcMs, zone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(utcMs);
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - utcMs;
}

/** Turn a wall-clock time in `zone` (e.g. 09:00 in Albania) into a real UTC timestamp. */
export function zonedToUtcMs(y, m, d, hh, mm, zone) {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let t = guess - zoneOffsetMs(guess, zone);
  const off2 = zoneOffsetMs(t, zone);
  t = guess - off2;
  return t;
}

/** Every bookable start time (as ISO strings in UTC) from now until the end of the booking window. */
export function allSlotStarts(nowMs = Date.now()) {
  const { zone, openHour, closeHour, stepMinutes, durationMinutes, minNoticeMinutes, windowDays } = SCHEDULE;
  // Today's date in Albania
  const todayParts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(nowMs)
      .map((x) => [x.type, x.value]),
  );
  const out = [];
  const earliest = nowMs + minNoticeMinutes * 60000;
  const latest = nowMs + windowDays * 86400000;
  for (let i = 0; i <= windowDays + 1; i++) {
    const day = new Date(Date.UTC(+todayParts.year, +todayParts.month - 1, +todayParts.day + i));
    const y = day.getUTCFullYear();
    const m = day.getUTCMonth() + 1;
    const d = day.getUTCDate();
    for (let mins = openHour * 60; mins + durationMinutes <= closeHour * 60; mins += stepMinutes) {
      const t = zonedToUtcMs(y, m, d, Math.floor(mins / 60), mins % 60, zone);
      if (t >= earliest && t <= latest) out.push(new Date(t).toISOString());
    }
  }
  return out;
}

/** True when two time ranges overlap. */
export const overlaps = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && bStart < aEnd;

/** Drop any start time that collides with a busy block (busy = [{ start, end }] ISO strings). */
export function freeSlots(starts, busy) {
  const blocks = (busy || []).map((b) => [Date.parse(b.start), Date.parse(b.end)]).filter(([a, b]) => a && b);
  const dur = SCHEDULE.durationMinutes * 60000;
  return starts.filter((iso) => {
    const s = Date.parse(iso);
    return !blocks.some(([a, b]) => overlaps(s, s + dur, a, b));
  });
}
