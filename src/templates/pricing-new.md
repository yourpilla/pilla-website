# New Pricing Page Template

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

## YAML Frontmatter Forms

### SEO & Meta Data
- **title**: "Pilla Pricing - Hospitality Management Software Plans" | *Page title for SEO and browser tab*
- **slug**: "pricing" | *URL slug for the page*
- **meta**: "Choose the perfect Pilla plan for your hospitality business. Compare features and pricing for Hobby and Enterprise plans with 7-day free trials." | *Meta description for search engines (150-160 characters)*
- **seo_title**: "Pilla Pricing - Hospitality Management Software Plans" | *SEO optimized title tag*
- **unique_id**: "pricing-page-2025" | *Unique identifier for this page*
- **featured**: true | *Whether this page should be featured*
- **category**: "Pricing" | *Page category*

### Navigation & Breadcrumbs
- **breadcrumb_short**: "Pricing" | *Short text for breadcrumb navigation*
- **pillar_text**: "Product" | *Parent section name*
- **pillar_link**: "https://yourpilla.com" | *Link to parent section*

---

## Content & Typography Forms

### Header Section
- **section_tag**: "Pricing" | **typography**: `.h1` `<h1>` and  *[Options: eyebrow, h2, subtitle]*
- **main_description**: "Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales." | **typography**: `<.big-blue>` *[Options: lead, subtitle-lg, subtitle]*
- **background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*

### Two-Column Pricing Plans

#### Plan 1 (Left Column)
- **plan_1_name**: "Basic" | **typography**: `.h2` *[Options: h2, h3, subtitle]*
- **plan_1_price**: "£65" | **typography**: `.h4` *[Options: h1, h2, display-1]*
- **plan_1_period**: "/month" | **typography**: `.small-blue` *[Options: text-sm, text-base]*
- **plan_1_description**: "All the features you need to run your hospitality teams" | **typography**: `.small-blue` *[Options: lead, subtitle, text-sm]*
- **plan_1_features**: | *One feature per line* **typography**: `.small-blue`
```
Shift Scheduling, holidays and payroll
Operations and compliance work activities
Communication threads and messages on everything
Company leaderboard to promote consistency
```
- **plan_1_button_text**: "7-Day Free Trial" | **typography**: `.h3`
- **plan_1_button_link**: "#" 
- **plan_1_featured**: false


#### Plan 2 (Right Column)
- **plan_2_name**: "Pro" | **typography**: `.h2` *[Options: h2, h3, subtitle]*
- **plan_2_price**: "£95" | **typography**: `.h4` *[Options: h1, h2, display-1]*
- **plan_2_period**: "/month" | **typography**: `.small-blue` *[Options: text-sm, text-base]*
- **plan_2_description**: "Extra features which you control to run the most effective teams" | **typography**: `.small-blue` *[Options: lead, subtitle, text-sm]*
- **plan_2_features**: | *One feature per line* **typography**: `.small-blue`
```
Custom onboarding emails for new staff
Custom push notification reminders for staff
Custom leaderboard updates for staff 
Custom insights on team trends for managers
Custom reporting on company performance for admins
 

 
Marketing automations
Custom integrations
```
- **plan_2_button_text**: "7-Day Free Trial" | **typography**: `text-sm font-semibold`
- **plan_2_button_link**: "#"
- **plan_2_featured**: true

### Feature Comparison Table

#### Comparison Headers
- **comparison_plan_1_name**: "Basic" | **typography**: `.h6`
- **comparison_plan_2_name**: "Pro" | **typography**: `.h6`

- **comparison_background**: `bg-gray-50` *[Options: bg-gray-50, bg-white, bg-main]*

#### Shifts Category
- **features_category_name**: "Shifts" | **typography**: `.h6`

