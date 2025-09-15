export const metadata = {
  title: 'About Ultimate Branding Course',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <section className="container mx-auto px-6 py-20 pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block mb-6">
              <div className="glass-strong px-6 py-3 rounded-full">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  💎 About UBC
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-black mb-6 text-gradient animate-gradient">
              Ultimate Branding Course
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              The most comprehensive digital branding education with Master Resell Rights included.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12 animate-slide-up delay-200">
            {/* Mission */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-3xl font-heading font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-secondary text-lg leading-relaxed">
                We believe everyone deserves to build a powerful, authentic brand that resonates with their audience. 
                The Ultimate Branding Course provides the complete roadmap, tools, and strategies needed to master 
                digital branding—plus the opportunity to earn by reselling the course with Master Resell Rights.
              </p>
            </div>

            {/* What's Included */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">📚</span>
                </div>
                <h2 className="text-3xl font-heading font-bold text-white">What You Get</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-white mb-1">419+ Video Lessons</h3>
                      <p className="text-secondary text-sm">Comprehensive training covering every aspect of digital branding</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Brand Strategy Framework</h3>
                      <p className="text-secondary text-sm">Step-by-step process to build your unique brand identity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Design Templates</h3>
                      <p className="text-secondary text-sm">Professional templates for logos, social media, and marketing materials</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Master Resell Rights</h3>
                      <p className="text-secondary text-sm">Full rights to resell the course for $499 and keep 100% profit</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Marketing Strategies</h3>
                      <p className="text-secondary text-sm">Proven methods to grow your brand and attract customers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Lifetime Access</h3>
                      <p className="text-secondary text-sm">Keep the course forever with all future updates included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stats */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold text-white mb-4">Student Success</h2>
                <p className="text-secondary">Real results from our UBC community</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-heading font-black text-accent mb-2">2,847+</div>
                  <p className="text-secondary">Students Enrolled</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-heading font-black text-accent mb-2">$500K+</div>
                  <p className="text-secondary">Student Revenue Generated</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-heading font-black text-accent mb-2">4.9/5</div>
                  <p className="text-secondary">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center glass-minimal rounded-2xl p-8">
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                Ready to Master Branding?
              </h3>
              <p className="text-secondary mb-6 max-w-2xl mx-auto">
                Join thousands of students who transformed their brands and built profitable businesses with the Ultimate Branding Course.
              </p>
              <a 
                href="/#pricing"
                className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-8 py-4 rounded-xl text-black font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 shadow-md"
              >
                Get UBC for $499
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
