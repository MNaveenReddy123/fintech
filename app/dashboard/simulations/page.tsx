import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, DollarSign, TrendingUp, Home, Briefcase, GraduationCap } from "lucide-react"

export default function SimulationsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Financial Simulations</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              <span>History</span>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Budgeting Basics</CardTitle>
                <Badge variant="outline">Completed</Badge>
              </div>
              <CardDescription>Learn to create and manage a monthly budget</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>15 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Beginner</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>100%</span>
                </div>
                <Progress value={100} />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/simulations/budgeting" className="w-full">
                <Button variant="default" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Replay
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Investment Basics</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  In Progress
                </Badge>
              </div>
              <CardDescription>Learn how to start investing with small amounts</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>20 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Intermediate</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>15%</span>
                </div>
                <Progress value={15} />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/simulations/investing" className="w-full">
                <Button variant="default" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Continue
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Home Buying</CardTitle>
                <Badge variant="outline">New</Badge>
              </div>
              <CardDescription>Simulate the process of buying your first home</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>30 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>Intermediate</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <Progress value={0} />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/simulations/home-buying" className="w-full">
                <Button variant="default" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Student Loan Management</CardTitle>
                <Badge variant="outline">New</Badge>
              </div>
              <CardDescription>Learn strategies for managing student loan debt</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>25 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span>Beginner</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <Progress value={0} />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/simulations/student-loans" className="w-full">
                <Button variant="default" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Retirement Planning</CardTitle>
                <Badge variant="outline">Locked</Badge>
              </div>
              <CardDescription>Plan for your future with retirement strategies</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>35 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Advanced</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Unlocks at Level 5</span>
                  <span>You're Level 3</span>
                </div>
                <Progress value={60} className="bg-muted" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                <BookOpen className="mr-2 h-4 w-4" />
                Locked
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
