# Pricing Page Template

## Section 1: Two-Column Pricing

### Header Content
<form>
  <div>
    <label>Subtitle (e.g. "Pricing"):</label>
    <input type="text" name="subtitle" value="Pricing" />
  </div>
  <div>
    <label>Main Heading:</label>
    <input type="text" name="main_heading" value="Choose the right plan for you" />
  </div>
  <div>
    <label>Description:</label>
    <textarea name="description">Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</textarea>
  </div>
</form>

### Plan 1 (Left Column)
<form>
  <div>
    <label>Plan Name:</label>
    <input type="text" name="plan1_name" value="Hobby" />
  </div>
  <div>
    <label>Monthly Price:</label>
    <input type="text" name="plan1_price" value="$29" />
  </div>
  <div>
    <label>Description:</label>
    <textarea name="plan1_description">The perfect plan if you're just getting started with our product.</textarea>
  </div>
  <div>
    <label>Features (one per line):</label>
    <textarea name="plan1_features">25 products
Up to 10,000 subscribers
Advanced analytics
24-hour support response time</textarea>
  </div>
  <div>
    <label>Button Text:</label>
    <input type="text" name="plan1_button_text" value="Get started today" />
  </div>
  <div>
    <label>Button Link:</label>
    <input type="text" name="plan1_button_link" value="#" />
  </div>
  <div>
    <label>Featured Plan?</label>
    <input type="checkbox" name="plan1_featured" />
  </div>
</form>

### Plan 2 (Right Column)
<form>
  <div>
    <label>Plan Name:</label>
    <input type="text" name="plan2_name" value="Enterprise" />
  </div>
  <div>
    <label>Monthly Price:</label>
    <input type="text" name="plan2_price" value="$99" />
  </div>
  <div>
    <label>Description:</label>
    <textarea name="plan2_description">Dedicated support and infrastructure for your company.</textarea>
  </div>
  <div>
    <label>Features (one per line):</label>
    <textarea name="plan2_features">Unlimited products
Unlimited subscribers
Advanced analytics
Dedicated support representative
Marketing automations
Custom integrations</textarea>
  </div>
  <div>
    <label>Button Text:</label>
    <input type="text" name="plan2_button_text" value="Get started today" />
  </div>
  <div>
    <label>Button Link:</label>
    <input type="text" name="plan2_button_link" value="#" />
  </div>
  <div>
    <label>Featured Plan?</label>
    <input type="checkbox" name="plan2_featured" checked />
  </div>
</form>

## Section 2: Feature Comparison Table

### Comparison Table Content
<form>
  <div>
    <label>Column 1 Header (Plan Name):</label>
    <input type="text" name="comparison_plan1_name" value="Starter" />
  </div>
  <div>
    <label>Column 2 Header (Plan Name):</label>
    <input type="text" name="comparison_plan2_name" value="Enterprise" />
  </div>
</form>

### Feature Categories

#### Features Category
<form>
  <div>
    <label>Category Name:</label>
    <input type="text" name="features_category_name" value="Features" />
  </div>
  <div>
    <label>Feature 1 Name:</label>
    <input type="text" name="feature1_name" value="Edge content delivery" />
  </div>
  <div>
    <label>Feature 1 - Plan 1 Value:</label>
    <input type="text" name="feature1_plan1" value="✓" />
  </div>
  <div>
    <label>Feature 1 - Plan 2 Value:</label>
    <input type="text" name="feature1_plan2" value="✓" />
  </div>
  
  <div>
    <label>Feature 2 Name:</label>
    <input type="text" name="feature2_name" value="Custom domains" />
  </div>
  <div>
    <label>Feature 2 - Plan 1 Value:</label>
    <input type="text" name="feature2_plan1" value="1" />
  </div>
  <div>
    <label>Feature 2 - Plan 2 Value:</label>
    <input type="text" name="feature2_plan2" value="Unlimited" />
  </div>
  
  <div>
    <label>Feature 3 Name:</label>
    <input type="text" name="feature3_name" value="Team members" />
  </div>
  <div>
    <label>Feature 3 - Plan 1 Value:</label>
    <input type="text" name="feature3_plan1" value="3" />
  </div>
  <div>
    <label>Feature 3 - Plan 2 Value:</label>
    <input type="text" name="feature3_plan2" value="Unlimited" />
  </div>
  
  <div>
    <label>Feature 4 Name:</label>
    <input type="text" name="feature4_name" value="Single sign-on (SSO)" />
  </div>
  <div>
    <label>Feature 4 - Plan 1 Value:</label>
    <input type="text" name="feature4_plan1" value="✗" />
  </div>
  <div>
    <label>Feature 4 - Plan 2 Value:</label>
    <input type="text" name="feature4_plan2" value="✓" />
  </div>
</form>

