import { connectToDB } from '@/db/database';
import errorHandler from '@/middlewares/errorHandler';
import User, { UserDocument } from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import referenceGenerator from '@/middlewares/referenceGenerator';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, password, username, referralCode } = await req.json();

    if (!email) {
      return errorHandler('Please provide email', 400);
    }
    if (!password) {
      return errorHandler('Please provide password', 400);
    }
    if (!username) {
      return errorHandler('Please provide username', 400);
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return errorHandler('User with email already exists.', 401);
    }

    const existingUsername = await User.findOne({
      username,
    });

    if (existingUsername) {
      return errorHandler('User with username already exists.', 401);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      if (referralCode) {
        const referredBy = await User.findOne({
          referralCode,
        });

        if (referredBy === null) {
          return errorHandler('Invalid referral code ', 400);
        }

        let newEarnings = 0;

        newEarnings = referredBy?.referralEarnings + 50000;

        await User.findByIdAndUpdate(
          referredBy._id,
          {
            $push: {
              referrals: { username },
            },
            referralEarnings: newEarnings,
          },
          {
            new: true,
          },
        );
      }

      const userReferralCode = referenceGenerator(10);

      await User.create({
        username,
        email,
        password: hashedPassword,
        referralCode: userReferralCode,
        totalUptime: '',
        referralEarnings: 0,
        pointsEarned: 0,
      });

      return NextResponse.json({ message: 'User Created' }, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return errorHandler('Error registering user', 500);
  }
}