- **feature_1_name**: "Automated shift scheduling" | **typography**: `.small-blue`
- **feature_1_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_1_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_2_name**: "Location-based clock-in and out" | **typography**: `.small-blue`
- **feature_2_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_2_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_3_name**: "Holiday and Leave booking" | **typography**: `.small-blue`
- **feature_3_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_3_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_4_name**: "Leave and accrual calculations" | **typography**: `.small-blue`
- **feature_4_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_4_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_5_name**: "Payroll calculations and export" | **typography**: `.small-blue`
- **feature_5_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_5_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_6_name**: "Message thread on every shift" | **typography**: `.small-blue`
- **feature_6_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_6_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_7_name**: "Custom push notification reminders" | **typography**: `.small-blue`
- **feature_7_plan_1_value**: "✗" | *[Options: ✓, ✗, text/numbers]*
- **feature_7_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_8_name**: "Custom shift trends and insights" | **typography**: `.small-blue`
- **feature_8_plan_1_value**: "✗" | *[Options: ✓, ✗, text/numbers]*
- **feature_8_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_9_name**: "Custom shift performance reporting" | **typography**: `.small-blue`
- **feature_9_plan_1_value**: "✗" | *[Options: ✓, ✗, text/numbers]*
- **feature_9_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

#### Work Category
- **reporting_category_name**: "Work" | **typography**: `.h6`

- **feature_1_name**: "9 work element types" | **typography**: `.small-blue`
- **feature_1_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_1_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_2_name**: "Repeating work activies" | **typography**: `.small-blue`
- **feature_2_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_2_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_3_name**: "Issuse highlighting" | **typography**: `.small-blue`
- **feature_3_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_3_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_3_name**: "Full search history" | **typography**: `.small-blue`
- **feature_3_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_3_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_4_name**: "Custom push notification reminders" | **typography**: `.small-blue`
- **feature_4_plan_1_value**: "✗" | *[Options: ✓, ✗, text/numbers]*
- **feature_4_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_5_name**: "Custom shift trends and insights" | **typography**: `.small-blue`
- **feature_5_plan_1_value**: "✗" | *[Options: ✓, ✗, text/numbers]*
- **feature_5_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_6_name**: "Custom shift performance reporting" | **typography**: `.small-blue`
- **feature_6_plan_1_value**: "✗" | *[Options: ✓, ✗, text/numbers]*
- **feature_6_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

#### Communication Category
- **support_category_name**: "Communication" | **typography**: `.h6`

- **feature_1_name**: "Shift threads" | **typography**: `.small-blue`
- **feature_1_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_1_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_2_name**: "Work threads" | **typography**: `.small-blue`
- **feature_2_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_2_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_3_name**: "1on1 Chat" | **typography**: `.small-blue`
- **feature_3_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_3_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_3_name**: "Group Chat" | **typography**: `.small-blue`
- **feature_3_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_3_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

#### Leaderboard Category
- **support_category_name**: "Leaderboards" | **typography**: `.h6`

- **feature_1_name**: "Shift threads" | **typography**: `.small-blue`
- **feature_1_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_1_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_2_name**: "Work threads" | **typography**: `.small-blue`
- **feature_2_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_2_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_3_name**: "1on1 Chat" | **typography**: `.small-blue`
- **feature_3_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_3_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*

- **feature_3_name**: "Group Chat" | **typography**: `.small-blue`
- **feature_3_plan_1_value**: "✓" | *[Options: ✓, ✗, text/numbers]*
- **feature_3_plan_2_value**: "✓" | *[Options: ✓, ✗, text/numbers]*



### Styling Options
- **main_background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*
- **comparison_background**: `bg-gray-50` *[Options: bg-gray-50, bg-white, bg-main]*
- **check_icon_color**: `text-indigo-600` *[Options: text-indigo-600, text-green-600, text-blue-600]*
- **cross_icon_color**: `text-gray-400` *[Options: text-gray-400, text-red-400]*

---

## Instructions:
1. Fill out the forms above with your desired content and styling
2. Update typography classes to match your design system
3. Customize colors and backgrounds as needed
4. The pricing page will automatically update with your changes

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/pricing/page.tsx`

*This template file remains as a working document with original code and forms for reference*