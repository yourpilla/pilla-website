import { CheckIcon } from '@heroicons/react/20/solid'

// SEO Metadata
export const metadata = {
  title: 'Pilla Pricing - Hospitality Management Software Plans',
  description: 'Choose the perfect Pilla plan for your hospitality business. Compare features and pricing for Hobby and Enterprise plans with 7-day free trials.',
  openGraph: {
    title: 'Pilla Pricing Plans',
    description: 'Choose the perfect Pilla plan for your hospitality business. Compare features and pricing for Hobby and Enterprise plans with 7-day free trials.',
    url: 'https://yourpilla.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pilla Pricing Plans',
    description: 'Choose the perfect Pilla plan for your hospitality business. Compare features and pricing for Hobby and Enterprise plans with 7-day free trials.',
  },
}

const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$29',
    description: "The perfect plan if you&apos;re just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
    featured: true,
  },
]

const comparisonData = {
  planNames: ['Starter', 'Enterprise'],
  sections: [
    {
      name: 'Features',
      features: [
        { name: 'Edge content delivery', values: ['✓', '✓'] },
        { name: 'Custom domains', values: ['1', 'Unlimited'] },
        { name: 'Team members', values: ['3', 'Unlimited'] },
        { name: 'Single sign-on (SSO)', values: ['✗', '✓'] },
      ],
    },
    {
      name: 'Reporting',
      features: [
        { name: 'Advanced analytics', values: ['✓', '✓'] },
        { name: 'Basic reports', values: ['✗', '✓'] },
        { name: 'Professional reports', values: ['✗', '✓'] },
        { name: 'Custom report builder', values: ['✗', '✓'] },
      ],
    },
    {
      name: 'Support',
      features: [
        { name: '24/7 online support', values: ['✓', '✓'] },
        { name: 'Quarterly workshops', values: ['✗', '✓'] },
        { name: 'Priority phone support', values: ['✗', '✓'] },
        { name: '1:1 onboarding tour', values: ['✗', '✓'] },
      ],
    },
  ],
}

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function PricingPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Pilla Hospitality Management Software",
            "description": "Comprehensive hospitality management platform for shift scheduling, work activities, and team management",
            "offers": [
              {
                "@type": "Offer",
                "name": "Hobby Plan",
                "price": "29",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "billingIncrement": "P1M"
                }
              },
              {
                "@type": "Offer",
                "name": "Enterprise Plan",
                "price": "99",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "billingIncrement": "P1M"
                }
              }
            ]
          })
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                "name": "Pricing",
                "item": "https://yourpilla.com/pricing"
              }
            ]
          })
        }}
      />

      {/* Section 1: Two-Column Pricing */}
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
            Choose the right plan for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
          Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating customer
          loyalty, and driving sales.
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                tier.featured
                  ? ''
                  : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                    : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
                'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
              )}
            >
              <h3
                id={tier.id}
                className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold')}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-gray-900',
                    'text-5xl font-semibold tracking-tight',
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/month</span>
              </p>
              <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-8 space-y-3 text-sm/6 sm:mt-10',
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                  'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                )}
              >
                Get started today
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Feature Comparison Table */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <table className="w-full border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th scope="col" className="py-4 pr-8 text-sm font-semibold text-gray-900">
                    Features
                  </th>
                  {comparisonData.planNames.map((planName) => (
                    <th key={planName} scope="col" className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      {planName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.sections.map((section) => (
                  <>
                    <tr key={section.name}>
                      <td colSpan={3} className="py-4">
                        <div className="text-sm font-semibold text-gray-900">{section.name}</div>
                        <div className="mt-2 h-px bg-gray-200" />
                      </td>
                    </tr>
                    {section.features.map((feature) => (
                      <tr key={feature.name} className="border-t border-gray-200">
                        <td className="py-4 pr-8 text-sm text-gray-600">
                          {feature.name}
                        </td>
                        {feature.values.map((value, valueIdx) => (
                          <td key={valueIdx} className="px-6 py-4 text-center text-sm">
                            {value === '✓' ? (
                              <CheckIcon className="mx-auto h-5 w-5 text-indigo-600" />
                            ) : value === '✗' ? (
                              <span className="mx-auto block h-5 w-5 text-gray-400">×</span>
                            ) : (
                              <span className="text-gray-900">{value}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}