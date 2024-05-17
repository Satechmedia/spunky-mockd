import { connectToDB } from '@/db/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialProvider from 'next-auth/providers/credentials';

interface Referral {
  username: string;
  _id: string;
}

export interface SessionUser {
  username: string | null | undefined;
  referrals: Referral[];
  referralCode: string | null | undefined;
  email: string | null | undefined;
  pointsEarned: number | null | undefined;
  referralEarnings: number | null | undefined;
  totalUptime: string | null | undefined;
  _id: string | null | undefined;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectToDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = token.user as {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        username?: string | null | undefined;
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

