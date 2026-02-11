import { NextResponse } from "next/server"
import { getServices, getServicesCount, createService } from "@/lib/db-utils"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "6")
    const search = searchParams.get("search") || ""
    const skip = (page - 1) * limit

    const [services, total] = await Promise.all([
      getServices(limit, skip, search),
      getServicesCount(search)
    ])

    return NextResponse.json({
      services,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("[Services API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createService(body)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("[Services API] POST Error:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
