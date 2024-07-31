import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "/lib/adapter.ts";

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "postgres",
	password: "postgres",
	port: 5432,
});

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	adapter: PostgresAdapter(pool),
});