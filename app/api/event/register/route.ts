import { NextResponse } from "next/server"
import { createEventRegistration } from "@/lib/db-utils"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        if (!body.eventId || !body.fullName || !body.contact || !body.email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const result = await createEventRegistration(body)
        return NextResponse.json({ success: true, id: result.insertedId })
    } catch (error) {
        console.error("[Event Register API] Error registering for event:", error)
        return NextResponse.json({ error: "Failed to register for event" }, { status: 500 })
    }
}
