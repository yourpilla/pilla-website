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

export default function OperationsPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Operations</h2>
          <p className="mt-2 lead">Expert guides, practical tips, and industry knowledge to help you excel in hospitality management and operations.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between relative white-card p-6 rounded-lg">
              {'featured' in post && post.featured === true && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="small-blue green-card px-2 py-1">Featured</span>
                </div>
              )}
              <div className="mt-6"></div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}