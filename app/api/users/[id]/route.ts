import { NextResponse } from "next/server"
import { updateUser, deleteUser } from "@/lib/db-utils"
import { cookies } from "next/headers"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // only admin
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const admin = await db.collection("admins").findOne({ _id: new ObjectId(adminSession) })
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const userData = await request.json()

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
    const { id } = await params

    // only admin
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const admin = await db.collection("admins").findOne({ _id: new ObjectId(adminSession) })
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await deleteUser(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
