"use client"

import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Setup Your Interview",
    description: "Choose interview type, duration, difficulty, and add your skills for personalized questions."
  },
  {
    number: "02",
    title: "Start the Session",
    description: "Enable camera and microphone. The AI interviewer will guide you through realistic questions."
  },
  {
    number: "03",
    title: "Real-Time Analysis",
    description: "Our multi-agent system analyzes your confidence, speech patterns, and behaviour live."
  },
  {
    number: "04",
    title: "Get Insights",
    description: "Receive detailed performance reports with actionable feedback and improvement tips."
  }
]

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            How{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VoxHire AI
            </span>{" "}
            Works
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A simple four-step process to master your interview skills with AI-powered intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 -translate-x-1/2 z-0" />
              )}
              
              <Card className="relative glass-card border-0 shadow-lg hover-scale">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
