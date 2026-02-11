import { NextResponse } from "next/server"
import { getUsers, createUser } from "@/lib/db-utils"
import { cookies } from "next/headers"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const users = await getUsers(100)

    return NextResponse.json({
      users: users.map((user) => ({
        ...user,
        _id: user._id?.toString(),
      })),
    })
  } catch (error) {
    console.error("[v0] Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Only admin can create users
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // ensure admin exists
    const db = await getDatabase()
    const admin = await db.collection("admins").findOne({ _id: new ObjectId(adminSession) })
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const userData = await request.json()

    // Disallow creating a user with role 'admin' in the users collection
    if (userData.role === 'admin') {
      return NextResponse.json({ error: 'Creating admin users in the users collection is not allowed' }, { status: 403 })
    }

    // Enforce password on create
    if (!userData.password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    // Remove any client-only fields
    delete userData.confirmPassword

    const result = await createUser(userData)

    return NextResponse.json({ success: true, userId: result.insertedId })
  } catch (error) {
    console.error("[v0] Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
