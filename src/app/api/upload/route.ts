import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminSession';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Hilfsfunktion zur Bestimmung ob wir Vercel Blob nutzen sollten
function shouldUseBlob(): boolean {
  return process.env.NODE_ENV === 'production' && !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function POST(request: NextRequest) {
  try {
    // Admin-Authentifizierung prüfen
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validierung der Dateierweiterung
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/webm'];
    const isVideo = allowedVideoTypes.includes(file.type);
    const isImage = allowedImageTypes.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, WebP, GIF, MP4, and WebM are allowed.'
      }, { status: 400 });
    }

    // Dateigröße validieren (Bilder max 5MB, Videos max 25MB)
    const maxSize = isVideo ? 25 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({
        error: `File too large. Maximum size is ${isVideo ? '25MB' : '5MB'}.`
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (shouldUseBlob()) {
      // Vercel Blob Storage für Produktion
      try {
        const filename = `${isVideo ? 'teaser-videos' : 'news-images'}/${Date.now()}-${file.name}`;
        const blob = await put(filename, buffer, {
          access: 'public',
          contentType: file.type,
        });

        return NextResponse.json({
          success: true,
          url: blob.url,
          filename: filename
        });
      } catch (error) {
        console.error('Blob upload error:', error);
        return NextResponse.json({ 
          error: 'Failed to upload to blob storage' 
        }, { status: 500 });
      }
    } else {
      // Lokaler Dateispeicher für Entwicklung
      try {
        const uploadsDir = join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadsDir, { recursive: true });

        const filename = `${Date.now()}-${file.name}`;
        const filepath = join(uploadsDir, filename);
        
        await writeFile(filepath, buffer);

        const publicUrl = `/uploads/${filename}`;
        
        return NextResponse.json({
          success: true,
          url: publicUrl,
          filename: filename
        });
      } catch (error) {
        console.error('Local file upload error:', error);
        return NextResponse.json({ 
          error: 'Failed to save file locally' 
        }, { status: 500 });
      }
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}