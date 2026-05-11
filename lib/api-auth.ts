import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { getDatabase } from "./mongodb"

const DEFAULT_ADMIN_ROLES = ["admin", "superadmin", "moderator", "content_writer"]

export async function getSessionUser(allowedRoles = DEFAULT_ADMIN_ROLES) {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")?.value
  const userSession = cookieStore.get("user_session")?.value

  if (!adminSession && !userSession) {
    return null
  }

  const db = await getDatabase()

  if (adminSession && ObjectId.isValid(adminSession)) {
    const admin = await db.collection<any>("admins").findOne({ _id: new ObjectId(adminSession) })
    if (admin && allowedRoles.includes(admin.role || "admin")) {
      return { ...admin, role: admin.role || "admin", sessionType: "admin" as const }
    }
  }

  if (userSession && ObjectId.isValid(userSession)) {
    const user = await db.collection<any>("users").findOne({ _id: new ObjectId(userSession) })
    if (user && allowedRoles.includes(user.role)) {
      return { ...user, sessionType: "user" as const }
    }
  }

  return null
}

export async function requireAdmin(allowedRoles = DEFAULT_ADMIN_ROLES) {
  const user = await getSessionUser(allowedRoles)
  if (user) {
    return null
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
