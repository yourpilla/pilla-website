import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Pilla Works - Hospitality Management Platform',
  description: 'Discover how Pilla streamlines hospitality operations through intuitive tools, comprehensive training, and expert support designed for modern hospitality businesses.',
  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How Pilla Works",
      "description": "Discover how Pilla streamlines hospitality operations through intuitive tools, comprehensive training, and expert support designed for modern hospitality businesses.",
      "url": "https://yourpilla.com/how-it-works",
      "inLanguage": "en-GB",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Sign Up & Setup",
          "text": "Create your account and customize your workspace to match your business needs."
        },
        {
          "@type": "HowToStep",
          "name": "Train Your Team",
          "text": "Access comprehensive training modules designed for all hospitality roles."
        },
        {
          "@type": "HowToStep",
          "name": "Streamline Operations",
          "text": "Use our management tools to optimize daily operations and improve efficiency."
        },
        {
          "@type": "HowToStep",
          "name": "Monitor & Improve",
          "text": "Track performance metrics and continuously enhance your service quality."
        }
      ]
    })
  }
};

export default function HowItWorksPage() {
  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Pilla Works",
    "description": "Discover how Pilla streamlines hospitality operations through intuitive tools, comprehensive training, and expert support designed for modern hospitality businesses.",
    "url": "https://yourpilla.com/how-it-works",
    "inLanguage": "en-GB",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Sign Up & Setup",
        "text": "Create your account and customize your workspace to match your business needs."
      },
      {
        "@type": "HowToStep",
        "name": "Train Your Team",
        "text": "Access comprehensive training modules designed for all hospitality roles."
      },
      {
        "@type": "HowToStep",
        "name": "Streamline Operations",
        "text": "Use our management tools to optimize daily operations and improve efficiency."
      },
      {
        "@type": "HowToStep",
        "name": "Monitor & Improve",
        "text": "Track performance metrics and continuously enhance your service quality."
      }
    ]
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
                  How It Works
                </li>
              </ol>
            </nav>
          </div>
          {/* Header */}
          <div className="bg-header-group px-8 py-12 text-center">
            <h1 className="mb-4 leading-tight">
              How Pilla Works
            </h1>
            <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
              Transform your hospitality operations in four simple steps with our comprehensive platform designed for modern businesses.
            </p>
            
            {/* Process Steps */}
            <div className="mt-8">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Setup
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Train
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Operate
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Improve
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-8 py-12">
            <div className="text-left max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2>Getting Started is Simple</h2>
                <p>
                  Pilla is designed to integrate seamlessly into your existing operations without disrupting your daily workflow. 
                  Our step-by-step approach ensures a smooth transition from traditional management methods to our comprehensive 
                  digital platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                        1
                      </div>
                      <h3 className="text-lg font-semibold mb-0">Sign Up & Setup</h3>
                    </div>
                    <p className="text-gray-600 mb-0">
                      Create your account in minutes and customize your workspace to match your specific business needs. 
                      Our onboarding process guides you through initial configuration.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                        2
                      </div>
                      <h3 className="text-lg font-semibold mb-0">Train Your Team</h3>
                    </div>
                    <p className="text-gray-600 mb-0">
                      Access our comprehensive library of training modules covering everything from customer service 
                      to food safety. Track progress and ensure consistent standards across your team.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                        3
                      </div>
                      <h3 className="text-lg font-semibold mb-0">Streamline Operations</h3>
                    </div>
                    <p className="text-gray-600 mb-0">
                      Implement our management tools to optimize scheduling, inventory, compliance tracking, 
                      and daily operational tasks. Reduce manual work and increase efficiency.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                        4
                      </div>
                      <h3 className="text-lg font-semibold mb-0">Monitor & Improve</h3>
                    </div>
                    <p className="text-gray-600 mb-0">
                      Use our analytics and reporting features to track key performance metrics, identify areas 
                      for improvement, and make data-driven decisions that enhance guest satisfaction.
                    </p>
                  </div>
                </div>

                <h2>Why This Approach Works</h2>
                <p>
                  Our methodology is based on years of experience working with hospitality businesses of all sizes. 
                  We&rsquo;ve identified the key pain points that operators face and designed our platform to address 
                  these challenges systematically.
                </p>

                <h3>Seamless Integration</h3>
                <p>
                  Pilla doesn&rsquo;t replace your existing systems overnight. Instead, we integrate gradually, 
                  allowing your team to adapt naturally while maintaining operational continuity. This reduces 
                  resistance to change and ensures higher adoption rates.
                </p>

                <h3>Continuous Support</h3>
                <p>
                  Throughout each step, our support team is available to help you maximize the platform&rsquo;s potential. 
                  From initial setup to advanced feature implementation, we&rsquo;re here to ensure your success.
                </p>

                <h2>Ready to Get Started?</h2>
                <p>
                  Join thousands of hospitality professionals who have already transformed their operations with Pilla. 
                  Our team is ready to help you begin your journey toward more efficient, profitable operations.
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                  Start Your Transformation Today
                </h3>
                <p className="text-muted mb-6">
                  Take the first step toward streamlined operations and enhanced guest experiences with Pilla&rsquo;s comprehensive platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get Started Now
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center px-6 py-3 bg-card text-blue-600 font-medium rounded-default border-default hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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