import dbConnect from "@/utils/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { name, email, password } = await request.json();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered with this email",
        },
        { status: 500 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return NextResponse.json(
        {
          success: true,
          message: "Signup Successfull",
        },
        { status: 200 }
      );
    }
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
