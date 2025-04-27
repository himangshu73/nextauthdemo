import ItemModel from "@/model/item";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { itemId } = await request.json();
  await dbConnect();

  try {
    const deletedItem = await ItemModel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return NextResponse.json(
        {
          success: false,

          message: "No Item Found",
        },
        { status: 501 }
      );
    }
    return NextResponse.json(
      {
        success: true,

        message: "Item Deleted successfully",
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
