import { useEffect, useState } from 'react';
import { internalLinkingManager, LinkingOptions } from '@/lib/internal-linking';

interface AutoLinkedContentProps {
  content: string;
  currentUrl: string;
  className?: string;
  options?: LinkingOptions;
  renderAsMarkdown?: boolean;
}

export default function AutoLinkedContent({ 
  content, 
  currentUrl, 
  className = "", 
  options = {},
  renderAsMarkdown = false
}: AutoLinkedContentProps) {
  const [processedContent, setProcessedContent] = useState<string>(content);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    async function processContent() {
      setIsProcessing(true);
      
      try {
        // If content is markdown, convert to HTML first (basic conversion)
        let htmlContent = content;
        if (renderAsMarkdown) {
          // Simple markdown to HTML conversion
          htmlContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^\s*/, '<p>')
            .replace(/\s*$/, '</p>');
        }

        const linked = await internalLinkingManager.processContent(
          htmlContent, 
          currentUrl, 
          {
            maxLinksPerPage: 15,
            maxLinksPerPhrase: 1,
            skipIfAlreadyLinked: true,
            ...options
          }
        );
        
        setProcessedContent(linked);
      } catch (error) {
        console.error('Auto-linking failed:', error);
        setProcessedContent(content);
      } finally {
        setIsProcessing(false);
      }
    }

    processContent();
  }, [content, currentUrl, options, renderAsMarkdown]);

  if (isProcessing) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
      </div>
    );
  }

  return (
    <div 
      className={`auto-linked-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

// CSS for internal links (add to your global CSS)
export const InternalLinkStyles = `
.internal-link {
  color: #2563eb;
  text-decoration: underline;
  text-decoration-color: #93c5fd;
  transition: all 0.2s ease;
}

.internal-link:hover {
  color: #1d4ed8;
  text-decoration-color: #2563eb;
  background-color: #eff6ff;
  padding: 0 2px;
  border-radius: 2px;
}

.auto-linked-content .internal-link {
  font-weight: 500;
}
`;