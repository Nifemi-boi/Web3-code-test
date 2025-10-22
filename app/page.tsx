"use client"

import { useState, useEffect } from "react"
import QuizContainer from "@/components/quiz-container"
import { QuizProvider } from "@/context/quiz-context"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <QuizProvider>
      <QuizContainer />
    </QuizProvider>
  )
}
