export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} ReactShop · Proyecto final React</p>
        <p>
          Datos de{' '}
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-indigo-600 hover:underline"
          >
            DummyJSON
          </a>
        </p>
      </div>
    </footer>
  )
}
