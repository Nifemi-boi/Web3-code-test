"use client"

import { useEffect, useState } from "react"
import { useQuiz } from "@/context/quiz-context"
import QuizHome from "./quiz-home"
import QuizGame from "./quiz-game"
import QuizResults from "./quiz-results"
import { loadSampleQuestions } from "@/lib/quiz-data"

export default function QuizContainer() {
  const { gameStarted, gameEnded, loading, error, startQuiz, setError } = useQuiz()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        setIsLoading(true)
        const questions = await loadSampleQuestions()
        if (questions.length === 0) {
          setError("No questions available")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load questions")
      } finally {
        setIsLoading(false)
      }
    }

    initializeQuiz()
  }, [setError])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700 font-medium">Loading Quiz...</p>
        </div>
      </div>
    )
  }

  if (error && !gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Reload
          </button>
        </div>
      </div>
    )
  }

  if (!gameStarted) {
    return <QuizHome />
  }

  if (gameEnded) {
    return <QuizResults />
  }

  return <QuizGame />
}
