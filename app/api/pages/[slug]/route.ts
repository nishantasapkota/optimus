import { NextResponse } from "next/server"
import { getPageContent, upsertPageContent } from "@/lib/db-utils"

const allowedSlugs = new Set(["home", "about"])

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!allowedSlugs.has(slug)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 })
  }

  try {
    const page = await getPageContent(slug)
    return NextResponse.json({ content: page?.content ?? null })
  } catch (error) {
    console.error("[Pages API] Error fetching page:", error)
    return NextResponse.json({ error: "Failed to fetch page content" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!allowedSlugs.has(slug)) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 })
  }

  try {
    const body = await request.json()
    const content = body?.content
    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 })
    }

    const result = await upsertPageContent(slug, content)
    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("[Pages API] Error updating page:", error)
    return NextResponse.json({ error: "Failed to update page content" }, { status: 500 })
  }
}
