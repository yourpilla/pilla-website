import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRightIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { getDocsBySection } from '@/lib/content';

interface DocsSectionPageProps {
  params: Promise<{
    section: string;
  }>;
}

// Section metadata
const SECTION_INFO = {
  'getting-started': {
    title: 'Getting Started',
    description: 'Set up your account and learn the basics of using Pilla to manage your hospitality business effectively.',
    icon: '🚀',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  'user-management': {
    title: 'User Management',
    description: 'Learn how to add team members, assign roles, and manage user permissions across your organization.',
    icon: '👥',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  'training': {
    title: 'Training & Development',
    description: 'Create comprehensive training programs and track your team&apos;s progress and certifications.',
    icon: '📚',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  'operations': {
    title: 'Operations',
    description: 'Streamline your daily operations with automated workflows and performance monitoring.',
    icon: '⚙️',
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  'integrations': {
    title: 'Integrations & API',
    description: 'Connect Pilla with your existing POS systems, payroll tools, and other business software.',
    icon: '🔗',
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
} as const;

export async function generateMetadata({ params }: DocsSectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const sectionInfo = SECTION_INFO[section as keyof typeof SECTION_INFO];
  const sectionTitle = sectionInfo?.title || section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${sectionTitle} - Pilla Documentation`,
    description: sectionInfo?.description || `${sectionTitle} documentation for the Pilla hospitality management platform.`,
  };
}

export async function generateStaticParams() {
  const sections = Object.keys(SECTION_INFO);
  return sections.map((section) => ({
    section,
  }));
}

export const revalidate = 21600; // 6 hours

export default async function DocsSectionPage({ params }: DocsSectionPageProps) {
  const { section } = await params;
  const docs = getDocsBySection(section);
  
  if (docs.length === 0) {
    notFound();
  }

  // Sort docs by order
  const sortedDocs = docs.sort((a, b) => (a.order || 999) - (b.order || 999));

  return (
    <div className="bg-main">
      {/* Documentation List */}
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Guides in this section
        </h2>
            
        <div className="space-y-6">
          {sortedDocs.map((doc, index) => (
            <Link
              key={doc.slug}
              href={`/docs/${section}/${doc.slug}`}
              className="block group"
            >
              <div className="white-card rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
                <div className="flex items-center gap-x-6">
                  <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <DocumentTextIcon aria-hidden="true" className="big-blue-icon" />
                  </div>
                  <div className="flex-auto">
                    <h3 className="small-blue group-hover:text-blue-600 transition-colors">
                      {doc.title}
                    </h3>
                    {doc.meta && (
                      <p className="mt-1 small-grey line-clamp-2">
                        {doc.meta}
                      </p>
                    )}
                    <span className="text-xs text-gray-500 mt-2 block">
                      Guide {index + 1} of {sortedDocs.length}
                    </span>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}