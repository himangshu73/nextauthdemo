import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  dbConnect();
  return NextResponse.json(
    {
      message: "Connection Successful",
    },
    { status: 200 }
  );
}
