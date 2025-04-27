import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ItemModel from "@/model/item";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user._id;

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
    const items = await ItemModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    const filteredItems = items.map((item) => ({
      itemName: item.itemName,
      price: item.price,
      quantity: item.quantity,
      unit:item.unit,
      createdAt: new Date(item.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "numeric",
        year: "numeric",
      }),
    }));
    return NextResponse.json(
      {
        success: true,
        message: "Items fetched successfully.",
        data: filteredItems,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching item list",
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
