"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowRight,
  Target,
  MessageSquare,
  Mic,
  Brain,
  AlertTriangle,
  ThumbsUp,
  Lightbulb,
  Clock,
  BarChart3,
  TrendingUp,
  Home,
  History,
  ChevronRight,
  Calendar,
  Code,
  Download
} from "lucide-react"
import { downloadReport } from "@/lib/generate-report"
import { cn } from "@/lib/utils"

interface InterviewResults {
  id?: string
  date?: string
  settings: {
    type: string
    duration: number
    difficulty: string
    skills: string[]
    scenarioType?: string
    scenarioStack?: string
  }
  finalAnalysis: {
    confidenceScore: number
    fillerWordCount: number
    emotion: string
    faceDetected: boolean
  }
  duration: number
  questionsAnswered: number
  totalQuestions: number
}

export default function PerformanceReportPage() {
  const [results, setResults] = useState<InterviewResults | null>(null)
  const [allReports, setAllReports] = useState<InterviewResults[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [animatedScores, setAnimatedScores] = useState({
    confidence: 0,
    fluency: 0,
    communication: 0,
    overall: 0
  })

  useEffect(() => {
    const savedResults = localStorage.getItem("interviewResults")
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    }
    
    // Load all reports history
    const reports = JSON.parse(localStorage.getItem("interviewReports") || "[]")
    setAllReports(reports)
  }, [])

  // Animate scores on load
  useEffect(() => {
    if (results) {
      // Reset scores first
      setAnimatedScores({ confidence: 0, fluency: 0, communication: 0, overall: 0 })
      
      const confidence = results.finalAnalysis.confidenceScore
      const fluency = Math.max(60, 100 - results.finalAnalysis.fillerWordCount * 5)
      const communication = Math.round((confidence + fluency) / 2) + Math.floor(Math.random() * 10)
      const overall = Math.round((confidence + fluency + communication) / 3)

      const duration = 1500
      const steps = 50
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        setAnimatedScores({
          confidence: Math.round(confidence * progress),
          fluency: Math.round(fluency * progress),
          communication: Math.round(communication * progress),
          overall: Math.round(overall * progress)
        })
        if (step >= steps) clearInterval(timer)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [results])

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card border-0 shadow-xl p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">No Interview Results</h2>
          <p className="text-muted-foreground mb-6">
            Complete an interview to see your performance report.
          </p>
          <Link href="/interview/setup">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/25">
              Start Interview
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  const confidence = results.finalAnalysis.confidenceScore
  const fluency = Math.max(60, 100 - results.finalAnalysis.fillerWordCount * 5)
  const communication = Math.round((confidence + fluency) / 2) + Math.floor(Math.random() * 10)

  const insights = [
    {
      type: results.finalAnalysis.fillerWordCount > 3 ? "warning" : "success",
      icon: results.finalAnalysis.fillerWordCount > 3 ? AlertTriangle : ThumbsUp,
      title: results.finalAnalysis.fillerWordCount > 3 ? "Filler Words Detected" : "Good Speech Clarity",
      description: results.finalAnalysis.fillerWordCount > 3 
        ? `You used ${results.finalAnalysis.fillerWordCount} filler words. Try to reduce "um", "uh", and "like".`
        : "You maintained clear speech with minimal filler words."
    },
    {
      type: confidence >= 75 ? "success" : "warning",
      icon: confidence >= 75 ? ThumbsUp : AlertTriangle,
      title: confidence >= 75 ? "Confident Delivery" : "Build Confidence",
      description: confidence >= 75 
        ? "Your delivery showed good confidence throughout the interview."
        : "Practice more to build confidence in your responses."
    },
    {
      type: "info",
      icon: Brain,
      title: "Emotion Analysis",
      description: `Primary emotion detected: ${results.finalAnalysis.emotion}. Maintain a positive and engaged demeanor.`
    }
  ]

  const suggestions = [
    "Structure your answers using the STAR method (Situation, Task, Action, Result)",
    "Practice pausing instead of using filler words",
    "Maintain consistent eye contact with the camera",
    "Use specific examples and quantifiable achievements",
    "Keep responses concise - aim for 1-2 minute answers"
  ]

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const handleDownloadReport = () => {
    if (results) {
      downloadReport(results, `voxhire-${results.settings.type}-report-${results.id || Date.now()}.txt`)
    }
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <ThumbsUp className="w-4 h-4" />
            Interview Completed
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Performance Report
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Here&apos;s how you did in your {results.settings.type} interview
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="glass-card border-0 shadow-2xl mb-12 overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-primary to-accent p-8 md:p-12 text-white text-center">
            <div className="text-7xl md:text-8xl font-bold mb-2">{animatedScores.overall}</div>
            <div className="text-white/80 text-lg">Overall Score</div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-1">
                  <Clock className="w-4 h-4" />
                  Duration
                </div>
                <div className="font-semibold">{formatDuration(results.duration)}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-1">
                  <MessageSquare className="w-4 h-4" />
                  Questions
                </div>
                <div className="font-semibold">{results.questionsAnswered} / {results.totalQuestions}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-1">
                  <Target className="w-4 h-4" />
                  Difficulty
                </div>
                <div className="font-semibold capitalize">{results.settings.difficulty}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Score Cards */}
          <Card className="glass-card border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Confidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-4">{animatedScores.confidence}%</div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                  style={{ width: `${animatedScores.confidence}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-green-500" />
                Fluency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500 mb-4">{animatedScores.fluency}%</div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${animatedScores.fluency}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-500 mb-4">{animatedScores.communication}%</div>
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${animatedScores.communication}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Insights */}
          <Card className="glass-card border-0 shadow-xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-xl",
                    insight.type === "warning" ? "bg-orange-50" : insight.type === "success" ? "bg-green-50" : "bg-blue-50"
                  )}
                >
                  <insight.icon className={cn(
                    "w-5 h-5 mt-0.5 shrink-0",
                    insight.type === "warning" ? "text-orange-500" : insight.type === "success" ? "text-green-500" : "text-blue-500"
                  )} />
                  <div>
                    <div className="font-medium mb-1">{insight.title}</div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="glass-card border-0 shadow-xl animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Suggestions for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Link href="/interview/setup">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold shadow-xl shadow-primary/25 hover:scale-105 transition-all px-8 h-14"
            >
              Practice Again
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              size="lg"
              variant="outline"
              className="border-2 px-8 h-14"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Dashboard
            </Button>
          </Link>
          <Button 
            size="lg"
            variant="ghost"
            className="px-8 h-14"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History className="mr-2 h-5 w-5" />
            {showHistory ? "Hide History" : "View History"}
          </Button>
        </div>

        {/* Reports History */}
        {showHistory && allReports.length > 0 && (
          <Card className="glass-card border-0 shadow-xl mt-12 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Interview History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allReports.map((report, index) => {
                  const reportConfidence = report.finalAnalysis.confidenceScore
                  const reportFluency = Math.max(60, 100 - report.finalAnalysis.fillerWordCount * 5)
                  const reportOverall = Math.round((reportConfidence + reportFluency) / 2)
                  
                  return (
                    <div 
                      key={report.id || index}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5",
                        index === 0 && results?.id === report.id ? "border-primary bg-primary/5" : "border-border"
                      )}
                      onClick={() => {
                        setResults(report)
                        setShowHistory(false)
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          reportOverall >= 75 ? "bg-green-100 text-green-600" :
                          reportOverall >= 50 ? "bg-yellow-100 text-yellow-600" :
                          "bg-red-100 text-red-600"
                        )}>
                          <span className="font-bold">{reportOverall}</span>
                        </div>
                        <div>
                          <div className="font-medium capitalize flex items-center gap-2">
                            {report.settings.type} Interview
                            {report.settings.scenarioStack && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                <Code className="w-3 h-3" />
                                {report.settings.scenarioStack}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {report.date ? new Date(report.date).toLocaleDateString() : "Unknown"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {Math.floor(report.duration / 60)}m {report.duration % 60}s
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {report.questionsAnswered}/{report.totalQuestions} questions
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button 
              variant="ghost"
              className="text-muted-foreground"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
