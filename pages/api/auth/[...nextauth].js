import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import PostgresAdapter from '../../../lib/adapter'; // Adjust path as necessary
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PostgresAdapter(pool),
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newAccount: '/auth/new-account',
  },
  callbacks: {
    async signIn(user, account, profile) {
      return Promise.resolve('/donor/home');
    },
    async redirect({ url, baseUrl }) {
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
      async session({ session, token, user }) {
        session.user = user;
        return session;
      },
  },
});