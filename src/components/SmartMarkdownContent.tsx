'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { internalLinkingManager, LinkingOptions } from '@/lib/internal-linking';
import { scalableInternalLinkingManager } from '@/lib/scalable-internal-linking';

interface SmartMarkdownContentProps {
  content: string;
  className?: string;
  enableAutoLinking?: boolean;
  linkingOptions?: LinkingOptions;
  useScalableSystem?: boolean; // Use new scalable system for 15,000+ pages
}

export default function SmartMarkdownContent({ 
  content, 
  className = "",
  enableAutoLinking = true,
  linkingOptions = {},
  useScalableSystem = true // Default to scalable for 15K+ pages
}: SmartMarkdownContentProps) {
  const pathname = usePathname();
  const [processedContent, setProcessedContent] = useState<string>(content);
  const [isProcessing, setIsProcessing] = useState(enableAutoLinking);

  useEffect(() => {
    async function processContent() {
      if (!enableAutoLinking) {
        setProcessedContent(content);
        setIsProcessing(false);
        return;
      }

      setIsProcessing(true);
      
      try {
        // Convert markdown to HTML first
        const htmlContent = await new Promise<string>((resolve) => {
          // Basic markdown to HTML conversion (tempDiv not needed for this approach)
          
          // Basic markdown to HTML conversion
          const html = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^\s*(.+)/, '<p>$1')
            .replace(/(.+)\s*$/, '$1</p>');

          resolve(html);
        });

        let linkedContent: string;
        
        if (useScalableSystem) {
          // Use the scalable system for 15,000+ pages
          linkedContent = await scalableInternalLinkingManager.processContentFast(
            htmlContent,
            pathname,
            linkingOptions.maxLinksPerPage || 8
          );
        } else {
          // Use legacy system
          linkedContent = await internalLinkingManager.processContent(
            htmlContent, 
            pathname, 
            {
              maxLinksPerPage: 8,
              maxLinksPerPhrase: 1,
              skipIfAlreadyLinked: true,
              ...linkingOptions
            }
          );
        }
        
        setProcessedContent(linkedContent);
      } catch (error) {
        console.error('Smart markdown processing failed:', error);
        setProcessedContent(content);
      } finally {
        setIsProcessing(false);
      }
    }

    processContent();
  }, [content, pathname, enableAutoLinking, linkingOptions, useScalableSystem]);

  if (isProcessing) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // If auto-linking is disabled, use regular ReactMarkdown
  if (!enableAutoLinking) {
    return (
      <div className={`prose prose-lg prose-blue max-w-none ${className}`}>
        <ReactMarkdown
          components={{
            h2: ({ children }) => <h2 className="h2">{children}</h2>,
            h3: ({ children }) => <h3 className="h3">{children}</h3>,
            h4: ({ children }) => <h4 className="h4">{children}</h4>,
            h5: ({ children }) => <h5 className="h5">{children}</h5>,
            h6: ({ children }) => <h6 className="h6">{children}</h6>,
            p: ({ children }) => <p className="small-blue">{children}</p>,
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 hover:text-blue-800 underline transition-colors"
                target={href?.startsWith('http') ? "_blank" : undefined}
                rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            ul: ({ children }) => <ul className="list-none space-y-3 mt-6 mb-6">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mt-6 mb-6 ml-4">{children}</ol>,
            li: ({ children }) => (
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 mt-1 flex-shrink-0">•</span>
                <span className="flex-1">{children}</span>
              </li>
            ),
            strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
            em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-200 pl-4 py-2 my-6 bg-blue-50 rounded-r">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                {children}
              </code>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  // Render processed HTML with auto-links
  return (
    <div 
      className={`prose prose-lg prose-blue max-w-none smart-markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

// Add these styles to your global CSS
export const SmartMarkdownStyles = `
.smart-markdown-content {
  /* Inherit existing prose styles */
}

.smart-markdown-content .internal-link {
  color: #2563eb;
  text-decoration: underline;
  text-decoration-color: #93c5fd;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: all 0.2s ease;
  font-weight: 500;
}

.smart-markdown-content .internal-link:hover {
  color: #1d4ed8;
  text-decoration-color: #2563eb;
  background-color: #eff6ff;
  padding: 1px 3px;
  border-radius: 3px;
  text-decoration-thickness: 2px;
}

.smart-markdown-content h2 { @apply h2; }
.smart-markdown-content h3 { @apply h3; }
.smart-markdown-content h4 { @apply h4; }
.smart-markdown-content h5 { @apply h5; }
.smart-markdown-content h6 { @apply h6; }
.smart-markdown-content p { @apply small-blue; }
.smart-markdown-content strong { @apply font-semibold text-gray-900; }
.smart-markdown-content em { @apply italic text-gray-700; }
`;