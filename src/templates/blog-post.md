# Blog Post Page Template

## Raw React Code from Tailwind
*Paste your Tailwind Plus blog post/article sections here*

export default function Example() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-indigo-600">Introducing</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          JavaScript for Beginners
        </h1>
        <p className="mt-6 text-xl/8">
          Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget
          aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend
          egestas fringilla sapien.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <p>
          Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed <strong>eget risus enim</strong>.
          Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra
          tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.{' '}
          <a href="#">Mattis mauris semper</a> sed amet vitae sed turpis id.
        </p>
        <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
          <li className="flex gap-x-3">
            <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
            <span>
              <strong className="font-semibold text-gray-900">Data types.</strong> Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
            <span>
              <strong className="font-semibold text-gray-900">Loops.</strong> Anim aute id magna aliqua ad ad non
              deserunt sunt. Qui irure qui lorem cupidatat commodo.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
            <span>
              <strong className="font-semibold text-gray-900">Functions.</strong> Ac tincidunt sapien vehicula erat
              auctor pellentesque rhoncus.
            </span>
          </li>
        </ul>
        <p className="mt-8">
          Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestiae auctor
          fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac auctor
          sit tellus. Cursus sapien, velit volutpat cursus sed sit et ut. Mauris cursus magna eu urna cursus cursus arcu
          quis systique.
        </p>
        <figure className="mt-10 border-l border-indigo-600 pl-9">
          <blockquote className="font-semibold text-gray-900">
            <p>
              "Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus nibh ullamcorper ac dictum
              justo in euismod. Risus aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim tristique."
            </p>
          </blockquote>
          <figcaption className="mt-6 flex gap-x-4">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-6 flex-none rounded-full bg-gray-50"
            />
            <div className="text-sm/6">
              <strong className="font-semibold text-gray-900">Maria Hill</strong> – Marketing Manager
            </div>
          </figcaption>
        </figure>
        <p className="mt-10">
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
          sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
        </p>
      </div>
      <figure className="mt-16">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1587&q=80"
          className="aspect-video rounded-xl bg-gray-50 object-cover"
        />
        <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
          <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
          Faucibus commodo massa rhoncus, volutpat.
        </figcaption>
      </figure>
      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="text-2xl/8 font-semibold tracking-tight text-gray-900">Everything you need to get up and running</h2>
        <p className="mt-6">
          Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>. Amet, massa quam varius orci dapibus
          volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus
          non molestiae. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc,
          congue erat ac. Cras fermentum convallis quam.
        </p>
        <p className="mt-8">
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
          sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
        </p>
      </div>
    </div>
  )
}

---

## Typography Class Options

### Available Typography Classes:
- **display-1** (64px, 800 weight) - Largest hero text
- **display-2** (56px, 800 weight) - Large hero text  
- **h1-h6** - Standard heading sizes (auto-applied)
- **subtitle** (20px, muted) - Standard subtitle
- **subtitle-lg** (24px, muted) - Large subtitle  
- **subtitle-sm** (18px, muted) - Small subtitle
- **lead** (20px, normal weight) - Introduction paragraphs
- **eyebrow** (14px, uppercase, muted) - Small labels above headings
- **text-muted** - Muted gray color
- **text-sm** - Small text (14px)
- **text-xs** - Extra small text (12px)
- **caption** - Small descriptive text
- **overline** - Tiny uppercase text

---

## Content & Typography Forms

### Header Section
- **category_label**: "Restaurant Operations" | **typography**: `eyebrow` *[Options: eyebrow, text-base font-semibold]*
- **post_title**: "Restaurant Kitchen Management: Essential Systems for Success" | **typography**: `h1 + text-4xl font-semibold` *[Options: h1 + text-4xl, h1 + display-2, text-5xl]*
- **post_subtitle**: "Streamline your kitchen operations with proven management systems that reduce waste, improve efficiency, and maintain consistent food quality during busy service periods." | **typography**: `text-xl` *[Options: text-xl, lead, subtitle-lg]*

### Article Content
- **intro_paragraph**: "Running a successful restaurant kitchen requires more than just great recipes and skilled cooks. It demands systematic approaches to inventory management, staff coordination, quality control, and operational efficiency that work together seamlessly during the busiest service periods." | **typography**: `p`
- **intro_paragraph_enhanced**: "Strong operational systems" and "systematic efficiency" | **typography**: `strong`
- **reference_link**: "/glossary/kitchen-operations" | **link_text**: "kitchen operations management"

