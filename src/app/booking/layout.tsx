import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dawid Faith – Booking & EPK | Slavischer Pop-Rock Live',
  description: 'Buche Dawid Faith für dein Event: Authentischer Slavischer Pop-Rock mit Akustik-Gitarre. Songs in Deutsch, Polnisch & Englisch. Solo-Künstler für Clubs, Festivals, Kneipen & private Events.',
  keywords: ['Dawid Faith', 'Booking', 'Live Musik', 'Slavischer Pop-Rock', 'Singer-Songwriter', 'Akustik', 'Deutsch', 'Polnisch', 'EPK', 'Electronic Press Kit'],
  openGraph: {
    title: 'Dawid Faith – Booking & EPK',
    description: 'Authentischer Slavischer Pop-Rock mit Akustik-Gitarre. Jetzt buchen für Clubs, Festivals & Events.',
    type: 'website',
    locale: 'de_DE',
    images: [
      {
        url: '/booking/pressefotos/Dawid Faith.jpg',
        width: 1200,
        height: 630,
        alt: 'Dawid Faith – Live Musiker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dawid Faith – Booking & EPK',
    description: 'Authentischer Slavischer Pop-Rock mit Akustik-Gitarre. Jetzt buchen.',
    images: ['/booking/pressefotos/Dawid Faith.jpg'],
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
