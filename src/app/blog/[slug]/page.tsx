import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ChartBar, Users, FileText } from '@phosphor-icons/react';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug('blog', slug);
  
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.meta || post.content.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('blog');
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getContentBySlug('blog', slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-blue-600">Hospitality Guide</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {post.title}
              </h1>
              {post.meta && (
                <p className="mt-6 text-xl/8 text-gray-700">
                  {post.meta}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <div className="w-3xl max-w-none rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl ring-1 ring-gray-400/10 sm:w-228 h-96 flex items-center justify-center">
            <div className="text-center text-white">
              <FileText size={64} className="mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-semibold mb-2">Hospitality Resource</h3>
              <p className="text-blue-100">Expert guidance for your business</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-600 lg:max-w-lg">
              <article className="prose prose-lg max-w-none [&>*]:text-gray-600 [&>h2]:text-gray-900 [&>h3]:text-gray-900 [&>h4]:text-gray-900 [&>strong]:text-gray-900">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
              
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <ChartBar size={20} className="mt-1 flex-none text-blue-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Data-driven insights.</strong> Our content is backed by industry research and real-world hospitality experience.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <Users size={20} className="mt-1 flex-none text-blue-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Team focused.</strong> Practical advice for managing hospitality teams and operations effectively.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <FileText size={20} className="mt-1 flex-none text-blue-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Ready-to-use templates.</strong> Download and customize our templates for immediate implementation.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}