import { NextResponse } from "next/server"
import { updateUser, deleteUser } from "@/lib/db-utils"
import { requireAdmin } from "@/lib/api-auth"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAdmin(["admin", "superadmin"])
    if (unauthorized) return unauthorized

    const { id } = await params
    const userData = await request.json()

    if (["admin", "superadmin"].includes(userData.role)) {
      return NextResponse.json({ error: "Assigning admin roles in the users collection is not allowed" }, { status: 403 })
    }

    // Remove client-only fields
    delete (userData as any).confirmPassword

    await updateUser(id, userData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const unauthorized = await requireAdmin(["admin", "superadmin"])
    if (unauthorized) return unauthorized

    const { id } = await params

    await deleteUser(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
