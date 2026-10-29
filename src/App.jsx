import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Detalle from './pages/Detalle'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import NotFound from './pages/NotFound'
import './styles/App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
