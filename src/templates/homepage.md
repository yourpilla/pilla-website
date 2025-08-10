# Homepage Template

## Raw React Code from Tailwind
*Original Tailwind Plus sections pasted below*

'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

// ... [truncated original code for brevity] ...

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

### Navigation Header
- **company_name**: "Pilla"
- **company_logo**: "/logo full white 512x512.png"
- **nav_items**: 
  - { name: "Resources", href: "/blog" }
  - { name: "Glossary", href: "/glossary" }
  - { name: "About", href: "/about" }
- **login_text**: "Contact Us"
- **login_link**: "/contact"

### Hero Section
- **announcement_text**: "New glossary terms added" | **typography**: `text-sm font-medium`
- **announcement_link**: "/glossary"
- **announcement_link_text**: "See latest terms" | **typography**: `text-sm`
- **hero_title**: "Your Complete Hospitality Resource Hub" | **typography**: `display-1` *[Options: display-1, display-2, h1]*
- **hero_subtitle**: "Comprehensive glossary, expert insights, and practical guides to excel in the hospitality industry. From restaurant management to guest services." | **typography**: `subtitle-lg` *[Options: subtitle-lg, subtitle, lead]*
- **primary_cta_text**: "Explore Glossary"
- **primary_cta_link**: "/glossary"
- **secondary_cta_text**: "Read Articles" | **typography**: `text-sm font-semibold`
- **secondary_cta_link**: "/blog"
- **hero_image**: "/images/hospitality-app-screenshot.png"

### Testimonial Section  
- **company_logo**: "/logo full white 512x512.png"
- **testimonial_text**: "Pilla has transformed how we train our hospitality staff. The comprehensive glossary and practical guides have become essential resources for our team." | **typography**: `lead` *[Options: lead, h4, text-xl]*
- **author_image**: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
- **author_name**: "Sarah Johnson" | **typography**: `font-semibold`
- **author_role**: "Restaurant Manager at The Grand Hotel" | **typography**: `text-muted`

### Features Section (Left Image)
- **section_tag**: "Everything You Need" | **typography**: `eyebrow` *[Options: eyebrow, overline, text-sm]*
- **section_title**: "Comprehensive Hospitality Resources" | **typography**: `h2` *(auto-applied)*
- **section_subtitle**: "Access industry-leading content designed for hospitality professionals at every level." | **typography**: `lead` *[Options: lead, p, text-lg]*
- **feature_1_name**: "Complete Glossary" | **typography**: `font-semibold`
- **feature_1_description**: "240+ hospitality terms with clear definitions, pronunciation guides, and real-world context." | **typography**: `p`
- **feature_2_name**: "Expert Articles" | **typography**: `font-semibold`
- **feature_2_description**: "In-depth guides covering operations, management, customer service, and industry best practices." | **typography**: `p`
- **feature_3_name**: "Quick Reference" | **typography**: `font-semibold`
- **feature_3_description**: "Fast, searchable access to the information you need during busy service periods." | **typography**: `p`
- **features_image**: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"

### Bento Grid Features
- **grid_tag**: "Complete Solution" | **typography**: `eyebrow`
- **grid_title**: "Everything hospitality professionals need to excel" | **typography**: `h2` *(auto-applied)*
- **performance_title**: "Fast Search" | **typography**: `eyebrow` *[Options: eyebrow, overline, h6]*
- **performance_subtitle**: "Lightning-fast glossary search" | **typography**: `text-lg font-medium` *[Options: h5, h6, text-lg font-medium]*
- **performance_description**: "Find any hospitality term instantly with our optimized search that understands industry context and synonyms." | **typography**: `text-sm text-muted` *[Options: caption, text-sm text-muted, text-xs]*
- **performance_image**: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
- **releases_title**: "Regular Updates" | **typography**: `eyebrow`
- **releases_subtitle**: "Fresh content weekly" | **typography**: `text-lg font-medium`
- **releases_description**: "Stay current with new hospitality trends, terminology, and best practices added regularly." | **typography**: `text-sm text-muted`
- **releases_image**: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
- **speed_title**: "Mobile Ready" | **typography**: `eyebrow`
- **speed_subtitle**: "Perfect for busy service" | **typography**: `text-lg font-medium`
- **speed_description**: "Access resources quickly on any device during service hours." | **typography**: `text-sm text-muted`
- **speed_image**: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
- **integrations_title**: "Comprehensive" | **typography**: `eyebrow`
- **integrations_subtitle**: "All-in-one platform" | **typography**: `text-lg font-medium`
- **integrations_description**: "Glossary, articles, guides, and resources all in one easy-to-use platform." | **typography**: `text-sm text-muted`
- **integrations_image**: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
- **network_title**: "Expert Knowledge" | **typography**: `eyebrow`
- **network_subtitle**: "Industry-verified content" | **typography**: `text-lg font-medium`
- **network_description**: "All content reviewed and verified by hospitality industry experts and professionals." | **typography**: `text-sm text-muted`
- **network_image**: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"

