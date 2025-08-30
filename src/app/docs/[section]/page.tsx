import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
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

export default async function DocsSectionPage({ params }: DocsSectionPageProps) {
  const { section } = await params;
  const docs = getDocsBySection(section);
  
  if (docs.length === 0) {
    notFound();
  }

  const sectionInfo = SECTION_INFO[section as keyof typeof SECTION_INFO] || {
    title: section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: `Documentation for ${section}`,
    icon: '📖',
    color: 'bg-gray-50',
    iconColor: 'text-gray-600',
  };

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
              <div className="white-card rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                    </div>
                    {doc.meta && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {doc.meta}
                      </p>
                    )}
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}