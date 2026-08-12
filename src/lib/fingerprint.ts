// Leichtgewichtiges Geräte-Fingerprinting, rein client-seitig, ohne externe Library.
// Zweck: im Admin-Bereich erkennen, ob mehrere E-Mail-Adressen vom selben Gerät/Browser
// beim Presave-Gewinnspiel eingetragen wurden (Missbrauchserkennung). Kein Tracking über
// die Teilnahme hinaus, kein Consent-Banner-Pflichtfall, aber in der Datenschutzerklärung
// erwähnt.

function hashString(input: string): string {
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
}

function getCanvasSignature(): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 100, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('dfaith-fp 😀', 2, 2);
    ctx.strokeStyle = 'rgba(120,20,200,0.7)';
    ctx.strokeRect(10, 10, 150, 20);
    return canvas.toDataURL();
  } catch {
    return '';
  }
}

export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return '';
  try {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const signals = [
      navigator.userAgent,
      navigator.language,
      `${screen.width}x${screen.height}x${screen.colorDepth}`,
      String(new Date().getTimezoneOffset()),
      String(navigator.hardwareConcurrency || ''),
      String(nav.deviceMemory || ''),
      getCanvasSignature(),
    ].join('||');
    return hashString(signals);
  } catch {
    return '';
  }
}
