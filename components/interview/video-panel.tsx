"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Video, VideoOff, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VideoPanelProps {
  isRecording: boolean
  onToggleVideo: () => void
  onToggleMic: () => void
  videoEnabled: boolean
  micEnabled: boolean
}

export function VideoPanel({ 
  isRecording, 
  onToggleVideo, 
  onToggleMic, 
  videoEnabled, 
  micEnabled 
}: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    let currentStream: MediaStream | null = null
    
    if (videoEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: micEnabled })
        .then((mediaStream) => {
          currentStream = mediaStream
          setStream(mediaStream)
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream
          }
        })
        .catch((err) => {
          console.error("[v0] Error accessing media devices:", err)
        })
    } else {
      // Stop all tracks when video is disabled
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop()
        })
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
        setStream(null)
      }
    }

    return () => {
      // Cleanup on unmount
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop())
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [videoEnabled])

  return (
    <Card className={cn(
      "h-full glass-card border-0 shadow-xl overflow-hidden",
      isRecording && "ring-2 ring-primary shadow-primary/20"
    )}>
      <CardContent className="p-0 h-full flex flex-col">
        {/* Video Container */}
        <div className="relative flex-1 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          {videoEnabled ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
          ) : (
            <div className="text-center text-white/50">
              <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Camera is off</p>
            </div>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-white text-sm font-medium">Recording</span>
            </div>
          )}

          {/* Label */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <span className="text-white text-sm font-medium">Live Camera</span>
          </div>

          {/* Active Glow Border */}
          {isRecording && videoEnabled && (
            <div className="absolute inset-0 rounded-t-2xl animate-glow pointer-events-none" style={{ opacity: 0.3 }} />
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-white flex items-center justify-center gap-4">
          <Button
            variant={videoEnabled ? "default" : "outline"}
            size="icon"
            onClick={onToggleVideo}
            className={cn(
              "w-12 h-12 rounded-full",
              videoEnabled && "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25"
            )}
          >
            {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>
          <Button
            variant={micEnabled ? "default" : "outline"}
            size="icon"
            onClick={onToggleMic}
            className={cn(
              "w-12 h-12 rounded-full",
              micEnabled && "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25",
              micEnabled && isRecording && "animate-pulse-ring"
            )}
          >
            {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
