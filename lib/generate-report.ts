// Report generation utility for VoxHire AI interviews

export interface InterviewReport {
  id?: string
  date?: string
  role?: string
  settings: {
    type: string
    duration: number
    difficulty: string
    skills?: string[]
    scenarioType?: string
    scenarioStack?: string
  }
  finalAnalysis: {
    confidenceScore: number
    fillerWordCount: number
    emotion: string
    faceDetected: boolean
  }
  duration: number
  questionsAnswered: number
  totalQuestions: number
  questions?: {
    question: string
    answer?: string
    feedback?: string
    score?: number
  }[]
  strengths?: string[]
  improvements?: string[]
  suggestions?: string[]
}

export function generateReportContent(report: InterviewReport): string {
  const date = report.date ? new Date(report.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const confidenceScore = report.finalAnalysis.confidenceScore
  const fluencyScore = Math.max(60, 100 - report.finalAnalysis.fillerWordCount * 5)
  const communicationScore = Math.round((confidenceScore + fluencyScore) / 2) + 5
  const overallScore = Math.round((confidenceScore + fluencyScore + communicationScore) / 3)

  const durationMinutes = Math.floor(report.duration / 60)
  const durationSeconds = report.duration % 60

  const getPerformanceLevel = (score: number): string => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Very Good'
    if (score >= 70) return 'Good'
    if (score >= 60) return 'Satisfactory'
    return 'Needs Improvement'
  }

  const strengths = report.strengths || generateStrengths(report)
  const improvements = report.improvements || generateImprovements(report)
  const suggestions = report.suggestions || generateSuggestions(report)

  let content = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                          VOXHIRE AI INTERVIEW REPORT                         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

================================================================================
                              INTERVIEW DETAILS
================================================================================

Date:               ${date}
Interview Type:     ${report.settings.type.charAt(0).toUpperCase() + report.settings.type.slice(1)} Interview
${report.role ? `Role:               ${report.role}` : ''}
Difficulty:         ${report.settings.difficulty.charAt(0).toUpperCase() + report.settings.difficulty.slice(1)}
Duration:           ${durationMinutes} minutes ${durationSeconds} seconds
Questions:          ${report.questionsAnswered} of ${report.totalQuestions} completed
${report.settings.skills && report.settings.skills.length > 0 ? `Skills Assessed:    ${report.settings.skills.join(', ')}` : ''}
${report.settings.scenarioStack ? `Technology Stack:   ${report.settings.scenarioStack}` : ''}

================================================================================
                            PERFORMANCE SUMMARY
================================================================================

┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   OVERALL SCORE:  ${overallScore.toString().padStart(3)}%   [${getPerformanceLevel(overallScore).padEnd(18)}]                      │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

Detailed Scores:
----------------

    Confidence Score:      ${confidenceScore}%  ${'█'.repeat(Math.floor(confidenceScore/5))}${'░'.repeat(20 - Math.floor(confidenceScore/5))}
    Speech Fluency:        ${fluencyScore}%  ${'█'.repeat(Math.floor(fluencyScore/5))}${'░'.repeat(20 - Math.floor(fluencyScore/5))}
    Communication:         ${communicationScore}%  ${'█'.repeat(Math.floor(communicationScore/5))}${'░'.repeat(20 - Math.floor(communicationScore/5))}

Analysis Metrics:
-----------------

    • Filler Words Detected:    ${report.finalAnalysis.fillerWordCount}
    • Detected Emotion:         ${report.finalAnalysis.emotion.charAt(0).toUpperCase() + report.finalAnalysis.emotion.slice(1)}
    • Face Detection:           ${report.finalAnalysis.faceDetected ? 'Active throughout session' : 'Intermittent'}

================================================================================
                              KEY STRENGTHS
================================================================================

`

  strengths.forEach((strength, index) => {
    content += `    ${index + 1}. ${strength}\n`
  })

  content += `
================================================================================
                           AREAS FOR IMPROVEMENT
================================================================================

`

  improvements.forEach((improvement, index) => {
    content += `    ${index + 1}. ${improvement}\n`
  })

  content += `
================================================================================
                              RECOMMENDATIONS
================================================================================

`

  suggestions.forEach((suggestion, index) => {
    content += `    ${index + 1}. ${suggestion}\n`
  })

  if (report.questions && report.questions.length > 0) {
    content += `
================================================================================
                         QUESTION-BY-QUESTION ANALYSIS
================================================================================

`
    report.questions.forEach((qa, index) => {
      content += `
Question ${index + 1}:
${'-'.repeat(76)}
${qa.question}

${qa.answer ? `Your Response:
${qa.answer}

` : ''}${qa.feedback ? `AI Feedback:
${qa.feedback}

` : ''}${qa.score ? `Score: ${qa.score}%` : ''}

`
    })
  }

  content += `
================================================================================
                                NEXT STEPS
================================================================================

Based on your performance, we recommend:

    1. Schedule another practice session within the next 48 hours
    2. Focus on the areas for improvement identified above
    3. Review the AI feedback for each question carefully
    4. Practice with different interview types to build versatility

================================================================================

Generated by VoxHire AI - Real-Time Interview Intelligence Platform
Report ID: ${report.id || 'VH-' + Date.now()}
Generated on: ${new Date().toISOString()}

Thank you for using VoxHire AI to improve your interview skills.

================================================================================
`

  return content
}

function generateStrengths(report: InterviewReport): string[] {
  const strengths: string[] = []
  const confidence = report.finalAnalysis.confidenceScore
  const fluency = 100 - report.finalAnalysis.fillerWordCount * 5

  if (confidence >= 80) strengths.push('High confidence level demonstrated throughout the interview')
  if (confidence >= 70 && confidence < 80) strengths.push('Good confidence with room for improvement')
  if (fluency >= 85) strengths.push('Excellent speech fluency with minimal filler words')
  if (report.finalAnalysis.faceDetected) strengths.push('Maintained good camera presence and eye contact')
  if (report.questionsAnswered === report.totalQuestions) strengths.push('Completed all questions within time limit')
  if (report.finalAnalysis.emotion === 'focused') strengths.push('Maintained focus and composure throughout')
  if (report.finalAnalysis.emotion === 'confident') strengths.push('Projected confidence in responses')

  if (strengths.length < 3) {
    strengths.push('Showed commitment by completing the practice session')
    strengths.push('Demonstrated willingness to improve through practice')
  }

  return strengths.slice(0, 5)
}

function generateImprovements(report: InterviewReport): string[] {
  const improvements: string[] = []
  const confidence = report.finalAnalysis.confidenceScore
  const fillerWords = report.finalAnalysis.fillerWordCount

  if (confidence < 70) improvements.push('Work on building confidence through more practice')
  if (fillerWords > 5) improvements.push('Reduce filler words (um, uh, like) in responses')
  if (fillerWords > 2 && fillerWords <= 5) improvements.push('Slightly reduce use of filler words for cleaner delivery')
  if (report.questionsAnswered < report.totalQuestions) improvements.push('Practice completing all questions within time limits')
  if (report.finalAnalysis.emotion === 'nervous') improvements.push('Work on managing interview anxiety')
  
  improvements.push('Structure answers using the STAR method for behavioral questions')
  improvements.push('Include more specific examples and metrics in responses')

  return improvements.slice(0, 4)
}

function generateSuggestions(report: InterviewReport): string[] {
  const suggestions: string[] = [
    'Practice with a timer to improve time management',
    'Record yourself to review body language and delivery',
    'Research common questions for your target role',
    'Prepare 5-7 key stories that showcase your achievements',
    'Practice deep breathing before interviews to reduce anxiety'
  ]

  if (report.settings.type === 'technical') {
    suggestions.unshift('Review technical concepts and practice explaining them clearly')
  }

  if (report.settings.scenarioStack) {
    suggestions.unshift(`Practice more ${report.settings.scenarioStack} scenario-based problems`)
  }

  return suggestions.slice(0, 5)
}

export function downloadReport(report: InterviewReport, filename?: string) {
  const content = generateReportContent(report)
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename || `voxhire-report-${report.id || Date.now()}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadReportAsJSON(report: InterviewReport, filename?: string) {
  const jsonContent = JSON.stringify(report, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename || `voxhire-report-${report.id || Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
