"use client";
// components/layout/header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/context/theme-context";

export default function Header() {
  const { theme, setTheme, layout, setLayout, animation, setAnimation } =
    useTheme();
  return (
    <header className="bg-header border-t border-border shadow-md rounded-t-2xl px-8 py-6 flex flex-wrap gap-4 justify-between items-center">
      <nav className="flex gap-6 text-sm font-semibold text-gray-300">
        <Link href="/" className="text-white hover:text-accent transition">
          Home
        </Link>
        <Link href="/blog" className="text-white hover:text-accent transition">
          Blog
        </Link>
        <Link href="/about" className="text-white hover:text-accent transition">
          About
        </Link>
      </nav>
    </header>
  );
}
