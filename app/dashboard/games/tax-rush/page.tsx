"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award } from "lucide-react"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import { useAuth } from "@/contexts/auth-context"
import { saveActivityProgress } from "@/actions/user-actions"
import { toast } from "@/components/ui/use-toast"

// Type Definitions
type TaxItem = {
  id: string
  label: string
  category: "Income" | "Deduction" | "Invalid"
}

type DropZoneCategory = "Income" | "Deduction" | "Invalid"

// Sample Tax Items
const taxItems: TaxItem[] = [
  { id: uuidv4(), label: "W-2 Form", category: "Income" },
  { id: uuidv4(), label: "Charity Donation Receipt", category: "Deduction" },
  { id: uuidv4(), label: "Lottery Ticket", category: "Invalid" },
  { id: uuidv4(), label: "1099 Form", category: "Income" },
  { id: uuidv4(), label: "Medical Bill", category: "Deduction" },
  { id: uuidv4(), label: "Mortgage Interest Statement", category: "Deduction" },
  { id: uuidv4(), label: "Birthday Card", category: "Invalid" },
  { id: uuidv4(), label: "Student Loan Interest", category: "Deduction" },
  { id: uuidv4(), label: "Dividend Statement", category: "Income" },
]

export default function TaxRushGame() {
  const router = useRouter()
  const { userData, refreshUserData } = useAuth()
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [currentItems, setCurrentItems] = useState<TaxItem[]>(taxItems)
  const [gameStatus, setGameStatus] = useState<"not_started" | "in_progress" | "completed">("not_started")
  const [draggedItem, setDraggedItem] = useState<TaxItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (gameStatus !== "in_progress") return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameStatus("completed")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStatus])

  const handleDragStart = (item: TaxItem) => {
    setDraggedItem(item)
  }

  const handleDrop = async (zone: DropZoneCategory) => {
    if (!draggedItem) return

    setCurrentItems((prev) => prev.filter((i) => i.id !== draggedItem.id))

    if (draggedItem.category === zone) {
      setScore((prev) => prev + 10)
    } else {
      setTimeLeft((prev) => Math.max(prev - 10, 0))
    }

    setDraggedItem(null)

    if (currentItems.length === 1) {
      setGameStatus("completed")

      if (userData) {
        // Calculate rewards based on score
        const xpEarned = Math.floor(score / 10) * 5 // 5 XP per correct answer
        const coinsEarned = Math.floor(score / 10) * 3 // 3 coins per correct answer

        try {
          setIsSubmitting(true)
          await saveActivityProgress(userData.id, "game", "Tax Rush", score, xpEarned, coinsEarned)
        } catch (error) {
          console.error("Error saving game progress:", error)
        } finally {
          setIsSubmitting(false)
        }
      }
    }
  }

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? "0" : ""}${sec}`
  }

  const calculateRewards = () => {
    const xpEarned = Math.floor(score / 10) * 5 // 5 XP per correct answer
    const coinsEarned = Math.floor(score / 10) * 3 // 3 coins per correct answer
    return { xpEarned, coinsEarned }
  }

  // Modify the handleGameEnd function to update coins in real-time
  const handleGameEnd = async () => {
    if (!userData) return

    // Calculate rewards based on score
    const xpEarned = Math.floor(score / 10) * 5 // 5 XP per correct answer
    const coinsEarned = Math.floor(score / 10) * 3 // 3 coins per correct answer

    try {
      setIsSubmitting(true)
      const result = await saveActivityProgress(userData.id, "game", "Tax Rush", score, xpEarned, coinsEarned)

      if (result.success) {
        // Update the user's coins in the context
        await refreshUserData()

        toast({
          title: "Game Completed!",
          description: `You earned ${xpEarned} XP and ${coinsEarned} Coins!`,
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Error saving game progress:", error)
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/games">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Tax Rush</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              Intermediate
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tax Rush</CardTitle>
            <CardDescription>Race against time to file taxes correctly!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                ⏳ Time Left: <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <div>
                🏆 Score: <span className="font-semibold">{score}</span>
              </div>
            </div>

            {gameStatus === "not_started" && (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-4">How to Play</h3>
                <p className="mb-6 text-muted-foreground">
                  Drag tax-related items to the correct category: Income, Deduction, or Invalid.
                  <br />
                  Correct answers earn 10 points. Incorrect answers cost 10 seconds.
                  <br />
                  Complete as many as you can before time runs out!
                </p>
                <Button
                  onClick={() => setGameStatus("in_progress")}
                  className="bg-primary text-white px-4 py-2 rounded-xl shadow-md"
                >
                  Start Game
                </Button>
              </div>
            )}

            {gameStatus === "in_progress" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Drag Tax Items:</h3>
                  <div className="space-y-2">
                    {currentItems.map((item) => (
                      <motion.div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className="bg-white p-3 rounded-xl shadow mb-2 border cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Drop Zones:</h3>
                  <div className="space-y-4">
                    {(["Income", "Deduction", "Invalid"] as DropZoneCategory[]).map((zone) => (
                      <div
                        key={zone}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(zone)}
                        className="bg-gray-100 p-6 rounded-xl border-2 border-dashed text-center"
                      >
                        {zone} Zone
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {gameStatus === "completed" && (
              <div className="text-center py-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Game Over!</h3>
                  <p className="text-lg">Final Score: {score}</p>

                  {userData && (
                    <div className="mt-2 text-muted-foreground">
                      <p>
                        You earned {calculateRewards().xpEarned} XP and {calculateRewards().coinsEarned} Coins!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/dashboard/games")}>
              Back to Games
            </Button>

            {gameStatus === "completed" && (
              <Button
                onClick={() => {
                  setScore(0)
                  setTimeLeft(600)
                  setCurrentItems(taxItems)
                  setGameStatus("not_started")
                }}
                disabled={isSubmitting}
              >
                Play Again
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
