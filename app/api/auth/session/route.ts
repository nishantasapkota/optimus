import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const cookieStore = await cookies()
    // Check admin session first
    const adminSessionId = cookieStore.get("admin_session")?.value
    if (adminSessionId) {
      const db = await getDatabase()
      const admin = await db.collection("admins").findOne({ _id: new ObjectId(adminSessionId) })
      if (admin) {
        return NextResponse.json({
          authenticated: true,
          user: { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
        })
      }
    }

    // Fallback: check user session
    const userSessionId = cookieStore.get("user_session")?.value
    if (userSessionId) {
      const db = await getDatabase()
      const user = await db.collection("users").findOne({ _id: new ObjectId(userSessionId) })
      if (user) {
        return NextResponse.json({ authenticated: true, user: { id: user._id, email: user.email, name: user.name, role: user.role } })
      }
    }

    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch (error) {
    console.error("[v0] Session check error:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
