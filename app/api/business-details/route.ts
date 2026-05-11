import { NextResponse } from "next/server"
import { getBusinessDetails, updateBusinessDetails } from "@/lib/db-utils"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
    try {
        const details = await getBusinessDetails()
        return NextResponse.json({ details })
    } catch (error) {
        console.error("[Business Details API] Error fetching details:", error)
        return NextResponse.json({ error: "Failed to fetch business details" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const unauthorized = await requireAdmin()
        if (unauthorized) return unauthorized

        const body = await request.json()
        const result = await updateBusinessDetails(body)
        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("[Business Details API] Error updating details:", error)
        return NextResponse.json({ error: "Failed to update business details" }, { status: 500 })
    }
}
