"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: 1,
    level: "beginner",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      // In a real app, we would submit the form data to the server
      console.log("Form submitted:", formData)
      router.push("/dashboard")
    }
  }

  const avatars = [1, 2, 3, 4, 5, 6]

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            {step === 1 && "Enter your information to create an account"}
            {step === 2 && "Choose your avatar"}
            {step === 3 && "Select your financial literacy level"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  {avatars.map((avatar) => (
                    <div
                      key={avatar}
                      className={`cursor-pointer rounded-lg p-2 ${
                        formData.avatar === avatar ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, avatar }))}
                    >
                      <div className="flex h-20 w-full items-center justify-center rounded-md bg-muted">
                        <User className="h-10 w-10" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4">
                <Tabs
                  defaultValue="beginner"
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, level: value }))}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="beginner">Beginner</TabsTrigger>
                    <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  <TabsContent value="beginner" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Beginner Level</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        New to financial concepts. Learn the basics of budgeting, saving, and spending.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="intermediate" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Intermediate Level</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Familiar with basics. Learn about investing, credit, and financial planning.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="advanced" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Advanced Level</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Experienced with finances. Learn about complex investments, tax strategies, and wealth building.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                <Button type="submit" className="w-full">
                  Complete Setup
                </Button>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
