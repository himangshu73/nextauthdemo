import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please use a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
