import { UserRole } from "../../../enums";

export interface DBUser {
  userid: string; 
  first_name: string;
  last_name: string;
  dob?: string;
  mobile?: string;
  email: string;
  role: string;
  status: string;
  is_emailverified: boolean;
  created_at?: string;
  updated_at?: string;
  password_hash?: string;
}

export interface RegisterUserParams {
  email: string;
  passwordHash: string;
  role: UserRole;            
}

export interface AuthenticatedUserPayload {
  userId: string;
  email: string | null;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
}



