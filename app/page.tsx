"use client"

import { useEffect, useState } from "react"
import HeroSection from "../components/hero-section"
import Timeline from "../components/timeline"
import PhotoCarousel from "../components/photo-carousel"
import VideoGallery from "../components/video-gallery"
import LoveLetterReveal from "../components/love-letter-reveal"
import ParticleBackground from "../components/particle-background"
import { AccessCode } from "../components/access-code"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(auth === "true")
  }, [])

  if (!isAuthenticated) {
    return <AccessCode />
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-rose-50 to-pink-100 dark:from-rose-950 dark:to-pink-900">
      <ParticleBackground />

      <HeroSection />

      <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-rose-800 dark:text-rose-300">
            Our Love Timeline
          </h2>
          <Timeline />
        </div>
      </section>

      <section
        id="photos"
        className="py-20 px-4 sm:px-6 lg:px-8 relative bg-white/30 dark:bg-black/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-rose-800 dark:text-rose-300">
            Our Cherished Memories
          </h2>
          <PhotoCarousel />
        </div>
      </section>

      <section id="videos" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-rose-800 dark:text-rose-300">
            Our Special Moments
          </h2>
          <VideoGallery />
        </div>
      </section>

      <section
        id="love-letter"
        className="py-20 px-4 sm:px-6 lg:px-8 relative bg-white/30 dark:bg-black/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-rose-800 dark:text-rose-300">
            A Special Message
          </h2>
          <LoveLetterReveal />
        </div>
      </section>
    </main>
  )
}

