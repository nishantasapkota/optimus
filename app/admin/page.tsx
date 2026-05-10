import Link from "next/link"
import {
  BookOpen,
  CalendarClock,
  FileText,
  GraduationCap,
  Handshake,
  MessageSquareText,
  Newspaper,
  Users,
} from "lucide-react"
import { getDatabase } from "@/lib/mongodb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/stat-card"

export const dynamic = "force-dynamic"

type StatusCount = {
  _id: string | null
  count: number
}

type RecentLead = {
  _id: string
  name: string
  email?: string
  detail?: string
  status?: string
  createdAt?: Date | string
}

type ChartItem = {
  label: string
  value: number
  href?: string
}

function formatDate(value?: Date | string) {
  if (!value) return "No date"

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

function normalizeStatus(status?: string | null) {
  return status ? status.replace(/-/g, " ") : "unknown"
}

function toRecentLead(doc: any, detailKeys: string[]): RecentLead {
  const detail = detailKeys.map((key) => doc[key]).find(Boolean)

  return {
    _id: doc._id?.toString() ?? "",
    name: doc.fullName || doc.name || "Unnamed lead",
    email: doc.email,
    detail,
    status: doc.status,
    createdAt: doc.createdAt,
  }
}

async function countByStatus(collection: string) {
  const db = await getDatabase()
  return db
    .collection(collection)
    .aggregate<StatusCount>([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])
    .toArray()
}

async function getDashboardData() {
  const db = await getDatabase()

  const [
    totalUsers,
    activeUsers,
    totalAppointments,
    pendingAppointments,
    totalCounseling,
    pendingCounseling,
    totalApplications,
    pendingApplications,
    totalBlogs,
    publishedBlogs,
    totalServices,
    activeServices,
    totalCourses,
    activeCourses,
    testimonials,
    partners,
    recentAppointments,
    recentCounseling,
    recentApplications,
    appointmentStatuses,
    counselingStatuses,
    applicationStatuses,
  ] = await Promise.all([
    db.collection("users").countDocuments(),
    db.collection("users").countDocuments({ status: "active" }),
    db.collection("appointments").countDocuments(),
    db.collection("appointments").countDocuments({ status: "pending" }),
    db.collection("student_counseling").countDocuments(),
    db.collection("student_counseling").countDocuments({ status: "pending" }),
    db.collection("online_applications").countDocuments(),
    db.collection("online_applications").countDocuments({ status: "pending" }),
    db.collection("blogs").countDocuments(),
    db.collection("blogs").countDocuments({ status: "published" }),
    db.collection("services").countDocuments(),
    db.collection("services").countDocuments({ status: "active" }),
    db.collection("courses").countDocuments(),
    db.collection("courses").countDocuments({ status: "active" }),
    db.collection("testimonials").countDocuments(),
    db.collection("partners").countDocuments(),
    db.collection("appointments").find({}).sort({ createdAt: -1 }).limit(5).toArray(),
    db.collection("student_counseling").find({}).sort({ createdAt: -1 }).limit(5).toArray(),
    db.collection("online_applications").find({}).sort({ createdAt: -1 }).limit(5).toArray(),
    countByStatus("appointments"),
    countByStatus("student_counseling"),
    countByStatus("online_applications"),
  ])

  return {
    totals: {
      totalUsers,
      activeUsers,
      totalAppointments,
      pendingAppointments,
      totalCounseling,
      pendingCounseling,
      totalApplications,
      pendingApplications,
      totalBlogs,
      publishedBlogs,
      totalServices,
      activeServices,
      totalCourses,
      activeCourses,
      testimonials,
      partners,
    },
    recent: {
      appointments: recentAppointments.map((doc) => toRecentLead(doc, ["service", "preferredDate"])),
      counseling: recentCounseling.map((doc) => toRecentLead(doc, ["interestedCourse", "interestedCountry"])),
      applications: recentApplications.map((doc) => toRecentLead(doc, ["interestedCourse", "interestedCountry"])),
    },
    statuses: {
      appointments: appointmentStatuses,
      counseling: counselingStatuses,
      applications: applicationStatuses,
    },
  }
}

function StatusBreakdown({ title, items }: { title: string; items: StatusCount[] }) {
  const total = items.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>Current status distribution</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No records yet.</p>
        ) : (
          items.map((item) => (
            <div key={item._id ?? "unknown"} className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium capitalize text-foreground">{normalizeStatus(item._id)}</span>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${total ? Math.max((item.count / total) * 100, 4) : 0}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

function OverviewChart({ title, description, items }: { title: string; description: string; items: ChartItem[] }) {
  const max = Math.max(...items.map((item) => item.value), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const row = (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-foreground">{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.max((item.value / max) * 100, item.value > 0 ? 5 : 0)}%` }}
                />
              </div>
            </div>
          )

          return item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {row}
            </Link>
          ) : (
            <div key={item.label}>{row}</div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function RecentList({
  title,
  description,
  href,
  items,
}: {
  title: string
  description: string
  href: string
  items: RecentLead[]
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Link href={href}>
          <Button variant="outline" size="sm">View all</Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing to review yet.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                  {item.email && <p className="truncate text-xs text-muted-foreground">{item.email}</p>}
                </div>
                {item.status && (
                  <Badge variant="outline" className="capitalize">
                    {normalizeStatus(item.status)}
                  </Badge>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span className="truncate">{item.detail || "No detail provided"}</span>
                <span className="shrink-0">{formatDate(item.createdAt)}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default async function AdminDashboard() {
  const { totals, recent, statuses } = await getDashboardData()
  const pendingWork = totals.pendingAppointments + totals.pendingCounseling + totals.pendingApplications

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            A live overview of leads, applications, content, and site activity.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Pending work</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{pendingWork}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Appointments"
          value={totals.totalAppointments}
          description={`${totals.pendingAppointments} pending review`}
          icon={CalendarClock}
          href="/admin/appointments"
        />
        <StatCard
          title="Counselling Forms"
          value={totals.totalCounseling}
          description={`${totals.pendingCounseling} pending follow-up`}
          icon={MessageSquareText}
          href="/admin/student-counseling"
        />
        <StatCard
          title="Online Applications"
          value={totals.totalApplications}
          description={`${totals.pendingApplications} pending review`}
          icon={FileText}
          href="/admin/online-application"
        />
        <StatCard
          title="Users"
          value={totals.totalUsers}
          description={`${totals.activeUsers} active accounts`}
          icon={Users}
          href="/admin/users"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Blogs"
          value={totals.totalBlogs}
          description={`${totals.publishedBlogs} published`}
          icon={Newspaper}
          href="/admin/blogs"
        />
        <StatCard
          title="Services"
          value={totals.totalServices}
          description={`${totals.activeServices} active`}
          icon={BookOpen}
          href="/admin/services"
        />
        <StatCard
          title="Courses"
          value={totals.totalCourses}
          description={`${totals.activeCourses} active`}
          icon={GraduationCap}
          href="/admin/courses"
        />
        <StatCard
          title="Testimonials"
          value={totals.testimonials}
          description="Student success proof"
          icon={Users}
          href="/admin/testimonials"
        />
        <StatCard
          title="Partners"
          value={totals.partners}
          description="Active partner logos"
          icon={Handshake}
          href="/admin/partners"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <OverviewChart
          title="Lead Sources"
          description="Volume across enquiry and application channels"
          items={[
            { label: "Appointments", value: totals.totalAppointments, href: "/admin/appointments" },
            { label: "Counselling Forms", value: totals.totalCounseling, href: "/admin/student-counseling" },
            { label: "Online Applications", value: totals.totalApplications, href: "/admin/online-application" },
          ]}
        />
        <OverviewChart
          title="Content & Site Data"
          description="Manageable content currently available"
          items={[
            { label: "Blogs", value: totals.totalBlogs, href: "/admin/blogs" },
            { label: "Services", value: totals.totalServices, href: "/admin/services" },
            { label: "Courses", value: totals.totalCourses, href: "/admin/courses" },
            { label: "Testimonials", value: totals.testimonials, href: "/admin/testimonials" },
            { label: "Partners", value: totals.partners, href: "/admin/partners" },
          ]}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <StatusBreakdown title="Appointment Status" items={statuses.appointments} />
        <StatusBreakdown title="Counselling Status" items={statuses.counseling} />
        <StatusBreakdown title="Application Status" items={statuses.applications} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <RecentList
          title="Latest Appointments"
          description="Newest appointment requests"
          href="/admin/appointments"
          items={recent.appointments}
        />
        <RecentList
          title="Latest Counselling"
          description="Newest counselling submissions"
          href="/admin/student-counseling"
          items={recent.counseling}
        />
        <RecentList
          title="Latest Applications"
          description="Newest online applications"
          href="/admin/online-application"
          items={recent.applications}
        />
      </div>
    </div>
  )
}
