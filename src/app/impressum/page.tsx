'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4">Dawid Faith</p>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-10">
          Impressum
        </h1>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-10" />

        <div className="space-y-10 text-stone-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-white mb-3">Angaben gemäß § 5 TMG</h2>
            <p>
              <strong className="text-white">Dawid Chojna</strong><br />
              Saline 9<br />
              18334 Bad Sülze<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Kontakt</h2>
            <p>
              E-Mail: dawid.faith@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              Dawid Chojna<br />
              Saline 9<br />
              18334 Bad Sülze
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Unsere E-Mail-Adresse findest du oben unter &bdquo;Kontakt&ldquo;.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
              Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
              Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter (z. B. Bandcamp, Spotify, D.FAITH Webapp),
              auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch
              keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Urheberrecht</h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>

        <div className="mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8" />
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all"
          >
            Zur Startseite
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
