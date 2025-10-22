/**
 * Signup Page - Redirect to App Site
 * 
 * This page redirects users to the app site for signup to ensure
 * OAuth flows complete on the same domain (prevents PKCE errors).
 */

"use client"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function SignupPage() {
  useEffect(() => {
    // Redirect to app site signup page
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app-startupai-site.netlify.app"
    window.location.href = `${appUrl}/login?signup=true`
  }, [])

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <div>
              <h2 className="text-xl font-semibold">Redirecting to signup...</h2>
              <p className="text-sm text-muted-foreground mt-2">
                You'll be taken to our secure signup page
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="flex h-full flex-col items-center justify-center p-10 text-center">
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Transform Your Business
              </h2>
              <p className="text-muted-foreground text-lg">
                Join other innovative entrepreneurs who have accelerated their growth with expert agentic guidance.
              </p>
            </div>
            <div className="grid gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Strategic Business Planning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Market Validation & Research</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Growth Optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Expert Advisory Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
