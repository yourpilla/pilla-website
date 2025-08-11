const legalPages = [
  {
    id: 1,
    title: 'Privacy Policy',
    href: '/legal/privacy-policy',
    description:
      'Learn how we collect, use, and protect your personal information when you use our hospitality resources and services.',
    date: 'Nov 15, 2024',
    datetime: '2024-11-15',
    category: { title: 'Privacy', href: '/legal?category=privacy' },
    author: {
      name: 'Legal Team',
      role: 'Pilla Legal Department',
      href: '/legal?author=legal-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Terms of Service',
    href: '/legal/terms-of-service',
    description: 'Understand the terms and conditions that govern your use of our hospitality platform, resources, and community features.',
    date: 'Nov 12, 2024',
    datetime: '2024-11-12',
    category: { title: 'Terms', href: '/legal?category=terms' },
    author: {
      name: 'Legal Team',
      role: 'Pilla Legal Department',
      href: '/legal?author=legal-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Cookie Policy',
    href: '/legal/cookie-policy',
    description:
      'Information about how we use cookies and similar technologies to improve your experience on our hospitality platform.',
    date: 'Nov 10, 2024',
    datetime: '2024-11-10',
    category: { title: 'Privacy', href: '/legal?category=privacy' },
    author: {
      name: 'Legal Team',
      role: 'Pilla Legal Department',
      href: '/legal?author=legal-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function LegalPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Legal Information</h2>
          <p className="mt-2 lead">Important legal documents and policies that govern your use of our hospitality platform and services.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {legalPages.map((page) => (
            <article key={page.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={page.datetime} className="text-muted">
                  {page.date}
                </time>
                <a
                  href={page.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {page.category.title}
                </a>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={page.href}>
                    <span className="absolute inset-0" />
                    {page.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{page.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={page.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={page.author.href}>
                      <span className="absolute inset-0" />
                      {page.author.name}
                    </a>
                  </p>
                  <p className="text-muted">{page.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}