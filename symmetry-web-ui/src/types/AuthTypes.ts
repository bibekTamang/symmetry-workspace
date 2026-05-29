export interface AuthUser {
  id: string;
  email: string;
  role: "gym_admin" | "individual_member";
  gymId?: string; // Optional context if they belong to a gym
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export type UserRole = 'gym_admin' | 'individual'