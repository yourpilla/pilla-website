# Signup Page Template

## Raw React Code for Bubble.io API Integration
*Signup page with form handling and API integration to Bubble.io backend*

```tsx
'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

// Note: Metadata should be moved to a separate file for client components
// or handle this in a parent server component

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    role: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      // Replace with your actual Bubble.io API endpoint
      const response = await fetch('YOUR_BUBBLE_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_TOKEN' // If needed
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          company_name: formData.companyName,
          role: formData.role
        })
      });

      if (response.ok) {
        setSuccess(true);
        // Redirect to dashboard or confirmation page
        // window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        setApiError(errorData.message || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      setApiError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Sign Up for Pilla",
    "description": "Create your Pilla account to access comprehensive hospitality management tools and training resources.",
    "url": "https://yourpilla.com/signup",
    "inLanguage": "en-GB"
  };

  if (success) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
          <div className="max-w-md mx-auto px-4 py-12">
            <div className="bg-card border-default rounded-default shadow-sm overflow-hidden text-center p-8">
              <svg className="w-16 h-16 mx-auto mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className="h2 mb-4">Account Created Successfully!</h1>
              <p className="text-muted mb-6">
                Welcome to Pilla! You can now access your dashboard and start managing your hospitality operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-card text-blue-600 font-medium rounded-default border-default hover:bg-blue-50 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-card border-default rounded-default shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-header-group px-8 py-12 text-center">
            <h1 className="mb-4 leading-tight">
              Join Pilla Today
            </h1>
            <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
              Start your journey toward streamlined hospitality operations and enhanced guest experiences.
            </p>
          </div>
          
          {/* Form */}
          <div className="px-8 py-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* API Error */}
              {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {apiError}
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-default shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-default shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-default shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Fields */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-default shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Create a password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                <p className="mt-1 text-sm text-gray-500">Must be at least 8 characters long</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-default shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-red-300 focus:border-red-300' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Optional Fields */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-default shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your company name (optional)"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-default shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your role (optional)</option>
                  <option value="general-manager">General Manager</option>
                  <option value="operations-manager">Operations Manager</option>
                  <option value="restaurant-manager">Restaurant Manager</option>
                  <option value="hotel-manager">Hotel Manager</option>
                  <option value="front-desk">Front Desk</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="staff">Staff Member</option>
                  <option value="owner">Business Owner</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center px-6 py-3 font-medium rounded-default transition-colors ${
                    isLoading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{' '}
                <Link href="/legal/terms-of-service" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy-policy" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
```

---

## Typography Class Options

### Available Typography Classes:
- **display-1** (64px, 800 weight) - Largest hero text
- **display-2** (56px, 800 weight) - Large hero text  
- **h1-h6** - Standard heading sizes (auto-applied)
- **subtitle** (20px, muted) - Standard subtitle
- **subtitle-lg** (24px, muted) - Large subtitle  
- **subtitle-sm** (18px, muted) - Small subtitle
- **lead** (20px, normal weight) - Introduction paragraphs
- **eyebrow** (14px, uppercase, muted) - Small labels above headings
- **text-muted** - Muted gray color
- **text-sm** - Small text (14px)
- **text-xs** - Extra small text (12px)
- **caption** - Small descriptive text
- **overline** - Tiny uppercase text

---

## Form Configuration & API Integration

### Bubble.io API Configuration
- **api_endpoint**: "YOUR_BUBBLE_API_ENDPOINT" *(Replace with actual Bubble.io API endpoint)*
- **auth_method**: "Bearer token" *(If authentication required)*
- **request_method**: "POST" *(Standard for user registration)*
- **content_type**: "application/json" *(Standard JSON API)*

### Form Fields Configuration

#### Required Fields
- **email**: Email validation with regex pattern | **error**: "Please enter a valid email"
- **password**: Minimum 8 characters | **error**: "Password must be at least 8 characters"
- **confirmPassword**: Must match password | **error**: "Passwords do not match"
- **firstName**: Text input | **error**: "First name is required"
- **lastName**: Text input | **error**: "Last name is required"

