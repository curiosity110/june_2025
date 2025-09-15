"use client";

export default function TestimonialsSection() {
  const items = [
    { name: 'Alex', text: 'June helped me launch my first product in days.' },
    { name: 'Riley', text: 'The templates saved me weeks of work!' },
    { name: 'Jordan', text: 'Clean design and actionable advice. Love it.' },
    { name: 'Ava K.', text: 'These ebooks transformed my marketing strategy!' },
    { name: 'Liam N.', text: 'I doubled my sales in a week after reading them.' },
    { name: 'Mia R.', text: 'Finally feel like the smartest person in the room.' },
  ]
  
  return (
    <section className="bg-section py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4 animate-fade-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              Our Students Are Winning
            </span>
          </h2>
          <p className="text-xl text-muted animate-fade-up animate-delay-1">
            Join 113,000+ like-minded students on the same mission
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((testimonial, i) => (
            <div
              key={i}
              className={`card-professional animate-fade-up animate-delay-${Math.min(i % 3, 3)}`}
            >
              <div className="mb-4">
                <p className="text-gray-300 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-accent font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-accent font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted text-xs">Student</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
