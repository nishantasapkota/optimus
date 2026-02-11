import { NextResponse } from "next/server"
import { getTestimonialById, updateTestimonial, deleteTestimonial } from "@/lib/db-utils"

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const testimonial = await getTestimonialById(id)
        if (!testimonial) {
            return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
        }
        return NextResponse.json({ testimonial })
    } catch (error) {
        console.error("[Testimonials API] Error fetching testimonial:", error)
        return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 })
    }
}

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const body = await request.json()
        const result = await updateTestimonial(id, body)
        return NextResponse.json({ success: true, modifiedCount: result.modifiedCount })
    } catch (error) {
        console.error("[Testimonials API] Error updating testimonial:", error)
        return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const result = await deleteTestimonial(id)
        return NextResponse.json({ success: true, deletedCount: result.deletedCount })
    } catch (error) {
        console.error("[Testimonials API] Error deleting testimonial:", error)
        return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
    }
}
