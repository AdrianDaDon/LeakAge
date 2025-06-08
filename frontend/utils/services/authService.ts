import { SignInFormData, SignUpFormData, AuthResponse, User } from '../../types/auth';

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async signIn(data: SignInFormData): Promise<AuthResponse> {
    await delay(1500); // Simulate network request

    const user = mockUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    
    if (!user) {
      return {
        success: false,
        message: 'User not found. Please check your email address.',
      };
    }

    // In a real app, you'd verify the password hash
    if (data.password !== 'password123') {
      return {
        success: false,
        message: 'Invalid password. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Sign in successful!',
      user,
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  async signUp(data: SignUpFormData): Promise<AuthResponse> {
    await delay(2000); // Simulate network request

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    
    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists.',
      };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    mockUsers.push(newUser);

    return {
      success: true,
      message: 'Account created successfully!',
      user: newUser,
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    await delay(1000);
    
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return {
        success: false,
        message: 'No account found with this email address.',
      };
    }

    return {
      success: true,
      message: 'Password reset instructions sent to your email.',
    };
  },
};