// lib/products.ts
export type Product = {
  slug: string
  title: string
  description: string
  content?: string
  ctaLabel: string
  isFree: boolean
  price?: number
  image: string
  category?: "bundle" | "product" | "course"
}

export const products: Record<string, Product> = {
  "organic-growth": {
    slug: "organic-growth",
    title: "Mastering Organic Growth",
    description: "Grow your brand across TikTok, YouTube, IG, blogs, and more — without paying for ads.",
    content: `
This ebook gives you step-by-step strategies to:
- Grow organically on any platform
- Use content to build community & trust
- Convert visibility into followers, leads, and sales
Perfect for anyone building a faceless brand, agency, or info product.`,
    ctaLabel: "Free Download",
    isFree: true,
    image: "https://elements-resized.envatousercontent.com/elements-cover-images/387a5b14-4a51-4687-ad98-ed5dd60b438b?w=2038&cf_fit=scale-down&q=85&format=auto&s=4f687220929ad124afb790b76a04338a45362a9f529bbff4a3cf071b2023bc93",
    category: "product",
  },
  "affiliate-playbook": {
    slug: "affiliate-playbook",
    title: "Affiliate Marketing Playbook",
    description: "Monetize without a product or face, using full automation.",
    content: `
Inside you'll discover:
- How to choose profitable affiliate offers
- The exact funnel templates and email sequences to use
- How to automate traffic using content + AI`,
    ctaLabel: "Buy for €17",
    isFree: false,
    price: 1700,
    image: "https://elements-resized.envatousercontent.com/elements-cover-images/387a5b14-4a51-4687-ad98-ed5dd60b438b?w=2038&cf_fit=scale-down&q=85&format=auto&s=4f687220929ad124afb790b76a04338a45362a9f529bbff4a3cf071b2023bc93",
    category: "product",
  },
  "prompt-engineering": {
    slug: "prompt-engineering",
    title: "Advanced Prompt Engineering",
    description: "Unlock AI marketing skills that bring real traffic and conversions.",
    content: `
What you’ll get:
- 100+ plug-and-play prompts
- ChatGPT frameworks for content, funnels, marketing
- Prompt stacking for advanced automations`,
    ctaLabel: "Buy for €27",
    isFree: false,
    price: 2700,
    image: "https://elements-resized.envatousercontent.com/elements-cover-images/387a5b14-4a51-4687-ad98-ed5dd60b438b?w=2038&cf_fit=scale-down&q=85&format=auto&s=4f687220929ad124afb790b76a04338a45362a9f529bbff4a3cf071b2023bc93",
    category: "product",
  },
  "content-automation": {
    slug: "content-automation",
    title: "Content Automation Toolkit",
    description: "Templates and workflows to streamline your publishing pipeline.",
    content: `
Learn how to plan, create, and repurpose content so you never run out of ideas.
Includes plug-and-play calendars and automation tips.
    `,
    ctaLabel: "Buy for €19",
    isFree: false,
    price: 1900,
    image: "https://elements-resized.envatousercontent.com/elements-cover-images/387a5b14-4a51-4687-ad98-ed5dd60b438b?w=2038&cf_fit=scale-down&q=85&format=auto&s=4f687220929ad124afb790b76a04338a45362a9f529bbff4a3cf071b2023bc93",
    category: "product",
  },
  "creator-bundle": {
    slug: "creator-bundle",
    title: "Creator Growth Bundle",
    description: "Get all ebooks at a discounted price, plus future updates.",
    ctaLabel: "Buy Bundle for €47",
    isFree: false,
    price: 4700,
    image: "https://elements-resized.envatousercontent.com/elements-cover-images/387a5b14-4a51-4687-ad98-ed5dd60b438b?w=2038&cf_fit=scale-down&q=85&format=auto&s=4f687220929ad124afb790b76a04338a45362a9f529bbff4a3cf071b2023bc93",
    category: "bundle",
  }
  },
}
