# Signup Page Template (Stripe + Bubble.io Integration)

## Page Content & Wording Configuration

### Header Section
```yaml
main_headline: "Start Your 7-Day Free Trial"
subtitle: "Join thousands of hospitality professionals using Pilla to streamline their operations."
```

### Trust Signals
```yaml
trust_signals:
  - icon: "ShieldCheckIcon"
    text: "Secure SSL"
  - icon: "CheckCircleIcon" 
    text: "7-Day Free Trial"
```

### Form Sections

#### Personal Information Section
```yaml
section_title: "Personal Information"
fields:
  fullName:
    label: "Full Name"
    placeholder: "Enter your full name"
    validation: "Full name must be at least 2 characters"
  email:
    label: "Email Address"
    placeholder: "Enter your email address"
    validation: "Please enter a valid email address"
  password:
    label: "Password"
    placeholder: "Create a secure password"
    validation: "Password must contain both letters and numbers"
    helper_text: "" # Currently no helper text shown
```

#### Business Information Section
```yaml
section_title: "Business Information"
fields:
  firstLocationName:
    label: "Location Name"
    placeholder: "e.g., Downtown Restaurant"
    validation: "Location name is required"
  firstTeamName:
    label: "Team Name"
    placeholder: "e.g., Kitchen Staff"
    validation: "Team name is required"
```

#### Payment Information Section
```yaml
section_title: "Payment Information"
description: "Your trial is free for 7 days. You'll only be charged if you continue after the trial period."
card_placeholder: "Card details handled by Stripe Elements"
```

### Submit Button
```yaml
button_text: "Start 7-Day Free Trial"
loading_text: "Processing..."
```

### Footer Text
```yaml
terms_text: "By signing up, you agree to our Terms of Service and Privacy Policy. You can cancel anytime during your trial period."
```

### Error Messages
```yaml
generic_error: "Please fix these validation errors:"
payment_error: "Payment system not loaded. Please refresh the page."
network_error: "Something went wrong. Please try again."
```

### Processing Screen
```yaml
processing_title: "Creating your account..."
processing_description: "Please don't close this window. We're setting up your Pilla account and processing your payment."
```

---

## CSS Classes Used

### Layout Classes
- `min-h-screen` - Full height container
- `bg-main` - Main background color
- `white-card` - Card component styling
- `max-w-lg mx-auto` - Centered form container

### Typography Classes  
- `h1` - Main headline
- `h2` - Processing screen title
- `small-grey` - Subtitle and helper text
- `small-blue` - Section headings
- `small-medium` - Form labels

### Form Classes
- `w-full px-3 py-2 border border-gray-300 rounded-lg` - Input styling
- `focus:ring-2 focus:ring-blue-600 focus:border-transparent` - Focus states
- `bg-blue-600 text-white py-3 px-4 rounded-lg` - Submit button
- `hover:bg-blue-700` - Button hover state
- `disabled:opacity-50 disabled:cursor-not-allowed` - Disabled button

### Error Styling
- `bg-red-50 border border-red-200 rounded-lg p-4` - Error container
- `text-red-800 text-sm font-medium` - Error title
- `text-red-700 text-sm mt-1` - Error message
- `text-red-600 text-sm underline` - Try again link

---

## Form Configuration

### Validation Rules
```yaml
fullName:
  min_length: 2
  max_length: 100
  required: true
  
email:
  pattern: "Valid email format"
  required: true
  
password:
  min_length: 8
  pattern: "Must contain letters and numbers"
  required: true
  
firstLocationName:
  min_length: 1
  max_length: 50
  required: true
  
firstTeamName:
  min_length: 1
  max_length: 50
  required: true
```

### API Integration
```yaml
stripe_integration:
  endpoint: "/api/create-payment-intent"
  trial_days: 7
  payment_behavior: "default_incomplete"
  
bubble_integration:
  endpoint: "/api/bubble/create-account"
  required_fields:
    - fullName
    - email
    - password
    - firstLocationName
    - firstTeamName
    - stripe_customer_id
    - subscription_id
```

### Success Flow
```yaml
success_redirect: "/signup/success"
success_state: "step: 'success'"
```

---

## Customization Options

### Easy Text Changes
To modify any text, update the YAML values above and the corresponding strings in:
- `src/components/SignupForm.tsx`
- Form labels, placeholders, validation messages
- Button text and loading states

### Styling Changes  
All CSS classes can be modified in the component file:
- Color scheme (blue-600 → your brand color)
- Spacing and layout
- Form field styling
- Error styling

### Business Logic Changes
- Trial period length (currently 7 days)
- Required vs optional fields
- Validation rules
- API endpoints and data structure

### Section Visibility
Each section can be shown/hidden:
- Trust signals section
- Business information section  
- Payment information section
- Terms and conditions

---

## Implementation Notes

1. **Stripe Elements Integration**: Payment form uses Stripe's secure card elements
2. **Real-time Validation**: Form validates fields as user types
3. **Error Handling**: Comprehensive error states with specific messages
4. **Responsive Design**: Works on mobile and desktop
5. **Accessibility**: Proper labels and keyboard navigation
6. **Security**: All sensitive data handled by Stripe and Bubble.io APIs

The component is located at: `src/components/SignupForm.tsx`