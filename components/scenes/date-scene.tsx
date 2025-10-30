"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "@/components/sparkles"
import GiftsSection from "@/components/sections/GiftsSection"

interface DateSceneProps {
  onComplete?: () => void
  isActive?: boolean
}

export function DateScene({ onComplete, isActive = true }: DateSceneProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
    const timer = setTimeout(() => {
      onComplete?.()
    }, 6000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Sparkles />

      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          filter: 'brightness(1.05) contrast(1.05)'
        }}
      >
        <source src="/video/kendra5.mp4" type="video/mp4" />
        {/* Fallback to image if video fails to load */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotoVideo7-gurPRtNhvTix6LQQCmEvsmec5HoLBm.png"
          alt="Date announcement"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>

      {/* No dark overlay - keep original video colors */}

      {/* Content is already in the background image */}
      <div className="relative z-20 animate-fade-in">
        {showContent && <GiftsSection />}
      </div>
    </div>
  )
}
