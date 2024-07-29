import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextApiRequest, NextApiResponse } from 'next';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Additional NextAuth configuration options if needed
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
