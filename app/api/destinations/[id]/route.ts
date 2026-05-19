import { NextResponse } from "next/server"
import { deleteDestination, getDestinationById, updateDestination } from "@/lib/db-utils"
import { requireAdmin } from "@/lib/api-auth"

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const destination = await getDestinationById(id)
    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }
    return NextResponse.json({ destination })
  } catch (error) {
    console.error("[Destinations API] Error fetching destination:", error)
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 })
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAdmin()
    if (unauthorized) return unauthorized

    const { id } = await context.params
    const body = await request.json()
    const result = await updateDestination(id, body)
    return NextResponse.json({ success: true, modified: result.modifiedCount })
  } catch (error) {
    console.error("[Destinations API] Error updating destination:", error)
    return NextResponse.json({ error: "Failed to update destination" }, { status: 500 })
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAdmin()
    if (unauthorized) return unauthorized

    const { id } = await context.params
    const result = await deleteDestination(id)
    return NextResponse.json({ success: true, deleted: result.deletedCount })
  } catch (error) {
    console.error("[Destinations API] Error deleting destination:", error)
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 })
  }
}
