"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { 
  Users, 
  Code, 
  FileText, 
  MessageSquare, 
  Clock, 
  Zap,
  ArrowRight,
  X,
  Plus,
  Upload,
  CheckCircle2
} from "lucide-react"

const interviewTypes = [
  { id: "hr", label: "HR Interview", icon: Users, description: "Behavioural and situational questions" },
  { id: "technical", label: "Technical", icon: Code, description: "Skill-based technical questions" },
  { id: "resume", label: "Resume-based", icon: FileText, description: "Questions based on your experience" },
  { id: "scenario", label: "Scenario-based", icon: MessageSquare, description: "Real-world problem solving" },
]

const techStackScenarios = [
  { id: "frontend", label: "Frontend", stacks: ["React", "Vue", "Angular", "Next.js", "Tailwind CSS"] },
  { id: "backend", label: "Backend", stacks: ["Node.js", "Python", "Java", "Go", "Ruby"] },
  { id: "fullstack", label: "Full Stack", stacks: ["MERN", "MEAN", "Next.js + Prisma", "Django + React"] },
  { id: "mobile", label: "Mobile", stacks: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { id: "devops", label: "DevOps", stacks: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"] },
  { id: "data", label: "Data/ML", stacks: ["Python", "TensorFlow", "PyTorch", "SQL", "Spark"] },
]

const durations = [
  { value: 10, label: "10 min", description: "Quick practice" },
  { value: 20, label: "20 min", description: "Standard" },
  { value: 30, label: "30 min", description: "In-depth" },
]

const difficulties = [
  { value: "easy", label: "Easy", color: "from-green-500 to-emerald-500" },
  { value: "medium", label: "Medium", color: "from-yellow-500 to-orange-500" },
  { value: "hard", label: "Hard", color: "from-red-500 to-rose-500" },
]

export default function InterviewSetupPage() {
  const router = useRouter()
  const [interviewType, setInterviewType] = useState<string>("")
  const [duration, setDuration] = useState<number>(20)
  const [difficulty, setDifficulty] = useState<string>("medium")
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeParsing, setResumeParsing] = useState(false)
  const [resumeParsed, setResumeParsed] = useState(false)
  const [selectedScenarioType, setSelectedScenarioType] = useState<string>("")
  const [selectedStack, setSelectedStack] = useState<string>("")

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
      setResumeParsing(true)
      // Simulate parsing
      setTimeout(() => {
        setResumeParsing(false)
        setResumeParsed(true)
      }, 2000)
    }
  }

  const startInterview = () => {
    // Store settings and navigate to interview
    const settings = {
      type: interviewType,
      duration,
      difficulty,
      skills: interviewType === "technical" ? skills : [],
      scenarioType: interviewType === "scenario" ? selectedScenarioType : "",
      scenarioStack: interviewType === "scenario" ? selectedStack : ""
    }
    localStorage.setItem("interviewSettings", JSON.stringify(settings))
    router.push("/interview/live")
  }

  const isValid = interviewType && 
    (interviewType !== "technical" || skills.length > 0) &&
    (interviewType !== "resume" || resumeParsed) &&
    (interviewType !== "scenario" || (selectedScenarioType && selectedStack))

  return (
    <div className="min-h-screen py-12 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Setup Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Interview
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Customize your practice session for the best experience
            </p>
          </div>

          {/* Interview Type Selection */}
          <Card className="glass-card border-0 shadow-xl mb-8 animate-slide-up">
            <CardHeader>
              <CardTitle>Interview Type</CardTitle>
              <CardDescription>Choose the type of interview you want to practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interviewTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setInterviewType(type.id)}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left hover-scale",
                      interviewType === type.id
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all",
                      interviewType === type.id
                        ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/25"
                        : "bg-muted text-muted-foreground"
                    )}>
                      <type.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Skills Input */}
          {interviewType === "technical" && (
            <Card className="glass-card border-0 shadow-xl mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>Your Skills</CardTitle>
                <CardDescription>Add skills to generate relevant technical questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="e.g., React, Node.js, Python..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={addSkill} variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Scenario-based Tech Stack Selection */}
          {interviewType === "scenario" && (
            <Card className="glass-card border-0 shadow-xl mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>Select Tech Stack Scenario</CardTitle>
                <CardDescription>Choose a domain and specific technology for scenario-based questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Domain Selection */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Domain</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {techStackScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => {
                          setSelectedScenarioType(scenario.id)
                          setSelectedStack("")
                        }}
                        className={cn(
                          "py-3 px-4 rounded-xl border-2 transition-all text-center",
                          selectedScenarioType === scenario.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="font-medium">{scenario.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stack Selection */}
                {selectedScenarioType && (
                  <div className="animate-fade-in">
                    <Label className="text-sm font-medium mb-3 block">Technology Stack</Label>
                    <div className="flex flex-wrap gap-2">
                      {techStackScenarios
                        .find(s => s.id === selectedScenarioType)
                        ?.stacks.map((stack) => (
                          <button
                            key={stack}
                            onClick={() => setSelectedStack(stack)}
                            className={cn(
                              "px-4 py-2 rounded-full border-2 transition-all text-sm font-medium",
                              selectedStack === stack
                                ? "border-primary bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                                : "border-border hover:border-primary/50 bg-white"
                            )}
                          >
                            {stack}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Selected Stack Preview */}
                {selectedStack && (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Ready for {selectedStack} Scenarios</p>
                        <p className="text-sm text-muted-foreground">
                          You&apos;ll receive real-world problem scenarios related to {selectedStack}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Resume Upload */}
          {interviewType === "resume" && (
            <Card className="glass-card border-0 shadow-xl mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>AI will analyze your resume to generate personalized questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center transition-all hover:border-primary/50">
                  {!resumeFile ? (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Click to upload or drag and drop</p>
                          <p className="text-sm text-muted-foreground">PDF or DOC (max 10MB)</p>
                        </div>
                      </div>
                    </label>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      {resumeParsing ? (
                        <>
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-ring">
                            <FileText className="w-8 h-8 text-primary" />
                          </div>
                          <p className="font-medium">Analyzing resume...</p>
                          <div className="w-48 h-2 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent animate-shimmer" style={{ width: "60%" }} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                          </div>
                          <p className="font-medium text-green-600">Resume parsed successfully!</p>
                          <p className="text-sm text-muted-foreground">{resumeFile.name}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Skills extracted</span>
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Experience identified</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Duration & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Duration */}
            <Card className="glass-card border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {durations.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDuration(d.value)}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-center",
                        duration === d.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="font-semibold">{d.label}</div>
                      <div className="text-xs text-muted-foreground">{d.description}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Difficulty */}
            <Card className="glass-card border-0 shadow-xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Difficulty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {difficulties.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDifficulty(d.value)}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl border-2 transition-all text-center",
                        difficulty === d.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "w-3 h-3 rounded-full mx-auto mb-2 bg-gradient-to-r",
                        d.color
                      )} />
                      <div className="font-semibold capitalize">{d.label}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Start Button */}
          <div className="text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={startInterview}
              disabled={!isValid}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 px-12 h-14 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Start Interview
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {!isValid && interviewType === "technical" && (
              <p className="text-sm text-muted-foreground mt-3">
                Please add at least one skill to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
