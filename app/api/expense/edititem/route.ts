import ItemModel from "@/model/item";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  await dbConnect();

  const { itemId, itemName, quantity, unit, price } = await request.json();

  if (!itemId) {
    return NextResponse.json(
      { success: false, message: "Item id is required." },
      { status: 501 }
    );
  }
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      { itemName, quantity, unit, price },
      { new: true }
    );
    if (!updatedItem) {
      return NextResponse.json(
        { success: false, message: "Item not found." },
        { status: 501 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        item: updatedItem,
        message: "Item updated successfully",
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
