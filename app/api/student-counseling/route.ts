import { NextResponse } from "next/server"
import { getStudentCounselings, createStudentCounseling } from "@/lib/db-utils"

export async function GET() {
    try {
        const counselings = await getStudentCounselings(100)
        return NextResponse.json({ counselings })
    } catch (error) {
        console.error("Error fetching student counselings:", error)
        return NextResponse.json({ error: "Failed to fetch student counselings" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Set default status
        const counselingData = {
            ...body,
            status: "pending" as const
        }

        const result = await createStudentCounseling(counselingData)
        return NextResponse.json({ success: true, id: result.insertedId })
    } catch (error) {
        console.error("Error creating student counseling:", error)
        return NextResponse.json({ error: "Failed to create student counseling" }, { status: 500 })
    }
}
