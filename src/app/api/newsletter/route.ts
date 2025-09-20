import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const newsletterFilePath = path.join(process.cwd(), 'data', 'newsletter.json');

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const data = await fs.readFile(newsletterFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

async function saveNewsletterSubscribers(subscribers: NewsletterSubscriber[]): Promise<void> {
  await fs.writeFile(newsletterFilePath, JSON.stringify(subscribers, null, 2));
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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse ist erforderlich' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      );
    }

    const subscribers = await getNewsletterSubscribers();

    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (existingSubscriber) {
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
    await saveNewsletterSubscribers(subscribers);

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
    console.error('Error adding newsletter subscriber:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Newsletter-Anmeldung' },
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
    const updatedSubscribers = subscribers.filter(sub => sub.email.toLowerCase() !== email.toLowerCase());

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