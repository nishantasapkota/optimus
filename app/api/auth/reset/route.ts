import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import * as bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { token, email, password, force } = await request.json()
    if (!email || !password) return NextResponse.json({ error: "Invalid" }, { status: 400 })

    const db = await getDatabase()
    if (!force) {
      // Token-based reset flow
      if (!token) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
      const reset = await db.collection("password_resets").findOne({ email })
      if (!reset) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })

      const tokenHash = reset.tokenHash
      const match = await bcrypt.compare(token, tokenHash)
      if (!match || new Date(reset.expiresAt) < new Date()) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
      }
    }

    // update user or admin
    const hashed = await bcrypt.hash(password, 10)
    const userResult = await db.collection("users").updateOne({ email }, { $set: { password: hashed, mustChangePassword: false } })
    const adminResult = await db.collection("admins").updateOne({ email }, { $set: { password: hashed, mustChangePassword: false } })

    // remove used token if present
    await db.collection("password_resets").deleteMany({ email })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Reset error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
