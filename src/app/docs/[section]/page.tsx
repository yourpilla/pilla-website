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
    description: 'Create comprehensive training programs and track your team\'s progress and certifications.',
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
    <div className="bg-white">
      {/* Header */}
      <div className={`${sectionInfo.color}`}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/docs" className="text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Documentation
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <span className="ml-4 text-sm font-medium text-gray-700">
                  {sectionInfo.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="flex items-start space-x-6">
            <div className={`text-4xl ${sectionInfo.iconColor}`}>
              {sectionInfo.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {sectionInfo.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl">
                {sectionInfo.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation List */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
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
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200">
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-8">
              {/* Quick Start */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quick Start
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  New to this section? Start with the first guide to get up and running quickly.
                </p>
                <Link
                  href={`/docs/${section}/${sortedDocs[0]?.slug}`}
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Start Here
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Section Navigation */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Other Sections
                </h3>
                <nav className="space-y-2">
                  {Object.entries(SECTION_INFO)
                    .filter(([key]) => key !== section)
                    .map(([key, info]) => (
                      <Link
                        key={key}
                        href={`/docs/${key}`}
                        className="flex items-center space-x-3 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <span className="text-base">{info.icon}</span>
                        <span>{info.title}</span>
                      </Link>
                    ))}
                </nav>
              </div>

              {/* Support */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Can't find what you're looking for?
                </p>
                <div className="space-y-2">
                  <Link
                    href="mailto:support@yourpilla.com"
                    className="block text-sm text-blue-600 hover:text-blue-800"
                  >
                    Email Support
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-sm text-blue-600 hover:text-blue-800"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}