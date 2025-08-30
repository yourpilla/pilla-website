'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DocItem } from '@/lib/content';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface DocsSidebarProps {
  sections: Array<{
    section: string;
    docs: DocItem[];
  }>;
}

const SECTION_NAMES: Record<string, string> = {
  'getting-started': 'Getting Started',
  'user-management': 'User Management',
  'training': 'Training',
  'operations': 'Operations',
  'integrations': 'Integrations',
  'general': 'General',
};

export default function DocsSidebar({ sections }: DocsSidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Auto-expand the section containing the current page
    const initialState: Record<string, boolean> = {};
    sections.forEach(({ section, docs }) => {
      const hasCurrentPage = docs.some(doc => `/docs/${section}/${doc.slug}` === pathname);
      initialState[section] = hasCurrentPage;
    });
    return initialState;
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <nav className="py-6">
      <div className="mb-6">
        <Link href="/docs" className="text-xl font-semibold text-gray-900 hover:text-blue-600">
          Documentation
        </Link>
      </div>
      
      <div className="space-y-2">
        {sections.map(({ section, docs }) => {
          const isExpanded = expandedSections[section];
          const sectionName = SECTION_NAMES[section] || section;
          
          return (
            <div key={section}>
              <button
                onClick={() => toggleSection(section)}
                className="flex items-center justify-between w-full py-2 px-3 text-left text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span>{sectionName}</span>
                {isExpanded ? (
                  <ChevronDownIcon className="w-4 h-4" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4" />
                )}
              </button>
              
              {isExpanded && (
                <div className="ml-4 space-y-1">
                  {docs.map((doc) => {
                    const isActive = `/docs/${section}/${doc.slug}` === pathname;
                    
                    return (
                      <Link
                        key={doc.slug}
                        href={`/docs/${section}/${doc.slug}`}
                        className={`block py-2 px-3 text-sm rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {doc.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}