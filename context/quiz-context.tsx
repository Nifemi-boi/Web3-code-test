"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category?: string
  difficulty?: "easy" | "medium" | "hard"
}

export interface QuizState {
  questions: Question[]
  currentQuestionIndex: number
  score: number
  selectedAnswers: (number | null)[]
  gameStarted: boolean
  gameEnded: boolean
  loading: boolean
  error: string | null
  timePerQuestion: number
  timeRemaining: number
}

interface QuizContextType extends QuizState {
  startQuiz: (questions: Question[], timePerQuestion?: number) => void
  selectAnswer: (answerIndex: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  endQuiz: () => void
  resetQuiz: () => void
  setTimeRemaining: (time: number) => void
  loadQuestions: (questions: Question[]) => void
  setError: (error: string | null) => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswers: [],
    gameStarted: false,
    gameEnded: false,
    loading: false,
    error: null,
    timePerQuestion: 30,
    timeRemaining: 30,
  })

  const startQuiz = useCallback((questions: Question[], timePerQuestion = 30) => {
    setState((prev) => ({
      ...prev,
      questions,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswers: new Array(questions.length).fill(null),
      gameStarted: true,
      gameEnded: false,
      timePerQuestion,
      timeRemaining: timePerQuestion,
      error: null,
    }))
  }, [])

  const selectAnswer = useCallback((answerIndex: number) => {
    setState((prev) => {
      const newSelectedAnswers = [...prev.selectedAnswers]
      newSelectedAnswers[prev.currentQuestionIndex] = answerIndex

      const currentQuestion = prev.questions[prev.currentQuestionIndex]
      const isCorrect = answerIndex === currentQuestion.correctAnswer
      const newScore = isCorrect ? prev.score + 1 : prev.score

      return {
        ...prev,
        selectedAnswers: newSelectedAnswers,
        score: newScore,
      }
    })
  }, [])

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex < prev.questions.length - 1) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          timeRemaining: prev.timePerQuestion,
        }
      } else {
        return {
          ...prev,
          gameEnded: true,
        }
      }
    })
  }, [])

  const previousQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
          timeRemaining: prev.timePerQuestion,
        }
      }
      return prev
    })
  }, [])

  const endQuiz = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gameEnded: true,
    }))
  }, [])

  const resetQuiz = useCallback(() => {
    setState({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswers: [],
      gameStarted: false,
      gameEnded: false,
      loading: false,
      error: null,
      timePerQuestion: 30,
      timeRemaining: 30,
    })
  }, [])

  const setTimeRemaining = useCallback((time: number) => {
    setState((prev) => ({
      ...prev,
      timeRemaining: time,
    }))
  }, [])

  const loadQuestions = useCallback((questions: Question[]) => {
    setState((prev) => ({
      ...prev,
      questions,
      loading: false,
    }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
      loading: false,
    }))
  }, [])

  const value: QuizContextType = {
    ...state,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    endQuiz,
    resetQuiz,
    setTimeRemaining,
    loadQuestions,
    setError,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
