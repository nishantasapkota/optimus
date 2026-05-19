import { NextResponse } from "next/server"
import { createDestination, getDestinations, getDestinationsCount } from "@/lib/db-utils"
import { requireAdmin } from "@/lib/api-auth"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "6")
    const search = searchParams.get("search") || ""
    const skip = (page - 1) * limit

    const [destinations, total] = await Promise.all([
      getDestinations(limit, skip, search),
      getDestinationsCount(search),
    ])

    return NextResponse.json({
      destinations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("[Destinations API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const unauthorized = await requireAdmin()
    if (unauthorized) return unauthorized

    const body = await request.json()
    const result = await createDestination(body)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("[Destinations API] POST Error:", error)
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 })
  }
}
