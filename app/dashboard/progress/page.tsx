import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Award, TrendingUp, BookOpen, Gamepad2, Calendar, Clock, Trophy } from "lucide-react"

export default function ProgressPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Your Progress</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Weekly Report</span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Level Progress</CardTitle>
                <CardDescription>Your journey to financial mastery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Current Level: 3</div>
                        <div className="text-xs text-muted-foreground">Intermediate</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">250/500 XP</div>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Level 1</div>
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="h-2" />
                      <span className="text-xs font-medium">Completed</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Level 2</div>
                    <div className="flex items-center gap-2">
                      <Progress value={100} className="h-2" />
                      <span className="text-xs font-medium">Completed</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Level 3</div>
                    <div className="flex items-center gap-2">
                      <Progress value={50} className="h-2" />
                      <span className="text-xs font-medium">In Progress</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Quizzes</CardTitle>
                  <CardDescription>Your quiz performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Completed</div>
                    <div className="text-sm font-medium">3/12</div>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Budgeting Basics</div>
                      <div>8/10</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>Credit Score Quiz</div>
                      <div>7/10</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>Banking Services</div>
                      <div>9/10</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">Average Score: 80%</div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Simulations</CardTitle>
                  <CardDescription>Your simulation progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Completed</div>
                    <div className="text-sm font-medium">1/5</div>
                  </div>
                  <Progress value={20} className="h-2" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Budgeting Basics</div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>Investment Basics</div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        15%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>Home Buying</div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">Time Spent: 45 minutes</div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mini-Games</CardTitle>
                  <CardDescription>Your game progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Played</div>
                    <div className="text-sm font-medium">1/4</div>
                  </div>
                  <Progress value={25} className="h-2" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>Credit Score Adventure</div>
                      <Badge variant="outline">Level 2/5</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>Tax Rush</div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>Stock Market Simulator</div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">High Score: 850 (Credit Score Adventure)</div>
                </CardFooter>
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
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">First Login</span>
                    <span className="text-xs text-muted-foreground">Apr 5, 2025</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Quiz Master</span>
                    <span className="text-xs text-muted-foreground">Apr 6, 2025</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Gamepad2 className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Game Pro</span>
                    <span className="text-xs text-muted-foreground">Apr 7, 2025</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Investor</span>
                    <span className="text-xs text-muted-foreground">Apr 8, 2025</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-medium">Early Bird</span>
                    <span className="text-xs text-muted-foreground">Apr 9, 2025</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Trophy className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium">Top 10</span>
                    <span className="text-xs text-muted-foreground">Locked</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium">Analyst</span>
                    <span className="text-xs text-muted-foreground">Locked</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full text-center text-sm text-muted-foreground">
                  7 out of 25 badges earned (28% complete)
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
                <CardDescription>Key achievements in your financial journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Completed First Quiz</div>
                    <div className="text-xs text-muted-foreground">Apr 6, 2025</div>
                  </div>
                  <Badge variant="outline">+50 XP</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Reached Level 2</div>
                    <div className="text-xs text-muted-foreground">Apr 7, 2025</div>
                  </div>
                  <Badge variant="outline">Milestone</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Gamepad2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Completed Credit Score Adventure Level 1</div>
                    <div className="text-xs text-muted-foreground">Apr 8, 2025</div>
                  </div>
                  <Badge variant="outline">+75 XP</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Reached Level 3</div>
                    <div className="text-xs text-muted-foreground">Apr 9, 2025</div>
                  </div>
                  <Badge variant="outline">Milestone</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                  <CardDescription>Your learning activity over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground/50" />
                      <div className="mt-2 text-sm text-muted-foreground">Activity chart visualization</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full text-center text-sm text-muted-foreground">Most active day: Wednesday</div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Stats</CardTitle>
                  <CardDescription>Your learning metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Total Time Spent</div>
                      <div className="text-sm font-medium">3h 45m</div>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="text-xs text-muted-foreground">Goal: 8 hours per week</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Quiz Accuracy</div>
                      <div className="text-sm font-medium">80%</div>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Simulation Completion</div>
                      <div className="text-sm font-medium">20%</div>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Game Progress</div>
                      <div className="text-sm font-medium">25%</div>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="grid w-full grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                    <div>
                      <div className="font-medium">5</div>
                      <div>Day Streak</div>
                    </div>
                    <div>
                      <div className="font-medium">12</div>
                      <div>Activities</div>
                    </div>
                    <div>
                      <div className="font-medium">250</div>
                      <div>XP Earned</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
