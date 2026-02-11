import { NextResponse } from "next/server"
import { getStudentCounselingById, updateStudentCounseling, deleteStudentCounseling } from "@/lib/db-utils"

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const counseling = await getStudentCounselingById(id)

        if (!counseling) {
            return NextResponse.json({ error: "Student counseling not found" }, { status: 404 })
        }

        return NextResponse.json({ counseling })
    } catch (error) {
        console.error("Error fetching student counseling:", error)
        return NextResponse.json({ error: "Failed to fetch student counseling" }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const body = await request.json()

        const result = await updateStudentCounseling(id, body)

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Student counseling not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error updating student counseling:", error)
        return NextResponse.json({ error: "Failed to update student counseling" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const result = await deleteStudentCounseling(id)

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Student counseling not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting student counseling:", error)
        return NextResponse.json({ error: "Failed to delete student counseling" }, { status: 500 })
    }
}
