import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Trophy, Medal, Search, Users, User, ArrowUp, ArrowDown } from "lucide-react"

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              <span>Find Friends</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search users..." className="w-full pl-8" />
          </div>
        </div>

        <Tabs defaultValue="global" className="space-y-4">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Challenge</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Users with the highest XP and achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-20 w-20 border-2 border-primary">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        2
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="font-medium">Sarah Kim</div>
                      <div className="text-xs text-muted-foreground">Level 8 • 1850 XP</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                      </div>
                      <Avatar className="h-24 w-24 border-4 border-yellow-500">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-primary-foreground">
                        1
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="font-medium">Michael Chen</div>
                      <div className="text-xs text-muted-foreground">Level 10 • 2500 XP</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-20 w-20 border-2 border-orange-400">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-orange-400 text-xs font-bold text-primary-foreground">
                        3
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="font-medium">David Rodriguez</div>
                      <div className="text-xs text-muted-foreground">Level 7 • 1720 XP</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center rounded-md bg-muted/50 px-4 py-2 font-medium">
                    <div className="w-10 text-center">Rank</div>
                    <div className="ml-4 flex-1">User</div>
                    <div className="w-20 text-center">Level</div>
                    <div className="w-20 text-center">XP</div>
                    <div className="w-20 text-center">Badges</div>
                  </div>

                  {[
                    { rank: 4, name: "Emma Wilson", level: 6, xp: 1580, badges: 15, change: "up" },
                    { rank: 5, name: "James Taylor", level: 6, xp: 1490, badges: 12, change: "down" },
                    { rank: 6, name: "Olivia Martinez", level: 5, xp: 1350, badges: 14, change: "up" },
                    { rank: 7, name: "Noah Johnson", level: 5, xp: 1200, badges: 10, change: "down" },
                    { rank: 8, name: "Sophia Lee", level: 5, xp: 1150, badges: 11, change: "up" },
                    { rank: 9, name: "William Brown", level: 4, xp: 980, badges: 9, change: "down" },
                    { rank: 10, name: "Ava Garcia", level: 4, xp: 920, badges: 8, change: "same" },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                      <div className="w-10 text-center font-medium">{user.rank}</div>
                      <div className="ml-4 flex flex-1 items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                        {user.change === "up" && <ArrowUp className="h-3 w-3 text-green-500" />}
                        {user.change === "down" && <ArrowDown className="h-3 w-3 text-red-500" />}
                      </div>
                      <div className="w-20 text-center">{user.level}</div>
                      <div className="w-20 text-center">{user.xp}</div>
                      <div className="w-20 text-center">{user.badges}</div>
                    </div>
                  ))}

                  <div className="mt-4 flex items-center rounded-md bg-primary/5 px-4 py-2">
                    <div className="w-10 text-center font-medium">42</div>
                    <div className="ml-4 flex flex-1 items-center gap-2">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">You (Alex Johnson)</span>
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                        You
                      </Badge>
                    </div>
                    <div className="w-20 text-center">3</div>
                    <div className="w-20 text-center">250</div>
                    <div className="w-20 text-center">7</div>
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

          <TabsContent value="friends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Friends Leaderboard</CardTitle>
                <CardDescription>See how you compare to your friends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-8 text-center">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No Friends Added Yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add friends to see how you compare on the leaderboard
                  </p>
                  <Button className="mt-4">
                    <Users className="mr-2 h-4 w-4" />
                    Find Friends
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Challenge</CardTitle>
                <CardDescription>This week's challenge: Investment Knowledge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Investment Knowledge Challenge</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete investment quizzes and simulations to earn points
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">3 days left</div>
                      <div className="text-xs text-muted-foreground">Challenge ends April 12, 2025</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center rounded-md bg-muted/50 px-4 py-2 font-medium">
                    <div className="w-10 text-center">Rank</div>
                    <div className="ml-4 flex-1">User</div>
                    <div className="w-20 text-center">Points</div>
                    <div className="w-20 text-center">Quizzes</div>
                    <div className="w-20 text-center">Simulations</div>
                  </div>

                  {[
                    { rank: 1, name: "Emma Wilson", points: 580, quizzes: 5, simulations: 2, medal: "gold" },
                    { rank: 2, name: "James Taylor", points: 490, quizzes: 4, simulations: 2, medal: "silver" },
                    { rank: 3, name: "Olivia Martinez", points: 450, quizzes: 4, simulations: 1, medal: "bronze" },
                    { rank: 4, name: "Noah Johnson", points: 400, quizzes: 3, simulations: 2 },
                    { rank: 5, name: "Sophia Lee", points: 350, quizzes: 3, simulations: 1 },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center rounded-md px-4 py-2 hover:bg-muted">
                      <div className="w-10 text-center font-medium">
                        {user.medal ? (
                          <div className="flex justify-center">
                            <Medal
                              className={`h-4 w-4 ${
                                user.medal === "gold"
                                  ? "text-yellow-500"
                                  : user.medal === "silver"
                                    ? "text-gray-400"
                                    : "text-orange-400"
                              }`}
                            />
                          </div>
                        ) : (
                          user.rank
                        )}
                      </div>
                      <div className="ml-4 flex flex-1 items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                      <div className="w-20 text-center">{user.points}</div>
                      <div className="w-20 text-center">{user.quizzes}/5</div>
                      <div className="w-20 text-center">{user.simulations}/3</div>
                    </div>
                  ))}

                  <div className="mt-4 flex items-center rounded-md bg-primary/5 px-4 py-2">
                    <div className="w-10 text-center font-medium">12</div>
                    <div className="ml-4 flex flex-1 items-center gap-2">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">You (Alex Johnson)</span>
                      <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                        You
                      </Badge>
                    </div>
                    <div className="w-20 text-center">150</div>
                    <div className="w-20 text-center">1/5</div>
                    <div className="w-20 text-center">0/3</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="text-center text-sm text-muted-foreground">
                  Complete more investment quizzes and simulations to climb the leaderboard!
                </div>
                <Button className="w-full">Join This Week's Challenge</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
