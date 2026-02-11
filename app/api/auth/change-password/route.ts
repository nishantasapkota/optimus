import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import * as bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json()
    if (!currentPassword || !newPassword) return NextResponse.json({ error: "Invalid" }, { status: 400 })

    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    const userSession = cookieStore.get("user_session")?.value

    const db = await getDatabase()

    // determine whether caller is admin or user
    if (adminSession) {
      const admin = await db.collection("admins").findOne({ _id: new ObjectId(adminSession) })
      if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

      const match = await bcrypt.compare(currentPassword, admin.password)
      if (!match) return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })

      const hashed = await bcrypt.hash(newPassword, 10)
      await db.collection("admins").updateOne({ _id: admin._id }, { $set: { password: hashed, mustChangePassword: false } })
      return NextResponse.json({ success: true })
    }

    if (userSession) {
      const user = await db.collection("users").findOne({ _id: new ObjectId(userSession) })
      if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

      const match = await bcrypt.compare(currentPassword, (user as any).password)
      if (!match) return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })

      const hashed = await bcrypt.hash(newPassword, 10)
      await db.collection("users").updateOne({ _id: user._id }, { $set: { password: hashed, mustChangePassword: false } })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  } catch (error) {
    console.error("[v0] change-password error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
