import mongoose, { Document, Schema, model, models } from 'mongoose';
import { Model } from 'mongoose';

export interface TaskDocument extends Document {
  description: string;
  rewardPoint: number;
  link: string;
  claimed?: boolean;
}

interface TaskModel extends Model<TaskDocument> {}

const taskSchema = new Schema<TaskDocument, TaskModel>(
  {
    description: {
      type: String,
      required: true,
    },
    rewardPoint: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    claimed: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

const Task = models.Task || model<TaskDocument, TaskModel>('Task', taskSchema);

export default Task;

