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
    <div className="bg-main">
      {/* Documentation Sections */}
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Documentation Sections
        </h2>
            
        <div className="space-y-6">
          {sections.map(({ section, docs }) => {
            const sectionInfo = SECTION_INFO[section as keyof typeof SECTION_INFO] || {
              title: section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
              description: `Documentation for ${section}`,
              icon: '📖',
              color: 'bg-gray-50',
              iconColor: 'text-gray-600',
            };

            return (
              <Link
                key={section}
                href={`/docs/${section}`}
                className="block group"
              >
                <div className="white-card rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`text-2xl ${sectionInfo.iconColor}`}>
                          {sectionInfo.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {sectionInfo.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {sectionInfo.description}
                      </p>
                      <span className="text-xs text-gray-500">
                        {docs.length} {docs.length === 1 ? 'guide' : 'guides'}
                      </span>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}