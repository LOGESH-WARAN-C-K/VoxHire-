"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AIInterviewerPanel } from "@/components/interview/ai-interviewer-panel"
import { VideoPanel } from "@/components/interview/video-panel"
import { AnalysisPanel } from "@/components/interview/analysis-panel"
import { LoadingScreen } from "@/components/interview/loading-screen"
import { Clock, X, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Message {
  role: "ai" | "user"
  content: string
  timestamp: Date
}

interface InterviewSettings {
  type: string
  duration: number
  difficulty: string
  skills: string[]
  scenarioType?: string
  scenarioStack?: string
}

const sampleQuestions: Record<string, string[]> = {
  hr: [
    "Tell me about yourself and your professional background.",
    "What are your greatest strengths and how do they apply to this role?",
    "Can you describe a challenging situation at work and how you handled it?",
    "Where do you see yourself in five years?",
    "Why are you interested in this position?",
  ],
  technical: [
    "Can you explain your experience with the technologies listed in your skills?",
    "Walk me through a complex project you've worked on recently.",
    "How do you approach debugging a difficult problem?",
    "Explain the difference between REST and GraphQL APIs.",
    "How do you ensure code quality in your projects?",
  ],
  resume: [
    "Walk me through your most recent role and responsibilities.",
    "What was your biggest achievement in your previous position?",
    "Why did you leave your last job?",
    "How has your experience prepared you for this role?",
    "Can you elaborate on the projects mentioned in your resume?",
  ],
  scenario: [
    "How would you handle a disagreement with a team member?",
    "Describe how you would prioritize multiple urgent tasks.",
    "What would you do if you missed an important deadline?",
    "How would you approach learning a new technology quickly?",
    "Imagine a client is unhappy with the deliverables. How would you handle it?",
  ],
}

const techStackScenarios: Record<string, Record<string, string[]>> = {
  frontend: {
    "React": [
      "Your React app has become slow with thousands of list items. Walk me through how you would optimize the performance.",
      "You need to manage complex global state across multiple components. Describe your approach to state management.",
      "A user reports that the page crashes when they navigate rapidly. How would you debug this issue?",
      "You need to implement real-time collaborative editing. What architecture would you propose?",
      "The design team wants complex animations. How would you balance performance with visual fidelity?",
    ],
    "Vue": [
      "Your Vue.js application has memory leaks. Walk me through your debugging process.",
      "You need to share logic across multiple components. How would you implement this with Composition API?",
      "The app needs to work offline. What strategy would you use for Vue + PWA implementation?",
      "You need to migrate a large Vue 2 app to Vue 3. What is your migration strategy?",
      "How would you implement lazy loading for a Vue app with 50+ routes?",
    ],
    "Angular": [
      "Your Angular app has slow initial load time. What optimization strategies would you apply?",
      "You need to handle complex forms with dynamic validation. Describe your approach.",
      "How would you implement a micro-frontend architecture using Angular?",
      "The app needs to handle real-time data streams. What RxJS patterns would you use?",
      "Describe how you would set up a scalable Angular enterprise architecture.",
    ],
    "Next.js": [
      "You need to decide between SSR, SSG, and ISR for different pages. Walk me through your decision process.",
      "Your Next.js app has slow API routes. How would you optimize them?",
      "How would you implement authentication with both server and client components?",
      "Describe your approach to handling SEO optimization in a Next.js e-commerce site.",
      "Your build times are taking too long. What strategies would you use to speed them up?",
    ],
    "Tailwind CSS": [
      "You need to create a design system with Tailwind. What is your approach to maintaining consistency?",
      "How would you handle dark mode with complex theming requirements?",
      "The bundle size from Tailwind is too large. What optimization strategies would you apply?",
      "You need to create reusable component patterns. How would you structure your Tailwind utilities?",
      "Describe how you would migrate a Bootstrap project to Tailwind CSS.",
    ],
  },
  backend: {
    "Node.js": [
      "Your Node.js API is experiencing memory leaks in production. Walk me through your debugging approach.",
      "You need to handle 10,000 concurrent WebSocket connections. What architecture would you design?",
      "How would you implement rate limiting and throttling for a public API?",
      "Your background jobs are failing intermittently. How would you debug and implement retry logic?",
      "Describe your approach to securing a Node.js API against common vulnerabilities.",
    ],
    "Python": [
      "Your Django API is slow under heavy load. What profiling and optimization steps would you take?",
      "You need to process large files asynchronously. How would you implement this with Celery?",
      "How would you design a Python microservices architecture with proper service communication?",
      "Describe your approach to implementing caching strategies in a Python backend.",
      "You need to build a REST API that also supports GraphQL. What is your implementation strategy?",
    ],
    "Java": [
      "Your Spring Boot application has memory issues. How would you diagnose and fix them?",
      "You need to implement CQRS pattern for a complex domain. Walk me through your approach.",
      "How would you handle distributed transactions across multiple microservices?",
      "Describe your strategy for implementing API versioning in a large Spring application.",
      "Your application needs to handle millions of events per second. What architecture would you propose?",
    ],
    "Go": [
      "You need to implement graceful shutdown for a Go service. Describe your approach.",
      "How would you handle concurrent database connections efficiently in Go?",
      "Your Go service has goroutine leaks. How would you identify and fix them?",
      "Describe your approach to error handling and logging in a production Go service.",
      "You need to build a high-throughput message processing system. What patterns would you use?",
    ],
    "Ruby": [
      "Your Rails app is experiencing N+1 query issues. How would you identify and resolve them?",
      "You need to implement background job processing with reliable delivery. Describe your approach.",
      "How would you handle a Rails monolith that needs to scale to handle 100x traffic?",
      "Describe your strategy for testing complex business logic in a Rails application.",
      "You need to implement real-time features in Rails. What options would you consider?",
    ],
  },
  fullstack: {
    "MERN": [
      "Your MERN application has inconsistent data between frontend and backend. How would you debug this?",
      "You need to implement optimistic updates with proper error handling. Describe your approach.",
      "How would you structure a large MERN application for maintainability?",
      "Describe your deployment strategy for a MERN application with separate scaling needs.",
      "You need to implement real-time collaboration. What architecture would you propose?",
    ],
    "MEAN": [
      "How would you handle complex form validation consistently between Angular and Express?",
      "Your MongoDB queries are becoming slow as data grows. What optimization strategies would you apply?",
      "Describe your approach to implementing role-based access control across the stack.",
      "You need to implement file upload with progress tracking. Walk me through your solution.",
      "How would you implement a search feature with autocomplete in a MEAN application?",
    ],
    "Next.js + Prisma": [
      "You need to implement complex database queries with Prisma. How do you handle N+1 issues?",
      "Describe your approach to handling database migrations in production with Prisma.",
      "How would you implement row-level security in Next.js with Prisma?",
      "Your Prisma queries are slow. What debugging and optimization steps would you take?",
      "You need to implement a multi-tenant architecture. What is your approach?",
    ],
    "Django + React": [
      "How would you handle authentication between Django REST Framework and React?",
      "Describe your approach to handling file uploads with progress tracking.",
      "You need to implement real-time notifications. What architecture would you design?",
      "How would you structure API endpoints for optimal frontend consumption?",
      "Describe your deployment strategy for Django + React with different scaling needs.",
    ],
  },
  mobile: {
    "React Native": [
      "Your React Native app has performance issues on Android. How would you debug and optimize?",
      "You need to implement offline-first functionality. Describe your approach.",
      "How would you handle deep linking across iOS and Android platforms?",
      "Describe your strategy for implementing push notifications reliably.",
      "Your app needs to access native device features. How would you bridge native code?",
    ],
    "Flutter": [
      "Your Flutter app is experiencing jank during scrolling. How would you diagnose and fix this?",
      "You need to implement platform-specific UI while sharing business logic. Describe your approach.",
      "How would you handle state management in a large Flutter application?",
      "Describe your strategy for testing Flutter apps across different devices.",
      "You need to integrate with native SDKs. What is your approach?",
    ],
    "Swift": [
      "Your iOS app is experiencing memory warnings. How would you diagnose the issue?",
      "You need to implement complex animations with good performance. Describe your approach.",
      "How would you handle Core Data concurrency in a multi-threaded app?",
      "Describe your strategy for implementing App Clips for your iOS application.",
      "You need to implement a custom camera experience. Walk me through your solution.",
    ],
    "Kotlin": [
      "Your Android app has ANR issues. How would you diagnose and fix them?",
      "You need to implement a complex UI with Jetpack Compose. Describe your approach.",
      "How would you handle background work reliably with WorkManager?",
      "Describe your strategy for implementing adaptive layouts for different screen sizes.",
      "You need to optimize battery consumption. What techniques would you apply?",
    ],
  },
  devops: {
    "Docker": [
      "Your Docker containers are using too much memory. How would you optimize them?",
      "You need to implement a multi-stage build for a complex application. Describe your approach.",
      "How would you handle secrets management in Docker containers?",
      "Describe your strategy for implementing health checks and graceful shutdown.",
      "You need to debug a container that crashes on startup in production. Walk me through your process.",
    ],
    "Kubernetes": [
      "Your pods are being evicted frequently. How would you diagnose and resolve this?",
      "You need to implement zero-downtime deployments. Describe your approach.",
      "How would you handle stateful applications in Kubernetes?",
      "Describe your strategy for implementing service mesh with Istio or Linkerd.",
      "You need to implement cluster autoscaling effectively. What is your approach?",
    ],
    "AWS": [
      "Your AWS costs are unexpectedly high. How would you identify and optimize spending?",
      "You need to design a disaster recovery strategy. Describe your approach.",
      "How would you implement a secure multi-account AWS organization?",
      "Describe your strategy for handling spiky traffic with auto-scaling.",
      "You need to migrate a on-premises database to AWS. Walk me through your plan.",
    ],
    "CI/CD": [
      "Your CI pipeline is taking too long. How would you optimize build times?",
      "You need to implement a deployment strategy with rollback capability. Describe your approach.",
      "How would you handle database migrations in a CI/CD pipeline?",
      "Describe your strategy for implementing security scanning in the pipeline.",
      "You need to implement feature flags with gradual rollout. What is your approach?",
    ],
    "Terraform": [
      "Your Terraform state is corrupted. How would you recover from this situation?",
      "You need to manage infrastructure for multiple environments. Describe your approach.",
      "How would you handle sensitive data in Terraform configurations?",
      "Describe your strategy for implementing drift detection and remediation.",
      "You need to migrate existing infrastructure to Terraform. Walk me through your plan.",
    ],
  },
  data: {
    "Python": [
      "Your data pipeline is running out of memory. How would you optimize it?",
      "You need to implement real-time data processing. Describe your approach.",
      "How would you handle data quality issues in a production pipeline?",
      "Describe your strategy for versioning and reproducibility in ML projects.",
      "You need to scale a Python data processing job to handle petabytes. What is your approach?",
    ],
    "TensorFlow": [
      "Your model training is slow. How would you optimize the training pipeline?",
      "You need to deploy a model for real-time inference. Describe your approach.",
      "How would you handle model versioning and A/B testing?",
      "Describe your strategy for monitoring model performance in production.",
      "You need to implement transfer learning for a domain-specific task. Walk me through your approach.",
    ],
    "PyTorch": [
      "Your PyTorch model has gradient issues during training. How would you debug this?",
      "You need to implement distributed training across multiple GPUs. Describe your approach.",
      "How would you handle memory optimization for large models?",
      "Describe your strategy for converting a PyTorch model for mobile deployment.",
      "You need to implement custom layers with proper backward pass. Walk me through your approach.",
    ],
    "SQL": [
      "Your database queries are timing out. How would you diagnose and optimize?",
      "You need to design a schema for a complex analytical workload. Describe your approach.",
      "How would you implement incremental data processing in a data warehouse?",
      "Describe your strategy for handling slowly changing dimensions.",
      "You need to migrate from a transactional database to an analytical system. What is your plan?",
    ],
    "Spark": [
      "Your Spark job is failing with out-of-memory errors. How would you debug and fix this?",
      "You need to optimize a slow Spark job. Describe your approach.",
      "How would you handle data skew in a large Spark application?",
      "Describe your strategy for implementing exactly-once processing.",
      "You need to integrate Spark with a streaming data source. Walk me through your approach.",
    ],
  },
}

export default function LiveInterviewPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<InterviewSettings | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [analysisData, setAnalysisData] = useState({
    recordingStatus: "active" as const,
    confidenceScore: 75,
    fillerWordCount: 2,
    emotion: "focused",
    speechActivity: 60,
    faceDetected: true,
    analyzing: false,
  })
  const [showLoading, setShowLoading] = useState(true)

  // Select questions based on interview type and tech stack
  const getQuestions = (): string[] => {
    if (!settings?.type) return sampleQuestions.hr
    
    // For scenario-based interviews with tech stack
    if (settings.type === "scenario" && settings.scenarioType && settings.scenarioStack) {
      const stackQuestions = techStackScenarios[settings.scenarioType]?.[settings.scenarioStack]
      if (stackQuestions) return stackQuestions
    }
    
    return sampleQuestions[settings.type] || sampleQuestions.hr
  }
  
  const questions = getQuestions()
  const currentQuestion = questions[currentQuestionIndex] || ""

  // Load settings
  useEffect(() => {
    const savedSettings = localStorage.getItem("interviewSettings")
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
      setTimeRemaining(parsed.duration * 60)
    } else {
      router.push("/interview/setup")
    }
  }, [router])

  // Timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeRemaining === 0 && settings) {
      handleEndInterview()
    }
  }, [timeRemaining, settings])

  // Simulate AI speaking when question changes
  useEffect(() => {
    if (currentQuestion) {
      setIsAISpeaking(true)
      const timer = setTimeout(() => {
        setIsAISpeaking(false)
        setIsRecording(true)
      }, currentQuestion.length * 30 + 500)
      return () => clearTimeout(timer)
    }
  }, [currentQuestion])

  // Simulate analysis updates
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAnalysisData((prev) => ({
          ...prev,
          confidenceScore: Math.min(100, Math.max(50, prev.confidenceScore + (Math.random() - 0.5) * 10)),
          speechActivity: Math.random() * 100,
          fillerWordCount: prev.fillerWordCount + (Math.random() > 0.8 ? 1 : 0),
          emotion: ["focused", "confident", "neutral", "happy"][Math.floor(Math.random() * 4)],
        }))
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isRecording])

  const handleSendResponse = useCallback(() => {
    if (!userInput.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: userInput,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setUserInput("")
    setIsRecording(false)

    // Simulate analysis
    setAnalysisData((prev) => ({ ...prev, analyzing: true }))

    setTimeout(() => {
      setAnalysisData((prev) => ({ ...prev, analyzing: false }))

      // Move to next question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        handleEndInterview()
      }
    }, 2000)
  }, [userInput, currentQuestionIndex, questions.length])

  const handleEndInterview = () => {
    // Stop camera and mic
    setVideoEnabled(false)
    setMicEnabled(false)

    // Create report with unique ID and timestamp
    const reportId = `report-${Date.now()}`
    const results = {
      id: reportId,
      date: new Date().toISOString(),
      settings,
      messages,
      finalAnalysis: analysisData,
      duration: settings?.duration ? settings.duration * 60 - timeRemaining : 0,
      questionsAnswered: currentQuestionIndex + 1,
      totalQuestions: questions.length,
    }
    
    // Store current results for immediate report view
    localStorage.setItem("interviewResults", JSON.stringify(results))
    
    // Add to reports history
    const existingReports = JSON.parse(localStorage.getItem("interviewReports") || "[]")
    existingReports.unshift(results)
    localStorage.setItem("interviewReports", JSON.stringify(existingReports))
    
    router.push("/interview/report")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-shimmer w-32 h-8 rounded-lg bg-muted" />
      </div>
    )
  }

  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-border/50 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <Clock className="w-4 h-4" />
              {formatTime(timeRemaining)}
            </div>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEndInterview}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="w-4 h-4 mr-2" />
            End Interview
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          {/* Left Panel - AI Interviewer */}
          <div className="lg:col-span-1">
            <AIInterviewerPanel
              currentQuestion={currentQuestion}
              isAISpeaking={isAISpeaking}
              messages={messages}
            />
          </div>

          {/* Center Panel - Video */}
          <div className="lg:col-span-1">
            <VideoPanel
              isRecording={isRecording}
              videoEnabled={videoEnabled}
              micEnabled={micEnabled}
              onToggleVideo={() => setVideoEnabled(!videoEnabled)}
              onToggleMic={() => setMicEnabled(!micEnabled)}
            />
          </div>

          {/* Right Panel - Analysis */}
          <div className="lg:col-span-1">
            <AnalysisPanel data={analysisData} />
          </div>
        </div>

        {/* Response Input */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="flex gap-3">
            <Input
              placeholder="Type your response or speak..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendResponse()}
              className="flex-1 h-12 rounded-xl border-2 focus:border-primary"
            />
            <Button
              onClick={handleSendResponse}
              disabled={!userInput.trim()}
              className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/25"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
