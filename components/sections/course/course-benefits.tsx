// components/sections/course/course-benefits.tsx
const benefits = [
  "419+ Video Lessons covering complete digital branding mastery",
  "Master Resell Rights - Sell for $499 and keep 100% profit",
  "Lifetime Access - No subscriptions, own it forever",
  "Professional brand templates and design assets",
  "Marketing strategies and campaign blueprints",
  "Step-by-step brand building framework",
  "All future updates and new modules included"
]

export default function CourseBenefits() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-3">
            What's Included
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Everything you need to master digital branding and start earning with resell rights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((item, idx) => (
            <div 
              key={idx} 
              className={`glass-card p-5 rounded-xl hover:glass-medium transition-all duration-500 animate-scale-in delay-${200 + idx * 100} group border border-accent/30 hover:border-accent/50`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full flex items-center justify-center group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-500 flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-white group-hover:text-accent transition-colors duration-300 font-medium text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-slide-up delay-500">
          <div className="glass-minimal rounded-xl p-6 max-w-2xl mx-auto border border-accent/30">
            <h3 className="text-xl font-heading font-bold text-white mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-white/80 mb-5 text-sm">
              Join thousands of students building successful brands and earning with Master Resell Rights.
            </p>
            <a 
              href="#pricing"
              className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-6 py-3 rounded-xl text-black font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 text-sm shadow-md"
            >
              Get Ultimate Branding Course
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
