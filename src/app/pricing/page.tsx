import { CheckIcon } from '@heroicons/react/20/solid'

// SEO Metadata
export const metadata = {
  title: 'Pilla Pricing - Hospitality Management Software Plans',
  description: 'Choose the perfect Pilla plan for your hospitality business. Compare features and pricing for Basic and Plus plans with 7-day free trials.',
  openGraph: {
    title: 'Pilla Pricing Plans',
    description: 'Choose the perfect Pilla plan for your hospitality business. Compare features and pricing for Basic and Plus plans with 7-day free trials.',
    url: 'https://yourpilla.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pilla Pricing Plans',
    description: 'Choose the perfect Pilla plan for your hospitality business. Compare features and pricing for Basic and Plus plans with 7-day free trials.',
  },
}

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '#',
    priceMonthly: '£65',
    description: "The perfect plan if you&apos;re just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
    featured: false,
  },
  {
    name: 'Plus',
    id: 'tier-plus',
    href: '#',
    priceMonthly: '£95',
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
                "name": "Basic Plan",
                "price": "65",
                "priceCurrency": "GBP",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "billingIncrement": "P1M"
                }
              },
              {
                "@type": "Offer",
                "name": "Plus Plan",
                "price": "95",
                "priceCurrency": "GBP",
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
      <div className="bg-main px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="h1">Pricing</h1>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center big-blue">
          Choose an affordable plan that&apos;s packed with the best features for engaging your audience, creating customer
          loyalty, and driving sales.
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tierIdx === 0 ? 'orange-card' : 'green-card',
                'p-8 sm:p-10',
                tierIdx === 0 ? 'border-r-0' : ''
              )}
              style={{
                borderRadius: tierIdx === 0 ? '0 40px 40px 0' : '40px'
              }}
            >
              <h3
                id={tier.id}
                className="h2"
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="h4">
                  {tier.priceMonthly}
                </span>
                <span className="small-blue">/month</span>
              </p>
              <p className="mt-6 small-blue">
                {tier.description}
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 sm:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3 small-blue">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-indigo-600"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className="btn mt-8 block text-center sm:mt-10"
              >
                7-Day Free Trial
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