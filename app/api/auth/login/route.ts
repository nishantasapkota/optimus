import { NextResponse } from "next/server"
import { verifyAdmin, verifyUser } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // First try admin
    const admin = await verifyAdmin(email, password)

    const cookieStore = await cookies()

    if (admin) {
      cookieStore.set("admin_session", admin._id!.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({
        success: true,
        user: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          mustChangePassword: admin.mustChangePassword || false,
        },
      })
    }

    // Try regular users
    const user = await verifyUser(email, password)

    if (user) {
      // create a user_session cookie so middleware can detect login for non-admins if needed
      cookieStore.set("user_session", user._id!.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          mustChangePassword: (user as any).mustChangePassword || false,
        },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
