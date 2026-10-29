import { useCallback, useEffect, useState } from 'react'

/**
 * Ejecuta una función async (normalmente un servicio de api.js) y expone
 * sus estados: data, loading y error. Se vuelve a ejecutar cuando cambian
 * las dependencias o al llamar a `refetch`.
 *
 * Ej: const { data, loading, error } = useFetch(() => getProductById(id), [id])
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    // Evita actualizar el estado si el componente se desmontó
    // o si llegó una respuesta vieja (race condition).
    let ignore = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await fetcher()
        if (!ignore) setData(result)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => {
      ignore = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  return { data, loading, error, refetch }
}
