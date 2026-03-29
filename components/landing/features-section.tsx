"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Brain, 
  Video, 
  MessageSquareText, 
  BarChart3,
  Mic,
  Shield,
  Zap,
  Target
} from "lucide-react"

const primaryFeatures = [
  {
    icon: Brain,
    title: "Behaviour Intelligence",
    description: "AI-powered analysis of your responses, body language, and communication patterns in real-time."
  },
  {
    icon: Video,
    title: "Voice & Video Analysis",
    description: "Advanced speech recognition and video analysis to evaluate your presentation and confidence."
  },
  {
    icon: MessageSquareText,
    title: "Scenario-Based Interviews",
    description: "Practice with real-world problem scenarios tailored to your target role and industry."
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Track your progress over time with detailed analytics and improvement insights."
  },
]

const additionalFeatures = [
  {
    icon: Mic,
    title: "Speech Analysis",
    description: "Detect filler words, analyze speech patterns, and improve your verbal communication."
  },
  {
    icon: Shield,
    title: "Secure Sessions",
    description: "Enterprise-grade security with tab switching detection and session monitoring."
  },
  {
    icon: Zap,
    title: "Adaptive Questions",
    description: "AI generates follow-up questions based on your responses for a realistic experience."
  },
  {
    icon: Target,
    title: "Skill-Based Training",
    description: "Customize interviews based on your target role and required technical skills."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Interview Excellence
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Our multi-agent AI system provides comprehensive analysis and feedback to help you ace your next interview.
          </p>
        </div>

        {/* Primary Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {primaryFeatures.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group glass-card hover-scale cursor-pointer border-0 shadow-lg shadow-primary/5 hover:shadow-primary/15 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/25">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group glass-card hover-scale cursor-pointer border-0 shadow-md shadow-muted/20 hover:shadow-primary/10 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-base mb-1 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
