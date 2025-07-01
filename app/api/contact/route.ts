import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactFormEmail from "@/lib/emailTemplate/contactEmail";
import { render } from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    const emailHtml = await render(ContactFormEmail({ name, email, message }));

    await resend.emails.send({
      from: "Contact Form <contact@himangshu.xyz>",
      to: [process.env.EMAIL!],
      subject: `New message from ${name}`,
      html: emailHtml,
      text: `Name:${name}\nEmail:${email}\nMessage:${message}`,
    });

    return NextResponse.json(
      { success: true, message: "Message has been submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Error submitting message" },
      { status: 500 }
    );
  }
}
