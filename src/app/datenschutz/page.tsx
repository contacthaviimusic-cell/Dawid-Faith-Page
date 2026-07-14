'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4">Dawid Faith</p>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-10">
          Datenschutzerklärung
        </h1>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-10" />

        <div className="space-y-10 text-stone-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-white mb-3">1. Verantwortlicher</h2>
            <p>
              Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:<br />
              <strong className="text-white">Dawid Chojna</strong><br />
              Saline 9<br />
              18334 Bad Sülze<br />
              E-Mail: dawid.faith@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">2. Allgemeines zur Datenverarbeitung</h2>
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
              Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
              Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung des Nutzers oder, sofern eine Einholung
              der Einwilligung nicht möglich ist und die Verarbeitung gesetzlich gestattet ist, auf Grundlage
              berechtigter Interessen (Art. 6 Abs. 1 lit. a, b und f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">3. Hosting</h2>
            <p>
              Diese Website wird bei <strong className="text-white">Vercel Inc.</strong>, 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA, gehostet. Beim Aufruf der Website erfasst Vercel automatisiert
              technische Zugriffsdaten (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
              Browsertyp) in sogenannten Server-Logfiles. Diese Verarbeitung erfolgt auf Grundlage unseres
              berechtigten Interesses an einer sicheren und stabilen Bereitstellung der Website
              (Art. 6 Abs. 1 lit. f DSGVO). Da Vercel Inc. ihren Sitz in den USA hat, kann es zu einer
              Datenübermittlung in ein Drittland kommen; Vercel verpflichtet sich vertraglich zur Einhaltung
              der EU-Standardvertragsklauseln.
            </p>
            <p className="mt-3">
              Dateien, die über das Admin-Panel hochgeladen werden (z. B. Cover-Bilder, Video-Teaser), sowie die
              Newsletter-, Gewinnspiel- und Bestelldaten werden über <strong className="text-white">Vercel Blob
              Storage</strong> gespeichert, ebenfalls bei Vercel Inc. (USA) gehostet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">4. Cookies und lokaler Speicher</h2>
            <p>
              Diese Website verwendet keine Tracking- oder Marketing-Cookies. Zur Speicherung deiner gewählten
              Sprache (Deutsch/Englisch/Polnisch) wird der lokale Speicher deines Browsers (Local Storage)
              genutzt – diese Information verlässt deinen Browser nicht und wird nicht an uns übermittelt.
              Im geschützten Admin-Bereich wird ein technisch notwendiges Session-Cookie gesetzt, das
              ausschließlich der Authentifizierung des Website-Betreibers dient (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">5. Kontakt- und Booking-Formular</h2>
            <p>
              Bei Nutzung des Booking-Formulars werden die von dir eingegebenen Daten (Name, E-Mail-Adresse,
              Art der Veranstaltung, Datum, Ort, Nachricht) verarbeitet, um deine Anfrage zu bearbeiten und dir
              zu antworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen). Die
              Daten werden per E-Mail an uns übermittelt und nur so lange gespeichert, wie es zur Bearbeitung
              deiner Anfrage erforderlich ist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">6. Newsletter</h2>
            <p>
              Wenn du dich für unseren Newsletter anmeldest, speichern wir deine E-Mail-Adresse sowie – zu
              Nachweiszwecken – die IP-Adresse und den User-Agent deines Browsers zum Zeitpunkt der Anmeldung.
              Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst deine Einwilligung
              jederzeit mit Wirkung für die Zukunft widerrufen, indem du dich über den Abmeldelink in unseren
              E-Mails oder per formloser Nachricht an dawid.faith@gmail.com abmeldest.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">7. Presave-Gewinnspiel</h2>
            <p>
              Für die Teilnahme an unserem Presave-Gewinnspiel verarbeiten wir deine E-Mail-Adresse, um dir
              einen persönlichen Presave-Link zuzusenden und deine Teilnahme zu ermöglichen. Details hierzu
              findest du in den{' '}
              <Link href="/teilnahmebedingungen" className="text-amber-400 hover:underline">
                Teilnahmebedingungen
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">8. Pre-Order</h2>
            <p>
              Der Kauf von Musik-Vorbestellungen erfolgt über die Plattform Bandcamp. Für diesen Vorgang gelten
              die Datenschutzbestimmungen von Bandcamp Inc. Wir selbst erhalten hierbei keine
              Zahlungsinformationen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">9. Deine Rechte</h2>
            <p>Du hast jederzeit das Recht auf:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li>Auskunft über die zu deiner Person gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung deiner Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p className="mt-3">
              Wende dich hierzu formlos an dawid.faith@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">10. Speicherdauer</h2>
            <p>
              Sofern in dieser Erklärung keine speziellere Speicherdauer genannt wurde, verbleiben deine
              personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Gesetzliche
              Aufbewahrungspflichten bleiben unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">11. SSL-Verschlüsselung</h2>
            <p>
              Diese Website nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine verschlüsselte
              Verbindung erkennst du am Kürzel &bdquo;https://&ldquo; in der Adresszeile deines Browsers.
            </p>
          </section>

          <section>
            <p className="text-sm text-stone-500">Stand: Juli 2026</p>
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
