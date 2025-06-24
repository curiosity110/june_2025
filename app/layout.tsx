// app/layout.tsx
import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"

// Load Google Fonts with CSS variables
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

// Basic SEO metadata
export const metadata: Metadata = {
  title: "June — The Ultimate Branding Course",
  description: "A premium digital shop offering AI-powered marketing tips, branding guides, and expert ebooks.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
          ${inter.variable} ${spaceGrotesk.variable}
          font-sans bg-background text-white
        `}
      >
        <Toaster position="top-center" />
        {/* ⚙️ This is where shared layout components go (Header, Footer, etc.) */}
        {children}
      </body>
    </html>
  )
}
