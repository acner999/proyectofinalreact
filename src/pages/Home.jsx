import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const features = [
  { icon: '⚡', title: 'Hooks', text: 'useState, useEffect y hooks propios como useFetch y useAuth.' },
  { icon: '🧭', title: 'React Router', text: 'Navegación SPA con layout compartido, rutas dinámicas y protegidas.' },
  { icon: '🌐', title: 'API REST', text: 'Datos reales desde DummyJSON con manejo de carga y errores.' },
]

export default function Home() {
  // Los 8 productos mejor puntuados
  const { data, loading, error, refetch } = useFetch(
    () => getProducts({ limit: 8, sortBy: 'rating', order: 'desc' }),
    [],
  )

  return (
    <div className="space-y-14">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 px-6 py-14 text-white shadow-xl sm:px-12 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-100">Proyecto final · React</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          Todo lo que necesitás, en una sola tienda de conveniencia
        </h1>
        <p className="mt-4 max-w-xl text-lg text-indigo-100">
          Explorá cientos de productos, filtrá por categoría y mirá el detalle de cada uno.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/productos"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow hover:bg-indigo-50"
          >
            Ver productos
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            entrar
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <article key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-3xl">{f.icon}</span>
            <h2 className="mt-3 font-semibold text-slate-900">{f.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{f.text}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Mejor puntuados</h2>
          <Link to="/productos" className="text-sm font-semibold text-indigo-600 hover:underline">
            Ver todos →
          </Link>
        </div>

        {loading && <Loader text="Cargando productos destacados..." />}
        {error && <ErrorMessage message={error} onRetry={refetch} />}
        {data && !loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
