import Link from 'next/link';
import { DocItem } from '@/lib/content';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface DocNavigationProps {
  previousDoc: DocItem | null;
  nextDoc: DocItem | null;
}

export default function DocNavigation({ previousDoc, nextDoc }: DocNavigationProps) {
  if (!previousDoc && !nextDoc) {
    return null;
  }

  return (
    <nav className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex justify-between">
        <div className="flex-1">
          {previousDoc && (
            <Link
              href={`/docs/${previousDoc.slug}`}
              className="group flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Previous</div>
                <div className="text-gray-900">{previousDoc.title}</div>
              </div>
            </Link>
          )}
        </div>
        
        <div className="flex-1 text-right">
          {nextDoc && (
            <Link
              href={`/docs/${nextDoc.slug}`}
              className="group inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Next</div>
                <div className="text-gray-900">{nextDoc.title}</div>
              </div>
              <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}