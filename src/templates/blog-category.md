# Blog Category Page Template

## Raw React Code from Tailwind
*This is the processed code used across all blog category pages*

```tsx
const posts = [
  {
    id: 1,
    title: 'Restaurant Kitchen Management: Essential Systems for Success',
    href: '/blog/restaurant-kitchen-management-systems',
    description:
      'Streamline your kitchen operations with proven management systems that reduce waste, improve efficiency, and maintain consistent food quality during busy service periods.',
    date: 'Nov 15, 2024',
    datetime: '2024-11-15',
    category: { title: 'Operations', href: '/blog?category=operations' },
    author: {
      name: 'Sarah Johnson',
      role: 'Head Chef & Operations Consultant',
      href: '/blog?author=sarah-johnson',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Creating Memorable Guest Experiences: A Complete Guide',
    href: '/blog/memorable-guest-experiences-guide',
    description: 'Learn how to exceed guest expectations through personalized service, attention to detail, and proactive problem-solving techniques that build lasting customer loyalty.',
    date: 'Nov 12, 2024',
    datetime: '2024-11-12',
    category: { title: 'Guest Services', href: '/blog?category=guest-services' },
    author: {
      name: 'Emma Martinez',
      role: 'Hotel Manager & Guest Experience Expert',
      href: '/blog?author=emma-martinez',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'HACCP Implementation: Step-by-Step Food Safety Guide',
    href: '/blog/haccp-implementation-food-safety-guide',
    description:
      'Master HACCP principles with our comprehensive guide covering critical control points, monitoring procedures, and documentation requirements for hospitality businesses and restaurant operations.',
    date: 'Nov 10, 2024',
    datetime: '2024-11-10',
    category: { title: 'Food Safety', href: '/blog?category=food-safety' },
    author: {
      name: 'Marcus Chen',
      role: 'Food Safety Consultant',
      href: '/blog?author=marcus-chen',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function CategoryPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 display-2 tracking-tight text-pretty text-gray-900">[CATEGORY_TITLE]</h2>
          <p className="mt-2 lead">[CATEGORY_DESCRIPTION]</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 caption">
                <time dateTime={post.datetime} className="text-muted">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 small-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 large-medium text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-muted">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-muted">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
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

## Category Configuration

### Category 1: Hospitality Job Roles
- **category_title**: "Hospitality Job Roles" | **typography**: `h2 + display-2`
- **category_description**: "Complete job descriptions, role responsibilities, and career guidance for hospitality positions from entry-level to management." | **typography**: `lead`
- **file_path**: `/src/app/blog/hospitality-job-roles/page.tsx`
- **function_name**: `HospitalityJobRolesPage`

### Category 2: Interviews  
- **category_title**: "Interviews" | **typography**: `h2 + display-2`
- **category_description**: "Interview techniques, questions, and best practices for hiring the right hospitality talent and preparing for hospitality job interviews." | **typography**: `lead`
- **file_path**: `/src/app/blog/interviews/page.tsx`
- **function_name**: `InterviewsPage`

### Category 3: Restaurant Staff Onboarding
- **category_title**: "Restaurant Staff Onboarding" | **typography**: `h2 + display-2`
- **category_description**: "Comprehensive onboarding guides, training programs, and best practices for successfully integrating new restaurant and hospitality staff." | **typography**: `lead`
- **file_path**: `/src/app/blog/restaurant-staff-onboarding/page.tsx`
- **function_name**: `RestaurantStaffOnboardingPage`

### Category 4: Food Safety Management System
- **category_title**: "Food Safety Management System" | **typography**: `h2 + display-2`
- **category_description**: "HACCP implementation, food safety protocols, and management systems to ensure compliance and protect your guests and business." | **typography**: `lead`
- **file_path**: `/src/app/blog/food-safety-management-system/page.tsx`
- **function_name**: `FoodSafetyManagementSystemPage`

### Category 5: Hospitality Risks
- **category_title**: "Hospitality Risks" | **typography**: `h2 + display-2`
- **category_description**: "Risk management strategies, safety protocols, and prevention measures to protect guests, staff, and your hospitality business." | **typography**: `lead`
- **file_path**: `/src/app/blog/hospitality-risks/page.tsx`
- **function_name**: `HospitalityRisksPage`

### Category 6: Operations
- **category_title**: "Operations" | **typography**: `h2 + display-2`
- **category_description**: "Operational excellence strategies, management systems, and efficiency improvements for hospitality and restaurant businesses." | **typography**: `lead`
- **file_path**: `/src/app/blog/operations/page.tsx`
- **function_name**: `OperationsPage`

---

## Blog Posts Array (Shared Across All Categories)

### Post 1
- **post_1_title**: "Restaurant Kitchen Management: Essential Systems for Success" | **typography**: `large-medium`
- **post_1_href**: "/blog/restaurant-kitchen-management-systems"
- **post_1_description**: "Streamline your kitchen operations with proven management systems that reduce waste, improve efficiency, and maintain consistent food quality during busy service periods." | **typography**: `text-sm text-muted`
- **post_1_date**: "Nov 15, 2024" | **post_1_datetime**: "2024-11-15"
- **post_1_category_title**: "Operations" | **typography**: `small-medium`
- **post_1_category_href**: "/blog?category=operations"
- **post_1_author_name**: "Sarah Johnson" | **typography**: `large-medium`
- **post_1_author_role**: "Head Chef & Operations Consultant" | **typography**: `text-muted`
- **post_1_author_href**: "/blog?author=sarah-johnson"
- **post_1_author_image**: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

### Post 2
- **post_2_title**: "Creating Memorable Guest Experiences: A Complete Guide" | **typography**: `large-medium`
- **post_2_href**: "/blog/memorable-guest-experiences-guide"
- **post_2_description**: "Learn how to exceed guest expectations through personalized service, attention to detail, and proactive problem-solving techniques that build lasting customer loyalty." | **typography**: `text-sm text-muted`
- **post_2_date**: "Nov 12, 2024" | **post_2_datetime**: "2024-11-12"
- **post_2_category_title**: "Guest Services" | **typography**: `small-medium`
- **post_2_category_href**: "/blog?category=guest-services"
- **post_2_author_name**: "Emma Martinez" | **typography**: `large-medium`
- **post_2_author_role**: "Hotel Manager & Guest Experience Expert" | **typography**: `text-muted`
- **post_2_author_href**: "/blog?author=emma-martinez"
- **post_2_author_image**: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

### Post 3
- **post_3_title**: "HACCP Implementation: Step-by-Step Food Safety Guide" | **typography**: `large-medium`
- **post_3_href**: "/blog/haccp-implementation-food-safety-guide"
- **post_3_description**: "Master HACCP principles with our comprehensive guide covering critical control points, monitoring procedures, and documentation requirements for hospitality businesses and restaurant operations." | **typography**: `text-sm text-muted`
- **post_3_date**: "Nov 10, 2024" | **post_3_datetime**: "2024-11-10"
- **post_3_category_title**: "Food Safety" | **typography**: `small-medium`
- **post_3_category_href**: "/blog?category=food-safety"
- **post_3_author_name**: "Marcus Chen" | **typography**: `large-medium`
- **post_3_author_role**: "Food Safety Consultant" | **typography**: `text-muted`
- **post_3_author_href**: "/blog?author=marcus-chen"
- **post_3_author_image**: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

---

## Deployment Instructions

### To Update All Category Pages:
1. **Update the template above** with new content/posts
2. **Run the deployment process** to apply changes to all 6 category pages:
   - `/src/app/blog/hospitality-job-roles/page.tsx`
   - `/src/app/blog/interviews/page.tsx`
   - `/src/app/blog/restaurant-staff-onboarding/page.tsx`
   - `/src/app/blog/food-safety-management-system/page.tsx`
   - `/src/app/blog/hospitality-risks/page.tsx`
   - `/src/app/blog/operations/page.tsx`

### Template Variables to Replace:
- `[CATEGORY_TITLE]` → Specific category title
- `[CATEGORY_DESCRIPTION]` → Category-specific description  
- `CategoryPage` → Specific function name for each page

---

## Styling Options
- **background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*
- **card_background**: `bg-white` *[Options: bg-white, bg-gray-50]*
- **category_badge_style**: `bg-gray-50 text-gray-600` *[Options: bg-gray-50 text-gray-600, bg-blue-50 text-blue-600]*
- **layout**: `3-column grid` *[Options: 3-column grid, 2-column grid, list view]*

---

## Instructions:
1. Update the shared blog posts array and content in this template
2. I'll process the template and update all 6 category pages simultaneously
3. Each page will maintain its unique title and description while sharing the same posts and layout
4. This ensures consistency across all blog category pages while allowing easy bulk updates

---

*This template file serves as the master template for all blog category pages*