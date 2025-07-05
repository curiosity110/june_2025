'use client'

import { ThemeProvider } from '@/components/context/theme-context'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
