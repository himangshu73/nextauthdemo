import { createTransport, Transporter } from "nodemailer";
import { SentMessageInfo } from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  otp?: string;
  otpExpiry?: Date;
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
    const expiryTime = options.otpExpiry
      ? new Date(options.otpExpiry).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

    const htmlWithOTP = options.otp
      ? `${options.html}
         <p>Your verification code: <strong>${options.otp}</strong></p>
         <p>This code expires at: ${expiryTime}</p>`
      : options.html;

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
