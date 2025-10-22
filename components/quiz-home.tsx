"use client"

import { useState } from "react"
import { useQuiz } from "@/context/quiz-context"
import { loadSampleQuestions } from "@/lib/quiz-data"
import { Button } from "@/components/ui/button"

export default function QuizHome() {
  const { startQuiz } = useQuiz()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [timePerQuestion, setTimePerQuestion] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { id: "all", name: "All Topics", icon: "🌍" },
    { id: "science", name: "Science", icon: "🔬" },
    { id: "history", name: "History", icon: "📚" },
    { id: "geography", name: "Geography", icon: "🗺️" },
    { id: "technology", name: "Technology", icon: "💻" },
  ]

  const handleStartQuiz = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const questions = await loadSampleQuestions()
      const filteredQuestions =
        selectedCategory === "all" ? questions : questions.filter((q) => q.category === selectedCategory)

      if (filteredQuestions.length === 0) {
        setError("No questions available for this category. Please try another.")
        return
      }

      startQuiz(filteredQuestions, timePerQuestion)
    } catch (err) {
      setError("Failed to start quiz. Please try again.")
      console.error("Error starting quiz:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Quiz Master</h1>
          <p className="text-xl text-gray-600">Test your knowledge across multiple topics</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-800" role="alert">
              {error}
            </div>
          )}

          {/* Category Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-4 rounded-lg font-semibold transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-pressed={selectedCategory === cat.id}
                  aria-label={`Select ${cat.name} category`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-sm">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Time per Question</h2>
            <div className="flex gap-3 flex-wrap">
              {[15, 20, 30, 45, 60].map((time) => (
                <button
                  key={time}
                  onClick={() => setTimePerQuestion(time)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    timePerQuestion === time
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-pressed={timePerQuestion === time}
                  aria-label={`Set time to ${time} seconds per question`}
                >
                  {time}s
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStartQuiz}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-busy={isLoading}
          >
            {isLoading ? "Starting..." : "Start Quiz"}
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-bold text-gray-800 mb-1">Multiple Topics</h3>
            <p className="text-sm text-gray-600">Diverse questions across categories</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-bold text-gray-800 mb-1">Timed Challenges</h3>
            <p className="text-sm text-gray-600">Race against the clock</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-bold text-gray-800 mb-1">Track Scores</h3>
            <p className="text-sm text-gray-600">See your progress and rankings</p>
          </div>
        </div>
      </div>
    </div>
  )
}
