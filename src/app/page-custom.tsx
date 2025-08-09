'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
  { name: 'Resources', href: '/blog' },
  { name: 'Glossary', href: '/glossary' },
  { name: 'About', href: '/about' },
]

const features = [
  {
    name: 'Complete Glossary',
    description: '240+ hospitality terms with clear definitions, pronunciation guides, and real-world context.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Expert Articles',
    description: 'In-depth guides covering operations, management, customer service, and industry best practices.',
    icon: LockClosedIcon,
  },
  {
    name: 'Quick Reference',
    description: 'Fast, searchable access to the information you need during busy service periods.',
    icon: ServerIcon,
  },
]

const transferFeatures = [
  {
    id: 1,
    name: 'Complete definitions',
    description: 'Clear, concise definitions written in plain English with industry context and usage examples.',
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: 'Pronunciation guides',
    description: 'Learn how to properly pronounce technical terms and foreign culinary expressions.',
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: 'Instant search',
    description: 'Find any term quickly with smart search that understands synonyms and related concepts.',
    icon: BoltIcon,
  },
]

const communicationFeatures = [
  {
    id: 1,
    name: 'Weekly articles',
    description: 'Fresh insights on operations, management, trends, and best practices delivered regularly.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    id: 2,
    name: 'Expert authors',
    description: 'Content written by experienced hospitality professionals, chefs, and industry consultants.',
    icon: EnvelopeIcon,
  },
]

const featuredTestimonial = {
  body: 'Pilla has become an essential part of our training program. New staff members can quickly look up unfamiliar terms, and the articles help our managers stay current with industry best practices.',
  author: {
    name: 'Marcus Chen',
    handle: 'marcuschen',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
    logoUrl: '/logo full white 512x512.png',
  },
}

