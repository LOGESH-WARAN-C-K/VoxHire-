"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Calendar,
  ChevronRight,
  Clock,
  Target,
  MessageSquare,
  Download,
  FileText
} from "lucide-react"
import { downloadReport, type InterviewReport } from "@/lib/generate-report"
import { cn } from "@/lib/utils"

const interviews = [
  { 
    id: 1, 
    role: "Software Engineer", 
    type: "Technical", 
    score: 85, 
    date: "Mar 29, 2026",
    duration: "25 min",
    questions: 5,
    feedback: "Strong technical knowledge, improve clarity"
  },
  { 
    id: 2, 
    role: "Product Manager", 
    type: "HR", 
    score: 78, 
    date: "Mar 28, 2026",
    duration: "20 min",
    questions: 6,
    feedback: "Good communication, work on specific examples"
  },
  { 
    id: 3, 
    role: "Data Analyst", 
    type: "Technical", 
    score: 92, 
    date: "Mar 27, 2026",
    duration: "30 min",
    questions: 7,
    feedback: "Excellent problem-solving skills"
  },
  { 
    id: 4, 
    role: "UX Designer", 
    type: "Scenario", 
    score: 71, 
    date: "Mar 25, 2026",
    duration: "15 min",
    questions: 4,
    feedback: "Creative solutions, structure responses better"
  },
  { 
    id: 5, 
    role: "Marketing Lead", 
    type: "Resume", 
    score: 88, 
    date: "Mar 24, 2026",
    duration: "22 min",
    questions: 5,
    feedback: "Great storytelling, be more concise"
  },
  { 
    id: 6, 
    role: "Backend Developer", 
    type: "Technical", 
    score: 81, 
    date: "Mar 22, 2026",
    duration: "28 min",
    questions: 6,
    feedback: "Solid fundamentals, practice system design"
  },
  { 
    id: 7, 
    role: "Project Manager", 
    type: "HR", 
    score: 74, 
    date: "Mar 20, 2026",
    duration: "18 min",
    questions: 5,
    feedback: "Good leadership examples, improve STAR method"
  },
  { 
    id: 8, 
    role: "Frontend Developer", 
    type: "Technical", 
    score: 89, 
    date: "Mar 18, 2026",
    duration: "25 min",
    questions: 6,
    feedback: "Excellent React knowledge, practice accessibility"
  },
]

const typeColors: Record<string, string> = {
  Technical: "bg-blue-100 text-blue-700",
  HR: "bg-green-100 text-green-700",
  Scenario: "bg-orange-100 text-orange-700",
  Resume: "bg-purple-100 text-purple-700",
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredInterviews = interviews.filter((interview) => {
    const matchesSearch = interview.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || interview.type === selectedType
    return matchesSearch && matchesType
  })

  const types = ["Technical", "HR", "Scenario", "Resume"]

  const handleDownloadReport = (e: React.MouseEvent, interview: typeof interviews[0]) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Convert to InterviewReport format
    const report: InterviewReport = {
      id: `VH-${interview.id}`,
      date: new Date().toISOString(),
      role: interview.role,
      settings: {
        type: interview.type.toLowerCase(),
        duration: parseInt(interview.duration),
        difficulty: "medium",
        skills: []
      },
      finalAnalysis: {
        confidenceScore: interview.score,
        fillerWordCount: Math.floor((100 - interview.score) / 10),
        emotion: interview.score >= 80 ? "confident" : "focused",
        faceDetected: true
      },
      duration: parseInt(interview.duration) * 60,
      questionsAnswered: interview.questions,
      totalQuestions: interview.questions,
      strengths: ["Clear communication", "Good technical knowledge", "Confident delivery"],
      improvements: [interview.feedback],
      suggestions: ["Continue practicing regularly", "Review AI feedback carefully"]
    }
    
    downloadReport(report, `voxhire-${interview.role.toLowerCase().replace(/\s+/g, '-')}-${interview.id}.txt`)
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Interview{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              History
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Review your past interviews and track your improvement
          </p>
        </div>

        {/* Filters */}
        <Card className="glass-card border-0 shadow-xl mb-8 animate-slide-up">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-2">
                  <Button
                    variant={selectedType === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(null)}
                    className={cn(
                      selectedType === null && "bg-gradient-to-r from-primary to-accent"
                    )}
                  >
                    All
                  </Button>
                  {types.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        selectedType === type && "bg-gradient-to-r from-primary to-accent"
                      )}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview List */}
        <div className="space-y-4">
          {filteredInterviews.map((interview, index) => (
            <Card 
              key={interview.id} 
              className="glass-card border-0 shadow-lg hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-0">
                <Link 
                  href={`/history/${interview.id}`}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4"
                >
                  {/* Left Section */}
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0",
                      interview.score >= 85 
                        ? "bg-gradient-to-br from-green-500 to-emerald-500" 
                        : interview.score >= 70 
                        ? "bg-gradient-to-br from-primary to-accent"
                        : "bg-gradient-to-br from-orange-500 to-amber-500"
                    )}>
                      {interview.score}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{interview.role}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", typeColors[interview.type])}>
                          {interview.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {interview.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {interview.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {interview.questions} questions
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-3 md:text-right">
                    <div className="flex-1 md:flex-none hidden sm:block">
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {interview.feedback}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleDownloadReport(e, interview)}
                      className="shrink-0 gap-1.5 hover:bg-primary/5 hover:border-primary/50"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden md:inline">Report</span>
                    </Button>
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInterviews.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No interviews found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
