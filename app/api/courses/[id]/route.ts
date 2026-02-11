import { NextResponse } from "next/server"
import { getCourseById, updateCourse, deleteCourse } from "@/lib/db-utils"

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const course = await getCourseById(id)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }
    return NextResponse.json({ course })
  } catch (error) {
    console.error("[Courses API] Error fetching course:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const result = await updateCourse(id, body)
    return NextResponse.json({ success: true, modified: result.modifiedCount })
  } catch (error) {
    console.error("[Courses API] Error updating course:", error)
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const result = await deleteCourse(id)
    return NextResponse.json({ success: true, deleted: result.deletedCount })
  } catch (error) {
    console.error("[Courses API] Error deleting course:", error)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
