/**
 * Client-side .ics generation. No external dependencies, no server.
 * Generates a single VEVENT or a VCALENDAR with multiple VEVENTs.
 */

export interface CalendarEvent {
  uid: string;            // stable unique id (e.g. "arts-tax-deadline-2026")
  title: string;
  description?: string;
  url?: string;
  /** ISO date YYYY-MM-DD for an all-day event, or full ISO datetime */
  date: string;
  /** Reminders before the event, in days */
  remindersDays?: number[];
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function fmtDate(iso: string): string {
  // Convert YYYY-MM-DD to YYYYMMDD for VALUE=DATE all-day events
  return iso.replace(/-/g, '').slice(0, 8);
}

function nowStamp(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

function escapeText(s: string): string {
  // RFC 5545: escape backslash, semicolon, comma; replace newlines with \\n
  return s
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function fold(line: string): string {
  // RFC 5545: lines should be folded at 75 octets.
  if (line.length <= 75) return line;
  const out: string[] = [];
  let i = 0;
  while (i < line.length) {
    const chunk = line.slice(i, i + 75);
    out.push((i === 0 ? '' : ' ') + chunk);
    i += 75;
  }
  return out.join('\r\n');
}

function eventLines(ev: CalendarEvent): string[] {
  const dateStamp = fmtDate(ev.date);
  // For an all-day event in the future, date stamp + DTEND day after.
  const d = new Date(ev.date + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + 1);
  const endStamp = `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;

  const lines: string[] = [
    'BEGIN:VEVENT',
    `UID:${ev.uid}@pdx-taxes.bjamba.github.io`,
    `DTSTAMP:${nowStamp()}`,
    `DTSTART;VALUE=DATE:${dateStamp}`,
    `DTEND;VALUE=DATE:${endStamp}`,
    `SUMMARY:${escapeText(ev.title)}`,
  ];
  if (ev.description) lines.push(`DESCRIPTION:${escapeText(ev.description)}`);
  if (ev.url) lines.push(`URL:${ev.url}`);

  for (const days of ev.remindersDays ?? []) {
    lines.push(
      'BEGIN:VALARM',
      `TRIGGER:-P${days}D`,
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeText(ev.title)}`,
      'END:VALARM',
    );
  }

  lines.push('END:VEVENT');
  return lines;
}

export function buildICS(events: CalendarEvent[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//pdx-taxes//community resource//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  for (const ev of events) {
    lines.push(...eventLines(ev));
  }
  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}

export function downloadICS(filename: string, events: CalendarEvent[]) {
  const ics = buildICS(events);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
