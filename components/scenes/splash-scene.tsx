"use client"

import { Sparkles } from "@/components/sparkles"

interface SplashSceneProps {
  onStart: () => void
}

export function SplashScene({ onStart }: SplashSceneProps) {
  return (
    <div
      onClick={onStart}
      className="relative w-full h-screen flex items-center justify-center cursor-pointer overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/kendra1.mp4" type="video/mp4" />
        {/* Fallback gradient if video fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5d5d8] via-[#e8c4c8] to-[#d4a5a8]" />
      </video>

      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 z-10" />

      <Sparkles count={30} />

    

      <div className="text-center z-30 space-y-8 px-4">
        

        {/* Enhanced message with better visibility */}
        <div className="relative">
          {/* Background blur effect for the message */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-full -m-4"></div>
          <p className="relative text-2xl md:text-3xl text-white font-medium animate-pulse drop-shadow-lg">
            ✨ Toca para comenzar ✨
          </p>
        </div>
      </div>

     
    </div>
  )
}
