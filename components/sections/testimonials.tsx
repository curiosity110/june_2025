export default function TestimonialsSection() {
  const items = [
    { name: 'Alex', text: 'June helped me launch my first product in days.' },
    { name: 'Riley', text: 'The templates saved me weeks of work!' },
    { name: 'Jordan', text: 'Clean design and actionable advice. Love it.' }
    { name: 'Jordan', text: 'Clean design and actionable advice. Love it.' },
    { name: 'Ava K.', quote: 'These ebooks transformed my marketing strategy!' },
    { name: 'Liam N.', quote: 'I doubled my sales in a week after reading them.' },
    { name: 'Mia R.', quote: 'Finally feel like the smartest person in the room.' },
    { name: 'Noah S.', quote: 'My business is thriving thanks to these tips.' },
  ]
  return (
    <section className="bg-[#0f0f1c] px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl text-white font-semibold mb-6 text-center">What creators say</h2>
        <div className="grid sm:grid-cols-3 gap-6 text-sm text-purple-200">
          {items.map((t, i) => (
            <div key={i} className="bg-[#151525] p-4 rounded-lg border border-[#2c2c40] text-center">
              <p className="mb-2">“{t.text}”</p>
              <p className="text-yellow-300 font-medium">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
  )
}
