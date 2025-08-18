import { Fragment } from 'react'
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid'

const tiers = [
  { name: 'Basic' as const, id: 'tier-basic', href: '#', priceMonthly: '$65', priceYearly: '£595', mostPopular: false, background: 'bg-rose-100', border: 'inset-ring-gray-200' },
  { name: 'Plus' as const, id: 'tier-plus', href: '#', priceMonthly: '£75', priceYearly: '£695', mostPopular: true, background: 'bg-orange-100', border: 'inset-ring-indigo-200' },
  { name: 'Pro' as const, id: 'tier-pro', href: '#', priceMonthly: '£85', priceYearly: '£795', mostPopular: false, background: 'bg-emerald-100', border: 'inset-ring-blue-200' },
]
const sections = [
  {
    name: 'Shift scheduling',
    features: [
      { name: 'Automatated shift scheduling with templates', tiers: { Basic: true, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Holiday entitlement calculations', tiers: { Basic: true, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Location-based clock-in', tiers: { Basic: true, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Automatic shift adjustment after clock-in', tiers: { Basic: false, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Push notification shift reminders for staff', tiers: { Basic: false, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Communicate and leave messages on shifts', tiers: { Basic: false, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Monday morning round-ups for Managers', tiers: { Basic: false, Plus: false, Pro: true } as Record<TierName, boolean> },
      { name: 'Encouragement and feedback for staff', tiers: { Basic: false, Plus: false, Pro: true } as Record<TierName, boolean> },
      { name: 'Shift history kept on file', tiers: { Basic: '2 Years', Plus: 'Forever', Pro: 'Forever' } as Record<TierName, string> },
    ],
  },
  {
    name: 'Work activities',
    features: [
      { name: 'Build work templates with all elements', tiers: { Basic: true, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Set repeating work activities', tiers: { Basic: true, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Highlight issues and corrective actions', tiers: { Basic: true, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Automatic shift adjustment after clock-in', tiers: { Basic: false, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Push notification reminders for staff', tiers: { Basic: false, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Communicate and leave messages on work', tiers: { Basic: false, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Monday morning round-ups for Managers', tiers: { Basic: false, Plus: false, Pro: true } as Record<TierName, boolean> },
      { name: 'Encouragement and feedback for staff', tiers: { Basic: false, Plus: false, Pro: true } as Record<TierName, boolean> },
      { name: 'Work history kept on file', tiers: { Basic: '2 Years', Plus: 'Forever', Pro: 'Forever' } as Record<TierName, string> },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: 'Email support', tiers: { Basic: true, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Quarterly workshops/adits', tiers: { Basic: false, Plus: true, Pro: true } as Record<TierName, boolean> },
      { name: 'Priority phone support', tiers: { Basic: false, Plus: false, Pro: true } as Record<TierName, boolean> },
    ],
  },
]

type TierName = typeof tiers[number]['name']

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="eyebrow">Pricing</h2>
          <h1 className="mt-2">
            Pilla has changed the way we work, for the better
          </h1>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center lead">
          Becky, Operations Manager, The Pen Factory (3 Sites)
        </p>

        {/* xs to lg */}
        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
          {tiers.map((tier) => (
            <section
              key={tier.id}
              className={classNames(
                `rounded-xl ${tier.background} inset-ring ${tier.border} p-8`,
              )}
            >
              <h3 id={tier.id} className="text-sm font-semibold text-gray-900">
                {tier.name}
              </h3>
              <div className="mt-2">
                <p className="flex items-baseline gap-x-1 text-gray-900">
                  <span className="text-4xl font-semibold">{tier.priceYearly}</span>
                  <span className="text-sm font-semibold">/year</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  or
                </p>
                <p className="flex items-baseline gap-x-1 text-gray-900">
                  <span className="text-2xl font-semibold">{tier.priceMonthly}</span>
                  <span className="text-sm font-semibold">/month</span>
                </p>
              </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className="btn mt-8 block text-center"
              >
                7-Day Free Trial
              </a>
              <ul role="list" className="mt-10 space-y-4 text-sm text-gray-900">
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
                                <span className="text-sm text-muted">({feature.tiers[tier.name]})</span>
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
                    <th key={tier.id} scope="col" className={`px-6 pt-6 xl:px-8 xl:pt-8 ${tier.background} rounded-t-xl`}>
                      <div className="text-sm font-semibold text-gray-900">{tier.name}</div>
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
                    <td key={tier.id} className={`px-6 pt-2 pb-4 xl:px-8 ${tier.background}`}>
                      <div>
                        <div className="flex items-baseline gap-x-1 text-gray-900">
                          <span className="text-4xl font-semibold">{tier.priceYearly}</span>
                          <span className="text-sm font-semibold">/year</span>
                        </div>
                        <p className="mt-1 text-sm text-muted">
                          or
                        </p>
                        <div className="flex items-baseline gap-x-1 text-gray-900">
                          <span className="text-2xl font-semibold">{tier.priceMonthly}</span>
                          <span className="text-sm font-semibold">/month</span>
                        </div>
                      </div>
                      <a
                        href={tier.href}
                        className="btn mt-4 mb-0 block text-center"
                      >
                        7-Day Free Trial
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
                          'pb-4 text-sm font-semibold text-gray-900',
                        )}
                      >
                        {section.name}
                        <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                      </th>
                    </tr>
                    {section.features.map((feature) => (
                      <tr key={feature.name}>
                        <th scope="row" className="py-4 text-sm font-normal text-gray-900">
                          {feature.name}
                          <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                        </th>
                        {tiers.map((tier) => (
                          <td key={tier.id} className={`px-6 py-4 xl:px-8 ${tier.background} last:rounded-b-xl`}>
                            {typeof feature.tiers[tier.name] === 'string' ? (
                              <div className="text-center text-sm text-muted">{feature.tiers[tier.name]}</div>
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