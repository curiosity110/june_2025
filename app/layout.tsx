// app/layout.tsx
import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type { Metadata } from "next"
import Providers from "@/components/layout/providers"
import BodyWrapper from "@/components/layout/body-wrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ultimatebrandingcourse.com'),
  title: {
    default: "Ultimate Branding Course - Master Digital Branding + MRR",
    template: "%s | Ultimate Branding Course"
  },
  description: "Master digital branding with 419+ video lessons + get Master Resell Rights. Learn comprehensive branding skills, then sell this $499 course and keep 100% profit.",
  keywords: [
    "digital branding",
    "master resell rights",
    "MRR course",
    "branding course", 
    "digital marketing",
    "brand strategy",
    "online business",
    "resell rights",
    "branding education",
    "brand building"
  ],
  authors: [{ name: "Ultimate Branding Course" }],
  creator: "Ultimate Branding Course",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ultimatebrandingcourse.com",
    title: "Ultimate Branding Course - Master Digital Branding + MRR",
    description: "Master digital branding with 419+ video lessons + get Master Resell Rights. Learn comprehensive branding skills, then sell this $499 course and keep 100% profit.",
    siteName: "Ultimate Branding Course",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Real World - Learn Real Skills, Make Real Money",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Real World - Learn Real Skills, Make Real Money",
    description: "Join 250,000+ students learning real-world skills that actually make money.",
    images: ["/og-image.jpg"],
    creator: "@therealworld"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    other: {
      facebook: "your-facebook-domain-verification"
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fonts = `${inter.variable} ${spaceGrotesk.variable}`
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Real World",
              url: "https://therealworld.ag",
              logo: "https://therealworld.ag/logo.png",
              description: "Online education platform teaching real-world business skills",
              sameAs: [
                "https://twitter.com/therealworld",
                "https://instagram.com/therealworld",
                "https://linkedin.com/company/therealworld"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "support@therealworld.ag"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: "Ultimate Branding Course",
              description: "Master digital branding with 419+ video lessons + get Master Resell Rights",
              provider: {
                "@type": "Organization",
                name: "Ultimate Branding Course"
              },
              offers: {
                "@type": "Offer",
                category: "Education",
                price: "499",
                priceCurrency: "USD"
              }
            })
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#00ff88" />
        <meta name="color-scheme" content="dark" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//analytics.google.com" />
      </head>
      <Providers>
        <BodyWrapper fonts={fonts}>{children}</BodyWrapper>
      </Providers>
    </html>
  )
}
