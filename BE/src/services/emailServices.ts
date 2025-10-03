import { Resend } from "resend";
import { generateMailTemplate } from "../templates/mails";

const resendClient = new Resend(process?.env?.STRIPE_API_KEY);

export async function sendMail({
  from = "Agzakhana <onboarding@resend.dev>",
  to,
  subject,
  html,
}: {
  from?: string;
  to: string[];
  subject: string;
  html: string;
}) {
  await resendClient.emails.send({
    from,
    to,
    subject,
    html,
  });
}
