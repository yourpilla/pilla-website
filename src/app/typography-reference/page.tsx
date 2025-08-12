export default function TypographyReference() {
  return (
    <div className="bg-main min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="display-1 mb-4">Typography Reference</h1>
          <p className="lead">Complete overview of all available typography classes in the SaaS Typography Kit</p>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">
              ⚠️ This is a temporary reference page - will be deleted before going live
            </p>
          </div>
        </div>

        {/* Display Classes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Display Classes</h2>
          
          <div className="space-y-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">display-1</code>
              <h1 className="display-1">The quick brown fox jumps over the lazy dog</h1>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">display-2</code>
              <h2 className="display-2">The quick brown fox jumps over the lazy dog</h2>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">h1</code>
              <h1 className="h1">The quick brown fox jumps over the lazy dog</h1>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">h2</code>
              <h2 className="h2">The quick brown fox jumps over the lazy dog</h2>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">h3</code>
              <h3 className="h3">The quick brown fox jumps over the lazy dog</h3>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">h4</code>
              <h4 className="h4">The quick brown fox jumps over the lazy dog</h4>
            </div>
          </div>
        </section>

        {/* Subtitle Classes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Subtitle Classes</h2>
          
          <div className="space-y-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">subtitle-lg</code>
              <p className="subtitle-lg">The quick brown fox jumps over the lazy dog</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">subtitle</code>
              <p className="subtitle">The quick brown fox jumps over the lazy dog</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">subtitle-sm</code>
              <p className="subtitle-sm">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </section>

        {/* Body Text Classes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Body Text Classes</h2>
          
          <div className="space-y-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">lead</code>
              <p className="lead">The quick brown fox jumps over the lazy dog. This is lead text used for introductory paragraphs and important content that needs to stand out from regular body text.</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">body (default)</code>
              <p>The quick brown fox jumps over the lazy dog. This is regular body text used for most content throughout the website. It provides good readability and hierarchy.</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">body-sm</code>
              <p className="body-sm">The quick brown fox jumps over the lazy dog. This is small body text used for secondary information, captions, and supporting content.</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">text-muted</code>
              <p className="text-muted">The quick brown fox jumps over the lazy dog. This is muted text used for less important information and subtle content.</p>
            </div>
          </div>
        </section>

        {/* Special Classes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Special Classes</h2>
          
          <div className="space-y-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">eyebrow</code>
              <p className="eyebrow">The quick brown fox jumps over the lazy dog</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">caption</code>
              <p className="caption">The quick brown fox jumps over the lazy dog</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">overline</code>
              <p className="overline">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </section>

        {/* Color Information */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Color System</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <h3 className="text-lg font-semibold mb-4">Main Text Color</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#374151'}}></div>
                <div>
                  <code className="text-sm font-mono">#374151</code>
                  <p className="text-sm text-gray-600">Used for headings and primary text</p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <h3 className="text-lg font-semibold mb-4">Muted Text Color</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{backgroundColor: '#9CA3AF'}}></div>
                <div>
                  <code className="text-sm font-mono">#9CA3AF</code>
                  <p className="text-sm text-gray-600">Used for secondary and muted text</p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <h3 className="text-lg font-semibold mb-4">Background Color</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg border border-gray-300" style={{backgroundColor: '#FAF9FB'}}></div>
                <div>
                  <code className="text-sm font-mono">#FAF9FB</code>
                  <p className="text-sm text-gray-600">Main background color (bg-main)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Font Information */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Font Information</h2>
          
          <div className="p-6 border border-gray-200 rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-4">Font Family</h3>
            <p className="mb-2"><strong>Primary:</strong> Arial with enhanced readability features</p>
            <p className="text-sm text-gray-600">All typography classes use Arial as the base font with proper spacing and responsive sizing.</p>
          </div>
        </section>

        {/* Font Weights */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">Font Weights</h2>
          
          <div className="space-y-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">Headings: Bold (700-800)</code>
              <h2 className="h2">Bold heading text for maximum impact</h2>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">Body: Regular (400)</code>
              <p>Regular weight body text for optimal readability</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg bg-white">
              <code className="text-sm font-mono text-blue-600 mb-3 block">Emphasis: Medium (500-600)</code>
              <p className="font-medium">Medium weight text for subtle emphasis</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}