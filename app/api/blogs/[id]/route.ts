import { NextResponse } from "next/server"
import { getBlogById, updateBlog, deleteBlog } from "@/lib/db-utils"
import { getSessionUser, requireAdmin } from "@/lib/api-auth"

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
    const unauthorized = await requireAdmin()
    if (unauthorized) return unauthorized

    const { id } = await context.params
    const body = await request.json()
    const user = await getSessionUser()

    if (user?.sessionType === "user" && user.role === "content_writer") {
      body.status = "draft"
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
    const unauthorized = await requireAdmin()
    if (unauthorized) return unauthorized

    const { id } = await context.params

    const result = await deleteBlog(id)
    return NextResponse.json({ success: true, deleted: result.deletedCount })
  } catch (error) {
    console.error("[v0] Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
