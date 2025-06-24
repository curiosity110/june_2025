"use client"
import { createContext, useContext, useState, ReactNode } from "react"

export type Theme = "modern" | "elegant" | "minimal" | "futuristic" | "sci-fi"
export type Layout = "default" | "wide"
export type Animation = "fade" | "slide"

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  layout: Layout
  setLayout: (l: Layout) => void
  animation: Animation
  setAnimation: (a: Animation) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("ThemeContext not found")
  return ctx
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("modern")
  const [layout, setLayout] = useState<Layout>("default")
  const [animation, setAnimation] = useState<Animation>("fade")

  return (
    <ThemeContext.Provider value={{ theme, setTheme, layout, setLayout, animation, setAnimation }}>
      {children}
    </ThemeContext.Provider>
  )
}
