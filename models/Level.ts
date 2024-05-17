import mongoose, { Document, Schema, model, models } from 'mongoose';
import { Model } from 'mongoose';

export interface LevelDocument extends Document {
  levelName: string;
  levelPoints: number;
  levelReward: number;
}

interface LevelModel extends Model<LevelDocument> {}

const levelSchema = new Schema<LevelDocument, LevelModel>(
  {
    levelName: {
      type: String,
      required: true,
    },
    levelPoints: {
      type: Number,
      required: true,
    },
    levelReward: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Level =
  models.Level || model<LevelDocument, LevelModel>('Level', levelSchema);

export default Level;

