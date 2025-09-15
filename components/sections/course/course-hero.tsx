// components/sections/course/course-hero.tsx
export default function CourseHero() {
  return (
    <section className="container mx-auto px-6 py-16 pt-32">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated badge */}
        <div className="inline-block mb-6 animate-scale-in">
          <div className="glass-strong px-5 py-2 rounded-full">
            <span className="text-accent font-bold text-sm uppercase tracking-wider">
              💎 Master Resell Rights Included
            </span>
          </div>
        </div>
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 leading-tight animate-slide-up delay-200">
          <span className="block text-white mb-3">
            ULTIMATE BRANDING
          </span>
          <span className="block text-gradient animate-gradient text-shadow mb-3">
            COURSE
          </span>
          <span className="block text-accent text-2xl md:text-3xl font-bold">
            + Master Resell Rights
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-400">
          Learn comprehensive digital branding with 419+ video lessons, then 
          <span className="text-accent font-bold"> resell this course for $499 and keep 100% profit</span>.
        </p>
        
        {/* CTA Button */}
        <div className="animate-slide-up delay-600 mb-6">
          <a 
            href="#pricing"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-10 py-4 rounded-xl text-black font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 shadow-md"
          >
            Get Instant Access – $499
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
        </div>
        
        <p className="text-sm text-white/70 animate-slide-up delay-700">
          One-time payment • No subscriptions • Instant access • 30-day guarantee
        </p>
      </div>
    </section>
  )
}
