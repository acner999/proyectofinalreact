// Centraliza todas las peticiones a la API pública DummyJSON.
// Docs: https://dummyjson.com/docs
const BASE_URL = 'https://dummyjson.com'

async function request(endpoint, options = {}) {
  let res
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    })
  } catch {
    throw new Error('No se pudo conectar con el servidor. Revisá tu conexión.')
  }

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message || `Error ${res.status}: ${res.statusText}`)
  }
  return data
}

// ---------- Productos ----------

export function getProducts({ limit = 12, skip = 0, sortBy, order = 'asc' } = {}) {
  const sort = sortBy ? `&sortBy=${sortBy}&order=${order}` : ''
  return request(`/products?limit=${limit}&skip=${skip}${sort}`)
}

export function searchProducts(query, { limit = 12, skip = 0 } = {}) {
  return request(
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
  )
}

export function getCategories() {
  return request('/products/categories')
}

export function getProductsByCategory(category, { limit = 12, skip = 0 } = {}) {
  return request(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
  )
}

export function getProductById(id) {
  return request(`/products/${id}`)
}

// ---------- Autenticación ----------

export function login(username, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  })
}

export function getCurrentUser(token) {
  return request('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
}
