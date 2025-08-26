"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  DollarSign,
  Clock,
  Award,
  Copy,
  Share2,
  Link,
  CreditCard,
  UserPlus,
  CheckCircle,
  Calendar,
} from "lucide-react"
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const monthlyRevenueData = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 2800 },
  { month: "Mar", revenue: 4100 },
  { month: "Apr", revenue: 3600 },
  { month: "May", revenue: 4800 },
  { month: "Jun", revenue: 5200 },
]

const earningsData = [
  { month: "Jan", earnings: 2400, recruits: 12 },
  { month: "Feb", earnings: 1398, recruits: 8 },
  { month: "Mar", earnings: 9800, recruits: 25 },
  { month: "Apr", earnings: 3908, recruits: 18 },
  { month: "May", earnings: 4800, recruits: 22 },
  { month: "Jun", earnings: 3800, recruits: 15 },
  { month: "Jul", earnings: 4300, recruits: 19 },
  { month: "Aug", earnings: 5200, recruits: 24 },
  { month: "Sep", earnings: 4100, recruits: 17 },
  { month: "Oct", earnings: 6200, recruits: 28 },
  { month: "Nov", earnings: 5800, recruits: 26 },
  { month: "Dec", earnings: 7200, recruits: 32 },
]

const levelData = [
  { level: "Level 1", recruits: 25, required: 25, completed: true },
  { level: "Level 2", recruits: 50, required: 50, completed: true },
  { level: "Level 3", recruits: 89, required: 100, completed: false },
  { level: "Level 4", recruits: 0, required: 200, completed: false },
  { level: "Level 5", recruits: 0, required: 500, completed: false },
  { level: "Level 6", recruits: 0, required: 1000, completed: false },
  { level: "Level 7", recruits: 0, required: 2000, completed: false },
  { level: "Level 8", recruits: 0, required: 5000, completed: false },
  { level: "Level 9", recruits: 0, required: 10000, completed: false },
  { level: "Level 10", recruits: 0, required: 25000, completed: false },
]

const referralLinks = {
  marketer: "https://myapp.com/join/marketer/johndoe123",
  shopper: "https://myapp.com/shop/ref/johndoe123",
}

const initialTasks = [
  { id: 1, text: "Share your referral link", completed: true },
  { id: 2, text: "Recruit 3 members this week", completed: false },
  { id: 3, text: "Update your profile", completed: false },
  { id: 4, text: "Complete training module", completed: true },
  { id: 5, text: "Set up payment method", completed: false },
]

const recentActivity = [
  { id: 1, text: "John Doe joined your team", date: "Aug 20, 2025", icon: UserPlus },
  { id: 2, text: "Commission payout requested", date: "Aug 21, 2025", icon: CreditCard },
  { id: 3, text: "Level 2 achievement unlocked", date: "Aug 19, 2025", icon: Award },
  { id: 4, text: "Sarah Smith made a purchase", date: "Aug 18, 2025", icon: DollarSign },
  { id: 5, text: "New team member activated", date: "Aug 17, 2025", icon: Users },
]

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--chart-1))",
  },
  recruits: {
    label: "Recruits",
    color: "hsl(var(--chart-2))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
}

