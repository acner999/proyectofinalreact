export default function StarRating({ value }) {
  const rounded = Math.round(value)

  return (
    <span className="inline-flex items-center gap-1 text-sm" aria-label={`${value} de 5 estrellas`}>
      <span className="text-amber-400">
        {'★'.repeat(rounded)}
        <span className="text-slate-300">{'★'.repeat(5 - rounded)}</span>
      </span>
      <span className="text-slate-500">{value.toFixed(1)}</span>
    </span>
  )
}
