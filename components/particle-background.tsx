"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Particle settings
    const particlesArray = []
    const numberOfParticles = 50

    // Colors based on theme
    const getColors = () => {
      return theme === "dark"
        ? ["rgba(255, 105, 180, 0.3)", "rgba(255, 20, 147, 0.3)", "rgba(199, 21, 133, 0.3)"]
        : ["rgba(255, 182, 193, 0.5)", "rgba(255, 105, 180, 0.5)", "rgba(255, 20, 147, 0.5)"]
    }

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = getColors()[Math.floor(Math.random() * getColors().length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.01

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()

        // Draw heart shape
        const topCurveHeight = this.size * 0.3
        ctx.moveTo(this.x, this.y + topCurveHeight)
        // Left curve
        ctx.bezierCurveTo(
          this.x - this.size,
          this.y,
          this.x - this.size,
          this.y - this.size,
          this.x,
          this.y - this.size,
        )
        // Right curve
        ctx.bezierCurveTo(
          this.x + this.size,
          this.y - this.size,
          this.x + this.size,
          this.y,
          this.x,
          this.y + topCurveHeight,
        )

        ctx.closePath()
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

