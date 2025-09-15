// components/sections/course/course-price.tsx
export default function CoursePrice() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-xl mx-auto text-center">
        <div className="mb-10 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-3">
            Lifetime Access
          </h2>
          <p className="text-lg text-white/80">
            One payment. Complete course + resell rights forever.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl text-center animate-scale-in delay-200 border border-accent/30 hover:border-accent/50 transition-all duration-500">
          <div className="mb-6">
            <div className="text-5xl md:text-6xl font-heading font-black text-accent mb-3">
              $499
            </div>
            <p className="text-base text-white/70 line-through mb-1">$997 regular price</p>
            <p className="text-accent font-bold">Limited Time Offer</p>
          </div>
          
          <div className="space-y-3 mb-6 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
              <span className="text-white font-medium">419+ video lessons (lifetime access)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
              <span className="text-white font-medium">Master Resell Rights included</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
              <span className="text-white font-medium">Sell for $499, keep 100% profit</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
              <span className="text-white font-medium">All future updates included</span>
            </div>
          </div>
          
          <a 
            href="#purchase"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-8 py-4 rounded-xl text-black font-bold text-base hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 w-full justify-center shadow-md"
          >
            Get Instant Access
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
        </div>

        <div className="mt-6 text-center animate-slide-up delay-400">
          <div className="flex items-center justify-center space-x-6 text-sm text-white/70">
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span>Secure payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>Instant access</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔄</span>
              <span>30-day guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
