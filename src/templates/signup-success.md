# Single Stage Signup Success Page Template

## Component: SingleStageSignupSuccess
**File:** `/src/components/SingleStageSignupSuccess.tsx`
**Route:** `/welcome` (via `/src/app/welcome/page.tsx`)

## Current Elements

### 1. Speech Bubble from Liam (Founder)
**Component:** `SpeechBubble` 
**Profile Photo:** 60x60px (`/liam circle small.png`)
**Font Size:** 18px for all text inside bubble

**Current Speech Bubble Content:**
```
Title: Welcome to Pilla! 🎉

Body: Your account has been created successfully and your 7-day free trial has started.

Account Details:
- Email: [dynamic from accountData.email]
- Password: [dynamic from accountData.generatedPassword]

Save Message: Save these details now! You can change your password after logging in.

Footer: Liam, Pilla Founder. Email me (mailto:liam@yourpilla.com)
```

**Form to Update Speech Bubble:**
- **Title Text:** [                                    ]
- **Include Emoji in Title:** [ ] Yes [ ] No
- **Welcome Message:** [                                                           ]
- **Show Account Email:** [ ] Yes [ ] No
- **Show Account Password:** [ ] Yes [ ] No  
- **Email Label:** [                    ] (current: "Email:")
- **Password Label:** [                    ] (current: "Password:")
- **Save Details Message:** [                                                           ]
- **Footer Name:** [                    ] (current: "Liam, Pilla Founder")
- **Footer Email Link Text:** [                    ] (current: "Email me")
- **Footer Email Address:** [                                    ] (current: liam@yourpilla.com)

