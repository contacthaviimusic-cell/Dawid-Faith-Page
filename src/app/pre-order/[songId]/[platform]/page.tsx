import { redirect } from 'next/navigation';
import PreOrderPageClient from '@/components/PreOrderPageClient';
import { recordClick } from '@/lib/platformClicksStore';
import { PLATFORMS, type Platform } from '@/lib/platformSources';

export const dynamic = 'force-dynamic';

// Nutzt denselben Pfad wie die normale Pre-Order-Seite, nur mit Plattform als
// letztem Segment, z. B. https://dawidfaith.de/pre-order/katze/instagram –
// zählt den Klick serverseitig und zeigt danach direkt die Pre-Order-Seite.
export default async function PreOrderPlatformPage({
  params,
}: {
  params: Promise<{ songId: string; platform: string }>;
}) {
  const { songId, platform } = await params;

  if (!songId || !/^[\w-]+$/.test(songId)) {
    redirect('/');
  }
  if (!PLATFORMS.includes(platform as Platform)) {
    redirect(`/pre-order/${songId}`);
  }

  try {
    await recordClick(songId, platform as Platform);
  } catch (err) {
    console.error('[pre-order platform tracking]', err);
  }

  // Plattform-Links mit "-pl"/"-de"-Suffix (z. B. facebook-pl, facebook-de)
  // öffnen die Seite direkt in der jeweiligen Sprache, unabhängig von
  // gespeicherter Spracheinstellung.
  const forceLang = platform.endsWith('-pl') ? 'pl' : platform.endsWith('-de') ? 'de' : undefined;

  return <PreOrderPageClient skipWebsiteTracking forceLang={forceLang} />;
}
