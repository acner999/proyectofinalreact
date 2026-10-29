import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getProductById } from '../services/api'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import StarRating from '../components/StarRating'

export default function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, loading, error, refetch } = useFetch(() => getProductById(id), [id])
  const [selectedImage, setSelectedImage] = useState(0)

  if (loading) return <Loader text="Cargando producto..." />
  if (error) {
    return (
      <div className="text-center">
        <ErrorMessage message={error} onRetry={refetch} />
        <Link to="/productos" className="text-sm font-semibold text-indigo-600 hover:underline">
          ← Volver a productos
        </Link>
      </div>
    )
  }

  const originalPrice = product.price / (1 - product.discountPercentage / 100)

  return (
    <div className="space-y-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-indigo-600 hover:underline"
      >
        ← Volver
      </button>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Galería */}
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-red-200">
            <img
              src={product.images[selectedImage] ?? product.thumbnail}
              alt={product.title}
              className="h-full w-full object-contain p-6"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${
                    i === selectedImage ? 'border-indigo-500' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt={`${product.title} ${i + 1}`} className="h-full w-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información */}
        <div className="space-y-5">
          <div>
            <span className="text-sm font-medium uppercase tracking-wide text-indigo-600">{product.category}</span>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">{product.title}</h1>
            {product.brand && <p className="mt-1 text-slate-500">Marca: {product.brand}</p>}
          </div>

          <StarRating value={product.rating} />

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-sm font-semibold text-rose-600">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="leading-relaxed text-slate-600">{product.description}</p>

          <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm">
            <div>
              <dt className="text-slate-500">Disponibilidad</dt>
              <dd className={`font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {product.availabilityStatus} ({product.stock})
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Envío</dt>
              <dd className="font-semibold text-slate-800">{product.shippingInformation}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Garantía</dt>
              <dd className="font-semibold text-slate-800">{product.warrantyInformation}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Devoluciones</dt>
              <dd className="font-semibold text-slate-800">{product.returnPolicy}</dd>
            </div>
          </dl>
        </div>
      </div>

      {product.reviews?.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Opiniones</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {product.reviews.map((review) => (
              <li
                key={`${review.reviewerEmail}-${review.date}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <StarRating value={review.rating} />
                <p className="mt-2 text-slate-700">“{review.comment}”</p>
                <p className="mt-3 text-sm font-medium text-slate-900">{review.reviewerName}</p>
                <p className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString('es-AR')}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
