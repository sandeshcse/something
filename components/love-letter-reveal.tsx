"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function LoveLetterReveal() {
  const [isRevealed, setIsRevealed] = useState(false)
  const confettiRef = useRef(null)

  const handleReveal = () => {
    setIsRevealed(true)

    // Trigger confetti
    if (confettiRef.current) {
      const canvas = confettiRef.current
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      })

      const colors = ["#ff69b4", "#ff1493", "#ff007f", "#ff69b4", "#ffb6c1"]

      const end = Date.now() + 3000

      const frame = () => {
        myConfetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          shapes: ["heart"],
        })

        myConfetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          shapes: ["heart"],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }

  return (
    <div className="relative">
      <canvas
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="envelope"
              className="relative bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900 dark:to-rose-900 p-8 rounded-xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <Heart className="h-16 w-16 mx-auto text-primary" fill="currentColor" />
                </motion.div>

                <h3 className="text-2xl font-bold text-rose-700 dark:text-rose-300">A Special Message For You</h3>
                <p className="text-rose-600/80 dark:text-rose-300/80">
                  Click the button below to reveal a heartfelt message written just for you.
                </p>

                <Button
                  onClick={handleReveal}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Open Love Letter
                </Button>
              </div>

              <motion.div
                className="absolute -top-3 -right-3"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
              >
                <Heart className="h-8 w-8 text-primary" fill="currentColor" />
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3"
                animate={{ rotate: [0, -10, 0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, delay: 0.5 }}
              >
                <Heart className="h-8 w-8 text-primary" fill="currentColor" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border-4 border-pink-300 dark:border-pink-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="prose prose-rose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-center text-rose-700 dark:text-rose-300 mb-6">
                  My Dearest Love
                </h3>

                <p>
                  As I sit here reflecting on our journey together, my heart overflows with gratitude and love for you.
                  Every moment we've shared, from our first meeting to today, has been a precious gift that I cherish
                  deeply.
                </p>

                <p>
                  You've been my rock during difficult times, my joy during happy moments, and my constant companion
                  through it all. Your smile brightens my darkest days, and your love gives me strength I never knew I
                  had.
                </p>

                <p>
                  I love the way your eyes light up when you're excited, how you laugh at my silly jokes, and how you
                  always know exactly what to say when I need to hear it most. You understand me in ways no one else
                  ever has.
                </p>

                <p>
                  With each passing year, my love for you grows stronger and deeper. I fall in love with you all over
                  again every day, discovering new reasons to adore you with each sunrise.
                </p>

                <p>
                  Thank you for walking this journey with me, for creating beautiful memories, and for being the
                  extraordinary person you are. I look forward to many more anniversaries, adventures, and quiet moments
                  together.
                </p>

                <p className="text-center font-bold mt-6">
                  Forever and always yours,
                  <br />
                  With all my heart and soul
                </p>
              </div>

              <div className="flex justify-center mt-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <Heart className="h-12 w-12 text-primary" fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

