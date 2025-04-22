"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const DEFAULT_ACCESS_CODE = "sandesh@sanjana"

export function AccessCode() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === DEFAULT_ACCESS_CODE) {
      localStorage.setItem("isAuthenticated", "true")
      window.location.reload()
    } else {
      setError("Invalid access code")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-pink-100 dark:from-rose-950 dark:to-pink-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/80 dark:bg-black/80 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-rose-800 dark:text-rose-300">Welcome</h1>
          <p className="mt-2 text-muted-foreground">Please enter the access code to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter access code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
} 