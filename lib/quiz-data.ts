import type { Question } from "@/context/quiz-context"

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "easy",
  },
  {
    id: "2",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    category: "science",
    difficulty: "easy",
  },
  {
    id: "3",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    category: "geography",
    difficulty: "easy",
  },
  {
    id: "4",
    question: "In what year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
    category: "history",
    difficulty: "medium",
  },
  {
    id: "5",
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    category: "science",
    difficulty: "medium",
  },
  {
    id: "6",
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Benjamin Franklin"],
    correctAnswer: 1,
    category: "history",
    difficulty: "easy",
  },
  {
    id: "7",
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Liechtenstein", "Vatican City", "San Marino"],
    correctAnswer: 2,
    category: "geography",
    difficulty: "medium",
  },
  {
    id: "8",
    question: "How many strings does a standard violin have?",
    options: ["4", "5", "6", "8"],
    correctAnswer: 0,
    category: "science",
    difficulty: "hard",
  },
  {
    id: "9",
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: 0,
    category: "science",
    difficulty: "hard",
  },
  {
    id: "10",
    question: 'Which programming language is known as the "language of the web"?',
    options: ["Python", "JavaScript", "Java", "C++"],
    correctAnswer: 1,
    category: "technology",
    difficulty: "easy",
  },
  {
    id: "11",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correctAnswer: 0,
    category: "technology",
    difficulty: "easy",
  },
  {
    id: "12",
    question: "In what year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correctAnswer: 2,
    category: "technology",
    difficulty: "easy",
  },
]

export async function loadSampleQuestions(): Promise<Question[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Shuffle questions for variety
  return SAMPLE_QUESTIONS.sort(() => Math.random() - 0.5)
}

export async function loadQuestionsFromAPI(url: string): Promise<Question[]> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`)
    }
    const data = await response.json()
    return data.questions || []
  } catch (error) {
    console.error("Error loading questions from API:", error)
    throw error
  }
}
