import pool from '../../../config/database';
import { AuthMapper } from './auth.mapper';
import { AuthenticatedUserPayload, DBUser, RegisterUserParams } from './auth.types';

class AuthRepository {
  async createUser(params: RegisterUserParams): Promise<boolean> {
    const query = `SELECT * FROM register_user($1, $2, $3);`;
    
    const values = [
      params.email,
      params.passwordHash,
      params.role,        
    ];
    const { rowCount } = await pool.query(query, values);
    return !!rowCount && rowCount > 0;
  }

  async findUserByEmail(email: string): Promise<DBUser> {
    const query = `
      SELECT  u.userid, u.email, u.first_name, u.last_name, u.status, u.is_emailverified, r.role_name as role, ui.password_hash 
      FROM users u
      LEFT JOIN user_identities ui ON u.userid = ui.userid AND ui.provider = 'EMAIL'
      INNER JOIN roles r ON r.roleid = u.roleid 
      WHERE u.email = LOWER(TRIM($1));
    `;
    const { rows } = await pool.query(query, [email]);
    return rows[0] || null;
  }

  async getUserById(userId: string): Promise<DBUser> {
    const query = `SELECT u.*, r.role_name as role
                   FROM users u INNER JOIN roles r ON r.roleid = u.roleid
                   WHERE userid = $1;`;
    const { rows } = await pool.query(query, [userId]);
    return rows[0] || null;
  }

  async upsertThirdPartyIdentity(params: {
    provider: string;
    providerUserId: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthenticatedUserPayload> {
    
    const query = `SELECT * FROM upsert_third_party_identity($1, $2, $3, $4, $5);`;

    const { rows } = await pool.query(query, [
      params.provider,
      params.providerUserId,
      params.email,
      params.firstName,
      params.lastName,
    ]);

    const user = rows[0];
    
    if (!user) {
      throw new Error('Identity provider processing pipeline failed to return profile details');
    }

    return AuthMapper.toDomainPayload(user);
  }

  async saveRefreshToken(userId: string, token: string, expiresAt: Date, userAgent: string, ipAddress: string): Promise<void> {
    const query = `
      INSERT INTO refresh_tokens (token, userid, expires_at, user_agent, ip_address) 
      VALUES ($1, $2, $3, $4, $5);
    `;
    await pool.query(query, [token, userId, expiresAt, userAgent, ipAddress]);
  }

  async findRefreshToken(token: string) {
    const query = `SELECT * FROM refresh_tokens WHERE token = $1;`;
    const { rows } = await pool.query(query, [token]);
    return rows[0] || null;
  }

  async revokeRefreshToken(token: string): Promise<void> {
    const query = `UPDATE refresh_tokens SET is_revoked = true WHERE token = $1;`;
    await pool.query(query, [token]);
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    const query = `UPDATE refresh_tokens SET is_revoked = true WHERE userid = $1;`;
    await pool.query(query, [userId]);
  }
}

export default new AuthRepository();