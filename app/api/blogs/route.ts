import { NextResponse } from "next/server"
import { getBlogs, getBlogsCount, createBlog } from "@/lib/db-utils"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "3")
    const search = searchParams.get("search") || ""
    const skip = (page - 1) * limit

    const [blogs, total] = await Promise.all([
      getBlogs(limit, skip, search),
      getBlogsCount(search)
    ])

    return NextResponse.json({
      blogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("[Blogs API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createBlog(body)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("[Blogs API] POST Error:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}

