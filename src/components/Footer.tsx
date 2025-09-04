import Link from 'next/link'
import Image from 'next/image'
import { getFooterTestimonials } from '@/lib/content'
import FooterNewsletter from './FooterNewsletter'

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
  const footerTestimonials = getFooterTestimonials()
  const testimonial = footerTestimonials[0] // Get the first footer testimonial

  return (
    <footer className="bg-white border-t border-gray-300" style={{borderColor: 'var(--border)'}}>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {testimonial && (
            <div className="space-y-4">
              <blockquote className="small-blue">
                <p>&ldquo;{testimonial.content}&rdquo;</p>
              </blockquote>
              <figcaption className="small-blue">
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  {testimonial.role && testimonial.company && (
                    <div className="opacity-75">{testimonial.role} at {testimonial.company}</div>
                  )}
                </div>
                <a href={testimonial.platformUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <Image 
                    alt={testimonial.platform} 
                    src={testimonial.platformLogo} 
                    width={24}
                    height={24}
                    className="h-6 w-auto" 
                  />
                </a>
              </figcaption>
            </div>
          )}
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
        <FooterNewsletter />
        <div className="mt-8 border-t border-gray-900/10 pt-8">
          <p className="small-grey">
            &copy; 2025 Your Pilla Ltd. All rights reserved. Company 11639238 VAT GB310847815
          </p>
        </div>
      </div>
    </footer>
  )
}