#### Reporting Category
<form>
  <div>
    <label>Category Name:</label>
    <input type="text" name="reporting_category_name" value="Reporting" />
  </div>
  <div>
    <label>Feature 1 Name:</label>
    <input type="text" name="reporting_feature1_name" value="Advanced analytics" />
  </div>
  <div>
    <label>Feature 1 - Plan 1 Value:</label>
    <input type="text" name="reporting_feature1_plan1" value="✓" />
  </div>
  <div>
    <label>Feature 1 - Plan 2 Value:</label>
    <input type="text" name="reporting_feature1_plan2" value="✓" />
  </div>
  
  <div>
    <label>Feature 2 Name:</label>
    <input type="text" name="reporting_feature2_name" value="Basic reports" />
  </div>
  <div>
    <label>Feature 2 - Plan 1 Value:</label>
    <input type="text" name="reporting_feature2_plan1" value="✗" />
  </div>
  <div>
    <label>Feature 2 - Plan 2 Value:</label>
    <input type="text" name="reporting_feature2_plan2" value="✓" />
  </div>
  
  <div>
    <label>Feature 3 Name:</label>
    <input type="text" name="reporting_feature3_name" value="Professional reports" />
  </div>
  <div>
    <label>Feature 3 - Plan 1 Value:</label>
    <input type="text" name="reporting_feature3_plan1" value="✗" />
  </div>
  <div>
    <label>Feature 3 - Plan 2 Value:</label>
    <input type="text" name="reporting_feature3_plan2" value="✓" />
  </div>
  
  <div>
    <label>Feature 4 Name:</label>
    <input type="text" name="reporting_feature4_name" value="Custom report builder" />
  </div>
  <div>
    <label>Feature 4 - Plan 1 Value:</label>
    <input type="text" name="reporting_feature4_plan1" value="✗" />
  </div>
  <div>
    <label>Feature 4 - Plan 2 Value:</label>
    <input type="text" name="reporting_feature4_plan2" value="✓" />
  </div>
</form>

#### Support Category
<form>
  <div>
    <label>Category Name:</label>
    <input type="text" name="support_category_name" value="Support" />
  </div>
  <div>
    <label>Feature 1 Name:</label>
    <input type="text" name="support_feature1_name" value="24/7 online support" />
  </div>
  <div>
    <label>Feature 1 - Plan 1 Value:</label>
    <input type="text" name="support_feature1_plan1" value="✓" />
  </div>
  <div>
    <label>Feature 1 - Plan 2 Value:</label>
    <input type="text" name="support_feature1_plan2" value="✓" />
  </div>
  
  <div>
    <label>Feature 2 Name:</label>
    <input type="text" name="support_feature2_name" value="Quarterly workshops" />
  </div>
  <div>
    <label>Feature 2 - Plan 1 Value:</label>
    <input type="text" name="support_feature2_plan1" value="✗" />
  </div>
  <div>
    <label>Feature 2 - Plan 2 Value:</label>
    <input type="text" name="support_feature2_plan2" value="✓" />
  </div>
  
  <div>
    <label>Feature 3 Name:</label>
    <input type="text" name="support_feature3_name" value="Priority phone support" />
  </div>
  <div>
    <label>Feature 3 - Plan 1 Value:</label>
    <input type="text" name="support_feature3_plan1" value="✗" />
  </div>
  <div>
    <label>Feature 3 - Plan 2 Value:</label>
    <input type="text" name="support_feature3_plan2" value="✓" />
  </div>
  
  <div>
    <label>Feature 4 Name:</label>
    <input type="text" name="support_feature4_name" value="1:1 onboarding tour" />
  </div>
  <div>
    <label>Feature 4 - Plan 1 Value:</label>
    <input type="text" name="support_feature4_plan1" value="✗" />
  </div>
  <div>
    <label>Feature 4 - Plan 2 Value:</label>
    <input type="text" name="support_feature4_plan2" value="✓" />
  </div>
</form>

---

## Original React Code Structure

```javascript
// Section 1: Two-Column Pricing (keep as-is, but make data dynamic)

// Section 2: Modified Comparison Table (remove header, remove middle column, keep only 2-column comparison)
```

This template structure provides:

1. **Editable Header Content** - Subtitle, main heading, and description for the two-column section
2. **Two Plan Configuration** - Complete forms for both pricing plans including features, pricing, buttons
3. **Feature Comparison Table** - Organized by categories (Features, Reporting, Support) with two-column comparison
4. **Flexible Feature Values** - Support for checkmarks (✓), X marks (✗), numbers, or text values

The mini-forms allow you to:
- Edit all text content 
- Add/modify features for each plan
- Set pricing and button links
- Configure which plan is "featured"
- Customize the comparison table with any feature combinations

Would you like me to create the actual pricing page component that reads from this template data?