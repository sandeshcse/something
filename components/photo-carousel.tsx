"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, PerspectiveCamera, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import * as THREE from "three"

// Sample photo data - replace with your actual photos
const photos = [
  {
    id: 1,
    src: "/images/1736318119483.jpg?height=600&width=800",
    alt: "Special moment 1",
    caption: "Our first date",
  },
  {
    id: 2,
    src: "/images/IMG_20231224_224607.jpg?height=600&width=800",
    alt: "Special moment 2",
    caption: "Beach vacation",
  },
  {
    id: 3,
    src: "/images/IMG20240127200248.jpg?height=600&width=800",
    alt: "Special moment 3",
    caption: "Anniversary dinner",
  },
  {
    id: 4,
    src: "/images/IMG_20241109_160247.jpg?height=600&width=800",
    alt: "Special moment 4",
    caption: "Mountain hike",
  },
  {
    id: 5,
    src: "/images/IMG_20241028_185851.jpg?height=600&width=800",
    alt: "Special moment 5",
    caption: "City exploration",
  },
  {
    id: 6,
    src: "/images/Snapchat-1898343339.jpg?height=600&width=800",
    alt: "Special moment 6",
    caption: "Sunset watching",
  },
]

export default function PhotoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)

  const nextPhoto = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      nextPhoto()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRotate])

  return (
    <div className="relative h-[600px] w-full">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 30]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50}>
          <spotLight position={[0, 10, 0]} intensity={1} />
        </PerspectiveCamera>

        <Environment preset="sunset" />

        <PhotoCarousel3D photos={photos} activeIndex={activeIndex} />
      </Canvas>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
          onClick={prevPhoto}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
          onClick={nextPhoto}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <Button
        variant="outline"
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/40 z-10"
        onClick={() => setAutoRotate(!autoRotate)}
      >
        {autoRotate ? "Pause Rotation" : "Auto Rotate"}
      </Button>
    </div>
  )
}

function PhotoCarousel3D({ photos, activeIndex }) {
  const group = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={group}>
      {photos.map((photo, index) => {
        const angle = (index * Math.PI * 2) / photos.length
        const radius = 5
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        return (
          <PhotoFrame
            key={photo.id}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
            photo={photo}
            isActive={index === activeIndex}
          />
        )
      })}
    </group>
  )
}

function PhotoFrame({ position, rotation, photo, isActive }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (mesh.current) {
      mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, isActive || hovered ? 1.5 : 1.2, 0.1)
      mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, isActive || hovered ? 1.5 : 1.2, 0.1)
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={mesh} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <planeGeometry args={[2.2, 1.5]} />
        <meshBasicMaterial color="#fff" />
        <Html transform position={[0, 0, 0.01]} scale={0.18} occlude>
          <div
            className={`relative w-[500px] h-[333px] transition-all duration-300 ${
              isActive ? "ring-4 ring-primary shadow-xl" : ""
            }`}
          >
            <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
              <p className="text-center">{photo.caption}</p>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  )
}

