# CSS Styles Reference

This template lists the simplified typography system for easy editing.

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

## Core Typography Classes

### Headings (HTML Elements and CSS Classes)

#### h1 / .h1
- **Font Size:** 3rem (48px) / 2.25rem (36px) on mobile
- **Font Weight:** 800
- **Line Height:** 1.1
- **Letter Spacing:** -0.04em / -0.03em on mobile
- **Color:** #374151
- **Margin Bottom:** 1.25rem

#### h2 / .h2
- **Font Size:** 2.25rem (36px) / 1.875rem (30px) on mobile
- **Font Weight:** 700
- **Line Height:** 1.15
- **Letter Spacing:** -0.03em
- **Color:** #374151
- **Margin Bottom:** 1rem

#### h3 / .h3
- **Font Size:** 1.875rem (30px) / 1.5rem (24px) on mobile
- **Font Weight:** 700
- **Line Height:** 1.2
- **Letter Spacing:** -0.025em
- **Color:** #374151
- **Margin Bottom:** 0.875rem

#### h4 / .h4
- **Font Size:** 1.5rem (24px)
- **Font Weight:** 600
- **Line Height:** 1.25
- **Letter Spacing:** -0.02em
- **Color:** #374151
- **Margin Bottom:** 0.75rem

#### h5 / .h5
- **Font Size:** 1.25rem (20px)
- **Font Weight:** 600
- **Line Height:** 1.3
- **Letter Spacing:** -0.015em
- **Color:** #374151
- **Margin Bottom:** 0.625rem

#### h6 / .h6
- **Font Size:** 1.125rem (18px)
- **Font Weight:** 600
- **Line Height:** 1.35
- **Letter Spacing:** -0.01em
- **Color:** #374151
- **Margin Bottom:** 0.5rem

### Content Typography Classes

#### .big-grey
- **Font Size:** 1.125rem (18px)
- **Font Weight:** 400
- **Line Height:** 1.55
- **Color:** #9CA3AF
- **Margin Bottom:** 1rem
- **Usage:** Small subtitles

#### .big-blue
- **Font Size:** 1.5rem (24px)
- **Font Weight:** 400
- **Line Height:** 1.6
- **Color:** #374151
- **Margin Bottom:** 1.5rem
- **Letter Spacing:** -0.01em
- **Usage:** Introduction paragraphs

#### .small-blue
- **Font Size:** 1.125rem (18px)
- **Font Weight:** 400
- **Line Height:** 1.6
- **Color:** #374151
- **Usage:** Default body text

#### .small-grey
- **Color:** #9CA3AF
- **Usage:** Secondary/descriptive text (can be applied to any element)

## Icon Styles

#### .small-blue-icon
- **Size:** 1rem (16px)
- **Color:** #374151
- **Usage:** Small icons with main color

#### .big-blue-icon
- **Size:** 1.5rem (24px)
- **Color:** #374151
- **Usage:** Large icons with main color

#### .small-grey-icon
- **Size:** 1rem (16px)
- **Color:** #9CA3AF
- **Usage:** Small icons with muted color

#### .big-grey-icon
- **Size:** 1.5rem (24px)
- **Color:** #9CA3AF
- **Usage:** Large icons with muted color

## Component Styles

### Button Styles

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

### Form Styles

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

## Utility Classes

#### .bg-main
- **Background Color:** var(--background) [#FAF9FB]

#### .bg-header-group
- **Background Color:** #f8fbfe

#### .border-default
- **Border:** 1px solid var(--border) [#D0D5DD]

#### .rounded-default
- **Border Radius:** var(--radius) [5px]

---

## Usage Guidelines

### Typography Hierarchy
1. **h1-h6** - Use semantic heading elements OR CSS classes (identical styling)
2. **big-grey** - For small subtitles and section descriptions
3. **big-blue** - For introduction paragraphs and important content
4. **small-blue** - Default body text (your main paragraph style)
5. **small-grey** - Apply to any text that should be secondary/gray

### Simple Rules
- **One class per text element** - No mixing or combining
- **Headings flexible** - Use `<h4>` OR `className="h4"` (same result)
- **Consistent application** - Same content type = same class
- **Clear hierarchy** - Headings → Big Blue → Small Blue → Small Grey
- **Intuitive naming** - Size (big/small) + Color (blue/grey)

### Examples
```html
<h1>Page Title</h1>                    <!-- HTML element (auto-styled) -->
<a href="/pricing" class="h4">Pricing</a>     <!-- CSS class (same styling) -->
<p class="big-grey">Section intro</p>
<p class="big-blue">Important introduction paragraph</p>
<p class="small-blue">Regular body content</p>
<p class="small-grey">Secondary information</p>
```