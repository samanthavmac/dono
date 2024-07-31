import { PoolClient } from 'pg';

export default function PostgresAdapter(client, options = {}) {
	return {
	  async createUser(user) {
		try {
		  console.log("createUser called with:", user);
		  const sql = `
			INSERT INTO donors (name, email, email_verified, image) 
			VALUES ($1, $2, $3, $4) 
			RETURNING id, name, email, email_verified, image`;
		  const result = await client.query(sql, [user.name, user.email, user.emailVerified, user.image]);
		  console.log("createUser result:", result.rows[0]);
		  return result.rows[0];
		} catch (err) {
		  console.error("createUser error:", err);
		  return null;
		}
	  },
	  async getUser(id) {
		try {
		  console.log("getUser called with id:", id);
		  const sql = `SELECT * FROM donors WHERE id = $1`;
		  const result = await client.query(sql, [id]);
		  console.log("getUser result:", result.rows[0]);
		  return result.rows[0];
		} catch (err) {
		  console.error("getUser error:", err);
		  return null;
		}
	  },
	  async getUserByEmail(email) {
		try {
		  console.log("getUserByEmail called with email:", email);
		  const sql = `SELECT * FROM donors WHERE email = $1`;
		  const result = await client.query(sql, [email]);
		  console.log("getUserByEmail result:", result.rows[0]);
		  return result.rows[0];
		} catch (err) {
		  console.error("getUserByEmail error:", err);
		  return null;
		}
	  },
	  async getUserByAccount({ providerAccountId, provider }) {
		try {
		  console.log("getUserByAccount called with providerAccountId:", providerAccountId, "and provider:", provider);
		  const sql = `
			SELECT u.* FROM donors u
			JOIN accounts a ON u.id = a.user_id 
			WHERE a.provider_id = $1 AND a.provider_account_id = $2`;
		  const result = await client.query(sql, [provider, providerAccountId]);
		  console.log("getUserByAccount result:", result.rows[0]);
		  return result.rows[0];
		} catch (err) {
		  console.error("getUserByAccount error:", err);
		  return null;
		}
	  },
	  async updateUser(user) {
		try {
		  console.log("updateUser called with:", user);
		  // Implement update logic if needed
		} catch (err) {
		  console.error("updateUser error:", err);
		  return null;
		}
	  },
	  async linkAccount(account) {
		try {
		  console.log("linkAccount called with:", account);
		  const sql = `
			INSERT INTO accounts 
			(user_id, provider_id, provider_type, provider_account_id, access_token, access_token_expires)
			VALUES ($1, $2, $3, $4, $5, to_timestamp($6))`;
		  const params = [
			account.userId,
			account.provider,
			account.type,
			account.providerAccountId,
			account.access_token,
			account.expires_at,
		  ];
		  await client.query(sql, params);
		  console.log("linkAccount completed for userId:", account.userId);
		  return account;
		} catch (err) {
		  console.error("linkAccount error:", err);
		  return null;
		}
	  },
	  async createSession({ sessionToken, userId, expires }) {
		try {
		  console.log("createSession called with sessionToken:", sessionToken, "userId:", userId, "expires:", expires);
		  const sql = `INSERT INTO sessions (user_id, expires, session_token) VALUES ($1, $2, $3)`;
		  await client.query(sql, [userId, expires, sessionToken]);
		  console.log("createSession completed for sessionToken:", sessionToken);
		  return { sessionToken, userId, expires };
		} catch (err) {
		  console.error("createSession error:", err);
		  return null;
		}
	  },
	  async getSessionAndUser(sessionToken) {
		try {
		  console.log("getSessionAndUser called with sessionToken:", sessionToken);
		  let result = await client.query("SELECT * FROM sessions WHERE session_token = $1", [sessionToken]);
		  const session = result.rows[0];
		  console.log("getSessionAndUser session:", session);
	
		  result = await client.query("SELECT * FROM donors WHERE id = $1", [session.user_id]);
		  const user = result.rows[0];
		  console.log("getSessionAndUser user:", user);
	
		  return { session, user };
		} catch (err) {
		  console.error("getSessionAndUser error:", err);
		  return null;
		}
	  },
	  async updateSession({ sessionToken }) {
		try {
		  console.log("updateSession called with sessionToken:", sessionToken);
		  // Implement session update logic if needed
		} catch (err) {
		  console.error("updateSession error:", err);
		}
	  },
	  async deleteSession(sessionToken) {
		try {
		  console.log("deleteSession called with sessionToken:", sessionToken);
		  const sql = `DELETE FROM sessions WHERE session_token = $1`;
		  await client.query(sql, [sessionToken]);
		  console.log("deleteSession completed for sessionToken:", sessionToken);
		} catch (err) {
		  console.error("deleteSession error:", err);
		}
	  },
	};
  }
  