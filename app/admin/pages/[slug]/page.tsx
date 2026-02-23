"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import {
  aboutDefaultContent,
  homeDefaultContent,
  mergeAboutContent,
  mergeHomeContent,
  type AboutPageContent,
  type HomePageContent,
} from "@/lib/page-content"

const pageConfig = {
  home: {
    label: "Home",
    defaultContent: homeDefaultContent,
    merge: mergeHomeContent,
  },
  about: {
    label: "About",
    defaultContent: aboutDefaultContent,
    merge: mergeAboutContent,
  },
} as const

type PageSlug = keyof typeof pageConfig

type PageContentState = HomePageContent | AboutPageContent

export default function PageContentEditor() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const config = useMemo(() => pageConfig[slug as PageSlug], [slug])

  const [content, setContent] = useState<PageContentState | null>(config?.defaultContent ?? null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const cloneDeep = <T,>(value: T): T => {
    if (typeof structuredClone === "function") {
      return structuredClone(value)
    }
    return JSON.parse(JSON.stringify(value)) as T
  }

  useEffect(() => {
    if (!config) {
      setLoading(false)
      return
    }

    setContent(config.defaultContent)
    setLoading(true)

    fetch(`/api/pages/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        const merged = config.merge(data?.content ?? undefined) as PageContentState
        setContent(merged)
      })
      .catch(() => {
        toast.error("Failed to load page content")
      })
      .finally(() => setLoading(false))
  }, [slug, config])

  const updateField = (path: Array<string | number>, value: string) => {
    setContent((prev) => {
      if (!prev) return prev
      const next = cloneDeep(prev) as any
      let cursor: any = next
      for (let i = 0; i < path.length - 1; i += 1) {
        cursor = cursor[path[i]]
      }
      cursor[path[path.length - 1]] = value
      return next
    })
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!config || !content) return

    setSaving(true)
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      if (res.ok) {
        toast.success(`${config.label} page updated successfully`)
      } else {
        toast.error("Failed to update page")
      }
    } catch (error) {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  if (!config) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold">Page not found</h1>
      </div>
    )
  }

  if (loading || !content) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const homeContent = content as HomePageContent
  const aboutContent = content as AboutPageContent

  return (
    <div className="space-y-8 p-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{config.label} Page</h1>
        <p className="text-muted-foreground mt-1">Update static content for the {config.label.toLowerCase()} page.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {slug === "home" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Hero</CardTitle>
                <CardDescription>Primary headline and call-to-action.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Badge</label>
                    <Input
                      value={homeContent.hero.badge}
                      onChange={(e) => updateField(["hero", "badge"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CTA Button Label</label>
                    <Input
                      value={homeContent.hero.ctaLabel}
                      onChange={(e) => updateField(["hero", "ctaLabel"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Prefix</label>
                    <Input
                      value={homeContent.hero.titlePrefix}
                      onChange={(e) => updateField(["hero", "titlePrefix"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Highlight</label>
                    <Input
                      value={homeContent.hero.titleHighlight}
                      onChange={(e) => updateField(["hero", "titleHighlight"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Suffix</label>
                    <Input
                      value={homeContent.hero.titleSuffix}
                      onChange={(e) => updateField(["hero", "titleSuffix"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.hero.description}
                    onChange={(e) => updateField(["hero", "description"], e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {homeContent.hero.floatingStats.map((stat, index) => (
                    <div key={index} className="space-y-3 rounded-xl border border-slate-200 p-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Floating Stat {index + 1} Value</label>
                        <Input
                          value={stat.value}
                          onChange={(e) => updateField(["hero", "floatingStats", index, "value"], e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Label Top</label>
                        <Input
                          value={stat.labelTop}
                          onChange={(e) => updateField(["hero", "floatingStats", index, "labelTop"], e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Label Bottom</label>
                        <Input
                          value={stat.labelBottom}
                          onChange={(e) => updateField(["hero", "floatingStats", index, "labelBottom"], e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats Bar</CardTitle>
                <CardDescription>Quick highlights shown below the hero.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {homeContent.statsBar.items.map((stat, index) => (
                  <div key={index} className="space-y-2 rounded-xl border border-slate-200 p-4">
                    <label className="text-sm font-medium">Stat {index + 1} Value</label>
                    <Input
                      value={stat.value}
                      onChange={(e) => updateField(["statsBar", "items", index, "value"], e.target.value)}
                    />
                    <label className="text-sm font-medium">Stat {index + 1} Label</label>
                    <Input
                      value={stat.label}
                      onChange={(e) => updateField(["statsBar", "items", index, "label"], e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Destinations</CardTitle>
                <CardDescription>Section heading and featured destinations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={homeContent.destinations.eyebrow}
                      onChange={(e) => updateField(["destinations", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={homeContent.destinations.title}
                      onChange={(e) => updateField(["destinations", "title"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">View All Label</label>
                  <Input
                    value={homeContent.destinations.viewAllLabel}
                    onChange={(e) => updateField(["destinations", "viewAllLabel"], e.target.value)}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {homeContent.destinations.items.map((item, index) => (
                    <div key={index} className="space-y-2 rounded-xl border border-slate-200 p-4">
                      <label className="text-sm font-medium">Destination {index + 1} Name</label>
                      <Input
                        value={item.name}
                        onChange={(e) => updateField(["destinations", "items", index, "name"], e.target.value)}
                      />
                      <label className="text-sm font-medium">Destination {index + 1} Image</label>
                      <Input
                        value={item.image}
                        onChange={(e) => updateField(["destinations", "items", index, "image"], e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultancy Section</CardTitle>
                <CardDescription>Intro copy and stats for the consultancy block.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={homeContent.consultancy.eyebrow}
                      onChange={(e) => updateField(["consultancy", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={homeContent.consultancy.title}
                      onChange={(e) => updateField(["consultancy", "title"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.consultancy.description}
                    onChange={(e) => updateField(["consultancy", "description"], e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {homeContent.consultancy.stats.map((stat, index) => (
                    <div key={index} className="space-y-2 rounded-xl border border-slate-200 p-4">
                      <label className="text-sm font-medium">Stat {index + 1} Value</label>
                      <Input
                        value={stat.value}
                        onChange={(e) => updateField(["consultancy", "stats", index, "value"], e.target.value)}
                      />
                      <label className="text-sm font-medium">Stat {index + 1} Label</label>
                      <Input
                        value={stat.label}
                        onChange={(e) => updateField(["consultancy", "stats", index, "label"], e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Form Title</label>
                    <Input
                      value={homeContent.consultancy.formTitle}
                      onChange={(e) => updateField(["consultancy", "formTitle"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Form Button Label</label>
                    <Input
                      value={homeContent.consultancy.formButtonLabel}
                      onChange={(e) => updateField(["consultancy", "formButtonLabel"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Form Description</label>
                  <Textarea
                    value={homeContent.consultancy.formDescription}
                    onChange={(e) => updateField(["consultancy", "formDescription"], e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Middle CTA</CardTitle>
                <CardDescription>Centered CTA section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={homeContent.middleCta.eyebrow}
                      onChange={(e) => updateField(["middleCta", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={homeContent.middleCta.title}
                      onChange={(e) => updateField(["middleCta", "title"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.middleCta.description}
                    onChange={(e) => updateField(["middleCta", "description"], e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary CTA Label</label>
                    <Input
                      value={homeContent.middleCta.primaryCtaLabel}
                      onChange={(e) => updateField(["middleCta", "primaryCtaLabel"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Secondary CTA Label</label>
                    <Input
                      value={homeContent.middleCta.secondaryCtaLabel}
                      onChange={(e) => updateField(["middleCta", "secondaryCtaLabel"], e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>Services cards content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={homeContent.features.eyebrow}
                      onChange={(e) => updateField(["features", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={homeContent.features.title}
                      onChange={(e) => updateField(["features", "title"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.features.description}
                    onChange={(e) => updateField(["features", "description"], e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {homeContent.features.items.map((item, index) => (
                    <div key={index} className="space-y-2 rounded-xl border border-slate-200 p-4">
                      <label className="text-sm font-medium">Service {index + 1} Title</label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateField(["features", "items", index, "title"], e.target.value)}
                      />
                      <label className="text-sm font-medium">Service {index + 1} Description</label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateField(["features", "items", index, "description"], e.target.value)}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blog Section</CardTitle>
                <CardDescription>Heading above the latest blog posts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={homeContent.blog.eyebrow}
                      onChange={(e) => updateField(["blog", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={homeContent.blog.title}
                      onChange={(e) => updateField(["blog", "title"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.blog.description}
                    onChange={(e) => updateField(["blog", "description"], e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partners</CardTitle>
                <CardDescription>Partner universities section heading.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Prefix</label>
                    <Input
                      value={homeContent.partners.titlePrefix}
                      onChange={(e) => updateField(["partners", "titlePrefix"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Highlight</label>
                    <Input
                      value={homeContent.partners.titleHighlight}
                      onChange={(e) => updateField(["partners", "titleHighlight"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Suffix</label>
                    <Input
                      value={homeContent.partners.titleSuffix}
                      onChange={(e) => updateField(["partners", "titleSuffix"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.partners.description}
                    onChange={(e) => updateField(["partners", "description"], e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Testimonials</CardTitle>
                <CardDescription>Testimonial section header.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={homeContent.testimonials.eyebrow}
                      onChange={(e) => updateField(["testimonials", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Prefix</label>
                    <Input
                      value={homeContent.testimonials.titlePrefix}
                      onChange={(e) => updateField(["testimonials", "titlePrefix"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Highlight</label>
                    <Input
                      value={homeContent.testimonials.titleHighlight}
                      onChange={(e) => updateField(["testimonials", "titleHighlight"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.testimonials.description}
                    onChange={(e) => updateField(["testimonials", "description"], e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
                <CardDescription>Contact section copy and button label.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={homeContent.contact.eyebrow}
                      onChange={(e) => updateField(["contact", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={homeContent.contact.title}
                      onChange={(e) => updateField(["contact", "title"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.contact.description}
                    onChange={(e) => updateField(["contact", "description"], e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Submit Label</label>
                    <Input
                      value={homeContent.contact.submitLabel}
                      onChange={(e) => updateField(["contact", "submitLabel"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Map Stat Label</label>
                    <Input
                      value={homeContent.contact.mapStatLabel}
                      onChange={(e) => updateField(["contact", "mapStatLabel"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Map Stat Value</label>
                    <Input
                      value={homeContent.contact.mapStatValue}
                      onChange={(e) => updateField(["contact", "mapStatValue"], e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTA Journey</CardTitle>
                <CardDescription>Final call-to-action section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={homeContent.ctaJourney.title}
                    onChange={(e) => updateField(["ctaJourney", "title"], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={homeContent.ctaJourney.description}
                    onChange={(e) => updateField(["ctaJourney", "description"], e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Button Label</label>
                  <Input
                    value={homeContent.ctaJourney.buttonLabel}
                    onChange={(e) => updateField(["ctaJourney", "buttonLabel"], e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {slug === "about" && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Hero</CardTitle>
                <CardDescription>Hero heading and summary.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Badge</label>
                  <Input
                    value={aboutContent.hero.badge}
                    onChange={(e) => updateField(["hero", "badge"], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={aboutContent.hero.title}
                    onChange={(e) => updateField(["hero", "title"], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={aboutContent.hero.description}
                    onChange={(e) => updateField(["hero", "description"], e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who We Are</CardTitle>
                <CardDescription>Intro section copy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={aboutContent.whoWeAre.eyebrow}
                      onChange={(e) => updateField(["whoWeAre", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Primary</label>
                    <Input
                      value={aboutContent.whoWeAre.titlePrimary}
                      onChange={(e) => updateField(["whoWeAre", "titlePrimary"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title Accent</label>
                    <Input
                      value={aboutContent.whoWeAre.titleAccent}
                      onChange={(e) => updateField(["whoWeAre", "titleAccent"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={aboutContent.whoWeAre.description}
                    onChange={(e) => updateField(["whoWeAre", "description"], e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {aboutContent.whoWeAre.tags.map((tag, index) => (
                    <div key={index} className="space-y-2">
                      <label className="text-sm font-medium">Tag {index + 1}</label>
                      <Input
                        value={tag}
                        onChange={(e) => updateField(["whoWeAre", "tags", index], e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Promise Title</label>
                    <Input
                      value={aboutContent.whoWeAre.promiseTitle}
                      onChange={(e) => updateField(["whoWeAre", "promiseTitle"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Promise Text</label>
                    <Input
                      value={aboutContent.whoWeAre.promiseText}
                      onChange={(e) => updateField(["whoWeAre", "promiseText"], e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Story</CardTitle>
                <CardDescription>Story and focus blocks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={aboutContent.story.eyebrow}
                      onChange={(e) => updateField(["story", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={aboutContent.story.title}
                      onChange={(e) => updateField(["story", "title"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Focus Label</label>
                    <Input
                      value={aboutContent.story.focusLabel}
                      onChange={(e) => updateField(["story", "focusLabel"], e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Focus Text</label>
                  <Textarea
                    value={aboutContent.story.focusText}
                    onChange={(e) => updateField(["story", "focusText"], e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {aboutContent.story.paragraphs.map((paragraph, index) => (
                    <div key={index} className="space-y-2">
                      <label className="text-sm font-medium">Paragraph {index + 1}</label>
                      <Textarea
                        value={paragraph}
                        onChange={(e) => updateField(["story", "paragraphs", index], e.target.value)}
                        rows={4}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Section</CardTitle>
                <CardDescription>Overlay heading on the media block.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Eyebrow</label>
                  <Input
                    value={aboutContent.video.eyebrow}
                    onChange={(e) => updateField(["video", "eyebrow"], e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={aboutContent.video.title}
                    onChange={(e) => updateField(["video", "title"], e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mission, Values, Vision</CardTitle>
                <CardDescription>Three column values section.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                {aboutContent.mission.items.map((item, index) => (
                  <div key={index} className="space-y-2 rounded-xl border border-slate-200 p-4">
                    <label className="text-sm font-medium">Card {index + 1} Title</label>
                    <Input
                      value={item.title}
                      onChange={(e) => updateField(["mission", "items", index, "title"], e.target.value)}
                    />
                    <label className="text-sm font-medium">Card {index + 1} Description</label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateField(["mission", "items", index, "description"], e.target.value)}
                      rows={4}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Section</CardTitle>
                <CardDescription>Leadership heading and intro copy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Eyebrow</label>
                    <Input
                      value={aboutContent.team.eyebrow}
                      onChange={(e) => updateField(["team", "eyebrow"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={aboutContent.team.title}
                      onChange={(e) => updateField(["team", "title"], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      value={aboutContent.team.description}
                      onChange={(e) => updateField(["team", "description"], e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
