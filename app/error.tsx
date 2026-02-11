"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
        <p className="mt-2 text-gray-600">We apologize for the inconvenience.</p>
        <div className="mt-8">
          <Button onClick={() => reset()} className="bg-blue-900 hover:bg-blue-800">
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
