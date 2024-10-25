"use client"

import { cn } from "@/lib"
import Image from "next/image"
import { useEffect, useState } from "react"

const IMAGES = ["/_static/canvas.demo.png", "/_static/questions.demo.png", "/_static/classroom.demo.png", "/_static/leaderboard.demo.png"]

export default function SlideImage() {
  const maxImages = IMAGES.length
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % maxImages)
    }, 5000)

    return () => clearInterval(interval)
  }, [maxImages])

  return (
    <div className="relative hidden h-full grow items-center justify-center overflow-hidden rounded-lg shadow-hard-xs md:flex md:w-1/2">
      <div className="absolute bottom-3 z-50 h-8 w-32">
        <div className="flex h-full w-full items-center justify-center gap-1">
          {Array.from({ length: maxImages }).map((_, index) => (
            <div
              key={index + "-dot"}
              className={cn(`h-2 w-2 rounded-full bg-black/30 transition`, {
                "bg-black/60": index === currentImageIndex,
              })}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      {IMAGES.map((image, index) => (
        <Image
          key={index + "-image"}
          src={image}
          alt={`Login Slide ${index + 1}`}
          fill
          className="absolute h-full w-full object-cover object-left-top transition-all duration-1000"
          style={{
            left: `${index - currentImageIndex}00%`,
          }}
        />
      ))}
    </div>
  )
}
