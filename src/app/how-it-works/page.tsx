import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="relative isolate overflow-hidden bg-main px-6 py-24 sm:py-32 lg:overflow-visible lg:px-18">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-4xl">
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  How Pilla Works
                </h1>
                <div className="mt-6 small-grey">
                  <p>Transform your hospitality operations in four simple steps with our comprehensive platform designed for modern businesses.</p>
                </div>
                
                {/* Process Steps */}
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white border border-gray-200 text-sm px-4 py-2 rounded-lg font-medium text-gray-900">
                      Setup
                    </span>
                    <span className="bg-white border border-gray-200 text-sm px-4 py-2 rounded-lg font-medium text-gray-900">
                      Train
                    </span>
                    <span className="bg-white border border-gray-200 text-sm px-4 py-2 rounded-lg font-medium text-gray-900">
                      Operate
                    </span>
                    <span className="bg-white border border-gray-200 text-sm px-4 py-2 rounded-lg font-medium text-gray-900">
                      Improve
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:sticky lg:top-4 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:justify-start">
            <Image
              src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop&auto=format" 
              alt="How Pilla Works - Step by step process" 
              width={400}
              height={300}
              className="w-full max-w-sm object-cover rounded-lg"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-4xl text-base/7 text-gray-600">
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
                  <h3 className="mb-3 subtitle-lg">
                    Start Your Transformation Today
                  </h3>
                  <p className="text-muted mb-6">
                    Take the first step toward streamlined operations and enhanced guest experiences with Pilla&rsquo;s comprehensive platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 btn rounded-default transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Get Started Now
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center px-6 py-3 bg-card link-nav rounded-default border-default hover:bg-blue-50 transition-colors"
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