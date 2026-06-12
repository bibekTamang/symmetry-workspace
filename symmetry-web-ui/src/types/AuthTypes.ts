export interface AuthUser {
  userId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  isEmailVerified: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading : boolean;
  login: (accessToken: string, user: AuthUser) => void;
  logout: () => Promise<void>;
}

export type UserRole = 'gym_admin' | 'individual' | 'super_admin'