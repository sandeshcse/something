import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Created with <Heart className="inline-block h-4 w-4 text-primary animate-pulse" /> for our love journey ©{" "}
          {currentYear}
        </p>
      </div>
    </footer>
  )
}

