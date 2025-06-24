// app/layout.tsx
import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import type { Metadata } from "next"
import Header from "@/components/layout/header"
import { Toaster } from "react-hot-toast"

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
        {/* Fancy glow container */}
        <div className="relative group max-w-6xl mx-auto">
            <Header />
            <Toaster position="top-center" />
            {process.env.DUMMY_PAYMENT_MODE === "true" && (
              <div className="bg-red-600 text-center text-sm py-2">
                Payments are simulated for testing. No real transaction is made.
              </div>
            )}
            
            {/* App content */}
            <main>
              {children}
            </main>
          </div>
      </body>
    </html>
  )
}
