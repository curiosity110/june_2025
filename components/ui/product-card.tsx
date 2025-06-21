// components/product-card.tsx
interface ProductProps {
  title: string
  subtitle: string
  description: string
  image: string
}

export default function ProductCard({ title, subtitle, description, image }: ProductProps) {
  return (
    <div className="rounded-xl p-6 border border-border bg-card shadow-card text-center">
      {/* <img src={image} alt={title} className="mb-4 w-full rounded-md" /> */}
      <img src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' alt={title} className="mb-4 w-full rounded-md" />
      <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
      <p className="text-text-soft text-sm">{description}</p>
    </div>
  )
}
