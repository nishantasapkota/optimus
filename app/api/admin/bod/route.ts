import { NextRequest, NextResponse } from "next/server"
import { getBODMembers, createBODMember, updateBODMember, deleteBODMember } from "@/lib/db-utils"
import { cookies } from "next/headers"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

async function checkAuth() {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get("admin_session")?.value
    const userSession = cookieStore.get("user_session")?.value

    if (!adminSession && !userSession) return null

    const db = await getDatabase()
    if (adminSession) {
        const admin = await db.collection("admins").findOne({ _id: new ObjectId(adminSession) })
        if (admin) return { ...admin, role: admin.role || "admin" }
    }

    if (userSession) {
        const user = await db.collection("users").findOne({ _id: new ObjectId(userSession) })
        if (user) return user
    }

    return null
}

export async function GET() {
    const user = await checkAuth()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const members = await getBODMembers()
        return NextResponse.json({ members })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const user = await checkAuth()
    if (!user || !["admin", "superadmin", "moderator"].includes(user.role)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const memberData = await req.json()
        const result = await createBODMember(memberData)
        return NextResponse.json({ result })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create member" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    const user = await checkAuth()
    if (!user || !["admin", "superadmin", "moderator"].includes(user.role)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { id, ...memberData } = await req.json()
        const result = await updateBODMember(id, memberData)
        return NextResponse.json({ result })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update member" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const user = await checkAuth()
    // Only superadmin or admin can delete
    if (!user || !["admin", "superadmin"].includes(user.role)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })

        const result = await deleteBODMember(id)
        return NextResponse.json({ result })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete member" }, { status: 500 })
    }
}
