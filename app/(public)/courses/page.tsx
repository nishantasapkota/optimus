"use client"

import { PageHero } from "@/components/public/page-hero"
import { Courses } from "@/components/public/courses"
import { CtaJourney } from "@/components/public/cta-journey"

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-0 bg-white min-h-screen">
      <PageHero
        title="Courses"
        description="Explore academic pathways tailored to your interests, career goals, and global ambitions."
        breadcrumbItems={[{ label: "Courses" }]}
      />
      <Courses />
      <CtaJourney />
    </div>
  )
}
