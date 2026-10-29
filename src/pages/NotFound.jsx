import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-7xl font-extrabold text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Página no encontrada</h1>
      <p className="mt-2 text-slate-600">La ruta que buscás no existe.</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
