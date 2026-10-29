import { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { getCategories, getProducts, getProductsByCategory, searchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

const PAGE_SIZE = 12

export default function Productos() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(0)

  // Debounce: espera 400 ms sin escribir antes de buscar
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400)
    return () => clearTimeout(timer)
  }, [search])

  const categories = useFetch(getCategories, [])

  const { data, loading, error, refetch } = useFetch(() => {
    const options = { limit: PAGE_SIZE, skip: page * PAGE_SIZE }
    if (debouncedSearch) return searchProducts(debouncedSearch, options)
    if (category) return getProductsByCategory(category, options)
    return getProducts(options)
  }, [debouncedSearch, category, page])

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0

  // La API no permite combinar búsqueda y categoría: elegir una limpia la otra
  function handleSearchChange(e) {
    setSearch(e.target.value)
    setCategory('')
    setPage(0)
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value)
    setSearch('')
    setDebouncedSearch('')
    setPage(0)
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Productos</h1>
        <p className="mt-1 text-slate-600">Buscá por nombre o filtrá por categoría.</p>
      </header>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar productos..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          disabled={categories.loading || Boolean(categories.error)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:w-60"
        >
          <option value="">Todas las categorías</option>
          {categories.data?.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loader text="Buscando productos..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {data && !loading && !error && (
        <>
          <p className="text-sm text-slate-500">
            {data.total} {data.total === 1 ? 'producto encontrado' : 'productos encontrados'}
          </p>

          {data.products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500">
              No encontramos productos para “{debouncedSearch}”.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-3" aria-label="Paginación">
              <button
                type="button"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Anterior
              </button>
              <span className="text-sm text-slate-600">
                Página {page + 1} de {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                disabled={page + 1 >= totalPages}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente →
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  )
}
