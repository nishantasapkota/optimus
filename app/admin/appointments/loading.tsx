export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
      <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-muted" />
      <div className="h-96 w-full animate-pulse rounded-lg bg-muted" />
    </div>
  )
}
