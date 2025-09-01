import { Metadata } from 'next';
import Link from 'next/link';
import { 
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

export const revalidate = 21600; // 6 hours

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
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
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
                <div className="white-card p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-x-6">
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50">
                      <sectionInfo.icon aria-hidden="true" className="big-blue-icon" />
                    </div>
                    <div className="flex-auto">
                      <h3 className="h4">
                        {sectionInfo.title}
                      </h3>
                      <p className="mt-1 small-blue">
                        {sectionInfo.description}
                      </p>
                      <span className="text-xs text-gray-500 mt-2 block">
                        {docs.length} {docs.length === 1 ? 'guide' : 'guides'}
                      </span>
                    </div>
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