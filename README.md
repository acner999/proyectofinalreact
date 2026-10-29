# ReactShop · Proyecto final React

SPA hecha con **React + Vite** que combina Hooks, React Router, consumo de una API REST y estilos con **TailwindCSS**. Los datos (productos y usuarios) vienen de la API pública [DummyJSON](https://dummyjson.com).

**Demo:** https://acner999.github.io/proyectofinalreact/

## Funcionalidades

| Ruta | Página | Qué muestra |
| --- | --- | --- |
| `/` | Home | Hero y los 8 productos mejor puntuados |
| `/productos` | Productos | Listado con búsqueda (con debounce), filtro por categoría y paginación |
| `/detalle/:id` | Detalle | Galería de imágenes, precio, stock, envío y opiniones |
| `/login` | Login | Formulario controlado contra `POST /auth/login` |
| `/perfil` | Perfil | **Ruta protegida**: datos del usuario desde `GET /auth/me` con el token |
| `*` | NotFound | Página 404 |

Usuario de prueba: **`emilys`** / **`emilyspass`**

## Conceptos aplicados

- **Hooks**: `useState` y `useEffect` en cada página; hooks propios en `src/hooks/`:
  - `useFetch(fn, deps)` → devuelve `{ data, loading, error, refetch }` e ignora respuestas viejas.
  - `useAuth()` → acceso al `AuthContext` (`user`, `token`, `isAuthenticated`, `login`, `logout`), con sesión guardada en `localStorage`.
- **React Router**: todas las rutas cuelgan de `MainLayout` (Navbar + `<Outlet />` + Footer); `useParams`, `useNavigate`, `NavLink` y `ProtectedRoute` con `<Navigate>`.
- **Consumo de API**: todas las peticiones están en `src/services/api.js`; cada página maneja estados de carga (`Loader`) y error (`ErrorMessage` con reintentar).
- **TailwindCSS v4**: clases utilitarias en el JSX, diseño responsive con menú móvil.

## Estructura

```
src/
├─ assets/        logo
├─ components/    Navbar, Footer, ProductCard, StarRating, Loader, ErrorMessage, ProtectedRoute, ScrollToTop
├─ context/       AuthContext
├─ hooks/         useFetch, useAuth
├─ layouts/       MainLayout
├─ pages/         Home, Productos, Detalle, Login, Perfil, NotFound
├─ services/      api.js
├─ styles/        index.css (Tailwind), App.css
├─ App.jsx        rutas
└─ main.jsx       BrowserRouter + AuthProvider
```

## Correr en local

Requisitos: Node 20 o superior.

```bash
npm install
npm run dev        # http://localhost:5173
```

Otros scripts:

```bash
npm run lint       # ESLint
npm run build      # build de producción en dist/
npm run preview    # sirve dist/ localmente
```

## Deploy en GitHub Pages

Cada `git push` a `main` dispara la GitHub Action [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que:

1. Instala dependencias y compila con `GITHUB_PAGES=true`, lo que hace que Vite use `base: '/proyectofinalreact/'` (ver `vite.config.js`). React Router toma esa misma base con `basename={import.meta.env.BASE_URL}`.
2. Copia `index.html` como `404.html`: GitHub Pages no conoce las rutas de la SPA, así que al recargar en `/detalle/5` sirve `404.html`, que es la misma app, y el Router muestra la página correcta.
3. Publica `dist/` en https://acner999.github.io/proyectofinalreact/.

El progreso se ve en la pestaña **Actions** del repositorio. En **Settings → Pages**, la fuente tiene que estar en **GitHub Actions**.
