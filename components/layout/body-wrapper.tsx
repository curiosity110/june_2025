'use client'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Toaster } from 'react-hot-toast'

export default function BodyWrapper({
  children,
  fonts,
}: {
  children: React.ReactNode
  fonts: string
}) {
  return (
    <body className={`${fonts} font-sans text-white bg-section`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <Toaster position="top-center" />
        {process.env.DUMMY_PAYMENT_MODE === 'true' && (
          <div className="bg-red-600 text-center text-sm py-2">
            Payments are simulated for testing. No real transaction is made.
          </div>
        )}
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </body>
  )
}
