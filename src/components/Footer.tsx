'use client'

import Link from 'next/link'

const navigation = {
  solutions: [
    { name: 'Job Descriptions', href: '/blog/hospitality-job-roles' },
    { name: 'Job Interviews', href: '/blog/interviews' },
    { name: 'Start Onboarding', href: '/blog/restaurant-staff-onboarding' },
    { name: 'Food Hygiene', href: '/blog/food-safety-management-system' },
    { name: 'Health and Safety', href: '/blog/hospitality-risks' },
    { name: 'Daily Operations', href: '/blog/operations' },
  ],
  support: [
    { name: 'Problem and Solution', href: '/about' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Pilla vs Others', href: '/pricing/compare' },
  ],
  company: [
    { name: 'Shift Scheduling App', href: '#' },
    { name: 'Food Hygiene App', href: '#' },
  ],
  legal: [
    { name: 'Terms of Use', href: '/legal/terms-of-use' },
    { name: 'Privacy Policy', href: '/legal/privacy-policy' },
    { name: 'Right to Forget', href: '/legal/right-forgotten' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300" style={{borderColor: 'var(--border)'}}>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <img
            alt="Company name"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-9"
          />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="h6">Templates</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="small-blue">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="h6">Why Pilla</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="small-blue">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="h6">Use Cases</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="small-blue">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="h6">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="small-blue">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="h6">Subscribe to our newsletter</h3>
            <p className="mt-2 small-blue">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="input w-full sm:w-56"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
              <button
                type="submit"
                className="btn w-full"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-gray-900/10 pt-8">
          <p className="small-grey">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}