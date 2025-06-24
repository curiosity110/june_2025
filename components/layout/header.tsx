"use client"
// components/layout/header.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/context/theme-context"

export default function Header() {
  const { theme, setTheme, layout, setLayout, animation, setAnimation } = useTheme()
  return (
    <header className="bg-header border-t border-border shadow-md rounded-t-2xl px-8 py-6 flex flex-wrap gap-4 justify-between items-center">
      <nav className="flex gap-6 text-sm font-semibold text-gray-300">
        <Link href="/" className="text-white hover:text-accent transition">Home</Link>
        <Link href="/blog" className="text-white hover:text-accent transition">Blog</Link>
        <Link href="/about" className="text-white hover:text-accent transition">About</Link>
      </nav>
      <div className="flex items-center gap-4 flex-wrap">
        <select value={theme} onChange={e => setTheme(e.target.value as any)} className="bg-header border border-border rounded px-2 py-1 text-sm">
          <option value="modern">Modern</option>
          <option value="elegant">Elegant</option>
          <option value="minimal">Minimal</option>
          <option value="futuristic">Futuristic</option>
          <option value="sci-fi">Sci-Fi</option>
        </select>
        <select value={layout} onChange={e => setLayout(e.target.value as any)} className="bg-header border border-border rounded px-2 py-1 text-sm">
          <option value="default">Default Layout</option>
          <option value="wide">Wide Layout</option>
        </select>
        <select value={animation} onChange={e => setAnimation(e.target.value as any)} className="bg-header border border-border rounded px-2 py-1 text-sm">
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
        </select>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold shadow-md">
          Buy Now
        </Button>
      </div>
    </header>
  )
}
