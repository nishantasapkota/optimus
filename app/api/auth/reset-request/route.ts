import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import * as bcrypt from "bcryptjs"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ success: true })

    const db = await getDatabase()

    // find user or admin by email
    const user = await db.collection("users").findOne({ email })
    const admin = await db.collection("admins").findOne({ email })

    // don't reveal whether an account exists
    if (!user && !admin) return NextResponse.json({ success: true })

    const token = crypto.randomBytes(24).toString("hex")
    const tokenHash = await bcrypt.hash(token, 10)
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

    await db.collection("password_resets").insertOne({
      email,
      tokenHash,
      expiresAt,
      createdAt: new Date(),
    })

    // NOTE: in production, send this token via email. For dev, return the token in the response.
    return NextResponse.json({ success: true, token })
  } catch (error) {
    console.error("[v0] Reset request error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
