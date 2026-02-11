import { NextResponse } from "next/server"
import { getEventRegistrations } from "@/lib/db-utils"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const eventId = searchParams.get("eventId") || undefined

        const registrations = await getEventRegistrations(eventId)
        return NextResponse.json({ registrations })
    } catch (error) {
        console.error("[Event Registrations API] Error fetching registrations:", error)
        return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
    }
}
