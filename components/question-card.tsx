"use client"

import type React from "react"

import type { Question } from "@/context/quiz-context"
import { useQuiz } from "@/context/quiz-context"

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  showFeedback: boolean
  isCorrect: boolean
  onAnswerSelect: (index: number) => void
}

export default function QuestionCard({ question, selectedAnswer, showFeedback, isCorrect }: QuestionCardProps) {
  const { selectAnswer } = useQuiz()

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer === null) {
      selectAnswer(index)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (selectedAnswer === null && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      selectAnswer(index)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Question */}
      <div className="mb-8">
        <div className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
          {question.category || "General"}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{question.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3" role="group" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectAnswer = index === question.correctAnswer
          let buttonClass = "bg-gray-50 hover:bg-gray-100 text-gray-900 border-2 border-gray-200"

          if (isSelected && showFeedback) {
            if (isCorrect) {
              buttonClass = "bg-green-100 text-green-900 border-2 border-green-500"
            } else {
              buttonClass = "bg-red-100 text-red-900 border-2 border-red-500"
            }
          } else if (showFeedback && isCorrectAnswer && !isSelected) {
            buttonClass = "bg-green-100 text-green-900 border-2 border-green-500"
          } else if (isSelected && !showFeedback) {
            buttonClass = "bg-blue-100 text-blue-900 border-2 border-blue-500"
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg font-semibold text-left transition-all transform hover:scale-102 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${buttonClass}`}
              aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    isSelected && showFeedback
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : showFeedback && isCorrectAnswer && !isSelected
                        ? "bg-green-500 text-white"
                        : isSelected && !showFeedback
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
