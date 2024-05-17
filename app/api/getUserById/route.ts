import { connectToDB } from '@/db/database';
import errorHandler from '@/middlewares/errorHandler';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let user;

  try {
    await connectToDB();
    const { userID } = await req.json();
    user = await User.findById(userID);
    if (!user) {
      return errorHandler(`No user found`, 400);
    }
    return NextResponse.json({ message: 'user', data: user }, { status: 200 });
  } catch (err) {
    console.log(err);
    return errorHandler(`Error getting user`, 400);
  }
}

