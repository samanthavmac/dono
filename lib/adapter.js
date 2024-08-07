import { PoolClient } from 'pg';

export default function PostgresAdapter(client, options = {}) {
	return {
	  async createDonor(user) {
		try {
		  console.log("createDonor called with:", user);
		  const sql = `
			INSERT INTO donors (name, email, email_verified, image) 
			VALUES ($1, $2, $3, $4) 
			RETURNING id, name, email, email_verified, image`;
		  const result = await client.query(sql, [user.name, user.email, user.emailVerified, user.image]);
		  console.log("createDonor result:", result.rows[0]);
		  return result.rows[0];
		} catch (err) {
		  console.error("createDonor error:", err);
		  return null;
		}
	  },
	  async getDonor(id) {
		try {
		  console.log("getDonor called with id:", id);
		  const sql = `SELECT * FROM donors WHERE id = $1`;
		  const result = await client.query(sql, [id]);
		  console.log("getDonor result:", result.rows[0]);
		  return result.rows[0];
		} catch (err) {
		  console.error("getDonor error:", err);
		  return null;
		}
	  },
	  async getDonorByEmail(email) {
		try {
		  console.log("getDonorByEmail called with email:", email);
		  const sql = `SELECT * FROM donors WHERE email = $1`;
		  const result = await client.query(sql, [email]);
		  console.log("getDonorByEmail result:", result.rows[0]);
		  return result.rows[0];
		} catch (err) {
		  console.error("getDonorByEmail error:", err);
		  return null;
		}
	  },
	  async getDonorByAccount({ providerAccountId, provider }) {
		try {
		  console.log("getDonorByAccount called with providerAccountId:", providerAccountId, "and provider:", provider);
		  const sql = `
			SELECT u.* FROM donors u
			JOIN accounts a ON u.id = a.user_id 
			WHERE a.provider_id = $1 AND a.provider_account_id = $2`;
		  const result = await client.query(sql, [provider, providerAccountId]);
		  console.log("getDonorByAccount result:", result.rows[0]);
		  return result.rows[0];
		} catch (err) {
		  console.error("getDonorByAccount error:", err);
		  return null;
		}
	  },
	  async updateDonor(user) {
		try {
		  console.log("updateDonor called with:", user);
		  // Implement update logic if needed
		} catch (err) {
		  console.error("updateDonor error:", err);
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
	  async getSessionAndDonor(sessionToken) {
		try {
		  console.log("getSessionAndDonor called with sessionToken:", sessionToken);
		  let result = await client.query("SELECT * FROM sessions WHERE session_token = $1", [sessionToken]);
		  const session = result.rows[0];
		  console.log("getSessionAndDonor session:", session);
	
		  result = await client.query("SELECT * FROM donors WHERE id = $1", [session.user_id]);
		  const user = result.rows[0];
		  console.log("getSessionAndDonor user:", user);
	
		  return { session, user };
		} catch (err) {
		  console.error("getSessionAndDonor error:", err);
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
		  const result = await client.query(sql, [sessionToken]);
		  console.log("deleteSession completed for sessionToken:", sessionToken, "affected rows:", result.rowCount);
		} catch (err) {
		  console.error("deleteSession error:", err);
		}
	  }	  
	};
  }
  