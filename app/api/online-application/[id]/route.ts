import { NextResponse } from "next/server"
import { getOnlineApplicationById, updateOnlineApplication, deleteOnlineApplication } from "@/lib/db-utils"

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const application = await getOnlineApplicationById(id)

        if (!application) {
            return NextResponse.json({ error: "Online application not found" }, { status: 404 })
        }

        return NextResponse.json({ application })
    } catch (error) {
        console.error("Error fetching online application:", error)
        return NextResponse.json({ error: "Failed to fetch online application" }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const body = await request.json()

        const result = await updateOnlineApplication(id, body)

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Online application not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error updating online application:", error)
        return NextResponse.json({ error: "Failed to update online application" }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const result = await deleteOnlineApplication(id)

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Online application not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting online application:", error)
        return NextResponse.json({ error: "Failed to delete online application" }, { status: 500 })
    }
}
