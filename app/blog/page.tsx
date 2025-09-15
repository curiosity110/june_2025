import { blogPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog - UBC Success Stories'
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <section className="container mx-auto px-6 py-20 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block mb-6">
              <div className="glass-strong px-6 py-3 rounded-full">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  📚 Student Success Stories
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-black mb-6 text-gradient animate-gradient">
              UBC Success Stories
            </h1>
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Real results from students who mastered branding with the Ultimate Branding Course
              and leveraged their Master Resell Rights.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 animate-slide-up delay-200">
            {blogPosts.map((post, index) => (
              <article 
                key={post.slug} 
                className={`glass-card p-8 rounded-2xl hover:glass-medium transition-all duration-500 hover:scale-105 animate-scale-in delay-${300 + index * 100} group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full flex items-center justify-center group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-500">
                      <span className="text-2xl">💡</span>
                    </div>
                    <div className="text-sm text-accent font-semibold uppercase tracking-wider">
                      Success Story
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-heading font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-secondary leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-4">
                    <div className="inline-flex items-center text-accent font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Read Full Story
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-slide-up delay-500">
            <div className="glass-minimal rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-heading font-bold text-white mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-secondary mb-6">
                Join thousands of students who transformed their brands and built profitable businesses with UBC.
              </p>
              <a 
                href="/#pricing"
                className="inline-flex items-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-8 py-4 rounded-xl text-black font-bold hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 shadow-md"
              >
                Get Ultimate Branding Course
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
