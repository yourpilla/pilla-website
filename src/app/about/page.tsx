import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Pilla - Hospitality Management Platform',
  description: 'Learn about Pilla, the comprehensive platform designed to streamline hospitality operations, improve staff training, and enhance guest experiences.',
  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Pilla",
      "description": "Learn about Pilla, the comprehensive platform designed to streamline hospitality operations, improve staff training, and enhance guest experiences.",
      "url": "https://yourpilla.com/about",
      "inLanguage": "en-GB",
      "mainEntity": {
        "@type": "Organization",
        "name": "Pilla",
        "url": "https://yourpilla.com",
        "description": "Comprehensive hospitality management platform for modern businesses"
      }
    })
  }
};

export default function AboutPage() {
  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Pilla",
    "description": "Learn about Pilla, the comprehensive platform designed to streamline hospitality operations, improve staff training, and enhance guest experiences.",
    "url": "https://yourpilla.com/about",
    "inLanguage": "en-GB",
    "mainEntity": {
      "@type": "Organization",
      "name": "Pilla",
      "url": "https://yourpilla.com",
      "description": "Comprehensive hospitality management platform for modern businesses"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-card border-default rounded-default shadow-sm overflow-hidden">
          {/* Breadcrumb */}
          <div className="px-8 pt-6 pb-2">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Home
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li aria-current="page" className="text-gray-600">
                  About
                </li>
              </ol>
            </nav>
          </div>
          {/* Header */}
          <div className="bg-header-group px-8 py-12 text-center">
            <h1 className="mb-4 leading-tight">
              About Pilla
            </h1>
            <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
              Empowering hospitality professionals with comprehensive management tools, expert guidance, and innovative solutions.
            </p>
            
            {/* Key Values */}
            <div className="mt-8">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Innovation
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Excellence
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Community
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Growth
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-8 py-12">
            <div className="text-left max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2>Our Mission</h2>
                <p>
                  At Pilla, we believe that exceptional hospitality experiences start with empowered teams and streamlined operations. 
                  Our platform is designed to bridge the gap between traditional hospitality management and modern digital solutions, 
                  providing businesses with the tools they need to thrive in today&rsquo;s competitive landscape.
                </p>

                <h2>What We Offer</h2>
                <p>
                  From comprehensive staff training modules to operational efficiency tools, Pilla serves as your complete 
                  hospitality management partner. Our platform combines industry expertise with cutting-edge technology to 
                  deliver solutions that actually work in real-world environments.
                </p>

                <h3>Key Features</h3>
                <ul>
                  <li><strong>Staff Training & Development</strong> - Comprehensive training programs for all hospitality roles</li>
                  <li><strong>Operational Management</strong> - Tools to streamline daily operations and improve efficiency</li>
                  <li><strong>Expert Resources</strong> - Access to industry knowledge, best practices, and compliance guidance</li>
                  <li><strong>Community Support</strong> - Connect with other hospitality professionals and share experiences</li>
                </ul>

                <h2>Why Choose Pilla?</h2>
                <p>
                  Built by hospitality professionals for hospitality professionals, Pilla understands the unique challenges 
                  you face every day. Whether you&rsquo;re managing a boutique hotel, running a restaurant, or overseeing 
                  multiple venues, our platform scales with your needs and grows with your business.
                </p>

                <p>
                  We&rsquo;re committed to continuous improvement and innovation, regularly updating our platform based on 
                  user feedback and industry trends to ensure you always have access to the most current and effective tools.
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                  Ready to Transform Your Operations?
                </h3>
                <p className="text-muted mb-6">
                  Join thousands of hospitality professionals who trust Pilla to streamline their operations and enhance their guest experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get In Touch
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-card text-blue-600 font-medium rounded-default border-default hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}