import TaskModel from "@/model/tasks";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const { taskId, isCompleted } = await request.json();
  await dbConnect();

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { isCompleted },
      { new: true }
    );
    return NextResponse.json(
      {
        success: true,
        task: updatedTask,
        message: "Task updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating task",
      },
      { status: 500 }
    );
  }
}
