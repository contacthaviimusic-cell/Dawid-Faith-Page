import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { isAdminAuthenticated } from '@/lib/adminSession';

// Erzeugt clientseitig ein kurzlebiges Upload-Token, damit die Datei direkt
// vom Browser zu Vercel Blob hochgeladen wird – umgeht so das ~4.5MB-Limit
// für den Request-Body von Vercel Functions, das beim serverseitigen Upload
// (alte Route /api/upload) größere Dateien (z.B. Song-MP3s) fehlschlagen ließ.

const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const allowedVideoTypes = ['video/mp4', 'video/webm'];
const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/x-m4a', 'audio/m4a'];

export async function POST(request: Request): Promise<NextResponse> {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const isVideo = pathname.startsWith('teaser-videos/');
        const isAudio = pathname.startsWith('song-files/');
        const maximumSizeInBytes = isVideo ? 25 * 1024 * 1024 : isAudio ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
        return {
          allowedContentTypes: [...allowedImageTypes, ...allowedVideoTypes, ...allowedAudioTypes],
          addRandomSuffix: false,
          maximumSizeInBytes,
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload fehlgeschlagen' },
      { status: 400 }
    );
  }
}
