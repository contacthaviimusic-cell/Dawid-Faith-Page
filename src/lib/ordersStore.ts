import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { put, head, BlobNotFoundError } from '@vercel/blob';

export interface PreorderOrder {
  id: string;
  songId: string;
  email: string;
  downloadToken: string;
  lemonOrderId: string;
  createdAt: string;
  deliveredAt: string | null;
}

const BLOB_PATHNAME = 'data/orders.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'orders.json');

function isBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// ── Vercel Blob helpers ──────────────────────────────────────────────────────

async function readFromBlob(): Promise<PreorderOrder[]> {
  try {
    const blob = await head(BLOB_PATHNAME);
    const res = await fetch(`${blob.downloadUrl}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return (await res.json()) as PreorderOrder[];
  } catch (e) {
    if (e instanceof BlobNotFoundError) return [];
    return [];
  }
}

async function writeToBlob(entries: PreorderOrder[]): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

// ── Local file-system helpers ────────────────────────────────────────────────

async function readFromFile(): Promise<PreorderOrder[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, 'utf8');
    return JSON.parse(raw) as PreorderOrder[];
  } catch {
    return [];
  }
}

async function writeToFile(entries: PreorderOrder[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

// ── Unified read / write ─────────────────────────────────────────────────────

async function readAll(): Promise<PreorderOrder[]> {
  return isBlob() ? await readFromBlob() : await readFromFile();
}

async function writeAll(entries: PreorderOrder[]): Promise<void> {
  if (isBlob()) {
    await writeToBlob(entries);
  } else {
    await writeToFile(entries);
  }
}

// ── API ──────────────────────────────────────────────────────────────────────

export async function getAllOrders(): Promise<PreorderOrder[]> {
  return readAll();
}

export async function findOrderByToken(token: string): Promise<PreorderOrder | null> {
  const entries = await readAll();
  return entries.find((o) => o.downloadToken === token) ?? null;
}

export async function findOrderByLemonId(lemonOrderId: string): Promise<PreorderOrder | null> {
  const entries = await readAll();
  return entries.find((o) => o.lemonOrderId === lemonOrderId) ?? null;
}

export async function createOrder(
  songId: string,
  email: string,
  lemonOrderId: string
): Promise<PreorderOrder> {
  const entries = await readAll();
  const order: PreorderOrder = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    songId,
    email,
    downloadToken: crypto.randomBytes(24).toString('hex'),
    lemonOrderId,
    createdAt: new Date().toISOString(),
    deliveredAt: null,
  };
  entries.unshift(order);
  await writeAll(entries);
  return order;
}

export async function markDelivered(id: string): Promise<void> {
  const entries = await readAll();
  const idx = entries.findIndex((o) => o.id === id);
  if (idx === -1) return;
  entries[idx].deliveredAt = new Date().toISOString();
  await writeAll(entries);
}
