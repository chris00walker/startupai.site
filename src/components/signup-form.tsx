"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOAuthLoading, setIsOAuthLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const supabase = useMemo(() => createClient(), [])

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  const handleEmailSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            company,
          },
          emailRedirectTo: `${appUrl}/auth/callback?next=/dashboard`,
        },
      })

      if (error) {
        setError(error.message)
        setIsSubmitting(false)
        return
      }

      setSuccess("Check your email to confirm your account. Once verified, you'll be redirected to your dashboard.")
      setIsSubmitting(false)
    } catch (err) {
      console.error(err)
      setError("Sign up failed. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleGitHubSignup = async () => {
    setError(null)
    setSuccess(null)
    setIsOAuthLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${appUrl}/auth/callback?next=/dashboard`,
        },
      })

      if (error) {
        setError(error.message)
        setIsOAuthLoading(false)
      }
    } catch (err) {
      console.error(err)
      setError("GitHub sign up failed. Please try again.")
      setIsOAuthLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleEmailSignup} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Join StartupAI and unlock expert business guidance
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isSubmitting || isOAuthLoading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting || isOAuthLoading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="company">Company (Optional)</Label>
          <Input
            id="company"
            type="text"
            placeholder="Your Company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            disabled={isSubmitting || isOAuthLoading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting || isOAuthLoading}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={isSubmitting || isOAuthLoading}
          />
        </div>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-3">
            {success}
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting || isOAuthLoading}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGitHubSignup}
          disabled={isOAuthLoading || isSubmitting}
        >
          {isOAuthLoading ? "Redirecting to GitHub..." : "Sign up with GitHub"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  )
}
