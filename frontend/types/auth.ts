export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (data: SignInFormData) => Promise<AuthResponse>;
  signUp: (data: SignUpFormData) => Promise<AuthResponse>;
  signOut: () => void;
}