import { connectToDB } from '@/db/database';
import errorHandler from '@/middlewares/errorHandler';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  let users;

  try {
    await connectToDB();
    users = await User.find();
    if (!users) {
      return errorHandler(`No user found`, 400);
    }
    return NextResponse.json(
      { message: 'Users', data: users },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return errorHandler(`Error getting users`, 400);
  }
}

