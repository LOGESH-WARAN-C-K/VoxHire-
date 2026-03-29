"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Mic, 
  BarChart3, 
  AlertTriangle, 
  Smile, 
  Activity, 
  Eye,
  Brain
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalysisData {
  recordingStatus: "active" | "paused" | "stopped"
  confidenceScore: number
  fillerWordCount: number
  emotion: string
  speechActivity: number
  faceDetected: boolean
  analyzing: boolean
}

interface AnalysisPanelProps {
  data: AnalysisData
}

const emotions: Record<string, { icon: string; color: string }> = {
  neutral: { icon: "😐", color: "text-slate-500" },
  happy: { icon: "😊", color: "text-green-500" },
  confident: { icon: "😎", color: "text-primary" },
  nervous: { icon: "😰", color: "text-yellow-500" },
  focused: { icon: "🎯", color: "text-blue-500" },
}

export function AnalysisPanel({ data }: AnalysisPanelProps) {
  const emotionData = emotions[data.emotion] || emotions.neutral

  return (
    <Card className="h-full glass-card border-0 shadow-xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-base">Real-Time Analysis</div>
            <div className="text-xs text-muted-foreground">Behaviour Intelligence</div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Recording Status */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2">
            <Mic className={cn(
              "w-4 h-4",
              data.recordingStatus === "active" ? "text-green-500" : "text-muted-foreground"
            )} />
            <span className="text-sm font-medium">Recording Status</span>
          </div>
          <span className={cn(
            "text-sm font-semibold capitalize px-2 py-0.5 rounded-full",
            data.recordingStatus === "active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
          )}>
            {data.recordingStatus}
          </span>
        </div>

        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Confidence Score</span>
            </div>
            <span className="text-sm font-bold text-primary">{data.confidenceScore}%</span>
          </div>
          <div className="relative">
            <Progress value={data.confidenceScore} className="h-2" />
            <div 
              className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${data.confidenceScore}%` }}
            />
          </div>
        </div>

        {/* Filler Words */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2">
            <AlertTriangle className={cn(
              "w-4 h-4",
              data.fillerWordCount > 5 ? "text-yellow-500" : "text-green-500"
            )} />
            <span className="text-sm font-medium">Filler Words</span>
          </div>
          <span className={cn(
            "text-sm font-bold",
            data.fillerWordCount > 5 ? "text-yellow-500" : "text-green-500"
          )}>
            {data.fillerWordCount}
          </span>
        </div>

        {/* Emotion */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Emotion</span>
          </div>
          <span className={cn("text-sm font-semibold capitalize", emotionData.color)}>
            {data.emotion}
          </span>
        </div>

        {/* Speech Activity */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Speech Activity</span>
            </div>
          </div>
          <div className="flex items-center gap-1 h-8 px-3 rounded-lg bg-muted/50">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-full bg-gradient-to-t from-primary to-accent transition-all duration-150",
                  data.recordingStatus === "active" ? "animate-waveform" : "h-1"
                )}
                style={{ 
                  height: data.recordingStatus === "active" 
                    ? `${Math.random() * 80 + 20}%` 
                    : "4px",
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Face Detection */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
          <div className="flex items-center gap-2">
            <Eye className={cn(
              "w-4 h-4",
              data.faceDetected ? "text-green-500" : "text-red-500"
            )} />
            <span className="text-sm font-medium">Face Detection</span>
          </div>
          <span className={cn(
            "text-sm font-semibold px-2 py-0.5 rounded-full",
            data.faceDetected 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          )}>
            {data.faceDetected ? "Detected" : "Not Detected"}
          </span>
        </div>

        {/* Analyzing Status */}
        {data.analyzing && (
          <div className="relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Brain className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-semibold">Analyzing...</div>
                <div className="text-xs text-muted-foreground">Processing your response</div>
              </div>
            </div>
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
