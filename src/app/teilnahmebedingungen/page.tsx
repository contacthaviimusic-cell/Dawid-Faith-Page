'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function TeilnahmebedingungenPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4">Dawid Faith</p>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-10">
          Teilnahmebedingungen Presave-Gewinnspiel
        </h1>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-10" />

        <div className="space-y-10 text-stone-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-white mb-3">1. Veranstalter</h2>
            <p>
              Veranstalter des Gewinnspiels ist:<br />
              <strong className="text-white">[BITTE AUSFÜLLEN: Vollständiger Name / Firmierung]</strong><br />
              [BITTE AUSFÜLLEN: Straße, Hausnummer]<br />
              [BITTE AUSFÜLLEN: PLZ, Ort]<br />
              E-Mail: dawid.faith@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">2. Teilnahmeberechtigung</h2>
            <p>
              Teilnahmeberechtigt sind natürliche Personen ab 18 Jahren mit Wohnsitz in Deutschland, Österreich, der Schweiz
              oder Polen. Mitarbeiter des Veranstalters sowie deren Angehörige sind von der Teilnahme ausgeschlossen.
              Pro Person ist nur eine Teilnahme je Song zulässig (erkennbar an der angegebenen E-Mail-Adresse).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">3. Teilnahmezeitraum</h2>
            <p>
              Das Gewinnspiel läuft jeweils ab Veröffentlichung der Countdown-/Pre-Order-Seite eines Songs bis zum
              offiziellen Audio-Release dieses Songs (siehe Countdown auf der jeweiligen Pre-Order-Seite,
              z. B. dawidfaith.de/pre-order/katze). Nach Ablauf dieses Zeitraums ist eine Teilnahme für den
              betreffenden Song nicht mehr möglich.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">4. Teilnahmevoraussetzungen</h2>
            <p>Um teilzunehmen, muss der Fan:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li>auf der jeweiligen Pre-Order-Seite eine gültige E-Mail-Adresse im Presave-Formular hinterlegen,</li>
              <li>der Nutzung dieser E-Mail-Adresse für die Gewinnspielteilnahme zustimmen (Checkbox),</li>
              <li>den daraufhin per E-Mail zugesendeten persönlichen Presave-Link öffnen und darüber den Song presaven.</li>
            </ul>
            <p className="mt-3">
              Die Teilnahme gilt erst als vollständig, wenn der persönliche Link nachweislich geöffnet wurde. Das bloße
              Absenden der E-Mail-Adresse allein berechtigt noch nicht zur Teilnahme an der Gewinnerziehung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">5. Gewinn</h2>
            <p>Zu gewinnen gibt es pro Gewinnspiel:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li>1× Mythic-NFT aus den D.FAITH Collectibles (limitierte, seltenheitsgestufte Song-Karte)</li>
              <li>[BITTE AUSFÜLLEN: Anzahl] D.FAITH Token</li>
            </ul>
            <p className="mt-3">
              Der Gewinn wird dem Gewinner/der Gewinnerin in dessen/deren D.FAITH-Webapp-Wallet gutgeschrieben. Eine
              Barauszahlung oder ein Umtausch des Gewinns ist ausgeschlossen. Der Rechtsweg ist ausgeschlossen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">6. Ermittlung des Gewinners</h2>
            <p>
              Unter allen gültigen Teilnahmen (siehe Punkt 4) wird nach Ablauf des Teilnahmezeitraums der Gewinner/die
              Gewinnerin per Zufallsprinzip (Losverfahren) ermittelt. Die Benachrichtigung erfolgt per E-Mail an die
              angegebene Adresse innerhalb von 14 Tagen nach Ende des Teilnahmezeitraums. Meldet sich der Gewinner/die
              Gewinnerin nicht innerhalb von 14 Tagen nach Benachrichtigung, verfällt der Gewinnanspruch und es wird
              erneut ausgelost.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">7. Ausschluss</h2>
            <p>
              Der Veranstalter behält sich vor, Teilnehmer bei Verdacht auf Manipulation (z. B. Verwendung mehrerer
              E-Mail-Adressen derselben Person, automatisierte Anmeldungen) von der Teilnahme auszuschließen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">8. Datenschutz</h2>
            <p>
              Im Rahmen der Teilnahme wird die angegebene E-Mail-Adresse verarbeitet, um (a) den persönlichen
              Presave-Link zuzusenden, (b) die Teilnahme am Gewinnspiel zu ermöglichen und (c) den Gewinner/die
              Gewinnerin zu benachrichtigen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung/-erfüllung
              im Rahmen der Gewinnspielteilnahme). Die Daten werden nach Abschluss des jeweiligen Gewinnspiels und
              Versand des Gewinns gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Eine
              Weitergabe an Dritte erfolgt nicht, mit Ausnahme des E-Mail-Versanddienstleisters, der zur technischen
              Zustellung der E-Mails eingesetzt wird. Es besteht jederzeit das Recht auf Auskunft, Berichtigung und
              Löschung der gespeicherten Daten durch formlose Nachricht an dawid.faith@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">9. Schlussbestimmungen</h2>
            <p>
              Der Veranstalter behält sich vor, das Gewinnspiel bei Vorliegen eines wichtigen Grundes vorzeitig zu
              beenden. Es gilt deutsches Recht. Sollte eine Bestimmung dieser Teilnahmebedingungen unwirksam sein,
              bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
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
