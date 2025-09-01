// Error utility functions for better error handling and user messaging

export interface ApiError {
  message: string;
  code?: string;
  retryable?: boolean;
}

export class SignupError extends Error {
  code: string;
  retryable: boolean;
  originalError?: Error;

  constructor(message: string, code: string = 'SIGNUP_ERROR', retryable: boolean = false, originalError?: Error) {
    super(message);
    this.name = 'SignupError';
    this.code = code;
    this.retryable = retryable;
    this.originalError = originalError;
  }
}

// Common error messages for user-friendly display
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Connection error. Please check your internet connection and try again.',
  PAYMENT_DECLINED: 'Your payment was declined. Please check your card details and try again.',
  PAYMENT_FAILED: 'Payment processing failed. Please try again or use a different payment method.',
  INVALID_CARD: 'Please check your card details and try again.',
  ACCOUNT_EXISTS: 'An account with this email already exists. Try logging in instead.',
  WEAK_PASSWORD: 'Password must be at least 8 characters long and contain letters and numbers.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  REQUIRED_FIELD: 'This field is required.',
  API_ERROR: 'Something went wrong. Please try again later.',
  RATE_LIMITED: 'Too many attempts. Please wait a few minutes before trying again.',
  SERVER_ERROR: 'Server error. Please try again in a few minutes.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
} as const;

// Parse Stripe errors into user-friendly messages
export function parseStripeError(error: any): string {
  if (!error) return ERROR_MESSAGES.PAYMENT_FAILED;
  
  const code = error.code || error.type;
  
  switch (code) {
    case 'card_declined':
      return ERROR_MESSAGES.PAYMENT_DECLINED;
    case 'incorrect_cvc':
    case 'invalid_expiry_month':
    case 'invalid_expiry_year':
    case 'invalid_number':
    case 'incomplete_number':
    case 'incomplete_cvc':
    case 'incomplete_expiry':
      return ERROR_MESSAGES.INVALID_CARD;
    case 'processing_error':
      return ERROR_MESSAGES.PAYMENT_FAILED;
    case 'rate_limit':
      return ERROR_MESSAGES.RATE_LIMITED;
    default:
      return error.message || ERROR_MESSAGES.PAYMENT_FAILED;
  }
}

// Parse API errors into user-friendly messages
export function parseApiError(error: any, defaultMessage: string = ERROR_MESSAGES.API_ERROR): string {
  if (!error) return defaultMessage;
  
  // Handle fetch errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  // Handle timeout errors
  if (error.name === 'AbortError' || error.message.includes('timeout')) {
    return ERROR_MESSAGES.TIMEOUT_ERROR;
  }
  
  // Handle specific API error messages
  const message = error.message || error.error || defaultMessage;
  
  if (message.includes('email already exists') || message.includes('account exists')) {
    return ERROR_MESSAGES.ACCOUNT_EXISTS;
  }
  
  if (message.includes('password') && message.includes('weak')) {
    return ERROR_MESSAGES.WEAK_PASSWORD;
  }
  
  if (message.includes('email') && message.includes('invalid')) {
    return ERROR_MESSAGES.INVALID_EMAIL;
  }
  
  if (message.includes('rate limit') || message.includes('too many')) {
    return ERROR_MESSAGES.RATE_LIMITED;
  }
  
  return message;
}

// Retry logic for failed API calls
export async function retryApiCall<T>(
  fn: () => Promise<T>, 
  maxRetries: number = 3, 
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry for certain errors
      if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 409) {
        throw error;
      }
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, attempt - 1)));
    }
  }
  
  throw lastError!;
}

// Validate form data with better error messages
export function validateFormField(field: string, value: any): string | null {
  switch (field) {
    case 'fullName':
      if (!value || value.trim().length < 2) {
        return 'Full name must be at least 2 characters';
      }
      if (value.trim().length > 100) {
        return 'Full name must be less than 100 characters';
      }
      break;
      
    case 'email':
      if (!value) {
        return ERROR_MESSAGES.REQUIRED_FIELD;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return ERROR_MESSAGES.INVALID_EMAIL;
      }
      break;
      
    case 'password':
      if (!value) {
        return ERROR_MESSAGES.REQUIRED_FIELD;
      }
      if (value.length < 8) {
        return 'Password must be at least 8 characters';
      }
      if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain both letters and numbers';
      }
      break;
      
    case 'firstLocationName':
    case 'firstTeamName':
      if (!value || value.trim().length === 0) {
        return ERROR_MESSAGES.REQUIRED_FIELD;
      }
      if (value.trim().length > 50) {
        return 'Name must be less than 50 characters';
      }
      break;
  }
  
  return null;
}