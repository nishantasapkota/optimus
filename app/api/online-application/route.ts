import { NextResponse } from "next/server"
import { getOnlineApplications, createOnlineApplication } from "@/lib/db-utils"

export async function GET() {
    try {
        const applications = await getOnlineApplications(100)
        return NextResponse.json({ applications })
    } catch (error) {
        console.error("Error fetching online applications:", error)
        return NextResponse.json({ error: "Failed to fetch online applications" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Set default status
        const applicationData = {
            ...body,
            status: "pending" as const
        }

        const result = await createOnlineApplication(applicationData)
        return NextResponse.json({ success: true, id: result.insertedId })
    } catch (error) {
        console.error("Error creating online application:", error)
        return NextResponse.json({ error: "Failed to create online application" }, { status: 500 })
    }
}
