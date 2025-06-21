// components/layout/header.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="flex justify-between items-center py-6 px-6 max-w-6xl mx-auto">
      <nav className="flex gap-6 text-sm font-semibold text-gray-300">
        <Link href="/" className="text-white hover:text-accent">Home</Link>
        <Link href="/products" className="text-white hover:text-accent">Products</Link>
        <Link href="/course" className="text-white hover:text-accent">Course</Link>
        <Link href="/blog" className="text-white hover:text-accent">Blog</Link>
      </nav>
      <Button className="bg-purple-600 hover:bg-purple-500 text-white">Buy Now</Button>
    </header>
  )
}
