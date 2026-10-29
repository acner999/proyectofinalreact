import { Link } from 'react-router-dom'
import StarRating from './StarRating'

export default function ProductCard({ product }) {
  const { id, title, thumbnail, price, rating, category, discountPercentage } = product

  return (
    <Link
      to={`/detalle/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square bg-slate-100">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition group-hover:scale-105"
        />
        {discountPercentage >= 10 && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">{category}</span>
        <h3 className="line-clamp-2 font-semibold text-slate-900">{title}</h3>
        <StarRating value={rating} />
        <p className="mt-auto pt-2 text-xl font-bold text-slate-900">${price.toFixed(2)}</p>
      </div>
    </Link>
  )
}
