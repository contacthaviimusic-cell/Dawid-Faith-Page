import nodemailer from 'nodemailer';

export function createMailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendGiveawayEmail(
  email: string,
  songTitle: string,
  giveawayLink: string
): Promise<void> {
  const transporter = createMailTransporter();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #f59e0b;">
        <h1 style="margin: 0; font-size: 28px; color: #111;">Dawid Faith</h1>
        <p style="margin: 5px 0 0; color: #888; font-size: 14px;">Presave & Gewinnspiel</p>
      </div>
      <div style="padding: 30px 0;">
        <h2 style="color: #111; margin-top: 0;">Dein persönlicher Presave-Link</h2>
        <p style="line-height: 1.6; color: #555;">
          Danke für dein Interesse an <strong>„${songTitle}"</strong>! Klick auf den Button unten,
          um den Song zu presaven — damit nimmst du automatisch am Gewinnspiel teil.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${giveawayLink}" style="display: inline-block; background: #f59e0b; color: #000; font-weight: bold; padding: 14px 28px; border-radius: 999px; text-decoration: none;">
            🎵 Jetzt presaven & teilnehmen
          </a>
        </div>
        <p style="line-height: 1.6; color: #555; font-size: 13px;">
          Dieser Link ist persönlich für dich – bitte nicht weitergeben.
        </p>
        <p style="line-height: 1.6; color: #555;">
          Herzliche Grüße,<br/>
          <strong>Dawid Faith</strong>
        </p>
      </div>
      <div style="border-top: 1px solid #eee; padding: 20px 0; text-align: center; color: #aaa; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Dawid Faith</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Dawid Faith" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Dein Presave-Link für „${songTitle}" – Gewinnspiel-Teilnahme`,
    html,
  });
}
