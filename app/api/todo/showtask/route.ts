import TaskModel from "@/model/tasks";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const userId = session?.user._id;
  console.log(userId);
  await dbConnect();

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found.",
      },
      { status: 500 }
    );
  }
  try {
    const tasks = await TaskModel.find({ user: userId });
    console.log(tasks);
    return NextResponse.json(
      {
        success: true,
        tasks,
        message: "Task fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error adding new task",
      },
      { status: 500 }
    );
  }
}
