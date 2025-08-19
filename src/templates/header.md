# Header Component Template

## Raw React Code from Current Header Component
*Current header component code - working as-is*

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const resources = [
  { name: 'Glossary', description: 'Hospitality terms and definitions', href: '/glossary', icon: BookOpenIcon },
  { name: 'Blog', description: 'Industry insights and guides', href: '/blog', icon: DocumentTextIcon },
  { name: 'Job Descriptions', description: 'Ready-to-use job templates', href: '/jobs', icon: UserGroupIcon },
  { name: 'Safety Templates', description: 'Food safety and compliance', href: '/templates', icon: ShieldCheckIcon },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-300" style={{borderColor: 'var(--border)'}}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Pilla</span>
            <div className="flex items-center">
              <img 
                src="/logo full white 512x512.png" 
                alt="Pilla Logo" 
                className="w-8 h-8"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Pilla</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover>
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 focus:outline-none">
              Resources
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              modal
              transition
              className="absolute left-1/2 z-20 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {resources.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-auto">
                      <Link href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link href="/about" className="text-sm/6 font-semibold text-gray-900">
            About
          </Link>
          <Link href="/pricing" className="text-sm/6 font-semibold text-gray-900">
            Pricing
          </Link>
          <Link href="/contact" className="text-sm/6 font-semibold text-gray-900">
            Contact
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/demo" className="btn">
            Book Demo
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Pilla</span>
              <div className="flex items-center">
                <img 
                  src="/logo full white 512x512.png" 
                  alt="Pilla Logo" 
                  className="w-8 h-8"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">Pilla</span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Resources
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {resources.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/demo"
                  className="btn"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
```

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

### Brand & Logo Section
- **logo_src**: "/logo full white 512x512.png" | *Logo image path*
- **logo_alt**: "Pilla Logo" | *Alt text for logo image*
- **brand_name**: "Pilla" | **typography**: `brand` | *Company name displayed next to logo*
- **brand_href**: "/" | *Link destination for logo/brand*
- **sr_only_text**: "Pilla" | *Screen reader text for logo link*

### Header Styling
- **header_background**: "bg-white" | *Header background color class* *[Options: bg-white, bg-gray-50, bg-main]*
- **border_style**: "border-b border-gray-300" | *Header border styling*
- **border_color**: "var(--border)" | *Header border color* *[Options: var(--border), border-gray-300, border-gray-200]*

### Primary Navigation Links

- **nav_pricing_text**: "Pricing" | **typography**: `.h6` | *Pricing page link text*
- **nav_pricing_href**: "/pricing" | *Pricing page URL*

### Resources Dropdown Section
- **dropdown_title**: "Resources" | **typography**: `.h6` | *Dropdown menu title*

#### Resource Item 1 (Blog)
- **resource_1_name**: "How-Tos" | **typography**: `.h6` | *Resource name*
- **resource_1_description**: "Hospitality templates and guides" | **typography**: `big-grey` | *Resource description*
- **resource_1_href**: "/blog" | *Resource URL*
- **resource_1_icon**: "document-check" | **typography**: .big-blue-icon

#### Resource Item 2 (FAQs)
- **resource_2_name**: "FAQs" | **typography**: `.h6` | *Resource name*
- **resource_2_description**: "(Almost) All your questions answered" | **typography**: `big-grey` | *Resource description*
- **resource_2_href**: "/answers" | *Resource URL*
- **resource_2_icon**: "question-mark-circle" | *Heroicon component name* **typography**: .big-blue-icon

#### Resource Item 3 (Glossary)
- **resource_3_name**: "Glossary" | **typography**: `.h6` | *Resource name*
- **resource_3_description**: "Ready-to-use job templates" | **typography**: `h6` | *Resource description*
- **resource_3_href**: "/glossary" | *Resource URL*
- **resource_3_icon**: "queue-list" | *Heroicon component name* **typography**: .big-blue-icon

#### Resource Item 4 (Tools)
- **resource_4_name**: "Tools" | **typography**: `.h6` | *Resource name*
- **resource_4_description**: "Free calculators and other tools" | **typography**: `big-grey` | *Resource description*
- **resource_4_href**: "/tools" | *Resource URL*
- **resource_4_icon**: "calculator" | *Heroicon component name* **typography**: .big-blue-icon

### Call-to-Action Button
- **cta_text**: "Book Demo" | **typography**: `btn` | *CTA button text*
- **cta_href**: "/demo" | *CTA button destination URL*
- **cta_style**: "btn" | *CSS class for button styling* *[Options: btn, text-sm/6 font-semibold, custom]*

### Mobile Menu Configuration
- **mobile_menu_sr_text**: "Open main menu" | *Screen reader text for mobile menu button*
- **mobile_close_sr_text**: "Close menu" | *Screen reader text for mobile close button*
- **mobile_background**: "bg-white" | *Mobile menu background* *[Options: bg-white, bg-gray-50, bg-main]*
- **mobile_nav_typography**: "text-base/7 font-semibold text-gray-900" | *Mobile navigation text styling*

### Dropdown Styling
- **dropdown_background**: "bg-white" | *Dropdown panel background* *[Options: bg-white, bg-gray-50]*
- **dropdown_shadow**: "shadow-lg ring-1 ring-gray-900/5" | *Dropdown shadow and border*
- **dropdown_hover**: "hover:bg-gray-50" | *Dropdown item hover color* *[Options: hover:bg-gray-50, hover:bg-blue-50]*
- **icon_color**: "text-gray-600 group-hover:text-blue-600" | *Icon colors and hover states*

---

## Instructions:
1. Raw React code above shows current header implementation
2. Use the content forms to customize navigation items, links, and text
3. Modify resource dropdown items (name, description, URL, icon)
4. Update brand logo, CTA button text and styling
5. Adjust colors and styling using the styling options
6. Typography classes can be customized for each text element

---

## Final Component Location
**The processed code will be deployed to:** `/src/components/Header.tsx`

*This template file remains as a working document with original code and forms for reference*