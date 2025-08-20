'use client'

import { useState, useRef, useEffect } from 'react'
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
  DocumentCheckIcon,
  QuestionMarkCircleIcon,
  QueueListIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const resources = [
  { name: 'How-Tos', description: 'Hospitality templates and guides', href: '/blog', icon: DocumentCheckIcon, descClass: 'small-grey' },
  { name: 'FAQs', description: '(Almost) All your questions answered', href: '/answers', icon: QuestionMarkCircleIcon, descClass: 'small-grey' },
  { name: 'Glossary', description: 'Hospitality lingo explained', href: '/glossary', icon: QueueListIcon, descClass: 'small-grey' },
  { name: 'Tools', description: 'Free calculators and other tools', href: '/tools', icon: CalculatorIcon, descClass: 'small-grey' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setPopoverOpen(false)
      }
    }

    if (popoverOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [popoverOpen])

  return (
    <header className="bg-white border-b border-gray-300" style={{borderColor: 'var(--border)'}}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Pilla</span>
            <img 
              src="/logo full white 512x512.png" 
              alt="Pilla Logo" 
              className="w-8 h-8"
            />
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
          <div className="relative">
            <button
              type="button"
              onClick={() => setPopoverOpen(!popoverOpen)}
              className="flex items-center gap-x-1 h6 focus:outline-none"
            >
              Resources
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </button>

            {popoverOpen && (
              <div
                ref={popoverRef}
                className="absolute left-1/2 z-20 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              >
                <div className="p-4">
                  {resources.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                    >
                      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon aria-hidden="true" className="big-blue-icon" />
                      </div>
                      <div className="flex-auto">
                        <Link
                          href={item.href}
                          className="block small-blue"
                          onClick={() => setPopoverOpen(false)}
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className={`mt-1 ${item.descClass}`}>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/pricing" className="h6">
            Pricing
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
              <img 
                src="/logo full white 512x512.png" 
                alt="Pilla Logo" 
                className="w-8 h-8"
              />
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
                  href="/pricing"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Pricing
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