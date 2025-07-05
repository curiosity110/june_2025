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
  title: "June — The Ultimate Branding Course",
  description: "A premium digital shop offering AI-powered marketing tips, branding guides, and expert ebooks.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fonts = `${inter.variable} ${spaceGrotesk.variable}`
  return (
    <html lang="en" className="dark">
      <Providers>
        <BodyWrapper fonts={fonts}>{children}</BodyWrapper>
      </Providers>
    </html>
  )
}
