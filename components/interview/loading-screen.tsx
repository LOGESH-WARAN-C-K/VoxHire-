"use client"

import { useEffect, useState } from "react"
import { Mic2, Camera, Bot, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingScreenProps {
  onComplete: () => void
}

const checklistItems = [
  { id: "camera", label: "Camera Ready", icon: Camera },
  { id: "microphone", label: "Microphone Ready", icon: Mic2 },
  { id: "ai", label: "AI System Ready", icon: Bot },
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [completedItems, setCompletedItems] = useState<string[]>([])
  const [currentItem, setCurrentItem] = useState(0)

  useEffect(() => {
    const checkItems = async () => {
      for (let i = 0; i < checklistItems.length; i++) {
        setCurrentItem(i)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setCompletedItems((prev) => [...prev, checklistItems[i].id])
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
      onComplete()
    }
    checkItems()
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto shadow-2xl shadow-primary/30 animate-pulse-ring">
            <Mic2 className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -inset-4 rounded-3xl border-2 border-primary/30 animate-ping" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2 animate-fade-in">
          Initializing AI Interview...
        </h2>
        <p className="text-muted-foreground mb-8 animate-fade-in">
          Preparing your personalized interview session
        </p>

        {/* Checklist */}
        <div className="space-y-4 max-w-xs mx-auto">
          {checklistItems.map((item, index) => {
            const isCompleted = completedItems.includes(item.id)
            const isCurrent = currentItem === index && !isCompleted

            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                  isCompleted
                    ? "bg-green-50 border border-green-200"
                    : isCurrent
                    ? "bg-primary/5 border border-primary/20"
                    : "bg-muted/50 border border-transparent"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <item.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium transition-colors",
                    isCompleted
                      ? "text-green-700"
                      : isCurrent
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
                {isCompleted && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                )}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{
                width: `${((completedItems.length / checklistItems.length) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
