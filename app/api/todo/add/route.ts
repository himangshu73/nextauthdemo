import TaskModel from "@/model/tasks";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { task, userId } = await request.json();

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
