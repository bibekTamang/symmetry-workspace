import { AuthenticatedUserPayload, DBUser } from "./auth.types";

export class AuthMapper {
  public static toDomainPayload(raw: DBUser): AuthenticatedUserPayload {
    if (!raw) {
      throw new Error('Cannot map an empty database record to an authentication payload');
    }

    return {
      userId: raw.userid,
      email: raw.email || null,
      firstName: raw.first_name || '',
      lastName: raw.last_name || '',
      role: raw.role, 
      isEmailVerified: !!raw.is_emailverified,
    };
  }
}