import { connectToDB } from '@/db/database';
import errorHandler from '@/middlewares/errorHandler';
import Task from '@/models/Task';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    await connectToDB();

    // Parse request body
    const { userID, taskID } = await req.json();

    if (!userID) {
      return errorHandler('Please provide user ID', 400);
    }
    if (!taskID) {
      return errorHandler('Please provide task ID', 400);
    }

    const existingUser = await User.findOne({
      _id: userID,
    });

    const existingTask = await Task.findOne({
      _id: taskID,
    })
      .lean()
      .exec();

    if (!existingTask) {
      return errorHandler('Task does not exist', 404);
    }

    if (!existingUser) {
      return errorHandler('User does not exist', 404);
    }

    const newUpdatedTask = {
      ...existingTask,
      claimed: false,
    };

    // Update task
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userID },
      {
        $push: {
          completedTasks: newUpdatedTask,
        },
      },
      {
        new: true,
      },
    );

    return NextResponse.json(
      { message: 'User Task Updated', data: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return errorHandler('Error updating task', 500);
  }
}

