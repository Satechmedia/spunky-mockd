import { connectToDB } from '@/db/database';
import { dataSorter } from '@/middlewares/dataSorter';
import errorHandler from '@/middlewares/errorHandler';
import Task from '@/models/Task';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET() {
  let tasks;

  try {
    await connectToDB();
    tasks = await Task.find();
    if (!tasks) {
      return errorHandler(`No tasks found`, 400);
    }
    return NextResponse.json(
      { message: 'Tasks retrieved', data: tasks },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return errorHandler(`Error getting tasks`, 400);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { description, rewardPoint, link } = await req.json();

    if (!description) {
      errorHandler('Please provide task description', 400);
    }
    if (!rewardPoint) {
      errorHandler('Please provide task reward points', 400);
    }
    if (!link) {
      errorHandler('Please provide task link', 400);
    }

    const existingTask = await Task.findOne({
      description,
    });

    if (existingTask) {
      return errorHandler('Task already exists.', 401);
    } else {
      const newTask = await Task.create({
        description,
        rewardPoint,
      });

      return NextResponse.json(
        { message: 'Task Created', data: newTask },
        { status: 201 },
      );
    }
  } catch (error) {
    console.log(error);
    return errorHandler('Error creating task', 500);
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDB();

    // Parse request body
    const { description, rewardPoint, link, taskID } = await req.json();

    if (!taskID) {
      return errorHandler('Please provide task ID', 400);
    }

    const existingTask = await Task.findOne({
      _id: taskID,
    });

    if (!existingTask) {
      return errorHandler('Task does not exist', 404);
    }

    // Update task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskID },
      {
        description,
        rewardPoint,
        link,
      },
      { new: true },
    );

    const newUpdatedTask = await Task.findById(taskID).lean().exec();

    const sortedTask = dataSorter(newUpdatedTask);

    return NextResponse.json(
      { message: 'Task Updated', data: sortedTask },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return errorHandler('Error updating task', 500);
  }
}

