import { NextResponse } from "next/server"
import { getUsers, createUser } from "@/lib/db-utils"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
  try {
    const users = await getUsers(100)

    return NextResponse.json({
      users: users.map((user) => ({
        ...user,
        _id: user._id?.toString(),
        password: undefined,
      })),
    })
  } catch (error) {
    console.error("[v0] Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const unauthorized = await requireAdmin(["admin", "superadmin"])
    if (unauthorized) return unauthorized

    const userData = await request.json()

    // Disallow privileged admin roles in the users collection
    if (["admin", "superadmin"].includes(userData.role)) {
      return NextResponse.json({ error: "Creating admin users in the users collection is not allowed" }, { status: 403 })
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
