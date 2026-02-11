import { NextResponse } from "next/server"
import { getPartners, createPartner, deletePartner } from "@/lib/db-utils"

export async function GET() {
    try {
        const partners = await getPartners()
        return NextResponse.json({ partners })
    } catch (error) {
        console.error("[Partners API] Error fetching partners:", error)
        return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const result = await createPartner(body)
        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error("[Partners API] Error creating partner:", error)
        return NextResponse.json({ error: "Failed to create partner" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })

        await deletePartner(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("[Partners API] Error deleting partner:", error)
        return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 })
    }
}
