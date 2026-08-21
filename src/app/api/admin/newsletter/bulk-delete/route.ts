import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { deleteSubscribersByEmails } from '@/lib/newsletterStore';

export const dynamic = 'force-dynamic';

// Entfernt mehrere Newsletter-Abonnenten auf einmal (z. B. Bounces aus dem
// Resend-Dashboard) in einem einzigen atomaren Schreibvorgang.
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { emails } = body;

  if (!Array.isArray(emails) || emails.length === 0) {
    return NextResponse.json({ error: 'emails muss ein nicht-leeres Array sein.' }, { status: 400 });
  }

  const { removed, notFound } = await deleteSubscribersByEmails(emails);
  return NextResponse.json({ removed, notFound, removedCount: removed.length, notFoundCount: notFound.length });
}
