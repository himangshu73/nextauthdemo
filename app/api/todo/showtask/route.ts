import TaskModel from "@/model/tasks";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user._id;
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
    const tasks = await TaskModel.find({
      user: userId,
      isCompleted: false,
    }).sort({ createdAt: -1 });
    const completedTasks = await TaskModel.find({
      user: userId,
      isCompleted: true,
    }).sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        tasks: tasks,
        completedTasks: completedTasks,
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