### Key Points List
- **list_intro**: "Essential kitchen management systems that every restaurant should implement:" | **typography**: `text-gray-600`
- **point_1_title**: "Inventory Management Systems" | **typography**: `font-semibold text-gray-900`
- **point_1_description**: "Track ingredients, reduce waste, and optimize ordering with digital inventory systems that integrate with your POS and suppliers." | **typography**: `span`
- **point_2_title**: "Staff Scheduling & Communication" | **typography**: `font-semibold text-gray-900`
- **point_2_description**: "Coordinate shifts, manage prep assignments, and maintain clear communication channels between front and back of house." | **typography**: `span`
- **point_3_title**: "Quality Control Protocols" | **typography**: `font-semibold text-gray-900`
- **point_3_description**: "Implement consistent standards for food preparation, plating, and temperature control to ensure guest satisfaction." | **typography**: `span`

### Middle Content
- **middle_paragraph**: "These systems work together to create a kitchen environment where staff can focus on what they do best - preparing excellent food - while operational excellence happens automatically in the background." | **typography**: `p`

### Quote Section
- **quote_text**: "Implementing proper kitchen management systems transformed our operation. We reduced food waste by 30% and improved our ticket times significantly, which directly improved our guest experience and profitability." | **typography**: `blockquote font-semibold text-gray-900`
- **quote_author_name**: "Sarah Chen" | **typography**: `font-semibold text-gray-900`
- **quote_author_title**: "Executive Chef, The Metropolitan" | **typography**: `text-sm`
- **quote_author_image**: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

### Continuation Content
- **after_quote_paragraph**: "The key to successful implementation is starting with one system at a time, training your team thoroughly, and measuring results consistently. Most restaurants see improvements within the first month of implementation." | **typography**: `p`

### Featured Image
- **featured_image**: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
- **image_caption**: "Modern restaurant kitchen with organized stations and digital inventory systems" | **typography**: `text-sm text-gray-500`

### Second Section
- **section_2_title**: "Implementation Strategy for Kitchen Systems" | **typography**: `h2 + text-2xl font-semibold`
- **section_2_intro**: "Successfully implementing kitchen management systems requires a phased approach that minimizes disruption while maximizing adoption rates among your team." | **typography**: `p`
- **section_2_content**: "Start with your biggest pain point - whether that's inventory waste, scheduling conflicts, or inconsistent food quality. Choose one system to implement fully before moving to the next. This approach allows your team to master each system and see immediate benefits, building confidence for the next implementation phase." | **typography**: `p`

### Article Metadata
- **author_name**: "Marcus Rodriguez" | **typography**: `font-semibold`
- **author_title**: "Restaurant Operations Consultant" | **typography**: `text-muted`
- **author_image**: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
- **publish_date**: "November 15, 2024" | **typography**: `text-sm text-muted`
- **read_time**: "8 min read" | **typography**: `text-sm text-muted`
- **category**: "Restaurant Operations" | **category_href**: "/blog/operations"

### SEO & Navigation
- **meta_description**: "Learn essential restaurant kitchen management systems that reduce waste, improve efficiency, and maintain food quality during busy service periods."
- **breadcrumbs**: "Blog > Restaurant Operations > Kitchen Management Systems"
- **related_articles**: 
  - "Staff Training Programs for New Restaurant Workers"
  - "Food Safety Management Systems Implementation"
  - "Restaurant Inventory Management Best Practices"

### Styling Options
- **background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*
- **content_width**: `max-w-3xl` *[Options: max-w-2xl, max-w-3xl, max-w-4xl]*
- **text_color**: `text-gray-700` *[Options: text-gray-700, text-gray-800, text-gray-900]*
- **accent_color**: `text-indigo-600` *[Options: text-indigo-600, text-blue-600, text-gray-600]*

---

## Instructions:
1. Paste your raw Tailwind Plus blog post/article code above
2. I'll analyze it and create content + typography forms
3. You'll fill out the forms with your hospitality content
4. I'll generate the final blog post component for the [slug] route

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/blog/[slug]/page.tsx`

*This template file remains as a working document with original code and forms for reference*