### Two-Column Features
- **main_title**: "Professional hospitality resources you can trust" | **typography**: `h2` *(auto-applied)*
- **main_subtitle**: "Designed by industry professionals for hospitality teams who demand accuracy and practical application." | **typography**: `text-lg` *[Options: lead, text-lg, subtitle]*
- **left_section_title**: "Learn industry terminology" | **typography**: `h3` *(auto-applied)*
- **left_section_subtitle**: "Master the language of hospitality with our comprehensive glossary and contextual examples." | **typography**: `text-lg text-muted`
- **left_feature_1_name**: "Complete definitions" | **typography**: `font-medium`
- **left_feature_1_description**: "Clear, concise definitions written in plain English with industry context and usage examples." | **typography**: `text-muted`
- **left_feature_2_name**: "Pronunciation guides" | **typography**: `font-medium`
- **left_feature_2_description**: "Learn how to properly pronounce technical terms and foreign culinary expressions." | **typography**: `text-muted`
- **left_feature_3_name**: "Instant search" | **typography**: `font-medium`
- **left_feature_3_description**: "Find any term quickly with smart search that understands synonyms and related concepts." | **typography**: `text-muted`
- **left_image**: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"
- **right_section_title**: "Stay informed with expert insights" | **typography**: `h3` *(auto-applied)*
- **right_section_subtitle**: "Get practical guidance from industry professionals who understand real-world hospitality challenges." | **typography**: `text-lg text-muted`
- **right_feature_1_name**: "Weekly articles" | **typography**: `font-medium`
- **right_feature_1_description**: "Fresh insights on operations, management, trends, and best practices delivered regularly." | **typography**: `text-muted`
- **right_feature_2_name**: "Expert authors" | **typography**: `font-medium`
- **right_feature_2_description**: "Content written by experienced hospitality professionals, chefs, and industry consultants." | **typography**: `text-muted`
- **right_image**: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2432&h=1442&q=80"

### Testimonials Section
- **testimonials_tag**: "Testimonials" | **typography**: `eyebrow`
- **testimonials_title**: "Trusted by hospitality professionals worldwide" | **typography**: `h2` *(auto-applied)*
- **featured_testimonial**: "Pilla has become an essential part of our training program. New staff members can quickly look up unfamiliar terms, and the articles help our managers stay current with industry best practices." | **typography**: `lead` *[Options: lead, h4, text-xl]*
- **featured_author_name**: "Marcus Chen" | **typography**: `font-semibold`
- **featured_author_handle**: "marcuschen" | **typography**: `text-muted`
- **featured_author_image**: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80"
- **featured_author_logo**: "/logo full white 512x512.png"
- **regular_testimonials_typography**: `p` *[Options: p, text-sm, caption]*

### FAQ Section
- **faq_title**: "Frequently asked questions" | **typography**: `h2` *(auto-applied)*
- **faq_subtitle**: "Have a different question? Contact us at hello@yourpilla.com and we'll get back to you quickly." | **typography**: `text-muted`
- **faq_contact_link**: "mailto:hello@yourpilla.com"
- **faq_items**:
  - { question: "Is Pilla free to use?", answer: "Yes, all our glossary terms and articles are completely free to access. No registration required." }
  - { question: "How often is content updated?", answer: "We add new glossary terms and articles weekly, keeping pace with industry trends and terminology." }
  - { question: "Can I suggest new terms or topics?", answer: "Absolutely! We welcome suggestions from hospitality professionals. Contact us with your ideas." }
  - { question: "Is the content suitable for training staff?", answer: "Yes, our resources are designed for both self-learning and team training in hospitality environments." }
  - { question: "Do you cover all areas of hospitality?", answer: "We cover restaurants, hotels, bars, events, and all major hospitality sectors with specialized terminology." }
  - { question: "Can I access Pilla on mobile devices?", answer: "Yes, Pilla is fully responsive and optimized for smartphones and tablets for quick reference during service." }

### Final CTA Section
- **cta_title**: "Start exploring hospitality resources today" | **typography**: `h2` *(auto-applied)*
- **cta_subtitle**: "Join thousands of hospitality professionals who rely on Pilla for accurate terminology and expert insights." | **typography**: `text-lg` *[Options: lead, text-lg, subtitle]*
- **cta_primary_text**: "Browse Glossary"
- **cta_primary_link**: "/glossary"
- **cta_secondary_text**: "Read Articles" | **typography**: `text-sm font-semibold`
- **cta_secondary_link**: "/blog"

---

## Instructions:
1. Fill in your content in the forms above
2. Choose typography classes from the options provided  
3. For custom styling needs, additional classes can be combined
4. Standard headings (h1-h6) automatically use global styles
5. Use `.text-muted` for secondary/descriptive text
6. Use `.eyebrow` for section labels and category text

---