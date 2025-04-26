import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ItemModel from "@/model/item";
import mongoose from "mongoose";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user._id;
  console.log(userId);

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 501 }
    );
  }

  await dbConnect();

  try {
    const now = new Date();

    const startOfDay = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
    );
    const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));

    console.log(startOfDay, startOfMonth, startOfYear);

    const stats = await ItemModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $facet: {
          today: [
            { $match: { createdAt: { $gte: startOfDay } } },
            { $group: { _id: null, total: { $sum: "$price" } } },
          ],
          month: [
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $group: { _id: null, total: { $sum: "$price" } } },
          ],
          year: [
            { $match: { createdAt: { $gte: startOfYear } } },
            { $group: { _id: null, total: { $sum: "$price" } } },
          ],
        },
      },
      {
        $project: {
          today: { $ifNull: [{ $arrayElemAt: ["$today.total", 0] }, 0] },
          month: { $ifNull: [{ $arrayElemAt: ["$month.total", 0] }, 0] },
          year: { $ifNull: [{ $arrayElemAt: ["$year.total", 0] }, 0] },
        },
      },
    ]);

    return NextResponse.json(
      { success: true, message: "Stats are ready.", data: stats[0] },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching stats",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
