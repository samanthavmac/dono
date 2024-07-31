import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import PostgresAdapter from '../../../lib/adapter';
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
});

// export default NextAuth({
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_ID,
// 			clientSecret: process.env.GOOGLE_SECRET,
// 		}),
// 	],
// 	adapter: PostgresAdapter(pool),
// });