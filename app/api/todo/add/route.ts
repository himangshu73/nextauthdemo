import TaskModel from "@/model/tasks";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user._id;

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 500 }
    );
  }

  await dbConnect();

  try {
    const { task } = await request.json();

    const newTask = new TaskModel({
      task,
      user: userId,
    });
    await newTask.save();

    return NextResponse.json(
      {
        success: true,
        message: "Task added successfully",
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
