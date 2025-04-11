import TaskModel from "@/model/tasks";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const tasks = await TaskModel.find();
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
