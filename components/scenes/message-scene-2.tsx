"use client"

import { Sparkles } from "@/components/sparkles"
import { TypewriterText } from "@/components/typewriter-text"
import { useState, useEffect } from "react"

interface MessageScene2Props {
  onComplete: () => void
  isActive: boolean
}

export function MessageScene2({ onComplete, isActive }: MessageScene2Props) {
  const [firstTextComplete, setFirstTextComplete] = useState(false)
  const [secondTextComplete, setSecondTextComplete] = useState(false)
  const [thirdTextComplete, setThirdTextComplete] = useState(false)
  const [fourthTextComplete, setFourthTextComplete] = useState(false)
  const [fifthTextComplete, setFifthTextComplete] = useState(false)

  const firstMessage = "Mi Mamá"
  const secondMessage = "Judith Guzmán Avila"
  const thirdMessage = "Mis Padrinos"
  const fourthMessage = "Antonio López Gallardo"
  const fifthMessage = "Alma Rosa Guzmán Avila"

  // Handle 2 second delay before advancing to next scene
  useEffect(() => {
    if (fifthTextComplete && isActive) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [fifthTextComplete, isActive, onComplete]);

  const handleFirstTextComplete = () => {
    setFirstTextComplete(true);
  };

  const handleSecondTextComplete = () => {
    setSecondTextComplete(true);
  };

  const handleThirdTextComplete = () => {
    setThirdTextComplete(true);
  };

  const handleFourthTextComplete = () => {
    setFourthTextComplete(true);
  };

  const handleFifthTextComplete = () => {
    setFifthTextComplete(true);
  };
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Sparkles count={20} />

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
        <source src="/video/kendra3.mp4" type="video/mp4" />
        {/* Fallback to image if video fails to load */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotoVideo3-fU4fQLXpKVDGkvxylef7pszW6qJCT8.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>

      {/* No dark overlay - keep original video colors */}

      {/* Text Container - Organized vertically */}
      <div className="relative z-20 text-center px-6 md:px-8 lg:px-12 space-y-8">
        {/* First Text: "Mi Mamá" */}
        <div className="rounded-2xl p-4 md:p-6 lg:p-8">
          <TypewriterText
            text={firstMessage}
            delay={150}
            className="font-main-text text-5xl md:text-7xl lg:text-8xl text-amber-500 font-bold tracking-wide drop-shadow-2xl"
            onComplete={handleFirstTextComplete}
            isActive={isActive}
          />
        </div>

        {/* Second Text: "Judith Guzmán Avila" - appears after first text completes */}
        {firstTextComplete && (
          <div className="animate-fade-in rounded-2xl p-4 md:p-6 lg:p-8">
            <TypewriterText
              text={secondMessage}
              delay={120}
              className="font-main-text text-4xl md:text-6xl lg:text-7xl text-pink-600 font-bold tracking-wide drop-shadow-2xl"
              onComplete={handleSecondTextComplete}
              isActive={isActive}
            />
          </div>
        )}

        {/* Third Text: "Mis Padrinos" - appears after second text completes */}
        {secondTextComplete && (
          <div className="animate-fade-in rounded-2xl p-4 md:p-6 lg:p-8">
            <TypewriterText
              text={thirdMessage}
              delay={150}
              className="font-main-text text-5xl md:text-7xl lg:text-8xl text-amber-500 font-bold tracking-wide drop-shadow-2xl"
              onComplete={handleThirdTextComplete}
              isActive={isActive}
            />
          </div>
        )}

        {/* Fourth Text: "Antonio López Gallardo" - appears after third text completes */}
        {thirdTextComplete && (
          <div className="animate-fade-in rounded-2xl p-4 md:p-6 lg:p-8">
            <TypewriterText
              text={fourthMessage}
              delay={120}
              className="font-main-text text-4xl md:text-6xl lg:text-7xl text-pink-600 font-bold tracking-wide drop-shadow-2xl"
              onComplete={handleFourthTextComplete}
              isActive={isActive}
            />
          </div>
        )}

        {/* Fifth Text: "Alma Rosa Guzmán Avila" - appears after fourth text completes */}
        {fourthTextComplete && (
          <div className="animate-fade-in rounded-2xl p-4 md:p-6 lg:p-8">
            <TypewriterText
              text={fifthMessage}
              delay={120}
              className="font-main-text text-4xl md:text-6xl lg:text-7xl text-pink-600 font-bold tracking-wide drop-shadow-2xl"
              onComplete={handleFifthTextComplete}
              isActive={isActive}
            />
          </div>
        )}
      </div>

    </div>
  )
}
