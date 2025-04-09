import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, BookOpen, Gamepad2, Trophy, Wallet, TrendingUp, Calendar, Clock, Award } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Level 3</div>
                  <p className="text-xs text-muted-foreground">Intermediate</p>
                  <Progress value={45} className="mt-2" />
                  <p className="mt-1 text-xs text-muted-foreground">250/500 XP to Level 4</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">500 Coins</div>
                  <p className="text-xs text-muted-foreground">+50 earned today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Out of 25 total badges</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#42</div>
                  <p className="text-xs text-muted-foreground">Top 15% of all users</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Completed "Budgeting Basics" Quiz</p>
                        <p className="text-xs text-muted-foreground">Score: 8/10 • +30 XP • +20 Coins</p>
                      </div>
                      <div className="text-xs text-muted-foreground">2h ago</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Gamepad2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Played "Credit Score Adventure"</p>
                        <p className="text-xs text-muted-foreground">Level 2 completed • +25 XP • +15 Coins</p>
                      </div>
                      <div className="text-xs text-muted-foreground">5h ago</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Started "Investment Basics" Simulation</p>
                        <p className="text-xs text-muted-foreground">In progress • 15% complete</p>
                      </div>
                      <div className="text-xs text-muted-foreground">Yesterday</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recommended For You</CardTitle>
                  <CardDescription>Based on your level and interests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Investment Simulation</h4>
                        <p className="text-xs text-muted-foreground">Learn how to build a diversified portfolio</p>
                      </div>
                      <Link href="/dashboard/simulations/investment">
                        <Button variant="outline" size="sm">
                          Start
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Gamepad2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Tax Rush Game</h4>
                        <p className="text-xs text-muted-foreground">Learn tax basics in a fun way</p>
                      </div>
                      <Link href="/dashboard/games/tax-rush">
                        <Button variant="outline" size="sm">
                          Play
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Credit Score Quiz</h4>
                        <p className="text-xs text-muted-foreground">Test your knowledge about credit scores</p>
                      </div>
                      <Link href="/dashboard/quizzes/credit-score">
                        <Button variant="outline" size="sm">
                          Take Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="activities" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Simulations</CardTitle>
                  <CardDescription>Interactive financial scenarios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Budgeting Basics</h4>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Learn to create and manage a monthly budget</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> 15 min
                        </div>
                        <Link href="/dashboard/simulations/budgeting">
                          <Button variant="outline" size="sm">
                            Replay
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Investment Basics</h4>
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          In Progress
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Learn how to start investing with small amounts</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> 20 min
                        </div>
                        <Link href="/dashboard/simulations/investing">
                          <Button variant="outline" size="sm">
                            Continue
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard/simulations">
                    <Button variant="link" className="w-full">
                      View All Simulations
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Mini-Games</CardTitle>
                  <CardDescription>Fun financial games</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Credit Score Adventure</h4>
                        <Badge variant="outline">Level 2</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Navigate the world of credit scores</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Gamepad2 className="h-3 w-3" /> 5 min per level
                        </div>
                        <Link href="/dashboard/games/credit-score">
                          <Button variant="outline" size="sm">
                            Play
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Tax Rush</h4>
                        <Badge variant="outline">New</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Race against time to file taxes correctly</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Gamepad2 className="h-3 w-3" /> 10 min
                        </div>
                        <Link href="/dashboard/games/tax-rush">
                          <Button variant="outline" size="sm">
                            Play
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard/games">
                    <Button variant="link" className="w-full">
                      View All Games
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quizzes</CardTitle>
                  <CardDescription>Test your knowledge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Budgeting Basics</h4>
                        <Badge variant="outline">8/10</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Test your budgeting knowledge</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" /> Completed today
                        </div>
                        <Link href="/dashboard/quizzes/budgeting">
                          <Button variant="outline" size="sm">
                            Retry
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Credit Score Quiz</h4>
                        <Badge variant="outline">Daily</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Test your knowledge about credit scores</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> 5 min
                        </div>
                        <Link href="/dashboard/quizzes/credit-score">
                          <Button variant="outline" size="sm">
                            Take Quiz
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard/quizzes">
                    <Button variant="link" className="w-full">
                      View All Quizzes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Achievements you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">First Login</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Quiz Master</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Gamepad2 className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Game Pro</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Wallet className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Saver</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Investor</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Trophy className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium">Top 10</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium">Analyst</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/achievements">
                  <Button variant="outline" className="w-full">
                    View All Badges
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
