import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { getDocSections } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Documentation - Pilla',
  description: 'Complete documentation for the Pilla hospitality management platform. Learn how to streamline your operations, train your team, and ensure compliance.',
};

// Section metadata
const SECTION_INFO = {
  'getting-started': {
    title: 'Getting Started',
    description: 'Set up your account and learn the basics of using Pilla',
    icon: '🚀',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
  },
  'user-management': {
    title: 'User Management',
    description: 'Add team members, assign roles, and manage permissions',
    icon: '👥',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
  },
  'training': {
    title: 'Training & Development',
    description: 'Create and assign training programs for your team',
    icon: '📚',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
  },
  'operations': {
    title: 'Operations',
    description: 'Daily operations management and workflow optimization',
    icon: '⚙️',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
  },
  'integrations': {
    title: 'Integrations & API',
    description: 'Connect Pilla with your existing systems and tools',
    icon: '🔗',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600',
  },
} as const;

export default function DocsPage() {
  const sections = getDocSections();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-main">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Documentation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Everything you need to know about using Pilla to streamline your hospitality operations, 
              train your team, and ensure compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ section, docs }) => {
            const sectionInfo = SECTION_INFO[section as keyof typeof SECTION_INFO] || {
              title: section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
              description: `Documentation for ${section}`,
              icon: '📖',
              color: 'bg-gray-50 border-gray-200',
              iconColor: 'text-gray-600',
            };

            return (
              <Link
                key={section}
                href={`/docs/${section}`}
                className={`group block rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg hover:scale-105 ${sectionInfo.color}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`text-2xl ${sectionInfo.iconColor}`}>
                    {sectionInfo.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {sectionInfo.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {sectionInfo.description}
                    </p>
                    
                    {/* Doc count */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {docs.length} {docs.length === 1 ? 'guide' : 'guides'}
                      </span>
                      <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/docs/getting-started/introduction"
                className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  Introduction to Pilla
                </div>
              </Link>
              <Link
                href="/docs/getting-started/account-setup"
                className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  Account Setup
                </div>
              </Link>
              <Link
                href="/docs/user-management/adding-team-members"
                className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  Adding Team Members
                </div>
              </Link>
              <Link
                href="/docs/training/assigning-training"
                className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  Assigning Training
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need help getting started?
          </h3>
          <p className="text-gray-600 mb-4">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:support@yourpilla.com"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Email Support
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}