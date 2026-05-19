"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const pages = [
  {
    slug: "home",
    title: "Home",
    description: "Manage hero, sections, and call-to-actions on the home page.",
  },
  {
    slug: "about",
    title: "About",
    description: "Manage the About Us page story, mission, and leadership intro.",
  },
  {
    slug: "founder",
    title: "Founder",
    description: "Manage the founder profile page and the founder section reused on About.",
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    description: "Manage legal terms content with a rich text editor.",
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "Manage privacy policy content with a rich text editor.",
  },
]

export default function PagesAdminList() {
  return (
    <div className="space-y-8 p-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Pages</h1>
        <p className="text-muted-foreground mt-1">Edit static page content.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {pages.map((page) => (
          <Link key={page.slug} href={`/admin/pages/${page.slug}`}>
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm font-medium text-primary">Edit {page.title} page</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
