export interface RegistrationFormInputs {
  gym_name?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gym_location?: string;
  state?: string;
  city?: string;
  document_url?: string;
}

export interface LoginFormInputs {
    email : string
    password : string
}