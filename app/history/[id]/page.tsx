"use client"

import { use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Target,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  Lightbulb,
  Download,
  FileText
} from "lucide-react"
import { downloadReport, type InterviewReport } from "@/lib/generate-report"
import { cn } from "@/lib/utils"

// Mock data for interview details
const interviewData: Record<string, {
  role: string
  type: string
  score: number
  date: string
  duration: string
  questions: {
    question: string
    answer: string
    feedback: string
    score: number
  }[]
  strengths: string[]
  improvements: string[]
  suggestions: string[]
}> = {
  "1": {
    role: "Software Engineer",
    type: "Technical",
    score: 85,
    date: "Mar 29, 2026",
    duration: "25 min",
    questions: [
      {
        question: "Can you explain your experience with React and state management?",
        answer: "I have 3 years of experience with React, including hooks, context API, and Redux for complex state management. I&apos;ve built several production applications...",
        feedback: "Good technical depth, could include more specific examples",
        score: 88
      },
      {
        question: "How do you approach debugging a difficult problem?",
        answer: "I start by reproducing the issue, then use console logs and debugger tools to isolate the problem. I also check documentation and stack traces...",
        feedback: "Systematic approach demonstrated, mention testing strategies",
        score: 82
      },
      {
        question: "Explain the difference between REST and GraphQL APIs.",
        answer: "REST uses multiple endpoints with fixed data structures, while GraphQL has a single endpoint where clients specify exactly what data they need...",
        feedback: "Clear explanation, excellent understanding of trade-offs",
        score: 90
      },
    ],
    strengths: [
      "Strong technical knowledge",
      "Clear communication",
      "Systematic problem-solving",
      "Good use of examples"
    ],
    improvements: [
      "Include more specific metrics",
      "Reduce use of filler words",
      "Better time management"
    ],
    suggestions: [
      "Practice STAR method for behavioral questions",
      "Prepare more quantifiable achievements",
      "Work on maintaining eye contact"
    ]
  }
}

// Default data for other IDs
const defaultData = {
  role: "Product Manager",
  type: "HR",
  score: 78,
  date: "Mar 28, 2026",
  duration: "20 min",
  questions: [
    {
      question: "Tell me about yourself and your background.",
      answer: "I have been working in product management for 5 years, starting from a technical background in software development...",
      feedback: "Good structure, be more concise",
      score: 75
    },
    {
      question: "Describe a challenging project you managed.",
      answer: "I led the launch of a new mobile app that increased user engagement by 40%. The main challenge was coordinating across multiple teams...",
      feedback: "Great use of metrics, elaborate on learnings",
      score: 80
    },
  ],
  strengths: ["Good storytelling", "Clear communication", "Confident delivery"],
  improvements: ["Be more concise", "Use STAR method consistently"],
  suggestions: ["Prepare more specific examples", "Practice time management"]
}

export default function InterviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const interview = interviewData[resolvedParams.id] || defaultData

  const handleDownloadReport = () => {
    const report: InterviewReport = {
      id: `VH-${resolvedParams.id}`,
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
      questionsAnswered: interview.questions.length,
      totalQuestions: interview.questions.length,
      questions: interview.questions,
      strengths: interview.strengths,
      improvements: interview.improvements,
      suggestions: interview.suggestions
    }
    
    downloadReport(report, `voxhire-${interview.role.toLowerCase().replace(/\s+/g, '-')}-report.txt`)
  }

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/history" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors animate-fade-in">
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 animate-slide-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{interview.role}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {interview.type} Interview
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {interview.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {interview.duration}
              </span>
            </div>
          </div>
          
          {/* Overall Score */}
          <Card className={cn(
            "border-0 shadow-xl",
            interview.score >= 85 
              ? "bg-gradient-to-br from-green-500 to-emerald-500" 
              : interview.score >= 70 
              ? "bg-gradient-to-br from-primary to-accent"
              : "bg-gradient-to-br from-orange-500 to-amber-500"
          )}>
            <CardContent className="p-6 text-center text-white">
              <div className="text-5xl font-bold mb-1">{interview.score}</div>
              <div className="text-white/80 text-sm">Overall Score</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Questions & Answers */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Questions & Answers
            </h2>
            {interview.questions.map((qa, index) => (
              <Card key={index} className="glass-card border-0 shadow-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-semibold text-lg">Q{index + 1}: {qa.question}</h3>
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0",
                      qa.score >= 85 
                        ? "bg-gradient-to-br from-green-500 to-emerald-500" 
                        : qa.score >= 70 
                        ? "bg-gradient-to-br from-primary to-accent"
                        : "bg-gradient-to-br from-orange-500 to-amber-500"
                    )}>
                      {qa.score}
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 mb-4">
                    <div className="text-sm text-muted-foreground mb-1">Your Answer:</div>
                    <p className="text-sm leading-relaxed">{qa.answer}</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">{qa.feedback}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar - Feedback Summary */}
          <div className="space-y-6">
            {/* Strengths */}
            <Card className="glass-card border-0 shadow-xl animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ThumbsUp className="w-5 h-5 text-green-500" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {interview.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas to Improve */}
            <Card className="glass-card border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {interview.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card className="glass-card border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {interview.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleDownloadReport}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/25 gap-2"
              >
                <Download className="w-4 h-4" />
                Download Report
              </Button>
              <Link href="/interview/setup" className="block">
                <Button variant="outline" className="w-full">
                  Practice Again
                </Button>
              </Link>
              <Link href="/dashboard" className="block">
                <Button variant="ghost" className="w-full">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
