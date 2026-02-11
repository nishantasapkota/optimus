import { DetailLayout } from "@/components/public/detail-layout"
import { getBlogBySlug, getBlogs } from "@/lib/db-utils"
import { notFound } from "next/navigation"
import Image from "next/image"

export const dynamic = 'force-dynamic'

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  
  let blog = null
  let recentBlogs: any[] = []
  
  try {
    blog = await getBlogBySlug(slug)
  } catch (error) {
    console.error("Failed to fetch blog:", error)
    notFound()
  }

  if (!blog) {
    notFound()
  }

  // Fetch recent blogs for the sidebar
  try {
    recentBlogs = await getBlogs(5)
  } catch (error) {
    console.error("Failed to fetch blogs for sidebar:", error)
  }
  
  const sidebarItems = recentBlogs
    .filter(b => b.slug !== slug)
    .map(b => ({
      title: b.title,
      href: `/blogs/${b.slug}`,
      active: false
    }))

  return (
    <DetailLayout
      title={blog.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Blogs", href: "#" }, // Assuming no dedicated blogs listing page yet, or point to home
        { label: blog.title }
      ]}
      sidebarTitle="Recent Posts"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-8">
        {blog.featuredImage && (
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>By {blog.author}</span>
          </div>

          <div 
            className="text-gray-600 prose prose-lg max-w-none prose-headings:text-blue-900 prose-a:text-red-600"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DetailLayout>
  )
}
