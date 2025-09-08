// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import Providers from "@/components/layout/providers"
import BodyWrapper from "@/components/layout/body-wrapper"

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
      <Providers>
        <BodyWrapper>{children}</BodyWrapper>
      </Providers>
    </html>
  )
}
