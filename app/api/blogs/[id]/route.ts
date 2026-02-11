import { NextResponse } from "next/server"
import { getBlogById, updateBlog, deleteBlog } from "@/lib/db-utils"
import { cookies } from "next/headers"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const blog = await getBlogById(id)
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ blog })
  } catch (error) {
    console.error("[v0] Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await request.json()

    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    const userSession = cookieStore.get("user_session")?.value

    // If content_writer, ensure they cannot set status to published
    if (userSession && !adminSession) {
      const db = await getDatabase()
      const user = await db.collection("users").findOne({ _id: new ObjectId(userSession) })
      if (user && user.role === "content_writer") {
        // force draft status
        body.status = "draft"
      }
    }

    const result = await updateBlog(id, body)
    return NextResponse.json({ success: true, modified: result.modifiedCount })
  } catch (error) {
    console.error("[v0] Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    if (!adminSession) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const db = await getDatabase()
    const admin = await db.collection("admins").findOne({ _id: new ObjectId(adminSession) })
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const result = await deleteBlog(id)
    return NextResponse.json({ success: true, deleted: result.deletedCount })
  } catch (error) {
    console.error("[v0] Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
