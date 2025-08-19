# CSS Styles Reference

This template lists all CSS styles and their properties for easy editing in markdown format.

## CSS Variables

### Brand Colors
```css
--background: #FAF9FB;          /* Main background - softer on eyes */
--foreground: #374151;          /* Main text */
--muted: #9CA3AF;               /* Secondary text, placeholders */
--border: #D0D5DD;              /* Borders */
--white: #FFFFFF;               /* Pure white for inputs, header */
```

### Spacing System (8px grid)
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### Border Radius
```css
--radius: 5px;
```

## Typography Classes

### Display Classes (Hero/Large text)

#### .display-1
- **Font Size:** 4rem (64px) / 2.75rem (44px) on mobile
- **Font Weight:** 800
- **Line Height:** 1.1
- **Letter Spacing:** -0.05em / -0.04em on mobile
- **Color:** #374151

#### .display-2
- **Font Size:** 3.5rem (56px) / 2.5rem (40px) on mobile
- **Font Weight:** 800
- **Line Height:** 1.1
- **Letter Spacing:** -0.045em / -0.035em on mobile
- **Color:** #374151

### Heading Classes

#### h1
- **Font Size:** 3rem (48px) / 2.25rem (36px) on mobile
- **Font Weight:** 800
- **Line Height:** 1.1
- **Letter Spacing:** -0.04em / -0.03em on mobile
- **Margin Bottom:** 1.25rem

#### h2
- **Font Size:** 2.25rem (36px) / 1.875rem (30px) on mobile
- **Font Weight:** 700
- **Line Height:** 1.15
- **Letter Spacing:** -0.03em
- **Margin Bottom:** 1rem

#### h3
- **Font Size:** 1.875rem (30px) / 1.5rem (24px) on mobile
- **Font Weight:** 700
- **Line Height:** 1.2
- **Letter Spacing:** -0.025em
- **Margin Bottom:** 0.875rem

#### h4
- **Font Size:** 1.5rem (24px)
- **Font Weight:** 600
- **Line Height:** 1.25
- **Letter Spacing:** -0.02em
- **Margin Bottom:** 0.75rem

#### h5
- **Font Size:** 1.25rem (20px)
- **Font Weight:** 600
- **Line Height:** 1.3
- **Letter Spacing:** -0.015em
- **Margin Bottom:** 0.625rem

#### h6
- **Font Size:** 1.125rem (18px)
- **Font Weight:** 600
- **Line Height:** 1.35
- **Letter Spacing:** -0.01em
- **Margin Bottom:** 0.5rem

### Subtitle Classes

#### .subtitle-lg
- **Font Size:** 1.5rem (24px)
- **Font Weight:** 400
- **Line Height:** 1.4
- **Color:** #9CA3AF
- **Margin Bottom:** 2rem
- **Letter Spacing:** -0.015em

#### .subtitle
- **Font Size:** 1.25rem (20px)
- **Font Weight:** 400
- **Line Height:** 1.5
- **Color:** #9CA3AF
- **Margin Bottom:** 1.5rem
- **Letter Spacing:** -0.01em

#### .subtitle-sm
- **Font Size:** 1.125rem (18px)
- **Font Weight:** 400
- **Line Height:** 1.55
- **Color:** #9CA3AF
- **Margin Bottom:** 1rem

### Body Text Classes

#### .lead
- **Font Size:** 1.25rem (20px)
- **Font Weight:** 400
- **Line Height:** 1.6
- **Color:** #374151
- **Margin Bottom:** 1.5rem
- **Letter Spacing:** -0.01em

#### p (default body text)
- **Font Size:** 1rem (16px)
- **Font Weight:** 400
- **Line Height:** 1.65
- **Color:** #374151
- **Margin Bottom:** 1.25rem

#### .text-lg
- **Font Size:** 1.125rem (18px)
- **Line Height:** 1.6

#### .text-sm
- **Font Size:** 0.875rem (14px)
- **Line Height:** 1.6

#### .text-xs
- **Font Size:** 0.75rem (12px)
- **Line Height:** 1.5

#### .small-medium
- **Font Size:** 0.875rem (14px)
- **Font Weight:** 500
- **Line Height:** 1.6

#### .small-semibold
- **Font Size:** 0.875rem (14px)
- **Font Weight:** 600
- **Line Height:** 1.6

#### .large-medium
- **Font Size:** 1.125rem (18px)
- **Font Weight:** 500
- **Line Height:** 1.6

### Special Text Classes

