import mongoose, { Schema, Document, Types } from "mongoose";

export interface Items extends Document {
  itemName: string;
  quantity: number;
  unit: string;
  price: number;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema: Schema<Items> = new Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item is required"],
      minLength: 2,
      maxLength: 20,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Must be positive"],
    },
    unit: {
      type: String,
      required: [true, "Unit is required"],
      enum: ["KG", "LTR", "PC"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Must be positive"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ItemModel =
  (mongoose.models.Item as mongoose.Model<Items>) ||
  mongoose.model<Items>("Item", itemSchema);

export default ItemModel;
