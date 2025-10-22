"use client"

import { useQuiz } from "@/context/quiz-context"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Leaderboard from "./leaderboard"

export default function QuizResults() {
  const { questions, score, resetQuiz } = useQuiz()
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [savedScores, setSavedScores] = useState<Array<{ score: number; date: string }>>([])

  const percentage = Math.round((score / questions.length) * 100)
  const totalQuestions = questions.length

  useEffect(() => {
    // Load scores from localStorage
    const stored = localStorage.getItem("quizScores")
    const scores = stored ? JSON.parse(stored) : []

    // Add current score
    const newScores = [
      ...scores,
      {
        score,
        totalQuestions,
        percentage,
        date: new Date().toLocaleDateString(),
      },
    ].sort((a, b) => b.score - a.score)

    setSavedScores(newScores)
    localStorage.setItem("quizScores", JSON.stringify(newScores))
  }, [score, totalQuestions, percentage])

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect Score! Outstanding!"
    if (percentage >= 80) return "Excellent! Great job!"
    if (percentage >= 60) return "Good! Keep practicing!"
    if (percentage >= 40) return "Not bad! Try again!"
    return "Keep learning! You can do better!"
  }

  const getPerformanceEmoji = () => {
    if (percentage === 100) return "🏆"
    if (percentage >= 80) return "⭐"
    if (percentage >= 60) return "👍"
    if (percentage >= 40) return "💪"
    return "📚"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Results Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{getPerformanceEmoji()}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
            <p className="text-xl text-gray-600">{getPerformanceMessage()}</p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 text-center">
            <div className="text-6xl font-bold text-blue-600 mb-2">{score}</div>
            <div className="text-2xl text-gray-700 mb-4">out of {totalQuestions}</div>
            <div className="text-4xl font-bold text-indigo-600">{percentage}%</div>
          </div>

          {/* Performance Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4 text-center border-2 border-green-200">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-green-700">Correct Answers</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center border-2 border-red-200">
              <div className="text-2xl font-bold text-red-600">{totalQuestions - score}</div>
              <div className="text-sm text-red-700">Incorrect Answers</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <Button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              aria-expanded={showLeaderboard}
            >
              {showLeaderboard ? "Hide Leaderboard" : "View Leaderboard"}
            </Button>
            <Button
              onClick={resetQuiz}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </Button>
          </div>
        </div>

        {/* Leaderboard */}
        {showLeaderboard && <Leaderboard scores={savedScores} currentScore={score} />}
      </div>
    </div>
  )
}
