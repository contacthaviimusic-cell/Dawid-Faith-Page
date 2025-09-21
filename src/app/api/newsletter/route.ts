import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

const BLOB_FILENAME = 'newsletter-subscribers.json';

async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    // List all blobs to find our newsletter file
    const { blobs } = await list({ prefix: BLOB_FILENAME });
    
    if (blobs.length === 0) {
      console.log('No newsletter subscribers found, returning empty array');
      return [];
    }

    // Get the latest blob
    const latestBlob = blobs[0];
    const response = await fetch(latestBlob.url);
    
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    }
    
    console.log('Failed to fetch blob data, returning empty array');
    return [];
  } catch (error) {
    console.log('Error in getNewsletterSubscribers, starting fresh:', error);
    return [];
  }
}

async function saveNewsletterSubscribers(subscribers: NewsletterSubscriber[]): Promise<void> {
  try {
    console.log('Attempting to save newsletter subscribers:', subscribers.length);
    const blob = await put(BLOB_FILENAME, JSON.stringify(subscribers, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
    console.log('Newsletter data saved to Vercel Blob successfully:', blob.url);
  } catch (error) {
    console.error('Error saving to Vercel Blob:', error);
    throw new Error(`Failed to save newsletter data: ${error}`);
  }
}

export async function GET() {
  try {
    const subscribers = await getNewsletterSubscribers();
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Newsletter POST request received');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { email } = body;

    if (!email) {
      console.log('Missing email in request');
      return NextResponse.json(
        { error: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    console.log('Getting existing subscribers...');
    const subscribers = await getNewsletterSubscribers();
    console.log('Current subscribers count:', subscribers.length);

    // Check if email already exists
    const existingSubscriber = subscribers.find((sub: NewsletterSubscriber) => sub.email.toLowerCase() === email.toLowerCase());
    if (existingSubscriber) {
      console.log('Email already exists:', email);
      return NextResponse.json(
        { error: 'Diese E-Mail-Adresse ist bereits angemeldet' },
        { status: 409 }
      );
    }

    // Create new subscriber
    const newSubscriber: NewsletterSubscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase().trim(),
      subscribedAt: new Date().toISOString(),
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    subscribers.push(newSubscriber);
    console.log('Saving updated subscribers list...');
    await saveNewsletterSubscribers(subscribers);

    console.log('New newsletter subscriber added successfully:', newSubscriber.email);

    return NextResponse.json(
      { 
        message: 'Erfolgreich für den Newsletter angemeldet!',
        subscriber: {
          id: newSubscriber.id,
          email: newSubscriber.email,
          subscribedAt: newSubscriber.subscribedAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in POST /api/newsletter:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Newsletter-Anmeldung', debug: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      );
    }

    const subscribers = await getNewsletterSubscribers();
    const updatedSubscribers = subscribers.filter((sub: NewsletterSubscriber) => sub.email.toLowerCase() !== email.toLowerCase());

    if (subscribers.length === updatedSubscribers.length) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse nicht gefunden' },
        { status: 404 }
      );
    }

    await saveNewsletterSubscribers(updatedSubscribers);

    return NextResponse.json(
      { message: 'Newsletter-Abonnement erfolgreich entfernt' }
    );

  } catch (error) {
    console.error('Error removing newsletter subscriber:', error);
    return NextResponse.json(
      { error: 'Fehler beim Entfernen des Newsletter-Abonnements' },
      { status: 500 }
    );
  }
}