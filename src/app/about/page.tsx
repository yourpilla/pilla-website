import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="relative isolate overflow-hidden bg-main px-6 py-24 sm:py-32 lg:overflow-visible lg:px-18">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-4xl">
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  About Pilla
                </h1>
                <div className="mt-6 small-grey">
                  <p>Empowering hospitality professionals with comprehensive management tools, expert guidance, and innovative solutions.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:sticky lg:top-4 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:justify-start">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format" 
              alt="About Pilla - Hospitality management platform" 
              width={400}
              height={300}
              className="w-full max-w-sm object-cover rounded-lg"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-4xl text-base/7 text-gray-600">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}