import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import ItemModel from "@/model/item";

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
    const { itemName, quantity, unit, price } = await request.json();

    const capitalizedItemName =
      itemName.charAt(0).toUpperCase() + itemName.slice(1);

    const newItem = new ItemModel({
      itemName: capitalizedItemName,
      quantity,
      unit,
      price,
      user: userId,
    });
    await newItem.save();

    return NextResponse.json(
      {
        success: true,
        message: "Item added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error adding new item",
      },
      { status: 500 }
    );
  }
}