export function OverviewSection() {
  const [tasks, setTasks] = useState(initialTasks)
  const [taskListExpanded, setTaskListExpanded] = useState(true)

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you'd show a toast notification here
  }

  const getCurrentLevel = () => {
    const completedLevels = levelData.filter((level) => level.completed).length
    return completedLevels + 1 // Current level is the next incomplete level
  }

  const getVisibleLevels = () => {
    const currentLevel = getCurrentLevel()
    if (currentLevel <= 5) {
      return levelData.slice(0, 5) // Show levels 1-5
    } else {
      return levelData.slice(5, 10) // Show levels 6-10
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome back, John!</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Here's your affiliate performance summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-card-foreground">Total Recruits</CardTitle>
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-card-foreground">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-card-foreground">Direct Recruits</CardTitle>
            <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
              <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-card-foreground">24</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-card-foreground">Monthly Revenue</CardTitle>
            <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-card-foreground">₦52,400</div>
            <p className="text-xs text-muted-foreground">+18% from last year</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-card-foreground">Pending Payments</CardTitle>
            <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-card-foreground">₦2,847</div>
            <p className="text-xs text-muted-foreground">Processing...</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress and Referral Links Side by Side */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-card-foreground text-sm sm:text-base">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              </div>
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            <div className="text-center space-y-2">
              <h3 className="text-base sm:text-lg font-semibold">You are Level 2</h3>
              <p className="text-sm text-muted-foreground">Need 11 more recruits for Level 3</p>
              <div className="space-y-2">
                <Progress value={89} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>89 recruits</span>
                  <span>100 required</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {getVisibleLevels().map((level, index) => {
                const progress = level.completed ? 100 : (level.recruits / level.required) * 100
                const actualIndex = getCurrentLevel() <= 5 ? index : index + 5
                const isCurrentLevel = actualIndex === 2

                return (
                  <div key={level.level} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${isCurrentLevel ? "text-primary" : level.completed ? "text-green-600" : "text-muted-foreground"}`}
                      >
                        {level.level} {level.completed && "✅"} {isCurrentLevel && "(Current)"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {level.recruits}/{level.required} recruits
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          level.completed ? "bg-green-500" : isCurrentLevel ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}

              {getCurrentLevel() > 5 && (
                <div className="text-center pt-2">
                  <Badge variant="secondary" className="text-xs">
                    Advanced Levels (6-10)
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-card-foreground text-sm sm:text-base">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <Link className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </div>
              Referral Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            {/* Marketer Referral Link */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-medium text-card-foreground">Marketer Referral Link</h4>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground flex-1 truncate">
                  {referralLinks.marketer}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent text-xs sm:text-sm h-8 sm:h-9"
                  onClick={() => copyToClipboard(referralLinks.marketer)}
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs sm:text-sm h-8 sm:h-9">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Shopper Referral Link */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-medium text-card-foreground">Shopper Referral Link</h4>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground flex-1 truncate">
                  {referralLinks.shopper}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent text-xs sm:text-sm h-8 sm:h-9"
                  onClick={() => copyToClipboard(referralLinks.shopper)}
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs sm:text-sm h-8 sm:h-9">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200">
          <CardHeader className="cursor-pointer pb-3" onClick={() => setTaskListExpanded(!taskListExpanded)}>
            <CardTitle className="flex items-center justify-between text-card-foreground text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                </div>
                Task Checklist
              </div>
              <Badge variant="secondary" className="text-xs">
                {tasks.filter((t) => t.completed).length}/{tasks.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          {taskListExpanded && (
            <CardContent className="space-y-2 pb-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3">
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                  <span
                    className={`text-xs sm:text-sm ${task.completed ? "line-through text-muted-foreground" : "text-card-foreground"}`}
                  >
                    {task.text}
                  </span>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-card-foreground text-sm sm:text-base">
              <div className="p-1.5 bg-orange-100 rounded-lg">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-1 bg-muted rounded-full">
                    <Icon className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs sm:text-sm text-card-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Standalone Charts Section */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-card-foreground text-sm sm:text-base">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </div>
              Direct Recruits Chart
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-48 sm:h-56 lg:h-64 w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData} margin={{ top: 10, right: 15, left: 15, bottom: 30 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Bar dataKey="recruits" fill="url(#barGradient)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:scale-105 transition-transform duration-200 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-card-foreground text-sm sm:text-base">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
              </div>
              Monthly Revenue Chart
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-48 sm:h-56 lg:h-64 w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 15, left: 15, bottom: 30 }}>
                    <defs>
                      <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                        <stop offset="50%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--chart-1))"
                      fillOpacity={1}
                      fill="url(#fillRevenue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
