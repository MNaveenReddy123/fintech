import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, Wallet, TrendingUp, Clock, CreditCard } from "lucide-react"

export default function WalletPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Virtual Wallet</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Wallet className="mr-2 h-4 w-4" />
              <span>500 Coins</span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="spending">Spending Simulator</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">500 Coins</div>
                  <p className="text-xs text-muted-foreground">+50 earned today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                  <ArrowUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">750 Coins</div>
                  <p className="text-xs text-muted-foreground">Since you started</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">250 Coins</div>
                  <p className="text-xs text-muted-foreground">On rewards and upgrades</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">66%</div>
                  <p className="text-xs text-muted-foreground">Of total earnings saved</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest wallet activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Completed "Budgeting Basics" Quiz</p>
                      <p className="text-xs text-muted-foreground">Earned for quiz completion</p>
                    </div>
                    <div className="text-sm font-medium text-primary">+20 Coins</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Played "Credit Score Adventure"</p>
                      <p className="text-xs text-muted-foreground">Earned for completing level 2</p>
                    </div>
                    <div className="text-sm font-medium text-primary">+15 Coins</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-destructive/10 p-2">
                      <ArrowDown className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Purchased "Investor" Badge</p>
                      <p className="text-xs text-muted-foreground">Special achievement badge</p>
                    </div>
                    <div className="text-sm font-medium text-destructive">-50 Coins</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Daily Login Bonus</p>
                      <p className="text-xs text-muted-foreground">5-day streak bonus</p>
                    </div>
                    <div className="text-sm font-medium text-primary">+25 Coins</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>All your wallet activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Completed "Budgeting Basics" Quiz</p>
                      <p className="text-xs text-muted-foreground">Today at 2:30 PM</p>
                    </div>
                    <div className="text-sm font-medium text-primary">+20 Coins</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Played "Credit Score Adventure"</p>
                      <p className="text-xs text-muted-foreground">Today at 11:45 AM</p>
                    </div>
                    <div className="text-sm font-medium text-primary">+15 Coins</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-destructive/10 p-2">
                      <ArrowDown className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Purchased "Investor" Badge</p>
                      <p className="text-xs text-muted-foreground">Today at 10:15 AM</p>
                    </div>
                    <div className="text-sm font-medium text-destructive">-50 Coins</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Daily Login Bonus</p>
                      <p className="text-xs text-muted-foreground">Today at 9:00 AM</p>
                    </div>
                    <div className="text-sm font-medium text-primary">+25 Coins</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <ArrowUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Completed "Investment Basics" Lesson</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 4:20 PM</p>
                    </div>
                    <div className="text-sm font-medium text-primary">+30 Coins</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-destructive/10 p-2">
                      <ArrowDown className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Purchased "Premium Quiz Pack"</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM</p>
                    </div>
                    <div className="text-sm font-medium text-destructive">-100 Coins</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="spending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Spending Simulator</CardTitle>
                <CardDescription>Practice making financial decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <CreditCard className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Premium Quiz Pack</h4>
                            <p className="text-xs text-muted-foreground">Unlock advanced quizzes</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">100 Coins</div>
                          <Button variant="outline" size="sm">
                            Buy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Investment Simulator Pro</h4>
                            <p className="text-xs text-muted-foreground">Advanced investment tools</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">200 Coins</div>
                          <Button variant="outline" size="sm">
                            Buy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Time Extension Pack</h4>
                            <p className="text-xs text-muted-foreground">Extra time for quizzes and games</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">75 Coins</div>
                          <Button variant="outline" size="sm">
                            Buy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full text-center text-sm text-muted-foreground">
                  Spending in the simulator helps you practice budgeting without affecting your real balance
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
