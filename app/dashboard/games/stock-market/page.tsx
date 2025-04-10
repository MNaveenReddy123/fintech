"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, TrendingUp, TrendingDown } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { useAuth } from "@/contexts/auth-context"
import { saveActivityProgress } from "@/actions/user-actions"
import { toast } from "@/components/ui/use-toast"

// Type Definitions
type Stock = {
  id: string
  name: string
  price: number
  previousPrice?: number
}

export default function StockMarketSimulator() {
  const router = useRouter()
  const { userData, refreshUserData } = useAuth()
  const [stocks, setStocks] = useState<Stock[]>([])
  const [cash, setCash] = useState(10000)
  const [portfolio, setPortfolio] = useState<{ [key: string]: number }>({})
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes
  const [gameStatus, setGameStatus] = useState<"not_started" | "in_progress" | "completed">("not_started")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Initialize stocks
    const initialStocks: Stock[] = [
      { id: uuidv4(), name: "TechCorp", price: 120 },
      { id: uuidv4(), name: "GreenEnergy", price: 85 },
      { id: uuidv4(), name: "FinBank", price: 210 },
      { id: uuidv4(), name: "RetailGiant", price: 145 },
      { id: uuidv4(), name: "HealthCare", price: 95 },
    ]
    setStocks(initialStocks)
  }, [])

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

      // Simulate price change
      setStocks((prev) =>
        prev.map((stock) => {
          const previousPrice = stock.price
          // Random price change between -5% and +5%
          const changePercent = -0.05 + Math.random() * 0.1
          const newPrice = Number.parseFloat((stock.price * (1 + changePercent)).toFixed(2))
          return {
            ...stock,
            previousPrice,
            price: newPrice,
          }
        }),
      )
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [gameStatus])

  const buyStock = (stockId: string) => {
    const stock = stocks.find((s) => s.id === stockId)
    if (!stock || cash < stock.price) return

    setCash((prev) => Number.parseFloat((prev - stock.price).toFixed(2)))
    setPortfolio((prev) => ({
      ...prev,
      [stock.id]: (prev[stock.id] || 0) + 1,
    }))
  }

  const sellStock = (stockId: string) => {
    const stock = stocks.find((s) => s.id === stockId)
    if (!stock || (portfolio[stock.id] || 0) <= 0) return

    setCash((prev) => Number.parseFloat((prev + stock.price).toFixed(2)))
    setPortfolio((prev) => ({
      ...prev,
      [stock.id]: prev[stock.id] - 1,
    }))
  }

  const handleGameEnd = async () => {
    if (!userData) return

    // Calculate portfolio value
    const portfolioValue = Object.entries(portfolio).reduce((total, [stockId, quantity]) => {
      const stock = stocks.find((s) => s.id === stockId)
      return total + (stock ? stock.price * quantity : 0)
    }, 0)

    const totalValue = cash + portfolioValue
    const profit = totalValue - 10000
    const score = Math.round(profit)

    // Calculate rewards based on performance
    const xpEarned = profit > 0 ? Math.min(Math.floor(profit / 100) * 5, 75) : 15
    const coinsEarned = profit > 0 ? Math.min(Math.floor(profit / 100) * 3, 50) : 10

    try {
      setIsSubmitting(true)
      const result = await saveActivityProgress(
        userData.id,
        "game",
        "Stock Market Simulator",
        score,
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

  const calculatePortfolioValue = () => {
    return Object.entries(portfolio).reduce((total, [stockId, quantity]) => {
      const stock = stocks.find((s) => s.id === stockId)
      return total + (stock ? stock.price * quantity : 0)
    }, 0)
  }

  const calculateTotalValue = () => {
    return cash + calculatePortfolioValue()
  }

  const calculateProfit = () => {
    return calculateTotalValue() - 10000
  }

  const calculateRewards = () => {
    const profit = calculateProfit()
    const xpEarned = profit > 0 ? Math.min(Math.floor(profit / 100) * 5, 75) : 15
    const coinsEarned = profit > 0 ? Math.min(Math.floor(profit / 100) * 3, 50) : 10
    return { xpEarned, coinsEarned }
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
            <h2 className="text-3xl font-bold tracking-tight">Stock Market Simulator</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              Intermediate
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Stock Market Simulator</CardTitle>
            <CardDescription>Learn to invest in a simulated stock market</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                ⏳ Time Left: <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <div>
                💵 Cash: <span className="font-semibold">${cash.toFixed(2)}</span>
              </div>
            </div>

            {gameStatus === "not_started" && (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-4">How to Play</h3>
                <p className="mb-6 text-muted-foreground">
                  Buy and sell stocks to maximize your portfolio value.
                  <br />
                  Stock prices will change every few seconds.
                  <br />
                  Try to make a profit before time runs out!
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
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Stocks:</h3>
                  <div className="space-y-4">
                    {stocks.map((stock) => (
                      <div key={stock.id} className="p-4 border rounded-xl shadow">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-bold">{stock.name}</p>
                            <div className="flex items-center">
                              <p className="text-sm">${stock.price.toFixed(2)}</p>
                              {stock.previousPrice && (
                                <span
                                  className={`ml-2 text-xs flex items-center ${
                                    stock.price > stock.previousPrice
                                      ? "text-green-500"
                                      : stock.price < stock.previousPrice
                                        ? "text-red-500"
                                        : "text-gray-500"
                                  }`}
                                >
                                  {stock.price > stock.previousPrice ? (
                                    <>
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                      {((stock.price / stock.previousPrice - 1) * 100).toFixed(1)}%
                                    </>
                                  ) : stock.price < stock.previousPrice ? (
                                    <>
                                      <TrendingDown className="h-3 w-3 mr-1" />
                                      {((1 - stock.price / stock.previousPrice) * 100).toFixed(1)}%
                                    </>
                                  ) : null}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="space-x-2">
                            <Button
                              onClick={() => buyStock(stock.id)}
                              className="bg-green-500 text-white px-3 py-1 rounded"
                              disabled={cash < stock.price}
                              size="sm"
                            >
                              Buy
                            </Button>
                            <Button
                              onClick={() => sellStock(stock.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded"
                              disabled={(portfolio[stock.id] || 0) <= 0}
                              size="sm"
                            >
                              Sell
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Portfolio:</h3>
                  {Object.entries(portfolio).length === 0 ? (
                    <p className="text-muted-foreground">No stocks owned yet.</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="border rounded-xl p-4">
                        <h4 className="font-medium mb-2">Holdings</h4>
                        <ul className="space-y-2">
                          {Object.entries(portfolio).map(([stockId, qty]) => {
                            if (qty <= 0) return null
                            const stock = stocks.find((s) => s.id === stockId)
                            if (!stock) return null
                            return (
                              <li key={stockId} className="flex justify-between">
                                <span>{stock.name}</span>
                                <span>
                                  {qty} shares (${(stock.price * qty).toFixed(2)})
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>

                      <div className="border rounded-xl p-4">
                        <h4 className="font-medium mb-2">Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Cash:</span>
                            <span>${cash.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Portfolio Value:</span>
                            <span>${calculatePortfolioValue().toFixed(2)}</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-medium">
                              <span>Total Value:</span>
                              <span>${calculateTotalValue().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Profit/Loss:</span>
                              <span className={calculateProfit() >= 0 ? "text-green-500" : "text-red-500"}>
                                {calculateProfit() >= 0 ? "+" : ""}${calculateProfit().toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                    <p>Final Portfolio Value: ${calculatePortfolioValue().toFixed(2)}</p>
                    <p>Final Cash: ${cash.toFixed(2)}</p>
                    <p>Total Value: ${calculateTotalValue().toFixed(2)}</p>
                    <p className={calculateProfit() >= 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                      {calculateProfit() >= 0 ? "Profit: +" : "Loss: "}${Math.abs(calculateProfit()).toFixed(2)}
                    </p>
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
                  setCash(10000)
                  setPortfolio({})
                  setTimeLeft(900)
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
