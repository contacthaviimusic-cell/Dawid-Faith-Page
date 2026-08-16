'use client';

import Image from 'next/image';

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

interface CoverMediaProps {
  src: string;
  alt: string;
  className?: string;
}

// Rendert ein Cover als Bild oder, falls die Datei ein Video ist (z.B. ein
// animiertes "GIF"-Cover als mp4), als lautlos loopendes Video – für alle
// Stellen, die bisher ein statisches <Image fill> als Cover genutzt haben.
export default function CoverMedia({ src, alt, className }: CoverMediaProps) {
  if (VIDEO_EXT.test(src)) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full ${className ?? ''}`}
      />
    );
  }
  return <Image src={src} alt={alt} fill className={className} />;
}
