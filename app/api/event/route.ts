import { NextResponse } from "next/server"
import { getEvent, upsertEvent } from "@/lib/db-utils"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
    try {
        const event = await getEvent()
        return NextResponse.json({ event })
    } catch (error) {
        console.error("[Event API] Error fetching event:", error)
        return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const unauthorized = await requireAdmin()
        if (unauthorized) return unauthorized

        const body = await request.json()
        const result = await upsertEvent(body)
        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("[Event API] Error upserting event:", error)
        return NextResponse.json({ error: "Failed to save event" }, { status: 500 })
    }
}
