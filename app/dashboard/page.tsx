"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Clock, 
  Target, 
  TrendingUp,
  ArrowRight,
  Calendar,
  ChevronRight
} from "lucide-react"

const stats = [
  {
    title: "Total Interviews",
    value: "24",
    change: "+3 this week",
    icon: BarChart3,
    color: "from-primary to-accent"
  },
  {
    title: "Average Score",
    value: "82%",
    change: "+5% improvement",
    icon: Target,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Practice Hours",
    value: "12.5h",
    change: "This month",
    icon: Clock,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Performance Trend",
    value: "+15%",
    change: "Last 7 days",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-500"
  },
]

const recentSessions = [
  { id: 1, role: "Software Engineer", type: "Technical", score: 85, date: "Today" },
  { id: 2, role: "Product Manager", type: "HR", score: 78, date: "Yesterday" },
  { id: 3, role: "Data Analyst", type: "Technical", score: 92, date: "Mar 27" },
  { id: 4, role: "UX Designer", type: "Scenario", score: 71, date: "Mar 25" },
  { id: 5, role: "Marketing Lead", type: "Resume", score: 88, date: "Mar 24" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 animate-fade-in">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your progress and continue improving your interview skills
            </p>
          </div>
          <Link href="/interview/setup" className="mt-4 md:mt-0">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium shadow-lg shadow-primary/25 hover:scale-105 transition-all">
              Start New Interview
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title} 
              className="glass-card border-0 shadow-xl hover-scale animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
                <div className="text-xs text-primary mt-2 font-medium">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Sessions */}
        <Card className="glass-card border-0 shadow-xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Sessions
            </CardTitle>
            <Link href="/history">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <Link 
                  key={session.id} 
                  href={`/history/${session.id}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                      {session.score}
                    </div>
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {session.role}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.type} Interview
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{session.date}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="glass-card border-0 shadow-xl hover-scale cursor-pointer group animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Practice Technical</h3>
              <p className="text-sm text-muted-foreground">Sharpen your coding interview skills</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 shadow-xl hover-scale cursor-pointer group animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">View Analytics</h3>
              <p className="text-sm text-muted-foreground">Deep dive into your performance</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 shadow-xl hover-scale cursor-pointer group animate-slide-up" style={{ animationDelay: "0.7s" }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">See how you&apos;ve improved over time</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
