"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "ai" | "user"
  content: string
  timestamp: Date
}

interface AIInterviewerPanelProps {
  currentQuestion: string
  isAISpeaking: boolean
  messages: Message[]
}

export function AIInterviewerPanel({ currentQuestion, isAISpeaking, messages }: AIInterviewerPanelProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (currentQuestion) {
      setIsTyping(true)
      setDisplayedText("")
      let index = 0
      const timer = setInterval(() => {
        if (index < currentQuestion.length) {
          setDisplayedText(currentQuestion.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(timer)
        }
      }, 30)
      return () => clearInterval(timer)
    }
  }, [currentQuestion])

  return (
    <Card className="h-full flex flex-col glass-card border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25",
            isAISpeaking && "animate-pulse-ring"
          )}>
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-semibold">AI Interviewer</div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              {isAISpeaking ? (
                <>
                  <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                  Speaking...
                </>
              ) : isTyping ? (
                "Typing..."
              ) : (
                "Ready"
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        {/* Current Question */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-4 mb-4">
          <div className="text-sm text-muted-foreground mb-2">Current Question</div>
          <p className="text-lg font-medium leading-relaxed">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                  message.role === "user"
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
