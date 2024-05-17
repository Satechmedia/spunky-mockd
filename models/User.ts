import mongoose, { Document, Schema, model, models } from 'mongoose';
import { Model } from 'mongoose';

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
  },
  { timestamps: true },
);

const User = models.User || model<UserDocument, UserModel>('User', userSchema);

export default User;

