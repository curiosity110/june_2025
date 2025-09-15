"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/course", label: "Course" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center py-6">
          {/* Centered Navigation with glassmorphic background */}
          <nav className="flex items-center justify-center w-full max-w-2xl">
            <div className="glass-strong flex items-center justify-between w-full rounded-2xl px-8 py-4 border border-white/10">
              {/* Logo */}
              <Link href="/" className="text-2xl font-heading font-black text-accent animate-fade-in hover:scale-105 transition-transform duration-300">
                UBC
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-2">
                {links.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                      index === 0 
                        ? 'bg-accent text-black hover:bg-accent/90' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <Link 
                href="#pricing"
                className="hidden md:block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-6 py-2 rounded-xl text-black font-bold text-sm hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 shadow-md"
              >
                Get Access
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden fixed top-6 right-6 p-3 text-white/80 hover:text-white glass-strong rounded-xl border border-white/10 transition-all duration-300 hover:scale-105 z-60"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden fixed top-20 left-4 right-4 animate-fade-in z-50">
            <div className="glass-strong border border-white/10 rounded-2xl p-6 space-y-4">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-3 text-center font-semibold rounded-xl transition-all duration-300 ${
                    index === 0
                      ? 'bg-accent text-black'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#pricing"
                className="block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-6 py-3 rounded-xl text-black font-bold text-center transition-all duration-300 shadow-md"
                onClick={() => setOpen(false)}
              >
                Get Access
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
