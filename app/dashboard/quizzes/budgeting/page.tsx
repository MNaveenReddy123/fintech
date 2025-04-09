"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, Clock, Award, AlertTriangle } from "lucide-react"

// Quiz questions
const questions = [
  {
    id: 1,
    question: "What is the 50/30/20 rule in budgeting?",
    options: [
      { id: "a", text: "50% needs, 30% wants, 20% savings" },
      { id: "b", text: "50% savings, 30% needs, 20% wants" },
      { id: "c", text: "50% wants, 30% needs, 20% savings" },
      { id: "d", text: "50% needs, 30% savings, 20% wants" },
    ],
    correctAnswer: "a",
    explanation:
      "The 50/30/20 rule suggests allocating 50% of your income to needs (housing, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment.",
  },
  {
    id: 2,
    question: "Which of the following is NOT considered a fixed expense?",
    options: [
      { id: "a", text: "Mortgage payment" },
      { id: "b", text: "Car insurance" },
      { id: "c", text: "Grocery shopping" },
      { id: "d", text: "Internet bill" },
    ],
    correctAnswer: "c",
    explanation:
      "Grocery shopping is a variable expense because the amount can change each month based on your needs and choices. Fixed expenses remain the same each month, like mortgage payments or subscription services.",
  },
  {
    id: 3,
    question: "What is an emergency fund?",
    options: [
      { id: "a", text: "Money set aside for vacation" },
      { id: "b", text: "Money saved for unexpected expenses" },
      { id: "c", text: "Money invested in stocks" },
      { id: "d", text: "Money allocated for monthly bills" },
    ],
    correctAnswer: "b",
    explanation:
      "An emergency fund is money set aside specifically for unexpected expenses like medical emergencies, car repairs, or job loss. Financial experts typically recommend having 3-6 months of expenses saved.",
  },
  {
    id: 4,
    question: "Which budgeting method involves using cash envelopes for different spending categories?",
    options: [
      { id: "a", text: "Zero-based budgeting" },
      { id: "b", text: "50/30/20 method" },
      { id: "c", text: "Envelope system" },
      { id: "d", text: "Pay yourself first method" },
    ],
    correctAnswer: "c",
    explanation:
      "The envelope system involves placing cash in different envelopes labeled for specific spending categories (groceries, entertainment, etc.). When an envelope is empty, you've reached your spending limit for that category.",
  },
  {
    id: 5,
    question: "What is the first step in creating a budget?",
    options: [
      { id: "a", text: "Set financial goals" },
      { id: "b", text: "Track your expenses" },
      { id: "c", text: "Calculate your income" },
      { id: "d", text: "Cut unnecessary spending" },
    ],
    correctAnswer: "c",
    explanation:
      "The first step in creating a budget is calculating your total income, as this determines how much you can allocate to different categories. After knowing your income, you can track expenses and set goals.",
  },
  {
    id: 6,
    question: "What is a zero-based budget?",
    options: [
      { id: "a", text: "A budget where you spend zero dollars" },
      { id: "b", text: "A budget where income minus expenses equals zero" },
      { id: "c", text: "A budget with zero debt payments" },
      { id: "d", text: "A budget with zero savings" },
    ],
    correctAnswer: "b",
    explanation:
      "In a zero-based budget, your income minus your expenses equals zero because you assign every dollar a specific purpose (expenses, savings, investments, etc.). This doesn't mean you spend everything; it means every dollar has a job.",
  },
  {
    id: 7,
    question: "Which of the following is a good way to track your spending?",
    options: [
      { id: "a", text: "Only check your account balance once a month" },
      { id: "b", text: "Keep mental notes of major purchases" },
      { id: "c", text: "Use a budgeting app or spreadsheet" },
      { id: "d", text: "Round up all expenses to the nearest $100" },
    ],
    correctAnswer: "c",
    explanation:
      "Using a budgeting app or spreadsheet allows you to accurately track all expenses, categorize them, and see patterns in your spending over time. This provides the detailed information needed to make informed financial decisions.",
  },
  {
    id: 8,
    question: "What percentage of your income should ideally go toward housing costs?",
    options: [
      { id: "a", text: "No more than 50%" },
      { id: "b", text: "No more than 30%" },
      { id: "c", text: "No more than 10%" },
      { id: "d", text: "As much as necessary" },
    ],
    correctAnswer: "b",
    explanation:
      "Financial experts generally recommend spending no more than 30% of your income on housing costs. Spending more can make it difficult to afford other necessities and save for the future.",
  },
  {
    id: 9,
    question: "What is the purpose of a sinking fund?",
    options: [
      { id: "a", text: "To pay off debt faster" },
      { id: "b", text: "To save for retirement" },
      { id: "c", text: "To save for expected future expenses" },
      { id: "d", text: "To invest in the stock market" },
    ],
    correctAnswer: "c",
    explanation:
      "A sinking fund is money set aside for planned future expenses, like car maintenance, holiday gifts, or annual insurance premiums. Unlike emergency funds for unexpected costs, sinking funds are for expenses you know are coming.",
  },
  {
    id: 10,
    question: "Which of these is NOT a benefit of budgeting?",
    options: [
      { id: "a", text: "Helps you avoid overspending" },
      { id: "b", text: "Guarantees investment returns" },
      { id: "c", text: "Helps identify areas to cut expenses" },
      { id: "d", text: "Helps achieve financial goals" },
    ],
    correctAnswer: "b",
    explanation:
      "Budgeting cannot guarantee investment returns, as investments always carry risk. However, budgeting does help avoid overspending, identify areas to cut expenses, and achieve financial goals through better money management.",
  },
]

