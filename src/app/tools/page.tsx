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