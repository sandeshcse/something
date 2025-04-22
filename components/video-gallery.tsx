"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample video data - replace with your actual videos
const videosByYear = {
  "2018": [
    {
      id: 1,
      title: "First Date",
      description: "Our very first date at the park",
      thumbnail: "/thumbnail4.jpg",
      src: "/videos/lv_7261844031896816898_20240516012916.mp4", // Replace with actual video URL
    },
    {
      id: 2,
      title: "Second Video",
      description: "A beautiful day with You",
      thumbnail: "/thumbnail6.jpg",
      src: "/videos/lv_7356542331811597569_20240519021729.mp4", // Replace with actual video URL
    },
  ],
  "2019": [
    {
      id: 3,
      title: "Video 3",
      description: "Cute Video",
      thumbnail: "/thumbnail5.jpg",
      src: "/videos/lv_7358690376816839954_20241119150226.mp4", // Replace with actual video URL
    },
  ],
  "2020": [
    {
      id: 4,
      title: "Video 4",
      description: " Together",
      thumbnail: "/thumbnail4.jpg",
      src: "/videos/lv_7370566974939712776_20240524133049.mp4", // Replace with actual video URL
    },
    {
      id: 5,
      title: "Movie Night",
      description: "Our favorite movie night",
      thumbnail: "/thumbnail3.jpg",
      src: "/videos/lv_7382828160980618503_20250109014402.mp4", // Replace with actual video URL
    },
  ],
  "2021": [
    {
      id: 6,
      title: "Road Trip",
      description: "Our amazing road trip adventure",
      thumbnail: "/thumbnail2.jpg",
      src: "/videos/VID_20250321191648.mp4", // Replace with actual video URL
    },
  ],
  "2022": [
    {
      id: 7,
      title: "Video 7",
      description: "Exploring the life together",
      thumbnail: "/thumbnail2.jpg",
      src: "/videos/VID_20250321191648.mp4", // Replace with actual video URL
    },
  ],
  "2023": [
    {
      id: 8,
      title: "Special Moments",
      description: "Collection of special moments",
      thumbnail: "/thumbnail1.jpg",
      src: "/videos/VID-20250207-WA0000.mp4", // Replace with actual video URL
    },
  ],
}

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef(null)

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* Video player */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-xl">
        {selectedVideo ? (
          <>
            <video
              ref={videoRef}
              src={selectedVideo.src}
              poster={selectedVideo.thumbnail}
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
              muted={isMuted}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white text-lg font-bold">{selectedVideo.title}</h3>
                  <p className="text-white/80 text-sm">{selectedVideo.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/70 text-lg">Select a video to play</p>
          </div>
        )}
      </div>

      {/* Video gallery */}
      <Tabs defaultValue="2023" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
          {Object.keys(videosByYear).map((year) => (
            <TabsTrigger key={year} value={year} className="text-sm md:text-base">
              {year}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(videosByYear).map(([year, videos]) => (
          <TabsContent key={year} value={year}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleVideoSelect(video)}
                  isSelected={selectedVideo?.id === video.id}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function VideoCard({ video, onClick, isSelected }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 ${
        isSelected ? "ring-4 ring-primary" : ""
      }`}
      onClick={onClick}
    >
      <div className="aspect-video relative">
        <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold">{video.title}</h3>
            <p className="text-white/80 text-sm">{video.description}</p>
          </div>
          <div className="rounded-full bg-white/30 backdrop-blur-sm p-3 transition-transform hover:scale-110">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

