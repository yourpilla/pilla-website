import { getDocSections } from '@/lib/content';
import DocsSidebar from '@/components/DocsSidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = getDocSections();
  
  return (
    <div className="bg-main min-h-screen">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
              <DocsSidebar sections={sections} />
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}