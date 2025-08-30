import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRightIcon,
  RocketLaunchIcon,
  UsersIcon,
  BookOpenIcon,
  CogIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
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
    icon: RocketLaunchIcon,
  },
  'user-management': {
    title: 'User Management',
    description: 'Add team members, assign roles, and manage permissions',
    icon: UsersIcon,
  },
  'training': {
    title: 'Training & Development',
    description: 'Create and assign training programs for your team',
    icon: BookOpenIcon,
  },
  'operations': {
    title: 'Operations',
    description: 'Daily operations management and workflow optimization',
    icon: CogIcon,
  },
  'integrations': {
    title: 'Integrations & API',
    description: 'Connect Pilla with your existing systems and tools',
    icon: LinkIcon,
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
              icon: BookOpenIcon,
            };

            return (
              <Link
                key={section}
                href={`/docs/${section}`}
                className="block group"
              >
                <div className="white-card rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
                  <div className="flex items-center gap-x-6">
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <sectionInfo.icon aria-hidden="true" className="big-blue-icon" />
                    </div>
                    <div className="flex-auto">
                      <h3 className="small-blue group-hover:text-blue-600 transition-colors">
                        {sectionInfo.title}
                      </h3>
                      <p className="mt-1 small-grey">
                        {sectionInfo.description}
                      </p>
                      <span className="text-xs text-gray-500 mt-2 block">
                        {docs.length} {docs.length === 1 ? 'guide' : 'guides'}
                      </span>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
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