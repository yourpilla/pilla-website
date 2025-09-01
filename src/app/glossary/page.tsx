import { getContentByCategory } from '@/lib/content';
import GlossaryClient from '@/components/GlossaryClient';

export default function GlossaryIndex() {
  const terms = getContentByCategory('glossary').sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="h1">Hospitality Glossary</h1>
          <p className="mt-2 big-blue">Your comprehensive guide to hospitality industry terminology. From front-of-house operations to back-office management, find clear definitions for every role and concept.</p>
        </div>
      </div>

      <GlossaryClient terms={terms} />
    </div>
  );
}