import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export default function MainLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <ScrollToTop />
      <Navbar />
      {/* key = pathname para repetir la animación al cambiar de página */}
      <main key={pathname} className="page-enter mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
