"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-12 md:p-20">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
          
          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 text-pretty">
              Join thousands of candidates who have improved their interview skills with VoxHire AI. 
              Start your free practice session today.
            </p>
            <Link href="/interview/setup">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-xl hover:scale-105 transition-all px-8 h-14 text-lg"
              >
                Start Free Interview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
