import { connectToDB } from '@/db/database';
import errorHandler from '@/middlewares/errorHandler';
import Task from '@/models/Task';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { taskID, userID } = await req.json();

    if (!taskID) {
      return errorHandler('Please provide task ID', 400);
    }
    if (!userID) {
      return errorHandler('Please provide user ID', 400);
    }

    const existingTask = await Task.findById(taskID);

    if (!existingTask) {
      return errorHandler('Task not found', 404);
    }

    const existingUser = await User.findById(userID);

    if (!existingUser) {
      return errorHandler('User not found', 404);
    }

    const existingUserTask = await User.findOne({
      _id: existingUser._id,
      completedTasks: { $elemMatch: { _id: taskID } },
    });

    if (existingUserTask) {
      const specificTask = existingUserTask.completedTasks.find(
        (item: any) => item._id.toString() === taskID,
      );

      const isClaimed = specificTask.claimed;

      if (isClaimed === true) {
        return errorHandler('Reward already claimed!', 409);
      }
    }
    const newEarning = existingUser?.pointsEarned + existingTask?.rewardPoint;

    await User.updateOne(
      { _id: userID, 'completedTasks._id': taskID },
      {
        $set: {
          'completedTasks.$.claimed': true,
          pointsEarned: newEarning,
        },
      },
    );

    const updatedUser = await User.findById(userID);

    return NextResponse.json(
      { message: 'Reward Claimed', data: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return errorHandler('Error claiming points', 500);
  }
}

