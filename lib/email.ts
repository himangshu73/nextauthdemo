import { createTransport, Transporter } from "nodemailer";
import { SentMessageInfo } from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter: Transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmail = async (
  options: EmailOptions
): Promise<SentMessageInfo> => {
  try {
    const info = await transporter.sendMail({
      from: `"Himangshu XYZ" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
