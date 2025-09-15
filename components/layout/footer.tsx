// components/layout/footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    course: [
      { label: "Course Overview", href: "/course" },
      { label: "What's Included", href: "/course#included" },
      { label: "Student Success", href: "/course#success" },
      { label: "Master Resell Rights", href: "/course#mrr" },
    ],
    legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/refund" },
      { label: "MRR License", href: "/mrr-license" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/#faq" },
      { label: "Student Login", href: "/login" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Affiliate Program", href: "/affiliate" },
      { label: "Reviews", href: "/reviews" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-background/50 border-t border-white/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-3xl font-heading font-black text-accent mb-4 block hover:scale-105 transition-transform duration-300">
              UBC
            </Link>
            <p className="text-secondary text-sm leading-relaxed mb-6">
              Master digital branding with our comprehensive course and Master Resell Rights. 
              Build your brand, learn the skills, then sell the course for $499.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 glass-minimal rounded-full flex items-center justify-center text-secondary hover:text-accent transition-colors duration-300 hover:scale-110">
                <span className="text-lg">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 glass-minimal rounded-full flex items-center justify-center text-secondary hover:text-accent transition-colors duration-300 hover:scale-110">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 glass-minimal rounded-full flex items-center justify-center text-secondary hover:text-accent transition-colors duration-300 hover:scale-110">
                <span className="text-lg">📸</span>
              </a>
              <a href="#" className="w-10 h-10 glass-minimal rounded-full flex items-center justify-center text-secondary hover:text-accent transition-colors duration-300 hover:scale-110">
                <span className="text-lg">🎥</span>
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6">Course</h3>
            <ul className="space-y-3">
              {footerLinks.course.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary hover:text-accent transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary hover:text-accent transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary hover:text-accent transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-heading font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary hover:text-accent transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="glass-minimal rounded-2xl p-8 mb-12 text-center">
          <h3 className="text-2xl font-heading font-bold text-white mb-4">
            Get Exclusive Updates
          </h3>
          <p className="text-secondary mb-6 max-w-md mx-auto">
            Be the first to know about new courses, MRR opportunities, and branding insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors duration-300"
            />
            <button className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-6 py-3 rounded-xl text-black font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 shadow-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="text-secondary text-sm mb-4 md:mb-0">
            © {currentYear} Ultimate Branding Course. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-secondary">
              💎 Master Resell Rights Included
            </span>
            <span className="text-accent font-semibold">
              $499 Course Value
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