export default function BudgetingQuizPage() {
  const [quizState, setQuizState] = useState("start") // start, playing, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false)

  const handleStart = () => {
    setQuizState("playing")
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowExplanation(false)
    setTimeLeft(300)
    setTimerActive(true)
  }

  const handleAnswerSelect = (questionId, answerId) => {
    if (selectedAnswers[questionId]) return // Prevent changing answer

    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    })

    setShowExplanation(true)

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setShowExplanation(false)
      } else {
        setQuizState("result")
        setTimerActive(false)
      }
    }, 2000)
  }

  // Calculate score
  const calculateScore = () => {
    let correct = 0
    Object.keys(selectedAnswers).forEach((questionId) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      if (question && selectedAnswers[questionId] === question.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Effect for timer
  useState(() => {
    let interval
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setQuizState("result")
      setTimerActive(false)
    }

    return () => clearInterval(interval)
  }, [timerActive, timeLeft])

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/quizzes">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Budgeting Basics Quiz</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              Beginner
            </Badge>
          </div>
        </div>

        {quizState === "start" && (
          <Card>
            <CardHeader>
              <CardTitle>Budgeting Basics Quiz</CardTitle>
              <CardDescription>Test your knowledge about budgeting principles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Quiz Instructions</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <span>You have 5 minutes to complete 10 multiple-choice questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <span>Each question has one correct answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <span>You'll see an explanation after each answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <Clock className="h-3 w-3 text-primary" />
                    </div>
                    <span>You can earn up to 20 coins and 30 XP for a perfect score</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Topics Covered</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This quiz covers budgeting principles, expense tracking, saving strategies, and financial planning.
                  It's designed to test your knowledge after completing the Budgeting Basics simulation.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStart} className="w-full">
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        )}

        {quizState === "playing" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Question {currentQuestion + 1} of {questions.length}
                  </CardTitle>
                  <CardDescription>Budgeting Basics</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className={timeLeft < 60 ? "text-red-500" : ""}>{formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((currentQuestion / questions.length) * 100)}%</span>
                </div>
                <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium">{questions[currentQuestion].question}</p>
              </div>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => {
                  const isSelected = selectedAnswers[questions[currentQuestion].id] === option.id
                  const isCorrect = option.id === questions[currentQuestion].correctAnswer

                  return (
                    <button
                      key={option.id}
                      className={`w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted ${
                        isSelected
                          ? isCorrect
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : ""
                      }`}
                      onClick={() => handleAnswerSelect(questions[currentQuestion].id, option.id)}
                      disabled={selectedAnswers[questions[currentQuestion].id] !== undefined}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.text}</span>
                        {isSelected &&
                          (isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ))}
                      </div>
                    </button>
                  )
                })}
              </div>

              {showExplanation && (
                <div
                  className={`rounded-md p-3 ${
                    selectedAnswers[questions[currentQuestion].id] === questions[currentQuestion].correctAnswer
                      ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {selectedAnswers[questions[currentQuestion].id] === questions[currentQuestion].correctAnswer ? (
                      <CheckCircle className="h-5 w-5 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {selectedAnswers[questions[currentQuestion].id] === questions[currentQuestion].correctAnswer
                          ? "Correct!"
                          : "Incorrect"}
                      </p>
                      <p className="text-sm">{questions[currentQuestion].explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {quizState === "result" && (
          <Card>
            <CardHeader>
              <CardTitle>Quiz Complete!</CardTitle>
              <CardDescription>You've completed the Budgeting Basics Quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-4 py-6">
                <div className="rounded-full bg-primary/10 p-4">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">
                    Your Score: {calculateScore()}/{questions.length}
                  </h3>
                  <p className="text-muted-foreground">
                    {calculateScore() >= 8
                      ? "Excellent! You have a strong understanding of budgeting principles."
                      : calculateScore() >= 6
                        ? "Good job! You understand the basics of budgeting."
                        : "You're on your way to understanding budgeting principles."}
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    You've earned {Math.round((calculateScore() / questions.length) * 20)} Coins and{" "}
                    {Math.round((calculateScore() / questions.length) * 30)} XP!
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Question Summary</h3>
                <div className="mt-4 space-y-3">
                  {questions.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id]
                    const isCorrect = userAnswer === question.correctAnswer

                    return (
                      <div key={question.id} className="flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        </div>
                        <span className="text-sm">
                          Question {index + 1}: {isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Key Takeaways</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <span>The 50/30/20 rule is a simple framework for budgeting your income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <span>Emergency funds are crucial for financial security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <span>Tracking expenses is essential for successful budgeting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <span>Different budgeting methods work for different people - find what works for you</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleStart}>
                Retake Quiz
              </Button>
              <Link href="/dashboard/quizzes">
                <Button>Back to Quizzes</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
