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
            <h2 className="h2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="h3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="h4">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="h5">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="h6">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="small-blue">{children}</p>
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