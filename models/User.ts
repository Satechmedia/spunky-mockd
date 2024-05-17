import mongoose, { Document, Mongoose, Schema, model, models } from 'mongoose';
import { Model } from 'mongoose';

export interface Task {
  description: string;
  rewardPoint: number;
  link: string;
  claimed: boolean;
}

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  referralCode: string;
  referrals: { username: string }[];
  referralEarnings?: number;
  totalUptime?: string;
  pointsEarned?: number;
  createdAt: Date;
  updatedAt: Date;
  completedTasks: Task[];
}

interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    referralCode: {
      type: String,
      required: true,
    },
    referrals: [
      {
        username: {
          type: String,
          required: true,
        },
      },
    ],
    referralEarnings: {
      type: Number,
    },
    totalUptime: {
      type: String,
    },
    pointsEarned: {
      type: Number,
    },
    completedTasks: [
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
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = models.User || model<UserDocument, UserModel>('User', userSchema);

export default User;

