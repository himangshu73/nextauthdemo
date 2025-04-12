import TaskModel from "@/model/tasks";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { taskId } = await request.json();
  await dbConnect();

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return NextResponse.json(
        {
          success: false,

          message: "No Task Found",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,

        message: "Task Deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting task",
      },
      { status: 500 }
    );
  }
}
