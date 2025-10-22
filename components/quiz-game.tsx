"use client"

import { useEffect, useState } from "react"
import { useQuiz } from "@/context/quiz-context"
import QuestionCard from "./question-card"
import ProgressBar from "./progress-bar"
import Timer from "./timer"
import { Button } from "@/components/ui/button"

export default function QuizGame() {
  const {
    questions,
    currentQuestionIndex,
    score,
    selectedAnswers,
    nextQuestion,
    previousQuestion,
    endQuiz,
    timePerQuestion,
    timeRemaining,
    setTimeRemaining,
  } = useQuiz()

  const [answered, setAnswered] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    setAnswered(selectedAnswers[currentQuestionIndex] !== null)
    setShowFeedback(false)
  }, [currentQuestionIndex, selectedAnswers])

  useEffect(() => {
    if (!answered) return

    const timer = setTimeout(() => {
      setShowFeedback(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [answered])

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (!answered) {
        nextQuestion()
      }
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, answered, nextQuestion, setTimeRemaining])

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-700 font-medium">Loading questions...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const selectedAnswer = selectedAnswers[currentQuestionIndex]
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Quiz Master</h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Score</div>
            <div
              className="text-2xl font-bold text-blue-600"
              aria-label={`Current score: ${score} out of ${questions.length}`}
            >
              {score}/{questions.length}
            </div>
          </div>
        </div>

        {/* Progress and Timer */}
        <div className="mb-6">
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <Timer timeRemaining={timeRemaining} timePerQuestion={timePerQuestion} />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          onAnswerSelect={() => {}}
        />

        {/* Feedback Message */}
        {showFeedback && (
          <div
            className={`mt-6 p-4 rounded-lg font-semibold text-center transition-all ${
              isCorrect
                ? "bg-green-100 text-green-800 border-2 border-green-300"
                : "bg-red-100 text-red-800 border-2 border-red-300"
            }`}
            role="status"
            aria-live="polite"
          >
            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            {!isCorrect && (
              <div className="text-sm mt-2">
                Correct answer:{" "}
                <span className="font-bold">{currentQuestion.options[currentQuestion.correctAnswer]}</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-4 justify-between">
          <Button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0 || !showFeedback}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            aria-label="Go to previous question"
          >
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={endQuiz}
              disabled={!showFeedback}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Finish the quiz"
            >
              Finish Quiz
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={!showFeedback}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Go to next question"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
