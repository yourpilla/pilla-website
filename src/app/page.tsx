import Link from 'next/link'
import { getTestimonials } from '@/lib/content'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline'


const features = [
  {
    name: 'Complete Glossary',
    description:
      '240+ hospitality terms with clear definitions, pronunciation guides, and real-world context.',
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
    description:
      'Clear, concise definitions written in plain English with industry context and usage examples.',
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: 'Pronunciation guides',
    description:
      'Learn how to properly pronounce technical terms and foreign culinary expressions.',
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: 'Instant search',
    description:
      'Find any term quickly with smart search that understands synonyms and related concepts.',
    icon: BoltIcon,
  },
]
const communicationFeatures = [
  {
    id: 1,
    name: 'Weekly articles',
    description:
      'Fresh insights on operations, management, trends, and best practices delivered regularly.',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    id: 2,
    name: 'Expert authors',
    description:
      'Content written by experienced hospitality professionals, chefs, and industry consultants.',
    icon: EnvelopeIcon,
  },
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

export default function Example() {
  const featuredTestimonials = getTestimonials().filter(t => t.featured);
  
  // Group featured testimonials into columns for masonry layout
  const testimonialColumns = [];
  const itemsPerColumn = Math.ceil(featuredTestimonials.length / 3);
  
  for (let i = 0; i < 3; i++) {
    testimonialColumns.push(
      featuredTestimonials.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
    );
  }
  return (
    <div className="bg-main">

      <div className="relative isolate pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              <div className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span className="font-semibold text-indigo-600">New glossary terms added</span>
                <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
                <Link href="/glossary" className="flex items-center gap-x-1">
                  <span aria-hidden="true" className="absolute inset-0" />
                  See latest terms
                  <ChevronRightIcon aria-hidden="true" className="-mr-2 size-5 text-gray-400" />
                </Link>
              </div>
            </div>
            <h1 className="mt-10">
              Gamify your operation so that staff turn up on time and do the right things.
            </h1>
            <p className="mt-8 lead">
              Schedule shifts, work and communicate in the same app. Company leaderboards and automated feedback will keep your teams motivated to clock in and finish work on time.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/glossary"
                className="btn"
              >
                Explore Glossary
              </Link>
              <Link href="/blog" className="text-sm/6 font-semibold text-gray-900">
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

      <section className="bg-main px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            alt=""
            src="/logo full white 512x512.png"
            className="mx-auto h-12"
          />
          <figure className="mt-10">
            <blockquote className="text-center h2">
              <p>
                &ldquo;Pilla helps me have a day off knowing that procedures will be followed&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="mx-auto size-10 rounded-full"
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900 lead">Charles</div>
                <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <div className="text-gray-600 lead">Owner of Roots and Berries (11 Sites)</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="overflow-hidden bg-main py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="eyebrow">Everything You Need</h2>
                <p className="mt-2">
                  Comprehensive Hospitality Resources
                </p>
                <p className="mt-6 lead">
                  Access industry-leading content designed for hospitality professionals at every level.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
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
              className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>

      <div className="bg-main py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="eyebrow">Complete Solution</h2>
          <p className="mt-2 max-w-lg">
            Everything hospitality professionals need to excel
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover object-left"
                />
                <div className="p-10 pt-4">
                  <h3 className="eyebrow">Fast Search</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Lightning-fast glossary search</p>
                  <p className="mt-2 max-w-lg text-sm text-muted">
                    Find any hospitality term instantly with our optimized search that understands industry context and synonyms.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-0 rounded-lg bg-white lg:rounded-tr-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover object-left lg:object-right"
                />
                <div className="p-10 pt-4">
                  <h3 className="eyebrow">Regular Updates</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Fresh content weekly</p>
                  <p className="mt-2 max-w-lg text-sm text-muted">
                    Stay current with new hospitality trends, terminology, and best practices added regularly.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-tr-4xl" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white lg:rounded-bl-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover object-left"
                />
                <div className="p-10 pt-4">
                  <h3 className="eyebrow">Mobile Ready</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Perfect for busy service</p>
                  <p className="mt-2 max-w-lg text-sm text-muted">
                    Access resources quickly on any device during service hours.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 lg:rounded-bl-4xl" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover"
                />
                <div className="p-10 pt-4">
                  <h3 className="eyebrow">Comprehensive</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">All-in-one platform</p>
                  <p className="mt-2 max-w-lg text-sm text-muted">
                    Glossary, articles, guides, and resources all in one easy-to-use platform.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  className="h-80 object-cover"
                />
                <div className="p-10 pt-4">
                  <h3 className="eyebrow">Expert Knowledge</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Industry-verified content</p>
                  <p className="mt-2 max-w-lg text-sm text-muted">
                    All content reviewed and verified by hospitality industry experts and professionals.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-br-4xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-main py-16 lg:py-24">
        <div className="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
          <svg
            fill="none"
            width={404}
            height={784}
            viewBox="0 0 404 784"
            aria-hidden="true"
            className="absolute left-full hidden -translate-x-1/2 -translate-y-1/4 transform lg:block"
          >
            <defs>
              <pattern
                x={0}
                y={0}
                id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} fill="currentColor" width={4} height={4} className="text-gray-200" />
              </pattern>
            </defs>
            <rect fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" width={404} height={784} />
          </svg>

          <div className="relative">
            <h2 className="text-center text-3xl/8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Professional hospitality resources you can trust
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
              Designed by industry professionals for hospitality teams who demand accuracy and practical application.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="relative">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Learn industry terminology</h3>
              <p className="mt-3 text-lg text-gray-500">
                Master the language of hospitality with our comprehensive glossary and contextual examples.
              </p>

              <dl className="mt-10 space-y-10">
                {transferFeatures.map((item) => (
                  <div key={item.id} className="relative">
                    <dt>
                      <div className="absolute flex size-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                        <item.icon aria-hidden="true" className="size-8" />
                      </div>
                      <p className="ml-16 text-lg/6 font-medium text-gray-900">{item.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div aria-hidden="true" className="relative -mx-4 mt-10 lg:mt-0">
              <svg
                fill="none"
                width={784}
                height={404}
                viewBox="0 0 784 404"
                className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
              >
                <defs>
                  <pattern
                    x={0}
                    y={0}
                    id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} fill="currentColor" width={4} height={4} className="text-gray-200" />
                  </pattern>
                </defs>
                <rect fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" width={784} height={404} />
              </svg>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                width={490}
                className="relative mx-auto"
              />
            </div>
          </div>

          <svg
            fill="none"
            width={404}
            height={784}
            viewBox="0 0 404 784"
            aria-hidden="true"
            className="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block"
          >
            <defs>
              <pattern
                x={0}
                y={0}
                id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} fill="currentColor" width={4} height={4} className="text-gray-200" />
              </pattern>
            </defs>
            <rect fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" width={404} height={784} />
          </svg>

          <div className="relative mt-12 sm:mt-16 lg:mt-24">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-8">
              <div className="lg:col-start-2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Stay informed with expert insights</h3>
                <p className="mt-3 text-lg text-gray-500">
                  Get practical guidance from industry professionals who understand real-world hospitality challenges.
                </p>

                <dl className="mt-10 space-y-10">
                  {communicationFeatures.map((item) => (
                    <div key={item.id} className="relative">
                      <dt>
                        <div className="absolute flex size-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                          <item.icon aria-hidden="true" className="size-8" />
                        </div>
                        <p className="ml-16 text-lg/6 font-medium text-gray-900">{item.name}</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative -mx-4 mt-10 lg:col-start-1 lg:mt-0">
                <svg
                  fill="none"
                  width={784}
                  height={404}
                  viewBox="0 0 784 404"
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
                >
                  <defs>
                    <pattern
                      x={0}
                      y={0}
                      id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} fill="currentColor" width={4} height={4} className="text-gray-200" />
                    </pattern>
                  </defs>
                  <rect fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" width={784} height={404} />
                </svg>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
                  width={490}
                  className="relative mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-main pt-24 pb-32 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="eyebrow">Testimonials</h2>
            <p className="mt-2">
              Trusted by hospitality professionals worldwide
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 xl:mx-0 xl:max-w-none">
            {testimonialColumns.map((column, columnIdx) => (
              <div key={columnIdx} className="space-y-8">
                {column.map((testimonial) => (
                  <figure
                    key={testimonial.slug}
                    className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                  >
                    <blockquote className="text-gray-900">
                      <p>{`"${testimonial.content}"`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      {testimonial.imageUrl && (
                        <img 
                          alt="" 
                          src={testimonial.imageUrl} 
                          className="size-10 rounded-full bg-gray-50" 
                        />
                      )}
                      <div className="flex-auto">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        {testimonial.role && testimonial.company && (
                          <div className="text-gray-600">{testimonial.role} at {testimonial.company}</div>
                        )}
                      </div>
                      <a href={testimonial.platformUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                        <img 
                          alt={testimonial.platform} 
                          src={testimonial.platformLogo} 
                          className="h-8 w-auto" 
                        />
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-main">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <h2>Frequently asked questions</h2>
          <p className="mt-6 max-w-2xl text-muted">
            Have a different question? Contact us at hello@yourpilla.com and we&rsquo;ll get back to you quickly.{' '}
            <a href="mailto:hello@yourpilla.com" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Send us an email
            </a>
          </p>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-base/7 font-semibold text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base/7 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-main">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2>
              Start exploring hospitality resources today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-600">
              Join thousands of hospitality professionals who rely on Pilla for accurate terminology and expert insights.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/glossary"
                className="btn"
              >
                Browse Glossary
              </Link>
              <Link href="/blog" className="text-sm/6 font-semibold text-gray-900">
                Read Articles <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}