const testimonials = [
  [
    [
      {
        body: 'The glossary has been invaluable for training new staff. Clear definitions and real-world context make learning industry terms so much easier.',
        author: {
          name: 'Sarah Wilson',
          handle: 'sarahwilson',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'As a restaurant manager, I reference Pilla daily. The articles on operations management are spot-on and practical.',
        author: {
          name: 'David Chen',
          handle: 'davidchen',
          imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'Finally, a hospitality resource that speaks our language. The terminology is accurate and the explanations are clear.',
        author: {
          name: 'Maria Rodriguez',
          handle: 'mariarodriguez',
          imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'The mobile access is perfect for quick lookups during service. Our entire FOH team uses it.',
        author: {
          name: 'Jennifer Park',
          handle: 'jenniferpark',
          imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'Comprehensive coverage of hotel operations terminology. Essential for our management training program.',
        author: {
          name: 'Robert Kim',
          handle: 'robertkim',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
  [
    [
      {
        body: 'The pronunciation guides are fantastic. No more embarrassing moments with French culinary terms!',
        author: {
          name: 'Lisa Thompson',
          handle: 'lisathompson',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'Expert-level content that\'s actually practical. The real-world examples make all the difference.',
        author: {
          name: 'James Miller',
          handle: 'jamesmiller',
          imageUrl: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'Regular updates keep us current with industry trends. The content team clearly knows hospitality.',
        author: {
          name: 'Amanda Davis',
          handle: 'amandadavis',
          imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'Invaluable for both seasoned professionals and newcomers to the industry. Highly recommended.',
        author: {
          name: 'Thomas Brown',
          handle: 'thomasbrown',
          imageUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'The search functionality is incredibly smart. It understands context and finds exactly what I need.',
        author: {
          name: 'Rachel Green',
          handle: 'rachelgreen',
          imageUrl: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
]

const faqs = [
  {
    id: 1,
    question: 'Is Pilla free to use?',
    answer: 'Yes, all our glossary terms and articles are completely free to access. No registration required.',
  },
  {
    id: 2,
    question: 'How often is content updated?',
    answer: 'We add new glossary terms and articles weekly, keeping pace with industry trends and terminology.',
  },
  {
    id: 3,
    question: 'Can I suggest new terms or topics?',
    answer: 'Absolutely! We welcome suggestions from hospitality professionals. Contact us with your ideas.',
  },
  {
    id: 4,
    question: 'Is the content suitable for training staff?',
    answer: 'Yes, our resources are designed for both self-learning and team training in hospitality environments.',
  },
  {
    id: 5,
    question: 'Do you cover all areas of hospitality?',
    answer: 'We cover restaurants, hotels, bars, events, and all major hospitality sectors with specialized terminology.',
  },
  {
    id: 6,
    question: 'Can I access Pilla on mobile devices?',
    answer: 'Yes, Pilla is fully responsive and optimized for smartphones and tablets for quick reference during service.',
  },
]

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div style={{backgroundColor: 'var(--background)'}} className="min-h-screen">
      {/* Navigation Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Pilla</span>
              <img alt="Pilla" src="/logo full white 512x512.png" className="h-8 w-auto" />
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
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold" style={{color: 'var(--foreground)'}}>
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/contact" className="text-sm/6 font-semibold" style={{color: 'var(--foreground)'}}>
              Contact Us <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-card p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Pilla</span>
                <img alt="Pilla" src="/logo full white 512x512.png" className="h-8 w-auto" />
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
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                      style={{color: 'var(--foreground)'}}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold hover:bg-gray-50"
                    style={{color: 'var(--foreground)'}}
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <div className="relative isolate pt-14">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
        </svg>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              <div className="relative flex items-center gap-x-4 rounded-full bg-card px-4 py-1 text-sm/6 text-muted ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span className="font-semibold text-blue-600">New glossary terms added</span>
                <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
                <Link href="/glossary" className="flex items-center gap-x-1">
                  <span aria-hidden="true" className="absolute inset-0" />
                  See latest terms
                  <ChevronRightIcon aria-hidden="true" className="-mr-2 size-5 text-gray-400" />
                </Link>
              </div>
            </div>
            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty sm:text-7xl" style={{color: 'var(--foreground)'}}>
              Your Complete Hospitality Resource Hub
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-muted sm:text-xl/8">
              Comprehensive glossary, expert insights, and practical guides to excel in the hospitality industry. From restaurant management to guest services.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/glossary"
                className="rounded-default bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Explore Glossary
              </Link>
              <Link href="/blog" className="text-sm/6 font-semibold" style={{color: 'var(--foreground)'}}>
                Read Articles <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
            <svg role="img" viewBox="0 0 366 729" className="mx-auto w-91.5 max-w-full drop-shadow-xl">
              <title>App screenshot</title>
              <defs>
                <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                  <rect rx={36} width={316} height={684} />
                </clipPath>
              </defs>
              <path
                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                fill="#4B5563"
              />
              <path
                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                fill="#343E4E"
              />
              <foreignObject
                width={316}
                height={684}
                clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
                transform="translate(24 24)"
              >
                <img alt="" src="https://tailwindcss.com/plus-assets/img/component-images/mobile-app-screenshot.png" />
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <section className="relative isolate overflow-hidden bg-card px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-card shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img alt="Pilla" src="/logo full white 512x512.png" className="mx-auto h-12" />
          <figure className="mt-10">
            <blockquote className="text-center text-xl/8 font-semibold sm:text-2xl/9" style={{color: 'var(--foreground)'}}>
              <p>
                &ldquo;Pilla has transformed how we train our hospitality staff. The comprehensive glossary and practical guides have become essential resources for our team.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="mx-auto size-10 rounded-full"
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold" style={{color: 'var(--foreground)'}}>Sarah Johnson</div>
                <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <div className="text-muted">Restaurant Manager at The Grand Hotel</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Features Section */}
      <div className="overflow-hidden bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-blue-600">Everything You Need</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl" style={{color: 'var(--foreground)'}}>
                  Comprehensive Hospitality Resources
                </p>
                <p className="mt-6 text-lg/8 text-muted">
                  Access industry-leading content designed for hospitality professionals at every level.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-muted lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold" style={{color: 'var(--foreground)'}}>
                        <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-blue-600" />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              alt="Product screenshot"
              src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
              width={2432}
              height={1442}
              className="w-3xl max-w-none rounded-default shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>

      {/* Bento Grid Features */}
      <div className="bg-card py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base/7 font-semibold text-blue-600">Complete Solution</h2>
          <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty sm:text-5xl" style={{color: 'var(--foreground)'}}>
            Everything hospitality professionals need to excel
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-default bg-card max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-default max-lg:rounded-t-4xl lg:rounded-tl-4xl">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover object-left"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-blue-600">Fast Search</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight" style={{color: 'var(--foreground)'}}>Lightning-fast glossary search</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-muted">
                    Find any hospitality term instantly with our optimized search that understands industry context and synonyms.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-default bg-card lg:rounded-tr-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-default lg:rounded-tr-4xl">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover object-left lg:object-right"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-blue-600">Regular Updates</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight" style={{color: 'var(--foreground)'}}>Fresh content weekly</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-muted">
                    Stay current with new hospitality trends, terminology, and best practices added regularly.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-default bg-card lg:rounded-bl-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-default lg:rounded-bl-4xl">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover object-left"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-blue-600">Mobile Ready</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight" style={{color: 'var(--foreground)'}}>Perfect for busy service</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-muted">
                    Access resources quickly on any device during service hours.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-default bg-card" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-default">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-blue-600">Comprehensive</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight" style={{color: 'var(--foreground)'}}>All-in-one platform</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-muted">
                    Glossary, articles, guides, and resources all in one easy-to-use platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-default bg-card max-lg:rounded-b-4xl lg:rounded-br-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-default max-lg:rounded-b-4xl lg:rounded-br-4xl">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-blue-600">Expert Knowledge</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight" style={{color: 'var(--foreground)'}}>Industry-verified content</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-muted">
                    All content reviewed and verified by hospitality industry experts and professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Features */}
      <div className="overflow-hidden py-16 lg:py-24" style={{backgroundColor: 'var(--background)'}}>
        <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
          <div className="relative">
            <h2 className="text-center text-3xl/8 font-bold tracking-tight sm:text-4xl" style={{color: 'var(--foreground)'}}>
              Professional hospitality resources you can trust
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-muted">
              Designed by industry professionals for hospitality teams who demand accuracy and practical application.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="relative">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{color: 'var(--foreground)'}}>Learn industry terminology</h3>
              <p className="mt-3 text-lg text-muted">
                Master the language of hospitality with our comprehensive glossary and contextual examples.
              </p>

              <dl className="mt-10 space-y-10">
                {transferFeatures.map((item) => (
                  <div key={item.id} className="relative">
                    <dt>
                      <div className="absolute flex size-12 items-center justify-center rounded-default bg-blue-500 text-white">
                        <item.icon aria-hidden="true" className="size-8" />
                      </div>
                      <p className="ml-16 text-lg/6 font-medium" style={{color: 'var(--foreground)'}}>{item.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-muted">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div aria-hidden="true" className="relative -mx-4 mt-10 lg:mt-0">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                width={490}
                className="relative mx-auto rounded-default"
              />
            </div>
          </div>

          <div className="relative mt-12 sm:mt-16 lg:mt-24">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
              <div className="lg:col-start-2">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{color: 'var(--foreground)'}}>Stay informed with expert insights</h3>
                <p className="mt-3 text-lg text-muted">
                  Get practical guidance from industry professionals who understand real-world hospitality challenges.
                </p>

                <dl className="mt-10 space-y-10">
                  {communicationFeatures.map((item) => (
                    <div key={item.id} className="relative">
                      <dt>
                        <div className="absolute flex size-12 items-center justify-center rounded-default bg-blue-500 text-white">
                          <item.icon aria-hidden="true" className="size-8" />
                        </div>
                        <p className="ml-16 text-lg/6 font-medium" style={{color: 'var(--foreground)'}}>{item.name}</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-muted">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  width={490}
                  className="relative mx-auto rounded-default"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="relative isolate bg-card pt-24 pb-32 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-blue-600">Testimonials</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl" style={{color: 'var(--foreground)'}}>
              Trusted by hospitality professionals worldwide
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4" style={{color: 'var(--foreground)'}}>
            <figure className="rounded-default bg-card shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
              <blockquote className="p-6 text-lg font-semibold tracking-tight sm:p-12 sm:text-xl/8" style={{color: 'var(--foreground)'}}>
                <p>{`"${featuredTestimonial.body}"`}</p>
              </blockquote>
              <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                <img
                  alt=""
                  src={featuredTestimonial.author.imageUrl}
                  className="size-10 flex-none rounded-full bg-gray-50"
                />
                <div className="flex-auto">
                  <div className="font-semibold" style={{color: 'var(--foreground)'}}>{featuredTestimonial.author.name}</div>
                  <div className="text-muted">{`@${featuredTestimonial.author.handle}`}</div>
                </div>
                <img alt="" src={featuredTestimonial.author.logoUrl} className="h-10 w-auto flex-none" />
              </figcaption>
            </figure>
            {testimonials.map((columnGroup, columnGroupIdx) => (
              <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                {columnGroup.map((column, columnIdx) => (
                  <div
                    key={columnIdx}
                    className={classNames(
                      (columnGroupIdx === 0 && columnIdx === 0) ||
                        (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                        ? 'xl:row-span-2'
                        : 'xl:row-start-1',
                      'space-y-8',
                    )}
                  >
                    {column.map((testimonial) => (
                      <figure
                        key={testimonial.author.handle}
                        className="rounded-default bg-card p-6 shadow-lg ring-1 ring-gray-900/5"
                      >
                        <blockquote style={{color: 'var(--foreground)'}}>
                          <p>{`"${testimonial.body}"`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          <img alt="" src={testimonial.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                          <div>
                            <div className="font-semibold" style={{color: 'var(--foreground)'}}>{testimonial.author.name}</div>
                            <div className="text-muted">{`@${testimonial.author.handle}`}</div>
                          </div>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-card">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{color: 'var(--foreground)'}}>Frequently asked questions</h2>
          <p className="mt-6 max-w-2xl text-base/7 text-muted">
            Have a different question? Contact us at{' '}
            <a href="mailto:hello@yourpilla.com" className="font-semibold text-blue-600 hover:text-blue-500">
              hello@yourpilla.com
            </a>{' '}
            and we&rsquo;ll get back to you quickly.
          </p>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-base/7 font-semibold" style={{color: 'var(--foreground)'}}>{faq.question}</dt>
                  <dd className="mt-2 text-base/7 text-muted">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-card">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl" style={{color: 'var(--foreground)'}}>
              Start exploring hospitality resources today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-muted">
              Join thousands of hospitality professionals who rely on Pilla for accurate terminology and expert insights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/glossary"
                className="rounded-default bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Browse Glossary
              </Link>
              <Link href="/blog" className="text-sm/6 font-semibold" style={{color: 'var(--foreground)'}}>
                Read Articles <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}