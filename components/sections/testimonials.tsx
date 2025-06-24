export default function Testimonials() {
  const testimonials = [
export default function TestimonialsSection() {
  const items = [
    { name: 'Alex', text: 'June helped me launch my first product in days.' },
    { name: 'Riley', text: 'The templates saved me weeks of work!' },
    { name: 'Jordan', text: 'Clean design and actionable advice. Love it.' },
    { name: 'Jordan', text: 'Clean design and actionable advice. Love it.' },
    { name: 'Ava K.', quote: 'These ebooks transformed my marketing strategy!' },
    { name: 'Liam N.', quote: 'I doubled my sales in a week after reading them.' },
    { name: 'Mia R.', quote: 'Finally feel like the smartest person in the room.' },
    { name: 'Noah S.', quote: 'My business is thriving thanks to these tips.' },
  ]
  return (
    <section className="bg-[#0f1527] px-6 py-20">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-3xl font-heading font-bold text-yellow-300">What Customers Say</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-[#1a2238] p-6 rounded-lg text-left shadow">
              <p className="text-purple-200 mb-2">"{t.quote}"</p>
              <p className="text-sm text-yellow-300 font-semibold">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
  )
}
