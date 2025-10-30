"use client"

import { Sparkles } from "@/components/sparkles"
import { useState, useEffect } from "react"

interface SplashSceneProps {
  onStart: () => void
}

export function SplashScene({ onStart }: SplashSceneProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  // Handle video loading
  const handleVideoLoaded = () => {
    console.log('Splash video loaded successfully')
    setVideoLoaded(true)
  }

  const handleVideoError = () => {
    console.log('Splash video failed to load, using fallback')
    setVideoError(true)
    setVideoLoaded(true) // Proceed with fallback
  }

  // Fallback timeout - if video doesn't load in 5 seconds, proceed anyway
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded) {
        console.log('Splash video loading timeout, proceeding with fallback')
        setVideoLoaded(true)
      }
    }, 5000) // 5 second timeout

    return () => clearTimeout(fallbackTimer)
  }, [videoLoaded])
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
        onLoadedData={handleVideoLoaded}
        onCanPlay={handleVideoLoaded}
        onError={handleVideoError}
        style={{
          opacity: videoLoaded && !videoError ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <source src="/video/kendra1.mp4" type="video/mp4" />
        {/* Fallback gradient if video fails to load */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#f5d5d8] via-[#e8c4c8] to-[#d4a5a8]"
          style={{
            opacity: videoError ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      </video>

      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 z-10" />

      {/* Loading Indicator */}
      {!videoLoaded && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto"></div>
            <p className="text-white text-lg font-semibold">Cargando experiencia...</p>
          </div>
        </div>
      )}

      <Sparkles count={30} />

    

      {videoLoaded && (
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
      )}

     
    </div>
  )
}
