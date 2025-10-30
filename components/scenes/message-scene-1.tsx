"use client"
import { Sparkles } from "@/components/sparkles"
import { TypewriterText } from "@/components/typewriter-text"
import { useState, useEffect } from "react"

interface MessageScene1Props {
  onComplete: () => void
  isActive: boolean
}

export function MessageScene1({ onComplete, isActive }: MessageScene1Props) {
  const [textComplete, setTextComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const message = "Con la bendición de Dios y el amor de toda mi familia, me siento muy feliz de llegar a este momento de mi vida. Ahora empieza un camino que conduce a un mundo de sueños e ilusiones, que con mucha fe, humildad y esperanza deseo cumplir. Me gustaría con mucha alegría compartir este comienzo de esta bella etapa con todos ustedes."

  // Debug logging
  useEffect(() => {
    console.log('MessageScene1 - isActive:', isActive, 'textComplete:', textComplete, 'hasStarted:', hasStarted);
  }, [isActive, textComplete, hasStarted]);

  // Initialize scene when it becomes active for the first time
  useEffect(() => {
    if (isActive && !hasStarted) {
      console.log('MessageScene1 - Scene activated for first time, initializing...');
      setTextComplete(false);
      setHasStarted(true);
    } else if (!isActive) {
      // Reset when scene becomes inactive
      setHasStarted(false);
      setTextComplete(false);
    }
  }, [isActive, hasStarted]);

  // Handle 2 second delay before advancing to next scene
  useEffect(() => {
    if (textComplete && isActive) {
      console.log('MessageScene1 - Starting 2 second delay...');
      const timer = setTimeout(() => {
        console.log('MessageScene1 - Calling onComplete after delay');
        onComplete();
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [textComplete, isActive, onComplete]);

  const handleTextComplete = () => {
    console.log('MessageScene1 - Text completed!');
    setTextComplete(true);
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
        <source src="/video/kendra6.mp4" type="video/mp4" />
        {/* Fallback to image if video fails to load */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fotoVideo2-Wm2VQWrwt1WtwvZvtaWlAId6zCG8iW.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>

      {/* Minimal overlay only where text appears - removed general dark overlay */}
      {/* <div className="absolute inset-0 bg-black/10 z-10" /> */}

      {/* Message Text */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="rounded-2xl p-8 md:p-12 lg:p-16">
          <TypewriterText
            text={message}
            delay={80}
            className="font-main-text text-xl md:text-2xl lg:text-3xl text-rose-400 text-center leading-relaxed drop-shadow-lg"
            onComplete={handleTextComplete}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  )
}