#### .eyebrow
- **Font Size:** 0.875rem (14px)
- **Font Weight:** 600
- **Text Transform:** uppercase
- **Letter Spacing:** 0.05em
- **Color:** #9CA3AF
- **Margin Bottom:** 0.5rem
- **Display:** block

#### .caption
- **Font Size:** 0.875rem (14px)
- **Font Weight:** 400
- **Line Height:** 1.5
- **Color:** #9CA3AF
- **Margin Top:** 0.5rem

#### .overline
- **Font Size:** 0.75rem (12px)
- **Font Weight:** 700
- **Text Transform:** uppercase
- **Letter Spacing:** 0.08em
- **Color:** #9CA3AF
- **Margin Bottom:** 0.25rem

### Text Color Classes

#### .text-muted
- **Color:** #9CA3AF

#### .text-muted-dark
- **Color:** #6B7280

## Font Weight Classes

#### .font-bold
- **Font Weight:** 700

#### .font-semibold
- **Font Weight:** 600

#### .font-medium
- **Font Weight:** 500

#### .font-normal
- **Font Weight:** 400

#### .font-light
- **Font Weight:** 300

## Link Styles

#### a (default links)
- **Color:** #374151
- **Text Decoration:** underline (1px thickness)
- **Text Underline Offset:** 2px
- **Transition:** all 0.2s ease
- **Hover Color:** #1F2937
- **Hover Decoration:** 2px thickness

#### .link-muted
- **Color:** #9CA3AF
- **Hover Color:** #374151

#### .link-clean
- **Text Decoration:** none
- **Hover:** underline (1px thickness, 2px offset)

## Button Styles

#### .btn
- **Background Color:** #374151
- **Color:** #ffffff
- **Padding:** 10px (all sides)
- **Border Radius:** 5px
- **Font Size:** 24px
- **Font Family:** Arial, sans-serif
- **Font Weight:** 600
- **Border:** none
- **Display:** inline-flex
- **Align Items:** center
- **Justify Content:** center
- **Gap:** 8px
- **Line Height:** 1
- **Transition:** all 0.2s ease
- **Hover Background:** #1F2937
- **Focus Outline:** 2px solid #374151 with 2px offset

## Form Styles

#### .input
- **Background Color:** #FFFFFF
- **Border:** 1px solid #374151
- **Border Radius:** var(--radius) [5px]
- **Padding:** 10px 12px
- **Font Size:** 16px
- **Font Family:** Arial, sans-serif
- **Color:** #374151
- **Transition:** all 0.2s ease
- **Outline:** none
- **Focus Border Color:** #374151
- **Placeholder Color:** #9CA3AF

## Brand Styles

#### .brand
- **Font Size:** 1.25rem (20px)
- **Font Weight:** 700
- **Color:** #374151
- **Line Height:** 1.2

## Navigation Styles

#### .link-nav
- **Color:** #374151
- **Transition:** all 0.2s ease
- **Text Decoration:** underline (1px thickness)
- **Text Underline Offset:** 2px
- **Hover Color:** #1F2937
- **Hover Decoration:** 2px thickness

## Utility Classes

#### .bg-main
- **Background Color:** var(--background) [#FAF9FB]

#### .bg-header-group
- **Background Color:** #f8fbfe

#### .border-default
- **Border:** 1px solid var(--border) [#D0D5DD]

#### .rounded-default
- **Border Radius:** var(--radius) [5px]

## Base Typography Settings

### html
- **Font Family:** Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Line Height:** 1.6
- **Color:** #374151
- **Font Feature Settings:** 'kern' 1, 'liga' 1
- **Text Rendering:** optimizeLegibility
- **Font Smoothing:** antialiased

### body
- **Background:** var(--background) [#FAF9FB]
- **Color:** var(--foreground) [#374151]
- **Font Family:** Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Line Height:** 1.6

### All Headings (h1-h6) Base
- **Font Family:** Arial, sans-serif
- **Font Weight:** 700
- **Line Height:** 1.2
- **Color:** #374151
- **Margin Top:** 0
- **Margin Bottom:** 0.75rem
- **Letter Spacing:** -0.025em

---

## Usage Notes

1. **Responsive Design:** Display and heading classes have mobile-specific sizing
2. **Color System:** Uses CSS variables for consistency
3. **Spacing:** Based on 8px grid system
4. **Typography:** Arial font family with optimized rendering
5. **Accessibility:** Proper contrast ratios and focus states
6. **Performance:** Optimized font loading and rendering