#### Optional Fields
- **companyName**: Text input | **placeholder**: "Enter your company name (optional)"
- **role**: Select dropdown with hospitality roles | **default**: "Select your role (optional)"

### Role Options
- **general-manager**: "General Manager"
- **operations-manager**: "Operations Manager"
- **restaurant-manager**: "Restaurant Manager"
- **hotel-manager**: "Hotel Manager"
- **front-desk**: "Front Desk"
- **supervisor**: "Supervisor"
- **staff**: "Staff Member"
- **owner**: "Business Owner"
- **other**: "Other"

### Form States & Validation

#### Loading State
- **isLoading**: Boolean state for submit button
- **loading_text**: "Creating Account..." | **loading_icon**: Spinner animation
- **disabled_styling**: `bg-gray-400 text-white cursor-not-allowed`

#### Error Handling
- **field_errors**: Real-time validation with red borders and error messages
- **api_errors**: Server response errors displayed in red alert box
- **network_errors**: "Network error. Please check your connection and try again."

#### Success State
- **success_page**: Replaces form with confirmation message
- **success_icon**: Green checkmark | **success_title**: "Account Created Successfully!"
- **success_actions**: Links to dashboard and blog

### API Data Mapping
```json
{
  "email": "formData.email",
  "password": "formData.password",
  "first_name": "formData.firstName",
  "last_name": "formData.lastName",
  "company_name": "formData.companyName",
  "role": "formData.role"
}
```

### Form Styling & Layout

#### Container Styling
- **background**: `var(--background)` *(Design system background)*
- **container_width**: `max-w-md` *(Narrow form layout)*
- **card_styling**: `bg-card border-default rounded-default shadow-sm`

#### Header Section
- **header_background**: `bg-header-group` *(Design system header)*
- **title**: "Join Pilla Today" | **typography**: `h1 + leading-tight`
- **subtitle**: "Start your journey toward streamlined hospitality operations..." | **typography**: `text-subtitle`

#### Form Fields Styling
- **input_styling**: `w-full px-3 py-2 border rounded-default shadow-sm`
- **focus_styling**: `focus:outline-none focus:ring-2 focus:ring-blue-500`
- **error_styling**: `border-red-300 focus:border-red-300`
- **normal_styling**: `border-gray-300 focus:border-blue-500`

#### Submit Button
- **normal_state**: `bg-blue-600 text-white hover:bg-blue-700`
- **loading_state**: `bg-gray-400 text-white cursor-not-allowed`
- **full_width**: `w-full` *(Spans entire form width)*

### Links & Navigation
- **signin_link**: "/signin" | **text**: "Sign in here"
- **terms_link**: "/legal/terms-of-service" | **text**: "Terms of Service"
- **privacy_link**: "/legal/privacy-policy" | **text**: "Privacy Policy"
- **dashboard_link**: "/dashboard" *(After successful signup)*
- **blog_link**: "/blog" *(Secondary action after signup)*

### SEO & Structured Data
- **schema_type**: "WebPage" *(Standard page type)*
- **page_title**: "Sign Up for Pilla"
- **page_description**: "Create your Pilla account to access comprehensive hospitality management tools..."
- **language**: "en-GB"
- **url**: "https://yourpilla.com/signup"

---

## Instructions for Implementation:

1. **Replace API Configuration**:
   - Update `YOUR_BUBBLE_API_ENDPOINT` with actual Bubble.io endpoint
   - Add authentication token if required
   - Adjust field mapping to match Bubble.io data types

2. **Customize Form Fields**:
   - Add/remove fields based on your Bubble.io user model
   - Update validation rules as needed
   - Modify role options to match your business needs

3. **Error Handling**:
   - Customize error messages based on Bubble.io API responses
   - Add specific error handling for different scenarios
   - Test with actual API to refine error states

4. **Success Flow**:
   - Update redirect URLs to match your app structure
   - Customize success message and actions
   - Consider email verification flow if needed

5. **Client Component Note**:
   - This is a client component (`'use client'`) due to form state
   - Metadata should be handled in a parent server component or separate file
   - Consider moving metadata to layout.tsx or a wrapper component

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/signup/page.tsx`

*This template file serves as documentation and customization reference for the signup page with Bubble.io integration*