import { NextResponse } from "next/server"
import { getServiceById, updateService, deleteService } from "@/lib/db-utils"

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const service = await getServiceById(id)
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }
    return NextResponse.json({ service })
  } catch (error) {
    console.error("[v0] Error fetching service:", error)
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 })
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const result = await updateService(id, body)
    return NextResponse.json({ success: true, modified: result.modifiedCount })
  } catch (error) {
    console.error("[v0] Error updating service:", error)
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 })
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const result = await deleteService(id)
    return NextResponse.json({ success: true, deleted: result.deletedCount })
  } catch (error) {
    console.error("[v0] Error deleting service:", error)
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
