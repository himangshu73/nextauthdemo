import mongoose, { Schema, Document, Types } from "mongoose";

export interface Tasks extends Document {
  task: string;
  isCompleted: boolean;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema<Tasks> = new Schema(
  {
    task: {
      type: String,
      required: [true, "Task is required"],
      minLength: 2,
      maxLength: 50,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel =
  (mongoose.models.Task as mongoose.Model<Tasks>) ||
  mongoose.model<Tasks>("Task", taskSchema);

export default TaskModel;
