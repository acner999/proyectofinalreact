import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const DEMO_USER = { username: 'emilys', password: 'emilyspass' }

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/perfil'

  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (isAuthenticated) return <Navigate to={redirectTo} replace />

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(form.username.trim(), form.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message === 'Invalid credentials' ? 'Usuario o contraseña incorrectos' : err.message)
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-slate-600">Ingresá para ver tu perfil.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-700">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-medium text-slate-800">Usuario de prueba</p>
          <p>
            <code>{DEMO_USER.username}</code> / <code>{DEMO_USER.password}</code>
          </p>
          <button
            type="button"
            onClick={() => setForm(DEMO_USER)}
            className="mt-2 font-semibold text-indigo-600 hover:underline"
          >
            Completar automáticamente
          </button>
        </div>
      </div>
    </div>
  )
}
