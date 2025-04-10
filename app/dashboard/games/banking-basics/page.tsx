"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Landmark, CreditCard, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { saveActivityProgress } from "@/actions/user-actions"
import { toast } from "@/components/ui/use-toast"

export default function BankingBasics() {
  const router = useRouter()
  const { userData, refreshUserData } = useAuth()
  const [balance, setBalance] = useState(1000)
  const [accountType, setAccountType] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(480) // 8 minutes
  const [gameStatus, setGameStatus] = useState<"not_started" | "in_progress" | "completed">("not_started")
  const [score, setScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [interestAccrued, setInterestAccrued] = useState(0)

  useEffect(() => {
    if (gameStatus !== "in_progress") return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setGameStatus("completed")
          handleGameEnd()
          return 0
        }
        return prev - 1
      })

      // Add interest for savings account every 30 seconds
      if (accountType === "Savings" && timeLeft % 30 === 0) {
        const interest = Number.parseFloat((balance * 0.01).toFixed(2)) // 1% interest
        setBalance((prev) => Number.parseFloat((prev + interest).toFixed(2)))
        setInterestAccrued((prev) => Number.parseFloat((prev + interest).toFixed(2)))
        setTransactions((prev) => [...prev, `Earned $${interest.toFixed(2)} interest on savings account.`])
        setScore((prev) => prev + 5) // Award points for earning interest
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [gameStatus, timeLeft, accountType, balance])

  const handleAccountSelection = (type: string) => {
    if (accountType) {
      setTransactions((prev) => [...prev, `Changed account type from ${accountType} to ${type}.`])
    } else {
      setTransactions((prev) => [...prev, `Opened a ${type} account.`])
      setScore((prev) => prev + 10) // Award points for opening first account
    }
    setAccountType(type)
  }

  const makeDeposit = (amount: number) => {
    setBalance((prev) => Number.parseFloat((prev + amount).toFixed(2)))
    setTransactions((prev) => [...prev, `Deposited $${amount.toFixed(2)}`])
    setScore((prev) => prev + 5) // Award points for making a deposit
  }

  const makeWithdrawal = (amount: number) => {
    if (balance >= amount) {
      setBalance((prev) => Number.parseFloat((prev - amount).toFixed(2)))
      setTransactions((prev) => [...prev, `Withdrew $${amount.toFixed(2)}`])

      // Penalty for withdrawing from savings
      if (accountType === "Savings" && amount > 100) {
        const penalty = 5
        setBalance((prev) => Number.parseFloat((prev - penalty).toFixed(2)))
        setTransactions((prev) => [...prev, `Incurred $${penalty.toFixed(2)} early withdrawal fee from savings.`])
        setScore((prev) => prev - 5) // Penalty for large withdrawal from savings
      } else {
        setScore((prev) => prev + 3) // Award fewer points for withdrawals
      }
    } else {
      setTransactions((prev) => [...prev, `Attempted withdrawal of $${amount.toFixed(2)} - Insufficient funds`])
      setScore((prev) => prev - 10) // Penalty for overdraft attempt
    }
  }

  const handleGameEnd = async () => {
    if (!userData) return

    // Calculate final score based on balance and transactions
    const finalScore = score + Math.floor(balance / 100) * 5

    // Calculate rewards
    const xpEarned = Math.min(Math.max(finalScore, 15), 50)
    const coinsEarned = Math.min(Math.max(Math.floor(finalScore / 2), 10), 30)

    try {
      setIsSubmitting(true)
      const result = await saveActivityProgress(
        userData.id,
        "game",
        "Banking Basics",
        finalScore,
        xpEarned,
        coinsEarned,
      )

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

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? "0" : ""}${sec}`
  }

  const calculateRewards = () => {
    const finalScore = score + Math.floor(balance / 100) * 5
    const xpEarned = Math.min(Math.max(finalScore, 15), 50)
    const coinsEarned = Math.min(Math.max(Math.floor(finalScore / 2), 10), 30)
    return { xpEarned, coinsEarned, finalScore }
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
            <h2 className="text-3xl font-bold tracking-tight">Banking Basics</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              Beginner
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Banking Basics</CardTitle>
            <CardDescription>Learn about different banking services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                ⏳ Time Left: <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <div>
                🏦 Balance: <span className="font-semibold">${balance.toFixed(2)}</span>
              </div>
              <div>
                🏆 Score: <span className="font-semibold">{score}</span>
              </div>
            </div>

            {gameStatus === "not_started" && (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-4">How to Play</h3>
                <p className="mb-6 text-muted-foreground">
                  Choose an account type and manage your money wisely.
                  <br />
                  Make deposits and withdrawals to learn about banking services.
                  <br />
                  Savings accounts earn interest, but have withdrawal penalties.
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Choose Account Type:</h3>
                  <div className="flex gap-4 mt-2">
                    <Button
                      onClick={() => handleAccountSelection("Savings")}
                      variant={accountType === "Savings" ? "default" : "outline"}
                      className="flex gap-2"
                    >
                      <PiggyBank className="h-4 w-4" />
                      Savings
                    </Button>
                    <Button
                      onClick={() => handleAccountSelection("Checking")}
                      variant={accountType === "Checking" ? "default" : "outline"}
                      className="flex gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Checking
                    </Button>
                  </div>
                  {accountType === "Savings" && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Savings accounts earn 1% interest every 30 seconds, but have penalties for large withdrawals.
                    </p>
                  )}
                  {accountType === "Checking" && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Checking accounts don't earn interest, but have no withdrawal penalties.
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Transactions:</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      onClick={() => makeDeposit(100)}
                      className="flex gap-2 bg-green-500 hover:bg-green-600"
                      disabled={!accountType}
                    >
                      <ArrowDownRight className="h-4 w-4" />
                      Deposit $100
                    </Button>
                    <Button
                      onClick={() => makeDeposit(500)}
                      className="flex gap-2 bg-green-500 hover:bg-green-600"
                      disabled={!accountType}
                    >
                      <ArrowDownRight className="h-4 w-4" />
                      Deposit $500
                    </Button>
                    <Button
                      onClick={() => makeWithdrawal(50)}
                      className="flex gap-2 bg-red-500 hover:bg-red-600"
                      disabled={!accountType || balance < 50}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      Withdraw $50
                    </Button>
                    <Button
                      onClick={() => makeWithdrawal(200)}
                      className="flex gap-2 bg-red-500 hover:bg-red-600"
                      disabled={!accountType || balance < 200}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      Withdraw $200
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Account Summary:</h3>
                  <div className="border rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Account Type:</span>
                        <span>{accountType || "None"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Balance:</span>
                        <span>${balance.toFixed(2)}</span>
                      </div>
                      {accountType === "Savings" && (
                        <div className="flex justify-between">
                          <span>Interest Earned:</span>
                          <span className="text-green-500">${interestAccrued.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Activity Log:</h3>
                  <div className="border rounded-lg p-4 max-h-40 overflow-y-auto">
                    <ul className="space-y-1 text-sm text-gray-700">
                      {transactions.length === 0 ? (
                        <li>No activity yet.</li>
                      ) : (
                        transactions.map((entry, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Landmark className="h-3 w-3 text-muted-foreground" />
                            {entry}
                          </li>
                        ))
                      )}
                    </ul>
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
                  <h3 className="text-2xl font-bold">Time's Up!</h3>
                  <div className="space-y-2">
                    <p>Final Balance: ${balance.toFixed(2)}</p>
                    {accountType === "Savings" && <p>Total Interest Earned: ${interestAccrued.toFixed(2)}</p>}
                    <p>Final Score: {calculateRewards().finalScore}</p>
                  </div>

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
                  setBalance(1000)
                  setAccountType(null)
                  setTransactions([])
                  setTimeLeft(480)
                  setScore(0)
                  setInterestAccrued(0)
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
