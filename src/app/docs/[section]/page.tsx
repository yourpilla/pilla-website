import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getDocsBySection } from '@/lib/content';

interface DocsSectionPageProps {
  params: Promise<{
    section: string;
  }>;
}

// Section titles mapping
const SECTION_TITLES: Record<string, string> = {
  'getting-started': 'Getting Started',
  'user-management': 'User Management', 
  'training': 'Training & Development',
  'operations': 'Operations',
  'integrations': 'Integrations & API'
};

export async function generateMetadata({ params }: DocsSectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const sectionTitle = SECTION_TITLES[section] || section;
  
  return {
    title: `${sectionTitle} - Pilla Documentation`,
    description: `${sectionTitle} documentation for the Pilla hospitality management platform.`,
  };
}

export async function generateStaticParams() {
  // Get all unique sections
  const sections = Object.keys(SECTION_TITLES);
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
  
  // Redirect to the first document in the section
  const firstDoc = docs.sort((a, b) => (a.order || 999) - (b.order || 999))[0];
  redirect(`/docs/${section}/${firstDoc.slug}`);
}