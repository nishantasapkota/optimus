import { NextResponse } from "next/server"
import { getCourses, getCoursesCount, createCourse } from "@/lib/db-utils"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "6")
    const search = searchParams.get("search") || ""
    const skip = (page - 1) * limit

    const [courses, total] = await Promise.all([getCourses(limit, skip, search), getCoursesCount(search)])

    return NextResponse.json({
      courses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("[Courses API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createCourse(body)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("[Courses API] POST Error:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
