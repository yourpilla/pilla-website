# Tools Pillar Page Template

## Raw React Code from Tailwind
*Paste your Tailwind Plus tools sections here*

const tools = [
  {
    id: 1,
    title: 'Staff Cost Calculator',
    href: '/tools/staff-cost-calculator',
    description:
      'Calculate the true cost of your hospitality staff including wages, benefits, training, and turnover expenses to optimize your labor budget.',
    date: 'Dec 15, 2024',
    datetime: '2024-12-15',
    category: { title: 'Financial', href: '/tools?category=financial' },
    author: {
      name: 'Pilla Team',
      role: 'Hospitality Management Tools',
      href: '/tools?author=pilla-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Food Cost Percentage Calculator',
    href: '/tools/food-cost-percentage-calculator',
    description: 'Determine your food cost percentage and identify opportunities to improve profitability while maintaining quality standards.',
    date: 'Dec 12, 2024',
    datetime: '2024-12-12',
    category: { title: 'Financial', href: '/tools?category=financial' },
    author: {
      name: 'Pilla Team',
      role: 'Hospitality Management Tools',
      href: '/tools?author=pilla-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Revenue Per Available Room (RevPAR) Calculator',
    href: '/tools/revpar-calculator',
    description:
      'Measure your hotel performance with RevPAR calculations to optimize pricing strategies and maximize revenue potential.',
    date: 'Dec 10, 2024',
    datetime: '2024-12-10',
    category: { title: 'Revenue', href: '/tools?category=revenue' },
    author: {
      name: 'Pilla Team',
      role: 'Hospitality Management Tools',
      href: '/tools?author=pilla-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function ToolsPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Hospitality Tools & Calculators</h2>
          <p className="mt-2 lead">Essential calculators and tools to help you manage costs, optimize operations, and make data-driven decisions for your hospitality business.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={tool.datetime} className="text-muted">
                  {tool.date}
                </time>
                <a
                  href={tool.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {tool.category.title}
                </a>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={tool.href}>
                    <span className="absolute inset-0" />
                    {tool.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{tool.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={tool.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={tool.author.href}>
                      <span className="absolute inset-0" />
                      {tool.author.name}
                    </a>
                  </p>
                  <p className="text-muted">{tool.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

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

## Content & Typography Forms

### Header Section
- **main_title**: "Hospitality Tools & Calculators" | **typography**: `h2 + text-4xl font-semibold` *[Options: h2 + text-4xl, h2 + display-2, text-5xl]*
- **subtitle**: "Essential calculators and tools to help you manage costs, optimize operations, and make data-driven decisions for your hospitality business." | **typography**: `lead` *[Options: lead, text-lg, subtitle-lg]*

### Tools Array (3 tools for now)
#### Tool 1
- **tool_1_title**: "Staff Cost Calculator" | **typography**: `font-semibold`
- **tool_1_href**: "/tools/staff-cost-calculator"
- **tool_1_description**: "Calculate the true cost of your hospitality staff including wages, benefits, training, and turnover expenses to optimize your labor budget." | **typography**: `text-sm text-muted`
- **tool_1_date**: "Dec 15, 2024" | **tool_1_datetime**: "2024-12-15"
- **tool_1_category_title**: "Financial" | **typography**: `font-medium`
- **tool_1_category_href**: "/tools?category=financial"
- **tool_1_author_name**: "Pilla Team" | **typography**: `font-semibold`
- **tool_1_author_role**: "Hospitality Management Tools" | **typography**: `text-muted`
- **tool_1_author_href**: "/tools?author=pilla-team"
- **tool_1_author_image**: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

#### Tool 2
- **tool_2_title**: "Food Cost Percentage Calculator" | **typography**: `font-semibold`
- **tool_2_href**: "/tools/food-cost-percentage-calculator"
- **tool_2_description**: "Determine your food cost percentage and identify opportunities to improve profitability while maintaining quality standards." | **typography**: `text-sm text-muted`
- **tool_2_date**: "Dec 12, 2024" | **tool_2_datetime**: "2024-12-12"
- **tool_2_category_title**: "Financial" | **typography**: `font-medium`
- **tool_2_category_href**: "/tools?category=financial"
- **tool_2_author_name**: "Pilla Team" | **typography**: `font-semibold`
- **tool_2_author_role**: "Hospitality Management Tools" | **typography**: `text-muted`
- **tool_2_author_href**: "/tools?author=pilla-team"
- **tool_2_author_image**: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

#### Tool 3
- **tool_3_title**: "Revenue Per Available Room (RevPAR) Calculator" | **typography**: `font-semibold`
- **tool_3_href**: "/tools/revpar-calculator"
- **tool_3_description**: "Measure your hotel performance with RevPAR calculations to optimize pricing strategies and maximize revenue potential." | **typography**: `text-sm text-muted`
- **tool_3_date**: "Dec 10, 2024" | **tool_3_datetime**: "2024-12-10"
- **tool_3_category_title**: "Revenue" | **typography**: `font-medium`
- **tool_3_category_href**: "/tools?category=revenue"
- **tool_3_author_name**: "Pilla Team" | **typography**: `font-semibold`
- **tool_3_author_role**: "Hospitality Management Tools" | **typography**: `text-muted`
- **tool_3_author_href**: "/tools?author=pilla-team"
- **tool_3_author_image**: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

### Additional Tools (Optional)
#### Tool 4
- **tool_4_title**: "Labor Cost Percentage Calculator" | **typography**: `font-semibold`
- **tool_4_href**: "/tools/labor-cost-percentage-calculator"
- **tool_4_description**: "Calculate optimal labor costs as a percentage of revenue to maintain profitability while ensuring adequate staffing levels." | **typography**: `text-sm text-muted`
- **tool_4_category**: "Financial"

#### Tool 5
- **tool_5_title**: "Break-Even Analysis Calculator" | **typography**: `font-semibold`
- **tool_5_href**: "/tools/break-even-analysis-calculator"
- **tool_5_description**: "Determine the minimum revenue needed to cover all costs and identify your path to profitability." | **typography**: `text-sm text-muted`
- **tool_5_category**: "Financial"

#### Tool 6
- **tool_6_title**: "Inventory Turnover Calculator" | **typography**: `font-semibold`
- **tool_6_href**: "/tools/inventory-turnover-calculator"
- **tool_6_description**: "Optimize your inventory management by calculating turnover rates and identifying slow-moving stock." | **typography**: `text-sm text-muted`
- **tool_6_category**: "Operations"

#### Tool 7
- **tool_7_title**: "Average Daily Rate (ADR) Calculator" | **typography**: `font-semibold`
- **tool_7_href**: "/tools/adr-calculator"
- **tool_7_description**: "Track your hotel's average daily rate to optimize pricing strategies and revenue management." | **typography**: `text-sm text-muted`
- **tool_7_category**: "Revenue"

#### Tool 8
- **tool_8_title**: "Guest Satisfaction Score Calculator" | **typography**: `font-semibold`
- **tool_8_href**: "/tools/guest-satisfaction-score-calculator"
- **tool_8_description**: "Measure and track guest satisfaction metrics to improve service quality and customer loyalty." | **typography**: `text-sm text-muted`
- **tool_8_category**: "Analytics"

#### Tool 9
- **tool_9_title**: "Table Turnover Rate Calculator" | **typography**: `font-semibold`
- **tool_9_href**: "/tools/table-turnover-rate-calculator"
- **tool_9_description**: "Optimize restaurant seating efficiency by calculating and improving your table turnover rates." | **typography**: `text-sm text-muted`
- **tool_9_category**: "Operations"

### Tool Categories
- **financial**: "Financial" - Cost analysis, budgeting, profitability tools
- **revenue**: "Revenue" - Revenue optimization, pricing, performance metrics
- **operations**: "Operations" - Operational efficiency, inventory, scheduling
- **analytics**: "Analytics" - Performance tracking, reporting, KPI measurement

### Styling Options
- **background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*
- **card_background**: `bg-white` *[Options: bg-white, bg-gray-50]*
- **category_badge_style**: `bg-gray-50 text-gray-600` *[Options: bg-gray-50 text-gray-600, bg-blue-50 text-blue-600]*
- **layout**: `3-column grid` *[Options: 3-column grid, 2-column grid, list view]*

---

## Instructions:
1. Paste your raw Tailwind Plus tools page code above
2. I'll analyze it and create content + typography forms
3. You'll fill out the forms with your calculator/tool information
4. I'll generate the final tools pillar page component

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/tools/page.tsx`

*This template file remains as a working document with original code and forms for reference*