export interface FormValues {
  email?: string;
  password?: string;
  confirmPassword?: string;
  full_name?: string;
  username?: string;
  role?: string;
  status?: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  role: string | null;
  status: string | null;
  last_sign_in: string | null;
}