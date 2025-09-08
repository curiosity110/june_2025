'use client'

import Header from '@/components/layout/header'
import { Toaster } from 'react-hot-toast'
import { useTheme } from '@/components/context/theme-context'

export default function BodyWrapper({
  children,
  fonts = "",
}: {
  children: React.ReactNode
  fonts?: string
}) {
  const { theme, layout, animation } = useTheme()

  return (
    <body className={`${fonts} font-sans text-white theme-${theme} layout-${layout}`}>
      <div className={`relative group ${layout === 'wide' ? '' : 'max-w-6xl mx-auto'}`}>
        <Header />
        <Toaster position="top-center" />
        {process.env.DUMMY_PAYMENT_MODE === 'true' && (
          <div className="bg-red-600 text-center text-sm py-2">
            Payments are simulated for testing. No real transaction is made.
          </div>
        )}
        <main className={animation === 'fade' ? 'animate-fade' : 'animate-slide'}>
          {children}
        </main>
      </div>
    </body>
  )
}
