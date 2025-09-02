import { z } from 'zod';

// Form validation schema
export const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstLocationName: z.string().min(1, 'Location name is required'),
  firstTeamName: z.string().min(1, 'Team name is required'),
});

export type SignupFormData = z.infer<typeof signupSchema>;

// API response types
export interface PaymentIntentResponse {
  clientSecret: string;
  customerId: string;
  subscriptionId: string;
  trialEndsAt?: number;
}

export interface BubbleAccountResponse {
  success: boolean;
  user_id?: string;
  error?: string;
}

export interface SignupApiResponse {
  success: boolean;
  redirectUrl?: string;
  error?: string;
}

// Bubble.io API types
export interface BubbleCreateAccountRequest extends SignupFormData {
  stripe_customer_id: string;
  subscription_id: string;
}

// Stripe webhook types
export interface StripeWebhookData {
  customerId: string;
  subscriptionId: string;
  email: string;
}

// Form state types
export interface SignupFormState {
  isLoading: boolean;
  error: string | null;
  errorList?: string[];
  step: 'form' | 'processing' | 'success' | 'error';
}