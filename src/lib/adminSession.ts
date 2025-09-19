import { cookies } from 'next/headers';
import crypto from 'node:crypto';

const COOKIE_NAME = 'df_admin';

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return !!token && token === expectedAdminCookie();
}

export async function getAdminCookieValue() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export function expectedAdminCookie() {
  const secret = process.env.ADMIN_SECRET || '';
  const hash = crypto.createHash('sha256').update(secret).digest('hex');
  return `ok-${hash}`;
}