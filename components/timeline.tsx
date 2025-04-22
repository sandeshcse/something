"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Heart } from "lucide-react"
import Image from "next/image"

// Sample timeline data - replace with your actual anniversary data
const timelineData = [
  {
    year: "2018",
    title: "When We First Met",
    description: "The day our eyes met and our hearts connected.",
    image: "/images/IMG_20231224_224607.jpg?height=400&width=600",
    quote: "Love at first sight is real when I saw you.",
  },
  {
    year: "2019",
    title: "Our First Anniversary",
    description: "One year of beautiful memories and growing love.",
    image: "/images/IMG_20241028_185851.jpg?height=400&width=600",
    quote: "With each passing day, my love for you grows stronger.",
  },
  {
    year: "2020",
    title: "Through Thick and Thin",
    description: "We faced challenges together and our bond grew stronger.",
    image: "/images/IMG_20241109_160247.jpg?height=400&width=600",
    quote: "In your arms, I've found my home.",
  },
  {
    year: "2021",
    title: "Adventures Together",
    description: "Exploring new places and creating beautiful memories.",
    image: "/images/Picsart_25-02-06_16-14-03-591.jpg?height=400&width=600",
    quote: "Every adventure is better with you by my side.",
  },
  {
    year: "2022",
    title: "Growing Together",
    description: "Learning, evolving, and falling deeper in love.",
    image: "/images/Snapchat-2085899251.jpg?height=400&width=600",
    quote: "You make my heart smile every single day.",
  },
  {
    year: "2023",
    title: "Forever and Always",
    description: "Celebrating our journey and looking forward to forever.",
    image: "/images/1736318119483.jpg?height=400&width=600",
    quote: "Forever isn't long enough when I'm with you.",
  },
]

export default function Timeline() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div ref={ref} className="relative">
      {/* Timeline path */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 dark:bg-pink-800 rounded-full z-0">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-pink-400 to-rose-600 rounded-full"
          initial={{ height: 0 }}
          animate={controls}
          variants={{
            visible: { height: "100%", transition: { duration: 2, ease: "easeInOut" } },
          }}
        />
      </div>

      {/* Timeline items */}
      <div className="relative z-10">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.year}
            data={item}
            index={index}
            controls={controls}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ data, index, controls, isLast }) {
  const isEven = index % 2 === 0
  const itemRef = useRef(null)
  const inView = useInView(itemRef, { once: false, amount: 0.5 })

  return (
    <motion.div
      ref={itemRef}
      className={`mb-16 ${isLast ? "mb-0" : ""} flex items-center`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, delay: index * 0.2 } },
      }}
    >
      <div className={`flex flex-col md:flex-row items-center gap-8 w-full ${isEven ? "md:flex-row-reverse" : ""}`}>
        {/* Year marker */}
        <div className="flex-none flex flex-col items-center">
          <motion.div
            className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold shadow-lg z-10"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          >
            {data.year}
          </motion.div>
          <motion.div
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] } : { scale: 0, opacity: 0 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 + 0.5 }}
          >
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          initial={{ x: isEven ? 50 : -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: isEven ? 50 : -50, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-rose-700 dark:text-rose-400 mb-2">{data.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{data.description}</p>
              <div className="relative">
                <blockquote className="italic text-rose-600 dark:text-rose-300 border-l-4 border-primary pl-4 py-2">
                  "{data.quote}"
                </blockquote>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 duration-300">
                <Image
                  src={data.image || "/placeholder.svg"}
                  alt={data.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

