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
    <div className="sticky top-4">
      <div className="white-card rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Documentation</h4>
        
        <nav className="text-sm">
          <div className="space-y-2">
            {sections.map(({ section, docs }) => {
              const isExpanded = expandedSections[section];
              const sectionName = SECTION_NAMES[section] || section;
              
              return (
                <div key={section}>
                  <button
                    onClick={() => toggleSection(section)}
                    className="flex items-center justify-between w-full py-1 text-left font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <span style={{ fontSize: '0.875rem' }}>{sectionName}</span>
                    {isExpanded ? (
                      <ChevronDownIcon className="w-3 h-3" />
                    ) : (
                      <ChevronRightIcon className="w-3 h-3" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="space-y-2 mt-2">
                      {docs.map((doc) => {
                        const isActive = `/docs/${section}/${doc.slug}` === pathname;
                        
                        return (
                          <Link
                            key={doc.slug}
                            href={`/docs/${section}/${doc.slug}`}
                            className={`block py-1 pl-4 transition-colors ${
                              isActive
                                ? 'text-blue-600 font-medium'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                            style={{ fontSize: '0.8125rem' }}
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
      </div>
    </div>
  );
}