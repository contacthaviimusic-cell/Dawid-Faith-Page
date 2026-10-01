import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

// Gemeinsamer Neon-Postgres-Client für alle Store-Module. Der serverless-
// Treiber spricht per HTTP/Fetch mit der DB (kein persistentes TCP), was zu
// kurzlebigen Vercel-Functions passt und das Verbindungslimit-Problem von
// klassischen Postgres-Treibern in Serverless-Umgebungen vermeidet.
//
// Lazy initialisiert: schlägt DATABASE_URL (noch) fehl, soll das erst beim
// tatsächlichen Abfragen eines einzelnen Requests auffliegen – nicht beim
// Modul-Import, was sonst die ganze App am Start crashen lassen könnte.
let client: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL ist nicht gesetzt.');
    }
    client = neon(url);
  }
  return client;
}

export const sql: NeonQueryFunction<false, false> = ((...args: Parameters<NeonQueryFunction<false, false>>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (getClient() as any)(...args)) as NeonQueryFunction<false, false>;
