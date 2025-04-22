"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function Header() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm bg-white/50 dark:bg-black/50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary animate-pulse" />
          <span className="font-bold text-xl text-primary">Sandesh💗Sanjana</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#timeline" className="text-foreground/80 hover:text-primary transition-colors">
            Timeline
          </Link>
          <Link href="#photos" className="text-foreground/80 hover:text-primary transition-colors">
            Photos
          </Link>
          <Link href="#videos" className="text-foreground/80 hover:text-primary transition-colors">
            Videos
          </Link>
          <Link href="#love-letter" className="text-foreground/80 hover:text-primary transition-colors">
            Love Letter
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