**Styling Options:**
- **Profile Photo Size:** [    ]x[    ] (current: 60x60)
- **Font Size:** [    ]px (current: 18px)
- **Background Color:** [            ] (current: #C2E0FF)
- **Border Radius:** [    ]px (current: 20px, bottom-left: 0px)
- **Padding:** [    ] (current: p-6)
- **Gap from Photo:** [    ] (current: gap-4)

### 2. App Download Section
**Current Elements:**
- Section title: "Download the Pilla App"
- Apple App Store logo/link: https://apps.apple.com/gb/app/pilla/id6748623269
- Google Play Store logo/link: https://play.google.com/store/apps/details?id=com.yourpilla.pillaapp

**Form to Update:**
- **Section Title:** [                                    ]
- **Show Section:** [ ] Yes [ ] No
- **iOS App URL:** [                                                           ]
- **Android App URL:** [                                                           ]
- **Logo Size:** [    ] (current: h-16)
- **Logos Hover Effect:** [ ] Yes [ ] No (current: scale-105)

### 3. Navigation Section
**Current Elements:**
- No navigation buttons (removed)

**Form to Update:**
- **Add Navigation Button:** [ ] Yes [ ] No
  - **Button Text:** [                                    ]
  - **Button URL:** [                                    ]
  - **Button Style:** [                    ] (use .btn class)
- **Add Second Button:** [ ] Yes [ ] No
  - **Second Button Text:** [                                    ]
  - **Second Button URL:** [                                    ]

## Layout Settings

### Page Structure
**Form to Update:**
- **Background:** [                ] (current: bg-main)
- **Container Width:** [                ] (current: max-w-2xl)
- **Page Padding Y:** [    ] (current: py-6 sm:py-12)
- **Page Padding X:** [    ] (current: px-4)
- **Text Alignment:** [            ] (current: text-center)

### Section Spacing
**Form to Update:**
- **Speech Bubble Bottom Margin:** [    ] (current: mb-12)
- **App Section Bottom Margin:** [    ] (current: mb-12)
- **Between Sections Gap:** [    ]

## Header Configuration

### Conditional Header
**Current Setup:**
- Uses `HeaderNoBreadcrumbs` on `/welcome` route
- Regular `Header` on all other routes

**Form to Update:**
- **Show Header:** [ ] Yes [ ] No
- **Header Type:** [ ] With Breadcrumbs [ ] Without Breadcrumbs
- **Custom Header:** [ ] Yes [ ] No

## SEO Settings

### Page Metadata
**Current Setup:**
- Robots: noindex, nofollow, noarchive, nosnippet, noimageindex, nocache
- URL: `/welcome`

**Form to Update:**
- **Page Title:** [                                                           ]
- **Meta Description:** [                                                           ]
- **Allow Indexing:** [ ] Yes [ ] No
- **Allow Following:** [ ] Yes [ ] No
- **Allow Archiving:** [ ] Yes [ ] No
- **Allow Snippets:** [ ] Yes [ ] No

## Dynamic Content

### Account Data Display in Speech Bubble
**Currently Displayed Fields:**
- `accountData.email` (shown as "Email: [email]")
- `accountData.generatedPassword` (shown as "Password: [password]")

**Available Fields (not currently shown):**
- `accountData.fullName`
- `accountData.locationName` 
- `accountData.teamName`
- `accountData.customerId`
- `accountData.subscriptionId`
- `accountData.bubbleUserId`
- `accountData.trialEndsAt`

**Form to Update - Additional Fields to Show in Speech Bubble:**
- [ ] Full Name (label: [                    ])
- [ ] Location Name (label: [                    ])
- [ ] Team Name (label: [                    ])
- [ ] Customer ID (label: [                    ])
- [ ] Subscription ID (label: [                    ])
- [ ] Trial End Date (label: [                    ])

## Loading States

### Loading Screen
**Current Elements:**
- Spinner animation
- "Completing your signup..." title
- "Please wait while we finalize your account setup." description

**Form to Update:**
- **Loading Title:** [                                    ]
- **Loading Description:** [                                                           ]
- **Spinner Color:** [            ] (current: border-blue-600)

### Error Screen
**Current Elements:**
- Red exclamation icon
- "Signup Error" title
- Error message display
- "Try Again" button → /signup/single-stage

**Form to Update:**
- **Error Title:** [                                    ]
- **Try Again Button Text:** [                                    ]
- **Try Again URL:** [                                    ]
- **Show Error Icon:** [ ] Yes [ ] No

## App Store Integration

### Platform Logos
**Current Files:**
- `/public/platform-logos/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg`
- `/public/platform-logos/GetItOnGooglePlay_Badge_Web_color_English.png`

**Form to Update:**
- **Custom iOS Logo:** [                                                           ]
- **Custom Android Logo:** [                                                           ]
- **Logo Hover Effect:** [ ] Yes [ ] No (current: scale-105)

## Password Management

### Security Features
**Current Features:**
- Show/hide toggle with eye icons
- Copy to clipboard with success message
- Security warning message

**Form to Update:**
- **Show Toggle Buttons:** [ ] Yes [ ] No
- **Copy Success Message:** [                                                           ]
- **Copy Success Duration:** [    ] seconds (current: 2)
- **Security Warning:** [                                                           ]

## SpeechBubble Component Usage

### How to Use the SpeechBubble Component
```tsx
<SpeechBubble title="Your Custom Title">
  <p>Your custom content goes here...</p>
  <div>Account details, forms, etc.</div>
</SpeechBubble>
```

### Component Props
- **title** (required): String for the bubble title
- **children** (required): React content for the bubble body  
- **className** (optional): Additional CSS classes

### Current Implementation in Welcome Page
```tsx
<SpeechBubble title="Welcome to Pilla! 🎉">
  <p className="mb-4">
    Your account has been created successfully and your 7-day free trial has started.
  </p>
  <div className="space-y-2">
    <div><strong>Email:</strong> {accountData.email}</div>
    <div><strong>Password:</strong> {accountData.generatedPassword}</div>
  </div>
  <p className="mt-4 small-blue">
    Save these details now! You can change your password after logging in.
  </p>
</SpeechBubble>
```

## Styling System

### CSS Classes Used
- **Background:** `.bg-main`
- **Buttons:** `.btn` (for any added navigation)
- **App Logos:** `.h-16 w-auto hover:scale-105 transition-transform`
- **Speech Bubble:** Custom styling with inline styles

### Speech Bubble Styling Details
- **Background Color:** #C2E0FF
- **Border Radius:** 20px (all corners except bottom-left: 0px)
- **Font Size:** 18px (all text inside)
- **Padding:** 24px (p-6)
- **Profile Image:** 60x60px, rounded-full
- **Gap from Image:** 16px (gap-4)

## Integration Points

### API Endpoints
- **Completion API:** `/api/complete-single-stage-checkout`
- **Stripe Session:** Uses `session_id` URL parameter

### External Services
- **Bubble.io:** Account creation
- **Stripe:** Payment processing
- **Clipboard API:** Password copying

## Implementation Notes

### Speech Bubble Customization
- The `SpeechBubble` component is reusable across the site
- Title and body content are fully editable via props
- Profile photo, email link, and base styling are fixed in the component
- Font size and colors can be customized via inline styles in the component file

### Account Data Integration  
- Account details are dynamically populated from Stripe checkout completion
- Email and password are automatically displayed in the speech bubble
- Additional fields can be added by modifying the JSX inside the SpeechBubble content

### Form Implementation Guidelines
- All form fields above should be implemented as editable components
- Changes should update the actual component file or component props
- Consider adding a preview mode to see changes in real-time
- Include reset/default buttons for each section
- Add validation for required fields (URLs, email formats, etc.)

### File Locations
- **Main Component:** `/src/components/SingleStageSignupSuccess.tsx`
- **Speech Bubble Component:** `/src/components/SpeechBubble.tsx`  
- **Profile Image:** `/public/liam circle small.png`
- **App Store Logos:** `/public/platform-logos/`