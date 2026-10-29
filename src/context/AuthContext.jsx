import { createContext, useState } from 'react'
import { login as loginRequest } from '../services/api'

const STORAGE_KEY = 'reactshop-session'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  // Inicialización perezosa: lee localStorage sólo en el primer render
  const [session, setSession] = useState(readSession)

  async function login(username, password) {
    const { accessToken, refreshToken: _refresh, ...user } = await loginRequest(
      username,
      password,
    )
    const newSession = { user, token: accessToken }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession))
    setSession(newSession)
    return user
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }

  const value = {
    user: session?.user ?? null,
    token: session?.token ?? null,
    isAuthenticated: Boolean(session?.token),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
