# Pricing Page Template

## Raw React Code from Tailwind
*Paste your Tailwind Plus pricing sections here*

import { Fragment } from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid'

const tiers = [
  { name: 'Starter', id: 'tier-starter', href: '#', priceMonthly: '$19', mostPopular: false },
  { name: 'Growth', id: 'tier-growth', href: '#', priceMonthly: '$49', mostPopular: true },
  { name: 'Scale', id: 'tier-scale', href: '#', priceMonthly: '$99', mostPopular: false },
]
const sections = [
  {
    name: 'Features',
    features: [
      { name: 'Edge content delivery', tiers: { Starter: true, Growth: true, Scale: true } },
      { name: 'Custom domains', tiers: { Starter: '1', Growth: '3', Scale: 'Unlimited' } },
      { name: 'Team members', tiers: { Starter: '3', Growth: '20', Scale: 'Unlimited' } },
      { name: 'Single sign-on (SSO)', tiers: { Starter: false, Growth: false, Scale: true } },
    ],
  },
  {
    name: 'Reporting',
    features: [
      { name: 'Advanced analytics', tiers: { Starter: true, Growth: true, Scale: true } },
      { name: 'Basic reports', tiers: { Starter: false, Growth: true, Scale: true } },
      { name: 'Professional reports', tiers: { Starter: false, Growth: false, Scale: true } },
      { name: 'Custom report builder', tiers: { Starter: false, Growth: false, Scale: true } },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: '24/7 online support', tiers: { Starter: true, Growth: true, Scale: true } },
      { name: 'Quarterly workshops', tiers: { Starter: false, Growth: true, Scale: true } },
      { name: 'Priority phone support', tiers: { Starter: false, Growth: false, Scale: true } },
      { name: '1:1 onboarding tour', tiers: { Starter: false, Growth: false, Scale: true } },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
            Pricing that grows with you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
          Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
          loyalty, and driving sales.
        </p>

        {/* xs to lg */}
        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
          {tiers.map((tier) => (
            <section
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'rounded-xl bg-gray-400/5 inset-ring inset-ring-gray-200' : '',
                'p-8',
              )}
            >
              <h3 id={tier.id} className="text-sm/6 font-semibold text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-2 flex items-baseline gap-x-1 text-gray-900">
                <span className="text-4xl font-semibold">{tier.priceMonthly}</span>
                <span className="text-sm font-semibold">/month</span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'text-indigo-600 inset-ring inset-ring-indigo-200 hover:inset-ring-indigo-300',
                  'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                )}
              >
                Buy plan
              </a>
              <ul role="list" className="mt-10 space-y-4 text-sm/6 text-gray-900">
                {sections.map((section) => (
                  <li key={section.name}>
                    <ul role="list" className="space-y-4">
                      {section.features.map((feature) =>
                        feature.tiers[tier.name] ? (
                          <li key={feature.name} className="flex gap-x-3">
                            <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                            <span>
                              {feature.name}{' '}
                              {typeof feature.tiers[tier.name] === 'string' ? (
                                <span className="text-sm/6 text-gray-500">({feature.tiers[tier.name]})</span>
                              ) : null}
                            </span>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="isolate mt-20 hidden lg:block">
          <div className="relative -mx-8">
            {tiers.some((tier) => tier.mostPopular) ? (
              <div className="absolute inset-x-4 inset-y-0 -z-10 flex">
                <div
                  style={{ marginLeft: `${(tiers.findIndex((tier) => tier.mostPopular) + 1) * 25}%` }}
                  aria-hidden="true"
                  className="flex w-1/4 px-4"
                >
                  <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
                </div>
              </div>
            ) : null}
            <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
              <caption className="sr-only">Pricing plan comparison</caption>
              <colgroup>
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
              </colgroup>
              <thead>
                <tr>
                  <td />
                  {tiers.map((tier) => (
                    <th key={tier.id} scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8">
                      <div className="text-sm/7 font-semibold text-gray-900">{tier.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <span className="sr-only">Price</span>
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.id} className="px-6 pt-2 xl:px-8">
                      <div className="flex items-baseline gap-x-1 text-gray-900">
                        <span className="text-4xl font-semibold">{tier.priceMonthly}</span>
                        <span className="text-sm/6 font-semibold">/month</span>
                      </div>
                      <a
                        href={tier.href}
                        className={classNames(
                          tier.mostPopular
                            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                            : 'text-indigo-600 inset-ring inset-ring-indigo-200 hover:inset-ring-indigo-300',
                          'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                        )}
                      >
                        Buy plan
                      </a>
                    </td>
                  ))}
                </tr>
                {sections.map((section, sectionIdx) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className={classNames(
                          sectionIdx === 0 ? 'pt-8' : 'pt-16',
                          'pb-4 text-sm/6 font-semibold text-gray-900',
                        )}
                      >
                        {section.name}
                        <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                      </th>
                    </tr>
                    {section.features.map((feature) => (
                      <tr key={feature.name}>
                        <th scope="row" className="py-4 text-sm/6 font-normal text-gray-900">
                          {feature.name}
                          <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                        </th>
                        {tiers.map((tier) => (
                          <td key={tier.id} className="px-6 py-4 xl:px-8">
                            {typeof feature.tiers[tier.name] === 'string' ? (
                              <div className="text-center text-sm/6 text-gray-500">{feature.tiers[tier.name]}</div>
                            ) : (
                              <>
                                {feature.tiers[tier.name] === true ? (
                                  <CheckIcon aria-hidden="true" className="mx-auto size-5 text-indigo-600" />
                                ) : (
                                  <MinusIcon aria-hidden="true" className="mx-auto size-5 text-gray-400" />
                                )}

                                <span className="sr-only">
                                  {feature.tiers[tier.name] === true ? 'Included' : 'Not included'} in {tier.name}
                                </span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
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
- **section_tag**: "Pricing" | **typography**: `eyebrow` *[Options: eyebrow, h2, text-base font-semibold]*
- **main_title**: "Resources that are always free" | **typography**: `h1 + display-2` *[Options: h1 + display-1, h1 + display-2, h1]*
- **subtitle**: "All Pilla hospitality resources, glossary terms, and expert articles are completely free to access. No hidden fees, no subscriptions - just professional hospitality knowledge when you need it." | **typography**: `lead` *[Options: lead, subtitle-lg, text-lg]*

### Pricing Tiers
- **tier_1_name**: "Free Access" | **typography**: `text-sm font-semibold`
- **tier_1_price**: "Free" | **typography**: `text-4xl font-semibold`
- **tier_1_period**: "Forever" | **typography**: `text-sm font-semibold`
- **tier_1_href**: "/glossary" 
- **tier_1_cta**: "Start Browsing" | **typography**: `text-sm font-semibold`
- **tier_1_popular**: false

- **tier_2_name**: "Pro Support" | **typography**: `text-sm font-semibold`
- **tier_2_price**: "Contact Us" | **typography**: `text-4xl font-semibold`
- **tier_2_period**: "For Teams" | **typography**: `text-sm font-semibold`
- **tier_2_href**: "/contact"
- **tier_2_cta**: "Get in Touch" | **typography**: `text-sm font-semibold`
- **tier_2_popular**: true

- **tier_3_name**: "Enterprise" | **typography**: `text-sm font-semibold`
- **tier_3_price**: "Custom" | **typography**: `text-4xl font-semibold`
- **tier_3_period**: "Large Organizations" | **typography**: `text-sm font-semibold`
- **tier_3_href**: "/contact"
- **tier_3_cta**: "Contact Sales" | **typography**: `text-sm font-semibold`
- **tier_3_popular**: false

### Feature Sections

#### Core Resources Section
- **section_1_name**: "Core Resources" | **typography**: `text-sm font-semibold`

- **feature_1_1_name**: "Complete Glossary Access" | **typography**: `text-sm font-normal`
- **feature_1_1_free**: true
- **feature_1_1_pro**: true  
- **feature_1_1_enterprise**: true

- **feature_1_2_name**: "Expert Articles" | **typography**: `text-sm font-normal`
- **feature_1_2_free**: true
- **feature_1_2_pro**: true
- **feature_1_2_enterprise**: true

- **feature_1_3_name**: "Search Functionality" | **typography**: `text-sm font-normal`
- **feature_1_3_free**: true
- **feature_1_3_pro**: true
- **feature_1_3_enterprise**: true

- **feature_1_4_name**: "Mobile Access" | **typography**: `text-sm font-normal`
- **feature_1_4_free**: true
- **feature_1_4_pro**: true
- **feature_1_4_enterprise**: true

#### Professional Features Section  
- **section_2_name**: "Professional Features" | **typography**: `text-sm font-semibold`

- **feature_2_1_name**: "Team Training Materials" | **typography**: `text-sm font-normal`
- **feature_2_1_free**: false
- **feature_2_1_pro**: true
- **feature_2_1_enterprise**: true

- **feature_2_2_name**: "Custom Content Creation" | **typography**: `text-sm font-normal`
- **feature_2_2_free**: false
- **feature_2_2_pro**: "Limited"
- **feature_2_2_enterprise**: "Unlimited"

- **feature_2_3_name**: "Industry Consultations" | **typography**: `text-sm font-normal`
- **feature_2_3_free**: false
- **feature_2_3_pro**: "Quarterly"
- **feature_2_3_enterprise**: "Monthly"

- **feature_2_4_name**: "White-label Solutions" | **typography**: `text-sm font-normal`
- **feature_2_4_free**: false
- **feature_2_4_pro**: false
- **feature_2_4_enterprise**: true

#### Support Section
- **section_3_name**: "Support & Updates" | **typography**: `text-sm font-semibold`

- **feature_3_1_name**: "Email Support" | **typography**: `text-sm font-normal`
- **feature_3_1_free**: true
- **feature_3_1_pro**: true
- **feature_3_1_enterprise**: true

- **feature_3_2_name**: "Priority Support" | **typography**: `text-sm font-normal`
- **feature_3_2_free**: false
- **feature_3_2_pro**: true
- **feature_3_2_enterprise**: true

- **feature_3_3_name**: "Phone & Video Support" | **typography**: `text-sm font-normal`
- **feature_3_3_free**: false
- **feature_3_3_pro**: false
- **feature_3_3_enterprise**: true

- **feature_3_4_name**: "Dedicated Account Manager" | **typography**: `text-sm font-normal`
- **feature_3_4_free**: false
- **feature_3_4_pro**: false
- **feature_3_4_enterprise**: true

### Styling Options
- **background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*
- **popular_tier_highlight**: `bg-gray-400/5` *[Options: bg-gray-400/5, bg-indigo-50, bg-blue-50]*
- **cta_primary_color**: `bg-indigo-600` *[Options: bg-indigo-600, bg-blue-600, bg-green-600]*

---

## Instructions:
1. Paste your raw Tailwind Plus pricing code above
2. I'll analyze it and create content + typography forms
3. You'll fill out the forms with your content and styling preferences
4. I'll generate the final pricing component

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/pricing/page.tsx`

*This template file remains as a working document with original code and forms for reference*