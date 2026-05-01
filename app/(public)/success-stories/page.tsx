import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, GraduationCap, MapPin, Quote, Star, Trophy } from "lucide-react"
import { PageHero } from "@/components/public/page-hero"
import { CtaJourney } from "@/components/public/cta-journey"
import { Button } from "@/components/ui/button"
import { getTestimonials, type Testimonial } from "@/lib/db-utils"

export const dynamic = "force-dynamic"

type Story = {
  _id: string
  name: string
  designation: string
  description: string
  image: string
}

const fallbackStories: Story[] = [
  {
    _id: "fallback-1",
    name: "Aarav Sharma",
    designation: "Master's student, Australia",
    description:
      "Optimus Global helped me shortlist universities, prepare documents, and walk into my interview with confidence. The process felt clear from the first counselling session.",
    image: "/placeholder-user.jpg",
  },
  {
    _id: "fallback-2",
    name: "Sneha Gurung",
    designation: "Bachelor's student, Canada",
    description:
      "The team guided my SOP, scholarship planning, and visa file step by step. I always knew what was pending and what to prepare next.",
    image: "/placeholder-user.jpg",
  },
  {
    _id: "fallback-3",
    name: "Bikash Thapa",
    designation: "IELTS and admissions success",
    description:
      "From test preparation to final offer letter, their support made a complicated journey manageable. I recommend them to students who want honest guidance.",
    image: "/placeholder-user.jpg",
  },
]

const highlights = [
  { label: "Student-first counselling", value: "1:1", icon: GraduationCap },
  { label: "Destination guidance", value: "4+", icon: MapPin },
  { label: "Application support", value: "End-to-end", icon: CheckCircle2 },
  { label: "Trusted outcomes", value: "Proven", icon: Trophy },
]

const journeySteps = [
  "Profile assessment and destination matching",
  "University, course, and scholarship shortlisting",
  "SOP, documentation, and application review",
  "Interview, visa, and pre-departure preparation",
]

function serializeStory(story: Testimonial): Story {
  return {
    _id: story._id?.toString() ?? story.name,
    name: story.name,
    designation: story.designation,
    description: story.description,
    image: story.image || "/placeholder-user.jpg",
  }
}

export default async function SuccessStoriesPage() {
  let stories = fallbackStories

  try {
    const testimonials = await getTestimonials()
    if (testimonials.length > 0) {
      stories = testimonials.map(serializeStory)
    }
  } catch (error) {
    console.error("Failed to fetch success stories:", error)
  }

  const featuredStory = stories[0]
  const storyGrid = stories.slice(0, 9)

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <PageHero
        badge="Student Success Stories"
        title={
          <>
            Real journeys. <br />
            <span className="bg-gradient-to-r from-red-500 to-rose-300 bg-clip-text text-transparent">
              Global outcomes.
            </span>
          </>
        }
        description="Meet students who turned careful planning, strong applications, and steady guidance into admission and study abroad milestones."
        breadcrumbItems={[{ label: "Success Stories" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-red-600">Why It Matters</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-blue-950 md:text-4xl">
                Every result starts with a student, a plan, and the right support.
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-slate-600 md:text-lg">
                These stories reflect the counselling, documentation, test preparation, and visa support
                that help students move from uncertainty to a clear international education pathway.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Admissions", "Visa guidance", "Scholarships", "Pre-departure"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-blue-950">{value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-red-600">Featured Story</p>
              <h2 className="mt-4 text-3xl font-bold text-blue-950 md:text-4xl">Confidence built step by step.</h2>
            </div>
            <Link href="/online-consultation">
              <Button className="h-11 rounded-xl bg-blue-950 px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white hover:bg-red-600">
                Start Counselling <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="grid lg:grid-cols-[360px_1fr]">
              <div className="bg-blue-950 p-6 text-white">
                <div className="relative mx-auto aspect-[4/5] max-h-[360px] overflow-hidden rounded-xl bg-white/10">
                  <Image
                    src={featuredStory.image}
                    alt={featuredStory.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 312px, 80vw"
                  />
                </div>
                <div className="pt-5">
                  <p className="text-xl font-bold">{featuredStory.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                    {featuredStory.designation}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                <Quote className="h-9 w-9 text-red-600" />
                <p className="mt-6 max-w-3xl text-xl font-semibold leading-relaxed text-slate-800 md:text-2xl">
                  {featuredStory.description}
                </p>
                <div className="mt-6 flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-red-600">Student Voices</p>
            <h2 className="mt-4 text-3xl font-bold text-blue-950 md:text-4xl">More paths, more possibilities.</h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-600 md:text-lg">
              Browse the experiences of students who trusted Optimus Global through applications,
              counselling, test preparation, and visa readiness.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {storyGrid.map((story) => (
              <article
                key={story._id}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image src={story.image} alt={story.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-blue-950">{story.name}</h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      {story.designation}
                    </p>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  {story.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-950 py-16 text-white md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-red-300">The Optimus Method</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">A clearer journey from profile to departure.</h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-blue-100 md:text-lg">
                Success stories are built through practical milestones, transparent communication, and
                careful review at every stage of the study abroad process.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {journeySteps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-xs font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-5 text-base font-semibold leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaJourney />
    </div>
  )
}
