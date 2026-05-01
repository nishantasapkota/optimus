import Link from "next/link"
import {
  BookOpen,
  CalendarClock,
  FileText,
  GraduationCap,
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
            <div key={item._id ?? "unknown"} className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium capitalize text-foreground">{normalizeStatus(item._id)}</span>
              <Badge variant="secondary">{item.count}</Badge>
            </div>
          ))
        )}
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
        />
        <StatCard
          title="Counselling Forms"
          value={totals.totalCounseling}
          description={`${totals.pendingCounseling} pending follow-up`}
          icon={MessageSquareText}
        />
        <StatCard
          title="Online Applications"
          value={totals.totalApplications}
          description={`${totals.pendingApplications} pending review`}
          icon={FileText}
        />
        <StatCard
          title="Users"
          value={totals.totalUsers}
          description={`${totals.activeUsers} active accounts`}
          icon={Users}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Blogs"
          value={totals.totalBlogs}
          description={`${totals.publishedBlogs} published`}
          icon={Newspaper}
        />
        <StatCard
          title="Services"
          value={totals.totalServices}
          description={`${totals.activeServices} active`}
          icon={BookOpen}
        />
        <StatCard
          title="Courses"
          value={totals.totalCourses}
          description={`${totals.activeCourses} active`}
          icon={GraduationCap}
        />
        <StatCard
          title="Proof Assets"
          value={totals.testimonials + totals.partners}
          description={`${totals.testimonials} testimonials, ${totals.partners} partners`}
          icon={Users}
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
