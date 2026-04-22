import fs from 'node:fs/promises';
import path from 'node:path';

export interface OutreachEntry {
  id: string;
  label: string;
  sentTo: string;
  note: string;
  createdAt: string;
  clicks: number;
  firstClickAt: string | null;
  lastClickAt: string | null;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'outreach.json');

async function readAll(): Promise<OutreachEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw) as OutreachEntry[];
  } catch {
    return [];
  }
}

async function writeAll(entries: OutreachEntry[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

export async function getAllOutreach(): Promise<OutreachEntry[]> {
  return readAll();
}

export async function createOutreach(
  label: string,
  sentTo: string,
  note: string
): Promise<OutreachEntry> {
  const entries = await readAll();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const entry: OutreachEntry = {
    id,
    label,
    sentTo,
    note,
    createdAt: new Date().toISOString(),
    clicks: 0,
    firstClickAt: null,
    lastClickAt: null,
  };
  entries.unshift(entry);
  await writeAll(entries);
  return entry;
}

export async function recordClick(id: string): Promise<boolean> {
  const entries = await readAll();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  const now = new Date().toISOString();
  entries[idx].clicks += 1;
  if (!entries[idx].firstClickAt) entries[idx].firstClickAt = now;
  entries[idx].lastClickAt = now;
  await writeAll(entries);
  return true;
}

export async function deleteOutreach(id: string): Promise<boolean> {
  const entries = await readAll();
  const filtered = entries.filter((e) => e.id !== id);
  if (filtered.length === entries.length) return false;
  await writeAll(filtered);
  return true;
}
