export interface Course {
  id: string;
  title: string;
  originalPrice: number;
  offerPrice: number;
  videoCount: number;
  description: string;
  features: string[];
  videos: string[];
  progress?: number;
}

export interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface User {
  email: string;
  phone?: string;
  purchasedCourses: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  verifyingOTP: boolean;
  tempEmail?: string;
  tempPhone?: string;
}