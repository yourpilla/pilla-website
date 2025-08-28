'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { FAQMatch } from '@/lib/faq-embeddings';
import Link from 'next/link';

interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
  matches?: FAQMatch[];
  timestamp: Date;
}

export default function FAQChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/faq-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: input,
          limit: 3,
          minSimilarity: 0.4
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      
      let assistantContent = '';
      if (data.matches.length === 0) {
        assistantContent = "I couldn&apos;t find any FAQs that closely match your question. Please try rephrasing your question or browse our FAQ categories.";
      } else {
        assistantContent = `I found ${data.matches.length} relevant FAQ${data.matches.length > 1 ? 's' : ''} that might help answer your question:`;
      }

      const assistantMessage: ChatMessage = {
        type: 'assistant',
        content: assistantContent,
        matches: data.matches,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Search error:', error);
      
      const errorMessage: ChatMessage = {
        type: 'assistant',
        content: 'Sorry, I encountered an error while searching. Please try again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Ask our FAQ Assistant</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Ask any question about hospitality management and I&apos;ll find relevant FAQs to help you.
        </p>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Start a conversation by asking any hospitality question</p>
            <p className="text-xs text-gray-400 mt-1">
              Example: &quot;How do I train new restaurant staff?&quot; or &quot;What are the key food safety requirements?&quot;
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              
              {message.matches && message.matches.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.matches.map((match, idx) => (
                    <Link
                      key={idx}
                      href={`/answers/${match.faq.slug}`}
                      className="block bg-white p-3 rounded border hover:shadow-sm transition-shadow"
                    >
                      <h4 className="font-medium text-blue-600 hover:text-blue-700 text-sm">
                        {match.faq.title}
                      </h4>
                      {match.faq.summary && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {match.faq.summary}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-blue-600">Read full answer →</span>
                        <span className="text-xs text-gray-400">
                          {Math.round(match.similarity * 100)}% match
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                Searching FAQs...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask any hospitality question..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
            Search
          </button>
        </form>
      </div>
    </div>
  );
}