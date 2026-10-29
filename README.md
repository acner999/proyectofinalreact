# ReactShop · Proyecto final React

SPA hecha con **React + Vite** que combina Hooks, React Router, consumo de una API REST y estilos con **TailwindCSS**. Los datos (productos y usuarios) vienen de la API pública [DummyJSON](https://dummyjson.com).

**Demo:** _(pegar acá la URL de Railway)_

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

## Deploy en Railway

El proyecto se despliega desde GitHub. Railway ejecuta `npm install`, `npm run build` y `npm start`; el script `start` sirve `dist/` con [`serve`](https://www.npmjs.com/package/serve) en el puerto `$PORT`. El flag `-s` devuelve `index.html` en cualquier ruta, así que recargar en `/productos` o `/detalle/5` funciona.

1. Entrar a [railway.com](https://railway.com) e iniciar sesión con GitHub.
2. **New Project → Deploy from GitHub repo** y elegir `acnergmm/proyectofinalreact`. La primera vez hay que darle acceso a la GitHub App de Railway sobre el repo.
3. Esperar a que termine el build (pestaña **Deployments**).
4. En el servicio: **Settings → Networking → Generate Domain**.
5. Abrir la URL generada.

Cada `git push` a `main` vuelve a desplegar automáticamente.
