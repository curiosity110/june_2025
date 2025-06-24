import { blogPosts } from '@/lib/blog'
import Header from "@/components/layout/header"

export const metadata = {
  title: 'Blog - Customer Stories'
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <section className="bg-[#0b0815] px-6 py-20 text-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <h1 className="text-4xl font-heading font-bold text-yellow-300 text-center">Customer Stories</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <article key={post.slug} className="bg-[#0f1527] p-6 rounded-xl shadow-md space-y-2">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm text-purple-200">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
