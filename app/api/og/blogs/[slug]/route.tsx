import { ImageResponse } from "next/og"
import { getBlogBySlug } from "@/lib/db-utils"
import { absoluteUrl, buildSeoDescription, cleanText, getSiteUrl, siteName, truncateText } from "@/lib/seo"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

interface BlogOpenGraphImageContext {
  params: Promise<{
    slug: string
  }>
}

export async function GET(_request: Request, { params }: BlogOpenGraphImageContext) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  const title = truncateText(cleanText(blog?.title, "Optimus Global Insights"), 92)
  const description = truncateText(buildSeoDescription(blog?.excerpt, blog?.content), 150)
  const featuredImage = blog?.featuredImage ? absoluteUrl(blog.featuredImage) : null
  const tags = blog?.tags?.slice(0, 3) ?? ["Study Abroad", "Education", "Guidance"]
  const displayUrl = `${getSiteUrl().replace(/^https?:\/\//, "")}/blogs/${slug}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #071839 0%, #0d2d66 46%, #dc2626 100%)",
          color: "white",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.16), transparent 28%), radial-gradient(circle at 80% 12%, rgba(255,255,255,0.12), transparent 26%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: featuredImage ? 690 : "100%",
            padding: "64px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "white",
                color: "#0f2f68",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              O
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>{siteName}</div>
              <div style={{ fontSize: 16, opacity: 0.78, textTransform: "uppercase", letterSpacing: 3 }}>
                Global Knowledge Hub
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 900, letterSpacing: -2 }}>{title}</div>
            <div style={{ fontSize: 25, lineHeight: 1.35, opacity: 0.86, maxWidth: 760 }}>{description}</div>
          </div>

          <div style={{ fontSize: 20, opacity: 0.82 }}>{displayUrl}</div>
        </div>

        {featuredImage && (
          <div
            style={{
              width: 510,
              height: "100%",
              padding: "48px 48px 48px 0",
              display: "flex",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 42,
                overflow: "hidden",
                border: "10px solid rgba(255,255,255,0.18)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
              }}
            >
              <img
                src={featuredImage}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        )}
      </div>
    ),
    size,
  )
}
