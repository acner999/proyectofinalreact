import { startTransition, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import logo from '../assets/logo.svg'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/perfil', label: 'Mi perfil' },
]

function navClass({ isActive }) {
  return `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-50 text-indigo-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    setOpen(false)
    // React Router aplica la navegación dentro de una transición; si el logout
    // fuera urgente, ProtectedRoute vería "sin sesión" en /perfil y mandaría a /login.
    startTransition(() => {
      logout()
      navigate('/')
    })
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="" className="h-8 w-8" />
          <span className="text-lg font-bold text-slate-900">ReactShop</span>
        </Link>

        {/* Botón hamburguesa (mobile) */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <div
          className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-1 border-b border-slate-200 bg-white p-4 shadow-md md:static md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="mt-2 flex items-center gap-3 md:ml-4 md:mt-0">
              <img src={user.image} alt={user.firstName} className="h-8 w-8 rounded-full bg-slate-100" />
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700 md:ml-4 md:mt-0"
            >
              Ingresar
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
