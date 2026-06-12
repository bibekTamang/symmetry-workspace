import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authRepository from './auth.repository';
import {  AuthenticatedUserPayload, RegisterUserParams } from './auth.types';
import { env } from '../../../config/env';
import { LoginInput } from './auth.validation';
import { OAuth2Client } from 'google-auth-library';
import { AuthMapper } from './auth.mapper';
import { UserStatus } from '../../../enums';

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

class AuthService {
  private generateTokens(user: AuthenticatedUserPayload) {
    const accessToken = jwt.sign({ userId: user.userId, role: user.role }, env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.userId, jti: crypto.randomUUID()}, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async registerUser(userData: Omit<RegisterUserParams, 'passwordHash'> & { password: string }): Promise<boolean> {
    const existingUser = await authRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const repoParams: RegisterUserParams = {
      firstName: userData.firstName,
      lastName : userData.lastName,
      email: userData.email,
      passwordHash: hashedPassword,
      role: userData.role,
    };
    return await authRepository.createUser(repoParams);
  }

  async loginUserWithEmail(input: LoginInput, userAgent: string, ipAddress: string) {
    const user = await authRepository.findUserByEmail(input.email);
    if (!user || !user.password_hash) throw new Error('Invalid email or password');
    if (user.status !== 'ACTIVE') throw new Error('Account access is restricted');

    const match = await bcrypt.compare(input.password, user.password_hash);
    if (!match) throw new Error('Invalid email or password');

    const payload = AuthMapper.toDomainPayload(user);
    const { accessToken, refreshToken } = this.generateTokens(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await authRepository.saveRefreshToken(payload.userId, refreshToken, expiresAt, userAgent, ipAddress);

    return { accessToken, refreshToken, user: payload };
  }

  async loginUserWithGoogle(idToken: string, userAgent: string, ipAddress: string) {
    const ticket = await googleClient.verifyIdToken({ idToken, audience: env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload || !payload.sub || !payload.email) throw new Error('Corrupted identity payload from provider');

    const user = await authRepository.upsertThirdPartyIdentity({
      provider: 'google',
      providerUserId: payload.sub,
      email: payload.email,
      firstName: payload.given_name || 'Google',
      lastName: payload.family_name || 'User',
    });

    const { accessToken, refreshToken } = this.generateTokens(user);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await authRepository.saveRefreshToken(user.userId, refreshToken, expiresAt, userAgent, ipAddress);

    return { accessToken, refreshToken, user };
  }

  async rotateRefreshToken(incomingToken: string, userAgent: string, ipAddress: string) {
    let decoded: any;
    try {
      decoded = jwt.verify(incomingToken, env.JWT_REFRESH_SECRET);
    } catch {
      throw new Error('Invalid structural signature');
    }

    const tokenRecord = await authRepository.findRefreshToken(incomingToken);
    if (!tokenRecord) throw new Error('Session credentials untracked');

    if (tokenRecord.is_revoked) {
      const CONCURRENCY_GRACE_PERIOD_MS = 10000;
      const tokenTimeSource = tokenRecord?.revoked_at;
      const timeSinceRevocation = Date.now() - new Date(tokenTimeSource).getTime();
      
      if (timeSinceRevocation <= CONCURRENCY_GRACE_PERIOD_MS) {
        const activeRefreshToken = await authRepository.findActiveRefreshTokenByUserId(tokenRecord.userid, tokenRecord.user_agent);
        const userProfile = await authRepository.getUserById(tokenRecord.userid);
        if (activeRefreshToken && userProfile && userProfile.status === UserStatus.ACTIVE) {
          const payload = AuthMapper.toDomainPayload(userProfile);
          const { accessToken } = this.generateTokens(payload); 
          return { 
            accessToken, 
            refreshToken: activeRefreshToken.refresh_token, 
            user: payload 
          };
        }
      }

      await authRepository.revokeAllUserTokens(tokenRecord.userid);
      throw new Error('Security Breach: Token replay intercepted. System access closed.');
    }

    if (new Date() > new Date(tokenRecord.expires_at)) {
      throw new Error('Session credentials expired');
    }

    const userProfile = await authRepository.getUserById(tokenRecord.userid);
    if (!userProfile || userProfile.status !== UserStatus.ACTIVE) throw new Error('Associated identity context is invalid');

    await authRepository.revokeRefreshToken(incomingToken);

    const payload = AuthMapper.toDomainPayload(userProfile)
    const { accessToken, refreshToken } = this.generateTokens(payload);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await authRepository.saveRefreshToken(payload.userId, refreshToken, expiresAt, userAgent, ipAddress);

    return { accessToken, refreshToken, user: payload };
  }

  async logout(token: string) {
    await authRepository.revokeRefreshToken(token);
  }
  
}

export default new AuthService();