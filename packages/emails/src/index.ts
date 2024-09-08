import { CreateEmailOptions } from 'resend';
import { resend } from './resend';

export const sendEmail = async ({
  email,
  subject,
  from,
  bcc,
  replyToFromEmail,
  text,
  react,
  scheduledAt,
  marketing,
}: Omit<CreateEmailOptions, 'to' | 'from'> & {
  email: string;
  from?: string;
  replyToFromEmail?: boolean;
  marketing?: boolean;
}) => {
  if (process.env.NODE_ENV === 'development' && !resend) {
    // Set up a fake email client for development
    console.info(`Email to ${email} with subject ${subject} send from ${from || process.env.NEXT_PUBLIC_APP_NAME}`);
    return Promise.resolve();
  } else if (!resend) {
    console.error(`Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.`);
    return Promise.resolve();
  }

  return resend.emails.send({
    to: email,
    from: from || (marketing ? 'Josh from Logicate <josh@logicate.jfstech.uk' : 'Logicate <system@logicate.jfstech.uk>'),
    bcc: bcc,
    ...(!replyToFromEmail && {
      replyTo: 'support@logicate.jfstech.uk',
    }),
    subject,
    text,
    react,
    scheduledAt,
    ...(marketing && {
      headers: {
        // TODO: Configure this link
        'List-Unsubscribe': 'https://logicate.com/account/settings',
      },
    }),
  });
};
