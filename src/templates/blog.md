# Blog Pillar Page Template

## YAML Frontmatter Forms

### SEO & Meta Data
- **title**: "Pilla Blog - Hospitality Management Insights & Tips" | *Page title for SEO and browser tab*
- **slug**: "blog" | *URL slug for the page*
- **meta**: "Expert insights on hospitality management, shift scheduling, team leadership, and restaurant operations. Read the latest tips from Pilla's hospitality experts." | *Meta description for search engines (150-160 characters)*
- **seo_title**: "Hospitality Management Blog - Expert Tips & Insights | Pilla" | *SEO optimized title tag*
- **unique_id**: "blog-pillar-2025" | *Unique identifier for this page*
- **featured**: true | *Whether this page should be featured*
- **category**: "Blog" | *Page category*

### Navigation & Breadcrumbs
- **breadcrumb_short**: "Blog" | *Short text for breadcrumb navigation*
- **pillar_text**: "Resources" | *Parent section name*
- **pillar_link**: "https://yourpilla.com" | *Link to parent section*

### Structured Data (JSON-LD Schema)
- **blog_schema**: | *Schema.org Blog markup*
```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Pilla Blog",
  "description": "Expert insights on hospitality management, shift scheduling, and restaurant operations",
  "url": "https://yourpilla.com/blog",
  "inLanguage": "en-GB",
  "publisher": {
    "@type": "Organization",
    "name": "Pilla",
    "url": "https://yourpilla.com"
  }
}
```

- **breadcrumb_schema**: | *Schema.org BreadcrumbList markup*
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yourpilla.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://yourpilla.com/blog"
    }
  ]
}
```

---

## Raw React Code from Tailwind
*Paste your Tailwind Plus blog sections here*

const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    description: 'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    category: { title: 'Sales', href: '#' },
    author: {
      name: 'Lindsay Walton',
      role: 'Front-end Developer',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Improve your customer experience',
    href: '#',
    description:
      'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla eu labore irure incididunt velit cillum quis magna dolore.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    category: { title: 'Business', href: '#' },
    author: {
      name: 'Tom Cook',
      role: 'Director of Product',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="display-2 tracking-tight text-pretty text-gray-900">From the blog</h2>
          <p className="mt-2 lead text-muted">Learn how to grow your business with our expert advice.</p>
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


export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="eyebrow brand">Blog</h2>
          <p className="mt-2 display-1 tracking-tight text-balance text-gray-900">
            From the blog
          </p>
          <p className="mt-6 lead text-muted">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article className="flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
                className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 caption">
                <time dateTime="2020-03-16" className="text-muted">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 small-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 large-medium text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    Boost your conversion rate
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-muted">
                  Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo
                  necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-10 rounded-full bg-gray-100"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Michael Foster
                    </a>
                  </p>
                  <p className="text-gray-600">Co-Founder / CTO</p>
                </div>
              </div>
            </div>
          </article>

          <article className="flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
                className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 caption">
                <time dateTime="2020-03-16" className="text-muted">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 small-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 large-medium text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    How to use search engine optimization to drive sales
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-muted">
                  Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-10 rounded-full bg-gray-100"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Lindsay Walton
                    </a>
                  </p>
                  <p className="text-gray-600">Front-end Developer</p>
                </div>
              </div>
            </div>
          </article>

          <article className="flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
                className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 caption">
                <time dateTime="2020-03-16" className="text-muted">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 small-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 large-medium text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    Improve your customer experience
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-muted">
                  Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci
                  rem et corporis.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-10 rounded-full bg-gray-100"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Tom Cook
                    </a>
                  </p>
                  <p className="text-gray-600">Director of Product</p>
                </div>
              </div>
            </div>
          </article>

          <article className="flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 caption">
                <time dateTime="2020-03-16" className="text-muted">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 small-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 large-medium text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    Writing effective landing page copy
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-muted">
                  Sunt reprehenderit voluptatem veritatis eveniet voluptate. Aut consectetur voluptatem aspernatur
                  sequi sit laborum. Voluptas enim dolorum voluptatum nam voluptas exercitationem nam officia. Eos
                  rerum unde numquam sapiente hic tempora et.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-10 rounded-full bg-gray-100"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Dries Vincent
                    </a>
                  </p>
                  <p className="text-gray-600">Business Relations</p>
                </div>
              </div>
            </div>
          </article>

          <article className="flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 caption">
                <time dateTime="2020-03-16" className="text-muted">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 small-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 large-medium text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    How to grow your business with content marketing
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-muted">
                  Libero neque animi esse distinctio nihil sunt veritatis. Suscipit corrupti et veniam optio sit.
                  Sed consequatur rerum molestias amet.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-10 rounded-full bg-gray-100"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Emily Selman
                    </a>
                  </p>
                  <p className="text-gray-600">VP, User Experience</p>
                </div>
              </div>
            </div>
          </article>

          <article className="flex flex-col items-start justify-between">
            <div className="relative w-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80"
                className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="max-w-xl">
              <div className="mt-8 flex items-center gap-x-4 caption">
                <time dateTime="2020-03-16" className="text-muted">
                  Mar 16, 2020
                </time>
                <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 small-medium text-gray-600 hover:bg-gray-100"
                >
                  Marketing
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 large-medium text-gray-900 group-hover:text-gray-600">
                  <a href="#">
                    <span className="absolute inset-0" />
                    Our top 10 Javascript frameworks to use
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-muted">
                  Iure laudantium temporibus minus voluptatem assumenda voluptatem est. Molestias enim earum cum
                  voluptas. Minima consequuntur est.
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-10 rounded-full bg-gray-100"
                />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      Courtney Henry
                    </a>
                  </p>
                  <p className="text-gray-600">Designer</p>
                </div>
              </div>
            </div>
          </article>
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
- **caption** - Extra small text (12px)
- **caption** - Small descriptive text
- **overline** - Tiny uppercase text

---

## Content & Typography Forms

### Header Section (Left Aligned)
- **main_title**: "Hospitality Templates and Guides" | **typography**: `.h1` and `<h1>` *[Options: h2 + text-4xl, h2 + display-2, h1]*
- **subtitle**: "Expert guides, practical tips, and industry knowledge to help you excel in hospitality management and operations." | **typography**: `.big.blue` *[Options: lead, subtitle, subtitle-lg]*

### Blog Posts Array (3 posts for now)
#### Post 1
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

#### Post 2
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

#### Post 3
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

### Styling Options
- **background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*
- **card_background**: `bg-white` *[Options: bg-white, bg-gray-50]*
- **category_badge_style**: `bg-gray-50 text-gray-600` *[Options: bg-gray-50 text-gray-600, bg-blue-50 text-blue-600]*
- **image_aspect_ratio**: `aspect-video` *[Options: aspect-video, aspect-[2/1], aspect-[3/2]]*

---

## Instructions:
1. Paste your raw Tailwind Plus blog code above
2. I'll analyze it and create content + typography forms
3. You'll fill out the forms with your content and styling preferences
4. I'll generate the final blog pillar page component

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/blog/page.tsx`

*This template file remains as a working document with original code and forms for reference*