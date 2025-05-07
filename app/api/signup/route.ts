import dbConnect from "@/utils/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { verificationEmail } from "@/lib/emailTemplates";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { name, email, password } = await request.json();

    const existingUser = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "Email is already registered and verified",
          },
          { status: 500 }
        );
      } else {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setHours(otpExpiry.getHours() + 1);

        existingUser.otp = otp;
        existingUser.otpExpiry = otpExpiry;
        await existingUser.save();
        sendEmail({
          to: email,
          subject: "Welcome Back to Himangshu.xyz",
          html: verificationEmail(name, otp, otpExpiry),
        });
        return NextResponse.json({
          success: true,
          message: "Email already registered. OTP sent to mail.",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date();
    otpExpiry.setHours(otpExpiry.getHours() + 1);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      otp: verifyCode,
      otpExpiry,
    });

    await newUser.save();
    sendEmail({
      to: email,
      subject: "Welcome to Himangshu.xyz",
      html: verificationEmail(name, verifyCode, otpExpiry),
    });
    return NextResponse.json(
      {
        success: true,
        message: "Signup Successfull. Please verify your email.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Registering New User", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering new user",
      },
      { status: 500 }
    );
  }
}
