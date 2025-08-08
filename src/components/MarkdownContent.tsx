import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div className={`prose prose-lg prose-blue max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-lg leading-relaxed text-gray-700">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-3 mt-6 mb-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mt-6 mb-6 ml-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1 flex-shrink-0">•</span>
              <span className="flex-1">{children}</span>
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">{children}</em>
          ),
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