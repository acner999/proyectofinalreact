import { useAuth } from '../hooks/useAuth'
import { useFetch } from '../hooks/useFetch'
import { getCurrentUser } from '../services/api'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function Perfil() {
  const { token, logout } = useAuth()
  // Petición autenticada: envía el token en el header Authorization
  const { data: user, loading, error, refetch } = useFetch(() => getCurrentUser(token), [token])

  if (loading) return <Loader text="Cargando tu perfil..." />
  if (error) {
    return (
      <div className="text-center">
        <ErrorMessage message={error} onRetry={refetch} />
        <button type="button" onClick={logout} className="text-sm font-semibold text-indigo-600 hover:underline">
          La sesión puede haber expirado: volver a ingresar
        </button>
      </div>
    )
  }

  const details = [
    ['Email', user.email],
    ['Teléfono', user.phone],
    ['Edad', `${user.age} años`],
    ['Ciudad', `${user.address.city}, ${user.address.state}`],
    ['Empresa', user.company.name],
    ['Puesto', user.company.title],
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:flex-row">
        <img src={user.image} alt={user.firstName} className="h-28 w-28 rounded-full bg-indigo-50" />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-slate-500">@{user.username}</p>
          <span className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
            {user.role}
          </span>
        </div>
      </section>

      <dl className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="font-medium text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
