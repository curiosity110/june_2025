// components/layout/header.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
<header className="bg-[#1a1a2b] border-t border-[#2a2a3a] shadow-md rounded-t-2xl max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
  <nav className="flex gap-6 text-sm font-semibold text-gray-300">
    <Link href="/" className="text-white hover:text-yellow-400 transition">Home</Link>
    <Link href="/blog" className="text-white hover:text-yellow-400 transition">Blog</Link>
    <Link href="/about" className="text-white hover:text-yellow-400 transition">About</Link>
  </nav>
  <Button className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold shadow-md">
    Buy Now
  </Button>
</header>


  )
}
