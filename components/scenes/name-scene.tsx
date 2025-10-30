"use client"

import { Sparkles } from "@/components/sparkles"
import { TypewriterText } from "@/components/typewriter-text"
import { useState, useEffect } from "react"

interface NameSceneProps {
  onComplete: () => void
  isActive: boolean
}

export function NameScene({ onComplete, isActive }: NameSceneProps) {
  const [firstTextComplete, setFirstTextComplete] = useState(false)
  const [secondTextComplete, setSecondTextComplete] = useState(false)
  const [thirdTextComplete, setThirdTextComplete] = useState(false)

  const firstMessage = "¡La cuenta regresiva ha comenzado!"
  const secondMessage = "FECHA ESPECIAL"
  const thirdMessage = "Sábado 15 de Noviembre 2025"

  // Handle 2 second delay before advancing to next scene
  useEffect(() => {
    if (thirdTextComplete && isActive) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [thirdTextComplete, isActive, onComplete]);

  const handleFirstTextComplete = () => {
    setFirstTextComplete(true);
  };

  const handleSecondTextComplete = () => {
    setSecondTextComplete(true);
  };

  const handleThirdTextComplete = () => {
    setThirdTextComplete(true);
  };
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Sparkles count={25} />

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
        <source src="/video/kendra4.mp4" type="video/mp4" />
        {/* Fallback to image if video fails to load */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotoVideo4-Dhmx2pFAGiovwD1sVLQOUSie8Nndew.png"
          alt="Martina"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>

      {/* No dark overlay - keep original video colors */}

      {/* Text Container - Organized vertically */}
      <div className="relative z-20 text-center px-6 md:px-8 lg:px-12 space-y-8">
        {/* First Text: "¡La cuenta regresiva ha comenzado!" */}
        <div className="rounded-2xl p-4 md:p-6 lg:p-8">
          <TypewriterText
            text={firstMessage}
            delay={100}
            className="font-main-text text-4xl md:text-6xl lg:text-7xl text-amber-500 font-bold tracking-wide drop-shadow-2xl"
            onComplete={handleFirstTextComplete}
            isActive={isActive}
          />
        </div>

        {/* Second Text: "FECHA ESPECIAL" - appears after first text completes */}
        {firstTextComplete && (
          <div className="animate-fade-in rounded-2xl p-4 md:p-6 lg:p-8">
            <TypewriterText
              text={secondMessage}
              delay={120}
              className="font-main-text text-5xl md:text-7xl lg:text-8xl text-pink-800 font-bold tracking-wider drop-shadow-2xl"
              onComplete={handleSecondTextComplete}
              isActive={isActive}
            />
          </div>
        )}

        {/* Third Text: "Sábado 15 de Noviembre 2025" - appears after second text completes */}
        {secondTextComplete && (
          <div className="animate-fade-in rounded-2xl p-4 md:p-6 lg:p-8">
            <TypewriterText
              text={thirdMessage}
              delay={80}
              className="font-main-text text-3xl md:text-5xl lg:text-6xl text-amber-500 font-bold tracking-wide drop-shadow-2xl"
              onComplete={handleThirdTextComplete}
              isActive={isActive}
            />
          </div>
        )}
      </div>
    </div>
  )
}
