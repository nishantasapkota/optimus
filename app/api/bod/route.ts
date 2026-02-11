import { NextResponse } from "next/server"
import { getBODMembers } from "@/lib/db-utils"

export async function GET() {
    try {
        const members = await getBODMembers()
        return NextResponse.json({ members })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch BOD members" }, { status: 500 })
    }
}
