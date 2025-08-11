const faqs = [
  {
    id: 1,
    question: 'What is HACCP and why is it important?',
    href: '/answers/what-is-haccp-why-important',
    answer:
      'HACCP (Hazard Analysis Critical Control Points) is a systematic approach to food safety that identifies potential hazards and establishes critical control points to prevent foodborne illness.',
    date: 'Nov 15, 2024',
    datetime: '2024-11-15',
    category: { title: 'Food Safety', href: '/answers?category=food-safety' },
    author: {
      name: 'Sarah Johnson',
      role: 'Food Safety Expert',
      href: '/answers?author=sarah-johnson',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    question: 'How do I handle difficult guests in hospitality?',
    href: '/answers/handle-difficult-guests-hospitality',
    answer: 'Handling difficult guests requires active listening, empathy, and professional de-escalation techniques to turn negative experiences into positive outcomes.',
    date: 'Nov 12, 2024',
    datetime: '2024-11-12',
    category: { title: 'Guest Services', href: '/answers?category=guest-services' },
    author: {
      name: 'Emma Martinez',
      role: 'Guest Relations Manager',
      href: '/answers?author=emma-martinez',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    question: 'What are the key performance indicators for restaurants?',
    href: '/answers/key-performance-indicators-restaurants',
    answer:
      'Essential KPIs for restaurants include food cost percentage, labor cost percentage, average check size, table turnover rate, and customer satisfaction scores.',
    date: 'Nov 10, 2024',
    datetime: '2024-11-10',
    category: { title: 'Operations', href: '/answers?category=operations' },
    author: {
      name: 'Marcus Chen',
      role: 'Restaurant Operations Consultant',
      href: '/answers?author=marcus-chen',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function AnswersPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Hospitality Questions & Answers</h2>
          <p className="mt-2 lead">Expert answers to common hospitality questions, practical solutions, and industry best practices to help you succeed.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {faqs.map((faq) => (
            <article key={faq.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={faq.datetime} className="text-muted">
                  {faq.date}
                </time>
                <a
                  href={faq.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {faq.category.title}
                </a>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={faq.href}>
                    <span className="absolute inset-0" />
                    {faq.question}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{faq.answer}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={faq.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={faq.author.href}>
                      <span className="absolute inset-0" />
                      {faq.author.name}
                    </a>
                  </p>
                  <p className="text-muted">{faq.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}