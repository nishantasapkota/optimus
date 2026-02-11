import { getStats, getRecentActivities, getUsers } from "@/lib/db-utils"
import { StatCard } from "@/components/stat-card"
import { RecentActivity } from "@/components/recent-activity"
import { UserGrowthChart } from "@/components/user-growth-chart"
import { RevenueChart } from "@/components/revenue-chart"
import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  // Fetch data from MongoDB
  const stats = await getStats()
  const activities = await getRecentActivities(5)
  const users = await getUsers(5)

  // Enrich activities with user data
  const enrichedActivities = await Promise.all(
    activities.map(async (activity) => {
      const user = users.find((u) => u._id?.toString() === activity.userId.toString())
      return {
        ...activity,
        _id: activity._id?.toString() || "",
        userId: {
          name: user?.name || "Unknown User",
          email: user?.email || "",
        },
        timestamp: activity.timestamp,
      }
    }),
  )

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          change="+8% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change="+23% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change="-4% from last month"
          changeType="negative"
          icon={ShoppingCart}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <UserGrowthChart />
        <RevenueChart />
      </div>

      {/* Recent activity */}
      <RecentActivity activities={enrichedActivities} />
    </div>
  )
}
