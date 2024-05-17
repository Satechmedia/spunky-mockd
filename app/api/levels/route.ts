import { connectToDB } from '@/db/database';
import errorHandler from '@/middlewares/errorHandler';
import Level from '@/models/Level';
import { NextResponse } from 'next/server';

export async function GET() {
  let levels;

  try {
    await connectToDB();
    levels = await Level.find();
    if (!levels) {
      return errorHandler(`No levels found`, 400);
    }
    return NextResponse.json(
      { message: 'Levels retrieved', data: levels },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return errorHandler(`Error getting levels`, 400);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { levelName, levelPoints, levelReward } = await req.json();

    if (!levelName) {
      errorHandler('Please provide level name', 400);
    }
    if (!levelPoints) {
      errorHandler('Please provide level name', 400);
    }
    if (!levelReward) {
      errorHandler('Please provide level name', 400);
    }

    const existingLevel = await Level.findOne({
      levelName,
    });

    if (existingLevel) {
      return errorHandler('Level already exists.', 401);
    } else {
      const newLevel = await Level.create({
        levelName,
        levelPoints,
        levelReward,
      });

      return NextResponse.json(
        { message: 'Level Created', data: newLevel },
        { status: 201 },
      );
    }
  } catch (error) {
    console.log(error);
    return errorHandler('Error creating level', 500);
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDB();
    const { levelName, levelPoints, levelReward } = await req.json();

    const existingLevel = await Level.findOne({
      levelName,
    });

    if (!existingLevel) {
      return errorHandler('Level does not exist.', 401);
    } else {
      const updatedLevel = await Level.findOneAndUpdate(
        { levelName },
        {
          levelName,
          levelPoints,
          levelReward,
        },
        { new: true },
      );

      return NextResponse.json(
        { message: 'Level Updated', data: updatedLevel },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log(error);
    return errorHandler('Error updating level', 500);
  }
}

